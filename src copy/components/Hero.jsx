import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

function Hero({ heroData }) {
  return (
    <section id="home" className="relative overflow-hidden bg-[#050505] py-24 sm:py-28 lg:py-32">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src={heroData.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroData.backgroundPoster}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.18),transparent_28%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#f59e0b]">
            {heroData.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            {heroData.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
            Photography • Videography • Website Development • Digital Marketing • Creative Branding
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b] px-6 py-3 font-semibold text-black transition hover:scale-[1.02]">
              {heroData.primaryCta} <FiArrowRight />
            </Link>
            <Link to="/#contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-[#f59e0b]/30 hover:text-[#f59e0b]">
              {heroData.secondaryCta} <FiPlay />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {heroData.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
            <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-[#f59e0b]/25 via-transparent to-[#f59e0b]/10 p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-[#f59e0b]/40 bg-[#f59e0b]/10 px-3 py-1 text-sm font-medium text-[#f59e0b]">
                  Premium Production
                </span>
                <span className="text-sm text-zinc-400">Digital growth</span>
              </div>

              <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">Featured service</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Visual branding that feels elevated</h2>
                <p className="mt-3 text-zinc-300">Every launch, reel, website, and campaign is shaped with cinematic polish and measurable impact.</p>
              </div>

              <div className="mt-6 grid gap-3">
                {heroData.highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.08 }}
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
