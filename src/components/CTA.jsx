import { motion } from 'framer-motion';
import { fadeUp, viewport } from '../lib/motion';
import SplitText from './fx/SplitText';
import Magnetic from './fx/Magnetic';

function CTA({ ctaData }) {
  return (
    <section id="contact" className="px-4 pb-24 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={fadeUp}
        className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 rounded-panel border border-brand/30 bg-gradient-to-r from-brand/15 via-transparent to-brand/10 px-8 py-16 text-center shadow-panel lg:flex-row lg:text-left">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-eyebrow text-brand">Let’s build something remarkable</p>
          <SplitText as="h2" text={ctaData.title} className="mt-4 block text-3xl font-semibold text-white sm:text-4xl" />
        </div>
        <Magnetic strength={0.45}>
          <a
            href="mailto:instantproduction.in@gmail.com"
            className="group relative inline-flex overflow-hidden rounded-full bg-brand px-8 py-3 font-semibold text-black transition-shadow duration-200 hover:shadow-glow"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-expo group-hover:translate-x-full" />
            <span className="relative z-10">{ctaData.button}</span>
          </a>
        </Magnetic>
      </motion.div>
    </section>
  );
}

export default CTA;
