import { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiCheck, FiShield, FiPlus } from 'react-icons/fi';
import { getIcon } from '../lib/icons';
import { useSeo, SITE_URL } from '../lib/seo';
import { EASE, cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import Magnetic from '../components/fx/Magnetic';
import CountUp from '../components/fx/CountUp';
import SplitText from '../components/fx/SplitText';
import {
  hero, stats, compliance, services, specialties, process, clients, faqs, seo,
} from '../data/healthcare';
import {
  benchmarks, discoveryChannels, keyStats, journeys, specialtyIntel,
  complianceExamples, timeline,
} from '../data/healthcareData';
import {
  StatRing, ChannelBars, JourneySwitch, SpecialtyExplorer,
  ComplianceComparator, TimelineCurve,
} from '../components/hc/HcViz';

/* Light-theme accent. Single hue, medical blue, used at varying tints so the
   page reads as calm and clinical rather than busy. */
const A = {
  text: 'text-sky-700',
  bg: 'bg-sky-600',
  soft: 'bg-sky-50',
  border: 'border-sky-100',
  ring: 'ring-sky-100',
};

function Section({ children, className = '' }) {
  return <section className={`px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>;
}

/* ---------------------------------------------------------------- services */
function ServiceCard({ s, index, open, onToggle }) {
  const Icon = getIcon(s.icon);
  const isOpen = open === index;
  return (
    <motion.div
      variants={cardIn}
      className={`overflow-hidden rounded-3xl border bg-white transition-all duration-300 ${
        isOpen ? 'border-sky-200 shadow-[0_18px_50px_-24px_rgba(2,132,199,0.45)]' : 'border-slate-200 hover:border-sky-200'
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(isOpen ? -1 : index)}
        aria-expanded={isOpen}
        className="flex w-full items-start gap-4 p-6 text-left sm:p-7"
      >
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${A.soft} ${A.text}`}>
          <Icon size={20} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-semibold text-slate-900">{s.title}</span>
          <span className="mt-1 block text-sm text-slate-500">{s.tagline}</span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className={`mt-1 shrink-0 ${A.text}`}
        >
          <FiPlus size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-7 sm:px-7">
              <p className="pl-16 text-[0.95rem] leading-7 text-slate-600">{s.body}</p>
              <ul className="mt-5 grid gap-2.5 pl-16 sm:grid-cols-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <FiCheck aria-hidden="true" className={`mt-0.5 shrink-0 ${A.text}`} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* -------------------------------------------------------------------- page */
export default function Healthcare() {
  const reduce = useReducedMotion();
  const [openService, setOpenService] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  useSeo({ title: seo.title, description: seo.description, path: '/industries/healthcare' });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE_URL}/industries` },
      { '@type': 'ListItem', position: 3, name: 'Healthcare', item: `${SITE_URL}/industries/healthcare` },
    ],
  };

  return (
    <div className="bg-white text-slate-900">
      {/* ------------------------------------------------------------ hero */}
      <Section className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-50 via-sky-50/50 to-white" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(2,132,199,0.10),transparent_70%)] blur-2xl"
        />

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger(0.07)}
          className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <motion.nav aria-label="Breadcrumb" variants={fadeUp}>
              <ol className="flex items-center gap-2 text-xs text-slate-400">
                <li><Link to="/" className="transition hover:text-sky-700">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link to="/industries" className="transition hover:text-sky-700">Industries</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-slate-600">Healthcare</li>
              </ol>
            </motion.nav>

            <motion.p variants={fadeUp} className={`mt-6 text-sm font-semibold uppercase tracking-[0.22em] ${A.text}`}>
              {hero.eyebrow}
            </motion.p>

            <SplitText
              as="h1"
              text={hero.title}
              className="mt-4 block text-[2rem] font-semibold leading-[1.12] text-slate-900 sm:text-[2.75rem] lg:text-5xl"
              stagger={0.035}
            />

            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              {hero.intro}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.35}>
                <Link
                  to="/#contact"
                  className={`group inline-flex items-center gap-2 rounded-full ${A.bg} px-6 py-3.5 font-semibold text-white shadow-[0_12px_30px_-12px_rgba(2,132,199,0.7)] transition-all duration-300 hover:bg-sky-700`}
                >
                  {hero.primaryCta}
                  <FiArrowRight className="transition-transform duration-300 ease-expo group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition-colors duration-200 hover:border-sky-300 hover:text-sky-700"
              >
                {hero.secondaryCta}
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className={`mt-8 inline-flex items-center gap-2.5 rounded-full ${A.soft} px-4 py-2 text-xs font-medium ${A.text}`}>
              <FiShield aria-hidden="true" />
              NMC-aware content review on every asset
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)]">
              <img
                src="/images/healthcare/hero-doctors.webp"
                alt="Healthcare professionals"
                width="1400"
                height="933"
                className="h-full w-full object-cover"
              />
            </div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
              className="absolute -bottom-5 -left-3 rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-lg backdrop-blur sm:left-6"
            >
              <p className="text-2xl font-semibold text-slate-900">
                <CountUp value="77%" />
              </p>
              <p className="mt-0.5 text-xs text-slate-500">of patients search before booking</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>

      {/* -------------------------------------------------- benchmark rings */}
      <Section className="pb-16">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.06)} className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
            <h2 className="text-[1.6rem] font-semibold leading-tight text-slate-900 sm:text-3xl">
              What the numbers say about how patients find doctors.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              Industry benchmarks, not our results. Sources listed below so you can check them.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 grid grid-cols-2 gap-8 rounded-[2rem] border border-slate-200 bg-white p-7 sm:p-10 lg:grid-cols-4">
            {keyStats.map((k, i) => (
              <StatRing key={k.label} value={k.value} suffix={k.suffix} label={k.label} delay={i * 140} />
            ))}
          </motion.div>

          <motion.p variants={fadeUp} className="mt-4 text-center text-xs text-slate-400">
            Sources: {benchmarks.sources.map((x) => x.label).join(' · ')}
          </motion.p>
        </motion.div>
      </Section>

      {/* ------------------------------------------------ discovery channels */}
      <Section className="pb-16 sm:pb-20">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.06)} className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-10">
          <motion.p variants={fadeUp} className={`text-sm font-semibold uppercase tracking-[0.22em] ${A.text}`}>Channel mix</motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 text-[1.6rem] font-semibold leading-tight text-slate-900 sm:text-3xl">
            {discoveryChannels.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            Hover any channel to see what it actually means for a practice.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <ChannelBars data={discoveryChannels} />
          </motion.div>
        </motion.div>
      </Section>

      {/* -------------------------------------------------- patient journeys */}
      <Section className={`py-16 sm:py-20 ${A.soft}`}>
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.06)} className="mx-auto max-w-7xl">
          <motion.p variants={fadeUp} className={`text-sm font-semibold uppercase tracking-[0.22em] ${A.text}`}>Patient journey</motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 max-w-3xl text-[1.75rem] font-semibold leading-tight text-slate-900 sm:text-4xl">
            An OPD patient and a surgical patient are not the same customer.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            One decides in minutes from a map listing. The other researches for months and involves the whole family. Marketing that treats them identically wastes money on both.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9">
            <JourneySwitch journeys={journeys} />
          </motion.div>
        </motion.div>
      </Section>

      {/* -------------------------------------------------------- compliance */}
      <Section className={`py-16 sm:py-20 ${A.soft}`}>
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.06)} className="mx-auto max-w-7xl">
          <motion.span variants={fadeUp} className={`inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${A.text}`}>
            <FiShield aria-hidden="true" /> Compliance
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-5 max-w-3xl text-[1.75rem] font-semibold leading-tight text-slate-900 sm:text-4xl">
            {compliance.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            {compliance.intro}
          </motion.p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {compliance.points.map((p) => (
              <motion.div
                key={p.title}
                variants={cardIn}
                className="rounded-3xl border border-white bg-white p-6 transition-shadow duration-300 hover:shadow-[0_18px_45px_-25px_rgba(2,132,199,0.5)]"
              >
                <h3 className="text-base font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-7 text-slate-600">{p.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.p variants={fadeUp} className="mt-6 max-w-3xl text-xs leading-6 text-slate-400">
            {compliance.disclaimer}
          </motion.p>
        </motion.div>
      </Section>

      {/* ----------------------------------------------- compliance examples */}
      <Section className="py-16 sm:py-20">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.05)} className="mx-auto max-w-5xl">
          <motion.p variants={fadeUp} className={`text-sm font-semibold uppercase tracking-[0.22em] ${A.text}`}>In practice</motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 text-[1.75rem] font-semibold leading-tight text-slate-900 sm:text-4xl">
            The same message, said two ways.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Compliance is rarely about what you say. It is about how you say it. Five examples we run into constantly.
          </motion.p>
          <div className="mt-9">
            <ComplianceComparator items={complianceExamples} />
          </div>
        </motion.div>
      </Section>

      {/* ---------------------------------------------------------- services */}
      <Section className="py-16 sm:py-20">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.05)} className="mx-auto max-w-5xl">
          <motion.p variants={fadeUp} className={`text-sm font-semibold uppercase tracking-[0.22em] ${A.text}`}>What we do</motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-[1.75rem] font-semibold leading-tight text-slate-900 sm:text-4xl">
            Everything a practice needs to be found and trusted.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Seven services, run by one team. Tap any of them to see what is included.
          </motion.p>

          <div className="mt-9 space-y-3">
            {services.map((s, i) => (
              <ServiceCard key={s.id} s={s} index={i} open={openService} onToggle={setOpenService} />
            ))}
          </div>
        </motion.div>
      </Section>

      {/* -------------------------------------------------- specialty intel */}
      <Section className={`py-16 sm:py-20 ${A.soft}`}>
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.05)} className="mx-auto max-w-7xl">
          <motion.p variants={fadeUp} className={`text-sm font-semibold uppercase tracking-[0.22em] ${A.text}`}>Specialty intelligence</motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 max-w-3xl text-[1.75rem] font-semibold leading-tight text-slate-900 sm:text-4xl">
            Every specialty is searched differently.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            A dermatology patient and a cardiology patient share almost nothing — not the query, not the urgency, not the channel that reaches them. Pick a specialty to see how yours behaves.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9">
            <SpecialtyExplorer items={specialtyIntel} />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
            {specialties.map((sp) => (
              <span key={sp} className="rounded-full border border-white bg-white px-3.5 py-2 text-xs text-slate-500">{sp}</span>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* ------------------------------------------------------------ process */}
      <Section className="py-16 sm:py-20">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.06)} className="mx-auto max-w-7xl">
          <motion.p variants={fadeUp} className={`text-sm font-semibold uppercase tracking-[0.22em] ${A.text}`}>How it works</motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-[1.75rem] font-semibold leading-tight text-slate-900 sm:text-4xl">
            From first call to steady enquiries.
          </motion.h2>

          <div className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <motion.div key={p.step} variants={cardIn} className="group relative rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-sky-200 hover:shadow-[0_18px_45px_-25px_rgba(2,132,199,0.5)]">
                <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${A.soft} text-base font-semibold ${A.text} transition-transform duration-300 group-hover:scale-110`}>
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{p.step}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ------------------------------------------------------- results curve */}
      <Section className="py-16 sm:py-20">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.06)} className="mx-auto max-w-4xl">
          <motion.p variants={fadeUp} className={`text-sm font-semibold uppercase tracking-[0.22em] ${A.text}`}>Honest timeline</motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 text-[1.75rem] font-semibold leading-tight text-slate-900 sm:text-4xl">
            What actually happens, and when.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base leading-8 text-slate-600">
            Health content is held to Google&rsquo;s YMYL standard, so it takes longer to earn trust than most categories. Anyone showing you a hockey stick in month one is not doing SEO.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9">
            <TimelineCurve items={timeline} />
          </motion.div>
        </motion.div>
      </Section>

      {/* --------------------------------------------------------------- work */}
      <Section id="work" className={`py-16 sm:py-20 ${A.soft}`}>
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.06)} className="mx-auto max-w-7xl">
          <motion.p variants={fadeUp} className={`text-sm font-semibold uppercase tracking-[0.22em] ${A.text}`}>Recent work</motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-[1.75rem] font-semibold leading-tight text-slate-900 sm:text-4xl">
            Practices we look after.
          </motion.h2>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((c) => (
              <motion.a
                key={`${c.name}-${c.kind}`}
                href={c.url}
                target="_blank"
                rel="noreferrer"
                variants={cardIn}
                className="group flex items-start justify-between gap-4 rounded-3xl border border-white bg-white p-6 transition-all duration-300 hover:shadow-[0_18px_45px_-25px_rgba(2,132,199,0.5)]"
              >
                <span>
                  <span className="block font-semibold text-slate-900">{c.name}</span>
                  <span className={`mt-1 block text-sm ${A.text}`}>{c.kind}</span>
                </span>
                <FiArrowUpRight
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-600"
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ---------------------------------------------------------------- faq */}
      <Section className="py-16 sm:py-20">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.05)} className="mx-auto max-w-3xl">
          <motion.h2 variants={fadeUp} className="text-[1.75rem] font-semibold leading-tight text-slate-900 sm:text-4xl">
            What doctors ask us first.
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-sky-700"
                    >
                      <span className="text-base font-medium text-slate-900">{f.q}</span>
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }} className={`shrink-0 ${A.text}`}>
                        <FiPlus size={20} />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.34, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-8 text-[0.95rem] leading-7 text-slate-600">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </Section>

      {/* ---------------------------------------------------------------- cta */}
      <Section className="pb-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          className="mx-auto flex max-w-7xl flex-col items-start gap-6 rounded-[2rem] bg-gradient-to-br from-sky-600 to-sky-700 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Start with a free practice audit.</h2>
            <p className="mt-3 text-sm leading-7 text-sky-50 sm:text-base">
              We will look at your current search visibility, Google Business Profile and existing content, flag anything that reads as non-compliant, and tell you where the quickest gains are. No obligation.
            </p>
          </div>
          <Magnetic strength={0.4}>
            <Link
              to="/#contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-sky-700 transition-shadow duration-300 hover:shadow-xl"
            >
              Book the audit
              <FiArrowRight className="transition-transform duration-300 ease-expo group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </motion.div>
      </Section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </div>
  );
}
