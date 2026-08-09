import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Magnetic from './fx/Magnetic';
import { fadeUp, viewport } from '../lib/motion';

export default function CtaBand({
  title = 'Tell us what you are building',
  copy = 'Share the goal, the audience and the timeline. You will get a plan, a scope and a number back — usually within one working day.',
  cta = 'Start a project',
}) {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={fadeUp}
        className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 overflow-hidden rounded-panel border border-brand/25 bg-gradient-to-br from-brand/15 via-transparent to-brand/5 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-300 sm:text-base">{copy}</p>
        </div>
        <Magnetic strength={0.4}>
          <Link
            to="/#contact"
            className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-brand px-7 py-3.5 font-semibold text-black transition-shadow duration-200 hover:shadow-glow"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-expo group-hover:translate-x-full" />
            <span className="relative z-10 flex items-center gap-2">
              {cta}
              <FiArrowRight className="transition-transform duration-300 ease-expo group-hover:translate-x-1" />
            </span>
          </Link>
        </Magnetic>
      </motion.div>
    </section>
  );
}
