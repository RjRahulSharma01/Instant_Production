import { lazy, Suspense } from 'react';
import { useSeo } from '../lib/seo';
import { services } from '../data/services';
import { aboutData, contactData, heroData } from '../data/site';

const Hero = lazy(() => import('../components/Hero'));
const About = lazy(() => import('../components/About'));
const ServicesSection = lazy(() => import('../components/Services'));
const ContactSection = lazy(() => import('../components/Contact'));

function PageFallback() {
  return <div className="h-96" />;
}

function Home() {
  useSeo({
    description:
      'AI-first content and growth agency. AI video strategy, video production, content strategy, social media growth, performance marketing, website development and influencer marketing.',
    path: '/',
  });

  return (
    <>
      <Suspense fallback={<PageFallback />}>
        <Hero heroData={heroData} />
      </Suspense>
      <Suspense fallback={<PageFallback />}>
        <About aboutData={aboutData} />
      </Suspense>
      <Suspense fallback={<PageFallback />}>
        <ServicesSection services={services} />
      </Suspense>
      <Suspense fallback={<PageFallback />}>
        <ContactSection contactData={contactData} />
      </Suspense>
    </>
  );
}

export default Home;
