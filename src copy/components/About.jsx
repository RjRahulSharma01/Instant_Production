import { motion } from 'framer-motion';

function About({ aboutData }) {
  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.24)] lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#f59e0b]">{aboutData.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{aboutData.title}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">{aboutData.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {aboutData.numbers.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-2xl font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-sm text-zinc-400">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#f59e0b]/10 via-black to-[#f59e0b]/5 p-8"
        >
          <h3 className="text-2xl font-semibold text-white">Why brands choose us</h3>
          <ul className="mt-6 space-y-4">
            {aboutData.points.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-zinc-300">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
