import { motion } from 'framer-motion';
import { getIcon } from '../lib/icons';
import { cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import TiltCard from './fx/TiltCard';
import SplitText from './fx/SplitText';

function Services({ services }) {
  return (
    <section id="services" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div className="max-w-3xl" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
          <p className="text-sm font-semibold uppercase tracking-eyebrow text-brand">Services</p>
          <SplitText
            as="h2"
            text="Strategy, content and campaigns — handled end to end."
            className="mt-4 block text-3xl font-semibold text-white sm:text-4xl"
          />
          <p className="mt-5 text-lg leading-8 text-zinc-400">
            One team across the whole funnel, so the plan, the creative and the media spend all point the same way.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.05)}
        >
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);
            // First and last cards run double-width. With ten services that
            // makes 12 grid cells — flush at both two and three columns,
            // instead of leaving an orphan card on the last row.
            const wide = index === 0 || index === services.length - 1;
            return (
              <TiltCard
                key={service.id}
                variants={cardIn}
                max={7}
                className={`group flex h-full flex-col rounded-card border border-white/10 bg-white/[0.04] p-6 text-left transition-colors duration-300 hover:border-brand/40 hover:bg-white/[0.07] ${
                  wide ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand/25 bg-gradient-to-br from-brand/25 to-brand/5 text-brand transition-transform duration-300 ease-expo group-hover:scale-110">
                  <Icon size={20} aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{service.description}</p>

                <ul className="mt-5 space-y-2 text-sm text-zinc-300">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <span
                  aria-hidden="true"
                  className="mt-6 block h-px w-0 bg-gradient-to-r from-brand to-transparent transition-all duration-500 ease-expo group-hover:w-full"
                />
              </TiltCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
