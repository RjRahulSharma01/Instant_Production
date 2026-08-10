// Per-industry landing pages.
//
// Built for AEO as well as SEO. Research finding that drove the structure:
// AI Overviews overlap ~76% with organic rankings, but ChatGPT is only ~8% and
// Perplexity ~28%. Classic SEO alone will not get you cited in the assistants
// most buyers now use. What does: an answer-first block a model can lift
// verbatim, visible sourcing, and schema that matches what engines extract.
//
// So every page opens with `answer` — a short, self-contained, plain-language
// response to the question the page targets — before any marketing copy.

export const industryPages = {
  fintech: {
    slug: 'fintech',
    name: 'Fintech',
    accent: 'emerald',
    thumbnail: '/images/fintech-thumb.webp',
    eyebrow: 'Fintech Marketing',
    title: 'Marketing money products people are right to be careful with.',
    // Answer-first: written to be quotable by an answer engine.
    question: 'How do fintech companies in India market themselves?',
    answer:
      'Fintech marketing works differently from ordinary consumer marketing because the product asks for trust before it delivers value. The effective pattern is education first — explaining how the product works, what it costs and what happens to your money — followed by proof of legitimacy such as RBI or SEBI registration, and only then acquisition campaigns. Paid acquisition without the trust layer produces installs that never transact.',
    intro:
      'A user hands you their money or their data before they get anything back. Every piece of content has to close that gap, and every campaign runs inside advertising rules most agencies have never read.',
    stats: [
      { value: 68, suffix: '%', label: 'of fintech drop-off happens before the first transaction, not at signup' },
      { value: 3, suffix: 'x', label: 'longer consideration window than typical consumer apps' },
      { value: 45, suffix: '%', label: 'of users check regulatory status before depositing funds' },
    ],
    statNote: 'Directional benchmarks from category norms. Your numbers will differ — we measure yours before we plan.',
    challenges: [
      { title: 'Trust precedes everything', body: 'Nobody deposits money because your ad was clever. They deposit because they found nothing worrying when they checked. Content has to survive that check.' },
      { title: 'Advertising is regulated', body: 'Return claims, guaranteed outcomes and risk-free language attract regulator attention. There is a compliant way to talk about performance and we stay inside it.' },
      { title: 'Explaining without patronising', body: 'Your users are not stupid, they are cautious. Content that oversimplifies reads as evasive, which is the opposite of what you need.' },
      { title: 'Install is not the metric', body: 'Cost per install flatters everyone and predicts nothing. Cost per funded account is the number that matters.' },
    ],
    journey: [
      { title: 'Problem awareness', body: 'A specific financial frustration — fees, delays, access — sends them searching.', signal: 'Educational content wins the first contact' },
      { title: 'Legitimacy check', body: 'Registration status, founders, funding, press, app-store reviews. Often within minutes.', signal: 'Credibility assets do the selling' },
      { title: 'Comparison', body: 'Two or three alternatives held side by side on fees, limits and support.', signal: 'Comparison content beats brand advertising' },
      { title: 'Small first commitment', body: 'A small deposit or a trial transaction to test whether it actually works.', signal: 'Onboarding is a marketing surface' },
    ],
    channels: [
      { label: 'Organic & explainer content', value: 58, detail: 'Fee structures, how-it-works, comparisons. Reaches people while they are still deciding whether to trust the category at all.' },
      { label: 'App store & review platforms', value: 47, detail: 'Reviews are read as evidence, not opinion. Rating and recency both matter more here than in most categories.' },
      { label: 'Performance & paid social', value: 40, detail: 'Efficient for acquisition once trust content exists. Expensive and leaky without it.' },
      { label: 'PR & press credibility', value: 32, detail: 'Third-party coverage functions as proof of legitimacy in a way owned content cannot.' },
      { label: 'Creator & finfluencer', value: 24, detail: 'High reach, high compliance risk. Requires tight briefing and disclosure discipline.' },
    ],
    services: ['Explainer and product video', 'Comparison and fee-transparency content', 'Performance marketing to funded accounts', 'App store optimisation', 'Founder and thought-leadership content', 'Compliance-aware creative review'],
    faqs: [
      { q: 'How is fintech marketing different from normal digital marketing?', a: 'The order is reversed. Most categories build awareness then convert. Fintech has to establish legitimacy before awareness is worth anything, because a user who does not trust you will not convert no matter how many times they see your ad. That means education and proof come first, and acquisition spend comes after.' },
      { q: 'What can we legally claim about returns or performance?', a: 'Guaranteed returns, risk-free language and unqualified performance claims are the fastest route to a regulatory problem, and the rules differ by product and regulator. We work with your compliance team rather than around them, and flag creative that is likely to attract attention before it runs.' },
      { q: 'Should we be measuring cost per install?', a: 'Only as a diagnostic. Installs are cheap to buy and mean nothing on their own. The meaningful metric is cost per funded or transacting account, which is usually several times higher and tells you whether the acquisition is real.' },
      { q: 'Do finfluencer campaigns work for fintech?', a: 'They can reach large audiences quickly, but the compliance exposure sits with you, not the creator. Anything that reads as investment advice or an outcome claim is a problem. Where we run them, briefs and disclosures are tightly controlled.' },
    ],
  },

  ecommerce: {
    slug: 'ecommerce',
    name: 'E-commerce & D2C',
    accent: 'violet',
    thumbnail: '/images/e-commerece-thumb-industries.webp',
    eyebrow: 'E-commerce & D2C Marketing',
    title: 'Creative volume is the growth constraint. Not budget.',
    question: 'What actually limits growth for D2C brands on paid social?',
    answer:
      'For most D2C brands the constraint is creative supply, not media budget. Platform automation has removed most manual targeting levers, so the main controllable variable is how many genuinely different creative concepts you can test each month. Brands that ship creative continuously keep acquisition costs stable; brands that refresh quarterly watch costs climb as ads fatigue.',
    intro:
      'Meta and Google now automate most of what media buyers used to do by hand. What is left is creative — and the brands winning are simply producing more of it, faster, and killing losers sooner.',
    stats: [
      { value: 4, suffix: 'x', label: 'lower cost per click typical for UGC-style creative vs polished brand ads' },
      { value: 40, suffix: '%', label: 'better CPM commonly seen from creator-made assets' },
      { value: 21, suffix: 'd', label: 'typical useful life of a winning ad before fatigue sets in' },
    ],
    statNote: 'Category benchmarks, widely reported across paid social. Treat as directional until measured on your account.',
    challenges: [
      { title: 'Creative fatigue is constant', body: 'Every winning ad has a shelf life. Without a pipeline, performance decays and the account looks broken when it is simply tired.' },
      { title: 'Polished does not mean effective', body: 'Highly produced brand films frequently underperform a phone-shot creator video. The feed rewards native, not expensive.' },
      { title: 'Catalogue scale', body: 'Hundreds of SKUs need product content faster than a traditional shoot pipeline can supply it.' },
      { title: 'Attribution is messier than the dashboard suggests', body: 'Post-iOS attribution flatters some channels and hides others. Blended metrics tell more truth than platform-reported ROAS.' },
    ],
    journey: [
      { title: 'Interrupted', body: 'A scroll stops on something. Three seconds decides everything that follows.', signal: 'Hook quality is the whole game' },
      { title: 'Curiosity', body: 'Profile visit, site visit, or a quick search of your brand name plus "review".', signal: 'Social proof and reviews intercept here' },
      { title: 'Validation', body: 'Reviews, UGC, returns policy and delivery timelines checked before adding to cart.', signal: 'Objection-handling content converts' },
      { title: 'Purchase and repeat', body: 'First order is expensive. Second is where the margin lives.', signal: 'Retention content beats more acquisition spend' },
    ],
    channels: [
      { label: 'Paid social creative', value: 72, detail: 'The primary acquisition engine, and entirely dependent on creative supply to stay efficient.' },
      { label: 'Creator & UGC content', value: 61, detail: 'Cheaper to produce in volume, and consistently outperforms studio work in-feed.' },
      { label: 'Organic social & community', value: 38, detail: 'Slow to build, but reduces dependence on paid over time.' },
      { label: 'Search & shopping', value: 35, detail: 'Captures existing demand. Cannot create it.' },
      { label: 'Email & retention', value: 29, detail: 'The most under-invested channel in Indian D2C by a wide margin.' },
    ],
    services: ['High-volume ad creative', 'Creator and UGC pipelines', 'Product and catalogue video', 'Performance marketing', 'Landing page and CRO', 'Retention and lifecycle content'],
    faqs: [
      { q: 'How many ad creatives do we actually need each month?', a: 'More than most brands produce. For a meaningfully scaled account, ten to twenty genuinely different concepts a month is a reasonable floor — not fifteen colour variants of the same idea. The number matters less than the cadence: continuous beats occasional.' },
      { q: 'Is UGC better than professionally produced content?', a: 'For in-feed paid social, usually yes, because it looks native rather than like advertising. For brand films, product pages and anywhere the viewer is already paying attention, production quality still matters. Most brands need both and over-invest in the second.' },
      { q: 'Why did our ROAS drop when nothing changed?', a: 'Almost always creative fatigue. Frequency climbs, click-through falls, and CPMs rise as the platform works harder to find someone who has not already ignored the ad. Check performance broken down by creative and by frequency before touching targeting.' },
      { q: 'How fast can you produce product content at catalogue scale?', a: 'AI-assisted production changes the maths here — variants of an established concept take days rather than weeks. Hero product photography still benefits from a real shoot; the long tail generally does not need one.' },
    ],
  },

  education: {
    slug: 'education',
    name: 'Education & EdTech',
    accent: 'amber',
    thumbnail: '/images/educational-thumb-industries.webp',
    eyebrow: 'Education & EdTech Marketing',
    title: 'The person searching is rarely the person paying.',
    question: 'How does marketing for schools, colleges and edtech actually work?',
    answer:
      'Education marketing has a split audience: the student researches, the parent decides and pays, and they respond to entirely different messages. Students respond to outcomes, campus life and peer signals; parents respond to placement records, safety, fees and credibility. Effective campaigns run both tracks simultaneously and are timed to admission cycles rather than to a steady monthly calendar.',
    intro:
      'Two audiences, two sets of anxieties, one decision. Add an admission calendar that concentrates most of the year’s demand into a few months, and timing becomes as important as message.',
    stats: [
      { value: 2, suffix: '', label: 'distinct decision-makers in almost every enrolment' },
      { value: 70, suffix: '%', label: 'of enquiry volume concentrated in admission season' },
      { value: 90, suffix: 'd', label: 'typical research window before an application' },
    ],
    statNote: 'Directional category patterns. Cycles vary sharply by board, stream and geography.',
    challenges: [
      { title: 'Two audiences, one campaign', body: 'Speak only to students and parents block it. Speak only to parents and students disengage. Both tracks have to run.' },
      { title: 'Seasonality is brutal', body: 'Miss the admission window and the budget is wasted for a year. Content has to be built months ahead of the spike.' },
      { title: 'Outcome claims invite scrutiny', body: 'Placement and results claims must be substantiated. Unverifiable numbers damage trust faster than they attract applications.' },
      { title: 'Trust is generational', body: 'Parents weigh reputation, alumni and word of mouth heavily. Digital supports that; it rarely replaces it.' },
    ],
    journey: [
      { title: 'Exploration', body: 'Student searches courses, careers and "what can I do after". Broad and unfocused.', signal: 'Career-guidance content earns early attention' },
      { title: 'Shortlisting', body: 'Institutions compared on fees, placement, location and cut-offs.', signal: 'Comparison and transparency pages matter' },
      { title: 'Parent scrutiny', body: 'Parents enter the process. Placement records, safety, faculty and fees are examined.', signal: 'Credibility content aimed at parents' },
      { title: 'Application and follow-up', body: 'Enquiry made. Response speed and counselling quality decide the rest.', signal: 'Slow follow-up loses filled seats' },
    ],
    channels: [
      { label: 'Search & career content', value: 64, detail: 'Catches students early, while they are still working out what they want to do.' },
      { label: 'YouTube & long-form video', value: 55, detail: 'Campus tours, faculty and alumni stories. The format parents actually watch.' },
      { label: 'Paid search & social', value: 48, detail: 'Essential during admission season, wasteful outside it.' },
      { label: 'Counsellor & referral network', value: 41, detail: 'Still decisive in many markets, and frequently ignored by digital-only agencies.' },
      { label: 'Community & alumni', value: 30, detail: 'The most credible proof available, and the least systematically used.' },
    ],
    services: ['Admission campaign planning', 'Campus and facility films', 'Alumni and placement stories', 'Career-guidance content', 'Performance marketing by cycle', 'Counsellor enablement material'],
    faqs: [
      { q: 'When should we start marketing for admission season?', a: 'Content work should begin three to four months before enquiry volume rises, because search visibility takes time to build. Paid campaigns can start closer in. Institutions that begin when the season starts spend more per enquiry and get worse students.' },
      { q: 'Should campaigns target students or parents?', a: 'Both, separately. They have different anxieties and respond to different proof. Running one campaign that tries to speak to both usually persuades neither.' },
      { q: 'Can we advertise placement percentages?', a: 'Only if they are accurate, current and substantiated, and defined clearly enough that a reader knows what is being counted. Inflated placement claims are the most common trust failure in this category and increasingly attract regulatory attention.' },
      { q: 'Does YouTube really matter for education?', a: 'More than almost any other channel. It is where campus tours, faculty introductions and alumni stories are actually watched, often by the parent rather than the student, and often more than once before a decision.' },
    ],
  },

  beauty: {
    slug: 'beauty',
    name: 'Beauty & Wellness',
    accent: 'rose',
    thumbnail: '/images/bauty-thumb.webp',
    eyebrow: 'Beauty & Wellness Marketing',
    title: 'The only category where you can build demand from nothing.',
    question: 'How do beauty and wellness brands grow through content?',
    answer:
      'Beauty is one of the few categories where content creates demand rather than just capturing it — most purchases begin with seeing something, not searching for it. Growth comes from continuous creator-led content in volume, with the strongest-performing assets pushed into paid media. Because visual claims are easy to overstate, brands also need discipline about what before-and-after content can imply.',
    intro:
      'Nobody wakes up searching for a serum they have never heard of. They see it, then they want it. That makes content the demand engine rather than the demand capture.',
    stats: [
      { value: 82, suffix: '%', label: 'of category discovery happens on social, not search' },
      { value: 7, suffix: 'x', label: 'more content required than in considered-purchase categories' },
      { value: 60, suffix: '%', label: 'of purchases influenced by a creator the buyer already follows' },
    ],
    statNote: 'Directional category benchmarks. Skew varies significantly by price point and product type.',
    challenges: [
      { title: 'Content appetite is enormous', body: 'The feed consumes everything you make. Cadence matters more than perfection, and most brands cannot produce fast enough.' },
      { title: 'Claims are easy to overstate', body: 'Efficacy language and before-and-after imagery are the two fastest routes to a complaint, especially anywhere near a clinical service.' },
      { title: 'Creator dependence', body: 'Growth becomes tied to people you do not employ. Without an owned pipeline you are renting your entire acquisition channel.' },
      { title: 'Everything is imitated within weeks', body: 'A working format is copied fast. Differentiation has to be rebuilt continuously.' },
    ],
    journey: [
      { title: 'Passive discovery', body: 'It appears in the feed. No search, no intent, no problem awareness yet.', signal: 'Content creates the demand' },
      { title: 'Desire and doubt together', body: 'They want it and immediately wonder whether it works. Both feelings arrive at once.', signal: 'Proof content has to sit next to aspiration' },
      { title: 'Verification', body: 'Reviews, creator opinions, ingredient checks, Reddit. Fast, and often on a second device.', signal: 'UGC volume beats brand claims' },
      { title: 'Purchase and ritual', body: 'Repeat purchase depends on the product becoming a habit, not on the ad.', signal: 'Post-purchase content drives retention' },
    ],
    channels: [
      { label: 'Creator & influencer content', value: 78, detail: 'The dominant discovery mechanism. Nano and micro creators usually outperform macro on cost per acquisition.' },
      { label: 'Organic social & short form', value: 66, detail: 'Reels and shorts remain the cheapest reach available in this category.' },
      { label: 'Paid social', value: 52, detail: 'Amplifies what already works organically. Poor at making a weak asset perform.' },
      { label: 'Marketplace & review platforms', value: 37, detail: 'Where verification happens before purchase.' },
      { label: 'Search', value: 21, detail: 'Small at discovery, meaningful at the point of buying a known product.' },
    ],
    services: ['Creator programmes at scale', 'UGC production pipelines', 'Product and texture video', 'Social-first campaign creative', 'Performance marketing', 'Claims and compliance review'],
    faqs: [
      { q: 'How much content does a beauty brand actually need?', a: 'Far more than most brands plan for. Weekly is a floor rather than a target, and the volume has to come from a repeatable pipeline — usually creators — because an in-house team cannot sustain it alone.' },
      { q: 'Can we use before-and-after photos?', a: 'With care, and it depends entirely on the claim implied. Anything that reads as a guaranteed treatment outcome is risky, and if a clinical service or practitioner is involved, medical advertising rules apply on top of consumer ones. We will tell you where the line is for your specific product.' },
      { q: 'Nano, micro or macro creators?', a: 'Nano and micro creators typically deliver better cost per acquisition and more usable content volume. Macro creators buy reach and credibility. Most programmes we run are weighted heavily toward the smaller end, with a few larger names for visibility.' },
      { q: 'Does SEO matter in beauty?', a: 'Less for discovery, more than expected for conversion. People search a product by name after seeing it, and for ingredient and concern-led queries. It rarely creates demand but it frequently closes it.' },
    ],
  },

  'real-estate': {
    slug: 'real-estate',
    name: 'Real Estate',
    accent: 'sky',
    thumbnail: '/images/industries/real-estate.webp',
    eyebrow: 'Real Estate Marketing',
    title: 'A six-month decision that begins with a two-minute video.',
    question: 'How should real estate developers market projects online?',
    answer:
      'Property buying is a long, high-value, multi-person decision, so marketing has to sustain attention across months rather than convert in a session. What works is a combination of location and locality content that captures early research, walkthrough video that does the qualifying work before a site visit, and fast, well-organised follow-up — because in this category most leads are lost to slow response rather than to a competitor.',
    intro:
      'The largest purchase most families make, researched for months, decided by several people, and usually lost by whoever replied slowest.',
    stats: [
      { value: 6, suffix: 'mo', label: 'typical research window before a purchase decision' },
      { value: 3, suffix: '', label: 'or more people involved in the average family decision' },
      { value: 5, suffix: 'min', label: 'response window after which lead quality falls sharply' },
    ],
    statNote: 'Directional benchmarks. Cycles vary widely by ticket size, city and buyer type.',
    challenges: [
      { title: 'Long cycles break attribution', body: 'A lead from March that closes in September rarely gets credited to the campaign that created it, so the wrong channels get cut.' },
      { title: 'Speed decides outcomes', body: 'Response time is the single largest controllable variable, and it is usually a CRM problem rather than a marketing one.' },
      { title: 'Site visits are the real conversion', body: 'The job of content is not to sell the flat. It is to make the visit happen, and to make it happen with a qualified buyer.' },
      { title: 'Trust after delivery failures', body: 'The category carries reputational baggage. Transparency about timelines and approvals now outperforms aspiration.' },
    ],
    journey: [
      { title: 'Locality research', body: 'Area, connectivity, schools, prices. Often long before any specific project is considered.', signal: 'Locality content captures buyers early' },
      { title: 'Project shortlisting', body: 'Three to five projects compared on price, layout, amenities and builder reputation.', signal: 'Walkthrough video does the qualifying' },
      { title: 'Family consultation', body: 'Spouse, parents and sometimes children weigh in. Different priorities each.', signal: 'Shareable content matters more than a landing page' },
      { title: 'Site visit and negotiation', body: 'The visit converts. Everything before it exists to earn the visit.', signal: 'Follow-up speed decides who wins' },
    ],
    channels: [
      { label: 'Video walkthroughs & tours', value: 71, detail: 'Qualifies buyers before the visit and reduces wasted site traffic considerably.' },
      { label: 'Search & locality content', value: 58, detail: 'Reaches buyers during the long research phase, before they know the project exists.' },
      { label: 'Paid & portal listings', value: 54, detail: 'High volume, variable quality, expensive per qualified lead.' },
      { label: 'Referral & channel partners', value: 44, detail: 'Still a large share of closures in most Indian markets.' },
      { label: 'Social & community', value: 26, detail: 'Better for brand and progress updates than for direct lead generation.' },
    ],
    services: ['Project walkthrough films', 'Drone and location cinematography', 'Locality and area content', 'Performance marketing', 'Sales collateral and brochures', 'CRM and follow-up enablement'],
    faqs: [
      { q: 'What is the highest-impact thing we can fix?', a: 'Response time, almost always. Most developers spend heavily to generate leads and then take hours or days to call back. Fixing follow-up speed typically improves conversion more than increasing the media budget.' },
      { q: 'Do video walkthroughs actually reduce wasted site visits?', a: 'Yes, and that is the main argument for them. A buyer who has already seen the layout, the view and the finish arrives better informed and more serious. Your sales team spends its time on people who are genuinely considering rather than merely curious.' },
      { q: 'Are portal listings worth the spend?', a: 'They produce volume and poor average quality. They work best as one input alongside owned content, not as the entire acquisition strategy, and the cost per qualified lead is usually far higher than the cost per lead suggests.' },
      { q: 'How do we market a project that is not yet delivered?', a: 'Transparently. Show construction progress, approvals and realistic timelines rather than only rendered aspiration. In a category with a trust problem, verifiable progress is more persuasive than a better render.' },
    ],
  },
};

export const industrySlugs = Object.keys(industryPages);
