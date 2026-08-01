import { motion } from 'framer-motion';
import * as Icons from 'react-icons/fa6';

function Industries({ industries }) {
  return (
    <section id="industries" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#f59e0b]">Industries</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Trusted by brands across sectors that value precision.</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry, index) => {
            const Icon = Icons[industry.icon] || Icons.FaBuilding;
            return (
              <motion.article
                key={industry.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 overflow-hidden"
              >
                {industry.thumbnail ? (
                  <div style={{ aspectRatio: '3/2' }} className="w-full overflow-hidden bg-zinc-900">
                    <img src={industry.thumbnail} alt={industry.title} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f59e0b]/10 text-[#f59e0b]">
                      <Icon size={20} />
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="mt-1 text-xl font-semibold text-white">{industry.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{industry.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Industries;
