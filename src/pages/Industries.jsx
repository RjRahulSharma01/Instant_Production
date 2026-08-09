import { lazy, Suspense } from 'react';
import { useSeo } from '../lib/seo';
import { industries } from '../data/industries';

const IndustriesSection = lazy(() => import('../components/Industries'));

function Industries() {
  useSeo({
    title: 'Industries We Serve',
    description:
      'Creative production for healthcare, fintech, education, e-commerce, real estate, beauty, hospitality and automotive brands across India.',
    path: '/industries',
  });

  return (
    <Suspense fallback={<div className="h-96" />}>
      <IndustriesSection industries={industries} />
    </Suspense>
  );
}

export default Industries;
