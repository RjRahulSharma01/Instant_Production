// Interactive data for the Healthcare landing page.
//
// Every figure below is an industry benchmark with a source, not a claim about
// results we have produced. Sources are rendered on the page so a doctor can
// check them, which is the point: this page has to survive scrutiny from
// people trained to check citations.

export const benchmarks = {
  sources: [
    { key: 'icg', label: 'Echelon Consulting, Local SEO for Healthcare India 2026' },
    { key: 'searchlab', label: 'Searchlab, Healthcare Marketing Statistics 2026' },
    { key: 'webtonic', label: 'Web Tonic, Health & Wellness Local SEO Statistics' },
  ],
};

/* Where new patients actually come from. Animated bar chart. */
export const discoveryChannels = {
  title: 'Where new patients actually come from',
  note: 'Indian market, typical clinic and hospital mix. Proportions vary by specialty and city.',
  source: 'icg',
  items: [
    { label: 'Local search & Google Maps', value: 65, detail: '"doctor near me", "clinic + city", specialty + location. The single largest channel, and the one most practices neglect.' },
    { label: 'Organic search & content', value: 42, detail: 'Symptom and condition searches that reach you before the patient knows which specialist they need.' },
    { label: 'Word of mouth & referral', value: 38, detail: 'Still powerful, but increasingly verified online before the patient calls.' },
    { label: 'Social media', value: 21, detail: 'Rarely the first touch. Very often the trust check between finding you and booking.' },
    { label: 'Paid search & ads', value: 18, detail: 'Fast, controllable, and expensive to rely on permanently.' },
  ],
};

/* The headline stats, rendered as animated rings. */
export const keyStats = [
  { value: 72, suffix: '%', label: 'Google symptoms before calling a clinic', source: 'icg' },
  { value: 65, suffix: '%', label: 'of new patient discovery is local search', source: 'icg' },
  { value: 40, suffix: '%', label: 'more likely to appear in the Map Pack with consistent NAP data', source: 'webtonic' },
  { value: 3.2, suffix: '%', label: 'typical healthcare conversion from local search', source: 'webtonic' },
];

/* OPD vs IPD is the distinction most agencies miss entirely. */
export const journeys = {
  opd: {
    key: 'opd',
    name: 'OPD patient',
    summary: 'Searches locally, decides fast. Often the same day.',
    window: 'Minutes to 48 hours',
    channels: ['Google Maps', 'Local SEO', 'Google Ads', 'Reviews'],
    stages: [
      { title: 'Symptom search', body: '"stomach pain doctor near me". Location intent is already present in the query.', signal: 'High intent, low loyalty' },
      { title: 'Map Pack scan', body: 'Three listings. Distance, rating and review count decide who gets the tap.', signal: 'Google Business Profile is the battleground' },
      { title: 'Quick credibility check', body: 'A glance at photos, timings and two or three recent reviews. Under a minute.', signal: 'Photos and recency matter more than the website' },
      { title: 'Call or book', body: 'Most tap to call directly from the listing. They may never see your website.', signal: 'Optimise the listing, not just the site' },
    ],
  },
  ipd: {
    key: 'ipd',
    name: 'IPD / surgical patient',
    summary: 'Researches for weeks. Often travels. Multiple people involved in the decision.',
    window: 'Two weeks to six months',
    channels: ['Organic content', 'Doctor profiles', 'YouTube', 'Second opinions', 'Referral'],
    stages: [
      { title: 'Condition research', body: 'Reads about the diagnosis, treatment options and risks, usually across many sessions.', signal: 'Educational content earns the first contact' },
      { title: 'Specialist comparison', body: 'Compares surgeons on credentials, experience with the specific procedure and published material.', signal: 'Doctor profile pages do the selling' },
      { title: 'Trust building', body: 'Watches videos, reads explanations, checks the hospital, asks family and often seeks a second opinion.', signal: 'Video and author credentials carry disproportionate weight' },
      { title: 'Enquiry, then decision', body: 'The enquiry arrives late and warm. Response speed and clarity decide the rest.', signal: 'Slow replies lose cases worth lakhs' },
    ],
  },
};

/* How each specialty is actually searched. This is the domain depth. */
export const specialtyIntel = [
  {
    name: 'Orthopaedics', icon: 'FaBriefcase',
    pattern: 'Injury and pain led', urgency: 'High',
    queries: ['knee replacement surgeon near me', 'ACL tear treatment cost', 'best orthopaedic doctor in [city]'],
    insight: 'Splits sharply between urgent injury searches and long-researched elective replacements. The two need completely different content and completely different response speeds.',
    channel: 'Local search + long-form procedure content',
  },
  {
    name: 'Gynaecology & IVF', icon: 'FaHeartPulse',
    pattern: 'Sensitive, heavily researched', urgency: 'Medium',
    queries: ['IVF success rate age 35', 'best gynaecologist near me', 'PCOS treatment options'],
    insight: 'Patients research privately for months and value discretion above almost everything. Reviews are read closely, and outcome claims are the fastest route to an NMC complaint in this specialty.',
    channel: 'Educational content + reputation management',
  },
  {
    name: 'Cardiology', icon: 'FaHeartPulse',
    pattern: 'Referral heavy, urgent tail', urgency: 'High',
    queries: ['cardiologist near me', 'angioplasty cost in [city]', 'chest pain when to see doctor'],
    insight: 'Most cases arrive by referral, so peer visibility matters more than consumer marketing. LinkedIn and professional presence outperform Instagram here by a wide margin.',
    channel: 'Peer network + hospital authority',
  },
  {
    name: 'Dermatology & Cosmetology', icon: 'FaWandMagicSparkles',
    pattern: 'Visual, comparison heavy', urgency: 'Low',
    queries: ['hair transplant cost', 'acne scar treatment near me', 'best skin doctor [city]'],
    insight: 'The most visual and most competitive specialty, and the one where before-and-after content is most tempting and most non-compliant. Demand can be built, unlike most of medicine.',
    channel: 'Social + paid, with tight compliance review',
  },
  {
    name: 'Dentistry', icon: 'FaBuilding',
    pattern: 'Local and price sensitive', urgency: 'Medium',
    queries: ['dentist near me open now', 'root canal cost', 'braces vs aligners'],
    insight: 'Almost entirely won or lost in the Map Pack. Proximity, opening hours and review volume decide it, often before your website is ever opened.',
    channel: 'Google Business Profile above all else',
  },
  {
    name: 'Paediatrics', icon: 'FaUsers',
    pattern: 'Anxious, repeat relationship', urgency: 'High',
    queries: ['child fever doctor near me', 'paediatrician [locality]', 'vaccination schedule India'],
    insight: 'Parents decide fast under stress, then stay for years. Reassurance and availability matter more than credentials in the first search, and retention is unusually high once won.',
    channel: 'Local search + trust content',
  },
  {
    name: 'Oncology', icon: 'FaShieldHalved',
    pattern: 'Longest journey in medicine', urgency: 'Critical',
    queries: ['best cancer hospital in India', 'second opinion oncology', 'immunotherapy cost'],
    insight: 'Months of research, multiple decision makers, frequently cross-city or international. Content has to be genuinely informative and unusually careful. This is the highest-stakes YMYL category there is.',
    channel: 'Authority content + second-opinion pathways',
  },
  {
    name: 'Ophthalmology', icon: 'FaCompass',
    pattern: 'Procedure led', urgency: 'Medium',
    queries: ['cataract surgery cost', 'LASIK near me', 'eye specialist [city]'],
    insight: 'Two distinct audiences with nothing in common: elderly cataract patients reached through family members, and young LASIK patients reached directly through social.',
    channel: 'Split campaigns by age cohort',
  },
];

/* Compliant vs non-compliant phrasing. The most practically useful thing here. */
export const complianceExamples = [
  {
    topic: 'Describing expertise',
    bad: 'Best orthopaedic surgeon in Delhi NCR',
    good: 'Fellowship-trained in joint replacement, practising since 2009',
    why: 'Superlatives and self-ranking are treated as self-promotional advertising. Verifiable credentials are not.',
  },
  {
    topic: 'Talking about results',
    bad: '99% success rate, guaranteed results',
    good: 'What the procedure involves, typical recovery, and the risks',
    why: 'Outcome and success-rate claims are explicitly restricted, and they are the most common trigger for complaints.',
  },
  {
    topic: 'Patient stories',
    bad: 'Before and after photos with a testimonial and a booking link',
    good: 'An explanation of the condition and the treatment pathway, with consent-cleared imagery where relevant',
    why: 'Testimonials that function as outcome claims are a problem, and identifiable patients need documented consent under the DPDP Act 2023.',
  },
  {
    topic: 'Calls to action',
    bad: 'Book now, limited slots and a special discount this month',
    good: 'Consultation timings, location and how to reach the clinic',
    why: 'Urgency and discounting read as soliciting patients. Practical information does not.',
  },
  {
    topic: 'Social media posts',
    bad: 'Reels showing procedures set to trending audio with promotional captions',
    good: 'Short explainers answering a question patients actually ask',
    why: 'The 2026 enforcement focus is precisely on content that is advertising dressed as education.',
  },
];

/* Realistic timeline. Deliberately not over-promised. */
export const timeline = [
  { period: 'Weeks 1–2', title: 'Audit and cleanup', body: 'Google Business Profile corrected, NAP consistency fixed across directories, existing content reviewed for compliance risk.', lift: 10 },
  { period: 'Weeks 3–8', title: 'Local visibility moves', body: 'Map Pack position improves, profile views and calls begin rising. This is usually the first measurable change.', lift: 30 },
  { period: 'Months 3–4', title: 'Content starts ranking', body: 'Condition and treatment pages begin appearing for long-tail searches. Enquiry quality improves before volume does.', lift: 55 },
  { period: 'Months 5–6', title: 'Compounding', body: 'Authority builds, competitive terms become reachable, and referral traffic from content stabilises.', lift: 80 },
  { period: 'Beyond', title: 'Defensible position', body: 'Rankings and reviews become an asset that is expensive for a competitor to displace.', lift: 100 },
];
