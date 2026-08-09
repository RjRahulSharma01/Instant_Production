import { motion } from 'framer-motion';
import * as Icons from 'react-icons/fa6';

function Services({ services }) {
  return (
    <section id="services" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#f59e0b]">Services</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Premium solutions for modern growth.</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {services.map((service, index) => {
            const Icon = Icons[service.icon] || Icons.FaCircle;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="rounded-[1.75rem] border border-white/10 bg-white p-0 text-left shadow-[0_20px_60px_rgba(0,0,0,0.22)] overflow-hidden"
              >
                {service.thumbnail ? (
                  <div style={{ aspectRatio: '16/9' }} className="w-full overflow-hidden bg-zinc-900">
                    <img src={service.thumbnail} alt={service.title} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f59e0b]/10 text-[#f59e0b]">
                      <Icon size={20} />
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="mt-1 text-xl font-semibold text-zinc-900">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{service.description}</p>
                  <ul className="mt-5 space-y-2 text-sm text-zinc-700">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
