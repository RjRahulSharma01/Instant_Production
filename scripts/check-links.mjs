/**
 * Internal link integrity check — runs before every build.
 *
 * WHY THIS EXISTS
 * Four industry pages shipped with a primary call to action pointing at
 * /services/video-production, which did not exist and silently redirected to
 * the services index. Nothing caught it: the route matched a `:slug` pattern,
 * the build succeeded, and React Router redirected at runtime rather than
 * erroring. A human reading the diff would have had to know that a service is
 * only real if it appears in BOTH services.js and serviceDetail.js.
 *
 * So this script does that reasoning instead. It collects every internal link
 * the site contains, works out which routes genuinely resolve, and fails the
 * build on any that do not. A dead internal link is now impossible to deploy.
 *
 * It is deliberately conservative: anything it cannot resolve confidently is
 * reported rather than assumed fine.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const CONTENT = path.join(ROOT, 'content', 'blog');

/* --------------------------------------------------------------- helpers */

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const read = (p) => fs.readFileSync(p, 'utf8');
const rel = (p) => path.relative(ROOT, p);

/* ------------------------------------------------- what routes actually work */

function resolvableRoutes() {
  const routes = new Set();

  /* Static routes declared in App.jsx. `path="x"` inside the layout route is
     relative, so it becomes /x. */
  const app = read(path.join(SRC, 'App.jsx'));
  for (const [, p] of app.matchAll(/path="([^"*:]+)"/g)) {
    routes.add(p === '/' ? '/' : `/${p.replace(/^\/+/, '')}`);
  }
  routes.add('/');

  /* A service page only resolves if the slug is in BOTH files. This is the
     exact condition that was missed. */
  const services = read(path.join(SRC, 'data', 'services.js'));
  const detail = read(path.join(SRC, 'data', 'serviceDetail.js'));
  const serviceIds = [...services.matchAll(/id: '([a-z0-9-]+)'/g)].map((m) => m[1]);
  const detailKeys = [...detail.matchAll(/^ {2}'([a-z0-9-]+)':/gm)].map((m) => m[1]);
  for (const id of serviceIds) {
    if (detailKeys.includes(id)) routes.add(`/services/${id}`);
  }

  /* Industries: a dedicated page in App.jsx, or an entry in industryPages
     which the generic :slug route can render. */
  const industryFile = path.join(SRC, 'data', 'industryPages.js');
  if (fs.existsSync(industryFile)) {
    for (const [, s] of read(industryFile).matchAll(/slug: '([a-z0-9-]+)'/g)) {
      routes.add(`/industries/${s}`);
    }
  }

  /* Blog posts that are actually live come from the generated file. */
  const gen = path.join(SRC, 'data', 'blogPosts.generated.js');
  if (fs.existsSync(gen)) {
    for (const [, s] of read(gen).matchAll(/"slug":\s*"([a-z0-9-]+)"/g)) {
      routes.add(`/blog/${s}`);
    }
  }

  return { routes, serviceIds, detailKeys };
}

/* ------------------------------------------------------- what links exist */

function collectLinks() {
  const links = [];
  const push = (href, file, ctx) => links.push({ href, file, ctx });

  /* JSX: <Link to="/x"> and <a href="/x">. Template literals are skipped —
     they cannot be resolved statically and are reported separately. */
  for (const f of walk(SRC).filter((p) => p.endsWith('.jsx'))) {
    const src = read(f);
    for (const [, href] of src.matchAll(/\bto="(\/[^"]*)"/g)) push(href, f, 'Link to');
    for (const [, href] of src.matchAll(/\bhref="(\/[^"]*)"/g)) push(href, f, 'href');
  }

  /* Data files: arrays of ['Label', '/route'] pairs, which is how the industry
     and service pages declare their cross-links. */
  for (const f of walk(path.join(SRC, 'data')).filter((p) => p.endsWith('.js'))) {
    const src = read(f);
    for (const [, href] of src.matchAll(/'(\/(?:services|industries|blog)\/[a-z0-9-]+)'/g)) {
      push(href, f, 'data link');
    }
  }

  /* Markdown articles. Images are excluded with the (?<!!) lookbehind. */
  if (fs.existsSync(CONTENT)) {
    for (const f of fs.readdirSync(CONTENT).filter((x) => x.endsWith('.md') && !x.startsWith('_'))) {
      const src = read(path.join(CONTENT, f));
      for (const [, , href] of src.matchAll(/(?<!!)\[([^\]]+)\]\((\/[^)\s]*)\)/g)) {
        push(href, path.join(CONTENT, f), 'article link');
      }
    }
  }

  return links;
}

/* ------------------------------------------------------------------ check */

const { routes, serviceIds, detailKeys } = resolvableRoutes();
const links = collectLinks();

const errors = [];
const warnings = [];

for (const { href, file, ctx } of links) {
  const clean = href.split('#')[0].split('?')[0].replace(/\/+$/, '') || '/';
  if (clean.startsWith('/images') || clean.startsWith('/videos') || clean.startsWith('/brand')) continue;
  if (routes.has(clean)) continue;

  /* Give a useful reason rather than just "not found". */
  const slug = clean.split('/').pop();
  let why = 'no route resolves this';
  if (clean.startsWith('/services/')) {
    if (serviceIds.includes(slug) && !detailKeys.includes(slug)) {
      why = `"${slug}" is in services.js but has no entry in serviceDetail.js — it will redirect to /services`;
    } else if (!serviceIds.includes(slug)) {
      why = `"${slug}" is not a service id`;
    }
  } else if (clean.startsWith('/blog/')) {
    why = `"${slug}" is not a live article — it may be scheduled, drafted, or misspelt`;
  }
  errors.push(`${rel(file)}\n      ${ctx} "${href}"\n      ${why}`);
}

/* Services advertised on the index with no page behind them are a dead end for
   anyone who clicks the card, even if nothing links to them directly. */
for (const id of serviceIds) {
  if (!detailKeys.includes(id)) {
    warnings.push(`service "${id}" appears on the services index but has no detail page — the card redirects`);
  }
}

/* ----------------------------------------------------------------- report */

const unique = [...new Set(links.map((l) => l.href))].length;
console.log(`\n  ${links.length} internal links (${unique} unique) across ${routes.size} resolvable routes\n`);

if (warnings.length) {
  console.log('  Worth a look');
  for (const w of warnings) console.log(`    ${w}`);
  console.log('');
}

if (errors.length) {
  console.log(`  Dead internal links — ${errors.length}\n`);
  for (const e of errors) console.log(`    ${e}\n`);
  console.log('  A dead internal link is worse than no link: it silently redirects,');
  console.log('  so nobody notices until a visitor does.\n');
  process.exit(1);
}

console.log('  Every internal link resolves.\n');
