/**
 * "Start from a document" — the button on the editor.
 *
 * Reads a Word document (or a markdown file), works out the title, excerpt and
 * body, and opens the new-article form with those fields already filled in.
 *
 * HOW THE FIELDS ACTUALLY GET FILLED
 * Not by finding the inputs and typing into them. Sveltia CMS reads query
 * parameters off the new-entry route and populates the form from them:
 *
 *   #/collections/blog/new?title=…&excerpt=…&body=…
 *
 * That is a supported feature rather than a trick, so it does not break the
 * next time the editor's markup changes — which a DOM-filling approach would,
 * silently, and probably on a day you were in a hurry.
 *
 * Everything after the # stays in the browser. It is never sent to any server,
 * so there is no URL length limit worth worrying about and the draft of an
 * unpublished article does not travel anywhere.
 */

import { htmlToMarkdown, inferFromBody, slugify, isoDate, CATEGORIES } from './import.js';

const ROUTE = '#/collections/blog/new';
const MAMMOTH_SRC = 'https://unpkg.com/mammoth@1.8.0/mammoth.browser.min.js';

/* mammoth is ~250 kB and most sessions never open a Word file, so it is only
   fetched the first time someone actually uses this. */
let mammothPromise;
function loadMammoth() {
  if (window.mammoth) return Promise.resolve(window.mammoth);
  if (!mammothPromise) {
    mammothPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = MAMMOTH_SRC;
      s.onload = () => resolve(window.mammoth);
      s.onerror = () => {
        mammothPromise = null;
        reject(new Error('Could not load the Word reader. Check your connection, then try again.'));
      };
      document.head.appendChild(s);
    });
  }
  return mammothPromise;
}

/* ------------------------------------------------------------- md files */

function readMarkdown(text, fallbackTitle) {
  if (text.startsWith('---')) {
    const end = text.indexOf('\n---', 3);
    if (end !== -1) {
      const fields = {};
      for (const line of text.slice(3, end).split('\n')) {
        const c = line.indexOf(':');
        if (c < 1) continue;
        const k = line.slice(0, c).trim();
        const v = line.slice(c + 1).trim()
          .replace(/^\[|\]$/g, '')
          .replace(/^["']|["']$/g, '');
        if (v) fields[k] = v;
      }
      fields.body = text.slice(end + 4).trim();
      return fields;
    }
  }
  const { title, excerpt, body } = inferFromBody(text, fallbackTitle);
  return { title, excerpt, body };
}

/* ------------------------------------------------------- file → fields */

export async function articleFromFile(file) {
  const name = file.name.toLowerCase();
  const fallbackTitle = file.name
    .replace(/\.(docx|md|markdown|txt)$/i, '')
    .replace(/[-_]+/g, ' ')
    .trim();

  let fields;
  const notes = [];

  if (name.endsWith('.docx')) {
    const mammoth = await loadMammoth();
    let value, messages;
    try {
      ({ value, messages } = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() }));
    } catch (e) {
      /* mammoth surfaces the underlying zip library's error, which mentions
         central directories and links to its own documentation. True, and
         useless to the person holding the file. */
      throw new Error('That file is not a readable Word document. If it was renamed to .docx, open it in Word and use "Save As" instead.');
    }
    const md = htmlToMarkdown(value);
    if (!md.trim()) throw new Error('That document appears to be empty.');
    const { title, excerpt, body } = inferFromBody(md, fallbackTitle);
    fields = { title, excerpt, body };
    /* Word embeds images at whatever size was pasted in — often several
       megabytes — so they are deliberately not carried across. */
    if (messages.some((m) => /image/i.test(m.message || ''))) {
      notes.push('Images in the document were not carried over — add them with the image field.');
    }
  } else if (name.endsWith('.doc')) {
    throw new Error('That is the old .doc format. Open it in Word and "Save As" .docx, then try again.');
  } else {
    fields = readMarkdown(await file.text(), fallbackTitle);
  }

  if (!fields.title) fields.title = fallbackTitle;
  if (!fields.slug) fields.slug = slugify(fields.title);
  if (!fields.publishAt) fields.publishAt = isoDate(new Date());
  if (!fields.body || !fields.body.trim()) throw new Error('No article text was found in that file.');

  /* Word's autocorrect turns a lone hyphen into an en dash and quotes into
     curly quotes. Both are fine in prose. In a markdown list marker or a link
     they are not, so undo them only where they break syntax. */
  fields.body = fields.body
    .replace(/^[–—]\s+/gm, '- ')
    .replace(/\]\s*\(\s*/g, '](');

  return { fields, notes };
}

/* --------------------------------------------------------- open the form */

const SEND = [
  'title', 'slug', 'excerpt', 'category', 'banner', 'bannerAlt', 'bannerCaption',
  'publishAt', 'tags', 'keywords', 'related', 'draft', 'body',
  'metaTitle', 'metaDescription',
];

export function openInCms(fields) {
  const q = new URLSearchParams();
  for (const k of SEND) if (fields[k]) q.set(k, fields[k]);
  window.location.hash = `${ROUTE}?${q.toString()}`;
}

/* True if the form currently on screen has anything typed into it. Replacing
   the route throws that away, so it is worth asking first. */
function formHasContent() {
  if (!window.location.hash.startsWith(ROUTE)) return false;
  return [...document.querySelectorAll('input[type="text"], textarea')]
    .some((el) => el.value && el.value.trim());
}

/* ------------------------------------------------------------------- ui */

const CSS = `
#ip-doc-wrap { position: fixed; left: 1rem; bottom: 1rem; z-index: 9999;
  display: none; flex-direction: column; align-items: flex-start; gap: .5rem;
  font: 400 .8rem/1.5 Inter, system-ui, -apple-system, sans-serif; }
#ip-doc-wrap.on { display: flex }
.ip-btn { display: inline-flex; align-items: center; gap: .5rem; min-height: 44px;
  padding: .55rem 1rem; border: 0; border-radius: 999px; cursor: pointer;
  font: 600 .8rem/1 Inter, system-ui, -apple-system, sans-serif;
  box-shadow: 0 6px 24px rgba(0,0,0,.28); }
.ip-btn.primary { background: #f59e0b; color: #000 }
.ip-btn.primary:hover { background: #fbbf24 }
.ip-btn.ghost { background: #27272a; color: #fafafa }
.ip-btn.ghost:hover { background: #3f3f46 }
.ip-btn:disabled { opacity: .55; cursor: progress }
#ip-doc-note { max-width: 21rem; padding: .85rem 1rem; border-radius: .7rem;
  background: #18181b; color: #e4e4e7; border: 1px solid #3f3f46;
  box-shadow: 0 10px 34px rgba(0,0,0,.4); }
#ip-doc-note strong { color: #fff }
#ip-doc-note ul { margin: .45rem 0 0; padding-left: 1.05rem }
#ip-doc-note li { margin-bottom: .2rem }
#ip-doc-note .close { float: right; background: none; border: 0; color: #a1a1aa;
  cursor: pointer; font-size: 1rem; line-height: 1; padding: 0 0 .3rem .5rem }
#ip-doc-note.bad { border-color: #9f1239 }
@media (max-width: 640px) { #ip-doc-wrap { left: .6rem; bottom: .6rem } }
`;

function note(html, bad) {
  const old = document.getElementById('ip-doc-note');
  if (old) old.remove();
  if (!html) return;
  const el = document.createElement('div');
  el.id = 'ip-doc-note';
  if (bad) el.className = 'bad';
  el.innerHTML = `<button class="close" aria-label="Dismiss">×</button>${html}`;
  el.querySelector('.close').onclick = () => el.remove();
  document.getElementById('ip-doc-wrap').prepend(el);
}

export function mount() {
  if (document.getElementById('ip-doc-wrap')) return;

  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.id = 'ip-doc-wrap';
  wrap.innerHTML = `
    <div style="display:flex;gap:.5rem;flex-wrap:wrap">
      <button class="ip-btn primary" id="ip-doc-btn">Start from a document</button>
      <a class="ip-btn ghost" href="/admin/import.html">Bulk import</a>
    </div>
    <input type="file" id="ip-doc-file" accept=".docx,.md,.markdown,.txt" hidden />`;
  document.body.appendChild(wrap);

  const btn = wrap.querySelector('#ip-doc-btn');
  const input = wrap.querySelector('#ip-doc-file');

  btn.onclick = () => {
    if (formHasContent() &&
        !window.confirm('This will replace what is currently in the form. Continue?')) return;
    input.value = '';                        // so the same file can be picked twice
    input.click();
  };

  input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;
    btn.disabled = true;
    btn.textContent = 'Reading…';
    note('');
    try {
      const { fields, notes } = await articleFromFile(file);
      openInCms(fields);

      const missing = [];
      if (!fields.category) missing.push('Category');
      else if (!CATEGORIES.includes(fields.category)) {
        /* The category field is a fixed list. A value outside it is dropped by
           the editor without complaint, so the field looks blank for no
           visible reason unless we say why. */
        missing.push(`Category — "${fields.category}" is not one of the options, so it was not applied`);
      }
      if (!fields.banner) missing.push('Banner image');
      if (!fields.excerpt) missing.push('Excerpt');
      if (!fields.bannerAlt) missing.push('Banner description');

      note(
        `<strong>${file.name}</strong> loaded.` +
        `<br />Title, slug, publish date and the article text are filled in.` +
        (missing.length
          ? `<br />Still needed before it will save:<ul>${missing.map((m) => `<li>${m}</li>`).join('')}</ul>`
          : '') +
        (notes.length ? `<ul>${notes.map((n) => `<li>${n}</li>`).join('')}</ul>` : '') +
        `<br />Read it through — a document converts well, but it does not know your headings from your paragraphs as well as you do.`,
      );
    } catch (err) {
      note(`<strong>Could not read that file.</strong><br />${err.message}`, true);
    } finally {
      btn.disabled = false;
      btn.textContent = 'Start from a document';
    }
  };

  /* Only show the buttons once the editor itself has rendered — before that
     they would sit on the sign-in screen and lead nowhere useful — and lift
     the boot screen at the same moment.

     Sveltia mounts a `div.sui.app-shell`, not the `#nc-root` that Decap used.
     The unconditional timeout below matters more than the selector: if a
     future version renames its root again, the boot overlay must not be left
     covering a working editor. Better a boot screen that disappears half a
     second early than an admin that looks permanently broken. */
  const reveal = () => {
    wrap.classList.add('on');
    const boot = document.getElementById('boot');
    if (boot) boot.remove();
  };
  const ready = setInterval(() => {
    if (document.querySelector('.app-shell, #nc-root, .sveltia-cms, [class*="sveltia"]')) {
      clearInterval(ready);
      reveal();
    }
  }, 250);
  setTimeout(() => { clearInterval(ready); reveal(); }, 12000);
}
