import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../lib/icons';
import { cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import TiltCard from './fx/TiltCard';
import SplitText from './fx/SplitText';

function Industries({ industries }) {
  return (
    <section id="industries" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div className="max-w-2xl" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
          <p className="text-sm font-semibold uppercase tracking-eyebrow text-brand">Industries</p>
          <SplitText
            as="h2"
            text="Trusted by brands across sectors that value precision."
            className="mt-4 block text-3xl font-semibold text-white sm:text-4xl"
          />
        </motion.div>

        <motion.div
          className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.06)}
        >
          {industries.map((industry) => {
            const Icon = getIcon(industry.icon);
            return (
              <TiltCard key={industry.id} variants={cardIn} max={7} className="h-full">
                {/* The entire card is the link — no separate text CTA. */}
                <Link
                  to={`/industries/${industry.id}`}
                  aria-label={`${industry.title} marketing`}
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-white/[0.04] transition-colors duration-300 hover:border-brand/40 hover:bg-white/[0.07]"
                >
                  <div className="relative overflow-hidden bg-ink-900" style={{ aspectRatio: '16/9' }}>
                    <img
                      src={industry.thumbnail}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      width="1000"
                      height="563"
                      className="h-full w-full object-cover opacity-80 transition-all duration-700 ease-expo group-hover:scale-110 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
                    <div className="absolute inset-0 bg-brand/10 mix-blend-overlay" />

                    <span className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl border border-brand/30 bg-ink/80 text-brand backdrop-blur transition-transform duration-300 ease-expo group-hover:scale-110">
                      <Icon size={17} aria-hidden="true" />
                    </span>

                    {/* Arrow affordance so the card reads as clickable */}
                    <span className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/20 bg-ink/70 text-white opacity-0 backdrop-blur transition-all duration-300 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
                      <span aria-hidden="true" className="text-sm">↗</span>
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-semibold text-white transition-colors duration-200 group-hover:text-brand">
                      {industry.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-400">{industry.description}</p>
                    <span
                      aria-hidden="true"
                      className="mt-auto block h-px w-0 bg-gradient-to-r from-brand to-transparent pt-6 transition-all duration-500 ease-expo group-hover:w-full"
                    />
                  </div>
                </Link>
              </TiltCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Industries;
