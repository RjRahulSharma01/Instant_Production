import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FiInstagram, FiLinkedin, FiYoutube, FiArrowUpRight, FiArrowUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa6';
import { cardIn, stagger, viewport, EASE } from '../lib/motion';
import Magnetic from './fx/Magnetic';
import Marquee from './fx/Marquee';

/** Link that slides right and reveals an amber marker on hover. */
function FooterLink({ to, href, children }) {
  const inner = (
    <span className="group/link relative inline-flex items-center gap-2 py-0.5 text-zinc-400 transition-colors duration-200 hover:text-white">
      <span
        aria-hidden="true"
        className="h-px w-0 bg-brand transition-all duration-300 ease-expo group-hover/link:w-4"
      />
      <span className="transition-transform duration-300 ease-expo group-hover/link:translate-x-1">{children}</span>
    </span>
  );
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{inner}</a>
  ) : (
    <Link to={to}>{inner}</Link>
  );
}

function Social({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="group/soc relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 transition-all duration-300 ease-expo hover:-translate-y-1 hover:border-brand/50 hover:text-brand hover:shadow-glow"
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl bg-brand/10 opacity-0 transition-opacity duration-300 group-hover/soc:opacity-100"
      />
    </a>
  );
}

function Footer({ footerData, light = false }) {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative overflow-hidden border-t px-4 pb-10 pt-16 sm:px-6 lg:px-8 ${light ? "border-slate-200 bg-slate-50" : "border-white/10"}`}>
      {/* Ambient brand glow behind the whole footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(245,158,11,0.12),transparent_65%)] blur-2xl"
      />

      {/* Services ticker */}
      <div className="relative mx-auto mb-10 max-w-7xl">
        <Marquee
          items={footerData.services}
          speed={34}
          className="border-y border-white/10 py-3 text-sm uppercase tracking-[0.22em] text-zinc-500"
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger(0.08)}
        className={`relative mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 rounded-panel border p-6 sm:gap-10 sm:p-8 lg:grid-cols-[1.3fr_0.7fr_0.9fr_1fr] lg:p-10 ${light ? "border-slate-200 bg-white" : "border-white/10 bg-white/[0.04]"}`}
      >
        <motion.div variants={cardIn} className="col-span-2 lg:col-span-1">
          <img
            src={light ? "/brand/logo-full.svg" : "/brand/logo-light.svg"}
            alt="Instant Production"
            width="200"
            height="145"
            loading="lazy"
            className="h-20 w-auto"
          />
          <p className={`mt-5 max-w-sm text-sm leading-7 ${light ? "text-slate-600" : "text-zinc-400"}`}>{footerData.tagline}</p>

          <Magnetic strength={0.3}>
            <a
              href={`https://wa.me/${footerData.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="group mt-6 inline-flex items-center gap-3 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-3 text-sm font-semibold text-[#25D366] transition-all duration-300 ease-expo hover:bg-[#25D366] hover:text-black"
            >
              <FaWhatsapp size={18} />
              Chat on WhatsApp
              <FiArrowUpRight className="transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </motion.div>

        <motion.div variants={cardIn}>
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
            Explore
            <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-brand/50 to-transparent" />
          </h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {footerData.quickLinks.map((link) => (
              <li key={link.label}><FooterLink to={link.to}>{link.label}</FooterLink></li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={cardIn}>
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
            Services
            <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-brand/50 to-transparent" />
          </h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {footerData.services.map((service) => (
              <li key={service}><FooterLink to="/services">{service}</FooterLink></li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={cardIn} className="col-span-2 lg:col-span-1">
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
            Contact
            <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-brand/50 to-transparent" />
          </h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li><FooterLink href={`tel:+91${footerData.phone}`}>+91 {footerData.phone}</FooterLink></li>
            <li><FooterLink href={`mailto:${footerData.email}`}>{footerData.email}</FooterLink></li>
            <li className="pl-6 text-zinc-500">{footerData.address}</li>
          </ul>

          <div className="mt-6 flex gap-3">
            <Social href={footerData.social.instagram} label="Instagram"><FiInstagram size={19} /></Social>
            <Social href={footerData.social.youtube} label="YouTube"><FiYoutube size={19} /></Social>
            <Social href={footerData.social.linkedin} label="LinkedIn"><FiLinkedin size={19} /></Social>
          </div>
        </motion.div>
      </motion.div>

      <div className="relative mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-zinc-400 sm:flex-row">
        <p>© {year} Instant Production. All rights reserved.</p>
        <p className="order-3 sm:order-2">{footerData.signoff}</p>

        <button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          className="group order-2 flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-400 transition-all duration-300 ease-expo hover:border-brand/40 hover:text-brand sm:order-3"
        >
          Top
          <FiArrowUp className="transition-transform duration-300 ease-expo group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* Oversized wordmark bleeding off the bottom edge */}
      {!reduce && (
        <motion.p
          aria-hidden="true"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="pointer-events-none mt-6 hidden select-none text-center text-[11vw] font-semibold leading-[0.8] tracking-tight text-white/[0.035] sm:block"
        >
          INSTANT PRODUCTION
        </motion.p>
      )}
    </footer>
  );
}

export default Footer;
