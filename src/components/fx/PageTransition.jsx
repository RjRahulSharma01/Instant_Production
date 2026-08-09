import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/motion';

/** Wraps each route so navigation fades and lifts rather than snapping. */
export default function PageTransition({ children }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
