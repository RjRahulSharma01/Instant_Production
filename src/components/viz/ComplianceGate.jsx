import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiCheck, FiX, FiAlertTriangle } from 'react-icons/fi';
import { EASE } from '../../lib/motion';

/* Shared across the regulated-industry pages.
 *
 * It started life inside the fintech page for SEBI rules, then education needed
 * the identical thing for CCPA and ASCI rules, and healthcare will want it for
 * NMC. Rather than keep three copies in sync, it lives here and each page
 * supplies its own items. FinViz re-exports it so nothing that already imports
 * it from there breaks.
 *
 * Each item is { tactic, verdict: 'clear' | 'restricted' | 'blocked', body }.
 *
 * The colour coding is the one place on the site where green and red carry
 * meaning rather than decoration, which is why they are permitted here and
 * nowhere else — see the brand guidelines, page 03.
 */

const STYLE = {
  clear: {
    chip: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    panel: 'border-emerald-400/30 bg-emerald-400/[0.06]',
    dot: 'bg-emerald-400',
    Icon: FiCheck,
    label: 'Permitted',
  },
  restricted: {
    chip: 'border-brand/30 bg-brand/10 text-brand',
    panel: 'border-brand/30 bg-brand/[0.06]',
    dot: 'bg-brand',
    Icon: FiAlertTriangle,
    label: 'Conditions apply',
  },
  blocked: {
    chip: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
    panel: 'border-rose-400/30 bg-rose-400/[0.06]',
    dot: 'bg-rose-400',
    Icon: FiX,
    label: 'Do not run',
  },
};

export default function ComplianceGate({ items }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const it = items[active];
  const s = STYLE[it.verdict];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
      <ul className="space-y-1.5">
        {items.map((x, i) => {
          const on = active === i;
          const xs = STYLE[x.verdict];
          return (
            <li key={x.tactic}>
              <button type="button" aria-pressed={on}
                onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                className={`flex min-h-[44px] w-full items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                  on ? 'border-white/20 bg-white/[0.07]' : 'border-transparent hover:bg-white/[0.04]'}`}>
                <span className={`h-2 w-2 shrink-0 rounded-full ${xs.dot}`} />
                <span className={`text-sm leading-6 ${on ? 'text-white' : 'text-zinc-400'}`}>{x.tactic}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className={`rounded-card border p-6 transition-colors duration-500 ${s.panel}`}>
        <AnimatePresence mode="wait">
          <motion.div key={it.tactic}
            initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={reduce ? {} : { opacity: 0, y: -8 }} transition={{ duration: 0.24, ease: EASE }}>
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${s.chip}`}>
              <s.Icon aria-hidden="true" size={13} />{s.label}
            </span>
            <p className="mt-4 text-base font-medium leading-snug text-white">{it.tactic}</p>
            <p className="mt-3 text-sm leading-7 text-zinc-300">{it.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
