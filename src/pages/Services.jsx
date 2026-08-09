import { lazy, Suspense } from 'react';
import { useSeo } from '../lib/seo';
import { services } from '../data/services';

const ServicesSection = lazy(() => import('../components/Services'));

function Services() {
  useSeo({
    title: 'Services',
    description:
      'Photography, videography, AI-generated video, social media content, corporate films, web development and performance marketing — delivered end to end.',
    path: '/services',
  });

  return (
    <Suspense fallback={<div className="h-96" />}>
      <ServicesSection services={services} />
    </Suspense>
  );
}

export default Services;
