import { useCallback } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiClock, FiRefreshCw } from 'react-icons/fi';
import CtaBand from '../components/CtaBand';
import { useSeo, SITE_URL } from '../lib/seo';
import { cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import { author, getPost, publishedPosts } from '../data/blog';

/* Blocks arrive pre-rendered as HTML strings from scripts/build-blog.mjs, which
   escapes the author's text before adding its own tags. The content is
   first-party and version-controlled — it comes from markdown files in our own
   repo, never from a user or an API — so this is a closed loop, not an
   injection surface. */

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="mt-12 text-xl font-semibold text-white sm:text-2xl"
        dangerouslySetInnerHTML={{ __html: block.html }} />;

    case 'h3':
      return <h3 className="mt-9 text-base font-semibold text-white sm:text-lg"
        dangerouslySetInnerHTML={{ __html: block.html }} />;

    case 'list':
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((html, i) => (
            <li key={i} className="flex items-start gap-3 text-[0.95rem] leading-7 text-zinc-300">
              <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <span dangerouslySetInnerHTML={{ __html: html }} />
            </li>
          ))}
        </ul>
      );

    case 'olist':
      return (
        <ol className="mt-5 space-y-3">
          {block.items.map((html, i) => (
            <li key={i} className="flex items-start gap-3 text-[0.95rem] leading-7 text-zinc-300">
              <span aria-hidden="true"
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-xs font-semibold text-brand">
                {i + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: html }} />
            </li>
          ))}
        </ol>
      );

    case 'callout':
      return (
        <p className="mt-8 border-l-2 border-brand bg-brand/[0.07] py-4 pl-5 pr-4 text-[0.95rem] leading-7 text-zinc-200"
          dangerouslySetInnerHTML={{ __html: block.html }} />
      );

    /* alt is for screen readers, caption is for everyone. They used to be the
       same string, which meant either the caption read like alt text or the alt
       text read like a caption. Now: ![alt](src "caption"). */
    case 'image':
      return (
        <figure className="mt-8">
          <img src={block.src} alt={block.alt} loading="lazy"
            className="w-full rounded-card border border-white/10" />
          {block.caption && <figcaption className="mt-2.5 text-xs text-zinc-500">{block.caption}</figcaption>}
        </figure>
      );

    case 'images':
      return (
        <div className={`mt-8 grid gap-4 ${block.items.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {block.items.map((im, i) => (
            <figure key={i}>
              <img src={im.src} alt={im.alt} loading="lazy"
                className="w-full rounded-card border border-white/10 object-cover"
                style={{ aspectRatio: '4/3' }} />
              {im.caption && <figcaption className="mt-2 text-xs text-zinc-500">{im.caption}</figcaption>}
            </figure>
          ))}
        </div>
      );

    /* Nothing loads from YouTube until the reader scrolls to it, and the
       nocookie domain means no tracking cookie is set unless they press play. */
    case 'video':
      return (
        <div className="mt-8 overflow-hidden rounded-card border border-white/10"
          style={{ aspectRatio: '16/9' }}>
          <iframe src={block.src} title={block.title} loading="lazy" className="h-full w-full"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen />
        </div>
      );

    case 'stat':
      return (
        <div className="mt-8 flex flex-col gap-3 rounded-card border border-brand/25 bg-brand/[0.06] p-6 sm:flex-row sm:items-center sm:gap-6">
          <p className="shrink-0 text-3xl font-semibold leading-none tracking-tight text-brand sm:text-4xl">
            {block.figure}
          </p>
          <p className="text-[0.95rem] leading-7 text-zinc-200"
            dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );

    case 'cta':
      return (
        <div className="mt-10 rounded-card border border-white/10 bg-white/[0.04] p-6">
          <p className="text-[0.95rem] leading-7 text-zinc-200"
            dangerouslySetInnerHTML={{ __html: block.html }} />
          {block.href.startsWith('/') ? (
            <Link to={block.href}
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-black transition hover:bg-brand/90">
              {block.label} <FiArrowRight aria-hidden="true" />
            </Link>
          ) : (
            <a href={block.href} target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-black transition hover:bg-brand/90">
              {block.label} <FiArrowRight aria-hidden="true" />
            </a>
          )}
        </div>
      );

    case 'code':
      return (
        <pre className="mt-8 overflow-x-auto rounded-card border border-white/10 bg-black/50 p-5 text-[0.8rem] leading-6">
          <code className="text-zinc-300">{block.text}</code>
        </pre>
      );

    case 'table':
      return (
        <div className="mt-8 overflow-x-auto rounded-card border border-white/10">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-white/[0.05]">
                {block.head.map((h, i) => (
                  <th key={i} scope="col"
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-eyebrow text-zinc-400"
                    dangerouslySetInnerHTML={{ __html: h }} />
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i} className="border-t border-white/[0.07]">
                  {r.map((c, j) => (
                    <td key={j} className="px-4 py-3 align-top text-zinc-300"
                      dangerouslySetInnerHTML={{ __html: c }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'hr':
      return <hr className="mt-10 border-white/10" />;

    default:
      return <p className="mt-5 text-[0.95rem] leading-7 text-zinc-300"
        dangerouslySetInnerHTML={{ __html: block.html }} />;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPost(slug);

  useSeo({
    title: post?.metaTitle || post?.title,
    description: post?.metaDescription || post?.excerpt,
    path: `/blog/${slug}`,
  });

  /* Links inside the article body are real <a> tags, so an internal one would
     otherwise trigger a full page reload and lose the SPA. Catching the click
     here keeps navigation instant while leaving the href intact for crawlers,
     middle-click and "open in new tab". */
  const onBodyClick = useCallback((e) => {
    const a = e.target.closest('a[data-internal]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(a.getAttribute('href'));
  }, [navigate]);

  if (!post) return <Navigate to="/blog" replace />;

  const related = (post.related || [])
    .map((s) => publishedPosts.find((p) => p.slug === s))
    .filter(Boolean);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.cover}`,
    datePublished: post.date,
    ...(post.updated ? { dateModified: post.updated } : {}),
    keywords: (post.keywords || []).join(', '),
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role,
      url: author.url,
      sameAs: author.sameAs,
      alumniOf: { '@type': 'CollegeOrUniversity', name: author.alumniOf },
      worksFor: { '@type': 'Organization', name: 'Instant Production' },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Instant Production',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/brand/logo-full.svg` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <article className="px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <motion.div initial="hidden" animate="show" variants={stagger(0.07)} className="mx-auto max-w-3xl">
          <motion.div variants={fadeUp}>
            <Link to="/blog"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-brand">
              <FiArrowLeft aria-hidden="true" /> All insights
            </Link>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-7 text-xs font-semibold uppercase tracking-eyebrow text-brand">
            {post.category}
          </motion.p>

          <motion.h1 variants={fadeUp}
            className="mt-4 text-[2rem] font-semibold leading-[1.15] text-white sm:text-4xl">
            {post.title}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 text-base leading-8 text-zinc-400">
            {post.excerpt}
          </motion.p>

          {/* byline */}
          <motion.div variants={fadeUp}
            className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-white/10 py-4">
            <img src={author.avatar} alt="" aria-hidden="true"
              className="h-10 w-10 shrink-0 rounded-full object-cover" loading="lazy" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">{author.name}</p>
              <p className="text-xs text-zinc-500">{author.short}</p>
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5"><FiClock aria-hidden="true" />{post.readingMinutes} min read</span>
              {post.updated && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <FiRefreshCw aria-hidden="true" size={12} />
                    Updated {new Date(post.updated).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </>
              )}
            </div>
          </motion.div>

          {/* banner */}
          {post.cover && (
            <motion.figure variants={fadeUp} className="mt-8">
              <img src={post.cover} alt={post.bannerAlt || ''}
                className="w-full rounded-panel border border-white/10 object-cover"
                style={{ aspectRatio: '16/9' }} />
              {post.bannerCaption && (
                <figcaption className="mt-2.5 text-xs text-zinc-500">{post.bannerCaption}</figcaption>
              )}
            </motion.figure>
          )}

          {/* body */}
          <motion.div variants={fadeUp} className="mt-4" onClickCapture={onBodyClick}>
            {post.body.map((b, i) => <Block key={i} block={b} />)}
          </motion.div>

          {/* tags */}
          {post.tags?.length > 0 && (
            <motion.div variants={fadeUp} className="mt-12 flex flex-wrap gap-2 border-t border-white/10 pt-7">
              {post.tags.map((t) => (
                <Link key={t} to={`/blog?tag=${encodeURIComponent(t)}`}
                  className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-zinc-400 transition hover:border-brand/40 hover:text-brand">
                  {t}
                </Link>
              ))}
            </motion.div>
          )}

          {/* author note */}
          <motion.div variants={fadeUp} className="mt-8 rounded-card border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-white">{author.name}</p>
            <p className="mt-2 text-sm leading-7 text-zinc-400">{author.bio}</p>
          </motion.div>
        </motion.div>
      </article>

      {/* read next */}
      {related.length > 0 && (
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.06)}
            className="mx-auto max-w-3xl">
            <motion.h2 variants={fadeUp} className="text-lg font-semibold text-white">Read next</motion.h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <motion.div key={r.slug} variants={cardIn}>
                  <Link to={`/blog/${r.slug}`}
                    className="group flex h-full flex-col rounded-card border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-brand/40">
                    <p className="text-xs font-semibold uppercase tracking-eyebrow text-brand">{r.category}</p>
                    <p className="mt-2.5 text-sm font-medium leading-6 text-white">{r.title}</p>
                    <span className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-zinc-500">
                      {r.readingMinutes} min read
                      <FiArrowRight aria-hidden="true"
                        className="transition-transform duration-300 ease-expo group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
