import { lazy, Suspense } from 'react';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { useSeo } from '../lib/seo';
import { services } from '../data/services';

const ServicesSection = lazy(() => import('../components/Services'));

function Services() {
  useSeo({
    title: 'Services',
    description:
      'AI content strategy, AI video, performance marketing, influencer marketing, website development, blog writing and graphic design — one team across the full funnel.',
    path: '/services',
  });

  return (
    <>
      <PageHero
        video={{ desktop: '/videos/pages/services-1280.mp4', mobile: '/videos/pages/services-640.mp4' }}
        poster="/videos/pages/services.webp"
        eyebrow="Services"
        title="Strategy, content and campaigns — handled end to end."
        intro="Ten capabilities run by one team, so the plan, the creative and the media spend point the same way instead of being argued between three agencies."
        crumbs={[{ label: 'Services' }]}
        stats={[
          { value: '10', label: 'Capabilities' },
          { value: '250+', label: 'Campaigns launched' },
          { value: '10K+', label: 'Creator network' },
        ]}
      />
      <Suspense fallback={<div className="h-96" />}>
        <ServicesSection services={services} />
      </Suspense>
      <CtaBand />
    </>
  );
}

export default Services;
