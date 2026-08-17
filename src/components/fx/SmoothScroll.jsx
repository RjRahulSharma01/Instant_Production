import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { useIsTouch } from '../../lib/useMediaQuery';

/**
 * Inertial smooth scrolling. Mounted once in Layout.
 * Completely skipped when the OS asks for reduced motion. Hijacking scroll
 * is exactly the kind of thing that triggers motion sickness.
 */
export default function SmoothScroll() {
  const reduce = useReducedMotion();
  const touch = useIsTouch();

  useEffect(() => {
    // Native momentum scrolling on phones is already excellent, and hijacking
    // it breaks CSS scroll-snap. Desktop keeps the weighted Lenis feel.
    if (reduce || touch) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Let anchor links keep working
    // Covers both "#about" and router-style "/#about" on the current page.
    const onAnchor = (e) => {
      const a = e.target.closest('a[href*="#"]');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const [path, id] = href.split('#');
      if (!id) return;
      const samePage = path === '' || path === '/' ? window.location.pathname === '/' : false;
      if (!samePage) return;
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80 });
      }
    };
    document.addEventListener('click', onAnchor);

    window.__lenis = lenis;
    return () => {
      document.removeEventListener('click', onAnchor);
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [reduce, touch]);

  return null;
}
