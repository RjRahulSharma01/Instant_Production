import { lazy, Suspense } from 'react';
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
    <Suspense fallback={<div className="h-96" />}>
      <ServicesSection services={services} />
    </Suspense>
  );
}

export default Services;
