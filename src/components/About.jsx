import { motion } from 'framer-motion';
import { cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import SplitText from './fx/SplitText';
import CountUp from './fx/CountUp';

function About({ aboutData }) {
  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 rounded-panel border border-white/10 bg-white/5 p-8 shadow-panel lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
          <p className="text-sm font-semibold uppercase tracking-eyebrow text-brand">{aboutData.eyebrow}</p>
          <SplitText as="h2" text={aboutData.title} className="mt-4 block text-3xl font-semibold text-white sm:text-4xl" />
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">{aboutData.description}</p>

          <motion.div className="mt-8 grid gap-4 sm:grid-cols-3" variants={stagger(0.08)}>
            {aboutData.numbers.map((item) => (
              <motion.div key={item.label} variants={cardIn} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <CountUp value={item.value} className="block text-2xl font-semibold text-white" />
                <p className="mt-1 text-sm text-zinc-400">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          className="rounded-panel border border-white/10 bg-gradient-to-br from-brand/10 via-black to-brand/5 p-8"
        >
          <h3 className="text-2xl font-semibold text-white">Why brands choose us</h3>
          <motion.ul className="mt-6 space-y-4" variants={stagger(0.07)}>
            {aboutData.points.map((point) => (
              <motion.li key={point} variants={cardIn} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-zinc-300">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand" />
                <span>{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
