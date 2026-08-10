import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiPlus, FiInfo } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { useSeo, SITE_URL } from '../lib/seo';
import { EASE, cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import { industryPages } from '../data/industryPages';

/* Per-industry accent. Tailwind needs literal class names to compile, so these
   are written out rather than interpolated. */
const ACCENT = {
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-400', soft: 'bg-emerald-400/10', border: 'border-emerald-400/30', ring: 'rgb(52 211 153)' },
  violet:  { text: 'text-violet-400',  bg: 'bg-violet-400',  soft: 'bg-violet-400/10',  border: 'border-violet-400/30',  ring: 'rgb(167 139 250)' },
  amber:   { text: 'text-brand',       bg: 'bg-brand',       soft: 'bg-brand/10',       border: 'border-brand/30',       ring: 'rgb(245 158 11)' },
  rose:    { text: 'text-rose-400',    bg: 'bg-rose-400',    soft: 'bg-rose-400/10',    border: 'border-rose-400/30',    ring: 'rgb(251 113 133)' },
  sky:     { text: 'text-sky-400',     bg: 'bg-sky-400',     soft: 'bg-sky-400/10',     border: 'border-sky-400/30',     ring: 'rgb(56 189 248)' },
};

/* ------------------------------------------------------------ stat ring */
function Ring({ value, suffix, label, colour, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  const size = 116, r = (size - 14) / 2, c = 2 * Math.PI * r;
  const pct = Math.min(100, value > 100 ? 100 : value < 10 ? value * 10 : value);

  useEffect(() => {
    if (!inView || reduce) return undefined;
    let raf; const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start - delay) / 1300);
      if (p > 0) setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, delay]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
          <motion.circle
            cx={size/2} cy={size/2} r={r} fill="none" stroke={colour} strokeWidth="7" strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={inView ? { strokeDashoffset: c - (c * pct) / 100 } : {}}
            transition={{ duration: reduce ? 0 : 1.3, ease: EASE, delay: delay / 1000 }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white">
          {Number.isInteger(value) ? Math.round(n) : n.toFixed(1)}{suffix}
        </span>
      </div>
      <p className="mt-3 max-w-[15rem] text-sm leading-6 text-zinc-400">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------- channel chart */
function Channels({ items, a }) {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-4">
        {items.map((it, i) => {
          const on = active === i;
          return (
            <button key={it.label} type="button" aria-pressed={on}
              onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
              className="block w-full text-left">
              <span className="flex items-baseline justify-between gap-4">
                <span className={`text-sm font-medium transition-colors ${on ? a.text : 'text-zinc-300'}`}>{it.label}</span>
                <span className={`text-sm font-semibold tabular-nums transition-colors ${on ? a.text : 'text-zinc-500'}`}>{it.value}%</span>
              </span>
              <span className="mt-2 block h-2.5 w-full overflow-hidden rounded-full bg-white/5">
                <motion.span
                  className={`block h-full rounded-full ${a.bg}`}
                  style={{ opacity: on ? 1 : 0.45 }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${it.value}%` } : {}}
                  transition={{ duration: reduce ? 0 : 0.9, ease: EASE, delay: reduce ? 0 : i * 0.08 }}
                />
              </span>
            </button>
          );
        })}
      </div>
      <div className={`rounded-card border ${a.border} ${a.soft} p-6`}>
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={reduce ? {} : { opacity: 0, y: -8 }} transition={{ duration: 0.26, ease: EASE }}>
            <p className={`text-3xl font-semibold ${a.text}`}>{items[active].value}%</p>
            <p className="mt-1 text-sm font-medium text-white">{items[active].label}</p>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{items[active].detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- page */
export default function IndustryDetail() {
  const { slug } = useParams();
  const d = industryPages[slug];
  const [openFaq, setOpenFaq] = useState(0);
  const reduce = useReducedMotion();

  useSeo({
    title: d ? `${d.name} Marketing` : undefined,
    description: d?.answer?.slice(0, 158),
    path: `/industries/${slug}`,
  });

  if (!d) return <Navigate to="/industries" replace />;
  const a = ACCENT[d.accent] || ACCENT.amber;

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      // The answer-first block is itself a question an engine can lift.
      { '@type': 'Question', name: d.question, acceptedAnswer: { '@type': 'Answer', text: d.answer } },
      ...d.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    ],
  };
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE_URL}/industries` },
      { '@type': 'ListItem', position: 3, name: d.name, item: `${SITE_URL}/industries/${slug}` },
    ],
  };

  return (
    <>
      <PageHero
        eyebrow={d.eyebrow}
        title={d.title}
        intro={d.intro}
        crumbs={[{ label: 'Industries', to: '/industries' }, { label: d.name }]}
      />

      {/* ---- answer-first block. Written to be quoted verbatim by an answer
             engine, which is what actually earns AI citations. ---- */}
      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}
          className={`mx-auto max-w-4xl rounded-panel border ${a.border} ${a.soft} p-6 sm:p-9`}
        >
          <p className={`text-xs font-semibold uppercase tracking-eyebrow ${a.text}`}>The short answer</p>
          <h2 className="mt-4 text-lg font-semibold leading-snug text-white sm:text-xl">{d.question}</h2>
          <p className="mt-4 text-[0.95rem] leading-8 text-zinc-300">{d.answer}</p>
        </motion.div>
      </section>

      {/* ---- stats ---- */}
      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.06)} className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} className="grid grid-cols-1 gap-8 rounded-panel border border-white/10 bg-white/[0.04] p-8 sm:grid-cols-3">
            {d.stats.map((s, i) => (
              <Ring key={s.label} value={s.value} suffix={s.suffix} label={s.label} colour={a.ring} delay={i * 130} />
            ))}
          </motion.div>
          <motion.p variants={fadeUp} className="mt-3 flex items-start gap-2 text-xs leading-5 text-zinc-500">
            <FiInfo aria-hidden="true" className="mt-0.5 shrink-0" />{d.statNote}
          </motion.p>
        </motion.div>
      </section>

      {/* ---- what makes it hard ---- */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.06)} className="mx-auto max-w-7xl">
          <motion.h2 variants={fadeUp} className="max-w-3xl text-2xl font-semibold text-white sm:text-3xl">
            What makes {d.name.toLowerCase()} different.
          </motion.h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {d.challenges.map((c) => (
              <motion.div key={c.title} variants={cardIn}
                className={`rounded-card border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:${a.border.replace('border-', 'border-')}`}>
                <h3 className="text-base font-semibold text-white">{c.title}</h3>
                <p className="mt-2.5 text-sm leading-7 text-zinc-400">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ---- buyer journey ---- */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.06)} className="mx-auto max-w-7xl">
          <motion.h2 variants={fadeUp} className="text-2xl font-semibold text-white sm:text-3xl">How the buyer actually moves.</motion.h2>
          <div className="mt-8 grid gap-3 lg:grid-cols-4">
            {d.journey.map((j, i) => (
              <motion.div key={j.title} variants={cardIn}
                className="group relative rounded-card border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-white/20">
                <span className="flex items-center gap-2">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full ${a.bg} text-xs font-semibold text-black`}>{i + 1}</span>
                  {i < d.journey.length - 1 && <FiArrowRight aria-hidden="true" className="hidden text-zinc-700 lg:block" />}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-white">{j.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{j.body}</p>
                <p className={`mt-3 border-t border-white/10 pt-3 text-xs font-medium ${a.text}`}>{j.signal}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ---- channel mix ---- */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.06)}
          className="mx-auto max-w-7xl rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-9">
          <motion.h2 variants={fadeUp} className="text-2xl font-semibold text-white sm:text-3xl">Where growth comes from.</motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
            Hover any channel to see what it means in practice for a {d.name.toLowerCase()} brand.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8"><Channels items={d.channels} a={a} /></motion.div>
        </motion.div>
      </section>

      {/* ---- what we do ---- */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.05)} className="mx-auto max-w-7xl">
          <motion.h2 variants={fadeUp} className="text-2xl font-semibold text-white sm:text-3xl">What we run for {d.name.toLowerCase()} brands.</motion.h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {d.services.map((s) => (
              <motion.div key={s} variants={cardIn}
                className="flex items-start gap-3 rounded-card border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-white/20">
                <FiCheck aria-hidden="true" className={`mt-0.5 shrink-0 ${a.text}`} />
                <span className="text-sm text-zinc-200">{s}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ---- faq ---- */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.05)} className="mx-auto max-w-3xl">
          <motion.h2 variants={fadeUp} className="text-2xl font-semibold text-white sm:text-3xl">Questions we get asked.</motion.h2>
          <motion.div variants={fadeUp} className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {d.faqs.map((f, i) => {
              const on = openFaq === i;
              return (
                <div key={f.q}>
                  <h3>
                    <button type="button" onClick={() => setOpenFaq(on ? -1 : i)} aria-expanded={on}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-white">
                      <span className="text-base font-medium text-white">{f.q}</span>
                      <motion.span animate={{ rotate: on ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }} className={`shrink-0 ${a.text}`}>
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
        </motion.div>
      </section>

      {/* ---- other industries ---- */}
      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.05)} className="mx-auto max-w-7xl">
          <motion.h2 variants={fadeUp} className="text-lg font-semibold text-white">Other industries</motion.h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link to="/industries/healthcare"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-white/30 hover:text-white">
              Healthcare
            </Link>
            {Object.values(industryPages).filter((x) => x.slug !== slug).map((x) => (
              <Link key={x.slug} to={`/industries/${x.slug}`}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-white/30 hover:text-white">
                {x.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      <CtaBand title={`Working in ${d.name.toLowerCase()}?`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
