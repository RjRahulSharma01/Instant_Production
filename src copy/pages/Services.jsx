import { lazy, Suspense } from 'react';
import { services } from '../data/services';

const ServicesSection = lazy(() => import('../components/Services'));

function Services() {
  return (
    <Suspense fallback={<div className="h-96" />}>
      <ServicesSection services={services} />
    </Suspense>
  );
}

export default Services;
