import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { EASE } from '../lib/motion';
import SplitText from './fx/SplitText';
import CountUp from './fx/CountUp';
import Magnetic from './fx/Magnetic';
import RotatingPanel from './fx/RotatingPanel';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

function Hero({ heroData }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  // Scroll-linked parallax: the video drifts slower than the page, the
  // foreground copy lifts and fades as you scroll past. Disabled entirely
  // when the OS asks for reduced motion.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%']);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0.15]);

  return (
    <section ref={ref} id="home" className="relative overflow-hidden bg-ink py-24 sm:py-28 lg:py-32">
      <motion.div className="absolute inset-0" style={{ y: videoY, scale: videoScale }}>
        {/* Branded backdrop sits under the video so there is never a flat
            black frame while it buffers. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(245,158,11,0.20),transparent_55%),radial-gradient(ellipse_at_75%_80%,rgba(245,158,11,0.10),transparent_50%),linear-gradient(135deg,#050505,#141416)]" />
        <video
          className="relative h-full w-full object-cover"
          src={heroData.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.18),transparent_28%)]" />
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ y: copyY, opacity: copyOpacity }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-eyebrow text-brand">
            {heroData.eyebrow}
          </p>
          <SplitText
            as="h1"
            text={heroData.title}
            className="block text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
            stagger={0.05}
          />
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
            {heroData.description}
          </p>

          <ul className="mt-6 flex max-w-2xl flex-wrap gap-x-3 gap-y-2 text-sm text-zinc-400">
            {heroData.services.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand/70" />}
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <Magnetic strength={0.4}>
              <Link to="/portfolio" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand px-6 py-3 font-semibold text-black transition-shadow duration-200 hover:shadow-glow">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-expo group-hover:translate-x-full" />
                <span className="relative z-10 flex items-center gap-2">
                  {heroData.primaryCta}
                  <FiArrowRight className="transition-transform duration-300 ease-expo group-hover:translate-x-1" />
                </span>
              </Link>
            </Magnetic>
            <Link to="/#contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-brand/30 hover:text-brand">
              {heroData.secondaryCta} <FiPlay />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {heroData.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-card">
                <CountUp value={stat.value} className="block text-2xl font-semibold text-white" />
                <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="relative"
        >
          <div className="rounded-panel border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6 shadow-panel">
            <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-brand/25 via-transparent to-brand/10 p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
                  Premium Production
                </span>
                <span className="text-sm text-zinc-400">Digital growth</span>
              </div>

              <div className="mt-8 rounded-panel border border-white/10 bg-white/10 p-6 backdrop-blur">
                <RotatingPanel items={heroData.featured} interval={3000} />
              </div>

              <div className="mt-6 grid gap-3">
                {heroData.highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + index * 0.07, duration: 0.45, ease: EASE }}
                    className="rounded-2xl border border-white/10 bg-black/40 p-4"
                  >
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
