import { motion, useReducedMotion } from 'framer-motion';

/** Infinite horizontal ticker. Static list under reduced motion. */
export default function Marquee({ items, speed = 28, className = '' }) {
  const reduce = useReducedMotion();
  const row = [...items, ...items];

  if (reduce) {
    return (
      <div className={`flex flex-wrap justify-center gap-x-8 gap-y-2 ${className}`}>
        {items.map((t) => <span key={t}>{t}</span>)}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {row.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-10">
            {t}
            <span className="h-1 w-1 rounded-full bg-brand/60" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
