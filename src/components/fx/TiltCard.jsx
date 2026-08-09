import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useIsTouch } from '../../lib/useMediaQuery';

/**
 * 3D tilt that follows the pointer, with a specular sheen that tracks the
 * same position. Falls back to a plain motion.div under reduced motion.
 */
export default function TiltCard({ children, className = '', max = 10, variants, ...rest }) {
  const reduce = useReducedMotion();
  const touch = useIsTouch();
  const ref = useRef(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 220, damping: 22 });
  const sy = useSpring(py, { stiffness: 220, damping: 22 });

  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const sheenX = useTransform(sx, [0, 1], ['0%', '100%']);
  const sheenY = useTransform(sy, [0, 1], ['0%', '100%']);

  // Tilt is pointer-driven; on touch it only leaves cards stuck mid-rotation.
  if (reduce || touch) {
    return (
      <motion.div className={className} variants={variants} {...rest}>
        {children}
      </motion.div>
    );
  }

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { px.set(0.5); py.set(0.5); };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={{ y: -10, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      className={`relative ${className}`}
      {...rest}
    >
      {children}
      <motion.span
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle at var(--mx) var(--my), rgba(245,158,11,0.18), transparent 55%)',
          '--mx': sheenX,
          '--my': sheenY,
        }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.div>
  );
}
