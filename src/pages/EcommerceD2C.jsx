import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiPlus, FiInfo, FiExternalLink } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { useSeo, SITE_URL } from '../lib/seo';
import { EASE, cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import {
  AssetFanOut, FatigueWindow, CreativeMaths, RoasExplorer,
  RtoLine, ShelfDonut, GrowthBars, FormatBars, GeoSplit,
} from '../components/ecom/EcomViz';
import {
  SOURCES, scale, fatigue, roas, formats, formatNote, growth,
  rto, geography, qcommerce, model, faqs, services,
} from '../data/ecommerceData';

/* Deep-build industry page for E-commerce & D2C.
   Same pattern as the healthcare microsite: this slug gets its own component
   ahead of the generic IndustryDetail route, so the shared template keeps
   serving the other industries untouched. */

/* Small reusable shells so the section rhythm stays identical throughout. */
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
      {lede && (
        <motion.p variants={fadeUp} className="mt-4 text-[0.95rem] leading-8 text-zinc-400">{lede}</motion.p>
      )}
    </div>
  );
}

/* Answer-first block. Written so an answer engine can lift it verbatim —
   which, per the research behind the brand guidelines, is what actually
   earns a citation. */
function Answer({ q, a, tag = 'The short answer' }) {
  return (
    <motion.div variants={fadeUp}
      className="rounded-panel border border-brand/25 bg-brand/[0.06] p-6 sm:p-8">
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
    <span className="inline-flex items-center gap-1.5 text-[0.7rem] text-zinc-600">
      <FiInfo aria-hidden="true" className="shrink-0" />
      {s.label}
    </span>
  );
}

export default function EcommerceD2C() {
  const [openFaq, setOpenFaq] = useState(0);
  const reduce = useReducedMotion();

  useSeo({
    title: 'E-commerce & D2C Marketing',
    description:
      'Creative volume is the growth constraint for Indian D2C brands, not budget. Meta fatigue windows, category ROAS benchmarks, RTO economics and quick commerce — with sources.',
    path: '/industries/ecommerce',
  });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: fatigue.question, acceptedAnswer: { '@type': 'Answer', text: fatigue.answer } },
      { '@type': 'Question', name: rto.question, acceptedAnswer: { '@type': 'Answer', text: rto.answer } },
      { '@type': 'Question', name: qcommerce.question, acceptedAnswer: { '@type': 'Answer', text: qcommerce.answer } },
      ...faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    ],
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE_URL}/industries` },
      { '@type': 'ListItem', position: 3, name: 'E-commerce & D2C', item: `${SITE_URL}/industries/ecommerce` },
    ],
  };

  return (
    <>
      <PageHero
        eyebrow="E-commerce & D2C"
        title="Creative volume is the growth constraint. Not budget."
        intro="Indian D2C grew 33% last year on volume, not price — while the window a Meta ad stays effective halved. Most brands do not have a media problem. They have a production problem that shows up in the media report."
        crumbs={[{ label: 'Industries', to: '/industries' }, { label: 'E-commerce & D2C' }]}
      >
        <AssetFanOut tiles={40} />
      </PageHero>

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

      {/* ------------------------------------------------- fatigue argument */}
      <Section tint>
        <Heading
          eyebrow="The actual constraint"
          title="Your ads did not get worse. The window got shorter."
          lede="This is the single most useful number in Indian D2C right now, and almost nobody plans against it."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Answer q={fatigue.question} a={fatigue.answer} tag="Why ads stop working" />
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <FatigueWindow then={fatigue.then} now={fatigue.now} />
          </motion.div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {fatigue.drivers.map((d) => (
            <motion.div key={d.label} variants={cardIn}
              className="rounded-card border border-white/10 bg-white/[0.03] p-5">
              <p className="text-2xl font-semibold text-brand">{d.stat}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{d.label}</p>
              <p className="mt-3 border-t border-white/[0.07] pt-2.5"><Cite id={d.src} /></p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------- creative maths */}
      <Section tint>
        <Heading
          eyebrow="Run your own numbers"
          title="Work out whether you are clearing your own fatigue window."
          lede="Set what you actually ship each month. The answer is usually uncomfortable, and it is arithmetic rather than opinion."
        />
        <motion.div variants={fadeUp} className="mt-10"><CreativeMaths /></motion.div>
      </Section>

      {/* ------------------------------------------------ ROAS benchmarks */}
      <Section tint>
        <Heading
          eyebrow="Benchmarks that are actually yours"
          title="A 3× ROAS is excellent in womenswear and mediocre in skincare."
          lede="Platform-wide averages are the least useful number in performance marketing. What matters is the quartile distribution inside your own category and AOV band — because that tells you whether you have a market problem or a creative problem."
        />
        <motion.div variants={fadeUp} className="mt-10 rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <RoasExplorer categories={roas.categories} />
        </motion.div>
        <motion.p variants={fadeUp} className="mt-4 flex flex-wrap items-start gap-x-3 gap-y-2 text-xs leading-6 text-zinc-500">
          <span className="max-w-3xl">{roas.note}</span>
          <Cite id={roas.src} />
        </motion.p>
      </Section>

      {/* ------------------------------------------------ creative formats */}
      <Section tint>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Heading
            eyebrow="What the format is worth"
            title="The cheapest creative is the most expensive media."
            lede="Static product photography is the least expensive thing a brand can produce and the least efficient thing it can run on cold traffic. The gap between formats is larger than the gap between good and bad media buying."
          />
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <FormatBars items={formats} />
          </motion.div>
        </div>
        <motion.p variants={fadeUp} className="mt-5 flex flex-wrap items-start gap-x-3 gap-y-2 text-xs leading-6 text-zinc-500">
          <span className="max-w-3xl">{formatNote}</span>
          <Cite id="agora" />
        </motion.p>
      </Section>

      {/* ------------------------------------------------- worked example */}
      <Section tint>
        <Heading eyebrow="The arithmetic" title={model.title} lede={model.brand} />
        <motion.div variants={fadeUp} className="mt-9 overflow-hidden rounded-panel border border-white/10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-white/[0.05]">
                <th scope="col" className="w-[36%] px-4 py-4 text-xs font-semibold uppercase tracking-eyebrow text-zinc-500 sm:px-6" />
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

      {/* ------------------------------------------------------- RTO / margin */}
      <Section tint>
        <Heading
          eyebrow="Where the margin actually goes"
          title="Returns cost more than media inefficiency. By a distance."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Answer q={rto.question} a={rto.answer} tag="The margin question" />
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-5 sm:p-7">
            <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-semibold text-white">{rto.cod}%</span>
              <span className="text-sm text-zinc-400">of festive cash-on-delivery orders came back</span>
            </div>
            <RtoLine points={rto.points} />
          </motion.div>
        </div>

        <motion.div variants={fadeUp}
          className="mt-6 rounded-card border border-white/10 bg-white/[0.03] p-6 sm:p-7">
          <p className="text-sm font-semibold text-white">
            The 39% to 21% move was three operational decisions, not a better courier.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {rto.fixes.map((f, i) => (
              <li key={f} className="flex gap-3 text-sm leading-6 text-zinc-400">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-black">{i + 1}</span>
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-white/[0.07] pt-3 text-xs leading-6 text-zinc-500">
            We do not run your logistics. We do make the creative that sets an accurate expectation before the order is
            placed — size, scale, finish, and what the return policy actually says. That is the part of RTO content can move.
            <span className="ml-2 inline-block"><Cite id={rto.src} /></span>
          </p>
        </motion.div>
      </Section>

      {/* ------------------------------------------------- category growth */}
      <Section tint>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Heading
            eyebrow={`Category growth · ${growth.window}`}
            title="Growing fast and building something durable are different problems."
            lede="Health and pharma leads on growth. Beauty leads on volume. Fashion and home have to manufacture a reason to come back, because nobody runs out of a dress or a sofa. Which one you are in determines whether your content should sell or should retain."
          />
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <GrowthBars items={growth.items} />
            <p className="mt-6 border-t border-white/[0.07] pt-3"><Cite id={growth.src} /></p>
          </motion.div>
        </div>
        <motion.blockquote variants={fadeUp}
          className="mt-8 max-w-3xl border-l-2 border-brand pl-5 text-lg font-medium leading-9 text-zinc-200">
          If your repeat rate at 90 days is below 20%, you do not have a D2C brand. You have a paid traffic machine with
          a leaky bucket.
          <footer className="mt-2 text-sm font-normal text-zinc-500">— Unicommerce, India D2C Report 2026</footer>
        </motion.blockquote>
      </Section>

      {/* ------------------------------------------------------- geography */}
      <Section tint>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <Heading
              eyebrow="Where the next customer lives"
              title="Two thirds of your next customers are not in a metro."
              lede={geography.body}
            />
            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-medium text-brand">
                {geography.cpmSaving[0]}–{geography.cpmSaving[1]}% lower CPM in tier-2 and tier-3
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400">
                Same budget, more impressions, different creative
              </span>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-5"><Cite id={geography.src} /></motion.p>
          </div>
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <GeoSplit outsideMetro={geography.outsideMetro} />
          </motion.div>
        </div>
      </Section>

      {/* --------------------------------------------------- quick commerce */}
      <Section tint>
        <Heading
          eyebrow="The new shelf"
          title="A 120-pixel tile is now a distribution channel."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Answer q={qcommerce.question} a={qcommerce.answer} tag="Quick commerce" />
          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <ShelfDonut share={qcommerce.share} />
            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/[0.07] pt-5">
              {qcommerce.stats.map((s) => (
                <div key={s.label}>
                  <p className="text-base font-semibold text-white sm:text-lg">{s.value}</p>
                  <p className="mt-1 text-[0.7rem] leading-5 text-zinc-500">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4"><Cite id={qcommerce.src} /></p>
          </motion.div>
        </div>
      </Section>

      {/* ------------------------------------------------------- services */}
      <Section tint>
        <Heading
          eyebrow="What we run"
          title="What we actually do for a D2C brand."
          lede="Production volume first, because that is the constraint. Media and measurement follow it rather than the other way round."
        />
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
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400">
            Video production <FiArrowRight aria-hidden="true" />
          </Link>
          <Link to="/services/performance-marketing"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/35 hover:text-white">
            Performance marketing <FiArrowRight aria-hidden="true" />
          </Link>
        </motion.div>
      </Section>

      {/* ------------------------------------------------------------- faq */}
      <Section tint>
        <div className="mx-auto max-w-3xl">
          <Heading eyebrow="Questions we get asked" title="The ones that come up on every D2C call." />
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

      {/* --------------------------------------------------------- sources */}
      <Section tint className="py-14">
        <Heading eyebrow="Sources" title="Where every number on this page came from."
          lede="If a figure is worth putting on a page, it is worth being able to point at where it came from. Ranges are ranges because the underlying studies report them that way." />
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

      {/* ------------------------------------------------ other industries */}
      <Section className="py-10">
        <motion.h2 variants={fadeUp} className="text-lg font-semibold text-white">Other industries</motion.h2>
        <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-2.5">
          {[
            ['Healthcare', '/industries/healthcare'],
            ['Fintech', '/industries/fintech'],
            ['Education & EdTech', '/industries/education'],
            ['Beauty & Wellness', '/industries/beauty'],
            ['Real Estate', '/industries/real-estate'],
          ].map(([label, to]) => (
            <Link key={to} to={to}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-white/30 hover:text-white">
              {label}
            </Link>
          ))}
        </motion.div>
      </Section>

      <CtaBand title="Running a D2C brand?" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
