import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
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
      return undefined;
    }

    const id = hash.replace('#', '');

    // The target section is lazy-loaded, so it may not be in the DOM yet when
    // the route changes. A fixed 20x50ms retry budget gave up after one second
    // and dumped the visitor at the top of the homepage. Watch for the node
    // instead, with a generous ceiling.
    const scrollToEl = (el) => {
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
      else el.scrollIntoView({ behavior: 'smooth' });
    };

    const existing = document.getElementById(id);
    if (existing) {
      // Give the layout a frame to settle before measuring.
      requestAnimationFrame(() => scrollToEl(existing));
      return undefined;
    }

    const observer = new MutationObserver(() => {
      const el = document.getElementById(id);
      if (el) {
        observer.disconnect();
        requestAnimationFrame(() => scrollToEl(el));
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const giveUp = window.setTimeout(() => observer.disconnect(), 8000);
    return () => {
      observer.disconnect();
      window.clearTimeout(giveUp);
    };
  }, [pathname, hash]);

  return null;
}

function Layout() {
  const { pathname } = useLocation();
  // The healthcare landing page is a light-theme microsite, so the shared
  // header and footer have to invert with it.
  const light = pathname.startsWith('/industries/healthcare');

  return (
    <div className={`min-h-screen ${light ? 'bg-white text-slate-900' : 'bg-ink text-zinc-100'}`}>
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <ScrollToTop />
      <Navbar items={navItems} light={light} />
      <main>
        <AnimatePresence mode="wait">
          <PageTransition key={pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer footerData={footerData} light={light} />

      {/* Traffic and Core Web Vitals.
          Both are cookieless and store no personal data, which keeps the
          contact form the only place on the site that touches anything covered
          by the DPDP Act — no consent banner needed.
          The React builds hook into the router, so client-side route changes
          register as pageviews. Without them only the first load would count,
          which on a single-page app is almost nothing.
          Neither runs in development, and together they add roughly 2 kB
          gzipped to first load. */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default Layout;
