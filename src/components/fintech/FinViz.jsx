import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/motion';

/* Hand-rolled SVG and CSS, same as the e-commerce page. No chart library, no
   photography, no generated imagery. Everything degrades to a static readable
   state under prefers-reduced-motion. */

/* ================================================= 1. the leaking funnel */
/* The page's whole argument. Each step is drawn as a bar whose width is the
   share of registrations still present, so the collapse is visible rather than
   described. */

export function LeakFunnel({ steps }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="space-y-2.5">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        const lost = i > 0 && s.pct < steps[i - 1].pct;
        return (
          <div key={s.label}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <span className={`text-sm ${last ? 'font-semibold text-white' : 'text-zinc-300'}`}>{s.label}</span>
              <span className={`text-sm font-semibold tabular-nums ${last ? 'text-brand' : 'text-zinc-500'}`}>
                {s.pct}%
              </span>
            </div>
            <div className="relative mt-1.5 h-9 w-full overflow-hidden rounded-md bg-white/[0.05]">
              <motion.div
                className={`absolute inset-y-0 left-0 rounded-md ${
                  last ? 'bg-gradient-to-r from-brand to-amber-300'
                       : lost ? 'bg-white/[0.16]' : 'bg-white/[0.24]'}`}
                initial={{ width: 0 }}
                animate={inView ? { width: `${s.pct}%` } : {}}
                transition={{ duration: reduce ? 0 : 0.85, ease: EASE, delay: reduce ? 0 : i * 0.11 }}
              />
              {/* Below ~40% the fill is narrower than the caption, so the text
                  would sit on top of the bar. Push it clear of the fill. */}
              <span
                className={`absolute inset-y-0 flex items-center whitespace-nowrap text-[0.72rem] ${
                  s.pct >= 40 ? 'text-zinc-400' : 'text-zinc-500'}`}
                style={s.pct >= 40 ? { left: '0.75rem' } : { left: `calc(${s.pct}% + 0.75rem)` }}
              >
                {s.note}
              </span>
            </div>
          </div>
        );
      })}
      <div className="!mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        <span className="text-3xl font-semibold text-brand">82%</span>
        <span className="text-sm leading-6 text-zinc-400">
          of everything you paid for stops before it becomes revenue. Most reporting never shows this.
        </span>
      </div>
    </div>
  );
}

/* ============================================== 2. CAC dumbbell, then vs now */
/* Two dots joined by a line per category. A dumbbell reads change far better
   than paired bars, because the eye follows the gap rather than comparing
   two lengths. */

export function CacDumbbell({ items, max = 7500 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const pos = (v) => (v / max) * 100;

  return (
    <div ref={ref} className="space-y-7">
      {items.map((it, i) => (
        <div key={it.label}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
            <span className="text-sm font-medium text-white">{it.label}</span>
            <span className="text-xs tabular-nums text-zinc-500">
              ₹{it.then[0].toLocaleString('en-IN')}–{it.then[1].toLocaleString('en-IN')}
              <span className="mx-1.5 text-zinc-700">→</span>
              <span className="font-semibold text-brand">
                ₹{it.now[0].toLocaleString('en-IN')}–{it.now[1].toLocaleString('en-IN')}
              </span>
            </span>
          </div>

          <div className="relative mt-3 h-6">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/[0.07]" />
            {/* 2023 band */}
            <div className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-zinc-600"
              style={{ left: `${pos(it.then[0])}%`, width: `${pos(it.then[1]) - pos(it.then[0])}%` }} />
            {/* 2026 band */}
            <motion.div
              className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              style={{ left: `${pos(it.now[0])}%`, width: `${pos(it.now[1]) - pos(it.now[0])}%`, transformOrigin: 'left' }}
              transition={{ duration: reduce ? 0 : 0.7, ease: EASE, delay: reduce ? 0 : 0.15 + i * 0.1 }}
            />
            {/* connector from old midpoint to new midpoint */}
            <motion.div
              className="absolute top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-zinc-600 to-brand"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              style={{
                left: `${pos((it.then[0] + it.then[1]) / 2)}%`,
                width: `${pos((it.now[0] + it.now[1]) / 2) - pos((it.then[0] + it.then[1]) / 2)}%`,
              }}
              transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.3 + i * 0.1 }}
            />
          </div>
          <p className="mt-1.5 text-[0.7rem] text-zinc-600">{it.unit}</p>
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-4 text-xs text-zinc-500">
        <span className="flex items-center gap-2"><span className="h-1.5 w-6 rounded-full bg-zinc-600" /> 2023</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-6 rounded-full bg-brand" /> Q1 2026</span>
        <span className="ml-auto tabular-nums">₹0 to ₹{max.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
}

/* ========================================== 3. the compliance gate checker */
/* Moved to components/viz/ComplianceGate.jsx when the education page needed the
   identical control for CCPA and ASCI rules. Re-exported here so this file's
   existing imports keep working. */

export { default as ComplianceGate } from '../viz/ComplianceGate';

/* ============================================== 4. search CPC climb, simple */

export function CpcClimb({ then, now, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduce = useReducedMotion();
  const MAX = 160;

  const Bar = ({ range, colour, caption, delay }) => (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-xs text-zinc-500">{caption}</span>
        <span className={`text-sm font-semibold tabular-nums ${colour === 'brand' ? 'text-brand' : 'text-zinc-300'}`}>
          ₹{range[0]}–{range[1]}
        </span>
      </div>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className={`h-full rounded-full ${colour === 'brand' ? 'bg-gradient-to-r from-brand/60 to-brand' : 'bg-zinc-600'}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${(range[1] / MAX) * 100}%` } : {}}
          transition={{ duration: reduce ? 0 : 0.8, ease: EASE, delay: reduce ? 0 : delay }}
        />
      </div>
    </div>
  );

  return (
    <div ref={ref} className="space-y-4">
      <p className="text-sm text-zinc-300">{label}</p>
      <Bar range={then} colour="zinc" caption="Three years ago" delay={0.05} />
      <Bar range={now} colour="brand" caption="2026" delay={0.2} />
      <p className="text-xs leading-6 text-zinc-500">
        Per click, before anyone has registered, completed KYC or funded anything.
      </p>

      <div className="!mt-7 border-t border-white/10 pt-5">
        <p className="text-xs uppercase tracking-eyebrow text-zinc-500">Where that lands</p>
        <p className="mt-2.5 text-2xl font-semibold tabular-nums text-white">
          ₹800–3,500<span className="ml-2 text-sm font-normal text-zinc-500">per acquired customer</span>
        </p>
        <p className="mt-2 text-sm leading-7 text-zinc-400">
          Across paid digital, depending on category and audience. For wealth management and
          business banking it clears <span className="font-semibold text-white">₹5,000</span> per
          activated user, against a payback period that can run eighteen to thirty-six months.
        </p>
      </div>
    </div>
  );
}

/* ================================================= 5. trust-first sequence */
/* Most categories build awareness then convert. This one has to establish
   legitimacy before awareness is worth paying for, so the diagram is drawn as
   a reordering rather than a list. */

export function TrustSequence({ steps }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="grid gap-3 lg:grid-cols-4">
      {steps.map((j, i) => (
        <motion.div key={j.title}
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduce ? 0 : 0.45, ease: EASE, delay: reduce ? 0 : i * 0.09 }}
          className="group relative rounded-card border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-brand/30">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-black">
            {i + 1}
          </span>
          <h3 className="mt-3 text-sm font-semibold text-white">{j.title}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{j.body}</p>
          <p className="mt-3 border-t border-white/10 pt-3 text-xs font-medium text-brand">{j.signal}</p>
        </motion.div>
      ))}
    </div>
  );
}
