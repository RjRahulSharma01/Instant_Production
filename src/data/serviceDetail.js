// Long-form content for the five services that get their own page.
// Keyed by the service id in services.js.
export const serviceDetail = {
  'ai-content-strategy': {
    metaTitle: 'AI Content Strategy',
    metaDescription:
      'AI-assisted content strategy: audience research, content pillars, hook testing and a publishing plan built on what actually performs.',
    lede:
      'Most content fails before anything is filmed. The angle was never tested, the audience was assumed, and the brief was a list of deliverables rather than a hypothesis. Strategy is where that gets fixed.',
    outcomes: [
      'A content plan tied to a commercial goal, not a posting quota',
      'Hooks and angles pressure-tested before production budget is committed',
      'A clear view of which pillars earn attention and which quietly do not',
    ],
    process: [
      { step: 'Audience and competitor mapping', body: 'We look at what your buyers actually search, watch and skip, and where competitors are already saturating attention.' },
      { step: 'Pillar definition', body: 'Three to five themes you can own credibly, each mapped to a stage of the buying journey.' },
      { step: 'Hook testing', body: 'AI lets us generate and screen dozens of angles cheaply, so the ones we produce start from evidence rather than instinct.' },
      { step: 'Publishing plan', body: 'Formats, cadence and channels, with a measurement frame agreed up front.' },
    ],
    deliverables: ['Strategy document', 'Content pillar map', 'Tested hook bank', '90-day publishing calendar', 'Measurement framework'],
    faqs: [
      { q: 'How is AI actually used here?', a: 'For breadth and speed: clustering audience research, generating angle variations, and screening hooks against past performance patterns. The judgement about what fits your brand and what to commit budget to stays human. AI shortens the exploration, it does not replace the decision.' },
      { q: 'How long does a strategy engagement take?', a: 'Two to three weeks for a full strategy, depending on how much existing performance data you can share. If you need something faster we can run a compressed one-week version focused on a single campaign.' },
      { q: 'Do we have to use you for production afterwards?', a: 'No. The strategy is yours and is written to be executed by any competent team, including your in-house one. Most clients do continue with us because the handover is shorter, but it is not a condition.' },
      { q: 'What if we already have a content strategy?', a: 'Then we audit it rather than rewrite it. Often the strategy is sound and the problem is execution cadence or measurement, which is a cheaper fix than starting again.' },
    ],
  },

  'ai-videos': {
    metaTitle: 'AI Video Production',
    metaDescription:
      'AI video production for ads, product films and brand stories. Cinematic output in days rather than weeks, at a fraction of a full shoot.',
    lede:
      'Generative video has moved past novelty. Used well it produces broadcast-credible work in days, and more usefully it makes producing ten variants of an idea as cheap as producing one.',
    outcomes: [
      'Campaign-ready video without a location, crew or shoot day',
      'Ten variants of a concept for roughly the cost of one traditional edit',
      'Turnaround measured in days, so campaigns are not gated by production',
    ],
    process: [
      { step: 'Concept and script', body: 'We write to the hook first. Whatever the tool, a weak first three seconds is still a weak video.' },
      { step: 'Look development', body: 'Style frames and reference locked before generation, so the output is deliberate rather than whatever the model felt like.' },
      { step: 'Generation and direction', body: 'Iterative passes with human direction between them. This is the difference between AI video that looks intentional and AI video that looks generated.' },
      { step: 'Finish', body: 'Grade, sound, captions and platform-specific cutdowns.' },
    ],
    deliverables: ['Master film', 'Platform cutdowns (9:16, 1:1, 16:9)', 'Caption files', 'Variant set for testing', 'Source project files'],
    faqs: [
      { q: 'Will it look obviously AI-generated?', a: 'That depends entirely on direction and finishing, which is where most AI video falls down. We treat generation as one step in a normal production pipeline, with look development before it and grading and sound after. Some briefs still suit a real shoot better, and we will say so.' },
      { q: 'Can you use our existing footage or product shots?', a: 'Yes, and it usually improves the result. Real product footage combined with generated environments tends to outperform fully synthetic work, particularly for anything where the viewer already knows what the product should look like.' },
      { q: 'Who owns the output?', a: 'You do. We hand over the finished masters and the project files. We will also tell you which tools were used, which matters if you have client or platform disclosure obligations.' },
      { q: 'How fast is fast?', a: 'A single ad variant in two to three days once the concept is locked. A full campaign set in one to two weeks. The bottleneck is almost always approvals, not generation.' },
    ],
  },

  'performance-marketing': {
    metaTitle: 'Performance Marketing',
    metaDescription:
      'Paid campaigns on Meta, Google and YouTube managed to ROAS and CAC. Creative testing, targeting and budget tuned weekly against revenue.',
    lede:
      'Media buying is not the hard part any more, because the platforms automate most of it. What still decides outcomes is creative volume, testing discipline, and being honest about what the numbers say.',
    outcomes: [
      'Campaigns reported on ROAS and CAC, not impressions and reach',
      'A creative testing loop that keeps CPMs from drifting up as ads fatigue',
      'Spend concentrated on what converts and cut from what does not, weekly',
    ],
    process: [
      { step: 'Tracking audit', body: 'Before spending anything we check that conversions are actually being measured correctly. This step finds problems more often than not.' },
      { step: 'Account structure', body: 'Clean campaign architecture so results are attributable and budget can move without relearning.' },
      { step: 'Creative testing loop', body: 'New concepts in continuously, losers cut fast. Creative is the main lever left, so it gets the most attention.' },
      { step: 'Weekly optimisation', body: 'Budget reallocation, audience and placement exclusions, and a plain-English report on what changed and why.' },
    ],
    deliverables: ['Tracking and pixel audit', 'Campaign build', 'Creative testing calendar', 'Weekly performance report', 'Monthly strategy review'],
    faqs: [
      { q: 'What is the minimum monthly ad spend you work with?', a: 'Below roughly 1.5 lakh a month there is not enough data to test creative properly, so you would be paying for management that cannot yet earn its fee. We will tell you honestly if you are better off waiting or running it in-house for now.' },
      { q: 'Do you charge a percentage of ad spend?', a: 'We can work either way, but a flat retainer avoids the obvious conflict where the agency is rewarded for spending more of your money. We will walk you through both.' },
      { q: 'How quickly should we expect results?', a: 'Two to four weeks to get tracking clean and a baseline established, then improvement compounds as creative testing accumulates. Anyone promising a specific ROAS in week one has not audited your account.' },
      { q: 'Can you work with creative we already have?', a: 'Yes, and we will test it before replacing it. Sometimes existing creative performs fine and the problem is structure or targeting, which is a much faster fix.' },
    ],
  },

  'influencer-marketing': {
    metaTitle: 'Influencer Marketing',
    metaDescription:
      'Influencer and UGC campaigns with a 10,000+ creator network. Creator sourcing, content production, whitelisting and paid amplification.',
    lede:
      'Sourcing creators is the easy part. What separates a campaign that moves revenue from one that just generates posts is what happens to the content afterwards.',
    outcomes: [
      'Creators matched to your actual audience, not just their follower count',
      'UGC produced in volume and cleared for paid use from the outset',
      'The best-performing creator content amplified through whitelisting',
    ],
    process: [
      { step: 'Creator matching', body: 'From a network of 10,000+ UGC, nano, micro and macro creators, selected on audience overlap and past content quality rather than reach alone.' },
      { step: 'Brief and rights', body: 'Clear creative direction plus usage rights agreed up front, so strong content is not stranded outside paid media.' },
      { step: 'Production', body: 'Creators shoot, we quality-control and edit into platform-native cuts.' },
      { step: 'Amplification', body: 'Winners pushed into paid via whitelisting and partnership ads, where creator content typically outperforms brand-made ads on CPM and CPC.' },
    ],
    deliverables: ['Creator shortlist with rationale', 'Creative briefs', 'UGC asset library', 'Usage rights documentation', 'Performance report by creator'],
    faqs: [
      { q: 'How do you choose creators?', a: 'Audience overlap with your buyers, engagement quality rather than raw follower count, and whether their existing content style suits the brief. A creator with 8,000 genuinely relevant followers usually beats one with 200,000 loosely relevant ones.' },
      { q: 'Do we get to use the content in our ads?', a: 'Yes, provided we agree usage rights in the brief, which we always do. This is the most common failure in influencer campaigns: a brand ends up with content that performed well organically but cannot legally be run as paid media.' },
      { q: 'Nano, micro or macro, which is right for us?', a: 'It depends on the goal. Nano and micro creators tend to produce better cost per acquisition and more usable UGC volume. Macro creators buy reach and credibility. Most campaigns we run are weighted toward the smaller end.' },
      { q: 'How is it measured?', a: 'On downstream revenue where attribution allows, and on the paid performance of creator assets where it does not. Reach and engagement are reported, but they are not what we optimise for.' },
    ],
  },

  'website-development': {
    metaTitle: 'Website Development',
    metaDescription:
      'Fast, search-ready websites and landing pages built to convert. Core Web Vitals, technical SEO and conversion tracking included.',
    lede:
      'A slow site quietly taxes everything else you spend money on. Every second of load time costs conversions on traffic you have already paid to acquire.',
    outcomes: [
      'Pages that load fast enough not to lose the visit before it starts',
      'Technical SEO handled at build time rather than retrofitted',
      'Conversion tracking working from day one, so paid spend is measurable',
    ],
    process: [
      { step: 'Structure and content', body: 'Page architecture mapped to search intent and buying stage before any design happens.' },
      { step: 'Design and build', body: 'Built to your brand system, responsive from the smallest phone up, and accessible by default.' },
      { step: 'Performance', body: 'Image optimisation, code splitting and Core Web Vitals treated as a build requirement, not a later fix.' },
      { step: 'Launch and measure', body: 'Analytics, conversion events and search console configured and verified before handover.' },
    ],
    deliverables: ['Responsive website or landing pages', 'CMS setup where needed', 'Technical SEO configuration', 'Analytics and conversion tracking', 'Handover documentation'],
    faqs: [
      { q: 'What do you build on?', a: 'Usually React with a headless CMS for anything content-heavy, or a static build for marketing sites where speed matters most. We pick based on who will maintain it after handover, not on what we prefer to write.' },
      { q: 'Can you work with our existing site?', a: 'Often yes. A performance and SEO pass on an existing site is frequently better value than a rebuild. We will audit first and tell you honestly which one you need.' },
      { q: 'How long does a site take?', a: 'A landing page in one to two weeks. A full marketing site in four to six, with content readiness usually the deciding factor rather than build time.' },
      { q: 'Do you handle hosting?', a: 'We deploy to your own accounts, typically Vercel or similar, so you own the infrastructure and are never locked in to us. We document everything at handover.' },
    ],
  },
};

export const detailedServiceIds = Object.keys(serviceDetail);
