import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/motion';

/* Every visual on this page is hand-rolled SVG and CSS.
   No chart library, no stock photography, no generated imagery, which means
   no licence exposure, nothing to attribute, and about 40 kB of charting code
   that never enters the bundle. Each component below degrades to a static,
   readable state under prefers-reduced-motion. */

/* ===================================================== 1. asset fan-out */
/* The hero scene: one shoot node fanning out into a grid of derived assets.
   It is the argument of the whole page rendered as a diagram. */

export function AssetFanOut({ tiles = 40 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();

  const grid = useMemo(() => {
    const cols = 10;
    return Array.from({ length: tiles }, (_, i) => ({
      i,
      x: 236 + (i % cols) * 25,
      y: 34 + Math.floor(i / cols) * 33,
      // A few tiles read as video, a few as vertical. Visual variety only.
      kind: i % 7 === 0 ? 'video' : i % 5 === 0 ? 'vertical' : 'still',
    }));
  }, [tiles]);

  return (
    <div ref={ref} className="w-full overflow-hidden rounded-panel border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-4 sm:p-6">
      <svg viewBox="0 0 500 190" className="w-full" role="img"
        aria-label={`Diagram: one production day on the left fanning out into ${tiles} derived assets on the right.`}>
        <defs>
          <linearGradient id="ef-thread" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(245 158 11)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="rgb(245 158 11)" stopOpacity="0.06" />
          </linearGradient>
          <radialGradient id="ef-glow">
            <stop offset="0%" stopColor="rgb(245 158 11)" stopOpacity="0.34" />
            <stop offset="100%" stopColor="rgb(245 158 11)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="88" cy="95" r="70" fill="url(#ef-glow)" />

        {/* threads */}
        {grid.filter((_, i) => i % 2 === 0).map((t, i) => (
          <motion.path
            key={`p${t.i}`}
            d={`M 122 95 C 175 95, 190 ${t.y + 8}, ${t.x - 4} ${t.y + 8}`}
            fill="none" stroke="url(#ef-thread)" strokeWidth="1"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: reduce ? 0 : 1.1, ease: EASE, delay: reduce ? 0 : 0.25 + i * 0.02 }}
          />
        ))}

        {/* source node */}
        <motion.g
          initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
          style={{ transformOrigin: '88px 95px' }}
        >
          <rect x="46" y="66" width="76" height="58" rx="9" fill="rgb(245 158 11)" />
          <rect x="52" y="72" width="64" height="34" rx="4" fill="rgba(0,0,0,0.28)" />
          <circle cx="84" cy="89" r="8" fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="2.5" />
          <text x="84" y="119" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="rgba(0,0,0,0.72)">1 SHOOT DAY</text>
        </motion.g>

        {/* derived assets */}
        {grid.map((t, i) => (
          <motion.rect
            key={`t${t.i}`}
            x={t.x} y={t.y}
            width={t.kind === 'vertical' ? 12 : 18}
            height={t.kind === 'vertical' ? 17 : 12}
            rx="2.5"
            fill={t.kind === 'video' ? 'rgb(245 158 11)' : 'rgba(255,255,255,0.30)'}
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: reduce ? 0 : 0.42, ease: EASE, delay: reduce ? 0 : 0.5 + i * 0.022 }}
            style={{ transformOrigin: `${t.x + 9}px ${t.y + 6}px` }}
          />
        ))}
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[0.7rem] text-zinc-500">
        <span className="flex items-center gap-1.5"><span className="h-2 w-3 rounded-[2px] bg-brand" /> video cut</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-3 rounded-[2px] bg-white/30" /> still / carousel frame</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-2 rounded-[2px] bg-white/30" /> vertical</span>
      </div>
    </div>
  );
}

/* ============================================== 2. the fatigue window arcs */
/* Two arcs on the same scale. The 2026 arc is visibly, uncomfortably shorter.
   Scale tops out at 70 days so both fit honestly on one axis. */

export function FatigueWindow({ then, now }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduce = useReducedMotion();
  const MAX = 70, R = 78, CX = 100, CY = 100;
  const C = Math.PI * R; // half-circle circumference

  const arc = (days) => (days / MAX) * C;

  const Row = ({ label, lo, hi, colour, dim, delay }) => (
    <div className={`flex flex-col items-center ${dim ? 'opacity-80' : ''}`}>
      <div className="relative" style={{ width: 200, height: 112 }}>
        <svg viewBox="0 0 200 112" className="w-full" aria-hidden="true">
          <path d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
            fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" strokeLinecap="round" />
          <motion.path
            d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
            fill="none" stroke={colour} strokeWidth="12" strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={inView ? { strokeDashoffset: C - arc(hi) } : {}}
            transition={{ duration: reduce ? 0 : 1.2, ease: EASE, delay: reduce ? 0 : delay }}
            opacity={0.34}
          />
          <motion.path
            d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
            fill="none" stroke={colour} strokeWidth="12" strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={inView ? { strokeDashoffset: C - arc(lo) } : {}}
            transition={{ duration: reduce ? 0 : 1.2, ease: EASE, delay: reduce ? 0 : delay + 0.1 }}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-1 text-center">
          <span className="block text-2xl font-semibold tabular-nums text-white">{lo}–{hi}</span>
          <span className="block text-[0.7rem] uppercase tracking-eyebrow text-zinc-500">days</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium text-zinc-300">{label}</p>
    </div>
  );

  return (
    <div ref={ref}>
      <div className="grid grid-cols-2 gap-4">
        <Row label={`In ${then.years}`} lo={then.lo} hi={then.hi} colour="rgb(113 113 122)" dim delay={0.1} />
        <Row label={`In ${now.years}`} lo={now.lo} hi={now.hi} colour="rgb(245 158 11)" delay={0.25} />
      </div>
      <p className="mt-5 border-t border-white/10 pt-4 text-center text-sm leading-7 text-zinc-400">
        The same creative. The same budget. Roughly <span className="font-semibold text-white">half the runway</span> it had four years ago.
      </p>
    </div>
  );
}

/* ================================================ 3. creative maths engine */
/* Interactive: set assets per month, see whether you clear your own fatigue
   window. Deliberately shows the failure state, because most brands are in it. */

export function CreativeMaths() {
  const [assets, setAssets] = useState(4);
  const [adSets, setAdSets] = useState(3);
  const reduce = useReducedMotion();

  // An ad set runs roughly three concurrent creatives. A refresh means replacing
  // that set, not swapping a single asset, so the number of live slots is what
  // the monthly output has to cover.
  const CONCURRENT = 3;
  const slots = adSets * CONCURRENT;
  const cycle = assets > 0 ? Math.round((30 * slots) / assets) : 999;
  const WINDOW_HI = 35, WINDOW_LO = 21;
  const clears = cycle <= WINDOW_LO;
  const marginal = !clears && cycle <= WINDOW_HI;
  const conceptsPerQuarter = Math.round(assets * 3 * 0.75);

  const state = clears
    ? { tone: 'text-emerald-400', ring: 'border-emerald-400/40 bg-emerald-400/[0.07]', verdict: 'Clears the window' }
    : marginal
      ? { tone: 'text-brand', ring: 'border-brand/40 bg-brand/[0.07]', verdict: 'Marginal. Fatigues late in the flight' }
      : { tone: 'text-rose-400', ring: 'border-rose-400/40 bg-rose-400/[0.07]', verdict: 'Runs fatigued creative for most of the month' };

  const Slider = ({ label, value, set, min, max, suffix }) => (
    <div>
      <label className="flex items-baseline justify-between gap-4">
        <span className="text-sm text-zinc-300">{label}</span>
        <span className="text-sm font-semibold tabular-nums text-white">{value}{suffix}</span>
      </label>
      {/* The control is 44px tall so it clears the touch-target minimum in the
          brand guidelines; the visible track is drawn at 6px inside it. */}
      <input
        type="range" min={min} max={max} value={value}
        onChange={(e) => set(Number(e.target.value))}
        aria-label={label}
        className="mt-1 h-11 w-full cursor-pointer appearance-none bg-transparent accent-brand
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
                   focus-visible:ring-offset-zinc-950
                   [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full
                   [&::-webkit-slider-runnable-track]:bg-white/10
                   [&::-webkit-slider-thumb]:mt-[-7px] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-brand
                   [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-white/10
                   [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full
                   [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-brand"
      />
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-7 rounded-card border border-white/10 bg-white/[0.04] p-6">
        <Slider label="New assets shipped per month" value={assets} set={setAssets} min={1} max={40} suffix="" />
        <Slider label="Active ad sets running" value={adSets} set={setAdSets} min={1} max={8} suffix="" />
        <p className="text-xs leading-6 text-zinc-500">
          Assumes each ad set runs three concurrent creatives, so a full refresh means replacing
          {' '}{slots} live slots, and that roughly three quarters of what you ship is a distinct
          concept rather than a variant of something already running.
        </p>
      </div>

      <div className={`rounded-card border p-6 transition-colors duration-500 ${state.ring}`}>
        <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
          <div>
            <p className="text-xs uppercase tracking-eyebrow text-zinc-500">Your refresh cycle</p>
            <p className={`mt-1.5 text-4xl font-semibold tabular-nums ${state.tone}`}>
              {cycle > 120 ? '120+' : cycle}<span className="ml-1.5 text-base font-normal text-zinc-500">days</span>
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-eyebrow text-zinc-500">Category window</p>
            <p className="mt-1.5 text-4xl font-semibold tabular-nums text-zinc-400">
              21–35<span className="ml-1.5 text-base font-normal text-zinc-500">days</span>
            </p>
          </div>
        </div>

        {/* the comparison bar */}
        <div className="mt-6">
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/[0.07]">
            <div className="absolute inset-y-0 rounded-full bg-white/[0.13]"
              style={{ left: `${(WINDOW_LO / 70) * 100}%`, width: `${((WINDOW_HI - WINDOW_LO) / 70) * 100}%` }} />
            <motion.div
              className={`absolute inset-y-0 left-0 rounded-full ${clears ? 'bg-emerald-400' : marginal ? 'bg-brand' : 'bg-rose-400'}`}
              animate={{ width: `${Math.min(100, (cycle / 70) * 100)}%` }}
              transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[0.7rem] text-zinc-600">
            <span>0</span><span>21</span><span>35</span><span>70+ days</span>
          </div>
        </div>

        <p className={`mt-5 text-sm font-semibold ${state.tone}`}>{state.verdict}</p>
        <p className="mt-2 text-sm leading-7 text-zinc-400">
          At {assets} asset{assets === 1 ? '' : 's'} a month across {adSets} ad set{adSets === 1 ? '' : 's'}, you get roughly{' '}
          <span className="font-semibold text-white">{conceptsPerQuarter} distinct concepts tested a quarter</span>.
          {clears
            ? ' That is enough volume to find the outlier that carries the account.'
            : ' Testing at that rate, a winning concept is as likely to be missed as found.'}
        </p>
      </div>
    </div>
  );
}

/* ============================================= 4. ROAS quartile explorer */

export function RoasExplorer({ categories }) {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const MAX = 7;
  const c = categories[active];

  return (
    <div ref={ref} className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-3.5">
        {categories.map((cat, i) => {
          const on = active === i;
          return (
            <button key={cat.key} type="button" aria-pressed={on}
              onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
              className="block w-full rounded-lg px-1 py-0.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
              <span className="flex items-baseline justify-between gap-4">
                <span className={`text-sm font-medium transition-colors ${on ? 'text-brand' : 'text-zinc-300'}`}>{cat.name}</span>
                <span className={`text-xs tabular-nums transition-colors ${on ? 'text-brand' : 'text-zinc-600'}`}>
                  {cat.q1.toFixed(1)} · <span className="font-semibold">{cat.med.toFixed(1)}</span> · {cat.q3.toFixed(1)}
                </span>
              </span>
              {/* quartile bar: faint span from q1 to q3, solid marker at median */}
              <span className="relative mt-2 block h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <motion.span
                  className={`absolute inset-y-0 rounded-full ${on ? 'bg-brand/35' : 'bg-white/[0.14]'}`}
                  initial={{ width: 0, left: `${(cat.q1 / MAX) * 100}%` }}
                  animate={inView ? { width: `${((cat.q3 - cat.q1) / MAX) * 100}%` } : {}}
                  transition={{ duration: reduce ? 0 : 0.8, ease: EASE, delay: reduce ? 0 : i * 0.06 }}
                />
                <motion.span
                  className={`absolute inset-y-0 w-1 rounded-full ${on ? 'bg-brand' : 'bg-white/45'}`}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  style={{ left: `${(cat.med / MAX) * 100}%` }}
                  transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.5 + i * 0.06 }}
                />
              </span>
            </button>
          );
        })}
        <p className="pt-1 text-[0.7rem] text-zinc-600">
          Bar spans bottom to top quartile. The vertical marker is the median.
        </p>
      </div>

      <div className="rounded-card border border-brand/25 bg-brand/[0.06] p-6">
        <AnimatePresence mode="wait">
          <motion.div key={c.key}
            initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={reduce ? {} : { opacity: 0, y: -10 }} transition={{ duration: 0.26, ease: EASE }}>
            <p className="text-sm font-medium text-white">{c.name}</p>
            <p className="mt-0.5 text-xs text-zinc-500">Typical AOV {c.aov}</p>

            <div className="mt-5 grid grid-cols-3 gap-3 border-y border-white/10 py-4">
              {[['Bottom quartile', c.q1], ['Median', c.med], ['Top quartile', c.q3]].map(([k, v], i) => (
                <div key={k}>
                  <p className={`text-2xl font-semibold tabular-nums ${i === 1 ? 'text-brand' : 'text-white'}`}>{v.toFixed(1)}</p>
                  <p className="mt-0.5 text-[0.7rem] leading-4 text-zinc-500">{k}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs uppercase tracking-eyebrow text-zinc-500">What moves it</p>
            <p className="mt-1.5 text-sm text-zinc-300">{c.driver}</p>
            <p className="mt-4 text-sm leading-7 text-zinc-400">{c.note}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ================================================== 5. the RTO decay line */

export function RtoLine({ points }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduce = useReducedMotion();

  const W = 460, H = 190, PAD_L = 40, PAD_R = 40, PAD_B = 30, PAD_T = 16;
  const max = 50;
  const x = (i) => PAD_L + (i * (W - PAD_L - PAD_R)) / (points.length - 1);
  // First and last labels anchor inward so they cannot run off the viewBox.
  const anchor = (i) => (i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle');
  const labelX = (i) => (i === 0 ? x(i) - 9 : i === points.length - 1 ? x(i) + 9 : x(i));
  const y = (v) => PAD_T + (1 - v / max) * (H - PAD_T - PAD_B);
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(p.value)}`).join(' ');
  const area = `${path} L ${x(points.length - 1)} ${H - PAD_B} L ${x(0)} ${H - PAD_B} Z`;

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
        aria-label={`Line chart: RTO falling from ${points[0].value}% in ${points[0].label} to ${points[points.length - 1].value}% in ${points[points.length - 1].label}.`}>
        <defs>
          <linearGradient id="rto-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(245 158 11)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="rgb(245 158 11)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 20, 40].map((g) => (
          <g key={g}>
            <line x1={PAD_L - 6} y1={y(g)} x2={W - 8} y2={y(g)} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            <text x={PAD_L - 12} y={y(g) + 3.5} textAnchor="end" fontSize="9" fill="rgb(113 113 122)">{g}%</text>
          </g>
        ))}

        <motion.path d={area} fill="url(#rto-fill)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.5 }} />

        <motion.path d={path} fill="none" stroke="rgb(245 158 11)" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: reduce ? 0 : 1.3, ease: EASE }} />

        {points.map((p, i) => (
          <motion.g key={p.label}
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.55 + i * 0.18 }}>
            <circle cx={x(i)} cy={y(p.value)} r="5" fill="rgb(9 9 11)" stroke="rgb(245 158 11)" strokeWidth="2.5" />
            <text x={labelX(i)} y={y(p.value) - 13} textAnchor={anchor(i)} fontSize="12" fontWeight="600" fill="#fff">{p.value.toFixed(1)}%</text>
            <text x={labelX(i)} y={H - 13} textAnchor={anchor(i)} fontSize="9.5" fill="rgb(161 161 170)">{p.label}</text>
            <text x={labelX(i)} y={H - 3} textAnchor={anchor(i)} fontSize="8.5" fill="rgb(113 113 122)">{p.sub}</text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

/* ============================================= 6. quick-commerce shelf donut */

export function ShelfDonut({ share }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(0);

  const R = 74, SW = 24, C = 2 * Math.PI * R;
  const colours = ['rgb(245 158 11)', 'rgb(252 211 77)', 'rgb(180 131 40)', 'rgba(255,255,255,0.16)'];
  let acc = 0;

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8" ref={ref}>
      <div className="relative shrink-0" style={{ width: 190, height: 190 }}>
        <svg viewBox="0 0 190 190" className="-rotate-90" aria-hidden="true">
          {share.map((s, i) => {
            const off = acc; acc += s.value;
            return (
              <motion.circle
                key={s.label} cx="95" cy="95" r={R} fill="none"
                stroke={colours[i]} strokeWidth={hover === i ? SW + 4 : SW}
                strokeDasharray={`${(s.value / 100) * C} ${C}`}
                strokeDashoffset={-(off / 100) * C}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: reduce ? 0 : 0.5, ease: EASE, delay: reduce ? 0 : i * 0.12 }}
                style={{ transition: 'stroke-width .25s' }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold tabular-nums text-white">{share[hover].value}%</span>
          <span className="mt-0.5 max-w-[6.5rem] text-center text-[0.68rem] leading-4 text-zinc-500">{share[hover].label}</span>
        </div>
      </div>

      <ul className="w-full space-y-2">
        {share.map((s, i) => (
          <li key={s.label}>
            <button type="button"
              onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} onClick={() => setHover(i)}
              className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: colours[i] }} />
              <span className={`flex-1 text-sm ${hover === i ? 'text-white' : 'text-zinc-400'}`}>{s.label}</span>
              <span className="text-sm font-semibold tabular-nums text-zinc-300">{s.value}%</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================ 7. growth bars by category */

export function GrowthBars({ items }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const max = Math.max(...items.map((i) => i.value));

  return (
    <div ref={ref} className="space-y-5">
      {items.map((it, i) => (
        <div key={it.label}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm font-medium text-zinc-200">{it.label}</span>
            <span className="text-sm font-semibold tabular-nums text-brand">+{it.value}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand/50 to-brand"
              initial={{ width: 0 }}
              animate={inView ? { width: `${(it.value / max) * 100}%` } : {}}
              transition={{ duration: reduce ? 0 : 0.9, ease: EASE, delay: reduce ? 0 : i * 0.08 }}
            />
          </div>
          <p className="mt-2 text-xs leading-6 text-zinc-500">{it.note}</p>
        </div>
      ))}
    </div>
  );
}

/* ====================================== 8. creative format comparison bars */

export function FormatBars({ items }) {
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

/* ======================================= 9. metro vs everywhere-else split */

export function GeoSplit({ outsideMetro }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduce = useReducedMotion();
  const cells = 100;

  return (
    <div ref={ref}>
      <div className="grid grid-cols-10 gap-1.5" aria-hidden="true">
        {Array.from({ length: cells }, (_, i) => (
          <motion.span
            key={i}
            className={`aspect-square rounded-[3px] ${i < outsideMetro ? 'bg-brand' : 'bg-white/[0.13]'}`}
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: i < outsideMetro ? 1 : 0.9, scale: 1 } : {}}
            transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : i * 0.006 }}
          />
        ))}
      </div>
      <p className="sr-only">{outsideMetro} in every 100 next-wave D2C customers live outside a metro.</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-500">
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-[3px] bg-brand" /> Outside a metro: {outsideMetro}%</span>
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-[3px] bg-white/[0.13]" /> Metro: {100 - outsideMetro}%</span>
      </div>
    </div>
  );
}
