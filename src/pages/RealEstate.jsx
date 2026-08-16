import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiPlus, FiInfo, FiExternalLink, FiShield } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { useSeo, SITE_URL } from '../lib/seo';
import { EASE, cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import ComplianceGate from '../components/viz/ComplianceGate';
import { VisitCascade, SegmentBands, ChannelSplit, DecisionPath } from '../components/realestate/ReViz';
import {
  SOURCES, scale, unit, segments, channels, compliance, journey, model, faqs, services,
} from '../data/realEstateData';

/* Deep-build industry page for Real Estate. The last of the six — with this
   applied, every industry has its own page and the generic industries/:slug
   route is a fallback only. */

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

export default function RealEstate() {
  const [openFaq, setOpenFaq] = useState(0);
  const reduce = useReducedMotion();

  useSeo({
    title: 'Real Estate Marketing',
    description:
      'One lead in ten becomes a site visit, and a visit costs 6–10× a lead. Cost benchmarks by segment, RERA advertising rules, and what developers should actually measure.',
    path: '/industries/real-estate',
  });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: unit.question, acceptedAnswer: { '@type': 'Answer', text: unit.answer } },
      { '@type': 'Question', name: segments.question, acceptedAnswer: { '@type': 'Answer', text: segments.answer } },
      { '@type': 'Question', name: compliance.question, acceptedAnswer: { '@type': 'Answer', text: compliance.answer } },
      { '@type': 'Question', name: journey.question, acceptedAnswer: { '@type': 'Answer', text: journey.answer } },
      ...faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    ],
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE_URL}/industries` },
      { '@type': 'ListItem', position: 3, name: 'Real Estate', item: `${SITE_URL}/industries/real-estate` },
    ],
  };

  return (
    <>
      <PageHero
        eyebrow="Real Estate"
        title="A lead is not the product. A site visit is."
        intro="One lead in ten becomes a site visit, and that ratio is considered good. Which makes a site visit six to ten times more expensive than a lead — and the only one of the two that predicts a booking."
        crumbs={[{ label: 'Industries', to: '/industries' }, { label: 'Real Estate' }]}
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

      {/* --------------------------------------------------------- the unit */}
      <Section tint>
        <Heading
          eyebrow="The unit that matters"
          title="Cost per lead is the easiest number to improve and the least connected to revenue."
          lede="Every developer reports it, almost nobody manages against it well, and a campaign can cut it in half while producing fewer site visits on the same money."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Answer q={unit.question} a={unit.answer} tag="What to measure" />
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <VisitCascade steps={unit.cascade} />
          </motion.div>
        </div>
        <motion.p variants={fadeUp} className="mt-4 flex flex-wrap items-start gap-x-3 gap-y-2 text-xs leading-6 text-zinc-500">
          <span className="max-w-3xl">{unit.note}</span>
          <Cite id={unit.src} />
        </motion.p>
      </Section>

      {/* ------------------------------------------------------- by segment */}
      <Section tint>
        <Heading
          eyebrow="What a lead costs"
          title="The same lead costs seven times more above ₹3 crore."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Answer q={segments.question} a={segments.answer} tag="Why luxury costs more" />
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <SegmentBands rows={segments.rows} />
          </motion.div>
        </div>
        <motion.p variants={fadeUp} className="mt-4"><Cite id={segments.src} /></motion.p>
      </Section>

      {/* --------------------------------------------------------- channels */}
      <Section tint>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Heading
            eyebrow="Where the budget goes"
            title="Google carries intent. Meta carries the walkthrough."
            lede="Somebody searching a locality and a configuration has already made most of the decision. Somebody scrolling has not — which is why the split is not a preference, it is a reflection of where in the journey each channel reaches people."
          />
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <ChannelSplit items={channels.items} budget={channels.budget} />
          </motion.div>
        </div>
        <motion.p variants={fadeUp} className="mt-4"><Cite id={channels.src} /><span className="ml-3 inline-block"><Cite id="spend" /></span></motion.p>
      </Section>

      {/* ----------------------------------------------------- compliance */}
      <Section tint>
        <Heading
          eyebrow="What RERA requires"
          title="Registration first. Then disclosure on everything, including the reel cover."
          lede="This is the most prescriptive advertising regime of any category we work in, and the one where the rules reach furthest into ordinary social output. A blurred QR code has been enough for a penalty."
        />
        <div className="mt-10 grid gap-6">
          <Answer q={compliance.question} a={compliance.answer} tag="The compliance question" />
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="mb-6 text-sm text-zinc-400">Pick a tactic to see where it stands and why.</p>
            <ComplianceGate items={compliance.items} />
          </motion.div>
        </div>
        <motion.div variants={fadeUp}
          className="mt-5 flex items-start gap-3 rounded-card border border-white/10 bg-white/[0.03] p-5">
          <FiShield aria-hidden="true" className="mt-1 shrink-0 text-zinc-500" />
          <p className="text-xs leading-6 text-zinc-500">
            {compliance.disclaimer}
            <span className="ml-1 inline-block"><Cite id={compliance.src} /></span>
            <span className="ml-3 inline-block"><Cite id="penalty" /></span>
          </p>
        </motion.div>
      </Section>

      {/* ---------------------------------------------------------- journey */}
      <Section tint>
        <Heading
          eyebrow="How the decision is made"
          title="The form is submitted late. The decision was made earlier."
        />
        <motion.div variants={fadeUp} className="mt-10">
          <Answer q={journey.question} a={journey.answer} tag="How long it takes" />
        </motion.div>
        <motion.div variants={fadeUp} className="mt-6">
          <DecisionPath steps={journey.steps} />
        </motion.div>
        <motion.p variants={fadeUp} className="mt-4"><Cite id={journey.src} /></motion.p>
      </Section>

      {/* ------------------------------------------------- worked example */}
      <Section tint>
        <Heading eyebrow="The arithmetic" title={model.title}
          lede="Two teams, the same ₹6 lakh a month. One of them reports a much better quarter." />
        <motion.div variants={fadeUp} className="mt-9 overflow-hidden rounded-panel border border-white/10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-white/[0.05]">
                <th scope="col" className="w-[30%] px-4 py-4 sm:px-6" />
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

      {/* --------------------------------------------------------- services */}
      <Section tint>
        <Heading eyebrow="What we run" title="What we actually do for a developer."
          lede="Progress footage on a cadence, locality content that reaches buyers before they shortlist, and disclosure built into the template rather than added afterwards." />
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
          <Link to="/services/video-production"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400">
            Video production <FiArrowRight aria-hidden="true" />
          </Link>
          <Link to="/services/performance-marketing"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/35 hover:text-white">
            Performance marketing <FiArrowRight aria-hidden="true" />
          </Link>
        </motion.div>
      </Section>

      {/* -------------------------------------------------------------- faq */}
      <Section tint>
        <div className="mx-auto max-w-3xl">
          <Heading eyebrow="Questions we get asked" title="The ones that come up on every developer call." />
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
          lede="Regulation is summarised as published and linked so you can read the original. RERA requirements differ by state — Maharashtra is the most prescriptive." />
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
            ['Fintech', '/industries/fintech'],
            ['Education & EdTech', '/industries/education'],
            ['Beauty & Wellness', '/industries/beauty'],
          ].map(([label, to]) => (
            <Link key={to} to={to}
              className="inline-flex min-h-[44px] items-center rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-white/30 hover:text-white">
              {label}
            </Link>
          ))}
        </motion.div>
      </Section>

      <CtaBand title="Launching a project?" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
