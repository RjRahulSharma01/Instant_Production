import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiPlus, FiInfo, FiExternalLink, FiShield } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { useSeo, SITE_URL } from '../lib/seo';
import { EASE, cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import { LeakFunnel, CacDumbbell, ComplianceGate, CpcClimb, TrustSequence } from '../components/fintech/FinViz';
import {
  SOURCES, scale, funnel, cac, compliance, engines, model, journey, faqs, services,
} from '../data/fintechData';

/* Deep-build industry page for Fintech. Registered ahead of the generic
   industries/:slug route, same pattern as healthcare and e-commerce. */

function Section({ children, className = '', tint = false }) {
  return (
    <section className={`relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 ${className}`}>
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

function Heading({ eyebrow, title, lede, className = '' }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && (
        <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-eyebrow text-brand">
          {eyebrow}
        </motion.p>
      )}
      <motion.h2 variants={fadeUp} className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-[2rem]">
        {title}
      </motion.h2>
      {lede && <motion.p variants={fadeUp} className="mt-4 text-[0.95rem] leading-8 text-zinc-400">{lede}</motion.p>}
    </div>
  );
}

function Answer({ q, a, tag = 'The short answer' }) {
  return (
    <motion.div variants={fadeUp} className="rounded-panel border border-brand/25 bg-brand/[0.06] p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-eyebrow text-brand">{tag}</p>
      <h3 className="mt-3.5 text-lg font-semibold leading-snug text-white sm:text-xl">{q}</h3>
      <p className="mt-4 text-[0.95rem] leading-8 text-zinc-300">{a}</p>
    </motion.div>
  );
}

function Cite({ id }) {
  const s = SOURCES[id];
  if (!s) return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.7rem] leading-5 text-zinc-600">
      <FiInfo aria-hidden="true" className="mt-px shrink-0" />{s.label}
    </span>
  );
}

export default function Fintech() {
  const [openFaq, setOpenFaq] = useState(0);
  const reduce = useReducedMotion();

  useSeo({
    title: 'Fintech Marketing',
    description:
      'Only 18% of Indian fintech registrations reach funded status. CAC by category, SEBI and RBI marketing rules, and what to measure instead of installs — with sources.',
    path: '/industries/fintech',
  });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: funnel.question, acceptedAnswer: { '@type': 'Answer', text: funnel.answer } },
      { '@type': 'Question', name: compliance.question, acceptedAnswer: { '@type': 'Answer', text: compliance.answer } },
      ...faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    ],
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE_URL}/industries` },
      { '@type': 'ListItem', position: 3, name: 'Fintech', item: `${SITE_URL}/industries/fintech` },
    ],
  };

  return (
    <>
      <PageHero
        eyebrow="Fintech Marketing"
        title="You are not buying installs. You are buying funded accounts."
        intro="About 18% of registrations across Indian fintech ever reach funded status. Everything else is a cost. The campaigns that look most efficient on a dashboard are usually the ones optimising hardest for the wrong step."
        crumbs={[{ label: 'Industries', to: '/industries' }, { label: 'Fintech' }]}
      />

      {/* ---------------------------------------------------------- scale */}
      <Section className="pt-0">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {scale.map((s) => (
            <motion.div key={s.label} variants={cardIn}
              className="rounded-card border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-brand/30">
              <p className="text-3xl font-semibold tracking-tight text-white">
                {s.value}<span className="ml-1 text-base font-medium text-brand">{s.unit}</span>
              </p>
              <p className="mt-2 text-sm font-medium text-zinc-300">{s.label}</p>
              <p className="mt-1.5 text-xs leading-5 text-zinc-500">{s.note}</p>
              <p className="mt-3 border-t border-white/[0.07] pt-2.5"><Cite id={s.src} /></p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------ the funnel */}
      <Section tint>
        <Heading
          eyebrow="The constraint"
          title="The metric on your dashboard is five steps above the one that matters."
          lede="Payments infrastructure in India is world-class and essentially free to use. That has made acquisition cheap to start and brutal to finish — the friction moved from the transaction to the onboarding."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Answer q={funnel.question} a={funnel.answer} tag="Why the funnel lies" />
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <LeakFunnel steps={funnel.steps} />
          </motion.div>
        </div>
        <motion.p variants={fadeUp} className="mt-4 flex flex-wrap items-start gap-x-3 gap-y-2 text-xs leading-6 text-zinc-500">
          <span className="max-w-3xl">{funnel.note}</span>
          <Cite id={funnel.src} />
        </motion.p>
      </Section>

      {/* --------------------------------------------------------- the CAC */}
      <Section tint>
        <Heading
          eyebrow={`Acquisition cost · ${cac.window}`}
          title="Every category got more expensive. None of them got better."
          lede="This is not a failure of anyone's media buying. It is what happens when an entire industry funnels its budget into the same two platforms, targeting an audience that has already been acquired."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <CacDumbbell items={cac.items} />
          </motion.div>
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <CpcClimb then={cac.cpc.then} now={cac.cpc.now} label={cac.cpc.label} />
          </motion.div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cac.drivers.map((d) => (
            <motion.div key={d.label} variants={cardIn} className="rounded-card border border-white/10 bg-white/[0.03] p-5">
              <p className="text-lg font-semibold text-brand">{d.stat}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{d.label}</p>
            </motion.div>
          ))}
        </div>
        <motion.p variants={fadeUp} className="mt-4"><Cite id={cac.src} /></motion.p>
      </Section>

      {/* ------------------------------------------------------ compliance */}
      <Section tint>
        <Heading
          eyebrow="What you are allowed to do"
          title="Since 2025, the rule reaches your agency too."
          lede="Regulated entities may not associate with unregistered financial influencers — and the restriction explicitly extends to the marketing agencies acting on their behalf. Most agencies pitching fintech have not read this. It is now their problem as well as yours."
        />
        <div className="mt-10 grid gap-6">
          <Answer q={compliance.question} a={compliance.answer} tag="The compliance question" />
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="mb-6 text-sm text-zinc-400">
              Pick a tactic to see where it stands and why.
            </p>
            <ComplianceGate items={compliance.items} />
          </motion.div>
        </div>
        <motion.div variants={fadeUp}
          className="mt-5 flex items-start gap-3 rounded-card border border-white/10 bg-white/[0.03] p-5">
          <FiShield aria-hidden="true" className="mt-1 shrink-0 text-zinc-500" />
          <p className="text-xs leading-6 text-zinc-500">
            {compliance.disclaimer} <span className="ml-1 inline-block"><Cite id={compliance.src} /></span>
          </p>
        </motion.div>
      </Section>

      {/* ---------------------------------------------------- trust journey */}
      <Section tint>
        <Heading
          eyebrow="How the buyer moves"
          title="Legitimacy comes before awareness, not after it."
          lede="Most categories build awareness and then convert. Fintech has to survive a check first — because a user who does not trust you will not convert however many times they see your ad. That reverses the usual order of spend."
        />
        <motion.div variants={fadeUp} className="mt-9"><TrustSequence steps={journey} /></motion.div>
      </Section>

      {/* ------------------------------------------------- worked example */}
      <Section tint>
        <Heading eyebrow="The arithmetic" title={model.title}
          lede="Two teams, the same budget, the same reported CPA. One of them is getting better." />
        <motion.div variants={fadeUp} className="mt-9 overflow-hidden rounded-panel border border-white/10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-white/[0.05]">
                <th scope="col" className="w-[32%] px-4 py-4 sm:px-6" />
                <th scope="col" className="px-4 py-4 text-xs font-semibold uppercase tracking-eyebrow text-zinc-400 sm:px-6">{model.cols[0]}</th>
                <th scope="col" className="px-4 py-4 text-xs font-semibold uppercase tracking-eyebrow text-brand sm:px-6">{model.cols[1]}</th>
              </tr>
            </thead>
            <tbody>
              {model.rows.map((r) => (
                <tr key={r.k} className="border-t border-white/[0.07]">
                  <th scope="row" className="px-4 py-4 align-top text-sm font-medium text-zinc-300 sm:px-6">{r.k}</th>
                  <td className="px-4 py-4 align-top text-sm text-zinc-500 sm:px-6">{r.a}</td>
                  <td className="bg-brand/[0.05] px-4 py-4 align-top text-sm font-medium text-white sm:px-6">{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        <motion.p variants={fadeUp} className="mt-6 max-w-3xl text-[0.95rem] leading-8 text-zinc-300">{model.closing}</motion.p>
        <motion.p variants={fadeUp} className="mt-4 flex items-start gap-2 text-xs leading-6 text-zinc-500">
          <FiInfo aria-hidden="true" className="mt-1 shrink-0" />{model.caveat}
        </motion.p>
      </Section>

      {/* ---------------------------------------------- acquisition engines */}
      <Section tint>
        <Heading
          eyebrow="What to build instead"
          title="Nobody is making the auction cheaper. Build something that is not the auction."
          lede="The fintechs handling this best have accepted that paid CAC stays elevated, and put the effort into engines that do not run through a bid."
        />
        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          {engines.map((e) => (
            <motion.div key={e.title} variants={cardIn}
              className="rounded-card border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-brand/30">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold text-white">{e.title}</h3>
                <span className="text-[0.7rem] uppercase tracking-eyebrow text-brand">{e.weight}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{e.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------------- services */}
      <Section tint>
        <Heading eyebrow="What we run" title="What we actually do for a fintech brand."
          lede="Content and onboarding first, because that is where the leak is. Paid follows, measured to funded accounts rather than to installs." />
        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <motion.div key={s} variants={cardIn}
              className="flex items-start gap-3 rounded-card border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-brand/30">
              <FiCheck aria-hidden="true" className="mt-0.5 shrink-0 text-brand" />
              <span className="text-sm leading-6 text-zinc-200">{s}</span>
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
          <Link to="/services/performance-marketing"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400">
            Performance marketing <FiArrowRight aria-hidden="true" />
          </Link>
          <Link to="/services/ai-content-strategy"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/35 hover:text-white">
            Content strategy <FiArrowRight aria-hidden="true" />
          </Link>
        </motion.div>
      </Section>

      {/* -------------------------------------------------------------- faq */}
      <Section tint>
        <div className="mx-auto max-w-3xl">
          <Heading eyebrow="Questions we get asked" title="The ones that come up on every fintech call." />
          <motion.div variants={fadeUp} className="mt-9 divide-y divide-white/10 border-y border-white/10">
            {faqs.map((f, i) => {
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

      {/* ---------------------------------------------------------- sources */}
      <Section tint className="py-14">
        <Heading eyebrow="Sources" title="Where every number on this page came from."
          lede="Ranges are ranges because the underlying studies report them that way. Regulation is summarised as published, and linked so you can read the original." />
        <motion.ul variants={fadeUp} className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {Object.entries(SOURCES).map(([k, s]) => (
            <li key={k} className="border-t border-white/[0.07] pt-3">
              <a href={s.url} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-start gap-1.5 text-sm font-medium text-zinc-200 transition hover:text-brand">
                {s.label}
                <FiExternalLink aria-hidden="true" className="mt-1 shrink-0 text-zinc-600 transition group-hover:text-brand" size={12} />
              </a>
              <p className="mt-1 text-xs leading-5 text-zinc-500">{s.detail}</p>
            </li>
          ))}
        </motion.ul>
      </Section>

      {/* ------------------------------------------------- other industries */}
      <Section className="py-10">
        <motion.h2 variants={fadeUp} className="text-lg font-semibold text-white">Other industries</motion.h2>
        <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-2.5">
          {[
            ['Healthcare', '/industries/healthcare'],
            ['E-commerce & D2C', '/industries/ecommerce'],
            ['Education & EdTech', '/industries/education'],
            ['Beauty & Wellness', '/industries/beauty'],
            ['Real Estate', '/industries/real-estate'],
          ].map(([label, to]) => (
            <Link key={to} to={to}
              className="inline-flex min-h-[44px] items-center rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-white/30 hover:text-white">
              {label}
            </Link>
          ))}
        </motion.div>
      </Section>

      <CtaBand title="Building something regulated?" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
