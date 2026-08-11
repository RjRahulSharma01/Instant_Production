import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/motion';

/**
 * Vertically auto-rotating panel.
 *
 * Advances downward — the outgoing panel slides up and out while the next one
 * rises from below, the way scrolling down a list behaves. Loops forever.
 *
 * Accessibility:
 *  - pauses on hover and on keyboard focus, so nobody loses their place mid-read
 *  - stops entirely under prefers-reduced-motion, showing the first panel
 *  - dots are real buttons, so it can be driven by keyboard
 *  - aria-live="off" because rotation is decorative, not an alert
 */
export default function RotatingPanel({ items, interval = 3000, className = '' }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  const go = useCallback((next) => setIndex(((next % items.length) + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (reduce || paused || items.length < 2) return undefined;
    timer.current = window.setInterval(() => setIndex((v) => (v + 1) % items.length), interval);
    return () => window.clearInterval(timer.current);
  }, [reduce, paused, items.length, interval]);

  const item = items[index];

  return (
    <div
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative min-h-[210px] overflow-hidden sm:min-h-[196px]" aria-live="off">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={reduce ? false : { y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
            transition={{ duration: 0.62, ease: EASE }}
          >
            <p className="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-zinc-400">
              <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
              {item.eyebrow}
            </p>
            <h2 className="mt-3 text-[1.35rem] font-semibold leading-snug text-white sm:text-2xl">
              &ldquo;{item.title}&rdquo;
            </h2>
            <p className="mt-3 text-[0.95rem] leading-7 text-zinc-300">{item.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {items.length > 1 && (
        <div className="mt-4 flex items-center gap-2">
          {items.map((it, i) => (
            <button
              key={it.title}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show: ${it.title}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-500 ease-expo ${
                i === index ? 'w-7 bg-brand' : 'w-1.5 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
