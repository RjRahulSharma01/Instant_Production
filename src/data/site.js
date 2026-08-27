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
    'Twelve years of production craft, now running on AI. We plan, produce and scale video, content and campaigns. One team, from strategy to measured result.',
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
  // Hero panel content.
  //
  // Rewritten from service names to the sentences prospects actually say.
  // B2B buyers in 2026 evaluate agencies on revenue accountability rather
  // than activity, and research the decision themselves before making
  // contact, so the panel has to be recognisable and specific, not
  // aspirational. Each panel names a problem in the client's own words,
  // then answers it with what we do and how it is measured.
  featured: [
    {
      eyebrow: 'What clients arrive with',
      title: 'We cannot produce content fast enough',
      description:
        'AI production plus a 10,000+ creator network means campaign-ready video in days, and ten variants for roughly the cost of one. The bottleneck stops being the shoot.',
    },
    {
      eyebrow: 'What clients arrive with',
      title: 'Our ads worked, then they stopped',
      description:
        'Almost always creative fatigue rather than targeting. We run a continuous testing loop so performance does not decay in the gap between campaigns.',
    },
    {
      eyebrow: 'What clients arrive with',
      title: 'We cannot tell what is actually working',
      description:
        'Reporting tied to enquiries, pipeline and revenue instead of impressions. You get a clear view of what to fund and what to cut, every month.',
    },
  ],
  // Trust signals. Research is consistent that what converts an agency
  // shortlist is plain-language proof of how you work and what you report.
  // not adjectives.
  highlights: [
    { title: 'Measured on revenue', description: 'ROAS, CAC and pipeline. Impressions are context, not the result.' },
    { title: 'One team, whole funnel', description: 'Strategy, production and media spend under one roof, pointing the same way.' },
  ],
};

export const aboutData = {
  eyebrow: 'About Instant Production',
  title: 'We create memorable brand experiences backed by strategy, craft, and momentum.',
  description:
    'Instant Production is an AI-first content and growth partner. AI video, content strategy, social growth, performance marketing, web and influencer campaigns, handled by one team.',
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
  email: 'instantproduction.in@gmail.com',
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
  tagline: 'An AI-first content and growth partner. Strategy, production and performance under one roof.',
  signoff: 'Built for brands that measure what their content does.',
};

export const contactData = {
  email: 'instantproduction.in@gmail.com',
  address: 'Sector-69, Noida',
  directorName: 'Rahul Sharma',
  title: 'Tell us what you are building',
  description:
    'Share the goal, the audience and the timeline. You will get a clear plan, a scope and a number back. Not a brochure.',
  responsePromise: 'We reply within one working day.',
  privacyNote: 'Your details stay with us. No lists, no spam.',
};
