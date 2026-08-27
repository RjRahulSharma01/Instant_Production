import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion';
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi';
import Magnetic from './fx/Magnetic';
import { EASE } from '../lib/motion';
import { useIsMobile } from '../lib/useMediaQuery';

function Navbar({ items, light = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const { pathname, hash } = useLocation();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  // Close the menu on navigation, and lock body scroll while it is open.
  useEffect(() => setOpen(false), [pathname, hash]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const current = `${pathname}${hash}`;
  const isActive = (to) => (to.includes('#') ? current === to : pathname === to);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: light
            ? (scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.70)')
            : (scrolled ? 'rgba(5,5,5,0.82)' : 'rgba(5,5,5,0.35)'),
          borderColor: light
            ? (scrolled ? 'rgba(15,23,42,0.10)' : 'rgba(15,23,42,0.04)')
            : (scrolled ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.04)'),
          paddingTop: scrolled ? 8 : 16,
          paddingBottom: scrolled ? 8 : 16,
        }}
        transition={{ duration: 0.35, ease: EASE }}
        className="sticky top-0 z-50 border-b backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Magnetic strength={0.25}>
            <Link to="/" className="group flex items-center gap-3" aria-label="Instant Production, home">
              <motion.span
                className="relative flex shrink-0 items-center"
                initial={reduce ? false : { opacity: 0, scale: 0.7, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                whileTap={reduce ? undefined : { scale: 0.88, rotate: -6 }}
              >
                {/* Slow amber breath behind the mark. Reads as a light on a
                    set. Mobile only; desktop already has plenty of motion. */}
                {isMobile && !reduce && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full bg-brand/30 blur-lg"
                    animate={{ opacity: [0.25, 0.6, 0.25], scale: [0.85, 1.15, 0.85] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <motion.img
                  src={light ? "/brand/logo-mark-full.svg" : "/brand/logo-mark-light.svg"}
                  alt=""
                  aria-hidden="true"
                  width="40"
                  height="37"
                  animate={
                    reduce
                      ? { height: scrolled ? 28 : 36 }
                      : isMobile
                        ? { height: scrolled ? 26 : 34, y: [0, -2, 0], rotate: [0, -3, 0] }
                        : { height: scrolled ? 28 : 36 }
                  }
                  transition={
                    isMobile && !reduce
                      ? {
                          height: { duration: 0.35, ease: EASE },
                          y: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
                          rotate: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
                        }
                      : { duration: 0.35, ease: EASE }
                  }
                  className="w-auto shrink-0"
                />
              </motion.span>
              <span className={`text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 xs:text-sm sm:tracking-[0.28em] sm:text-base ${light ? "text-slate-900 group-hover:text-sky-700" : "text-white group-hover:text-brand"}`}>
                Instant Production
              </span>
            </Link>
          </Magnetic>

          {/* Desktop nav. The indicator physically slides between items */}
          <nav
            className="hidden items-center gap-1 text-sm font-medium lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {items.map((item) => {
              const active = isActive(item.to);
              const Cmp = item.to.includes('#') ? Link : NavLink;
              return (
                <Cmp
                  key={item.label}
                  to={item.to}
                  onMouseEnter={() => setHovered(item.label)}
                  className={`relative rounded-full px-4 py-2 transition-colors duration-200 ${
                    active
                      ? (light ? 'text-sky-700' : 'text-brand')
                      : (light ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-300 hover:text-white')
                  }`}
                >
                  {hovered === item.label && !reduce && (
                    <motion.span
                      layoutId="nav-hover"
                      className={`absolute inset-0 -z-10 rounded-full ${light ? "bg-slate-900/[0.05]" : "bg-white/[0.07]"}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {active && !reduce && (
                    <motion.span
                      layoutId="nav-active"
                      className={`absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full ${light ? "bg-sky-600" : "bg-brand shadow-[0_0_12px_rgba(245,158,11,0.8)]"}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {active && reduce && (
                    <span className={`absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full ${light ? "bg-sky-600" : "bg-brand"}`} />
                  )}
                </Cmp>
              );
            })}
          </nav>

          <div className="hidden lg:flex">
            <Magnetic strength={0.4}>
              <Link
                to="/#contact"
                className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${light ? "border border-sky-600 bg-sky-600 text-white hover:bg-sky-700" : "border border-brand/40 bg-brand/10 text-brand hover:text-black"}`}
              >
                {!light && <span className="absolute inset-0 -z-10 translate-y-full bg-brand transition-transform duration-300 ease-expo group-hover:translate-y-0" />}
                Contact Us
                <FiArrowUpRight className="transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
          </div>

          <button
            className={`relative z-[60] rounded-full p-2 lg:hidden ${light ? "border border-slate-200 text-slate-900" : "border border-white/10 text-white"}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
          >
            <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.3, ease: EASE }} className="block">
              {open ? <FiX size={20} /> : <FiMenu size={20} />}
            </motion.span>
          </button>
        </div>
      </motion.header>

      {/* Full-screen mobile menu with staggered items */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className={`fixed inset-0 z-40 backdrop-blur-2xl lg:hidden ${light ? "bg-white/97" : "bg-ink/95"}`}
          >
            <motion.nav
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              className="flex h-full flex-col justify-center gap-2 px-8"
            >
              {items.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`block py-2 text-3xl font-semibold tracking-tight transition-colors ${
                      isActive(item.to)
                        ? (light ? 'text-sky-700' : 'text-brand')
                        : (light ? 'text-slate-700 hover:text-sky-700' : 'text-zinc-200 hover:text-brand')
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* The desktop "Contact Us" pill lives outside `items` (see the
                  comment in data/site.js) so it doesn't duplicate as a second
                  entry in the desktop nav list. That pill is `hidden lg:flex`
                  though, so on mobile it never renders at all and the menu
                  had no route to Contact except scrolling to the footer.
                  This is that same CTA, shown only inside the mobile menu. */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                }}
                className="mt-4"
              >
                <Link
                  to="/#contact"
                  onClick={() => setOpen(false)}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
                    light ? 'border border-sky-600 bg-sky-600 text-white hover:bg-sky-700' : 'border border-brand/40 bg-brand/10 text-brand hover:bg-brand hover:text-black'
                  }`}
                >
                  Contact Us
                  <FiArrowUpRight />
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
