/**
 * Blog build step.
 *
 * Reads every .md file in content/blog/, parses the frontmatter and body, drops
 * anything that is a draft or not yet due, and writes two generated files:
 *
 *   src/data/blogPosts.generated.js   the posts the site renders
 *   public/sitemap.xml                static routes + published posts
 *
 * Runs automatically before every build (npm "prebuild" hook), so Vercel picks
 * it up with no extra configuration.
 *
 * WHY BUILD TIME RATHER THAN RUNTIME
 * A post with a future publishAt never reaches the browser at all. If the date
 * filter ran in React instead, the full text of every scheduled article would
 * sit in the JavaScript bundle, readable by anyone who opened dev tools. This
 * way "scheduled" actually means scheduled.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'content', 'blog');
const OUT_DATA = path.join(ROOT, 'src', 'data', 'blogPosts.generated.js');
const OUT_SITEMAP = path.join(ROOT, 'public', 'sitemap.xml');
const SITE = 'https://instantproduction.in';

/* Routes that exist regardless of content. Blog posts are appended. */
const STATIC_ROUTES = [
  ['/', 1.0], ['/services', 0.9], ['/portfolio', 0.9], ['/industries', 0.85],
  ['/blog', 0.8], ['/about', 0.7], ['/contact', 0.7],
  ['/services/ai-content-strategy', 0.8], ['/services/ai-videos', 0.8],
  ['/services/ai-generated-ads', 0.8], ['/services/video-production', 0.8],
  ['/services/social-media-growth', 0.8], ['/services/influencer-marketing', 0.8],
  ['/services/performance-marketing', 0.8], ['/services/website-development', 0.8],
  ['/services/blog-writing', 0.8], ['/services/graphic-design', 0.8],
  ['/industries/healthcare', 0.8], ['/industries/ecommerce', 0.8],
  ['/industries/fintech', 0.75], ['/industries/education', 0.75],
  ['/industries/beauty', 0.75], ['/industries/real-estate', 0.75],
];

/* ------------------------------------------------------------ frontmatter */
/* Deliberately not gray-matter or js-yaml. The frontmatter we accept is a flat
   set of key/value pairs plus inline arrays, and hand-parsing that keeps the
   dependency list at zero — which matters because this runs on every Vercel
   build. If the format ever needs nesting, swap this for js-yaml. */

function parseFrontmatter(raw, file) {
  if (!raw.startsWith('---')) {
    throw new Error(`${file}: missing the --- frontmatter block at the top of the file`);
  }
  const end = raw.indexOf('\n---', 3);
  if (end === -1) throw new Error(`${file}: frontmatter block is never closed with ---`);

  const head = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();
  const data = {};

  /* Two list forms are accepted, because two different things write these
     files. A person typing markdown writes `tags: [A, B]`. The admin CMS
     writes a YAML block sequence:

       tags:
         - A
         - B

     Rejecting the second would mean the admin could save an article the build
     then refused, which is the worst possible failure — it looks saved. */
  const lines = head.split('\n');
  let i = 0;
  while (i < lines.length) {
    const raw0 = lines[i];
    const t = raw0.trim();
    i += 1;
    if (!t || t.startsWith('#')) continue;

    const c = t.indexOf(':');
    if (c === -1) throw new Error(`${file}: cannot read frontmatter line "${t}"`);

    const key = t.slice(0, c).trim();
    let val = t.slice(c + 1).trim();

    if (val === '') {
      /* Either a block sequence, or a genuinely empty value. */
      const items = [];
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        items.push(unquote(lines[i].replace(/^\s*-\s+/, '').trim()));
        i += 1;
      }
      data[key] = items.length ? items : '';
      continue;
    }

    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map((s) => unquote(s.trim())).filter(Boolean);
    } else {
      val = unquote(val);
      if (val === 'true') val = true;
      else if (val === 'false') val = false;
    }
    data[key] = val;
  }
  return { data, body };
}

const unquote = (s) =>
  (s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))
    ? s.slice(1, -1)
    : s;

/* --------------------------------------------------------- inline markdown */
/* Order matters: escape HTML first so authored text cannot inject markup, then
   add our own tags back. Everything here is first-party content from the repo,
   but escaping first means a stray < in an article can never break the page. */

function inline(text) {
  let s = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // `code`
  s = s.replace(/`([^`]+)`/g, '<code class="rounded bg-white/10 px-1.5 py-0.5 text-[0.85em]">$1</code>');
  // [text](url) — internal links get a marker the renderer uses for client-side nav
  // (?<!!) leaves ![alt](src) alone — images are handled as their own block.
  s = s.replace(/(?<!!)\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, href) => {
    const internal = href.startsWith('/');
    const attrs = internal
      ? 'data-internal="1"'
      : 'target="_blank" rel="noopener noreferrer"';
    return `<a href="${href}" ${attrs} class="text-brand underline decoration-brand/40 underline-offset-4 transition hover:decoration-brand">${label}</a>`;
  });
  // **bold** then *italic*
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  return s;
}

/* ---------------------------------------------------------- block markdown */

function parseBody(md, file) {
  const blocks = [];
  const lines = md.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();

    if (!t) { i += 1; continue; }

    // headings
    if (t.startsWith('### ')) { blocks.push({ type: 'h3', html: inline(t.slice(4)) }); i += 1; continue; }
    if (t.startsWith('## '))  { blocks.push({ type: 'h2', html: inline(t.slice(3)) }); i += 1; continue; }
    if (t.startsWith('# ')) {
      throw new Error(`${file}: use ## for section headings. A single # is the page title, which comes from the frontmatter.`);
    }

    // horizontal rule
    if (/^(\*\*\*|---|___)$/.test(t)) { blocks.push({ type: 'hr' }); i += 1; continue; }

    // callout — a blockquote
    if (t.startsWith('> ')) {
      const buf = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        buf.push(lines[i].trim().slice(2)); i += 1;
      }
      blocks.push({ type: 'callout', html: inline(buf.join(' ')) });
      continue;
    }

    // image on its own line
    const img = t.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
    if (img) {
      blocks.push({ type: 'image', src: img[2], alt: img[1] });
      i += 1; continue;
    }

    // unordered list
    if (/^[-*] /.test(t)) {
      const items = [];
      while (i < lines.length && /^[-*] /.test(lines[i].trim())) {
        items.push(inline(lines[i].trim().slice(2))); i += 1;
      }
      blocks.push({ type: 'list', items });
      continue;
    }

    // ordered list
    if (/^\d+\. /.test(t)) {
      const items = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
        items.push(inline(lines[i].trim().replace(/^\d+\.\s/, ''))); i += 1;
      }
      blocks.push({ type: 'olist', items });
      continue;
    }

    // pipe table
    if (t.startsWith('|') && lines[i + 1] && /^\|[\s:|-]+\|$/.test(lines[i + 1].trim())) {
      const cells = (r) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => inline(c.trim()));
      const head = cells(lines[i]);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) { rows.push(cells(lines[i])); i += 1; }
      blocks.push({ type: 'table', head, rows });
      continue;
    }

    // paragraph — runs until a blank line
    const buf = [];
    while (i < lines.length && lines[i].trim()) { buf.push(lines[i].trim()); i += 1; }
    blocks.push({ type: 'p', html: inline(buf.join(' ')) });
  }

  return blocks;
}

/* ------------------------------------------------------------------ build */

function readPosts() {
  if (!fs.existsSync(CONTENT)) {
    console.warn(`[blog] no content/blog directory — nothing to build`);
    return [];
  }
  const files = fs.readdirSync(CONTENT)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_') && f !== 'README.md');

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT, file), 'utf8');
    const { data, body } = parseFrontmatter(raw, file);

    for (const req of ['title', 'slug', 'excerpt', 'publishAt', 'banner', 'category']) {
      if (!data[req]) throw new Error(`${file}: missing required field "${req}"`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.publishAt))) {
      throw new Error(`${file}: publishAt must be YYYY-MM-DD, got "${data.publishAt}"`);
    }

    const blocks = parseBody(body, file);
    const words = body.replace(/[#>*\-|`]/g, ' ').split(/\s+/).filter(Boolean).length;

    return {
      file,
      slug: String(data.slug),
      title: data.title,
      excerpt: data.excerpt,
      category: data.category,
      cover: data.banner,
      bannerAlt: data.bannerAlt || '',
      publishAt: data.publishAt,
      date: data.publishAt,
      updated: data.updated || null,
      draft: data.draft === true,
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
      keywords: Array.isArray(data.keywords) ? data.keywords : data.keywords ? [data.keywords] : [],
      related: Array.isArray(data.related) ? data.related : data.related ? [data.related] : [],
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || data.excerpt,
      // ~220 wpm is a realistic pace for this kind of writing.
      readingMinutes: Math.max(1, Math.round(words / 220)),
      body: blocks,
    };
  });
}

function main() {
  const all = readPosts();
  const today = new Date().toISOString().slice(0, 10);

  const live = all
    .filter((p) => !p.draft)
    .filter((p) => p.publishAt <= today)
    .sort((a, b) => (a.publishAt < b.publishAt ? 1 : -1));

  const scheduled = all.filter((p) => !p.draft && p.publishAt > today);
  const drafts = all.filter((p) => p.draft);

  // Duplicate slugs would silently shadow each other at runtime.
  const seen = new Set();
  for (const p of all) {
    if (seen.has(p.slug)) throw new Error(`duplicate slug "${p.slug}" — every post needs its own`);
    seen.add(p.slug);
  }

  // Related links must point at something that will actually be live.
  const liveSlugs = new Set(live.map((p) => p.slug));
  for (const p of live) {
    p.related = p.related.filter((r) => {
      if (liveSlugs.has(r)) return true;
      console.warn(`[blog] ${p.file}: related post "${r}" is not live yet — dropped from this build`);
      return false;
    });
  }

  const banner = `// GENERATED FILE — do not edit.\n// Written by scripts/build-blog.mjs from content/blog/*.md\n// Built ${new Date().toISOString()}\n\n`;
  fs.writeFileSync(
    OUT_DATA,
    `${banner}export const generatedPosts = ${JSON.stringify(live.map(({ file, ...p }) => p), null, 2)};\n`,
  );

  const urls = [
    ...STATIC_ROUTES.map(([loc, pri]) => ({ loc, pri, mod: today })),
    ...live.map((p) => ({ loc: `/blog/${p.slug}`, pri: 0.7, mod: p.updated || p.publishAt })),
  ];
  fs.writeFileSync(
    OUT_SITEMAP,
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${
      urls.map((u) => `  <url>\n    <loc>${SITE}${u.loc}</loc>\n    <lastmod>${u.mod}</lastmod>\n    <priority>${u.pri}</priority>\n  </url>`).join('\n')
    }\n</urlset>\n`,
  );

  console.log(`[blog] ${live.length} live · ${scheduled.length} scheduled · ${drafts.length} draft`);
  for (const p of scheduled) console.log(`[blog]   scheduled ${p.publishAt}  ${p.slug}`);
  console.log(`[blog] sitemap written with ${urls.length} URLs`);
}

try {
  main();
} catch (err) {
  console.error(`\n[blog] BUILD FAILED\n[blog] ${err.message}\n`);
  process.exit(1);
}
