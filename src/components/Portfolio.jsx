import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiX } from 'react-icons/fi';

const categories = ['All', 'Beauty', 'Fintech', 'Healthcare', 'Real Estate', 'E-commerce', 'Education', 'Automotive', 'Corporate'];

function Portfolio({ projects }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects = projects.filter((project) => activeFilter === 'All' || project.category === activeFilter);

  const openProject = (project) => setActiveProject(project);
  const closeProject = () => setActiveProject(null);

  return (
    <section id="portfolio" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#f59e0b]">Portfolio</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Work that feels polished, modern, and memorable.</h2>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${activeFilter === category ? 'border-[#f59e0b] bg-[#f59e0b] text-black' : 'border-white/10 bg-white/5 text-zinc-300 hover:border-[#f59e0b]/40 hover:text-[#f59e0b]'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
              onClick={() => openProject(project)}
            >
              <div className="relative">
                <div style={{ aspectRatio: '16/9' }} className="overflow-hidden bg-zinc-900">
                  <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/90 text-black shadow-lg">
                    <FiPlay size={24} />
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f59e0b]">{project.category}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{project.description}</p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#f59e0b]/40 hover:text-[#f59e0b]">
                  Play Reel
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 py-8"
            onClick={closeProject}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-5xl rounded-[2rem] border border-white/10 bg-zinc-950 p-4 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between px-2 py-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f59e0b]">{activeProject.category}</p>
                  <h3 className="text-2xl font-semibold text-white">{activeProject.title}</h3>
                </div>
                <button onClick={closeProject} className="rounded-full border border-white/10 p-2 text-white">
                  <FiX size={20} />
                </button>
              </div>
              <video
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="mt-4 max-h-[60vh] w-full rounded-[1.5rem] bg-black object-contain"
                poster={activeProject.thumbnail}
              >
                <source src={activeProject.video} type="video/mp4" />
              </video>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{activeProject.description}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

export default Portfolio;
