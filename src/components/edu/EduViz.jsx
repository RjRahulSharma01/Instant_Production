import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FiSearch, FiCreditCard, FiPhone } from 'react-icons/fi';
import { EASE } from '../../lib/motion';

/* Hand-rolled SVG and CSS, same as the other industry pages. No chart library,
   no photography, no generated imagery. Everything degrades to a static
   readable state under prefers-reduced-motion. */

/* ============================================== 1. the two-audience split */
/* Three columns, because in Indian education the person who searches, the
   person who pays and the person who closes are almost never the same person. */

export function AudienceSplit({ roles }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const icons = [FiSearch, FiCreditCard, FiPhone];

  return (
    <div ref={ref} className="grid gap-4 lg:grid-cols-3">
      {roles.map((r, i) => {
        const Icon = icons[i] || FiSearch;
        return (
          <motion.div key={r.who}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduce ? 0 : 0.45, ease: EASE, delay: reduce ? 0 : i * 0.1 }}
            className="flex flex-col rounded-card border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-brand/30">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/15 text-brand">
              <Icon aria-hidden="true" size={16} />
            </span>
            <h3 className="mt-4 text-base font-semibold text-white">{r.who}</h3>
            <p className="mt-1 text-xs uppercase tracking-eyebrow text-brand">{r.does}</p>

            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-[0.7rem] uppercase tracking-eyebrow text-zinc-500">Wants</dt>
                <dd className="mt-1 leading-6 text-zinc-300">{r.wants}</dd>
              </div>
              <div>
                <dt className="text-[0.7rem] uppercase tracking-eyebrow text-zinc-500">Reached on</dt>
                <dd className="mt-1 leading-6 text-zinc-400">{r.channel}</dd>
              </div>
            </dl>

            <p className="mt-auto border-t border-white/10 pt-3.5 text-xs leading-6 text-zinc-500">
              <span className="font-medium text-rose-300/90">Loses them:</span> {r.fails}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ================================================= 2. the enrolment ladder */
/* A proportional bar chart would render the final step as roughly one pixel,
   which is exactly the point — so the bars stay honestly proportional and the
   counts carry the reading. No log scale, no truncated axis. */

export function EnrolLadder({ steps }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const per1000 = (pct) => Math.round((pct / 100) * 1000);

  return (
    <div ref={ref}>
      <p className="text-xs uppercase tracking-eyebrow text-zinc-500">Of every 1,000 clicks</p>
      <div className="mt-5 space-y-4">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          const n = per1000(s.pct);
          return (
            <div key={s.label}>
              <div className="flex items-baseline gap-3">
                <span className={`w-14 shrink-0 text-right text-lg font-semibold tabular-nums ${last ? 'text-brand' : 'text-white'}`}>
                  {n}
                </span>
                <span className={`text-sm ${last ? 'font-semibold text-white' : 'text-zinc-300'}`}>{s.label}</span>
              </div>
              <div className="ml-[4.25rem] mt-1.5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className={`h-full rounded-full ${last ? 'bg-brand' : 'bg-white/25'}`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${s.pct}%` } : {}}
                    style={{ minWidth: 2 }}
                    transition={{ duration: reduce ? 0 : 0.8, ease: EASE, delay: reduce ? 0 : i * 0.1 }}
                  />
                </div>
                <p className="mt-1.5 text-[0.72rem] text-zinc-500">{s.note}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-6 text-zinc-500">
        Bars are proportional and not truncated. The last one is nearly invisible because it
        nearly is — that is the shape of an admissions funnel.
      </p>
    </div>
  );
}

/* ================================================ 3. inquiry vs enrolled gap */

export function CostGap({ rows, max = 4000 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="space-y-8">
      {rows.map((r, i) => {
        const mult = Math.round(r.enrolled / r.inquiry);
        return (
          <div key={r.label}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="text-sm font-medium text-white">{r.label}</span>
              <span className="text-sm font-semibold text-brand">{mult}× the gap</span>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-[0.7rem] text-zinc-500">Per inquiry</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div className="h-full rounded-full bg-zinc-500"
                    initial={{ width: 0 }} animate={inView ? { width: `${(r.inquiry / max) * 100}%` } : {}}
                    style={{ minWidth: 3 }}
                    transition={{ duration: reduce ? 0 : 0.7, ease: EASE, delay: reduce ? 0 : i * 0.12 }} />
                </div>
                <span className="w-16 shrink-0 text-right text-xs tabular-nums text-zinc-400">${r.inquiry}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-[0.7rem] text-zinc-500">Per enrolment</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-brand/60 to-brand"
                    initial={{ width: 0 }} animate={inView ? { width: `${(r.enrolled / max) * 100}%` } : {}}
                    transition={{ duration: reduce ? 0 : 0.9, ease: EASE, delay: reduce ? 0 : 0.15 + i * 0.12 }} />
                </div>
                <span className="w-16 shrink-0 text-right text-xs font-semibold tabular-nums text-brand">${r.enrolled.toLocaleString()}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================== 4. the enforcement record */

export function Scoreboard({ stats }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="grid gap-3 sm:grid-cols-2">
      {stats.map((s, i) => (
        <motion.div key={s.label}
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduce ? 0 : 0.4, ease: EASE, delay: reduce ? 0 : i * 0.08 }}
          className="rounded-card border border-rose-400/20 bg-rose-400/[0.05] p-5">
          <p className="text-2xl font-semibold tracking-tight text-white">{s.value}</p>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{s.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ================================================== 5. the market correction */

export function Correction({ headline, body }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="rounded-card border border-white/10 bg-white/[0.03] p-6 sm:p-7">
      <p className="text-sm font-semibold text-white">{headline}</p>

      {/* Full-width blocks read as two bars of different thickness rather than
          two columns of different height, which is the wrong comparison. Narrow
          columns on a shared baseline make it a height comparison again.
          96px : 13px is the real 22 : 3 ratio, not a flattered one. */}
      <div className="mt-6 flex items-end justify-center gap-10 sm:gap-14">
        <div className="flex flex-col items-center">
          <motion.div className="w-16 rounded-t-md bg-zinc-700 sm:w-20"
            initial={{ height: 0 }} animate={inView ? { height: 96 } : {}}
            transition={{ duration: reduce ? 0 : 0.8, ease: EASE }} />
          <div className="h-px w-24 bg-white/15 sm:w-28" />
          <p className="mt-2.5 text-xl font-semibold text-zinc-400">~$22B</p>
          <p className="max-w-[8rem] text-center text-[0.7rem] leading-5 text-zinc-600">Peak K-12 edtech valuation</p>
        </div>

        <div aria-hidden="true" className="pb-16 text-2xl text-zinc-700">→</div>

        <div className="flex flex-col items-center">
          <motion.div className="w-16 rounded-t-md bg-brand sm:w-20"
            initial={{ height: 0 }} animate={inView ? { height: 13 } : {}}
            transition={{ duration: reduce ? 0 : 0.8, ease: EASE, delay: reduce ? 0 : 0.25 }} />
          <div className="h-px w-24 bg-white/15 sm:w-28" />
          <p className="mt-2.5 text-xl font-semibold text-brand">~$3B</p>
          <p className="max-w-[8rem] text-center text-[0.7rem] leading-5 text-zinc-600">Sustainable D2C market</p>
        </div>
      </div>

      <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-7 text-zinc-400">{body}</p>
    </div>
  );
}
