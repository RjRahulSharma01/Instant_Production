// Blog data.
//
// Articles are no longer written here. They live as markdown files in
// content/blog/, and scripts/build-blog.mjs turns them into
// blogPosts.generated.js before every build. See content/blog/README.md.
//
// This file keeps the author record, which is hand-maintained rather than per-post,
// and re-exports the generated posts under the names the pages already use.

export const author = {
  name: 'Rahul Sharma',
  role: 'Founder, Instant Production',
  credential: 'IIM Ahmedabad',
  bio: 'Rahul Sharma has spent 15 years in content, with a long history at industry pioneers including Alibaba, ByteDance, HCL and TCS.',
  short: '15 years in content · Alibaba, ByteDance, HCL, TCS',
  url: 'https://www.linkedin.com/in/rahulsharmamat/',
  // sameAs is how Google resolves this byline to a real, known identity rather
  // than treating it as an unverified name on a page. Every profile listed here
  // should be one Rahul actually controls.
  sameAs: [
    'https://www.linkedin.com/in/rahulsharmamat/',
    'https://www.instagram.com/aurbtaorahul',
    'https://sites.google.com/view/rahulsharamamat/home',
  ],
  alumniOf: 'Indian Institute of Management Ahmedabad',
  avatar: '/brand/author-rahul.webp',
  /* Rendered as buttons under every article, and reused in the structured data
     above. Adding one here puts it on all past and future articles at once,
     because the block is shared rather than written per post. */
  links: [
    { label: 'Instagram', href: 'https://www.instagram.com/aurbtaorahul' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rahulsharmamat/' },
  ],
};

import { generatedPosts } from './blogPosts.generated';

/* The generator has already removed drafts and anything not yet due, so
   everything here is live by definition. `publishedPosts` is kept as a name
   because the pages import it. */
export const blogPosts = generatedPosts;
export const publishedPosts = generatedPosts;
export const allPosts = generatedPosts;

export const getPost = (slug) => generatedPosts.find((p) => p.slug === slug);

/* Every tag in use, most-used first. Drives the filter row on the blog index. */
export const allTags = (() => {
  const counts = new Map();
  for (const p of generatedPosts) {
    for (const t of p.tags || []) counts.set(t, (counts.get(t) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t);
})();
