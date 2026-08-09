import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SmoothScroll from './fx/SmoothScroll';
import ScrollProgress from './fx/ScrollProgress';
import Cursor from './fx/Cursor';
import PageTransition from './fx/PageTransition';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { footerData, navItems } from '../data/site';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Lenis takes over the scroll container, so window.scrollTo and
    // scrollIntoView become no-ops while it is active. Route it through
    // the Lenis instance when present, and fall back to the native calls
    // when smooth scrolling is disabled (reduced motion).
    const lenis = window.__lenis;

    if (!hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const id = hash.replace('#', '');
    let attempts = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: -80 });
        else el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      attempts += 1;
      if (attempts < 20) window.setTimeout(tryScroll, 50);
    };

    tryScroll();
  }, [pathname, hash]);

  return null;
}

function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-ink text-zinc-100">
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <ScrollToTop />
      <Navbar items={navItems} />
      <main>
        <AnimatePresence mode="wait">
          <PageTransition key={pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer footerData={footerData} />
    </div>
  );
}

export default Layout;
