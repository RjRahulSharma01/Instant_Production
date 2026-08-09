import { Link } from 'react-router-dom';
import { FiInstagram, FiLinkedin, FiYoutube, FiMessageSquare } from 'react-icons/fi';

function Footer({ footerData }) {
  return (
    <footer className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-white/10 bg-white/5 p-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
        <div>
          <p className="text-lg font-semibold tracking-[0.3em] text-white uppercase">Instant Production</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-zinc-400">
            Premium creative production and digital marketing services built for ambitious brands.
          </p>
          <a
            href={`https://wa.me/${footerData.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-110"
          >
            <FiMessageSquare size={18} /> Chat on WhatsApp
          </a>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f59e0b]">Quick Links</h3>
          <ul className="mt-4 space-y-3 text-sm text-zinc-300">
            {footerData.quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="transition hover:text-[#f59e0b]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f59e0b]">Services</h3>
          <ul className="mt-4 space-y-3 text-sm text-zinc-300">
            {footerData.services.map((service) => (
              <li key={service}>
                <Link to="/services" className="transition hover:text-[#f59e0b]">
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f59e0b]">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-zinc-300">
            <li><a href={`tel:+91${footerData.phone}`} className="transition hover:text-[#f59e0b]">+91 {footerData.phone}</a></li>
            <li><a href={`mailto:${footerData.email}`} className="transition hover:text-[#f59e0b]">{footerData.email}</a></li>
            <li>{footerData.address}</li>
          </ul>
          <div className="mt-6 flex gap-4 text-white">
            <a href={footerData.social.instagram} target="_blank" rel="noreferrer" className="transition hover:text-[#f59e0b]"><FiInstagram size={20} /></a>
            <a href={footerData.social.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-[#f59e0b]"><FiLinkedin size={20} /></a>
            <a href={footerData.social.youtube} target="_blank" rel="noreferrer" className="transition hover:text-[#f59e0b]"><FiYoutube size={20} /></a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-zinc-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Instant Production. All rights reserved.</p>
        <p>Designed for premium brands and cinematic storytelling.</p>
      </div>
    </footer>
  );
}

export default Footer;
