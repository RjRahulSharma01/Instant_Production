import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menuOpen: false,
  content: {
    nav: ['About', 'Services', 'Work', 'Model Shoots', 'Contact'],
    hero: {
      eyebrow: 'PRE-PRODUCTION • PRODUCTION • POST-PRODUCTION',
      title: 'We build cinematic stories that make brands unforgettable.',
      description:
        'From corporate films and event coverage to photography and brand storytelling, we bring a sharp eye, professional execution, and creative energy to every frame.',
      primaryCta: 'Book a Free Consultation',
      secondaryCta: 'View Our Work',
      stats: [
        { value: '300+', label: 'Projects delivered' },
        { value: '15+', label: 'Years of experience' },
        { value: '24/7', label: 'Creative support' },
      ],
      cardBadge: 'Featured Production',
      featuredTitle: 'Corporate Films & Brand Stories',
      featuredText: 'High-impact visuals tailored for launch campaigns, reels, and social platforms.',
      secondaryTitle: 'Behind every frame',
      secondaryText: 'Creative direction, planning, shooting, and editing under one roof.',
    },
    about: {
      eyebrow: 'About us',
      title: 'We are a professional studio that turns ideas into striking visual experiences.',
      paragraphs: [
        'Instant Production is the brainchild of media professionals who combine artistry with execution. We are passionate about creating polished work that helps brands speak clearly, confidently, and creatively in a crowded market.',
        'Whether you need a powerful commercial, an event recap, a documentary, or promotional photography, we collaborate closely with you from planning to final delivery.',
      ],
      panelTitle: 'Why clients choose us',
      bullets: [
        'Creative strategy tailored to your brief',
        'Fast turnaround without compromising quality',
        'Seamless coordination across all production stages',
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'Everything you need for a polished and memorable production.',
      items: [
        { title: '📸 Photography', description: 'Editorial, commercial, lifestyle, and product photography with a refined visual style.' },
        { title: '🎬 Corporate Films', description: 'Launch films, internal communications, testimonials, and promotional videos.' },
        { title: '🎤 Event Coverage', description: 'Capture every keynote, highlight, and crowd moment with reliability and energy.' },
        { title: '✍️ Script Writing', description: 'Clear narrative structure and messaging designed to connect with your audience.' },
        { title: '📢 Branding & Promotion', description: 'Visual identity support, campaign material, and rollout content for your brand.' },
        { title: '🧠 Media Planning', description: 'Strategic planning that aligns content, platforms, and distribution goals.' },
      ],
    },
    work: {
      eyebrow: 'Featured work',
      title: 'From concept to delivery, we shape stories that stand out.',
      items: [
        { title: 'Brand Launch Film', description: 'Clean storytelling with cinematic motion and polished motion graphics.' },
        { title: 'Event Highlights', description: 'Dynamic edits that preserve the emotion, energy, and key moments of your event.' },
        { title: 'Product Photography', description: 'Elevated visual assets designed for web, social media, and campaigns.' },
      ],
    },
    modelShoots: {
      eyebrow: 'Model Shoots',
      title: 'Images and videos from the model shoot collections are now showcased here.',
      description: 'Each folder below opens the full Drive collection so clients can browse the media directly.',
      folders: [
        {
          title: 'Model Shoots Collection 1',
          description: 'A curated set of cinematic model shoot videos and promotional clips.',
          embedUrl: 'https://drive.google.com/embeddedfolderview?id=1oPCFIFaTBBXynfJ6IiqEXCdrzhGEolEH#grid',
          folderUrl: 'https://drive.google.com/drive/folders/1oPCFIFaTBBXynfJ6IiqEXCdrzhGEolEH?usp=sharing',
          mediaItems: ['Beauty', 'Cinematic Ai', 'Fintech', '4;5 ratio brief.mp4', 'hero bike.mp4', 'Hero sample.mp4', 'IMG_3253.MP4'],
        },
        {
          title: 'Model Shoots Collection 2',
          description: 'A gallery of fashion and catalogue-style images with additional model shoot visuals.',
          embedUrl: 'https://drive.google.com/embeddedfolderview?id=1cFKdVsVVBGinDU1PVS2W5_jgj9eEFV3C#grid',
          folderUrl: 'https://drive.google.com/drive/folders/1cFKdVsVVBGinDU1PVS2W5_jgj9eEFV3C?usp=sharing',
          mediaItems: ['IMG_1759.PNG', 'IMG_1977.JPG', 'IMG_3737.JPG', 'IMG_4246.jpeg', 'IMG_5000.jpeg', 'Kaveri_Seth_1.jpg', 'Kaveri_Seth_2.jpg'],
        },
      ],
    },
    testimonials: {
      eyebrow: 'Why choose us',
      title: 'We believe great work comes from creativity, punctuality, and responsibility.',
      items: [
        { title: 'Creative Execution', quote: 'We are passionate about the work we produce and strive to make every output engaging.' },
        { title: 'Punctual Delivery', quote: 'Projects run on efficient schedules because consistency and delivery matter.' },
        { title: 'Reliable Partnership', quote: 'Every project is handled with professionalism, accountability, and care.' },
      ],
    },
    contact: {
      title: 'Let’s discuss your next production.',
      description: 'Tell us about your project and we will help shape the cinematic experience your audience remembers.',
      email: 'hello@instantproduction.in',
    },
  },
};

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    closeMenu: (state) => {
      state.menuOpen = false;
    },
  },
});

export const { toggleMenu, closeMenu } = siteSlice.actions;
export default siteSlice.reducer;
