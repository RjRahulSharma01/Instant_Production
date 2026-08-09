import { lazy, Suspense } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { getIcon } from '../lib/icons';
import { useSeo, SITE_URL } from '../lib/seo';
import { cardIn, fadeUp, stagger, viewport } from '../lib/motion';
import { services } from '../data/services';
import { serviceDetail } from '../data/serviceDetail';

const Faq = lazy(() => import('../components/fx/Faq'));

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.id === slug);
  const detail = serviceDetail[slug];

  useSeo({
    title: detail?.metaTitle,
    description: detail?.metaDescription,
    path: `/services/${slug}`,
  });

  if (!service || !detail) return <Navigate to="/services" replace />;

  const Icon = getIcon(service.icon);
  const related = services.filter((s) => s.id !== slug && serviceDetail[s.id]).slice(0, 3);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: SITE_URL + '/services' },
      { '@type': 'ListItem', position: 3, name: service.title, item: `${SITE_URL}/services/${slug}` },
    ],
  };

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        intro={detail.lede}
        crumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}
      />

      <section className="px-4 pb-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.06)}
          className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <motion.div variants={fadeUp} className="overflow-hidden rounded-panel border border-white/10 bg-white/[0.04]">
            <div className="relative" style={{ aspectRatio: '16/9' }}>
              <img
                src={service.thumbnail}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover opacity-80"
                width="1000"
                height="563"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute bottom-4 left-5 flex h-12 w-12 items-center justify-center rounded-xl border border-brand/30 bg-ink/80 text-brand backdrop-blur">
                <Icon size={20} aria-hidden="true" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-eyebrow text-brand">What you get</h2>
            <ul className="mt-5 space-y-3">
              {detail.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-sm leading-6 text-zinc-300">
                  <FiCheck aria-hidden="true" className="mt-0.5 shrink-0 text-brand" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.06)}
          className="mx-auto max-w-7xl"
        >
          <motion.h2 variants={fadeUp} className="text-2xl font-semibold text-white sm:text-3xl">
            How it works
          </motion.h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {detail.process.map((p, i) => (
              <motion.div
                key={p.step}
                variants={cardIn}
                className="group relative rounded-card border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-brand/40"
              >
                <span className="text-4xl font-semibold text-brand/25 transition-colors duration-300 group-hover:text-brand/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-base font-semibold text-white">{p.step}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{p.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-10 rounded-panel border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-eyebrow text-brand">Deliverables</h2>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {detail.deliverables.map((d) => (
                <li key={d} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>

      <Suspense fallback={<div className="h-64" />}>
        <Faq items={detail.faqs} />
      </Suspense>

      {related.length > 0 && (
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={stagger(0.06)}
            className="mx-auto max-w-7xl"
          >
            <motion.h2 variants={fadeUp} className="text-2xl font-semibold text-white sm:text-3xl">
              Related services
            </motion.h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((r) => {
                const RIcon = getIcon(r.icon);
                return (
                  <motion.div key={r.id} variants={cardIn}>
                    <Link
                      to={`/services/${r.id}`}
                      className="group flex h-full flex-col rounded-card border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:border-brand/40 hover:bg-white/[0.07]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                        <RIcon size={17} aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 font-semibold text-white">{r.title}</h3>
                      <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm text-brand">
                        Read more
                        <FiArrowRight className="transition-transform duration-300 ease-expo group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>
      )}

      <CtaBand title={`Ready to talk about ${service.title.toLowerCase()}?`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
