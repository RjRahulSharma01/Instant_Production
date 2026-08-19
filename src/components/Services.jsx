import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../lib/icons';
import { cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import TiltCard from './fx/TiltCard';
import SplitText from './fx/SplitText';
import { serviceDetail } from '../data/serviceDetail';

function Services({ services }) {
  return (
    <section id="services" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div className="max-w-3xl" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
          <p className="text-sm font-semibold uppercase tracking-eyebrow text-brand">Services</p>
          <SplitText
            as="h2"
            text="Strategy, content and campaigns, handled end to end."
            className="mt-4 block text-3xl font-semibold text-white sm:text-4xl"
          />
          <p className="mt-5 text-lg leading-8 text-zinc-400">
            One team across the whole funnel, so the plan, the creative and the media spend all point the same way.
          </p>
        </motion.div>

        <motion.div
          className="snap-x-scroll -mx-4 mt-10 flex gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.05)}
        >
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);
            // First and last cards run double-width. With ten services that
            // makes 12 grid cells, flush at both two and three columns.
            const wide = index === 0 || index === services.length - 1;
            return (
              <TiltCard
                key={service.id}
                variants={cardIn}
                max={7}
                /* `relative` so the Learn more link below can stretch its hit area
                   across the whole card. */
                className={`group relative flex h-full w-[82vw] shrink-0 flex-col overflow-hidden rounded-card border border-white/10 bg-white/[0.04] text-left transition-colors duration-300 hover:border-brand/40 hover:bg-white/[0.07] sm:w-auto sm:shrink ${
                  wide ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="relative overflow-hidden bg-ink-900" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={service.thumbnail}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    width="1000"
                    height="563"
                    className="h-full w-full object-cover opacity-80 transition-all duration-700 ease-expo group-hover:scale-110 group-hover:opacity-100"
                  />
                  {/* Ties every thumbnail back to the brand and keeps the
                      card border reading cleanly against varied photos. The
                      flat layer underneath is new: several of these
                      thumbnails have their title baked into the image
                      itself, and the gradient alone left the top of some
                      images too bright for that text to read reliably. */}
                  <div className="absolute inset-0 bg-ink/25" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
                  <div className="absolute inset-0 bg-brand/10 mix-blend-overlay" />

                  <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl border border-brand/30 bg-ink/80 text-brand backdrop-blur transition-transform duration-300 ease-expo group-hover:scale-110">
                    <Icon size={17} aria-hidden="true" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{service.description}</p>

                  <ul className="mt-5 space-y-2 text-sm text-zinc-300">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {serviceDetail[service.id] ? (
                    /* The whole tile is the click target, not just these two
                       words. `after:absolute after:inset-0` stretches this one
                       link over the entire card.

                       Done this way rather than by wrapping the card in a Link,
                       because the card also holds a heading and a list, and
                       burying those inside an anchor makes a screen reader
                       announce the whole thing as one long link name. Here the
                       link is still called "Learn more about AI Videos", and
                       the tile is merely where you can click it.

                       `relative z-10` on the text keeps it selectable above the
                       stretched layer. */
                    <Link
                      to={`/services/${service.id}`}
                      aria-label={`Learn more about ${service.title}`}
                      className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand transition-colors after:absolute after:inset-0 after:content-[''] hover:text-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                    >
                      <span className="relative z-10">Learn more</span>
                      <span aria-hidden="true" className="relative z-10 transition-transform duration-300 ease-expo group-hover:translate-x-1">→</span>
                    </Link>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="mt-auto block h-px w-0 bg-gradient-to-r from-brand to-transparent pt-6 transition-all duration-500 ease-expo group-hover:w-full"
                    />
                  )}
                </div>
              </TiltCard>
            );
          })}
        </motion.div>

        <p className="mt-3 text-xs text-zinc-400 sm:hidden">Swipe to see all {services.length} services →</p>
      </div>
    </section>
  );
}

export default Services;
