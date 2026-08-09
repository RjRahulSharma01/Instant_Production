import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { footerData, navItems } from '../data/site';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const id = hash.replace('#', '');
    let attempts = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      attempts += 1;
      if (attempts < 20) {
        window.setTimeout(tryScroll, 50);
      }
    };

    tryScroll();
  }, [pathname, hash]);

  return null;
}

function Layout() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <ScrollToTop />
      <Navbar items={navItems} />
      <main>
        <Outlet />
      </main>
      <Footer footerData={footerData} />
    </div>
  );
}

export default Layout;
