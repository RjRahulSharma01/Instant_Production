// Real Estate industry page — data layer.
//
// Same sourcing rule as the other deep-build industry pages. The compliance
// section summarises RERA advertising requirements as published; it is written
// for marketers, not as legal advice, and the page says so.

export const SOURCES = {
  cpl: {
    label: 'Indian real estate lead generation cost benchmarks, 2026',
    detail: 'Cost per qualified lead by segment, cost per site visit, channel allocation',
    url: 'https://aarmusmarketing.com/in/blog/real-estate-lead-generation-cost',
  },
  spend: {
    label: 'The real cost of real estate digital marketing in India, 2026',
    detail: 'Budget as a share of project revenue and the year-on-year cost escalation',
    url: 'https://pantheraa.com/blog/real-estate-marketing-cost-india.html',
  },
  rera: {
    label: 'Advertisement guidelines under RERA',
    detail: 'Registration prerequisite, mandatory disclosures, QR code requirements',
    url: 'https://tcrayandco.com/advertisement-guidelines-under-rera-an-overview/',
  },
  maharera: {
    label: 'MahaRERA disclosure enforcement in property advertisements',
    detail: 'What must appear in every advertisement, and how prominently',
    url: 'https://constrofacilitator.com/maharera-enforces-disclosure-rules-in-property-advertisements/',
  },
  penalty: {
    label: 'MahaRERA order — blurred registration number and QR code',
    detail: 'Penalty imposed for disclosures that appeared unclear in a newspaper advertisement',
    url: 'https://www.livelaw.in/consumer-cases/maharera-fines-promoter-for-publishing-newspaper-ad-without-clear-rera-registration-and-qr-code-518299',
  },
  agents: {
    label: 'Penalties for advertising without RERA registration',
    detail: 'Daily default penalties and the cap tied to unit cost',
    url: 'https://www.centrik.in/rera-case-laws/penalty-on-advertising-without-rera-registration-number',
  },
  stats: {
    label: 'Real estate marketing statistics, 2026',
    detail: 'Channel behaviour and buyer research patterns',
    url: 'https://insomniacs.in/blog/real-estate-marketing-statistics/',
  },
};

/* --------------------------------------------------------------- headline */

export const scale = [
  { value: '1 in 10', unit: '', label: 'leads becomes a site visit', note: 'And that ratio is considered excellent in India', src: 'cpl' },
  { value: '6–10', unit: '×', label: 'the lead cost, per site visit', note: 'The unit that actually predicts a booking', src: 'cpl' },
  { value: '₹3–8k', unit: '', label: 'healthy cost per residential site visit', note: 'Against ₹500–2,000 for a qualified lead', src: 'cpl' },
  { value: '20–30', unit: '%', label: 'yearly rise in acquisition cost', note: 'Compounding, across the sector', src: 'spend' },
];

/* ------------------------------------------------------- the core argument */

export const unit = {
  question: 'What should a developer actually measure in digital marketing?',
  answer:
    'Cost per site visit, not cost per lead. In Indian residential real estate roughly one lead in ten converts to a physical site visit, and that ratio is considered good — so a site visit costs six to ten times what a lead costs. A campaign can halve its cost per lead and raise its cost per site visit at the same time, simply by buying cheaper and less serious enquiries. Healthy cost per site visit for a residential project runs about ₹3,000 to ₹8,000, against ₹500 to ₹2,000 for a qualified lead.',
  cascade: [
    { label: 'Qualified lead', value: 100, cost: '₹500–2,000', note: 'What the media report optimises for' },
    { label: 'Contact made', value: 62, cost: '', note: 'Reached, and still interested' },
    { label: 'Site visit booked', value: 21, cost: '', note: 'Committed to a date' },
    { label: 'Site visit happened', value: 10, cost: '₹3,000–8,000', note: 'The unit that predicts a booking' },
  ],
  note: 'The 1-in-10 lead-to-visit ratio and the two cost bands are published benchmarks. The two middle steps are indicative of typical decay rather than separately sourced.',
  src: 'cpl',
};

/* ----------------------------------------------------------- by segment */

export const segments = {
  question: 'Why does luxury cost so much more per lead?',
  answer:
    'Because the audience is small, the consideration period is long, and the same handful of buyers are being targeted by every developer in the city at once. For mid-premium residential in the top eight Indian cities, a qualified lead at ₹500 to ₹2,000 is achievable with disciplined execution. Above a ₹3 crore ticket, the same qualified lead typically costs ₹3,500 to ₹6,000. The economics still work — the ticket size absorbs it — but the tolerance for a leaky follow-up process disappears entirely.',
  rows: [
    { label: 'Mid-premium residential, top-8 cities', lo: 500, hi: 2000, note: 'Achievable with disciplined execution and real qualification' },
    { label: 'Well-optimised campaigns, most cities', lo: 300, hi: 650, note: 'Intent keywords, qualifying landing pages, correct conversion tracking' },
    { label: 'Luxury, above ₹3 crore ticket', lo: 3500, hi: 6000, note: 'Small audience, long consideration, every developer bidding on it' },
  ],
  src: 'cpl',
};

/* ---------------------------------------------------------- channel mix */

export const channels = {
  items: [
    { label: 'Google — search and PMax', lo: 40, hi: 55, detail: 'Intent is already formed. Somebody searching “3 BHK in Whitefield” is further down the decision than any social audience.' },
    { label: 'Meta — Facebook and Instagram', lo: 30, hi: 45, detail: 'Where the project gets discovered and where the walkthrough gets watched. Cheap reach, softer intent.' },
    { label: 'Portals, YouTube and creators', lo: 10, hi: 25, detail: 'Portals bring volume with weak qualification. YouTube is where a long walkthrough actually gets watched to the end.' },
  ],
  budget: 'Most mid-size Indian developers run 2–5% of project revenue through digital. For a ₹50–200 crore project that is roughly ₹3–10 lakh a month.',
  src: 'cpl',
};

/* --------------------------------------------------------- compliance gate */

export const compliance = {
  question: 'What does RERA require in a property advertisement?',
  answer:
    'Registration first, then disclosure on everything. A promoter cannot advertise, market, book or offer a project for sale before it is registered with the state authority — which rules out pre-registration teaser campaigns entirely. Once registered, every advertisement must carry the RERA registration number, the authority’s website address and the project QR code, prominently and legibly. That applies to a newspaper page, a hoarding, a flyer, a social post and a reel cover equally. MahaRERA has penalised a developer for disclosures that appeared blurred and beyond recognition, and false promises in advertising carry penalties up to ₹10 lakh.',
  items: [
    {
      tactic: 'Project walkthrough and construction-progress video',
      verdict: 'clear',
      body: 'Permitted and among the strongest assets available, with the registration number and QR code present. Honest progress footage does more for a serious buyer than a rendered flythrough.',
    },
    {
      tactic: 'Locality, connectivity and amenity content',
      verdict: 'clear',
      body: 'Factual content about the area, transport links and what is genuinely nearby. It reaches buyers earlier than project advertising and is not a promise about the project.',
    },
    {
      tactic: 'RERA number and QR code on every asset',
      verdict: 'clear',
      body: 'Required — and worth treating as a design constraint rather than an afterthought. It has to be legible at the size the asset is actually viewed, which is where most reel covers fail.',
    },
    {
      tactic: 'Marketing before project registration',
      verdict: 'blocked',
      body: 'A promoter may not advertise, market, book or offer for sale before the project is registered with the state authority. Pre-launch teaser campaigns are the most common and most serious violation in the category.',
    },
    {
      tactic: 'Renders shown without labelling them',
      verdict: 'restricted',
      body: 'Artist impressions are permitted and normal. Presenting one as the built product is where it becomes a misleading claim — label it, and show real progress alongside it.',
    },
    {
      tactic: 'Assured returns or guaranteed appreciation',
      verdict: 'blocked',
      body: 'A promise about future value is a false promise the moment it is not delivered, and false promises in advertising carry penalties up to ₹10 lakh. There is no compliant way to phrase a guarantee.',
    },
    {
      tactic: 'Small or blurred disclosures',
      verdict: 'blocked',
      body: 'MahaRERA has penalised a developer specifically because the registration number and QR code appeared blurred and beyond recognition. Present but illegible is treated as absent.',
    },
    {
      tactic: 'Channel partners advertising on your behalf',
      verdict: 'restricted',
      body: 'Agents must be registered, and an unregistered agent faces penalties of ₹10,000 per day of default, capped at 5% of the unit cost. Their creative carries your project name, so their compliance becomes your exposure.',
    },
  ],
  disclaimer:
    'A working summary of published RERA requirements, written for marketers. It is not legal advice, and requirements differ between states — Maharashtra is the most prescriptive and is not identical to Karnataka or Haryana. We work with your legal and RERA compliance teams rather than around them.',
  src: 'rera',
};

/* ------------------------------------------------------------- the journey */

export const journey = {
  question: 'How long does a property decision actually take?',
  answer:
    'Months, and it starts long before anyone fills in a form. A buyer researches the locality, watches walkthroughs, compares three or four projects, discusses it at home, and only then submits an enquiry — by which point most of the decision has already been made. That is why the content a developer publishes before the enquiry matters more than the follow-up after it, and why cutting content budget to fund media almost always raises cost per site visit.',
  steps: [
    { title: 'Locality research', body: 'Schools, commute, water, what the area will look like in five years. Nothing project-specific yet.', signal: 'Locality content reaches them first' },
    { title: 'Project shortlist', body: 'Three or four projects held side by side on price, layout, possession date and builder reputation.', signal: 'Walkthroughs and honest progress footage win here' },
    { title: 'Household discussion', body: 'The decision is made at home, by people who have not seen your advertising, from what the buyer shows them.', signal: 'Shareable assets do the work you cannot' },
    { title: 'Enquiry and site visit', body: 'The form is submitted late, and the visit is the real evaluation. Most of the decision preceded both.', signal: 'The visit confirms; it rarely persuades' },
  ],
  src: 'stats',
};

/* ------------------------------------------------------------ worked model */

export const model = {
  title: 'What optimising cost per lead actually does',
  caveat:
    'A model built from the published benchmarks on this page — not an Instant Production client result. It assumes a mid-premium residential project and a ₹6 lakh monthly digital budget. Your numbers will differ.',
  cols: ['Optimised to cost per lead', 'Optimised to cost per site visit'],
  rows: [
    { k: 'Cost per lead achieved', a: '₹600', b: '₹1,400' },
    { k: 'Leads bought', a: '1,000', b: '429' },
    { k: 'Lead-to-visit rate', a: '4% — cheaper leads, weaker intent', b: '14% — qualified, and expecting the call' },
    { k: 'Site visits', a: '40', b: '60' },
    { k: 'Cost per site visit', a: '₹15,000', b: '₹10,000' },
    { k: 'What the report shows', a: 'Cost per lead down 57%', b: 'Cost per lead up 133%' },
  ],
  closing:
    'The first column looks like a better quarter on every slide anyone will present. It produced a third fewer site visits on the same money. Cost per lead is the number that is easiest to improve and the least connected to whether anything sold.',
};

/* --------------------------------------------------------------------- faq */

export const faqs = [
  {
    q: 'Our cost per lead dropped. Why did bookings not move?',
    a: 'Because cost per lead is the easiest metric in this category to improve and the least connected to revenue. Roughly one lead in ten becomes a site visit, and that ratio collapses when leads get cheaper — broader targeting and softer offers buy enquiries from people who were never going to visit. Track cost per site visit instead. Healthy is about ₹3,000 to ₹8,000 for a residential project, and it is the number that moves with bookings.',
  },
  {
    q: 'Can we run a teaser campaign before RERA registration?',
    a: 'No. A promoter may not advertise, market, book or offer a project for sale before it is registered with the state authority, and this is the most serious advertising violation available in the category. Pre-registration you can build the brand, the locality content and the audience — none of which names or prices the unregistered project. The moment a specific project is advertised, registration has to already exist.',
  },
  {
    q: 'Does the RERA number really need to be on a reel cover?',
    a: 'Yes, and legibly. The requirement covers advertisements in every medium — newspaper, hoarding, flyer, social post, reel cover — and MahaRERA has penalised a developer specifically because the registration number and QR code appeared blurred and beyond recognition. Present but unreadable is treated as absent. Practically, this means designing the disclosure into the template at the size the asset is actually viewed, rather than adding it afterwards at whatever size fits.',
  },
  {
    q: 'What should the channel split look like?',
    a: 'Roughly 40 to 55 percent Google, 30 to 45 percent Meta, and the remainder across portals, YouTube and creators. Google carries formed intent — somebody searching a locality and configuration is further down the decision than any social audience. Meta creates discovery and carries the walkthrough. Portals bring volume with weak qualification, which is fine as long as you are pricing them on site visits rather than leads.',
  },
  {
    q: 'Is video worth the production cost for a single project?',
    a: 'For a project running eighteen to thirty-six months, yes — and the useful version is not the rendered flythrough. Construction-progress footage published monthly does something no render can: it proves the project is real and moving, to a buyer whose main fear is that it will not be delivered. It is also the cheapest content a developer can make, because the site is already there.',
  },
  {
    q: 'How much should we be spending?',
    a: 'Most mid-size Indian developers run 2 to 5 percent of project revenue through digital, which for a ₹50 to ₹200 crore project is roughly ₹3 to ₹10 lakh a month. The more useful question is the split between media and content. Acquisition costs are climbing 20 to 30 percent a year, so a budget that is entirely media buys less every year by construction — whereas locality and progress content keeps working across the whole sales cycle and into the next project in the same micro-market.',
  },
];

export const services = [
  'Construction-progress video, published on a monthly cadence',
  'Project walkthroughs and honest site footage',
  'Locality, connectivity and infrastructure content',
  'RERA-compliant creative templates with disclosure built in',
  'Performance marketing measured to cost per site visit',
  'Channel-partner creative kits with compliance controls',
  'Landing pages that qualify rather than just capture',
  'Answer-engine content for locality and project comparison queries',
];
