// Content for the Healthcare landing page.
//
// Positioning note: the differentiator here is NMC compliance. Indian doctors
// cannot solicit patients or claim treatment outcomes, and 2026 enforcement is
// focused on separating genuine education from disguised advertising. Every
// competitor page reviewed sells reach; almost none address the thing that
// actually keeps doctors from marketing at all. That is the angle.

export const hero = {
  eyebrow: 'Healthcare Marketing',
  title: 'Marketing that grows your practice without risking your registration.',
  intro:
    '77% of patients search online before they book. We help doctors, clinics and hospitals be found there — with content built around what NMC rules actually permit, not around what a generic agency thinks looks good.',
  primaryCta: 'Book a free practice audit',
  secondaryCta: 'See our healthcare work',
  trustLine: 'Trusted by clinics, hospitals and independent practitioners',
};

export const stats = [
  { value: '77%', label: 'of patients search online before booking', note: 'Industry benchmark' },
  { value: '100%', label: 'NMC-aware content review', note: 'Every asset, before it publishes' },
  { value: '12+', label: 'years in production', note: 'Now applied to healthcare' },
  { value: '10K+', label: 'creators in network', note: 'For patient-education content' },
];

// Compliance is the trust anchor of the page.
export const compliance = {
  title: 'We write for the regulator as well as the patient.',
  intro:
    'The National Medical Commission permits educational content. It prohibits soliciting patients and claiming treatment outcomes. Most marketing agencies do not know the difference — which is how doctors end up with a well-performing post and a notice from their State Medical Council.',
  points: [
    {
      title: 'Education, not solicitation',
      body: 'Content that explains a condition, a procedure or what a patient should expect is permitted. Content that promises results, ranks you as "best", or invites patients to book off a claim is not. We write to the first and refuse the second.',
    },
    {
      title: 'No outcome claims, no before-and-after bait',
      body: 'Success-rate numbers, guaranteed results and cure language are the fastest route to a complaint. There are compliant ways to demonstrate credibility, and we use those instead.',
    },
    {
      title: 'Patient privacy by default',
      body: 'Consent captured before any patient appears in content, and data handling aligned to the DPDP Act 2023. No identifiable patient goes into a campaign without written consent on file.',
    },
    {
      title: 'Review before publish',
      body: 'Every asset passes a compliance read before it goes out. If something is borderline, we tell you why and offer an alternative rather than quietly shipping it.',
    },
  ],
  disclaimer:
    'We are a marketing agency, not a legal advisor. We work to current NMC guidance and flag anything we consider risky, but final responsibility for published content rests with the registered practitioner.',
};

export const services = [
  {
    id: 'website',
    icon: 'FaLaptopCode',
    title: 'Websites for doctors & hospitals',
    tagline: 'The page a patient judges you on in eight seconds.',
    body:
      'Fast, mobile-first sites with working appointment booking, doctor profiles that rank for their own names, department and treatment pages built around what patients actually search, and technical SEO handled at build time.',
    bullets: ['Appointment booking that works', 'Doctor and department profiles', 'Treatment pages built on search intent', 'Core Web Vitals and schema'],
  },
  {
    id: 'social',
    icon: 'FaShareNodes',
    title: 'Social media management',
    tagline: 'A steady presence that educates instead of advertising.',
    body:
      'Instagram, Facebook and YouTube handled end to end — planning, design, captions, scheduling and community management. Patient-education first, so the account builds trust without stepping over the advertising line.',
    bullets: ['Monthly content calendar', 'Reels, carousels and stories', 'Comment and DM handling', 'Compliance read on every post'],
  },
  {
    id: 'content-video',
    icon: 'FaWandMagicSparkles',
    title: 'Content strategy & video',
    tagline: 'What to say, to whom, and in what order.',
    body:
      'Condition-led content mapped to how patients actually research — symptom, then treatment, then practitioner. Plus the video to deliver it: explainers, procedure walkthroughs, patient-education series and OPD shorts.',
    bullets: ['Condition and treatment content maps', 'Explainer and education video', 'Doctor-led short form', 'Scripts written for camera-shy clinicians'],
  },
  {
    id: 'blog',
    icon: 'FaPenNib',
    title: 'Medical blog writing',
    tagline: 'The content Google trusts on health topics.',
    body:
      'Health content is held to a higher bar by Google — YMYL and E-E-A-T standards mean anonymous, generic articles do not rank. We write under your name, with your credentials attached and your review before publication.',
    bullets: ['Keyword and symptom-intent research', 'Written for doctor review and byline', 'Author credentials and schema', 'Internal linking to treatment pages'],
  },
  {
    id: 'linkedin',
    icon: 'FaUsers',
    title: 'LinkedIn for clinicians',
    tagline: 'Where referrals, speaking slots and hires come from.',
    body:
      'Most doctors treat LinkedIn as a dormant CV. It is the one platform where peers, referrers, medical device partners and prospective associates are actually looking — and it is far less regulated than patient-facing channels.',
    bullets: ['Profile rebuild and positioning', 'Thought-leadership posting cadence', 'Peer and referrer network growth', 'Hospital and department pages'],
  },
  {
    id: 'photography',
    icon: 'FaCameraRetro',
    title: 'Professional photoshoots',
    tagline: 'Stop using the photo from your 2015 conference badge.',
    body:
      'Clinical portraits, team photography, facility and OT walkthroughs, and equipment coverage — shot to work across your website, Google Business Profile, LinkedIn and press.',
    bullets: ['Doctor and team portraits', 'Facility and interior coverage', 'Google Business Profile assets', 'Consistent across every channel'],
  },
  {
    id: 'brand-video',
    icon: 'FaBuilding',
    title: 'Corporate & branding films',
    tagline: 'For the decisions that are not made on Instagram.',
    body:
      'Hospital brand films, department launches, founder and legacy stories, recruitment films and investor material — the work that has to hold up in a boardroom, not just a feed.',
    bullets: ['Hospital and department films', 'Founder and legacy stories', 'Recruitment and culture video', 'Investor and CSR material'],
  },
];

export const specialties = [
  'Orthopaedics', 'Gynaecology & Obstetrics', 'Cardiology', 'Ophthalmology',
  'Dermatology', 'Cosmetology', 'Dentistry', 'Psychiatry', 'Neurology',
  'Gastroenterology', 'Endocrinology', 'IVF & Fertility', 'Oncology', 'Paediatrics',
];

export const process = [
  { step: 'Practice audit', body: 'We look at how you currently show up: search visibility, Google Business Profile, existing content and what your competitors in the same locality are doing.' },
  { step: 'Compliance review', body: 'A pass over your existing material against current NMC guidance. Most practices are carrying at least one thing they should not be.' },
  { step: 'The plan', body: 'Channels, content themes, cadence and what we expect each to do. Written in plain language with a number attached, not a deck of jargon.' },
  { step: 'Run and report', body: 'We execute monthly and report on enquiries and appointments, not impressions. You see what worked and what we are changing.' },
];

export const clients = [
  { name: 'Khushi Life Hospital', url: 'https://www.khushilifehospital.com', kind: 'Hospital website' },
  { name: 'Dr Shreya Tyagi', url: 'https://www.drshreyatyagi.com/', kind: 'Practitioner website' },
  { name: 'Dr Shreya Tyagi', url: 'https://www.linkedin.com/in/dr-shreya-tyagi-813858168/', kind: 'LinkedIn management' },
  { name: 'Dr Akanksha Shukla', url: 'https://www.linkedin.com/in/dr-akanksha-shukla-206b043bb/', kind: 'LinkedIn management' },
  { name: 'Dr Priyanka Chawla', url: 'https://www.linkedin.com/in/dr-priyanka-chawla-678a55224/', kind: 'LinkedIn management' },
];

// Placeholder until real quotes are collected. Rendered only when `approved`.
export const testimonials = [
  { quote: '', name: '', role: '', approved: false },
];

export const faqs = [
  {
    q: 'Can doctors legally advertise in India?',
    a: 'Not in the way most businesses can. NMC regulations prohibit soliciting patients and making treatment-outcome claims, and self-promotional publicity about your skills or achievements is restricted. What is permitted is educational content — explaining conditions, procedures and what a patient should expect. Nearly everything we build sits in that educational space, which is both compliant and, in practice, what actually earns patient trust.',
  },
  {
    q: 'What happens if content breaches NMC guidance?',
    a: 'Complaints go to the State Medical Council, and action ranges from a warning to suspension of registration in serious cases. It is a professional risk, not just a marketing one, which is why we run a compliance read before anything publishes rather than after a complaint arrives.',
  },
  {
    q: 'Can we use patient testimonials or before-and-after photos?',
    a: 'This is the most common request and the riskiest area. Testimonials that amount to outcome claims are a problem, and identifiable patients require documented consent under the DPDP Act. There are compliant ways to demonstrate credibility — case explanations without outcome promises, credentials, peer recognition — and we will steer you toward those.',
  },
  {
    q: 'How long before we see more patient enquiries?',
    a: 'Local search and Google Business Profile improvements can move within four to eight weeks. Organic content and blog rankings take three to six months, because health content is held to Google’s YMYL standard and takes longer to earn trust. Anyone promising patient volume in week one is either not doing SEO or not being honest.',
  },
  {
    q: 'Do you work with single-doctor practices or only hospitals?',
    a: 'Both, but the work looks different. A solo practitioner usually needs a strong personal brand, LinkedIn presence and local search visibility. A hospital needs department-level content, multi-doctor profiles and coordinated campaigns. We will tell you honestly which package fits and what it should cost.',
  },
  {
    q: 'Who writes the medical content — do we have to review it?',
    a: 'We write it, you review it, and it publishes under your name. That is not us offloading work: Google’s E-E-A-T standards for health content mean articles with a named, credentialled author perform substantially better than anonymous ones. Your review is also the last compliance check.',
  },
  {
    q: 'Do you handle Google Business Profile and reviews?',
    a: 'Yes. For most clinics the Map Pack drives more enquiries than the website does, because patients search "near me" with intent to book. We optimise the profile, keep it current, and set up a review process that is compliant — meaning we never incentivise or script reviews.',
  },
];

export const seo = {
  title: 'Healthcare Marketing for Doctors & Hospitals',
  description:
    'NMC-aware healthcare marketing: websites, social media, medical blog writing, LinkedIn, photography and brand films for doctors, clinics and hospitals in India.',
};
