import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';
import SplitText from './fx/SplitText';
import { EASE, fadeUp, stagger, viewport } from '../lib/motion';

/**
 * Shared header for internal pages: breadcrumb, animated title, intro and an
 * optional stat strip. Keeps every page opening the same way, which is what
 * makes a site feel designed rather than assembled.
 */
export default function PageHero({ eyebrow, title, intro, crumbs = [], stats = [], children }) {
  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/3 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(245,158,11,0.14),transparent_65%)] blur-2xl"
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger(0.07)}
        className="relative mx-auto max-w-7xl"
      >
        {crumbs.length > 0 && (
          <motion.nav aria-label="Breadcrumb" variants={fadeUp}>
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
              <li><Link to="/" className="transition hover:text-brand">Home</Link></li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <FiChevronRight aria-hidden="true" className="text-zinc-700" />
                  {c.to ? (
                    <Link to={c.to} className="transition hover:text-brand">{c.label}</Link>
                  ) : (
                    <span className="text-zinc-300">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}

        {eyebrow && (
          <motion.p variants={fadeUp} className="mt-6 text-sm font-semibold uppercase tracking-eyebrow text-brand">
            {eyebrow}
          </motion.p>
        )}

        <SplitText
          as="h1"
          text={title}
          className="mt-4 block max-w-4xl text-[2rem] font-semibold leading-[1.12] text-white sm:text-5xl lg:text-6xl"
          stagger={0.04}
        />

        {intro && (
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            {intro}
          </motion.p>
        )}

        {stats.length > 0 && (
          <motion.dl variants={fadeUp} className="mt-10 grid grid-cols-3 gap-3 sm:max-w-2xl sm:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-xl font-semibold text-white sm:text-2xl">{s.value}</span>
                  <span className="mt-1 block text-xs text-zinc-400 sm:text-sm">{s.label}</span>
                </dd>
              </div>
            ))}
          </motion.dl>
        )}

        {children && <motion.div variants={fadeUp} className="mt-10">{children}</motion.div>}
      </motion.div>
    </section>
  );
}
