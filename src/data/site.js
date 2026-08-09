// Header navigation. 'Contact' is deliberately absent: the header already
// ends with a Contact Us call-to-action button, and listing both produced two
// contact links side by side. The footer keeps a text Contact link.
export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
];

export const heroData = {
  eyebrow: 'AI-First Content & Growth Agency',
  title: 'AI-first content, from first idea to measured growth.',
  description:
    'Twelve years of production craft, now running on AI. We plan, produce and scale video, content and campaigns — one team from strategy to measured result.',
  services: [
    'AI Video Strategy',
    'Video Production',
    'Content Strategy',
    'Social Media Growth',
    'Performance Marketing',
    'Website Development',
    'Influencer Marketing',
  ],
  // Re-encoded from the 16 MB Blob original: same 14s clip, 90% smaller.
  // Served from the site's own CDN rather than Blob storage.
  backgroundVideo: '/videos/hero-1280.mp4',
  backgroundVideoMobile: '/videos/hero-720.mp4',
  backgroundPoster: '/videos/hero-poster.webp',
  primaryCta: 'See Our Work',
  secondaryCta: 'Book a Strategy Call',
  stats: [
    { value: '250+', label: 'Campaigns launched' },
    { value: '10K+', label: 'Creators in network' },
    { value: '98%', label: 'Client retention' },
  ],
  // Panels that auto-rotate in the hero card, one every few seconds.
  featured: [
    {
      eyebrow: 'AI video strategy',
      title: 'Strategy first, then the shoot',
      description:
        'Every campaign starts with audience, angle and hook. AI gets us there faster — and the work performs because of it.',
    },
    {
      eyebrow: 'AI cinematic experience',
      title: 'Impossible, made possible',
      description:
        'Bring your story to life with the latest AI advance skills and make all impossible, possible.',
    },
    {
      eyebrow: 'Influencer marketing',
      title: '10,000+ creators, one story',
      description:
        "Connect with our 10,000+ UGC, Nano, Micro and Macro creators to tell your brand's story and reach the desired audiences.",
    },
  ],
  highlights: [
    { title: 'Performance marketing', description: 'Campaigns measured on pipeline, not impressions.' },
    { title: 'Social media growth', description: 'Content built for reach, retention and conversion.' },
  ],
};

export const aboutData = {
  eyebrow: 'About Instant Production',
  title: 'We create memorable brand experiences backed by strategy, craft, and momentum.',
  description:
    'Instant Production is an AI-first content and growth partner — AI video, content strategy, social growth, performance marketing, web and influencer campaigns, handled by one team.',
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

export const footerData = {
  phone: '9821810933',
  email: 'instantproduction.in@gmail.com',
  whatsapp: '919821810933',
  quickLinks: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/#about' },
    { label: 'Services', to: '/services' },
    { label: 'Industries', to: '/industries' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/#contact' },
  ],
  services: ['AI Content Strategy', 'AI Videos', 'Performance Marketing', 'Influencer Marketing', 'Website Development'],
  industries: ['Beauty', 'Fintech', 'Healthcare', 'Real Estate', 'E-commerce', 'Education'],
  address: 'Sector-69, Noida',
  social: {
    instagram: 'https://www.instagram.com/instantproduction.in',
    youtube: 'https://www.youtube.com/@instantproduction_in',
    linkedin: 'https://www.linkedin.com/company/instant-production/',
  },
  tagline: 'An AI-first content and growth partner — strategy, production and performance under one roof.',
  signoff: 'Built for brands that measure what their content does.',
};

export const contactData = {
  phone: '9821810933',
  email: 'instantproduction.in@gmail.com',
  address: 'Sector-69, Noida',
  directorName: 'Rahul Sharma',
  title: 'Tell us what you are building',
  description:
    'Share the goal, the audience and the timeline. You will get a clear plan, a scope and a number back — not a brochure.',
  responsePromise: 'We reply within one working day.',
  privacyNote: 'Your details stay with us. No lists, no spam.',
};
