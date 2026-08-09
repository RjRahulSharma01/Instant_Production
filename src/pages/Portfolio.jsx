import { lazy, Suspense } from 'react';
import { useSeo } from '../lib/seo';
import { portfolioItems } from '../data/portfolio';

const PortfolioSection = lazy(() => import('../components/Portfolio'));

function Portfolio() {
  useSeo({
    title: 'Portfolio',
    description:
      'Selected campaigns, brand films, product shoots and digital work by Instant Production.',
    path: '/portfolio',
  });

  return (
    <Suspense fallback={<div className="h-96" />}>
      <PortfolioSection projects={portfolioItems} />
    </Suspense>
  );
}

export default Portfolio;
