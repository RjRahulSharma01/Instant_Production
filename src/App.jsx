import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { services } from './data/services';
import { industries } from './data/industries';
import { portfolioItems } from './data/portfolio';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const ServicesSection = lazy(() => import('./components/Services'));
const IndustriesSection = lazy(() => import('./components/Industries'));
const PortfolioSection = lazy(() => import('./components/Portfolio'));
const VideoGallerySection = lazy(() => import('./components/VideoGallery'));
const ContactSection = lazy(() => import('./components/Contact'));

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const heroData = {
  eyebrow: 'Creative Production & Digital Marketing Agency',
  title: 'Premium production for brands that demand cinematic storytelling.',
  description: 'Photography • Videography • Website Development • Digital Marketing • Creative Branding',
  backgroundVideo: encodeURI('/video/Montage - Instant production.mp4'),
  backgroundPoster: encodeURI('/images/IMG_4246.jpeg'),
  primaryCta: 'View Portfolio',
  secondaryCta: 'Contact Us',
  stats: [
    { value: '250+', label: 'Campaigns launched' },
    { value: '12+', label: 'Years of expertise' },
    { value: '98%', label: 'Client retention' },
  ],
  highlights: [
    { title: 'Cinematic content', description: 'Story-led visuals designed for premium growth.' },
    { title: 'Campaign-ready media', description: 'Ads, films, reels and brand stories built to perform.' },
  ],
};

const aboutData = {
  eyebrow: 'About Instant Production',
  title: 'We create memorable brand experiences backed by strategy, craft, and momentum.',
  description:
    'Instant Production blends photography, videography, web development, and digital marketing into a premium creative partner for fast-moving brands.',
  points: [
    'Visionary creative direction tailored to your goals',
    'A full-service production and marketing experience',
    'Modern execution with polished visuals and measurable growth',
  ],
  numbers: [
    { value: '98%', label: 'Client retention' },
    { value: '40+', label: 'Brands elevated' },
    { value: '5x', label: 'Average growth in reach' },
  ],
};

const footerData = {
  phone: '9821810933',
  email: 'team@instantproduction.in',
  whatsapp: '919821810933',
  quickLinks: ['Home', 'About', 'Services', 'Industries', 'Portfolio', 'Blog', 'Contact'],
  services: ['Commercial Shoots', 'Corporate Films', 'AI Generated Ads', 'Social Media Content', 'AI Videos'],
  industries: ['Beauty', 'Fintech', 'Healthcare', 'Real Estate', 'E-commerce', 'Education'],
  address: 'Noida, India',
  social: {
    instagram: 'https://instagram.com/instantproduction',
    linkedin: 'https://linkedin.com/company/instantproduction',
    youtube: 'https://youtube.com/@instantproduction',
  },
};

const contactData = {
  phone: '9821810933',
  email: 'team@instantproduction.in',
  address: 'Noida, India',
  directorName: 'Rahul Sharma',
  title: 'Let’s build something remarkable together',
  description: 'Share your vision and we’ll shape a premium campaign that feels elevated, intentional, and ready to perform.',
};

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <Navbar items={navItems} />

      <main>
        <Suspense fallback={<div className="h-96" />}> <Hero heroData={heroData} /></Suspense>
        <Suspense fallback={<div className="h-96" />}> <About aboutData={aboutData} /></Suspense>
        <Suspense fallback={<div className="h-96" />}> <ServicesSection services={services} /></Suspense>
        <Suspense fallback={<div className="h-96" />}> <IndustriesSection industries={industries} /></Suspense>
        <Suspense fallback={<div className="h-96" />}> <PortfolioSection projects={portfolioItems} /></Suspense>
        <Suspense fallback={<div className="h-96" />}> <VideoGallerySection videos={portfolioItems} /></Suspense>
        <Suspense fallback={<div className="h-96" />}> <ContactSection contactData={contactData} /></Suspense>
      </main>

      <Footer footerData={footerData} />
    </div>
  );
}

export default App;
