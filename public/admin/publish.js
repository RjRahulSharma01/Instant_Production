/**
 * Publish state, next to Save.
 *
 * Saving already publishes — the editor commits straight to the repository and
 * Vercel rebuilds — but nothing on screen says so, which is a bad way to find
 * out. This adds a badge beside Save that answers "is this live?" and, when it
 * is not, a button that makes it live.
 *
 * Everything here reads the form through its visible labels and only ever
 * writes to two controls: the publish date and the draft switch. It degrades
 * to an explanation if either cannot be found, rather than guessing.
 */

const ROUTE_NEW = '#/collections/blog/new';
const SITE = 'https://instantproduction.in';

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/* Find a form control by the label the person can actually see. Field order
   and class names both change between editor versions; the labels are ours,
   they come from config.yml. */
function byLabel(text) {
  const wanted = text.toLowerCase();
  for (const el of document.querySelectorAll('input, textarea, [role="switch"]')) {
    /* Three ways a control can be labelled, and this form uses more than one:
       the date picker is associated by `for`, the text fields by nesting. */
    let label = el.closest('label');
    if (!label && el.id) label = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
    if (!label && el.getAttribute('aria-labelledby')) {
      label = document.getElementById(el.getAttribute('aria-labelledby'));
    }
    if (!label) continue;
    if (label.innerText.trim().toLowerCase().startsWith(wanted)) return el;
  }
  return null;
}

function findSwitch(text) {
  const direct = byLabel(text);
  if (direct) return direct;
  /* The draft toggle is the only switch on this form, so if the label lookup
     misses, one unambiguous switch is still a safe answer. Two would not be. */
  const all = document.querySelectorAll('[role="switch"]');
  return all.length === 1 ? all[0] : null;
}

/* Svelte binds on the input event, and assigning .value directly does not
   raise one. Going through the native setter and dispatching by hand is the
   supported way to drive a controlled input from outside. */
function setValue(el, value) {
  const proto = el instanceof HTMLTextAreaElement
    ? HTMLTextAreaElement.prototype
    : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, value);
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}

const saveButton = () =>
  [...document.querySelectorAll('button')].find((b) => /^\s*Save\s*$/i.test(b.textContent));

/* ------------------------------------------------------------------ state */

function readState() {
  const dateEl = byLabel('publish date');
  const draftEl = findSwitch('hold as draft');
  const slugEl = byLabel('url slug');

  const date = dateEl ? dateEl.value : '';
  const draft = draftEl ? draftEl.getAttribute('aria-checked') === 'true' : false;
  const slug = slugEl ? slugEl.value.trim() : '';
  const saved = !window.location.hash.startsWith(ROUTE_NEW);

  let kind = 'unknown';
  if (draft) kind = 'draft';
  else if (!date) kind = 'nodate';
  else if (date > today()) kind = 'scheduled';
  else kind = 'live';

  return { kind, date, draft, slug, saved, dateEl, draftEl };
}

const LOOK = {
  live:      { dot: '#22c55e', text: 'Live' },
  scheduled: { dot: '#f59e0b', text: 'Scheduled' },
  draft:     { dot: '#a1a1aa', text: 'Draft' },
  nodate:    { dot: '#fb7185', text: 'No date' },
  unknown:   { dot: '#71717a', text: 'Status' },
};

/* --------------------------------------------------------------------- ui */

/* Not named CSS — that shadows the global CSS object, and CSS.escape is used
   below. */
const STYLE = `
#ip-pub { display: inline-flex; align-items: center; gap: .45rem; min-height: 36px;
  margin-right: .5rem; padding: .3rem .75rem; border: 1px solid rgba(0,0,0,.14);
  border-radius: 999px; background: #fff; color: #18181b; cursor: pointer;
  font: 500 .8rem/1 Inter, system-ui, -apple-system, sans-serif; white-space: nowrap; }
#ip-pub:hover { background: #f4f4f5 }
#ip-pub .d { width: 8px; height: 8px; border-radius: 999px; flex: none }
#ip-pub-panel { position: fixed; top: 3.6rem; right: 1rem; z-index: 10000; width: 23rem;
  max-width: calc(100vw - 2rem); padding: 1.05rem 1.15rem; border-radius: .75rem;
  background: #18181b; color: #e4e4e7; border: 1px solid #3f3f46;
  box-shadow: 0 14px 40px rgba(0,0,0,.45);
  font: 400 .82rem/1.6 Inter, system-ui, -apple-system, sans-serif; }
#ip-pub-panel h3 { margin: 0 0 .5rem; font-size: .9rem; color: #fff }
#ip-pub-panel p { margin: 0 0 .7rem }
#ip-pub-panel a { color: #f59e0b }
#ip-pub-panel .row { display: flex; gap: .5rem; flex-wrap: wrap; margin-top: .3rem }
#ip-pub-panel button { min-height: 38px; padding: .45rem 1rem; border: 0; border-radius: 999px;
  cursor: pointer; font: 600 .78rem/1 Inter, system-ui, sans-serif }
#ip-pub-panel .go { background: #f59e0b; color: #000 }
#ip-pub-panel .go:hover { background: #fbbf24 }
#ip-pub-panel .sec { background: #3f3f46; color: #fafafa }
#ip-pub-panel .close { position: absolute; top: .5rem; right: .6rem; background: none;
  color: #a1a1aa; font-size: 1rem; padding: .2rem .4rem; min-height: 0 }
`;

function closePanel() {
  const p = document.getElementById('ip-pub-panel');
  if (p) p.remove();
}

function openPanel() {
  closePanel();
  const s = readState();
  const el = document.createElement('div');
  el.id = 'ip-pub-panel';

  const liveLink = s.slug
    ? `<a href="${SITE}/blog/${s.slug}" target="_blank" rel="noopener">${SITE.replace('https://', '')}/blog/${s.slug}</a>`
    : 'the blog';

  let body;
  if (s.kind === 'live') {
    body = `<h3>This one is live</h3>
      <p>Dated ${s.date}, not held as a draft. <strong>Pressing Save publishes it.</strong>
      The site rebuilds on its own — give it about 90 seconds, then check ${liveLink}.</p>
      <p>There is no separate publish step. Save is the publish button.</p>`;
  } else if (s.kind === 'scheduled') {
    body = `<h3>Scheduled for ${s.date}</h3>
      <p>It is not on the site yet, and it is not in the site's code either — a scheduled
      article is stripped out of the build entirely, so nobody can find it early.</p>
      <p>It appears by itself that morning at 06:00 IST. Or publish it now.</p>
      <div class="row"><button class="go" id="ip-pub-now">Publish now</button>
      <button class="sec" id="ip-pub-cancel">Leave it scheduled</button></div>`;
  } else if (s.kind === 'draft') {
    body = `<h3>Held as a draft</h3>
      <p>"Hold as draft" is on, so this never publishes, whatever the date says.</p>
      <div class="row"><button class="go" id="ip-pub-now">Publish now</button>
      <button class="sec" id="ip-pub-cancel">Keep it as a draft</button></div>`;
  } else if (s.kind === 'nodate') {
    body = `<h3>No publish date</h3>
      <p>The date field is empty, and the article cannot save without one.</p>
      <div class="row"><button class="go" id="ip-pub-now">Set it to today</button></div>`;
  } else {
    body = `<h3>Cannot read the form</h3>
      <p>The publish date and draft fields were not where I expected them, so I will not
      guess. Set the date to today and turn "Hold as draft" off, then press Save — that
      publishes it. Tell Rahul this message appeared.</p>`;
  }

  el.innerHTML = `<button class="close" aria-label="Close">×</button>${body}`;
  document.body.appendChild(el);

  el.querySelector('.close').onclick = closePanel;
  const cancel = el.querySelector('#ip-pub-cancel');
  if (cancel) cancel.onclick = closePanel;

  const go = el.querySelector('#ip-pub-now');
  if (go) {
    go.onclick = () => {
      if (s.dateEl) setValue(s.dateEl, today());
      if (s.draftEl && s.draftEl.getAttribute('aria-checked') === 'true') s.draftEl.click();
      closePanel();
      refresh();
      /* Saving is left to the editor's own button so that its validation, its
         error messages and its unsaved-changes handling all behave normally. */
      const save = saveButton();
      if (save) save.click();
    };
  }
}

function refresh() {
  const btn = document.getElementById('ip-pub');
  if (!btn) return;
  const { kind } = readState();
  const look = LOOK[kind] || LOOK.unknown;
  btn.querySelector('.d').style.background = look.dot;
  btn.querySelector('.t').textContent = look.text;
}

function attach() {
  const save = saveButton();
  if (!save || document.getElementById('ip-pub')) return;

  const btn = document.createElement('button');
  btn.id = 'ip-pub';
  btn.type = 'button';
  btn.innerHTML = '<span class="d"></span><span class="t">Status</span>';
  btn.onclick = (e) => {
    e.preventDefault();
    document.getElementById('ip-pub-panel') ? closePanel() : openPanel();
  };
  save.parentElement.insertBefore(btn, save);
  refresh();
}

export function mount() {
  const style = document.createElement('style');
  style.textContent = STYLE;
  document.head.appendChild(style);

  /* The editor mounts, unmounts and re-renders its header as you move between
     routes, so the button is re-attached whenever it goes missing and its
     label kept current as fields change. Polling rather than a MutationObserver
     because it also has to notice the date and draft values changing, which no
     single observer covers cleanly. */
  setInterval(() => {
    if (/#\/collections\/blog\/(new|entries)/.test(window.location.hash)) {
      attach();
      if (document.getElementById('ip-pub')) refresh();
    } else {
      const b = document.getElementById('ip-pub');
      if (b) b.remove();
      closePanel();
    }
  }, 600);
}
