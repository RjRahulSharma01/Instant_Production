import { motion } from 'framer-motion';
import { fadeUp, viewport } from '../lib/motion';
import SplitText from './fx/SplitText';
import StudioWave from './fx/StudioWave';
import { useState } from 'react';

// Web3Forms access key. Set VITE_WEB3FORMS_KEY in Vercel (and .env.local for dev).
// Get a free key at https://web3forms.com — it is a public key, safe in client code.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

function Contact({ contactData }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  // 'idle' | 'sending' | 'success' | 'error'
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const mailtoHref = () => {
    const subject = encodeURIComponent(`Website enquiry from ${form.name || 'Website'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\nMessage:\n${form.message}`
    );
    return `mailto:${contactData.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: bots fill hidden fields, humans do not.
    if (e.target.botcheck?.checked) return;

    if (!WEB3FORMS_KEY) {
      setStatus('error');
      setErrorMsg('Form is not configured yet.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const resp = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New enquiry from ${form.name || 'the website'}`,
          from_name: 'instantproduction.in',
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
        }),
      });

      const data = await resp.json().catch(() => ({}));

      // Only claim success when the API actually confirms it.
      if (resp.ok && data.success) {
        setStatus('success');
        setForm({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'The server rejected the message.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error.');
    }
  };

  return (
    <section id="contact" className="snap-point px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={fadeUp}
        className="mx-auto grid max-w-7xl gap-8 rounded-panel border border-white/10 bg-white/5 p-6 shadow-panel sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-12"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-eyebrow text-brand">Contact</p>
          <SplitText as="h2" text={contactData.title} className="mt-4 block text-3xl font-semibold text-white sm:text-4xl" />
          <p className="mt-5 text-lg leading-8 text-zinc-300">{contactData.description}</p>
          <dl className="mt-7 grid grid-cols-2 gap-x-4 gap-y-4 text-sm sm:mt-8">
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500">Email</dt>
              <dd className="mt-1 break-all">
                <a href={`mailto:${contactData.email}`} className="text-zinc-200 transition hover:text-brand">
                  {contactData.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500">Phone</dt>
              <dd className="mt-1">
                <a href={`tel:+91${contactData.phone}`} className="text-zinc-200 transition hover:text-brand">
                  +91 {contactData.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500">Studio</dt>
              <dd className="mt-1 text-zinc-200">{contactData.address}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500">Director</dt>
              <dd className="mt-1 text-zinc-200">{contactData.directorName}</dd>
            </div>
          </dl>
          <div className="mt-7 h-44 overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900 sm:mt-8 sm:h-64">
            <iframe
              title="Instant Production — Sector-69, Noida"
              src="https://maps.google.com/maps?q=Sector%2069%2C%20Noida&z=14&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit} noValidate={false} className="relative rounded-card border border-white/10 bg-black/30 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <input value={form.name} onChange={update('name')} required className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 ease-expo placeholder:text-zinc-500 focus:border-brand/60 focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.15)]" placeholder="Your Name" />
            <input value={form.email} onChange={update('email')} type="email" required className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 ease-expo placeholder:text-zinc-500 focus:border-brand/60 focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.15)]" placeholder="Email Address" />
          </div>
          <input value={form.company} onChange={update('company')} className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 ease-expo placeholder:text-zinc-500 focus:border-brand/60 focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.15)]" placeholder="Company" />
          <textarea value={form.message} onChange={update('message')} required className="mt-4 min-h-40 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 ease-expo placeholder:text-zinc-500 focus:border-brand/60 focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.15)]" placeholder="Tell us about your project" />

          {/* Honeypot — hidden from humans, catches bots. */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            aria-hidden="true"
          />

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {contactData.responsePromise}
            </span>
            <span className="text-zinc-500">{contactData.privacyNote}</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="rounded-full bg-brand px-6 py-3 font-semibold text-black transition duration-200 ease-expo hover:scale-[1.03] hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>

            {/* aria-live so screen readers announce the outcome. */}
            <p role="status" aria-live="polite" className="text-sm">
              {status === 'success' && (
                <span className="text-emerald-400">
                  Thanks — your message reached us. We usually reply within one working day.
                </span>
              )}
              {status === 'error' && (
                <span className="text-rose-400">
                  {errorMsg} Please{' '}
                  <a href={mailtoHref()} className="underline decoration-rose-400/50 underline-offset-2 hover:text-rose-300">
                    email us directly
                  </a>{' '}
                  or call {contactData.phone}.
                </span>
              )}
            </p>
          </div>
        </form>

        {/* Fills the dead space under the form: a live production timeline
            plus the two channels Indian B2B buyers actually use. */}
        <div className="flex flex-1 flex-col gap-4">
          <StudioWave className="w-full flex-1" />

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={`https://wa.me/91${contactData.phone}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-all duration-300 ease-expo hover:border-brand/40 hover:bg-white/[0.08]"
            >
              <span>
                <span className="block text-sm font-semibold text-white">WhatsApp</span>
                <span className="block text-xs text-zinc-400">Fastest reply</span>
              </span>
              <span className="text-brand transition-transform duration-300 ease-expo group-hover:translate-x-1">→</span>
            </a>

            <a
              href={`tel:+91${contactData.phone}`}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-all duration-300 ease-expo hover:border-brand/40 hover:bg-white/[0.08]"
            >
              <span>
                <span className="block text-sm font-semibold text-white">Call us</span>
                <span className="block text-xs text-zinc-400">+91 {contactData.phone}</span>
              </span>
              <span className="text-brand transition-transform duration-300 ease-expo group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;