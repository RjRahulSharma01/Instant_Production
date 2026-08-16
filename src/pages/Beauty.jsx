import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiPlus, FiInfo, FiExternalLink, FiShield } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { useSeo, SITE_URL } from '../lib/seo';
import { EASE, cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import ComplianceGate from '../components/viz/ComplianceGate';
import { ModificationDial, FlaggedClaims, FormatRanges, Shelves } from '../components/beauty/BeautyViz';
import {
  SOURCES, scale, tension, claims, compliance, creative, shelves, model, faqs, services,
} from '../data/beautyData';

/* Deep-build industry page for Beauty & Wellness. Registered ahead of the
   generic industries/:slug route, same pattern as the others. */

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

export default function Beauty() {
  const [openFaq, setOpenFaq] = useState(0);
  const reduce = useReducedMotion();

  useSeo({
    title: 'Beauty & Wellness Marketing',
    description:
      '97.3% of influencer ads required modification in FY26. The claims that get flagged, the creative that actually performs, and how to run creators compliantly — with sources.',
    path: '/industries/beauty',
  });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: tension.question, acceptedAnswer: { '@type': 'Answer', text: tension.answer } },
      { '@type': 'Question', name: claims.question, acceptedAnswer: { '@type': 'Answer', text: claims.answer } },
      { '@type': 'Question', name: compliance.question, acceptedAnswer: { '@type': 'Answer', text: compliance.answer } },
      { '@type': 'Question', name: creative.question, acceptedAnswer: { '@type': 'Answer', text: creative.answer } },
      ...faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    ],
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE_URL}/industries` },
      { '@type': 'ListItem', position: 3, name: 'Beauty & Wellness', item: `${SITE_URL}/industries/beauty` },
    ],
  };

  return (
    <>
      <PageHero
        eyebrow="Beauty & Wellness"
        title="The creative that converts best is the creative most likely to break a rule."
        intro="Beauty runs on creators and on visible transformation. Both are exactly what the regulator spent last year flagging — 97.3% of influencer advertisements processed required modification. The way out is not fewer creators. It is claims that survive being checked."
        crumbs={[{ label: 'Industries', to: '/industries' }, { label: 'Beauty & Wellness' }]}
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

      {/* -------------------------------------------------------- tension */}
      <Section tint>
        <Heading
          eyebrow="The tension"
          title="This is not a category with a compliance problem. It is a category whose best asset is the risk."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Answer q={tension.question} a={tension.answer} tag="Why beauty is hard to advertise" />
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <ModificationDial value={97.3} caption="of influencer advertisements ASCI processed in FY26 required modification, across every category." />
          </motion.div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tension.stats.map((s) => (
            <motion.div key={s.label} variants={cardIn} className="rounded-card border border-white/10 bg-white/[0.03] p-5">
              <p className="text-2xl font-semibold text-brand">{s.value}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{s.label}</p>
            </motion.div>
          ))}
        </div>
        <motion.p variants={fadeUp} className="mt-4 flex flex-wrap items-start gap-x-3 gap-y-2 text-xs leading-6 text-zinc-500">
          <span className="max-w-3xl">{tension.note}</span>
          <Cite id={tension.src} /><Cite id="asciNames" />
        </motion.p>
      </Section>

      {/* --------------------------------------------------- flagged claims */}
      <Section tint>
        <Heading
          eyebrow="What gets flagged"
          title="The problem is almost always the clock, not the claim."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Answer q={claims.question} a={claims.answer} tag="Which claims get flagged" />
          <motion.div variants={fadeUp}>
            <FlaggedClaims items={claims.flagged} />
          </motion.div>
        </div>
        <motion.div variants={fadeUp}
          className="mt-6 rounded-card border border-brand/25 bg-brand/[0.06] p-6">
          <p className="text-[0.95rem] leading-8 text-zinc-200">{claims.fix}</p>
          <p className="mt-4 border-t border-white/10 pt-3"><Cite id={claims.src} /></p>
        </motion.div>
      </Section>

      {/* ----------------------------------------------------- compliance */}
      <Section tint>
        <Heading
          eyebrow="Running creators safely"
          title="94% of the violations were missing labels, not false claims."
          lede="Which means the most common failure in Indian beauty marketing costs one line in a brief to fix, and the brands losing assets to it are large ones with legal departments."
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
          </p>
        </motion.div>
      </Section>

      {/* --------------------------------------------------- creative economics */}
      <Section tint>
        <Heading
          eyebrow="What actually performs"
          title="The gap between formats is bigger than the gap between media buyers."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Answer q={creative.question} a={creative.answer} tag="What performs in beauty" />
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <FormatRanges items={creative.formats} />
          </motion.div>
        </div>
        <motion.p variants={fadeUp} className="mt-4 flex flex-wrap items-start gap-x-3 gap-y-2 text-xs leading-6 text-zinc-500">
          <span className="max-w-3xl">{creative.note}</span>
          <Cite id={creative.src} />
        </motion.p>
      </Section>

      {/* -------------------------------------------------------- shelves */}
      <Section tint>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Heading
            eyebrow="Where beauty actually sells"
            title="Four shelves, four different jobs, four different assets."
            lede="Demand is created on Instagram, verified on a marketplace, converted on impulse in quick commerce, and monetised on your own site. The common mistake is producing one set of assets and pushing it everywhere."
          />
          <motion.div variants={fadeUp}>
            <Shelves items={shelves} />
          </motion.div>
        </div>
        <motion.p variants={fadeUp} className="mt-4"><Cite id="gravel" /></motion.p>
      </Section>

      {/* ------------------------------------------------- worked example */}
      <Section tint>
        <Heading eyebrow="The arithmetic" title={model.title}
          lede="Two identical creator programmes. One line of difference in the brief." />
        <motion.div variants={fadeUp} className="mt-9 overflow-hidden rounded-panel border border-white/10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-white/[0.05]">
                <th scope="col" className="w-[28%] px-4 py-4 sm:px-6" />
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
        <Heading eyebrow="What we run" title="What we actually do for a beauty brand."
          lede="Creator volume with claim controls built into the brief, and assets made separately for each shelf rather than resized for it." />
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
          <Link to="/services/influencer-marketing"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400">
            Influencer marketing <FiArrowRight aria-hidden="true" />
          </Link>
          <Link to="/industries/ecommerce"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/35 hover:text-white">
            D2C creative volume <FiArrowRight aria-hidden="true" />
          </Link>
        </motion.div>
      </Section>

      {/* -------------------------------------------------------------- faq */}
      <Section tint>
        <div className="mx-auto max-w-3xl">
          <Heading eyebrow="Questions we get asked" title="The ones that come up on every beauty call." />
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
          lede="Regulation is summarised as published and linked so you can read the original. Ranges are ranges because the underlying studies report them that way." />
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
            ['Real Estate', '/industries/real-estate'],
          ].map(([label, to]) => (
            <Link key={to} to={to}
              className="inline-flex min-h-[44px] items-center rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-white/30 hover:text-white">
              {label}
            </Link>
          ))}
        </motion.div>
      </Section>

      <CtaBand title="Building a beauty or wellness brand?" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
