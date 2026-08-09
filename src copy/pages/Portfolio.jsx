import { lazy, Suspense } from 'react';
import { portfolioItems } from '../data/portfolio';

const PortfolioSection = lazy(() => import('../components/Portfolio'));

function Portfolio() {
  return (
    <Suspense fallback={<div className="h-96" />}>
      <PortfolioSection projects={portfolioItems} />
    </Suspense>
  );
}

export default Portfolio;
