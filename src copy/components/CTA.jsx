function CTA({ ctaData }) {
  return (
    <section id="contact" className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 rounded-[2rem] border border-[#f59e0b]/30 bg-gradient-to-r from-[#f59e0b]/15 via-transparent to-[#f59e0b]/10 px-8 py-16 text-center shadow-[0_30px_80px_rgba(0,0,0,0.24)] lg:flex-row lg:text-left">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#f59e0b]">Let’s build something remarkable</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{ctaData.title}</h2>
        </div>
        <a href="mailto:team@instantproduction.in" className="inline-flex rounded-full bg-[#f59e0b] px-8 py-3 font-semibold text-black transition hover:scale-[1.02]">
          {ctaData.button}
        </a>
      </div>
    </section>
  );
}

export default CTA;
