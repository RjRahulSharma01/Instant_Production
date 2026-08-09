import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/motion';

/**
 * Reveals a heading word by word on scroll.
 * Renders the plain string when reduced motion is requested, and always keeps
 * the full text in the DOM as one string for screen readers and search engines.
 */
export default function SplitText({ text, className = '', as = 'span', delay = 0, stagger = 0.045 }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.span;

  if (reduce) return <Tag className={className}>{text}</Tag>;

  const words = String(text).split(' ');

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0, rotate: 4 },
              show: { y: '0%', opacity: 1, rotate: 0, transition: { duration: 0.62, ease: EASE } },
            }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
