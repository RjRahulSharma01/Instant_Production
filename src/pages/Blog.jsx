import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClock } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { useSeo } from '../lib/seo';
import { cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import { publishedPosts } from '../data/blog';

export default function Blog() {
  useSeo({
    title: 'Insights',
    description:
      'Practical notes on AI video, content strategy, performance marketing and influencer campaigns from the Instant Production team.',
    path: '/blog',
  });

  const posts = publishedPosts;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes on making content that performs."
        intro="What we have learned running AI video, paid campaigns and creator programmes — written for people who have to make these decisions, not for search engines."
        crumbs={[{ label: 'Insights' }]}
      />

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp}
              className="rounded-panel border border-white/10 bg-white/[0.04] p-8 text-center sm:p-14"
            >
              <p className="text-lg font-medium text-white">First articles are being written.</p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-400">
                We would rather publish four things worth reading than forty written for a crawler.
                In the meantime, the service pages go into real detail on how each engagement runs.
              </p>
              <Link
                to="/services"
                className="group mt-7 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-6 py-3 text-sm font-semibold text-brand transition-colors duration-200 hover:bg-brand hover:text-black"
              >
                Explore services
                <FiArrowRight className="transition-transform duration-300 ease-expo group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={stagger(0.06)}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map((post) => (
                <motion.article key={post.slug} variants={cardIn} className="h-full">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-white/[0.04] transition-colors duration-300 hover:border-brand/40 hover:bg-white/[0.07]"
                  >
                    <div className="relative overflow-hidden bg-ink-900" style={{ aspectRatio: '16/9' }}>
                      <img
                        src={post.cover}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="h-full w-full object-cover opacity-80 transition-transform duration-700 ease-expo group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                      <span className="absolute bottom-3 left-4 rounded-full border border-brand/30 bg-ink/80 px-3 py-1 text-xs text-brand backdrop-blur">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="text-lg font-semibold leading-snug text-white">{post.title}</h2>
                      <p className="mt-3 text-sm leading-7 text-zinc-400">{post.excerpt}</p>
                      <span className="mt-auto flex items-center gap-2 pt-5 text-xs text-zinc-500">
                        <FiClock aria-hidden="true" />
                        {post.readingMinutes} min read
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
