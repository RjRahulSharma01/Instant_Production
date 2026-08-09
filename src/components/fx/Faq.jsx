import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { EASE, fadeUp, stagger, viewport } from '../../lib/motion';

/**
 * Accordion FAQ. Also emits FAQPage structured data, which is what earns the
 * expandable answers in Google results.
 */
export default function Faq({ items, title = 'Common questions' }) {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger(0.05)}
        className="mx-auto max-w-3xl"
      >
        <motion.h2 variants={fadeUp} className="text-2xl font-semibold text-white sm:text-3xl">
          {title}
        </motion.h2>

        <motion.div variants={fadeUp} className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-brand"
                  >
                    <span className="text-base font-medium text-white">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="shrink-0 text-brand"
                    >
                      <FiPlus size={20} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.34, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-10 text-sm leading-7 text-zinc-400">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
