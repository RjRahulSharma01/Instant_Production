// Beauty & Wellness industry page. Data layer.
//
// Same sourcing rule as the other deep-build industry pages. The compliance
// section summarises ASCI's published guidance and its FY26 complaints report;
// it is written for marketers, not as legal advice, and the page says so.

export const SOURCES = {
  asciFy26: {
    label: 'ASCI Annual Complaints Report, FY26 (April 2025 – March 2026)',
    detail: 'Influencer violation volumes, modification rates, category breakdown',
    url: 'https://www.buzzincontent.com/insight/asci-flags-1609-influencer-violations-in-fy26-54-linked-to-illegal-categories-11882137',
  },
  asciBpc: {
    label: 'ASCI beauty and personal care enforcement, 2025–26',
    detail: 'Brands flagged, the claims flagged, and the disclosure failures behind them',
    url: 'https://www.storyboard18.com/amp/brand-marketing/india-cracks-down-on-beauty-brands-for-misleading-influencer-ads-ws-l-93976.htm',
  },
  asciNames: {
    label: 'ASCI influencer disclosure violations by company, FY26',
    detail: 'Which personal-care companies were flagged most often',
    url: 'https://www.storyboard18.com/advertising/honasa-loreal-hul-top-ascis-influencer-disclosure-violations-list-in-fy26-in-personal-care-99540.htm',
  },
  market: {
    label: 'India D2C beauty and personal care market, 2026–2033',
    detail: 'Market size, growth rate and category mix',
    url: 'https://www.coherentmarketinsights.com/industry-reports/india-d2c-bpc-market',
  },
  gravel: {
    label: 'India beauty market trends 2026',
    detail: 'Channel structure, modern Ayurveda, quick commerce and the D2C tracker',
    url: 'https://gravelai.com/blog/india-beauty-market-trends-2026',
  },
  unicommerce: {
    label: 'Unicommerce, India D2C Report 2026',
    detail: 'Category growth across 6,000+ brands and 410M+ shipments',
    url: 'https://unicommerce.com/india-d2c-report-2026-april/',
  },
  benchmarks: {
    label: 'Meta ROAS benchmarks, India D2C, H1 2026 compilation',
    detail: 'Skincare and haircare quartile distributions, and the UGC creative finding',
    url: 'https://monaqo.in/meta-ads-roas-benchmarks-india/',
  },
};

/* --------------------------------------------------------------- headline */

export const scale = [
  { value: '97.3', unit: '%', label: 'of influencer ads needed changing', note: 'Every ad ASCI processed in FY26, across categories', src: 'asciFy26' },
  { value: '639', unit: '', label: 'beauty and personal care cases', note: '90% of them required modification', src: 'asciBpc' },
  { value: '41', unit: '%', label: 'category growth, Apr 25 – Feb 26', note: 'Second fastest in Indian D2C', src: 'unicommerce' },
  { value: '2.8–6.2', unit: '×', label: 'skincare ROAS, bottom to top quartile', note: 'The widest spread of any Indian D2C category', src: 'benchmarks' },
];

/* ------------------------------------------------------- the core argument */

export const tension = {
  question: 'Why is beauty the hardest category to advertise honestly?',
  answer:
    'Because the creative that converts best is the creative most likely to break a rule. Beauty runs on creators and on visible transformation, and both are exactly what the Advertising Standards Council of India spent FY26 flagging. 97.3% of influencer advertisements it processed required modification, and in beauty and personal care specifically 90% of 639 cases did. The problem is not that brands are being reckless. It is that a before-and-after with a timeline attached is simultaneously the highest-converting asset in the category and the most common violation in it.',
  stats: [
    { value: '1,609', label: 'influencer violations flagged across all categories in FY26' },
    { value: '94%', label: 'of them were disclosure failures: a missing label, not a false claim' },
    { value: '500+', label: 'beauty and personal care brands flagged between 2025 and January 2026' },
    { value: '24', label: 'cases against the single most-flagged personal care company in FY26' },
  ],
  note: 'The most flagged names in FY26 were large, well-resourced companies with legal teams. This is not a problem that scale solves on its own.',
  src: 'asciFy26',
};

/* ---------------------------------------------------- the flagged claims */

export const claims = {
  question: 'Which beauty claims actually get flagged?',
  answer:
    'The ones with a clock attached. ASCI specifically flagged unrealistic timelines during 2025–26: dandruff disappearing in one wash, acne reversal in six hours, dark circles fading in seven days, skin looking five years younger in five days. It also flagged loose use of "natural" and "Ayurvedic" where the formulation did not support it. The pattern is consistent: a claim becomes a problem at the point it promises a specific outcome inside a specific timeframe without evidence for either.',
  flagged: [
    { claim: 'Dandruff gone in one wash', why: 'A single-use outcome claim with no substantiation' },
    { claim: 'Acne reversal in six hours', why: 'A timeline no topical product can evidence' },
    { claim: 'Dark circles faded in seven days', why: 'Specific outcome, specific clock, no trial data' },
    { claim: 'Skin five years younger in five days', why: 'Quantified anti-ageing on a five-day horizon' },
    { claim: '“100% natural” on a formulated product', why: '“Natural” used where the formulation does not support it' },
    { claim: '“Ayurvedic” as a positioning word', why: 'Applied to products without the composition to back it' },
  ],
  fix: 'None of this stops you showing a result. It stops you promising a schedule for one. "Visible improvement in most users over eight weeks, in a study of 120" is a stronger claim than "seven days", because it survives being checked, and it converts better with the sceptical buyer who has already been disappointed twice.',
  src: 'asciBpc',
};

/* ------------------------------------------------------- compliance gate */

export const compliance = {
  question: 'What can a beauty brand say in a creator post?',
  answer:
    'A creator can say almost anything a brand could say, and must always say that it is an ad. Disclosure is the single biggest failure mode in the category. 94% of the influencer violations ASCI flagged in FY26 were disclosure failures rather than false claims, which means the most common problem is not what was said but that nobody labelled it. The label must be upfront, in the same language as the post, and impossible to miss without expanding a caption.',
  items: [
    {
      tactic: 'A creator showing their own result',
      verdict: 'clear',
      body: 'Permitted and the strongest asset in the category, provided the post is disclosed as an ad and the creator is describing their genuine experience rather than reading a claim off a brief.',
    },
    {
      tactic: 'Disclosure inside the first line, in the post language',
      verdict: 'clear',
      body: 'Upfront, in the same language the post is in, visible without expanding the caption. This one control removes the majority of the risk in the category.',
    },
    {
      tactic: 'Ingredient and formulation education',
      verdict: 'clear',
      body: 'Explaining what a molecule does, at what concentration, and who it suits. The highest-trust content in beauty and the hardest for a competitor to copy.',
    },
    {
      tactic: 'Before-and-after imagery',
      verdict: 'restricted',
      body: 'Permitted with real, unretouched images, the same lighting and framing in both, and the timeframe stated honestly. It becomes a violation the moment the transformation is enhanced or the schedule is invented.',
    },
    {
      tactic: 'A study or clinical citation',
      verdict: 'restricted',
      body: 'Strong when the study is real and the sample size is stated. Showing certification and study references has been found to lift ROAS 18–22% in the Ayurvedic segment. Weak and risky when it is a panel of thirty people describing how a cream felt.',
    },
    {
      tactic: '“Results in seven days”',
      verdict: 'blocked',
      body: 'Specific outcomes on short specific timelines are the single most flagged claim type in Indian beauty advertising. If you have trial data supporting the window, state the study. If you do not, do not state the window.',
    },
    {
      tactic: '“100% natural” or “chemical-free”',
      verdict: 'blocked',
      body: 'Flagged repeatedly where the formulation does not support it. Everything is a chemical; the claim is unsubstantiable as written and reads as dated to an ingredient-literate buyer anyway.',
    },
    {
      tactic: 'Treatment or cure language',
      verdict: 'blocked',
      body: 'A cosmetic that claims to treat or cure a condition is making a drug claim, which moves it under a different and much stricter regime. "Helps reduce the appearance of" is not a weaker sentence. It is the accurate one.',
    },
  ],
  disclaimer:
    'A working summary of published ASCI guidance and its FY26 reporting, written for marketers. It is not legal advice, and cosmetics, ayurvedic products and anything making a therapeutic claim sit under different regimes. We work with your regulatory team rather than around them.',
  src: 'asciBpc',
};

/* ------------------------------------------------------- creative economics */

export const creative = {
  question: 'What actually performs in Indian beauty advertising?',
  answer:
    'Real users describing a named concern. Tested across 47 Indian beauty direct-to-consumer brands, user-generated creative featuring a real person with a specific skin concern and a visible result outperformed professional product photography by a median of 2.3 times on purchase ROAS. That is the largest creative-type gap documented in any Indian D2C category, and it is why the quartile spread in skincare is so wide. The difference between a 2.8 and a 6.2 is almost entirely what the creative is, not how the media is bought.',
  formats: [
    { label: 'Professional product photography', lo: 1.8, hi: 2.4, tone: 'low', body: 'Necessary for the shelf, weak on cold traffic. It shows the product and says nothing about whether it works.' },
    { label: 'Demonstration and texture video', lo: 2.8, hi: 4.5, tone: 'mid', body: 'Swatch, texture, application, absorption. Answers the question a buyer actually has, which is what it will feel like.' },
    { label: 'UGC with a named concern', lo: 4.1, hi: 9.4, tone: 'high', body: 'A real user, a specific concern, a visible result, honestly framed. The 2.3× median uplift applied to the skincare quartile range.' },
  ],
  note: 'The first two ranges are observed category ROAS. The third applies the measured 2.3× median uplift to the skincare quartile range. Arithmetic on a published finding, not a separately observed band.',
  src: 'benchmarks',
};

/* ------------------------------------------------------------- the shelves */

export const shelves = [
  { name: 'Instagram and YouTube', role: 'Where demand is created', detail: 'Creator content, tutorials, routines. Almost nobody discovers a new beauty brand on a search engine.', weight: 92 },
  { name: 'Marketplaces', role: 'Where trust is checked', detail: 'Nykaa, Amazon, Myntra. Reviews here are read as evidence, and a thin review base kills a launch that the ads were otherwise winning.', weight: 78 },
  { name: 'Quick commerce', role: 'Where impulse converts', detail: 'Serums, primers and tints now launch on Blinkit and Zepto. A 120-pixel tile, no story, no video. The pack shot is the entire pitch.', weight: 61 },
  { name: 'Your own site', role: 'Where margin lives', detail: 'The only channel where you own the customer, the data and the repeat purchase. Usually the smallest and the most valuable.', weight: 44 },
];

/* ------------------------------------------------------------ worked model */

export const model = {
  title: 'What the disclosure failure actually costs',
  caveat:
    'A model built from the published benchmarks and enforcement data on this page, not an Instant Production client result. Your numbers will differ.',
  cols: ['Undisclosed creator programme', 'Disclosed and briefed properly'],
  rows: [
    { k: 'Creative performance', a: 'Identical', b: 'Identical. Disclosure does not reduce it' },
    { k: 'ASCI exposure', a: 'The most common violation in the category', b: 'None from the disclosure itself' },
    { k: 'If flagged', a: 'Modification, public listing, and the post comes down', b: 'Nothing to modify' },
    { k: 'What the brand loses', a: 'The asset, mid-flight, at its best-performing moment', b: 'Nothing' },
    { k: 'Cost of getting it right', a: 'None', b: 'One line in the brief' },
  ],
  closing:
    'Ninety-four percent of the influencer violations flagged in FY26 were disclosure failures. Not false claims. Missing labels. This is the cheapest risk to remove in Indian marketing and the most commonly left in place, and the brands losing assets to it are large ones with legal departments.',
};

/* --------------------------------------------------------------------- faq */

export const faqs = [
  {
    q: 'Does adding a disclosure label hurt performance?',
    a: 'Not in any data we have seen, and the assumption that it does is doing real damage in this category. The label costs a line of caption; a flagged post costs the asset entirely, usually while it is performing. Ninety-four percent of the influencer violations ASCI flagged in FY26 were disclosure failures rather than false claims, which tells you most brands are taking a large risk to avoid a small perceived cost.',
  },
  {
    q: 'Can we still run before-and-after content?',
    a: 'Yes, with three conditions that most brands break. The images must be real and unretouched, the lighting and framing must match between them, and the timeframe must be stated honestly rather than compressed to sound impressive. What gets flagged is not the format. It is the clock attached to it. "Eight weeks" with a study behind it is publishable. "Seven days" without one is the single most flagged claim type in Indian beauty.',
  },
  {
    q: 'Our skincare ROAS is 2.9. Is that bad?',
    a: 'It is bottom-quartile for the category, which is useful rather than damning. The skincare band runs from about 2.8 at the bottom quartile to 6.2 at the top, the widest spread in Indian D2C. That spread is almost entirely creative quality rather than media buying, so a 2.9 usually means the account is running product photography where it should be running real users with named concerns. That is a fixable problem, and it is the one with the largest measured upside in the category.',
  },
  {
    q: 'How many creators should we work with?',
    a: 'More, smaller, and briefed harder than most brands run. The measured advantage of UGC comes from specificity, a real person with a named concern, and that does not scale by hiring one larger creator. It scales by working with many people whose concerns genuinely differ, and by briefing disclosure and claim limits into the contract rather than hoping. Reach is the least useful selection criterion available.',
  },
  {
    q: 'Is quick commerce worth it for a beauty brand?',
    a: 'For anything impulse-priced and repeat-purchased, yes, but it demands different assets. There is no scroll, no video and no story on a quick-commerce shelf. The decision is made from a thumbnail, a name and a price. Brands that upload their marketplace imagery lose to brands that redesign the pack shot for a 120-pixel tile. Treat it as a separate production brief, not a distribution checkbox.',
  },
  {
    q: 'What does “modern Ayurveda” actually require of the marketing?',
    a: 'Substantiation, mostly. The positioning works commercially and the buyer is genuinely interested, but "Ayurvedic" applied to a product whose composition does not support it is among the claims ASCI has flagged repeatedly. Where the formulation is real, showing certification and study references has been found to lift ROAS 18–22% in the segment, so the compliant version is also the higher-performing one, which is not always true in regulated categories.',
  },
];

export const services = [
  'Creator programmes with disclosure and claim controls in the brief',
  'UGC systems built around named concerns rather than reach',
  'Ingredient and formulation education content',
  'Demonstration, texture and application video',
  'Quick-commerce pack shots and tile-first product imagery',
  'Marketplace content: A+ pages, review-base building',
  'Claim review against ASCI guidance before creative runs',
  'Performance marketing measured to contribution margin',
];
