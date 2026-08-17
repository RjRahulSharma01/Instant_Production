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
        /* The mask is what makes each word rise out of nothing, and it is also
           what was cutting the tail off every g, j, p, q and y on the site.
           An inline-block's box is only as tall as the line, and at large sizes
           Tailwind sets line-height to exactly 1 — so the descender fell
           outside the box and overflow:hidden removed it.

           The padding extends the clipping box below the baseline; the equal
           negative margin takes that space back out of the layout, so nothing
           moves. Measured at 60px, 48px and 32px: clipping goes from 6px, 2px
           and 1px to zero, and the heading's height is unchanged in all three. */
        <span
          key={`${w}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.22em] -mb-[0.22em]"
        >
          <motion.span
            className="inline-block"
            variants={{
              /* 140%, not 110%. The mask is now 0.22em taller, so a word
                 waiting at 110% would show a sliver of itself along the bottom
                 edge before it started moving. */
              hidden: { y: '140%', opacity: 0, rotate: 4 },
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
