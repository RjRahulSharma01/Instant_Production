import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

function Navbar({ items }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="text-lg font-semibold tracking-[0.3em] text-white uppercase">
          Instant Production
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-300 lg:flex">
          {items.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-[#f59e0b]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href="#contact" className="rounded-full border border-[#f59e0b]/40 bg-[#f59e0b]/10 px-5 py-2.5 text-sm font-semibold text-[#f59e0b] transition hover:bg-[#f59e0b] hover:text-black">
            Contact Us
          </a>
        </div>

        <button
          className="rounded-full border border-white/10 p-2 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden border-t border-white/10 bg-black/90 lg:hidden"
      >
        <div className="mx-auto flex flex-col gap-4 px-4 py-5 sm:px-6">
          {items.map((item) => (
            <a key={item.label} href={item.href} className="text-sm font-medium text-zinc-300" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </header>
  );
}

export default Navbar;
