// E-commerce & D2C industry page. Data layer.
//
// SOURCING RULE (see the brand guidelines, p.17): every number that appears in
// public copy has a source someone can point to. Each figure below carries a
// `src` key that maps to an entry in `SOURCES`, and the page renders a visible
// citation list. Nothing here is a claimed Instant Production client result,
// where a scenario is modelled, it is labelled as modelled.

export const SOURCES = {
  unicommerce: {
    label: 'Unicommerce, India D2C Report 2026',
    detail: 'Platform transaction data: 6,000+ D2C brands, 410M+ shipments, FY2026',
    url: 'https://unicommerce.com/india-d2c-report-2026-april/',
  },
  ficci: {
    label: 'FICCI–Technopak, India D2C Market Report 2025',
    detail: 'Market size and category GMV mix',
    url: 'https://monaqo.in/meta-ads-roas-benchmarks-india/',
  },
  bcg: {
    label: 'BCG × Shiprocket, India D2C Scaling 2025',
    detail: 'Channel spend allocation for brands at ₹5–100 cr ARR',
    url: 'https://monaqo.in/meta-ads-roas-benchmarks-india/',
  },
  kantar: {
    label: 'Kantar, Media Reactions India 2025',
    detail: 'CPM movement and creative-format brand-lift measurement',
    url: 'https://monaqo.in/meta-ads-roas-benchmarks-india/',
  },
  iamai: {
    label: 'IAMAI, Digital Advertising Report 2025',
    detail: 'Advertiser counts and category ad-spend growth',
    url: 'https://monaqo.in/meta-ads-roas-benchmarks-india/',
  },
  benchmarks: {
    label: 'Meta ROAS benchmarks, India D2C, H1 2026 compilation',
    detail: 'Quartile distributions by category and AOV band, festival-normalised',
    url: 'https://monaqo.in/meta-ads-roas-benchmarks-india/',
  },
  agora: {
    label: 'Agora, India Meta Agency Benchmarks 2025',
    detail: 'Creative-type A/B testing across 47 India beauty D2C brands',
    url: 'https://monaqo.in/meta-ads-roas-benchmarks-india/',
  },
  redseer: {
    label: 'Redseer / Datum Intelligence, quick commerce tracking, Jan 2026',
    detail: 'Quick-commerce GMV, daily order volume and platform share',
    url: 'https://www.mordorintelligence.com/industry-reports/q-commerce-industry-in-india',
  },
  meta: {
    label: 'Meta India Business Report, Q4 2025',
    detail: 'Indian monthly active users by platform',
    url: 'https://monaqo.in/meta-ads-roas-benchmarks-india/',
  },
};

/* --------------------------------------------------------------- headline */

export const scale = [
  { value: '₹1.8', unit: 'lakh cr', label: 'India D2C GMV, FY2025', note: '≈ $21.5B, up 38% on FY2024', src: 'ficci' },
  { value: '33', unit: '%', label: 'GMV growth in FY2026', note: 'Shipped items grew 34%. Volume, not price', src: 'unicommerce' },
  { value: '11,000', unit: '', label: 'D2C brands competing', note: 'For the same audiences, on the same platforms', src: 'unicommerce' },
  { value: '52–68', unit: '%', label: 'of paid spend goes to Meta', note: 'For brands at ₹5–100 cr ARR', src: 'bcg' },
];

/* ------------------------------------------------------- the core argument */

export const fatigue = {
  question: 'Why do D2C ads stop working after a few weeks?',
  answer:
    'Because the audience has already seen them. In 2022 an Indian D2C brand could run the same Meta creative for 45 to 60 days before performance decayed. By 2026 that window is 21 to 35 days in competitive categories, and as short as 21 to 28 days in womenswear. The number of D2C brands running Meta campaigns grew about 34% between 2024 and 2026, so the same person now sees far more ads from the same category. Nothing is wrong with the creative that stopped working. It ran out of new people to reach.',
  then: { years: '2022', lo: 45, hi: 60 },
  now: { years: '2026', lo: 21, hi: 35 },
  drivers: [
    { stat: '+34%', label: 'more D2C brands running Meta campaigns, H1 2024 → H1 2026', src: 'iamai' },
    { stat: '+28%', label: 'Meta India CPM, Q1 2024 → Q1 2026, fashion and beauty', src: 'kantar' },
    { stat: '362M', label: 'Instagram monthly actives in India. A large pool, but not an infinite one', src: 'meta' },
    { stat: '20–35%', label: 'of measured ROAS lost to iOS attribution decay, with revenue unchanged', src: 'benchmarks' },
  ],
};

/* ------------------------------------------------ ROAS benchmark explorer */
// Bottom quartile / median / top quartile, H1 2026, 7-day click 1-day view.

export const roas = {
  note:
    'Blended ROAS on a 7-day click, 1-day view window, festival-normalised. On 1-day click attribution the same brand reads 30–45% lower. The campaign has not changed, the measurement has.',
  categories: [
    {
      key: 'skincare', name: 'Skincare', aov: '₹400–1,500', q1: 2.8, med: 4.1, q3: 6.2,
      driver: 'Before/after UGC and dermatologist-led creative',
      note: 'The widest quartile spread of any Indian D2C category. The gap between 2.8 and 6.2 is almost entirely creative quality, not media buying.',
    },
    {
      key: 'makeup', name: 'Makeup & colour', aov: '₹250–1,800', q1: 2.6, med: 3.9, q3: 5.8,
      driver: 'Tutorial video, shade-variety carousels',
      note: 'Peaks around wedding season and festivals. Shade carousels carry the catalogue that a single hero image cannot.',
    },
    {
      key: 'haircare', name: 'Haircare', aov: '₹300–1,200', q1: 2.4, med: 3.6, q3: 5.4,
      driver: 'Transformation video, ingredient education',
      note: 'Oils and serums outperform shampoo and conditioner. The visible-result formats favour the former.',
    },
    {
      key: 'ethnic', name: "Women's ethnic wear", aov: '₹600–4,000', q1: 2.1, med: 3.4, q3: 5.0,
      driver: 'Festival demand and gifting-occasion targeting',
      note: 'Strong numbers, concentrated risk. Most of the year is carried by the Navratri and Diwali quarters.',
    },
    {
      key: 'ayurveda', name: 'Ayurvedic wellness', aov: '₹500–2,000', q1: 2.2, med: 3.4, q3: 5.0,
      driver: 'Heritage positioning with clinical citation',
      note: 'Showing certification and study references inside the ad improves ROAS 18–22%.',
    },
    {
      key: 'western', name: "Women's western wear", aov: '₹400–2,000', q1: 1.8, med: 2.9, q3: 4.2,
      driver: 'Creative distinctiveness and organic Instagram presence',
      note: 'The most CPM-compressed category in Indian D2C. Fatigue arrives at 21–28 days.',
    },
    {
      key: 'footwear', name: 'Footwear', aov: '₹600–3,500', q1: 1.7, med: 2.7, q3: 4.0,
      driver: 'Size-guide UGC and return-policy clarity in creative',
      note: 'An 18–25% return rate sits between gross and net ROAS. The reported number flatters the real one.',
    },
    {
      key: 'protein', name: 'Sports nutrition', aov: '₹600–2,500', q1: 2.0, med: 3.1, q3: 4.6,
      driver: 'Transformation UGC, athlete-led creative',
      note: 'Performance claims are permissible; disease and treatment claims are not. ASCI reads the ad, not the intent.',
    },
  ],
  src: 'benchmarks',
};

/* ------------------------------------------------------- creative formats */

export const formats = [
  { label: 'Static product photography', lo: 1.8, hi: 2.4, tone: 'low', body: 'Cheap to make, quick to fatigue. Fine for catalogue and retargeting, weak on cold traffic.' },
  { label: 'Video-forward creative stack', lo: 2.8, hi: 4.5, tone: 'mid', body: 'An 8–12 second product or outfit showcase paired with testimonial content. The single biggest step change available to a fashion brand.' },
  { label: 'UGC with a specific claim', lo: 4.1, hi: 9.4, tone: 'high', body: 'Real users, named concern, visible result. Tested across 47 Indian beauty D2C brands, this outperformed professional product photography by a median of 2.3× on purchase ROAS.' },
];

export const formatNote =
  'The first two ranges are observed fashion-category ROAS. The third applies the measured 2.3× median uplift to the skincare quartile range. It is arithmetic on a published finding, not a separately observed band.';

/* --------------------------------------------------------- category growth */

export const growth = {
  window: 'Apr 2025 – Feb 2026',
  items: [
    { label: 'Health & pharma', value: 48, note: 'Fastest growing. Also the tightest advertising rules. ASCI reads every claim.' },
    { label: 'Beauty & personal care', value: 41, note: 'Highest volume and the highest ROAS ceiling. Also the most crowded.' },
    { label: 'FMCG', value: 32, note: 'Quick commerce is doing much of this work. Different shelf, different creative.' },
    { label: 'Fashion & accessories', value: 21, note: 'Lowest growth in the dataset. Nobody runs out of a dress. The reorder has to be manufactured.' },
    { label: 'Home furnishings', value: 19, note: 'Long consideration, high AOV, low frequency. A content problem more than a media problem.' },
  ],
  src: 'unicommerce',
};

/* ------------------------------------------------------------- the RTO line */

export const rto = {
  question: 'What actually erodes D2C margin in India?',
  answer:
    'Returns, not media cost. Across 6,000+ Indian D2C brands, cash-on-delivery orders returned at 58% during the FY2026 festive quarter, and overall RTO peaked at 39.2% in November 2025. By March 2026 the brands that acted were at 21.0%. Every returned order is paid for twice, outbound and inbound, with no revenue against it. A brand at 39% RTO is losing more margin to logistics than most brands spend on creative.',
  cod: 58,
  points: [
    { label: 'Nov 2025', sub: 'Festive peak', value: 39.2 },
    { label: 'Jan 2026', sub: 'Fixes start landing', value: 25.6 },
    { label: 'Mar 2026', sub: 'All three fixes running', value: 21.0 },
  ],
  fixes: [
    'A prepaid incentive at checkout that converts 20–30% of cash-on-delivery intenders',
    'Pin-code-level courier routing based on measured delivery performance, not rate card',
    'Address verification before dispatch',
  ],
  src: 'unicommerce',
};

/* ------------------------------------------------------------ where they live */

export const geography = {
  outsideMetro: 66,
  cpmSaving: [30, 50],
  body:
    'Two thirds of the next wave of Indian D2C customers live outside a metro, and CPM increases have concentrated in tier-1. Geo-expanding a campaign into tier-2 and tier-3 cities typically cuts CPM 30–50%. The constraint is not the media. It is whether the creative was made for that viewer. Hindi-first cuts, regional-language captions and price framing that assumes a different basket are production problems, and production is exactly what most brands cannot scale.',
  src: 'unicommerce',
};

/* ----------------------------------------------------------- quick commerce */

export const qcommerce = {
  question: 'Does quick commerce change what a D2C brand should make?',
  answer:
    'Yes, structurally. Quick commerce reached roughly ₹11,000 crore of GMV in January 2026 alone on about 7.8 million orders a day, and the shelf is three apps: Blinkit at roughly 46% share, Swiggy Instamart at 24% and Zepto at 22%. On that shelf there is no scroll, no video and no story. The decision is made from a thumbnail, a name and a price. Brands that treat it as one more marketplace listing lose to brands that redesign the pack shot for a 120-pixel tile.',
  share: [
    { label: 'Blinkit', value: 46 },
    { label: 'Swiggy Instamart', value: 24 },
    { label: 'Zepto', value: 22 },
    { label: 'Everyone else', value: 8 },
  ],
  stats: [
    { value: '₹11,000 cr', label: 'quick-commerce GMV, January 2026 alone' },
    { value: '7.8M', label: 'orders a day' },
    { value: '~10%', label: 'of branded retail projected by 2030' },
  ],
  src: 'redseer',
};

/* -------------------------------------------------------------- worked model */
// Explicitly a model, not a client result. The inputs are the benchmarks above.

export const model = {
  title: 'A worked example, using the benchmarks on this page',
  caveat:
    'A model built from the published benchmarks above, not an Instant Production client result. It assumes three active ad sets running three concurrent creatives each, the same assumption the calculator above uses. Your numbers will differ.',
  brand: 'A skincare brand at ₹850 AOV, spending ₹8 lakh a month on Meta',
  cols: ['Four assets a month', 'Twelve assets a month'],
  rows: [
    { k: 'Live creative slots to keep fresh', a: '9', b: '9' },
    { k: 'Full refresh cycle achieved', a: '68 days', b: '23 days' },
    { k: 'Category fatigue window', a: '21–35 days', b: '21–35 days' },
    { k: 'Result', a: 'Two thirds of the flight runs on fatigued creative', b: 'Refresh lands inside the window' },
    { k: 'Distinct concepts tested per quarter', a: '~9', b: '~27' },
    { k: 'Category ROAS band reachable', a: 'Bottom quartile, 2.8', b: 'Median to top quartile, 4.1 to 6.2' },
  ],
  closing:
    'The second column is not a better media buyer. It is the same budget with enough creative behind it to keep testing. That is the whole argument for AI-first production in this category. Not that it is cheaper, but that it makes the top quartile reachable at all.',
};

/* ---------------------------------------------------------------------- faq */

export const faqs = [
  {
    q: 'How many creatives does a D2C brand actually need per month?',
    a: 'Enough to refresh inside your category fatigue window and still have variants left to test. In competitive Indian D2C categories that window is 21–35 days, so a brand running three or four active ad sets needs somewhere between 15 and 30 assets a month: a mix of new concepts and variants of what is already working. Four a month means refreshing on a 60-day cycle in a market whose creative fatigues in 30.',
  },
  {
    q: 'Our ROAS dropped and nothing changed. What happened?',
    a: 'Usually one of three things. Frequency climbed and the creative fatigued, which shows up as falling CTR before it shows up in ROAS. Or the attribution window shifted. Moving from 7-day click to 1-day click reads 30–45% lower on identical performance. Or the iOS share of your audience grew and measured ROAS fell 20–35% while actual revenue held. Diagnose in that order, because only the first is a creative problem.',
  },
  {
    q: 'Is CTR a useful signal on its own?',
    a: 'As a diagnostic, yes. Below roughly 0.8% CTR on cold traffic, the creative is the problem. Above 2.5% CTR with weak conversion, the creative is fine and the landing page or the offer is the problem. It is a cheap way to work out which team should get the ticket.',
  },
  {
    q: 'Should we be making UGC or polished brand films?',
    a: 'Both, for different jobs. Across 47 Indian beauty D2C brands, UGC featuring a real user with a named concern and a visible result outperformed professional product photography by a median of 2.3× on purchase ROAS. That is the acquisition workhorse. Polished brand film does a different job. It is what makes a first-time buyer believe you will still exist in six months. Do not fund one by cutting the other.',
  },
  {
    q: 'Can content fix a returns problem?',
    a: 'Partly, and it is worth doing, because RTO destroys more margin than media inefficiency. Size guides, honest fabric and finish detail, real-scale product video and explicit return-policy language inside the creative all reduce returns caused by mismatched expectation. What content cannot fix is address quality, courier routing or the structural return rate of cash on delivery. Those are operational, and they are where the 39% to 21% move actually came from.',
  },
  {
    q: 'How do we get cited when someone asks an AI assistant for a recommendation?',
    a: 'By being quotable. Assistants lift short, self-contained, attributable passages, which means a page that answers a real question in its first 60 words gets cited and a page that opens with brand poetry does not. Practically: comparison and ingredient pages written as answers, FAQ schema, a named author, and specifics an assistant can repeat without hedging. Most Indian D2C brands are not in those answers yet, which is why the window is worth taking seriously now.',
  },
];

export const services = [
  'High-volume creative production for paid social',
  'UGC and creator-led ad systems',
  'Product and packshot video, including quick-commerce tiles',
  'Performance marketing to contribution margin, not ROAS',
  'Landing page and PDP conversion work',
  'Regional-language and tier-2 creative variants',
  'Creative testing frameworks and fatigue monitoring',
  'Answer-engine content: comparison, ingredient and buying-guide pages',
];
