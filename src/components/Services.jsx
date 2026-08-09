import { motion } from 'framer-motion';
import { getIcon } from '../lib/icons';
import { cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import TiltCard from './fx/TiltCard';
import SplitText from './fx/SplitText';

function Services({ services }) {
  return (
    <section id="services" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div className="max-w-2xl" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
          <p className="text-sm font-semibold uppercase tracking-eyebrow text-brand">Services</p>
          <SplitText as="h2" text="Premium solutions for modern growth." className="mt-4 block text-3xl font-semibold text-white sm:text-4xl" />
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.06)}
        >
          {services.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <TiltCard
                key={service.title}
                variants={cardIn}
                max={9}
                className="group rounded-card border border-white/10 bg-white p-0 text-left shadow-card overflow-hidden"
              >
                {service.thumbnail ? (
                  <div style={{ aspectRatio: '16/9' }} className="w-full overflow-hidden bg-zinc-900">
                    <img src={service.thumbnail} alt={service.title} className="h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-110" loading="lazy" />
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <Icon size={20} />
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="mt-1 text-xl font-semibold text-zinc-900">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{service.description}</p>
                  <ul className="mt-5 space-y-2 text-sm text-zinc-700">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                </div>
              </TiltCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
