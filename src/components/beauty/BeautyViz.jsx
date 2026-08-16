import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';
import { EASE } from '../../lib/motion';

/* Hand-rolled SVG and CSS, same as the other industry pages. No chart library,
   no photography, no generated imagery. Everything degrades to a static
   readable state under prefers-reduced-motion. */

/* ============================================== 1. the 97.3% dial */
/* One number does most of the work on this page, so it gets a dial rather than
   another bar. The arc is drawn to scale — 97.3% of a half circle — so the
   near-complete sweep is the honest picture, not a dramatised one. */

export function ModificationDial({ value = 97.3, caption }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduce = useReducedMotion();
  const R = 84, CX = 110, CY = 110;
  const C = Math.PI * R;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative" style={{ width: 220, height: 124 }}>
        <svg viewBox="0 0 220 124" className="w-full" role="img"
          aria-label={`${value}% of influencer advertisements processed required modification.`}>
          <path d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
            fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" strokeLinecap="round" />
          <motion.path
            d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
            fill="none" stroke="rgb(245 158 11)" strokeWidth="14" strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={inView ? { strokeDashoffset: C - (C * value) / 100 } : {}}
            transition={{ duration: reduce ? 0 : 1.4, ease: EASE }}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 text-center">
          <span className="block text-4xl font-semibold tabular-nums text-white">{value}%</span>
        </div>
      </div>
      <p className="mt-3 max-w-xs text-center text-sm leading-6 text-zinc-400">{caption}</p>
    </div>
  );
}

/* ============================================ 2. the flagged-claims wall */
/* Each one is a real claim ASCI flagged. Struck through, because the point is
   that these are not hypothetical bad practice — they ran. */

export function FlaggedClaims({ items }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="grid gap-3 sm:grid-cols-2">
      {items.map((c, i) => (
        <motion.div key={c.claim}
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduce ? 0 : 0.4, ease: EASE, delay: reduce ? 0 : i * 0.07 }}
          className="flex items-start gap-3 rounded-card border border-rose-400/20 bg-rose-400/[0.05] p-4">
          <FiAlertCircle aria-hidden="true" className="mt-0.5 shrink-0 text-rose-400/80" size={15} />
          <div>
            <p className="text-sm font-medium text-zinc-300 line-through decoration-rose-400/50">{c.claim}</p>
            <p className="mt-1.5 text-xs leading-6 text-zinc-500">{c.why}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* =============================================== 3. creative format ranges */

export function FormatRanges({ items }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const MAX = 10;
  const tone = {
    low: 'from-zinc-600 to-zinc-500',
    mid: 'from-brand/45 to-brand/80',
    high: 'from-brand to-amber-300',
  };

  return (
    <div ref={ref} className="space-y-6">
      {items.map((f, i) => (
        <div key={f.label}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="text-sm font-medium text-white">{f.label}</span>
            <span className="text-sm font-semibold tabular-nums text-zinc-300">{f.lo}× – {f.hi}× ROAS</span>
          </div>
          <div className="relative mt-2.5 h-3 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className={`absolute inset-y-0 rounded-full bg-gradient-to-r ${tone[f.tone]}`}
              initial={{ width: 0, left: `${(f.lo / MAX) * 100}%` }}
              animate={inView ? { width: `${((f.hi - f.lo) / MAX) * 100}%` } : {}}
              transition={{ duration: reduce ? 0 : 0.9, ease: EASE, delay: reduce ? 0 : 0.1 + i * 0.14 }}
            />
          </div>
          <p className="mt-2.5 text-sm leading-7 text-zinc-400">{f.body}</p>
        </div>
      ))}
      <div className="flex justify-between border-t border-white/10 pt-2 text-[0.7rem] text-zinc-600">
        <span>0×</span><span>5×</span><span>10× ROAS</span>
      </div>
    </div>
  );
}

/* ================================================== 4. the four shelves */
/* Beauty does not have a funnel so much as four places a product has to work,
   each demanding a different asset. Drawn as weighted rows rather than a
   funnel, because they are not sequential. */

export function Shelves({ items }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="space-y-5">
      {items.map((s, i) => (
        <motion.div key={s.name}
          initial={reduce ? { opacity: 1 } : { opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: reduce ? 0 : 0.45, ease: EASE, delay: reduce ? 0 : i * 0.09 }}
          className="rounded-card border border-white/10 bg-white/[0.04] p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="text-sm font-semibold text-white">{s.name}</span>
            <span className="text-xs uppercase tracking-eyebrow text-brand">{s.role}</span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-brand/40 to-brand"
              initial={{ width: 0 }} animate={inView ? { width: `${s.weight}%` } : {}}
              transition={{ duration: reduce ? 0 : 0.8, ease: EASE, delay: reduce ? 0 : 0.15 + i * 0.09 }} />
          </div>
          <p className="mt-3 text-sm leading-7 text-zinc-400">{s.detail}</p>
        </motion.div>
      ))}
      <p className="text-[0.7rem] leading-5 text-zinc-600">
        Bar length is relative importance for a growing D2C brand, not market share. The four are
        parallel, not sequential — a product has to work on all of them.
      </p>
    </div>
  );
}
