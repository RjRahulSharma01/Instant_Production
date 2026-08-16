import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/motion';

/* Hand-rolled SVG and CSS, same as the other industry pages. No chart library,
   no photography, no generated imagery. Everything degrades to a static
   readable state under prefers-reduced-motion. */

/* ============================================ 1. lead → site visit cascade */
/* The page's argument. The two cost bands sit on the first and last steps,
   because the whole point is that they are six to ten times apart while the
   reporting only ever shows the first one. */

export function VisitCascade({ steps }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="space-y-3">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <div key={s.label}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <span className={`text-sm ${last ? 'font-semibold text-white' : 'text-zinc-300'}`}>{s.label}</span>
              <span className="flex items-baseline gap-3">
                {s.cost && (
                  <span className={`text-xs font-semibold tabular-nums ${last ? 'text-brand' : 'text-zinc-400'}`}>
                    {s.cost}
                  </span>
                )}
                <span className={`text-sm font-semibold tabular-nums ${last ? 'text-brand' : 'text-zinc-500'}`}>
                  {s.value}%
                </span>
              </span>
            </div>
            <div className="relative mt-1.5 h-8 w-full overflow-hidden rounded-md bg-white/[0.05]">
              <motion.div
                className={`absolute inset-y-0 left-0 rounded-md ${
                  last ? 'bg-gradient-to-r from-brand to-amber-300' : 'bg-white/[0.2]'}`}
                initial={{ width: 0 }}
                animate={inView ? { width: `${s.value}%` } : {}}
                transition={{ duration: reduce ? 0 : 0.85, ease: EASE, delay: reduce ? 0 : i * 0.11 }}
              />
              {/* Keep the caption clear of a short fill, same reason as the
                  fintech funnel — the amber bar would otherwise sit on the text. */}
              <span
                className="absolute inset-y-0 flex items-center whitespace-nowrap text-[0.72rem] text-zinc-500"
                style={s.value >= 40 ? { left: '0.75rem' } : { left: `calc(${s.value}% + 0.75rem)` }}
              >
                {s.note}
              </span>
            </div>
          </div>
        );
      })}
      <div className="!mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/10 pt-4">
        <span className="text-3xl font-semibold text-brand">6–10×</span>
        <span className="max-w-md text-sm leading-6 text-zinc-400">
          A site visit costs six to ten times a lead. It is also the only one of the two that
          predicts a booking.
        </span>
      </div>
    </div>
  );
}

/* ================================================= 2. CPL by segment bands */

export function SegmentBands({ rows, max = 6500 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const pos = (v) => (v / max) * 100;

  return (
    <div ref={ref} className="space-y-7">
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="text-sm font-medium text-white">{r.label}</span>
            <span className="text-sm font-semibold tabular-nums text-brand">
              ₹{r.lo.toLocaleString('en-IN')}–{r.hi.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="relative mt-3 h-3 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="absolute inset-y-0 rounded-full bg-gradient-to-r from-brand/50 to-brand"
              initial={{ width: 0, left: `${pos(r.lo)}%` }}
              animate={inView ? { width: `${pos(r.hi) - pos(r.lo)}%` } : {}}
              transition={{ duration: reduce ? 0 : 0.85, ease: EASE, delay: reduce ? 0 : i * 0.12 }}
            />
          </div>
          <p className="mt-2.5 text-sm leading-6 text-zinc-400">{r.note}</p>
        </div>
      ))}
      <div className="flex justify-between border-t border-white/10 pt-3 text-[0.7rem] tabular-nums text-zinc-600">
        <span>₹0</span><span>₹3,250</span><span>₹6,500 per qualified lead</span>
      </div>
    </div>
  );
}

/* =============================================== 3. channel allocation bands */

export function ChannelSplit({ items, budget }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="space-y-6">
      {items.map((c, i) => (
        <div key={c.label}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="text-sm font-medium text-white">{c.label}</span>
            <span className="text-sm font-semibold tabular-nums text-brand">{c.lo}–{c.hi}%</span>
          </div>
          <div className="relative mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="absolute inset-y-0 rounded-full bg-gradient-to-r from-brand/45 to-brand"
              initial={{ width: 0, left: `${c.lo}%` }}
              animate={inView ? { width: `${c.hi - c.lo}%` } : {}}
              transition={{ duration: reduce ? 0 : 0.8, ease: EASE, delay: reduce ? 0 : 0.1 + i * 0.12 }}
            />
          </div>
          <p className="mt-2.5 text-sm leading-7 text-zinc-400">{c.detail}</p>
        </div>
      ))}
      <p className="border-t border-white/10 pt-4 text-sm leading-7 text-zinc-400">{budget}</p>
    </div>
  );
}

/* ==================================================== 4. the decision path */

export function DecisionPath({ steps }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="grid gap-3 lg:grid-cols-4">
      {steps.map((s, i) => (
        <motion.div key={s.title}
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduce ? 0 : 0.45, ease: EASE, delay: reduce ? 0 : i * 0.09 }}
          className="rounded-card border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-brand/30">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-black">
            {i + 1}
          </span>
          <h3 className="mt-3 text-sm font-semibold text-white">{s.title}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{s.body}</p>
          <p className="mt-3 border-t border-white/10 pt-3 text-xs font-medium text-brand">{s.signal}</p>
        </motion.div>
      ))}
    </div>
  );
}
