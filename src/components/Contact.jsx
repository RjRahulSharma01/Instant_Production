import { useState } from 'react';

function Contact({ contactData }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Primary: open user's email client via mailto
    try {
      const subject = encodeURIComponent(`Website enquiry from ${form.name || 'Website'}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\nMessage:\n${form.message}`);
      const mailto = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
      window.location.href = mailto;
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }

    // Optional: send to Formspree endpoint (uncomment and set endpoint in env)
    /*
    try {
      const resp = await fetch('https://formspree.io/f/yourFormId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, company: form.company, message: form.message }),
      });
      if (resp.ok) setStatus('success'); else setStatus('error');
    } catch (err) {
      setStatus('error');
    }
    */
  };

  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_25px_70px_rgba(0,0,0,0.25)] lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#f59e0b]">Contact</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{contactData.title}</h2>
          <p className="mt-5 text-lg leading-8 text-zinc-300">{contactData.description}</p>
          <div className="mt-8 space-y-3 text-sm text-zinc-300">
            <p><span className="font-semibold text-white">Phone:</span> {contactData.phone}</p>
            <p><span className="font-semibold text-white">Email:</span> {contactData.email}</p>
            <p><span className="font-semibold text-white">Director:</span> {contactData.directorName}</p>
            <p><span className="font-semibold text-white">Location:</span> {contactData.address}</p>
          </div>
          <div className="mt-8 h-64 overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900">
            <div className="flex h-full items-center justify-center text-zinc-500">Google Map Placeholder</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[1.75rem] border border-white/10 bg-black/30 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <input value={form.name} onChange={update('name')} required className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500" placeholder="Your Name" />
            <input value={form.email} onChange={update('email')} type="email" required className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500" placeholder="Email Address" />
          </div>
          <input value={form.company} onChange={update('company')} className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500" placeholder="Company" />
          <textarea value={form.message} onChange={update('message')} required className="mt-4 min-h-40 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500" placeholder="Tell us about your project" />

          <div className="mt-4 flex items-center gap-4">
            <button type="submit" disabled={status === 'sending'} className="rounded-full bg-[#f59e0b] px-6 py-3 font-semibold text-black transition hover:scale-[1.02] disabled:opacity-60">
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <span className="text-sm text-emerald-400">Message action triggered — check your email client.</span>}
            {status === 'error' && <span className="text-sm text-rose-400">Could not send message. Try again or email {contactData.email} directly.</span>}
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;