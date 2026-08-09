import { lazy, Suspense } from 'react';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { useSeo } from '../lib/seo';
import { industries } from '../data/industries';

const IndustriesSection = lazy(() => import('../components/Industries'));

function Industries() {
  useSeo({
    title: 'Industries We Serve',
    description:
      'AI-first content and growth campaigns for healthcare, fintech, e-commerce, education, beauty and real estate brands.',
    path: '/industries',
  });

  return (
    <>
      <PageHero
        video={{ desktop: '/videos/pages/industries-1280.mp4', mobile: '/videos/pages/industries-640.mp4' }}
        poster="/videos/pages/industries.webp"
        eyebrow="Industries"
        title="Categories where we already know the terrain."
        intro="Every sector has its own rules about what can be claimed, what audiences trust and what content actually converts. These are the ones we have run enough campaigns in to skip the learning curve."
        crumbs={[{ label: 'Industries' }]}
      />
      <Suspense fallback={<div className="h-96" />}>
        <IndustriesSection industries={industries} />
      </Suspense>
      <CtaBand title="Not on the list?" copy="We have probably worked in something adjacent. Tell us the category and we will be straight about whether we are the right fit." />
    </>
  );
}

export default Industries;
