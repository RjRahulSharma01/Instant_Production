// Blog data.
//
// Articles are no longer written here. They live as markdown files in
// content/blog/, and scripts/build-blog.mjs turns them into
// blogPosts.generated.js before every build. See content/blog/README.md.
//
// This file keeps the author record — which is hand-maintained, not per-post —
// and re-exports the generated posts under the names the pages already use.

export const author = {
  name: 'Rahul Sharma',
  role: 'Founder, Instant Production',
  credential: 'IIM Ahmedabad',
  bio: 'IIM Ahmedabad alumnus with 11+ years in digital content and media. Currently leads growth and retention for Josh at VerSe Innovation, and founded Instant Production to bring the same AI-first content systems to brands. Previously at ByteDance, Trell and TCS.',
  short: 'IIMA · 11+ years in content and media · AI-first since 2023',
  url: 'https://www.linkedin.com/in/rahulsharmamat/',
  // sameAs is how Google resolves this byline to a real, known identity rather
  // than treating it as an unverified name on a page.
  sameAs: [
    'https://www.linkedin.com/in/rahulsharmamat/',
    'https://sites.google.com/view/rahulsharamamat/home',
  ],
  alumniOf: 'Indian Institute of Management Ahmedabad',
  avatar: '/brand/author-rahul.webp',
};

import { generatedPosts } from './blogPosts.generated';

/* The generator has already removed drafts and anything not yet due, so
   everything here is live by definition. `publishedPosts` is kept as a name
   because the pages import it. */
export const blogPosts = generatedPosts;
export const publishedPosts = generatedPosts;
export const allPosts = generatedPosts;

export const getPost = (slug) => generatedPosts.find((p) => p.slug === slug);

/* Every tag in use, most-used first — drives the filter row on the blog index. */
export const allTags = (() => {
  const counts = new Map();
  for (const p of generatedPosts) {
    for (const t of p.tags || []) counts.set(t, (counts.get(t) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t);
})();
