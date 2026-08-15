// Fintech industry page — data layer.
//
// Same sourcing rule as the e-commerce page: every figure carries a `src` key
// resolving to SOURCES, and the page renders a visible citation list. Nothing
// here is a claimed Instant Production client result.
//
// The compliance section is the one part of this page that could cost someone
// money if it is wrong. It describes the rules as published; it is not legal
// advice, and the page says so where a reader will see it.

export const SOURCES = {
  npci: {
    label: 'NPCI / UPI monthly statistics, January 2026',
    detail: 'Transaction volume, value and share of digital payments',
    url: 'https://productgrowth.in/insights/india/upi-market-data/',
  },
  pg: {
    label: 'India Fintech Market 2026: State of the Industry',
    detail: 'Market structure, BNPL, lending, Account Aggregator adoption',
    url: 'https://productgrowth.in/insights/india/india-fintech-2026/',
  },
  cac: {
    label: 'Indian fintech CAC analysis, May 2026',
    detail: 'Acquisition cost by category, 2023 against Q1 2026, and search CPC movement',
    url: 'https://maliktimes.in/cac-rising-indian-fintech-apps-2026-2/',
  },
  funnel: {
    label: 'Fintech digital marketing performance benchmarks 2026',
    detail: 'Registration-to-funded conversion and onboarding friction',
    url: 'https://www.webtonic.io/blog/fintech-digital-marketing-statistics',
  },
  sebi: {
    label: 'SEBI (Intermediaries) Amendment Regulations 2024, s.16A — and 2025–26 clarifications',
    detail: 'Restrictions on regulated entities associating with unregistered finfluencers',
    url: 'https://www.mondaq.com/india/securities/1726258/sebis-crackdown-on-finfluencers-regulations-and-enforcement',
  },
  enforcement: {
    label: 'SEBI enforcement order, 4 December 2025',
    detail: 'Trading “education” held to be unregistered investment advisory',
    url: 'https://nliulawreview.nliu.ac.in/blog/sebis-crackdown-on-finfluencers-a-legal-and-regulatory-perspective/',
  },
  mordor: {
    label: 'India Fintech Market analysis, 2026–2031',
    detail: 'Market size and segment share',
    url: 'https://www.mordorintelligence.com/industry-reports/india-fintech-market',
  },
};

/* --------------------------------------------------------------- headline */

export const scale = [
  { value: '21.7', unit: 'bn', label: 'UPI transactions in January 2026', note: 'A single month. A record, and still climbing', src: 'npci' },
  { value: '₹25', unit: 'lakh cr', label: 'monthly UPI value', note: 'Larger than the annual GDP of most countries', src: 'npci' },
  { value: '80', unit: '%+', label: 'of digital payments run on UPI', note: 'Up from under 1% in 2016', src: 'npci' },
  { value: '18', unit: '%', label: 'of registrations reach funded status', note: 'The other 82% are a cost with no revenue', src: 'funnel' },
];

/* ------------------------------------------------------- the core argument */

export const funnel = {
  question: 'Why does fintech marketing look efficient and perform badly?',
  answer:
    'Because the metric most campaigns optimise for sits five steps above the one that matters. Across Indian fintech, only about 18% of registrations reach funded status — the rest complete a signup and stop. A campaign optimised for installs or registrations can look excellent on cost per acquisition while producing users who never transact. The number worth managing is cost per funded account, which is several times higher and is the only one that maps to revenue.',
  steps: [
    { label: 'Ad impression', pct: 100, note: 'What you buy' },
    { label: 'Click', pct: 100, note: 'What the dashboard rewards' },
    { label: 'App install or signup', pct: 100, note: 'Where most reporting stops' },
    { label: 'KYC started', pct: 54, note: 'Video KYC, CKYC lookup, risk-based checks' },
    { label: 'KYC completed', pct: 31, note: 'Documents, retries, a queue' },
    { label: 'Account funded', pct: 18, note: 'The only step that is revenue' },
  ],
  note: 'Percentages are of registrations, not of impressions. The intermediate steps are indicative of typical onboarding decay; the 18% endpoint is the published figure.',
  src: 'funnel',
};

/* --------------------------------------------------------- CAC then vs now */

export const cac = {
  window: '2023 → Q1 2026',
  items: [
    { label: 'Digital lending — personal loan', then: [800, 1600], now: [1200, 2800], unit: 'per funded customer, tier 1' },
    { label: 'Neobank — savings activation', then: [600, 900], now: [1100, 1800], unit: 'per activated account' },
    { label: 'Wealth & broking', then: [1400, 3000], now: [2500, 5500], unit: 'per KYC-complete paying user' },
    { label: 'Insurance — D2C term life', then: [2000, 4000], now: [3500, 7000], unit: 'per policy' },
  ],
  cpc: { then: [25, 40], now: [60, 150], label: 'Google Search CPC in competitive fintech categories' },
  drivers: [
    { stat: 'Two', label: 'platforms carry almost all Indian fintech acquisition. Every brand bids on the same keywords, so the price only goes one way', src: 'cac' },
    { stat: 'Saturated', label: 'The urban, digitally active, financially literate audience has already been acquired. What is left is deeper or switched', src: 'cac' },
    { stat: 'Restricted', label: 'Cashback, aggressive referral and frictionless BNPL onboarding — the cheap tactics — are now curtailed by RBI guidance', src: 'cac' },
    { stat: 'Fatigued', label: 'The average urban smartphone user has been shown fintech ads for a decade. Marginal impact is measurably lower', src: 'cac' },
  ],
  src: 'cac',
};

/* ------------------------------------------------------ compliance checker */
/* The differentiator. Most agencies pitching fintech have not read these rules,
   and since January 2025 the restriction explicitly reaches the agency too. */

export const compliance = {
  question: 'What can a fintech brand legally do in its marketing?',
  answer:
    'More than most agencies assume, and less than most brands are already doing. Since the SEBI (Intermediaries) Amendment Regulations came into force, regulated entities — brokers, mutual funds, investment advisers, exchanges — are barred from associating with unregistered financial influencers, and that restriction extends to distributors, sub-brokers and the marketing agencies acting on their behalf. Educational content may only use market data on a three-month lag. Registered advisers must display their registration number and grievance redressal details. Performance claims, guaranteed returns and risk-free language remain the fastest route to an enforcement order.',
  items: [
    {
      tactic: 'Explainer content on how a product works',
      verdict: 'clear',
      body: 'Education is permitted and is the strongest asset in the category. Fee structures, mechanics, what happens to a user’s money.',
    },
    {
      tactic: 'Publishing your regulatory registration',
      verdict: 'clear',
      body: 'Registration number, contact details and grievance redressal are required disclosures for registered advisers — and useful trust signals for everyone else.',
    },
    {
      tactic: 'Comparison content on fees and limits',
      verdict: 'clear',
      body: 'Factual, sourced comparison is permitted and converts well, because it reaches people at the point they are actually deciding.',
    },
    {
      tactic: 'Creator campaigns with unregistered finfluencers',
      verdict: 'blocked',
      body: 'Regulated entities may not associate with unregistered financial influencers, and the restriction extends to marketing agencies working on their behalf. Verify registration before a brief is written, not after a post goes up.',
    },
    {
      tactic: 'Live or near-live market data in content',
      verdict: 'restricted',
      body: 'Educational content may use market price data only on a three-month lag. Real-time data inside “education” has been read as disguised tips.',
    },
    {
      tactic: '“Education” that recommends specific trades',
      verdict: 'blocked',
      body: 'The December 2025 order against a trading academy found that education framing does not protect operations that are effectively unregistered advisory. Format does not change what the content is.',
    },
    {
      tactic: 'Guaranteed returns or risk-free language',
      verdict: 'blocked',
      body: 'Unqualified performance claims are the single most common cause of an enforcement problem. There is a compliant way to talk about performance; this is not it.',
    },
    {
      tactic: 'Testimonials about outcomes',
      verdict: 'restricted',
      body: 'A user saying the product made them money is a performance claim wearing a different hat. Testimonials about experience — speed, support, clarity — are a different matter.',
    },
  ],
  disclaimer:
    'This is a working summary of published regulation, written for marketers. It is not legal advice, and rules differ by product and regulator. We work with your compliance team rather than around them, and flag creative likely to attract attention before it runs.',
  src: 'sebi',
};

/* ------------------------------------------------------------- what works */

export const engines = [
  {
    title: 'Content and organic search',
    body: 'A user who arrives from a search for “how to start a SIP” costs nothing to acquire and arrives with intent already formed. Fintechs that dismissed organic three years ago are now building content teams, because paid CAC made the case for them.',
    weight: 'Highest leverage, slowest to start',
  },
  {
    title: 'Embedded and partnership distribution',
    body: 'Integrating into ecosystems where the user already is — commerce checkouts, HR and payroll software, accounting tools. The cost is usually a revenue share rather than upfront spend, which sits far better against unit economics.',
    weight: 'Structural, needs product work',
  },
  {
    title: 'Creator content, done compliantly',
    body: 'Audiences built on financial curiosity convert better than cold traffic because trust already exists. The exposure sits with the brand, not the creator, so registration status and disclosure discipline are non-negotiable.',
    weight: 'High reach, high care',
  },
  {
    title: 'Onboarding as a marketing surface',
    body: 'If 82% of registrations never fund, the largest available gain is not in the ad account. Explaining why KYC needs what it needs, at the moment it is asked for, recovers more users than another creative round.',
    weight: 'Cheapest, most ignored',
  },
];

/* ------------------------------------------------------------ worked model */

export const model = {
  title: 'What optimising for the wrong step actually costs',
  caveat:
    'A model using the published benchmarks on this page — not an Instant Production client result. It assumes a wealth or broking product and a ₹10 lakh monthly budget. Your numbers will differ.',
  cols: ['Optimised to registration', 'Optimised to funded account'],
  rows: [
    { k: 'Reported cost per acquisition', a: '₹640', b: '₹640' },
    { k: 'Registrations bought', a: '1,560', b: '1,560' },
    { k: 'Registrations that fund', a: '18% — 281', b: '18% baseline' },
    { k: 'Real cost per funded account', a: '₹3,560', b: '₹3,560 at the start' },
    { k: 'What the team optimises next', a: 'Cheaper registrations', b: 'The KYC step and the creative that sets expectation' },
    { k: 'Where the next 10% comes from', a: 'More volume at the top', b: 'Funded rate 18% → 20%, which is 31 more accounts on the same spend' },
  ],
  closing:
    'Both columns spend the same money. The first buys more of a funnel that leaks in the same place; the second fixes the leak. Cost per funded account is the only number that tells you which one you are doing.',
};

/* ------------------------------------------------------------------- misc */

export const journey = [
  { title: 'Problem awareness', body: 'A specific financial frustration — a fee, a delay, an approval that never came — starts a search.', signal: 'Educational content wins the first contact' },
  { title: 'Legitimacy check', body: 'Registration status, founders, funding, press, app-store reviews. Often inside five minutes, on a phone, at night.', signal: 'Credibility assets do the selling' },
  { title: 'Comparison', body: 'Two or three alternatives held side by side on fees, limits and support quality.', signal: 'Comparison content beats brand advertising' },
  { title: 'Small first commitment', body: 'A token deposit or a single transaction to test whether it works as described.', signal: 'Onboarding is a marketing surface' },
];

export const faqs = [
  {
    q: 'Can our agency run influencer campaigns for us?',
    a: 'Only with registered creators. Since the SEBI (Intermediaries) amendment, regulated entities may not associate with unregistered financial influencers, and the restriction explicitly extends to marketing agencies acting on their behalf. In practice that means registration status is verified before a brief is written, disclosures are specified in the brief rather than left to the creator, and anything that reads as advice or an outcome claim does not go out. An agency that has not raised this with you has probably not read the regulation.',
  },
  {
    q: 'What should we be measuring instead of cost per install?',
    a: 'Cost per funded account, and the funded rate itself. Installs and registrations are cheap to buy and tell you almost nothing — about 18% of registrations reach funded status, so a campaign can halve its reported CPA while making the business worse. Track the step-by-step drop from registration through KYC start, KYC completion and first funding, and you will usually find the biggest available gain is in onboarding rather than in the ad account.',
  },
  {
    q: 'Why has our CAC gone up when nothing changed?',
    a: 'Because the auction changed around you. Search CPCs in competitive fintech categories now run roughly ₹60 to ₹150, against ₹25 to ₹40 three years ago, and almost all Indian fintech acquisition is concentrated on two platforms. Add a saturated urban audience and a decade of fintech advertising fatigue, and the same campaign gets more expensive without anyone doing anything wrong. The response is not a better bid strategy — it is a second acquisition engine that does not run through the auction.',
  },
  {
    q: 'Is educational content actually safe to publish?',
    a: 'Education is permitted and is the strongest thing you can publish in this category, but the framing does not create protection on its own. Market data in educational content may only be used on a three-month lag, and the December 2025 enforcement order against a trading academy turned on the finding that “education” which recommends specific trades is unregistered advisory regardless of what it is called. Teach mechanics, not positions.',
  },
  {
    q: 'How long before content starts producing?',
    a: 'Slower than paid and cheaper for longer. Realistically three to six months before organic contributes meaningfully, which is precisely why brands defer it and then find themselves fully dependent on an auction that gets worse every quarter. The honest framing is that content is not an alternative to paid this quarter. It is what stops paid from being your only option next year.',
  },
  {
    q: 'Do we need a consent banner for our marketing analytics?',
    a: 'It depends what you are running. Under the DPDP Act 2023 you need a lawful basis and clear notice for personal data, and most conventional ad and analytics stacks collect enough to require it. Cookieless, aggregate analytics generally does not. Worth resolving early, because retrofitting consent onto a live acquisition funnel is unpleasant and usually costs conversion.',
  },
];

export const services = [
  'Explainer and product video that survives a compliance review',
  'Comparison and fee-transparency content',
  'Performance marketing measured to funded accounts',
  'Onboarding and KYC-step conversion work',
  'Founder and thought-leadership content',
  'Creator programmes with registration and disclosure controls',
  'App store optimisation',
  'Answer-engine content for “how does X work” queries',
];
