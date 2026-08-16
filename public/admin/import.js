/**
 * Bulk article import — the logic.
 *
 * Takes CSV, .docx or .md files, turns each into an article in exactly the
 * shape scripts/build-blog.mjs expects, validates every one against the same
 * rules as scripts/check-blog.mjs, and commits the lot as ONE commit via the
 * GitHub Git Data API.
 *
 * One commit rather than one per article is deliberate. Fifty separate commits
 * would trigger fifty Vercel builds, and a failure halfway through would leave
 * the repo in a state nobody asked for. A single tree either lands or it does
 * not.
 *
 * Nothing here is validated only in the browser. The build re-checks everything
 * on Vercel, so a file that slips through still cannot reach the live site.
 */

const REPO = 'RjRahulSharma01/Instant_Production';
const BRANCH = 'main';
const API = 'https://api.github.com';

/* Must stay in step with scripts/check-blog.mjs. */
const VALID_ROUTES = [
  '/', '/services', '/portfolio', '/industries', '/blog', '/#about', '/#contact',
  '/services/ai-content-strategy', '/services/ai-videos', '/services/ai-generated-ads',
  '/services/video-production', '/services/social-media-growth', '/services/influencer-marketing',
  '/services/performance-marketing', '/services/website-development', '/services/blog-writing',
  '/services/graphic-design',
  '/industries/healthcare', '/industries/ecommerce', '/industries/fintech',
  '/industries/education', '/industries/beauty', '/industries/real-estate',
];

const CATEGORIES = [
  'AI Video', 'Performance Marketing', 'Content Strategy',
  'Influencer Marketing', 'Social', 'Production',
];

/* ------------------------------------------------------------------ auth */

export function getToken() {
  return sessionStorage.getItem('ip_admin_token') || '';
}

export function setToken(t) {
  sessionStorage.setItem('ip_admin_token', t);
}

/* The same popup handshake the CMS uses, against our own /api/auth. Held in
   sessionStorage so it dies when the tab closes rather than persisting. */
export function signIn() {
  return new Promise((resolve, reject) => {
    const w = window.open('/api/auth', 'ip-oauth', 'width=680,height=760');
    if (!w) return reject(new Error('Popup blocked. Allow popups for this site and try again.'));

    const onMessage = (e) => {
      if (e.origin !== window.location.origin) return;
      const d = e.data;
      if (typeof d !== 'string') return;
      if (d.startsWith('authorization:github:success:')) {
        try {
          const { token } = JSON.parse(d.slice('authorization:github:success:'.length));
          window.removeEventListener('message', onMessage);
          setToken(token);
          resolve(token);
        } catch (err) { reject(err); }
      }
    };
    window.addEventListener('message', onMessage);
    setTimeout(() => {
      window.removeEventListener('message', onMessage);
      reject(new Error('Sign-in timed out.'));
    }, 120000);
  });
}

export async function whoAmI(token) {
  const r = await fetch(`${API}/user`, { headers: gh(token) });
  if (!r.ok) throw new Error('That token is not valid. Sign in again.');
  return r.json();
}

/* Confirms the person can actually write here. Better to say so now than after
   they have spent ten minutes preparing an import. */
export async function canWrite(token) {
  const r = await fetch(`${API}/repos/${REPO}`, { headers: gh(token) });
  if (!r.ok) return false;
  const repo = await r.json();
  return !!(repo.permissions && repo.permissions.push);
}

const gh = (token) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
});

/* ------------------------------------------------------------------- csv */
/* A real parser rather than split(','), because excerpts contain commas and
   quoted fields containing newlines are normal in exports from Sheets. */

export function parseCsv(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  const s = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  for (let i = 0; i < s.length; i += 1) {
    const c = s[i];
    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') { field += '"'; i += 1; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }

  const clean = rows.filter((r) => r.some((c) => c.trim() !== ''));
  if (!clean.length) return [];

  const headers = clean[0].map((h) => h.trim());
  return clean.slice(1).map((r) => {
    const o = {};
    headers.forEach((h, i) => { o[h] = (r[i] ?? '').trim(); });
    return o;
  });
}

/* --------------------------------------------------------------- helpers */

export function slugify(s) {
  return String(s).toLowerCase().trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);
}

const splitList = (v) => {
  if (Array.isArray(v)) return v.filter(Boolean);
  if (!v) return [];
  /* Semicolons first: a CSV cell full of commas is ambiguous, and people write
     "D2C; Creative Testing" more often than they escape commas properly. */
  const sep = v.includes(';') ? ';' : ',';
  return v.split(sep).map((x) => x.trim()).filter(Boolean);
};

export const isoDate = (d) => {
  const x = d instanceof Date ? d : new Date(d);
  return Number.isNaN(x.getTime()) ? '' : x.toISOString().slice(0, 10);
};

/* -------------------------------------------------- normalise to an article */

export function toArticle(raw) {
  const title = (raw.title || '').trim();
  const a = {
    title,
    slug: slugify(raw.slug || title),
    excerpt: (raw.excerpt || '').replace(/\s+/g, ' ').trim(),
    category: (raw.category || '').trim(),
    banner: (raw.banner || '').trim(),
    bannerAlt: (raw.bannerAlt || raw.banneralt || '').trim(),
    bannerCaption: (raw.bannerCaption || raw.bannercaption || '').trim(),
    publishAt: isoDate(raw.publishAt || raw.publishat || raw.date || ''),
    tags: splitList(raw.tags),
    keywords: splitList(raw.keywords),
    related: splitList(raw.related),
    draft: String(raw.draft).toLowerCase() === 'true',
    metaTitle: (raw.metaTitle || '').trim(),
    metaDescription: (raw.metaDescription || '').trim(),
    body: (raw.body || '').trim(),
  };
  return a;
}

/* ---------------------------------------------------------------- validate */
/* Deliberately the same rules as check-blog.mjs. If they ever drift, the admin
   becomes a way to save something the build refuses — which looks like it
   worked, and is the worst failure this system can have. */

export function validate(a, allSlugs, existingSlugs) {
  const errors = [];
  const warnings = [];

  if (!a.title) errors.push('missing title');
  else if (a.title.length > 62) warnings.push(`title is ${a.title.length} chars — search cuts off around 60`);

  if (!a.slug) errors.push('missing slug');
  else if (!/^[a-z0-9-]+$/.test(a.slug)) errors.push(`slug "${a.slug}" must be lowercase letters, numbers and hyphens`);
  else if (existingSlugs.has(a.slug)) errors.push(`slug "${a.slug}" already exists in the repo`);
  else if (allSlugs.filter((s) => s === a.slug).length > 1) errors.push(`slug "${a.slug}" is duplicated in this import`);

  if (!a.excerpt) errors.push('missing excerpt');
  else if (a.excerpt.length > 165) warnings.push(`excerpt is ${a.excerpt.length} chars — Google truncates around 155`);

  if (!a.category) errors.push('missing category');
  else if (!CATEGORIES.includes(a.category)) warnings.push(`"${a.category}" is a new category — check it is not a near-duplicate`);

  if (!a.banner) errors.push('missing banner image path');
  else if (!a.banner.startsWith('/')) errors.push('banner must start with / — e.g. /images/blog/name.webp');

  if (!a.publishAt) errors.push('missing or unreadable publish date');
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(a.publishAt)) errors.push(`publish date must be YYYY-MM-DD, got "${a.publishAt}"`);

  if (!a.bannerAlt) warnings.push('no banner description — add one for screen readers and search');
  if (!a.tags.length) warnings.push('no tags — it will not appear under any filter');

  const words = a.body.split(/\s+/).filter(Boolean).length;
  if (!words) errors.push('the article body is empty');
  else if (words < 400) warnings.push(`about ${words} words — thin articles tend not to rank`);

  if (/^# /m.test(a.body)) errors.push('use ## for headings — a single # is the title');

  /* Unclosed fences do not fail loudly — the article just ends early. */
  if ((a.body.match(/^```/gm) || []).length % 2 !== 0) errors.push('a ``` code block is opened but never closed');
  const opens = (a.body.match(/^:::(stat|cta|images)\s*$/gm) || []).length;
  const closes = (a.body.match(/^:::\s*$/gm) || []).length;
  if (opens !== closes) errors.push(`${opens} ::: block${opens === 1 ? '' : 's'} opened but ${closes} closed`);

  /* Internal links, with images excluded. */
  const links = [...a.body.matchAll(/(?<!!)\[([^\]]+)\]\((\/[^)\s]*)\)/g)];
  for (const [, , href] of links) {
    const clean = (href.startsWith('/#') ? href : href.split('#')[0]).replace(/(.)\/$/, '$1') || '/';
    const ok = VALID_ROUTES.includes(clean)
      || (clean.startsWith('/blog/') && (existingSlugs.has(clean.slice(6)) || allSlugs.includes(clean.slice(6))));
    if (!ok) errors.push(`internal link "${href}" does not match any route on the site`);
  }
  if (!links.length) warnings.push('no internal links — every article should point somewhere deeper');

  for (const r of a.related) {
    if (!existingSlugs.has(r) && !allSlugs.includes(r)) warnings.push(`"read next" points at "${r}", which does not exist yet — it will be dropped`);
  }

  return { errors, warnings };
}

/* -------------------------------------------------------------- serialise */

export function toMarkdown(a) {
  /* The build parser strips one pair of surrounding quotes and does no escape
     handling, so a backslash-escaped quote would survive into the page as a
     literal backslash. Wrap in the quote character the value does not contain,
     and if it somehow contains both, drop the doubles rather than ship
     something that renders wrong. */
  const esc = (raw) => {
    const s = String(raw);
    if (!/[:#'"]/.test(s)) return s;
    if (!s.includes('"')) return `"${s}"`;
    if (!s.includes("'")) return `'${s}'`;
    return `"${s.replace(/"/g, '')}"`;
  };
  const lines = ['---'];
  lines.push(`title: ${esc(a.title)}`);
  lines.push(`slug: ${a.slug}`);
  lines.push(`excerpt: ${esc(a.excerpt)}`);
  lines.push(`category: ${a.category}`);
  lines.push(`banner: ${a.banner}`);
  if (a.bannerAlt) lines.push(`bannerAlt: ${esc(a.bannerAlt)}`);
  if (a.bannerCaption) lines.push(`bannerCaption: ${esc(a.bannerCaption)}`);
  lines.push(`publishAt: ${a.publishAt}`);
  if (a.tags.length) lines.push(`tags: [${a.tags.join(', ')}]`);
  if (a.keywords.length) lines.push(`keywords: [${a.keywords.join(', ')}]`);
  if (a.related.length) lines.push(`related: [${a.related.join(', ')}]`);
  if (a.draft) lines.push('draft: true');
  if (a.metaTitle) lines.push(`metaTitle: ${esc(a.metaTitle)}`);
  if (a.metaDescription) lines.push(`metaDescription: ${esc(a.metaDescription)}`);
  lines.push('---', '', a.body, '');
  return lines.join('\n');
}

export const fileNameFor = (a) => `content/blog/${a.publishAt}-${a.slug}.md`;

/* ------------------------------------------------------------- docx → md */
/* mammoth gives us semantic HTML from a Word file; we turn that into the small
   markdown subset the site's own parser understands. Anything fancier than
   that subset is dropped rather than passed through as raw HTML. */

export function htmlToMarkdown(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  /* A browser wraps a bare fragment in html>body; some other DOM
     implementations leave the nodes on the document itself. Take whichever
     actually holds the content rather than assuming. */
  const root = doc.body && doc.body.childNodes.length ? doc.body : doc;

  const inline = (node) => {
    let out = '';
    node.childNodes.forEach((n) => {
      if (n.nodeType === 3) { out += n.textContent; return; }
      const tag = n.tagName?.toLowerCase();
      const inner = inline(n);
      if (!inner.trim() && tag !== 'br') return;
      if (tag === 'strong' || tag === 'b') out += `**${inner.trim()}**`;
      else if (tag === 'em' || tag === 'i') out += `*${inner.trim()}*`;
      else if (tag === 'code') out += `\`${inner.trim()}\``;
      else if (tag === 'a') {
        const href = n.getAttribute('href') || '';
        out += href ? `[${inner.trim()}](${href})` : inner;
      } else if (tag === 'br') out += ' ';
      else out += inner;
    });
    return out;
  };

  const blocks = [];
  root.childNodes.forEach((n) => {
    if (n.nodeType !== 1) return;
    const tag = n.tagName.toLowerCase();
    const text = inline(n).replace(/\s+/g, ' ').trim();

    if (!text && !['ul', 'ol', 'table', 'hr'].includes(tag)) return;

    if (tag === 'h1' || tag === 'h2') blocks.push(`## ${text}`);
    else if (tag === 'h3' || tag === 'h4') blocks.push(`### ${text}`);
    else if (tag === 'blockquote') blocks.push(`> ${text}`);
    else if (tag === 'hr') blocks.push('---');
    else if (tag === 'ul' || tag === 'ol') {
      const items = [...n.querySelectorAll(':scope > li')].map((li, i) =>
        (tag === 'ol' ? `${i + 1}. ` : '- ') + inline(li).replace(/\s+/g, ' ').trim());
      if (items.length) blocks.push(items.join('\n'));
    } else if (tag === 'table') {
      const rows = [...n.querySelectorAll('tr')].map((tr) =>
        [...tr.querySelectorAll('th,td')].map((td) => inline(td).replace(/\s+/g, ' ').trim()));
      /* One block, not one per row. Blocks are joined with a blank line, and
         the site's table parser needs the separator on the line immediately
         after the header — a blank line between them turns the whole table
         into a run of paragraphs full of pipe characters. */
      if (rows.length > 1) {
        blocks.push([
          `| ${rows[0].join(' | ')} |`,
          `|${rows[0].map(() => '---').join('|')}|`,
          ...rows.slice(1).map((r) => `| ${r.join(' | ')} |`),
        ].join('\n'));
      }
    } else blocks.push(text);
  });

  return blocks.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
}

/* Pull a title and excerpt out of a document that has no frontmatter. */
export function inferFromBody(md, fallbackTitle) {
  const lines = md.split('\n').filter((l) => l.trim());
  let title = fallbackTitle;
  let body = md;

  const firstHeading = lines.find((l) => /^#{1,3}\s/.test(l));
  if (firstHeading) {
    title = firstHeading.replace(/^#{1,3}\s/, '').trim();
    body = md.replace(firstHeading, '').trim();
  }

  const firstPara = body.split('\n').find((l) => l.trim() && !/^[#>\-*|]/.test(l.trim())) || '';
  const excerpt = firstPara.replace(/[*`[\]]/g, '').trim().slice(0, 158);

  return { title, excerpt, body };
}

/* ------------------------------------------------ existing repo slugs */

export async function fetchExistingSlugs(token) {
  const r = await fetch(`${API}/repos/${REPO}/contents/content/blog?ref=${BRANCH}`, { headers: gh(token) });
  if (!r.ok) return new Set();
  const files = await r.json();
  const slugs = new Set();
  for (const f of files) {
    if (!f.name.endsWith('.md') || f.name.startsWith('_') || f.name === 'README.md') continue;
    /* Filenames are YYYY-MM-DD-slug.md */
    const m = f.name.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
    slugs.add(m ? m[1] : f.name.replace(/\.md$/, ''));
  }
  return slugs;
}

/* ------------------------------------------------------- commit them all */

export async function commitAll(token, articles, onProgress = () => {}) {
  const H = gh(token);

  onProgress('Reading the current branch…');
  const refRes = await fetch(`${API}/repos/${REPO}/git/ref/heads/${BRANCH}`, { headers: H });
  if (!refRes.ok) throw new Error(`Could not read branch ${BRANCH} (${refRes.status}). Do you have write access?`);
  const baseSha = (await refRes.json()).object.sha;

  const commitRes = await fetch(`${API}/repos/${REPO}/git/commits/${baseSha}`, { headers: H });
  const baseTree = (await commitRes.json()).tree.sha;

  onProgress(`Uploading ${articles.length} article${articles.length === 1 ? '' : 's'}…`);
  const tree = [];
  for (let i = 0; i < articles.length; i += 1) {
    const a = articles[i];
    onProgress(`Uploading ${i + 1} of ${articles.length} — ${a.slug}`);
    const blobRes = await fetch(`${API}/repos/${REPO}/git/blobs`, {
      method: 'POST',
      headers: { ...H, 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: toMarkdown(a), encoding: 'utf-8' }),
    });
    if (!blobRes.ok) throw new Error(`Failed uploading "${a.slug}" (${blobRes.status})`);
    tree.push({ path: fileNameFor(a), mode: '100644', type: 'blob', sha: (await blobRes.json()).sha });
  }

  onProgress('Creating the commit…');
  const treeRes = await fetch(`${API}/repos/${REPO}/git/trees`, {
    method: 'POST',
    headers: { ...H, 'Content-Type': 'application/json' },
    body: JSON.stringify({ base_tree: baseTree, tree }),
  });
  if (!treeRes.ok) throw new Error(`Could not build the file tree (${treeRes.status})`);
  const newTree = (await treeRes.json()).sha;

  const message = articles.length === 1
    ? `Admin: import article "${articles[0].slug}"`
    : `Admin: bulk import ${articles.length} articles`;

  const newCommitRes = await fetch(`${API}/repos/${REPO}/git/commits`, {
    method: 'POST',
    headers: { ...H, 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, tree: newTree, parents: [baseSha] }),
  });
  if (!newCommitRes.ok) throw new Error(`Could not create the commit (${newCommitRes.status})`);
  const newCommit = (await newCommitRes.json()).sha;

  onProgress('Publishing…');
  const upd = await fetch(`${API}/repos/${REPO}/git/refs/heads/${BRANCH}`, {
    method: 'PATCH',
    headers: { ...H, 'Content-Type': 'application/json' },
    body: JSON.stringify({ sha: newCommit }),
  });
  if (!upd.ok) {
    const body = await upd.text();
    throw new Error(upd.status === 422
      ? 'Someone else pushed while this was uploading. Nothing was changed — reload and try again.'
      : `Could not update the branch (${upd.status}). ${body.slice(0, 140)}`);
  }

  return { sha: newCommit, count: articles.length };
}

export { CATEGORIES, REPO };
