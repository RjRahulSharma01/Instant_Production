import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiX, FiInfo } from 'react-icons/fi';
import { getIcon } from '../../lib/icons';
import { EASE, cardIn, fadeUp, stagger, viewport } from '../../lib/motion';

/* Hand-rolled SVG rather than a chart library: full control over the motion,
   and it keeps ~40 kB of charting code out of the bundle. */

/* ------------------------------------------------------------------ ring */
export function StatRing({ value, suffix = '%', label, size = 132, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  const r = (size - 16) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(100, value);

  useEffect(() => {
    if (!inView || reduce) return undefined;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start - delay) / 1400);
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
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(224 242 254)" strokeWidth="8" />
          <motion.circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke="rgb(2 132 199)" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={inView ? { strokeDashoffset: c - (c * pct) / 100 } : {}}
            transition={{ duration: reduce ? 0 : 1.4, ease: EASE, delay: delay / 1000 }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-slate-900">
          {value % 1 === 0 ? Math.round(n) : n.toFixed(1)}{suffix}
        </span>
      </div>
      <p className="mt-3 max-w-[16rem] text-sm leading-6 text-slate-600">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------- channel bar chart */
export function ChannelBars({ data }) {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-4">
        {data.items.map((item, i) => {
          const on = active === i;
          return (
            <button
              key={item.label}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="block w-full text-left"
              aria-pressed={on}
            >
              <span className="flex items-baseline justify-between gap-4">
                <span className={`text-sm font-medium transition-colors ${on ? 'text-sky-700' : 'text-slate-700'}`}>
                  {item.label}
                </span>
                <span className={`text-sm font-semibold tabular-nums transition-colors ${on ? 'text-sky-700' : 'text-slate-400'}`}>
                  {item.value}%
                </span>
              </span>
              <span className="mt-2 block h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <motion.span
                  className={`block h-full rounded-full ${on ? 'bg-sky-600' : 'bg-sky-300'}`}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${item.value}%` } : {}}
                  transition={{ duration: reduce ? 0 : 0.9, ease: EASE, delay: reduce ? 0 : i * 0.08 }}
                />
              </span>
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl border border-sky-100 bg-sky-50/60 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <p className="text-3xl font-semibold text-sky-700">{data.items[active].value}%</p>
            <p className="mt-1 text-sm font-medium text-slate-900">{data.items[active].label}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{data.items[active].detail}</p>
          </motion.div>
        </AnimatePresence>
        <p className="mt-5 flex items-start gap-2 border-t border-sky-100 pt-4 text-xs leading-5 text-slate-400">
          <FiInfo aria-hidden="true" className="mt-0.5 shrink-0" />
          {data.note}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- patient journeys */
export function JourneySwitch({ journeys }) {
  const [key, setKey] = useState('opd');
  const j = journeys[key];
  const reduce = useReducedMotion();

  return (
    <div>
      <div role="tablist" aria-label="Patient type" className="inline-flex rounded-full border border-slate-200 bg-white p-1">
        {Object.values(journeys).map((x) => {
          const on = key === x.key;
          return (
            <button
              key={x.key}
              role="tab"
              aria-selected={on}
              type="button"
              onClick={() => setKey(x.key)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                on ? 'text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {on && (
                <motion.span
                  layoutId="journey-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-sky-600"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {x.name}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? {} : { opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: EASE }}
          className="mt-7"
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-base text-slate-700">{j.summary}</p>
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              Decision window: {j.window}
            </span>
          </div>

          <div className="mt-7 grid gap-3 lg:grid-cols-4">
            {j.stages.map((s, i) => (
              <motion.div
                key={s.title}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : i * 0.08, duration: 0.4, ease: EASE }}
                className="group relative rounded-3xl border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-sky-200"
              >
                <span className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  {i < j.stages.length - 1 && (
                    <FiArrowRight aria-hidden="true" className="hidden text-slate-300 lg:block" />
                  )}
                </span>
                <h4 className="mt-3 text-sm font-semibold text-slate-900">{s.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{s.body}</p>
                <p className="mt-3 border-t border-slate-100 pt-3 text-xs font-medium text-sky-700">{s.signal}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {j.channels.map((c) => (
              <span key={c} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600">{c}</span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------ specialty explorer */
export function SpecialtyExplorer({ items }) {
  const [i, setI] = useState(0);
  const s = items[i];
  const Icon = getIcon(s.icon);
  const reduce = useReducedMotion();

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap">
        {items.map((x, idx) => {
          const on = idx === i;
          const XIcon = getIcon(x.icon);
          return (
            <button
              key={x.name}
              type="button"
              onClick={() => setI(idx)}
              aria-pressed={on}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                on
                  ? 'border-sky-300 bg-sky-50 text-sky-800 shadow-[0_10px_25px_-18px_rgba(2,132,199,0.9)]'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-slate-900'
              }`}
            >
              <XIcon size={15} aria-hidden="true" className={on ? 'text-sky-600' : 'text-slate-400'} />
              {x.name}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={s.name}
          initial={reduce ? false : { opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? {} : { opacity: 0, x: -10 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                <Icon size={18} aria-hidden="true" />
              </span>
              <h3 className="text-xl font-semibold text-slate-900">{s.name}</h3>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
              s.urgency === 'Critical' ? 'bg-rose-50 text-rose-700'
              : s.urgency === 'High' ? 'bg-amber-50 text-amber-700'
              : s.urgency === 'Medium' ? 'bg-sky-50 text-sky-700'
              : 'bg-slate-100 text-slate-600'}`}>
              {s.urgency} urgency
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">{s.pattern}</p>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">How patients search</p>
            <ul className="mt-3 space-y-2">
              {s.queries.map((q) => (
                <li key={q} className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 py-2.5 font-mono text-[0.8rem] text-slate-700">
                  <span aria-hidden="true" className="text-slate-300">⌕</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 border-l-2 border-sky-500 bg-sky-50/60 py-3 pl-4 pr-3 text-sm leading-7 text-slate-700">
            {s.insight}
          </p>

          <p className="mt-5 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Where it is won: </span>{s.channel}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------ compliance do / do not */
export function ComplianceComparator({ items }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.06)} className="space-y-3">
      {items.map((c) => (
        <motion.div key={c.topic} variants={cardIn} className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <p className="border-b border-slate-100 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {c.topic}
          </p>
          <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="p-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                <FiX aria-hidden="true" /> Risky
              </span>
              <p className="mt-3 text-sm leading-6 text-slate-500 line-through decoration-rose-300">{c.bad}</p>
            </div>
            <div className="p-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <FiCheck aria-hidden="true" /> Compliant
              </span>
              <p className="mt-3 text-sm leading-6 text-slate-800">{c.good}</p>
            </div>
          </div>
          <p className="bg-slate-50 px-6 py-3.5 text-xs leading-6 text-slate-500">{c.why}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ----------------------------------------------------------- results curve */
export function TimelineCurve({ items }) {
  const [active, setActive] = useState(items.length - 1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  const W = 760, H = 220, pad = 28;
  const pts = items.map((it, i) => [
    pad + (i * (W - pad * 2)) / (items.length - 1),
    H - pad - ((H - pad * 2) * it.lift) / 100,
  ]);
  const path = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
  const area = `${path} L ${pts[pts.length - 1][0]} ${H - pad} L ${pts[0][0]} ${H - pad} Z`;

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Typical results timeline">
        <defs>
          <linearGradient id="hcArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(2 132 199)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="rgb(2 132 199)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 25, 50, 75, 100].map((g) => {
          const y = H - pad - ((H - pad * 2) * g) / 100;
          return <line key={g} x1={pad} y1={y} x2={W - pad} y2={y} stroke="rgb(241 245 249)" strokeWidth="1" />;
        })}

        <motion.path
          d={area} fill="url(#hcArea)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.path
          d={path} fill="none" stroke="rgb(2 132 199)" strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: reduce ? 0 : 1.6, ease: EASE }}
        />

        {pts.map((p, i) => (
          <g key={items[i].period} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} tabIndex={0} role="button" aria-label={items[i].period}>
            <circle cx={p[0]} cy={p[1]} r="14" fill="transparent" className="cursor-pointer" />
            <motion.circle
              cx={p[0]} cy={p[1]} r={active === i ? 7 : 5}
              fill="white" stroke="rgb(2 132 199)" strokeWidth="2.5"
              initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
              transition={{ delay: reduce ? 0 : 0.4 + i * 0.16, type: 'spring', stiffness: 400, damping: 18 }}
            />
          </g>
        ))}
      </svg>

      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {items.map((it, i) => (
          <button
            key={it.period}
            type="button"
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`rounded-xl px-2 py-2 text-left text-xs transition-colors ${active === i ? 'bg-sky-50 text-sky-800' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {it.period}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? {} : { opacity: 0, y: -6 }}
          transition={{ duration: 0.26, ease: EASE }}
          className="mt-4 rounded-2xl border border-slate-200 bg-white p-5"
        >
          <p className="text-sm font-semibold text-slate-900">{items[active].title}</p>
          <p className="mt-2 text-sm leading-7 text-slate-600">{items[active].body}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
