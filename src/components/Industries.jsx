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
          <SplitText as="h2" text="Trusted by brands across sectors that value precision." className="mt-4 block text-3xl font-semibold text-white sm:text-4xl" />
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.06)}
        >
          {industries.map((industry) => {
            const Icon = getIcon(industry.icon);
            return (
              <TiltCard
                key={industry.title}
                variants={cardIn}
                max={9}
                className="group rounded-card border border-white/10 bg-white/5 overflow-hidden"
              >
                {industry.thumbnail ? (
                  <div style={{ aspectRatio: '3/2' }} className="w-full overflow-hidden bg-zinc-900">
                    <img src={industry.thumbnail} alt={industry.title} className="h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-110" loading="lazy" />
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <Icon size={20} />
                    </div>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mt-1 text-xl font-semibold text-white">{industry.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{industry.description}</p>
                  {industry.id === 'healthcare' && (
                    <Link
                      to="/industries/healthcare"
                      className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-brand transition-colors hover:text-brand-300"
                    >
                      Healthcare marketing
                      <span aria-hidden="true" className="transition-transform duration-300 ease-expo group-hover:translate-x-1">→</span>
                    </Link>
                  )}
                </div>
              </TiltCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Industries;
