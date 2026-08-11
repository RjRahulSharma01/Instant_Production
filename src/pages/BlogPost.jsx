import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock } from 'react-icons/fi';
import CtaBand from '../components/CtaBand';
import { useSeo, SITE_URL } from '../lib/seo';
import { fadeUp, stagger, viewport } from '../lib/motion';
import { author, getPost } from '../data/blog';

function Block({ block }) {
  if (block.type === 'h2') {
    return <h2 className="mt-10 text-xl font-semibold text-white sm:text-2xl">{block.text}</h2>;
  }
  if (block.type === 'list') {
    return (
      <ul className="mt-5 space-y-3">
        {block.items.map((i) => (
          <li key={i} className="flex items-start gap-3 text-[0.95rem] leading-7 text-zinc-300">
            <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === 'callout') {
    return (
      <p className="mt-8 border-l-2 border-brand bg-brand/[0.07] py-4 pl-5 pr-4 text-[0.95rem] italic leading-7 text-zinc-200">
        {block.text}
      </p>
    );
  }
  return <p className="mt-5 text-[0.95rem] leading-7 text-zinc-300">{block.text}</p>;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  useSeo({
    title: post?.title,
    description: post?.excerpt,
    path: `/blog/${slug}`,
  });

  if (!post) return <Navigate to="/blog" replace />;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role,
      url: author.url,
      // sameAs is how Google resolves this byline to a known real identity
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

  return (
    <>
      <article className="px-4 pb-8 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger(0.06)}
          className="mx-auto max-w-3xl"
        >
          <motion.div variants={fadeUp}>
            <Link to="/blog" className="group inline-flex items-center gap-2 text-xs text-zinc-500 transition hover:text-brand">
              <FiArrowLeft className="transition-transform duration-300 ease-expo group-hover:-translate-x-1" />
              All insights
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-brand">{post.category}</span>
            <span className="flex items-center gap-1.5 text-zinc-500">
              <FiClock aria-hidden="true" /> {post.readingMinutes} min read
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="mt-5 text-[1.9rem] font-semibold leading-[1.15] text-white sm:text-4xl">
            {post.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 text-base leading-8 text-zinc-400">
            {post.excerpt}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-7 flex items-center gap-3 border-y border-white/10 py-4">
            <img
              src={author.avatar}
              alt={author.name}
              width="44"
              height="44"
              className="h-11 w-11 rounded-full border border-white/10 object-cover"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">{author.name}</p>
              <p className="text-xs text-zinc-500">
                {author.short} · {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-7 overflow-hidden rounded-panel border border-white/10">
            <img src={post.cover} alt="" aria-hidden="true" className="w-full object-cover opacity-85" />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-4">
            {post.body.map((b, i) => <Block key={i} block={b} />)}
          </motion.div>
        </motion.div>
      </article>

      <section className="px-4 pb-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}
          className="mx-auto flex max-w-3xl items-start gap-4 rounded-panel border border-white/10 bg-white/[0.04] p-6"
        >
          <img
            src={author.avatar}
            alt={author.name}
            width="56"
            height="56"
            className="h-14 w-14 shrink-0 rounded-full border border-white/10 object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-white">{author.name}</p>
            <p className="text-xs text-brand">{author.role} · {author.credential}</p>
            <p className="mt-2 text-sm leading-7 text-zinc-400">{author.bio}</p>
            <a
              href={author.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brand transition-colors hover:text-brand-300"
            >
              Connect on LinkedIn
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </motion.div>
      </section>

      <CtaBand title="Want this applied to your brand?" cta="Talk to us" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
