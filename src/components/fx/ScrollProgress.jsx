import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { useIsTouch } from '../../lib/useMediaQuery';

/**
 * Amber progress bar pinned to the top of the viewport.
 * The bar itself is scroll-linked (not autonomous), but the spring smoothing
 * adds motion of its own — so under reduced motion we bind straight to the
 * raw scroll value, which tracks exactly with no easing.
 */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const touch = useIsTouch();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  const scaleX = reduce || touch ? scrollYProgress : smooth;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-brand-600 via-brand to-brand-300 shadow-[0_0_18px_rgba(245,158,11,0.6)]"
    />
  );
}
