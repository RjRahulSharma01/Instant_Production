import { lazy, Suspense } from 'react';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { useSeo } from '../lib/seo';
import { portfolioItems } from '../data/portfolio';

const PortfolioSection = lazy(() => import('../components/Portfolio'));

function Portfolio() {
  useSeo({
    title: 'Portfolio',
    description:
      'Selected campaigns, brand films, AI video and product work produced by Instant Production.',
    path: '/portfolio',
  });

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work, and what it was for."
        intro="A selection of campaigns across the categories we work in. Filter by industry to see the closest thing to your own brief."
        crumbs={[{ label: 'Portfolio' }]}
        stats={[
          { value: '250+', label: 'Campaigns launched' },
          { value: '7', label: 'Industries' },
          { value: '98%', label: 'Client retention' },
        ]}
      />
      <Suspense fallback={<div className="h-96" />}>
        <PortfolioSection projects={portfolioItems} />
      </Suspense>
      <CtaBand />
    </>
  );
}

export default Portfolio;
