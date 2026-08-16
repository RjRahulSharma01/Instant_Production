/**
 * Blog pre-flight check — `npm run blog:check`
 *
 * Run this before you push. It catches the things that are annoying to discover
 * after a deploy: a banner image that was never added, an internal link with a
 * typo, a slug that already exists, a publish date in the wrong format.
 *
 * Errors block the build. Warnings are worth reading but will not stop you.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'content', 'blog');
const PUBLIC = path.join(ROOT, 'public');

const errors = [];
const warnings = [];

/* Routes the site actually serves. An internal link outside this list is
   almost always a typo, and a typo'd internal link is worse than no link. */
const VALID_PREFIXES = [
  // /about and /contact are homepage anchors, not routes — linking to them
  // without the hash hits the catch-all and lands the reader at the top of
  // the homepage instead. Use /#about and /#contact.
  '/', '/services', '/portfolio', '/industries', '/blog', '/#about', '/#contact',
  '/services/ai-content-strategy', '/services/ai-videos', '/services/ai-generated-ads',
  '/services/video-production', '/services/social-media-growth', '/services/influencer-marketing',
  '/services/performance-marketing', '/services/website-development', '/services/blog-writing',
  '/services/graphic-design',
  '/industries/healthcare', '/industries/ecommerce', '/industries/fintech',
  '/industries/education', '/industries/beauty', '/industries/real-estate',
];

if (!fs.existsSync(CONTENT)) {
  console.error('No content/blog directory found.');
  process.exit(1);
}

const files = fs.readdirSync(CONTENT)
  .filter((f) => f.endsWith('.md') && !f.startsWith('_') && f !== 'README.md');

if (files.length === 0) {
  console.log('No articles in content/blog yet.');
  process.exit(0);
}

const slugs = new Map();
const posts = [];
const blogLinks = [];   // [file, slug] pairs, verified once every slug is known

for (const file of files) {
  const raw = fs.readFileSync(path.join(CONTENT, file), 'utf8');
  const err = (m) => errors.push(`${file}: ${m}`);
  const warn = (m) => warnings.push(`${file}: ${m}`);

  if (!raw.startsWith('---')) { err('missing the --- frontmatter block'); continue; }
  const end = raw.indexOf('\n---', 3);
  if (end === -1) { err('frontmatter is never closed with ---'); continue; }

  const head = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();
  const data = {};
  // Accepts both `tags: [A, B]` and the YAML block sequence the admin writes.
  const fmLines = head.split('\n');
  for (let li = 0; li < fmLines.length; li += 1) {
    const t = fmLines[li].trim();
    if (!t || t.startsWith('#')) continue;
    const ci = t.indexOf(':');
    if (ci === -1) { err(`cannot read frontmatter line "${t}"`); continue; }
    const k = t.slice(0, ci).trim();
    let v = t.slice(ci + 1).trim();
    if (v === '') {
      const items = [];
      while (li + 1 < fmLines.length && /^\s*-\s+/.test(fmLines[li + 1])) {
        li += 1;
        items.push(fmLines[li].replace(/^\s*-\s+/, '').trim().replace(/^["']|["']$/g, ''));
      }
      data[k] = items.length ? items : '';
      continue;
    }
    if (v.startsWith('[') && v.endsWith(']')) {
      v = v.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else {
      v = v.replace(/^["']|["']$/g, '');
    }
    data[k] = v;
  }

  for (const req of ['title', 'slug', 'excerpt', 'publishAt', 'banner', 'category']) {
    if (!data[req]) err(`missing required field "${req}"`);
  }

  if (data.slug) {
    if (!/^[a-z0-9-]+$/.test(data.slug)) err(`slug "${data.slug}" must be lowercase letters, numbers and hyphens only`);
    if (slugs.has(data.slug)) err(`slug "${data.slug}" is already used by ${slugs.get(data.slug)}`);
    else slugs.set(data.slug, file);
  }

  if (data.publishAt && !/^\d{4}-\d{2}-\d{2}$/.test(data.publishAt)) {
    err(`publishAt must be YYYY-MM-DD, got "${data.publishAt}"`);
  }

  if (data.banner) {
    if (data.banner.startsWith('http://')) {
      err('banner must be https, not http — an http image is blocked on an https page');
    } else if (data.banner.startsWith('https://')) {
      /* A stock photo picked in the admin is a link to the provider's CDN, not
         a file in this repo. That works, and it is the trade-off worth being
         explicit about rather than silently accepting. */
      let host = '';
      try { host = new URL(data.banner).hostname; } catch { err(`banner is not a valid URL: "${data.banner}"`); }

      if (/picsum\.photos/.test(host)) {
        err('Lorem Picsum is a placeholder service — pick a real photo before this publishes');
      } else if (host) {
        warn(`banner is hotlinked from ${host} rather than stored in the repo — if that photo is removed or the host stops allowing hotlinking, this article loses its image`);
      }
      if (/unsplash|pexels/.test(host) && !data.bannerCaption) {
        warn('Unsplash and Pexels both ask for a credit — put "Photo by <name> on <service>" in bannerCaption');
      }
    } else if (!data.banner.startsWith('/')) {
      err(`banner must start with / for a repo image, or https:// for a stock photo — got "${data.banner}"`);
    } else if (!fs.existsSync(path.join(PUBLIC, data.banner.replace(/^\//, '')))) {
      err(`banner image not found: public${data.banner}`);
    }
    if (!data.bannerAlt) warn('no bannerAlt — add one so the image is described to screen readers and to search');
  }

  if (data.excerpt && data.excerpt.length > 165) {
    warn(`excerpt is ${data.excerpt.length} characters — Google truncates around 155-160`);
  }
  if (data.title && data.title.length > 62) {
    warn(`title is ${data.title.length} characters — search results usually cut off around 60`);
  }
  if (!data.tags || data.tags.length === 0) warn('no tags — the post will not appear under any filter');

  // links
  // (?<!!) so that ![alt](src) images are not also read as links.
  const links = [...body.matchAll(/(?<!!)\[([^\]]+)\]\(([^)\s]+)\)/g)];
  const internal = links.filter(([, , href]) => href.startsWith('/'));
  for (const [, label, href] of internal) {
    const clean = (href.startsWith('/#') ? href : href.split('#')[0]).replace(/(.)\/$/, '$1') || '/';
    const known = VALID_PREFIXES.includes(clean) || clean.startsWith('/blog/');
    if (!known) err(`internal link "${href}" does not match any route on the site`);
    else if (clean.startsWith('/blog/')) blogLinks.push([file, clean.slice(6)]);
    if (/^(here|this|click here|read more|link)$/i.test(label.trim())) {
      warn(`link text "${label}" says nothing — use words that describe the destination`);
    }
  }
  if (internal.length === 0 && !/^:::cta\s*$/m.test(body)) {
    warn('no internal links — every article should point at least one place deeper into the site');
  }

  // images referenced in the body (the optional "caption" is ignored here)
  for (const [, , src] of body.matchAll(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    if (src.startsWith('/') && !fs.existsSync(path.join(PUBLIC, src.replace(/^\//, '')))) {
      err(`body image not found: public${src}`);
    }
  }

  /* Fenced blocks. An unclosed fence swallows the rest of the article silently —
     the page still builds, it just quietly ends early. Worth catching here. */
  const fences = (body.match(/^```/gm) || []).length;
  if (fences % 2 !== 0) err('a ``` code block is opened but never closed');

  const opens = (body.match(/^:::(stat|cta|images)\s*$/gm) || []).length;
  const closes = (body.match(/^:::\s*$/gm) || []).length;
  if (opens !== closes) err(`${opens} ::: block${opens === 1 ? '' : 's'} opened but ${closes} closed`);
  for (const [, kind] of body.matchAll(/^:::(\w+)/gm)) {
    if (kind && !['stat', 'cta', 'images'].includes(kind)) {
      err(`":::${kind}" is not a block type — use :::stat, :::cta or :::images`);
    }
  }

  /* CTA destinations are not markdown links, so the link check above never sees
     them. They break just as badly. */
  for (const [, block] of body.matchAll(/^:::cta\s*$([\s\S]*?)^:::\s*$/gm)) {
    const rows = block.split('\n').map((r) => r.trim()).filter(Boolean);
    if (rows.length < 2) { err('a :::cta block needs a sentence, then "/path | Button label" underneath'); continue; }
    const [href, label] = rows[1].split('|').map((s) => s.trim());
    if (!href || !label) { err(`cannot read the CTA action line "${rows[1]}" — it should be "/path | Button label"`); continue; }
    if (href.startsWith('/')) {
      const clean = (href.startsWith('/#') ? href : href.split('#')[0]).replace(/(.)\/$/, '$1') || '/';
      if (!VALID_PREFIXES.includes(clean) && !clean.startsWith('/blog/')) {
        err(`CTA button points at "${href}", which is not a route on the site`);
      } else if (clean.startsWith('/blog/')) blogLinks.push([file, clean.slice(6)]);
    }
  }

  if (/^# /m.test(body)) err('use ## for headings — a single # is the title, which comes from the frontmatter');

  const words = body.split(/\s+/).filter(Boolean).length;
  if (words < 400) warn(`only ~${words} words — thin pages tend not to rank and are not worth publishing`);

  posts.push({ file, data, words });
}

/* article-to-article links, now that every slug is known */
for (const [file, slug] of blogLinks) {
  if (!slugs.has(slug)) errors.push(`${file}: links to /blog/${slug}, which does not exist`);
}

/* related must point at a real post */
for (const { file, data } of posts) {
  const rel = Array.isArray(data.related) ? data.related : data.related ? [data.related] : [];
  for (const r of rel) {
    if (!slugs.has(r)) errors.push(`${file}: related post "${r}" does not exist`);
    if (r === data.slug) errors.push(`${file}: related post links to itself`);
  }
}

/* ------------------------------------------------------------------ report */

const today = new Date().toISOString().slice(0, 10);
const live = posts.filter((p) => p.data.draft !== 'true' && p.data.publishAt <= today);
const later = posts.filter((p) => p.data.draft !== 'true' && p.data.publishAt > today);
const draft = posts.filter((p) => p.data.draft === 'true');

console.log(`\n  ${posts.length} article${posts.length === 1 ? '' : 's'} in content/blog\n`);
console.log(`  live now    ${live.length}`);
console.log(`  scheduled   ${later.length}`);
console.log(`  draft       ${draft.length}\n`);

if (later.length) {
  console.log('  Coming up');
  for (const p of later.sort((a, b) => (a.data.publishAt < b.data.publishAt ? -1 : 1))) {
    console.log(`    ${p.data.publishAt}   ${p.data.title}`);
  }
  console.log('');
}

if (warnings.length) {
  console.log('  Worth a look');
  for (const w of warnings) console.log(`    ${w}`);
  console.log('');
}

if (errors.length) {
  console.log('  Must fix — these will stop the build');
  for (const e of errors) console.log(`    ${e}`);
  console.log('');
  process.exit(1);
}

console.log('  All good. Safe to push.\n');
