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
/**
 * Dwell time is derived from the panel's own word count rather than a fixed
 * interval, so editing the copy never leaves a panel cut off mid-sentence.
 * ~300 wpm (skim-reading, not careful reading) plus a two-second buffer to
 * take in the heading and settle, clamped to a sane range.
 */
function dwellFor(item) {
  const words = `${item.title} ${item.description}`.trim().split(/\s+/).length;
  return Math.min(13000, Math.max(6500, Math.round((words / 300) * 60000) + 2200));
}

export default function RotatingPanel({ items, className = '' }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  const go = useCallback((next) => setIndex(((next % items.length) + items.length) % items.length), [items.length]);

  const dwell = dwellFor(items[index]);

  useEffect(() => {
    if (reduce || paused || items.length < 2) return undefined;
    timer.current = window.setTimeout(() => setIndex((v) => (v + 1) % items.length), dwell);
    return () => window.clearTimeout(timer.current);
  }, [reduce, paused, items.length, dwell, index]);

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
              className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ease-expo ${
                i === index ? 'w-10 bg-white/20' : 'w-1.5 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
