import { lazy, Suspense } from 'react';
import { aboutData, contactData, heroData } from '../data/site';

const Hero = lazy(() => import('../components/Hero'));
const About = lazy(() => import('../components/About'));
const ContactSection = lazy(() => import('../components/Contact'));

function PageFallback() {
  return <div className="h-96" />;
}

function Home() {
  return (
    <>
      <Suspense fallback={<PageFallback />}>
        <Hero heroData={heroData} />
      </Suspense>
      <Suspense fallback={<PageFallback />}>
        <About aboutData={aboutData} />
      </Suspense>
      <Suspense fallback={<PageFallback />}>
        <ContactSection contactData={contactData} />
      </Suspense>
    </>
  );
}

export default Home;
