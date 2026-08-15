import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClock } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { useSeo } from '../lib/seo';
import { cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import { allTags, author, publishedPosts } from '../data/blog';

export default function Blog() {
  /* Tag lives in the URL rather than component state, so a filtered view can be
     linked to and shared — and so the tag chips at the foot of an article can
     navigate straight into the right filter. */
  const [params, setParams] = useSearchParams();
  const active = params.get('tag');

  useSeo({
    title: active ? `Insights on ${active}` : 'Insights',
    description:
      'Practical notes on AI video, content strategy, performance marketing and influencer campaigns from the Instant Production team.',
    path: '/blog',
  });

  const posts = useMemo(
    () => (active ? publishedPosts.filter((p) => (p.tags || []).includes(active)) : publishedPosts),
    [active],
  );

  const setTag = (t) => {
    if (!t || t === active) setParams({}, { replace: true });
    else setParams({ tag: t }, { replace: true });
  };

  return (
    <>
      <PageHero
        video={{ desktop: '/videos/pages/blog-1280.mp4', mobile: '/videos/pages/blog-640.mp4' }}
        poster="/videos/pages/blog.webp"
        eyebrow="Insights"
        title="Notes on making content that performs."
        intro="What we have learned running AI video, paid campaigns and creator programmes — written for people who have to make these decisions, not for search engines."
        crumbs={[{ label: 'Insights' }]}
      />

      {/* tag filter */}
      {allTags.length > 0 && (
        <section className="px-4 pb-8 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}
            className="mx-auto flex max-w-7xl flex-wrap items-center gap-2">
            <button type="button" onClick={() => setTag(null)} aria-pressed={!active}
              className={`min-h-[44px] rounded-full border px-4 py-2 text-sm transition-colors ${
                !active ? 'border-brand bg-brand text-black font-medium'
                        : 'border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'}`}>
              All
            </button>
            {allTags.map((t) => (
              <button key={t} type="button" onClick={() => setTag(t)} aria-pressed={active === t}
                className={`min-h-[44px] rounded-full border px-4 py-2 text-sm transition-colors ${
                  active === t ? 'border-brand bg-brand text-black font-medium'
                               : 'border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'}`}>
                {t}
              </button>
            ))}
          </motion.div>
        </section>
      )}

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}
              className="rounded-panel border border-white/10 bg-white/[0.04] p-8 text-center sm:p-14">
              <p className="text-lg font-medium text-white">
                {active ? `Nothing tagged ${active} yet.` : 'First articles are being written.'}
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-400">
                {active
                  ? 'Try another tag, or read everything we have published so far.'
                  : 'We would rather publish four things worth reading than forty written for a crawler. In the meantime, the service pages go into real detail on how each engagement runs.'}
              </p>
              {active ? (
                <button type="button" onClick={() => setTag(null)}
                  className="group mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-6 py-3 text-sm font-semibold text-brand transition-colors duration-200 hover:bg-brand hover:text-black">
                  Show everything
                  <FiArrowRight className="transition-transform duration-300 ease-expo group-hover:translate-x-1" />
                </button>
              ) : (
                <Link to="/services"
                  className="group mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-6 py-3 text-sm font-semibold text-brand transition-colors duration-200 hover:bg-brand hover:text-black">
                  Explore services
                  <FiArrowRight className="transition-transform duration-300 ease-expo group-hover:translate-x-1" />
                </Link>
              )}
            </motion.div>
          ) : (
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.06)}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <motion.article key={post.slug} variants={cardIn} className="h-full">
                  <Link to={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-white/[0.04] transition-colors duration-300 hover:border-brand/40 hover:bg-white/[0.07]">
                    <div className="relative overflow-hidden bg-ink-900" style={{ aspectRatio: '16/9' }}>
                      <img src={post.cover} alt="" aria-hidden="true" loading="lazy"
                        className="h-full w-full object-cover opacity-80 transition-transform duration-700 ease-expo group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                      <span className="absolute bottom-3 left-4 rounded-full border border-brand/30 bg-ink/80 px-3 py-1 text-xs text-brand backdrop-blur">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="text-lg font-semibold leading-snug text-white">{post.title}</h2>
                      <p className="mt-3 text-sm leading-7 text-zinc-400">{post.excerpt}</p>
                      {post.tags?.length > 0 && (
                        <span className="mt-4 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((t) => (
                            <span key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-[0.7rem] text-zinc-500">
                              {t}
                            </span>
                          ))}
                        </span>
                      )}
                      <span className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-5 text-xs text-zinc-500">
                        <span className="text-zinc-400">{author.name}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1.5">
                          <FiClock aria-hidden="true" />
                          {post.readingMinutes} min read
                        </span>
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
