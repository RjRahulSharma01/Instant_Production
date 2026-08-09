import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import TiltCard from './fx/TiltCard';
import SplitText from './fx/SplitText';
import { EASE, cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import { FiPlay, FiX } from 'react-icons/fi';

const categories = ['All', 'Beauty', 'Fintech', 'Healthcare', 'E-commerce', 'Education', 'Automotive', 'Corporate'];

function Portfolio({ projects }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeProject, setActiveProject] = useState(null);
  const [hasError, setHasError] = useState(false);

  const filteredProjects = projects.filter((project) => activeFilter === 'All' || project.category === activeFilter);

  const openProject = (project) => {
    setHasError(false);
    setActiveProject(project);
  };
  const closeProject = () => {
    setActiveProject(null);
    setHasError(false);
  };

  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current || !activeProject?.video) return;
    setHasError(false);
    videoRef.current.load();
    videoRef.current.play().catch(() => {});
  }, [activeProject]);

  return (
    <section id="portfolio" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div className="max-w-2xl" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
          <p className="text-sm font-semibold uppercase tracking-eyebrow text-brand">Portfolio</p>
          <SplitText
            as="h2"
            text="Work that feels polished, modern, and memorable."
            className="mt-4 block text-3xl font-semibold text-white sm:text-4xl"
          />
        </motion.div>

        <div role="tablist" aria-label="Filter projects by category" className="snap-x-scroll -mx-4 mt-8 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {categories.map((category) => {
            const selected = activeFilter === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={selected}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={`relative shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  selected
                    ? 'border-brand text-black'
                    : 'border-white/10 bg-white/5 text-zinc-300 hover:border-brand/40 hover:text-brand'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="portfolio-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-brand shadow-[0_0_22px_rgba(245,158,11,0.45)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <TiltCard
              key={project.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
              transition={{ duration: 0.45, ease: EASE }}
              max={8}
              className="group cursor-pointer overflow-hidden rounded-card border border-white/10 bg-white/5 shadow-card"
              onClick={() => openProject(project)}
            >
              <div className="relative">
                <div style={{ aspectRatio: '16/9' }} className="overflow-hidden bg-zinc-900">
                  <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-110" loading="lazy" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  <motion.span whileHover={{ scale: 1.12 }} className="flex h-16 w-16 scale-75 items-center justify-center rounded-full border border-white/40 bg-white/90 text-black shadow-lg transition-transform duration-400 ease-expo group-hover:scale-100">
                    <FiPlay size={24} />
                  </motion.span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">{project.category}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{project.description}</p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-brand/40 hover:text-brand">
                  Play Reel
                </div>
              </div>
            </TiltCard>
          ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4 py-8 backdrop-blur-md"
            onClick={closeProject}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="w-full max-w-5xl rounded-panel border border-white/10 bg-zinc-950 p-4 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between px-2 py-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">{activeProject.category}</p>
                  <h3 className="text-2xl font-semibold text-white">{activeProject.title}</h3>
                </div>
                <button onClick={closeProject} className="rounded-full border border-white/10 p-2 text-white">
                  <FiX size={20} />
                </button>
              </div>
              {hasError ? (
                <div className="mt-4 flex min-h-[40vh] items-center justify-center rounded-[1.5rem] bg-black px-6 text-center text-sm text-zinc-400">
                  This video could not be loaded. Check that the URL is a public Vercel Blob link.
                </div>
              ) : (
                <video
                  key={activeProject.id}
                  ref={videoRef}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="mt-4 max-h-[60vh] w-full rounded-[1.5rem] bg-black object-contain"
                  poster={activeProject.thumbnail}
                  src={activeProject.video}
                  onError={() => setHasError(true)}
                />
              )}
              <p className="mt-4 text-sm leading-7 text-zinc-400">{activeProject.description}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

export default Portfolio;
