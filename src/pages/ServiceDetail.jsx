import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiPlus, FiTarget, FiSlash } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { getIcon } from '../lib/icons';
import { useSeo, SITE_URL } from '../lib/seo';
import { EASE, cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import { services } from '../data/services';
import { serviceDetail } from '../data/serviceDetail';

/* Shared template for all ten service pages.
 *
 * Rebuilt to match the depth of the industry pages. The additions that matter:
 * an answer-first block, the metric the service is measured on, the
 * misconception we most often correct, and an honest "when this is not for
 * you" section, which is the cheapest trust the site can buy and the rarest
 * thing in agency marketing.
 *
 * Everything is driven by data, so the ten pages stay consistent with each
 * other. A buyer comparing two services should not feel they are reading two
 * different websites. */

function Section({ children, className = '', tint = false }) {
  return (
    <section className={`relative px-4 py-14 sm:px-6 sm:py-16 lg:px-8 ${className}`}>
      {tint && (
        <div aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
      <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.06)}
        className="mx-auto max-w-7xl">
        {children}
      </motion.div>
    </section>
  );
}

function Heading({ eyebrow, title, lede }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-eyebrow text-brand">
          {eyebrow}
        </motion.p>
      )}
      <motion.h2 variants={fadeUp} className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-[1.9rem]">
        {title}
      </motion.h2>
      {lede && <motion.p variants={fadeUp} className="mt-4 text-[0.95rem] leading-8 text-zinc-400">{lede}</motion.p>}
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(0);
  const reduce = useReducedMotion();

  const service = services.find((s) => s.id === slug);
  const d = serviceDetail[slug];

  useSeo({
    title: d?.metaTitle,
    description: d?.metaDescription,
    path: `/services/${slug}`,
  });

  if (!service || !d) return <Navigate to="/services" replace />;

  const Icon = getIcon(service.icon);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: service.title, item: `${SITE_URL}/services/${slug}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      ...(d.question ? [{ '@type': 'Question', name: d.question, acceptedAnswer: { '@type': 'Answer', text: d.answer } }] : []),
      ...(d.faqs || []).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    ],
  };

  /* Service schema so the offering itself is machine-readable, not just the FAQ. */
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: d.metaTitle || service.title,
    description: d.metaDescription,
    serviceType: service.title,
    provider: { '@type': 'Organization', name: 'Instant Production', url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'India' },
    url: `${SITE_URL}/services/${slug}`,
  };

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        intro={d.lede}
        crumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}
      />

      {/* -------------------------------------- answer first, then the metric */}
      <Section className="pt-2">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          {d.question && (
            <motion.div variants={fadeUp} className="rounded-panel border border-brand/25 bg-brand/[0.06] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-brand">The short answer</p>
              <h2 className="mt-3.5 text-lg font-semibold leading-snug text-white sm:text-xl">{d.question}</h2>
              <p className="mt-4 text-[0.95rem] leading-8 text-zinc-300">{d.answer}</p>
            </motion.div>
          )}

          {d.metric && (
            <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/15 text-brand">
                <FiTarget aria-hidden="true" size={16} />
              </span>
              <p className="mt-4 text-xs uppercase tracking-eyebrow text-zinc-500">{d.metric.label}</p>
              <p className="mt-1.5 text-xl font-semibold leading-snug text-brand">{d.metric.value}</p>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{d.metric.body}</p>
            </motion.div>
          )}
        </div>
      </Section>

      {/* ------------------------------------------------------ misconception */}
      {d.misconception && (
        <Section tint>
          <motion.div variants={fadeUp} className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-brand">What we usually have to correct</p>
            <p className="mt-4 text-xl font-medium leading-9 text-zinc-500 line-through decoration-rose-400/40 decoration-1 sm:text-2xl">
              {d.misconception.wrong}
            </p>
            <p className="mt-5 text-[0.95rem] leading-8 text-zinc-200">{d.misconception.right}</p>
          </motion.div>
        </Section>
      )}

      {/* ---------------------------------------------------------- outcomes */}
      <Section tint>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <motion.span variants={fadeUp}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-brand">
              <Icon aria-hidden="true" size={22} />
            </motion.span>
            <Heading eyebrow="What you get" title="The outcomes this is bought for." />
          </div>
          <motion.ul variants={stagger(0.06)} className="space-y-3">
            {d.outcomes.map((o) => (
              <motion.li key={o} variants={cardIn}
                className="flex items-start gap-3 rounded-card border border-white/10 bg-white/[0.04] p-5">
                <FiCheck aria-hidden="true" className="mt-0.5 shrink-0 text-brand" />
                <span className="text-sm leading-7 text-zinc-200">{o}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Section>

      {/* ----------------------------------------------------------- process */}
      <Section tint>
        <Heading eyebrow="How it runs" title="The process, in the order it actually happens." />
        <div className="mt-9 grid gap-3 lg:grid-cols-4">
          {d.process.map((p, i) => (
            <motion.div key={p.step} variants={cardIn}
              className="rounded-card border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-brand/30">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-black">
                {i + 1}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-white">{p.step}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------ deliverables + engagement */}
      <Section tint>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-brand">Deliverables</p>
            <ul className="mt-5 space-y-3">
              {d.deliverables.map((x) => (
                <li key={x} className="flex items-start gap-3 text-sm leading-7 text-zinc-300">
                  <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {x}
                </li>
              ))}
            </ul>
          </motion.div>

          {d.engagement && (
            <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-brand">How it is bought</p>
              <dl className="mt-5 space-y-4">
                {[['Shape', d.engagement.shape], ['Rhythm', d.engagement.cadence], ['Commitment', d.engagement.commitment]].map(([k, v]) => (
                  <div key={k} className="border-b border-white/[0.07] pb-4 last:border-0 last:pb-0">
                    <dt className="text-[0.7rem] uppercase tracking-eyebrow text-zinc-500">{k}</dt>
                    <dd className="mt-1.5 text-sm leading-7 text-zinc-300">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs leading-6 text-zinc-500">
                We do not publish prices, because they depend entirely on scope and a number invented
                here would be wrong for almost everyone. Share the goal and the timeline and you will
                get a real one back, usually within a working day.
              </p>
            </motion.div>
          )}
        </div>
      </Section>

      {/* ------------------------------------------------------------ not for */}
      {d.notFor && (
        <Section tint>
          <Heading
            eyebrow="When this is the wrong thing to buy"
            title="Cases where we would tell you not to."
            lede="Every agency page lists who a service is for. This is the more useful half, and it saves both sides a month."
          />
          <div className="mt-9 grid gap-3 lg:grid-cols-3">
            {d.notFor.map((n) => (
              <motion.div key={n} variants={cardIn}
                className="flex items-start gap-3 rounded-card border border-white/10 bg-white/[0.03] p-5">
                <FiSlash aria-hidden="true" className="mt-0.5 shrink-0 text-zinc-600" size={15} />
                <span className="text-sm leading-7 text-zinc-400">{n}</span>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* ---------------------------------------------------------------- faq */}
      <Section tint>
        <div className="mx-auto max-w-3xl">
          <Heading eyebrow="Questions we get asked" title={`About ${service.title.toLowerCase()}.`} />
          <motion.div variants={fadeUp} className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {d.faqs.map((f, i) => {
              const on = openFaq === i;
              return (
                <div key={f.q}>
                  <h3>
                    <button type="button" onClick={() => setOpenFaq(on ? -1 : i)} aria-expanded={on}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-white">
                      <span className="text-base font-medium text-white">{f.q}</span>
                      <motion.span animate={{ rotate: on ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }} className="shrink-0 text-brand">
                        <FiPlus size={20} />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.34, ease: EASE }} className="overflow-hidden">
                        <p className="pb-5 pr-8 text-sm leading-7 text-zinc-400">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </Section>

      {/* -------------------------------------------------- pairs / next steps */}
      {d.pairs && (
        <Section tint>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <motion.h2 variants={fadeUp} className="text-lg font-semibold text-white">Usually runs with</motion.h2>
              <motion.div variants={fadeUp} className="mt-4 flex flex-wrap gap-2.5">
                {d.pairs.services.map(([label, to]) => (
                  <Link key={to} to={to}
                    className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-brand/40 hover:text-brand">
                    {label}
                    <FiArrowRight aria-hidden="true" className="transition-transform duration-300 ease-expo group-hover:translate-x-0.5" size={14} />
                  </Link>
                ))}
              </motion.div>
            </div>
            <div>
              <motion.h2 variants={fadeUp} className="text-lg font-semibold text-white">Where it matters most</motion.h2>
              <motion.div variants={fadeUp} className="mt-4 flex flex-wrap gap-2.5">
                {d.pairs.industries.map(([label, to]) => (
                  <Link key={to} to={to}
                    className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-brand/40 hover:text-brand">
                    {label}
                    <FiArrowRight aria-hidden="true" className="transition-transform duration-300 ease-expo group-hover:translate-x-0.5" size={14} />
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </Section>
      )}

      {/* -------------------------------------------------------- all services */}
      <Section className="py-10">
        <motion.h2 variants={fadeUp} className="text-lg font-semibold text-white">Every service</motion.h2>
        <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-2.5">
          {services.filter((s) => s.id !== slug && serviceDetail[s.id]).map((s) => (
            <Link key={s.id} to={`/services/${s.id}`}
              className="inline-flex min-h-[44px] items-center rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-white/30 hover:text-white">
              {s.title}
            </Link>
          ))}
        </motion.div>
      </Section>

      <CtaBand title={`Need ${service.title.toLowerCase()}?`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
