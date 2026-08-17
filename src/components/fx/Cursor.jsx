import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Custom cursor: a small solid dot that tracks exactly, plus a lagging ring
 * that swells over interactive elements.
 *
 * Only mounts on devices with a fine pointer (real mouse). Never on touch,
 * and never under reduced motion. The native cursor is hidden via a body
 * class only while this is active, so it can never strand a user without one.
 */
export default function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (reduce) return undefined;
    const fine = window.matchMedia('(pointer: fine)');
    if (!fine.matches) return undefined;

    setEnabled(true);
    document.body.classList.add('has-custom-cursor');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target;
      setHot(Boolean(t.closest('a, button, [role="button"], input, textarea, select, .cursor-hot')));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    const leave = () => { x.set(-100); y.set(-100); };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', dn);
    window.addEventListener('pointerup', up);
    document.addEventListener('mouseleave', leave);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', dn);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('mouseleave', leave);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[70] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-brand mix-blend-difference"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: rx, y: ry }}
        animate={{ scale: down ? 0.8 : hot ? 1.9 : 1, opacity: hot ? 1 : 0.55 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="pointer-events-none fixed left-0 top-0 z-[69] -ml-4 -mt-4 h-8 w-8 rounded-full border border-brand/70"
      />
    </>
  );
}
