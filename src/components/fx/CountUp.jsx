import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Counts up when scrolled into view. Preserves any prefix/suffix in the
 * source string, so "250+" counts to 250 and keeps the plus, and "24/7"
 * is left alone because it has no single number to animate.
 */
export default function CountUp({ value, className = '', duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  const match = String(value).match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/);
  const animatable = Boolean(match) && !String(value).includes('/');
  const prefix = animatable ? match[1] : '';
  const target = animatable ? parseFloat(match[2]) : 0;
  const suffix = animatable ? match[3] : '';
  const decimals = animatable && match[2].includes('.') ? match[2].split('.')[1].length : 0;

  const [n, setN] = useState(animatable ? 0 : null);

  useEffect(() => {
    if (!animatable || !inView || reduce) return undefined;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // cubic ease-out
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animatable, inView, reduce, target, duration]);

  if (!animatable || reduce) return <span ref={ref} className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}
