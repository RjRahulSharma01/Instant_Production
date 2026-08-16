// Service detail pages.
//
// Rewritten to match the depth of the industry pages. Every service now carries:
//
//   question / answer   an answer-first block written to be quoted verbatim by
//                       an answer engine — the single highest-value addition
//   metric              the one number the service is measured on, which ties
//                       each service back to the argument its industry pages make
//   misconception       the belief we most often have to correct on a first call
//   notFor              when this is genuinely the wrong thing to buy. Nothing
//                       else on the site earns trust as cheaply as this does
//   engagement          how the work is actually bought and what a month looks
//                       like. No prices — those depend on scope and inventing
//                       them would breach the claims rule in the guidelines
//   pairs               related services and industries, for real internal links
//
// Plus the original lede, outcomes, process, deliverables and faqs.

export const serviceDetail = {
  /* ==================================================== AI content strategy */
  'ai-content-strategy': {
    metaTitle: 'AI Content Strategy',
    metaDescription:
      'AI-assisted content strategy: audience research, content pillars, hook testing and a publishing plan built on what actually performs.',
    lede:
      'Most content fails before anything is filmed. The angle was never tested, the audience was assumed, and the brief was a list of deliverables rather than a hypothesis. Strategy is where that gets fixed.',

    question: 'What does an AI content strategy actually produce?',
    answer:
      'A decision about what to make, for whom, and why it should work — before production money is committed. The AI part is breadth: clustering audience research, generating dozens of angle variations, and screening them against past performance patterns in hours rather than weeks. The judgement about what fits the brand and what to fund stays human. What you receive is a pillar map, a tested hook bank, a publishing plan and an agreed measurement frame.',

    metric: {
      label: 'Measured on',
      value: 'Cost per tested concept',
      body: 'Not posts published. If strategy is working, the cost of learning whether an angle performs falls sharply — which is the only thing that makes a testing cadence affordable.',
    },

    misconception: {
      wrong: '“We need a content strategy” usually means “we need more content”.',
      right:
        'Most brands who ask for strategy already produce plenty. What they lack is a reason to believe any particular piece will work, which is why output feels busy and results feel flat. Strategy is the thing that makes the next hundred assets cheaper to be right about.',
    },

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

    engagement: {
      shape: 'Fixed-scope project, two to three weeks',
      cadence: 'Kick-off, a research readout in week one, a working session on pillars, then the plan',
      commitment: 'No retainer required. The strategy is written to be executed by any competent team, including yours',
    },

    notFor: [
      'Brands with no distribution yet. A strategy is worth little until there is somewhere to publish and a budget to test with — build the channel first.',
      'Teams looking for a document to satisfy a board. We will write something useful and it will contain uncomfortable conclusions, which is not always what is wanted.',
      'Anyone who needs assets next week. Strategy takes two to three weeks and delays production by exactly that much. Sometimes shipping is the right call.',
    ],

    pairs: {
      services: [['Video production', '/services/video-production'], ['Performance marketing', '/services/performance-marketing']],
      industries: [['E-commerce & D2C', '/industries/ecommerce'], ['Education & EdTech', '/industries/education']],
    },

    faqs: [
      { q: 'How is AI actually used here?', a: 'For breadth and speed: clustering audience research, generating angle variations, and screening hooks against past performance patterns. The judgement about what fits your brand and what to commit budget to stays human. AI shortens the exploration, it does not replace the decision.' },
      { q: 'How long does a strategy engagement take?', a: 'Two to three weeks for a full strategy, depending on how much existing performance data you can share. If you need something faster we can run a compressed one-week version focused on a single campaign.' },
      { q: 'Do we have to use you for production afterwards?', a: 'No. The strategy is yours and is written to be executed by any competent team, including your in-house one. Most clients do continue with us because the handover is shorter, but it is not a condition.' },
      { q: 'What if we already have a content strategy?', a: 'Then we audit it rather than rewrite it. Often the strategy is sound and the problem is execution cadence or measurement, which is a cheaper fix than starting again.' },
    ],
  },

  /* ============================================================= AI videos */
  'ai-videos': {
    metaTitle: 'AI Video Production',
    metaDescription:
      'Generative video for ads, product and brand work — used where it genuinely outperforms a shoot, and not where it does not.',
    lede:
      'Generative video is cheap and fast, which makes it easy to use for the wrong brief. The useful question is not whether it looks good enough. It is which briefs it suits, and the honest answer is narrower than most agencies selling it will admit.',

    question: 'When is AI video actually the right choice?',
    answer:
      'When you need many variants rather than one perfect asset, when the environment matters more than the person, or when the shot is impossible or uneconomic to film. It is the wrong choice when the viewer can verify the subject against reality — recognisable faces, your actual product in someone’s hands, food, fabric — because the small wrongnesses read as cheap rather than stylised. In practice the strongest work is mixed: real product footage in generated environments, or a filmed hero with generated variations for testing.',

    metric: {
      label: 'Measured on',
      value: 'Cost per usable variant',
      body: 'The economics of generation are the opposite of production: the fifteenth version costs almost nothing once the first exists. That is the whole advantage, and it only matters if you are actually testing.',
    },

    misconception: {
      wrong: '“AI video will replace our shoots.”',
      right:
        'It replaces the shoots you were never going to fund. The realistic effect is that brands make far more content, not that they cancel the camera — and the shot the whole campaign hangs on is still usually filmed.',
    },

    outcomes: [
      'Enough variants to run a real test, at a cost that makes testing rational',
      'Concepts that were previously uneconomic to shoot',
      'A clear internal rule for what gets generated and what gets filmed',
    ],
    process: [
      { step: 'Brief triage', body: 'We decide, honestly, which parts of the brief suit generation and which need a camera. This conversation saves more money than anything else we do.' },
      { step: 'Concept and look development', body: 'Reference frames and motion tests before anything is rendered at length, so the direction is agreed cheaply.' },
      { step: 'Generation and iteration', body: 'Volume production of variants, reviewed in batches. Most of the value is in what gets rejected.' },
      { step: 'Finish and versioning', body: 'Grade, captions, audio, and export to every aspect ratio and length the media plan needs.' },
    ],
    deliverables: ['Master film', 'Variant set for testing', 'Vertical and square cuts', 'Captioned versions', 'Source files and prompt documentation'],

    engagement: {
      shape: 'Per project, or a monthly volume commitment',
      cadence: 'Concept in week one, first variants in week two, iteration from there',
      commitment: 'Project work suits a launch. Monthly volume suits an account that is actively testing',
    },

    notFor: [
      'Anything where the viewer knows exactly what the subject should look like. Your real product in detail, recognisable people, food and fabric all still want a camera.',
      'Briefs needing a specific human performance. Generated performance sits somewhere between serviceable and slightly unsettling, which is a bad range for a brand film.',
      'Brands not running tests. If one asset goes out and stays out, generation’s cost curve gives you nothing — you are paying for breadth you will not use.',
    ],

    pairs: {
      services: [['AI content strategy', '/services/ai-content-strategy'], ['Performance marketing', '/services/performance-marketing']],
      industries: [['E-commerce & D2C', '/industries/ecommerce'], ['Beauty & Wellness', '/industries/beauty']],
    },

    faqs: [
      { q: 'Will it look obviously AI-generated?', a: 'Sometimes, and that is the honest answer. Environments, abstract sequences and stylised work hold up well. Close product detail and human performance are where it still shows. We will tell you which side of that line your brief sits on before you commit budget, because discovering it afterwards is expensive.' },
      { q: 'Can you match our existing brand film?', a: 'Usually close enough to sit alongside it in a feed, not close enough to intercut with it in a single edit. If continuity matters, the practical route is filming the hero and generating the variations around it.' },
      { q: 'Who owns the output?', a: 'You do. We hand over masters, versioned exports and the prompt documentation, so the work can be extended by anyone later — including a different agency.' },
      { q: 'Do you disclose that it is AI-generated?', a: 'Where an asset is materially generated and the context is factual, yes. That is our own brand rule and in some categories it is also a regulatory one. It is rarely a commercial problem; presenting generated footage as documentary is.' },
    ],
  },

  /* ================================================== performance marketing */
  'performance-marketing': {
    metaTitle: 'Performance Marketing',
    metaDescription:
      'Paid acquisition run to contribution margin, not to a dashboard metric. Creative volume, honest measurement, and the number that predicts revenue.',
    lede:
      'Most accounts are not badly managed. They are optimised for a number that sits several steps above revenue — installs instead of funded accounts, leads instead of site visits, ROAS instead of contribution margin.',

    question: 'What actually improves paid performance in 2026?',
    answer:
      'Creative volume and honest measurement, in that order. Broad targeting and automated placement removed most of the manual levers, so the creative is now the main controllable variable — and in competitive Indian categories a creative fatigues in 21 to 35 days, against 45 to 60 four years ago. The second lever is measuring the step that predicts revenue rather than the one that is cheapest to improve. A campaign can halve its reported cost per acquisition while making the business worse.',

    metric: {
      label: 'Measured on',
      value: 'Contribution margin, not ROAS',
      body: 'ROAS moves with attribution settings, discounting and returns. Contribution margin does not. It is the number we report against, and it is usually less flattering than the one you have been shown.',
    },

    misconception: {
      wrong: '“Our ROAS dropped, so the media buying got worse.”',
      right:
        'It is almost always one of three things and only one is media: the creative fatigued and CTR fell first; or the attribution window changed and identical performance now reads 30–45% lower; or your iOS share grew and measured ROAS fell while real revenue held. Diagnose in that order.',
    },

    outcomes: [
      'A creative cadence that clears your category’s fatigue window',
      'Reporting on the step that predicts revenue, not the one that flatters the account',
      'A written view of what we would stop spending on, and why',
    ],
    process: [
      { step: 'Measurement audit', body: 'Before touching spend we establish what is actually being counted, what the attribution window is doing, and where the real conversion step sits.' },
      { step: 'Creative volume plan', body: 'How many concepts a month your category needs to keep testing, and what it costs to produce them.' },
      { step: 'Structured testing', body: 'Concepts tested against each other rather than sequentially, so a winner is identifiable rather than inferred.' },
      { step: 'Reallocation', body: 'Monthly, against contribution margin. Including the things we recommend switching off.' },
    ],
    deliverables: ['Measurement audit', 'Creative testing framework', 'Monthly performance review', 'Contribution margin reporting', 'A documented stop-spend list'],

    engagement: {
      shape: 'Monthly retainer, with a first-month audit',
      cadence: 'Weekly optimisation, monthly review against margin, quarterly strategy',
      commitment: 'Three months minimum, because a testing cadence needs at least one full fatigue cycle to prove anything',
    },

    notFor: [
      'Brands that cannot fund creative volume. If the budget only covers media, the account will plateau within a quarter and no amount of optimisation will move it.',
      'Anyone who needs a specific ROAS guaranteed. We will not promise one, and any agency that does is either guessing or planning to change how it is measured.',
      'Accounts under about ₹2 lakh a month. Below that there is not enough signal to test with, and you are better served by organic and creator work first.',
    ],

    pairs: {
      services: [['Video production', '/services/video-production'], ['AI content strategy', '/services/ai-content-strategy']],
      industries: [['Fintech', '/industries/fintech'], ['Real Estate', '/industries/real-estate']],
    },

    faqs: [
      { q: 'How many creatives do you need a month?', a: 'Enough to refresh inside your category’s fatigue window and still have variants left to test. In competitive Indian D2C that window is 21 to 35 days, so a brand running three or four active ad sets typically needs 15 to 30 assets a month. Four a month means refreshing on a 60-day cycle in a market whose creative fatigues in 30.' },
      { q: 'Why do you refuse to report ROAS as the headline?', a: 'Because it is the easiest number in the account to improve and the least connected to whether the business made money. It moves with attribution window, discount depth and return rate, none of which are media decisions. We report it, we just do not manage to it.' },
      { q: 'Will you work alongside our in-house team?', a: 'Frequently, and it usually works better than a full handover. The most common split is that we run creative volume and testing while the in-house team owns the account and the budget decisions.' },
      { q: 'What happens in month one?', a: 'Mostly measurement. We establish what is genuinely being counted before changing spend, because optimising against a broken conversion signal is how accounts get quietly worse while the reporting improves.' },
    ],
  },

  /* =================================================== influencer marketing */
  'influencer-marketing': {
    metaTitle: 'Influencer Marketing',
    metaDescription:
      'Creator programmes with usage rights, whitelisting and disclosure agreed in the brief — and measured on cost per acquisition, not reach.',
    lede:
      'Brands run creator campaigns, get good organic numbers, and then discover they cannot legally use the best content in ads. The fix costs nothing and happens at the briefing stage, which is exactly when nobody is thinking about it.',

    question: 'What makes a creator campaign actually work commercially?',
    answer:
      'Deciding what happens to the content after the post, before the creator is briefed. Three things need to be agreed up front: paid usage rights with a defined duration, whitelisting permission so ads can run from the creator’s own handle, and editing rights so the content can be cut to other lengths and ratios. Negotiated afterwards, all three cost more and are sometimes refused outright. Agreed in the brief, they cost nothing.',

    metric: {
      label: 'Measured on',
      value: 'Cost per acquisition by creator',
      body: 'Once creator assets are running as paid ads, you get a far better signal than engagement — which creator actually produced customers. Follower count almost never predicts it.',
    },

    misconception: {
      wrong: '“Bigger creators are safer.”',
      right:
        'Reach is the least useful selection criterion available. The measured advantage of creator content comes from specificity — a real person with a named problem — which does not scale by hiring someone larger. More creators, briefed harder, beats fewer and bigger in nearly every account we have seen.',
    },

    outcomes: [
      'Content you are contractually allowed to run as paid media',
      'Whitelisting live, so ads run from the creator’s handle rather than your brand page',
      'Creator selection based on cost per acquisition rather than follower count',
    ],
    process: [
      { step: 'Rights-first briefing', body: 'Usage duration, whitelisting, editing rights and renewal pricing settled before a creator is approached, not after they have leverage.' },
      { step: 'Selection on fit', body: 'Audience overlap and the specificity of what they can credibly say, rather than reach. Registration status verified where the category requires it.' },
      { step: 'Production and disclosure', body: 'Disclosure specified in the brief rather than left to the creator, because the exposure sits with you.' },
      { step: 'Paid amplification and measurement', body: 'The best-performing organic content is put behind spend, and creators are ranked on the resulting cost per acquisition.' },
    ],
    deliverables: ['Creator shortlist with rationale', 'Rights and disclosure terms in every brief', 'Whitelisting setup', 'Content library with usage windows documented', 'Per-creator acquisition reporting'],

    engagement: {
      shape: 'Per campaign, or an always-on monthly programme',
      cadence: 'Briefing and selection in week one, content live from week three, amplification from week four',
      commitment: 'Campaign work proves the model. Always-on is where the cost per acquisition actually falls',
    },

    notFor: [
      'Brands unwilling to pay for usage rights. Organic-only creator work produces numbers you cannot act on and content you cannot reuse.',
      'Regulated categories without a compliance process. In finance the restriction on associating with unregistered creators reaches your agency too, and in beauty 94% of flagged violations were disclosure failures.',
      'Anyone expecting a single large creator to move revenue. It occasionally happens and it is not a plan.',
    ],

    pairs: {
      services: [['Video production', '/services/video-production'], ['Performance marketing', '/services/performance-marketing']],
      industries: [['Beauty & Wellness', '/industries/beauty'], ['Fintech', '/industries/fintech']],
    },

    faqs: [
      { q: 'What should we agree before briefing a creator?', a: 'Paid usage rights with a defined duration — six to twelve months is normal. Whitelisting permission, so ads can run from their handle. Editing rights, so content can be cut to other lengths and ratios. And renewal terms, priced now rather than negotiated later from a weak position. Every one of these is cheaper before the content exists.' },
      { q: 'Why does whitelisting matter so much?', a: 'An ad served from a creator’s own handle carries their social proof and does not read as brand advertising in the same way. It is usually the highest-leverage part of a creator programme, and it is the part most often missing from the contract.' },
      { q: 'How do you pick creators?', a: 'Audience overlap, and whether they can credibly say something specific about the product. Follower count is a tiebreaker at best. In regulated categories we also verify registration status before a brief is written, because in finance the restriction on unregistered creators extends to the agency.' },
      { q: 'Who is liable if a creator says something non-compliant?', a: 'In practice, you are. The exposure sits with the brand, not the creator, which is why disclosure and claim limits belong in the brief and the contract rather than in a hopeful conversation.' },
    ],
  },

  /* =================================================== website development */
  'website-development': {
    metaTitle: 'Website Development',
    metaDescription:
      'Fast, accessible, measurable websites — built so the content team can publish without a developer and the performance budget holds in the field.',
    lede:
      'Most brand sites are slow, unmeasured, and impossible to update without a developer. All three are fixable, and all three cost more the longer they are left.',

    question: 'What makes a marketing website actually perform?',
    answer:
      'Speed, structure, and whether the people who own the content can change it. Performance is not a technical nicety — it is the first thing a visitor on a mid-range Android over 4G experiences, and it decides whether they see anything at all. Structure is what makes the site legible to search and to answer engines. And a site the content team cannot update without raising a ticket stops being updated, which is how good sites quietly go stale.',

    metric: {
      label: 'Measured on',
      value: 'Field Core Web Vitals, not lab scores',
      body: 'A lab score on a developer’s machine tells you very little. Real vitals from real visitors — on the devices and connections your buyers actually have — is the number that correlates with what people experience.',
    },

    misconception: {
      wrong: '“We need a redesign.”',
      right:
        'Often the design is fine and the problems are weight, structure and publishing friction. A redesign is the most expensive way to fix those and frequently reintroduces them. Worth measuring before deciding.',
    },

    outcomes: [
      'A site that loads fast on a mid-range phone over 4G, not just on a laptop',
      'Content your team can publish without a developer',
      'Structure and schema that search and answer engines can actually read',
    ],
    process: [
      { step: 'Audit and budget', body: 'Current field performance, page weight and structure — with an agreed performance budget the build has to hold to.' },
      { step: 'Structure and content model', body: 'How pages are composed and who can change what, decided before design rather than retrofitted.' },
      { step: 'Build', body: 'Accessible by default: contrast, keyboard reachability, reduced-motion paths, 44px touch targets. Not a later pass.' },
      { step: 'Measurement and handover', body: 'Analytics, field vitals and a written guide to publishing, so the site outlives the engagement.' },
    ],
    deliverables: ['Performance budget', 'Built and deployed site', 'Content publishing workflow', 'Analytics and field vitals', 'Handover documentation'],

    engagement: {
      shape: 'Fixed-scope project, with optional ongoing support',
      cadence: 'Audit and structure in weeks one to two, build from week three, measurement at handover',
      commitment: 'No retainer required. Support is available and most clients take a light one for the first quarter',
    },

    notFor: [
      'Brands wanting a bespoke CMS. We build on tools your team can hire for. A custom system is a liability the day we stop working together.',
      'Projects where design sign-off sits with a committee. It is not a technical problem, it is a schedule one, and it doubles the timeline.',
      'Sites that need a redesign for its own sake. If the problem is weight and publishing friction, say so and we will fix that for a fraction of the cost.',
    ],

    pairs: {
      services: [['AI content strategy', '/services/ai-content-strategy'], ['Performance marketing', '/services/performance-marketing']],
      industries: [['Healthcare', '/industries/healthcare'], ['Education & EdTech', '/industries/education']],
    },

    faqs: [
      { q: 'What performance budget do you build to?', a: 'Under 250 kB of JavaScript on first load, images under 200 KB, and largest contentful paint under 2.5 seconds on a mid-range Android over 4G. Those are the numbers we hold ourselves to and they are in our own brand guidelines, which means you can check whether our site meets them.' },
      { q: 'Can our team update the site afterwards?', a: 'That is a build requirement, not a nice-to-have. Content lives in a form your team can edit, and handover includes a written publishing guide. A site that needs a developer for a copy change stops getting updated within about two months.' },
      { q: 'Do you handle accessibility?', a: 'By default rather than as a later pass — contrast ratios, keyboard reachability, reduced-motion paths and 44px touch targets are build requirements. Retrofitting accessibility costs several times more than building it in.' },
      { q: 'What about SEO and answer engines?', a: 'Structure, schema and answer-first content patterns are part of the build. Ranking well still wins most AI answers — Google’s AI Overviews overlap heavily with organic results — but assistants like ChatGPT correlate far less with rankings, and what they reward is a page that answers a real question in its first 60 words.' },
    ],
  },

  /* ==================================================== video production */
  'video-production': {
    metaTitle: 'Video Production',
    metaDescription:
      'Filmed production built for volume — one shoot day engineered to produce a month of assets, not four.',
    lede:
      'A traditional shoot produces a handful of finished assets. The same day, planned differently, produces dozens. That difference is not a filming technique — it is a decision made before anyone arrives on set.',

    question: 'How do you get a month of content from one shoot day?',
    answer:
      'By planning the edit before the shoot rather than after it. A day designed for volume captures modular pieces — multiple hooks for the same body, several endings, vertical and horizontal framing, B-roll shot to cut against anything — so the assembly afterwards is combinatorial rather than linear. The same crew, the same location and the same budget produce forty usable edits instead of four, because the constraint was never the camera. It was the plan.',

    metric: {
      label: 'Measured on',
      value: 'Usable assets per shoot day',
      body: 'Not minutes of footage. A day that produces two beautiful films and nothing testable has failed at the thing paid media actually needs.',
    },

    misconception: {
      wrong: '“More output means lower quality.”',
      right:
        'It means different planning. The hero film is still shot as a hero film. What changes is that the same setup also yields the variants, the verticals and the cutdowns — which otherwise get made badly, later, by someone else, from footage that was never framed for it.',
    },

    outcomes: [
      'Enough finished assets from one day to run a real testing cadence',
      'Every aspect ratio and length the media plan needs, from the same shoot',
      'A shot list built backwards from the edit, not forwards from the location',
    ],
    process: [
      { step: 'Edit-first planning', body: 'We write the asset list before the shot list. How many hooks, how many endings, which formats — decided while it is still free to change.' },
      { step: 'Modular shoot design', body: 'Framing and coverage that allow pieces to be recombined. Vertical and horizontal captured together rather than one cropped from the other.' },
      { step: 'Production', body: 'One day, one crew, one location, running to a list that already knows what the edit needs.' },
      { step: 'Assembly and versioning', body: 'Hero cut first, then the variant set, then every ratio and length. Captions burnt in, because most viewing is silent.' },
    ],
    deliverables: ['Hero film', 'Variant set for testing', '9:16, 1:1 and 16:9 versions', 'Captioned cutdowns', 'Organised, labelled raw footage'],

    engagement: {
      shape: 'Per shoot day, or a quarterly production retainer',
      cadence: 'Planning in week one, shoot in week two, assets delivered across weeks three and four',
      commitment: 'Single days work for a launch. Quarterly suits a brand testing continuously',
    },

    notFor: [
      'Brands who need one perfect film and nothing else. That is a legitimate brief and a different, usually cheaper, kind of shoot.',
      'Anyone not running paid media. Volume only pays for itself if the variants are actually being tested against each other.',
      'Projects where the location is the constraint. If you can only access the site once for two hours, the plan has to shrink accordingly and we will say so.',
    ],

    pairs: {
      services: [['AI videos', '/services/ai-videos'], ['Performance marketing', '/services/performance-marketing']],
      industries: [['E-commerce & D2C', '/industries/ecommerce'], ['Real Estate', '/industries/real-estate']],
    },

    faqs: [
      { q: 'How many assets can one day realistically produce?', a: 'For a straightforward product or talking-head setup, forty usable edits from one day is achievable and we plan to it. The number falls with complexity — multiple locations, wardrobe changes and cast availability all reduce it. What matters is that the figure is agreed before the shoot, because it determines the shot list.' },
      { q: 'Do you shoot vertical and horizontal separately?', a: 'We frame for both in the same take wherever possible, rather than cropping one from the other afterwards. Cropping a horizontal to 9:16 is where most brands lose their composition and their headroom.' },
      { q: 'Can we use our own footage?', a: 'Yes, and it is often the cheapest way to start. We will tell you honestly what your existing library can and cannot be cut into — usually the answer is more than expected for B-roll and less than hoped for hooks.' },
      { q: 'Is this the same as your AI video service?', a: 'No, and they solve different problems. This is filmed. AI video is generation, which is stronger for impossible shots and extreme variant counts and weaker anywhere the viewer can check the subject against reality. Most strong accounts use both.' },
    ],
  },

  /* =================================================== AI generated ads */
  'ai-generated-ads': {
    metaTitle: 'AI Generated Ads',
    metaDescription:
      'Performance creative at volume — dozens of variants produced and tested, then iterated on whatever actually converts.',
    lede:
      'Performance creative is a volume problem wearing a creativity costume. The account that ships thirty concepts a month beats the account with better taste and four.',

    question: 'How many ad variants does a brand actually need?',
    answer:
      'Enough to refresh inside your category’s fatigue window and still have variants left to test. In competitive Indian categories a creative now fatigues in 21 to 35 days, against 45 to 60 four years ago, because far more brands are reaching the same people. A brand running three or four active ad sets typically needs 15 to 30 assets a month — a mix of genuinely new concepts and variants of what is already working. Four a month is a 60-day refresh cycle in a market that fatigues in 30.',

    metric: {
      label: 'Measured on',
      value: 'Distinct concepts tested per quarter',
      body: 'Variants of a winner are cheap and necessary. Distinct concepts are what find the next winner, and most accounts test far fewer than they think.',
    },

    misconception: {
      wrong: '“We need better creative.”',
      right:
        'Usually you need more of it. The gap between a bottom-quartile and a top-quartile account in most categories is not taste — it is how many ideas got a fair test before the budget was committed to one.',
    },

    outcomes: [
      'A refresh cadence that clears your category’s fatigue window',
      'Concepts tested against each other, so a winner is identifiable rather than assumed',
      'Production cost per variant low enough that testing is rational',
    ],
    process: [
      { step: 'Concept generation', body: 'Angles generated and screened at volume, so what goes into production starts from evidence rather than instinct.' },
      { step: 'Rapid production', body: 'Static, motion and generated formats, produced to a weekly rhythm rather than a campaign one.' },
      { step: 'Structured testing', body: 'Concepts run against each other rather than sequentially, with enough spend behind each to read.' },
      { step: 'Iterate the winner', body: 'Variants built from what actually worked — different hooks on the same body, different endings, different framings.' },
    ],
    deliverables: ['Monthly concept batch', 'Variant sets for winners', 'All required ratios and lengths', 'Creative performance reporting', 'A living hook bank'],

    engagement: {
      shape: 'Monthly volume commitment',
      cadence: 'Weekly delivery, monthly concept review against performance',
      commitment: 'Three months minimum — one full fatigue cycle is the shortest honest test',
    },

    notFor: [
      'Accounts spending too little to read a test. Below roughly ₹2 lakh a month there is not enough signal, and volume just produces noise faster.',
      'Brands with a fixed, approved creative route they do not intend to change. Volume is only useful where the answer is genuinely unknown.',
      'Anyone who wants each asset to be a considered brand statement. Performance creative is disposable by design and that is uncomfortable for some teams.',
    ],

    pairs: {
      services: [['Performance marketing', '/services/performance-marketing'], ['AI videos', '/services/ai-videos']],
      industries: [['E-commerce & D2C', '/industries/ecommerce'], ['Beauty & Wellness', '/industries/beauty']],
    },

    faqs: [
      { q: 'Does volume mean low quality?', a: 'It means fit-for-purpose. A performance asset has one job — earn a click from a stranger in two seconds — and the version that does it best is rarely the most polished. Brand film is a separate budget with a separate standard, and we would not fund one by cutting the other.' },
      { q: 'How do you know a concept actually won?', a: 'By running concepts against each other with enough spend behind each to read, rather than sequentially where seasonality and audience changes contaminate the comparison. Sequential testing is why so many accounts have a winner nobody can reproduce.' },
      { q: 'What is a hook bank?', a: 'A running record of every opening we have tested and how it performed, so the next batch starts from evidence rather than a blank page. It is the most valuable thing an account accumulates and the thing most often lost when an agency changes.' },
    ],
  },

  /* ================================================== social media growth */
  'social-media-growth': {
    metaTitle: 'Social Media Growth',
    metaDescription:
      'Owned-channel growth measured on qualified reach and conversion, not follower count.',
    lede:
      'Follower count is the vanity metric that survived every attempt to kill it. It correlates with almost nothing you can bank, and it is still the number most social reports open with.',

    question: 'What should a brand actually measure on social?',
    answer:
      'Reach among people who could plausibly buy, and what that reach does next. Follower count measures accumulated history, including followers acquired years ago by content unrelated to what you now sell. The useful numbers are reach and watch-through within your actual audience, saves and shares as signals of usefulness, and profile-to-site or profile-to-enquiry conversion. A channel with 8,000 relevant followers converting steadily is worth more than 80,000 assembled by giveaways.',

    metric: {
      label: 'Measured on',
      value: 'Qualified reach and what follows it',
      body: 'Reach among people who could buy, and whether they then do something — visit, save, enquire. Followers are reported, never managed to.',
    },

    misconception: {
      wrong: '“We need to post more often.”',
      right:
        'Cadence matters far less than whether any individual post is worth watching to the end. Most accounts posting daily would perform better posting three times a week with the same total effort concentrated.',
    },

    outcomes: [
      'Content pillars that a real audience returns for',
      'Reporting on reach quality and conversion rather than follower growth',
      'A production rhythm your team can actually sustain',
    ],
    process: [
      { step: 'Audit and baseline', body: 'What currently performs, who is actually watching, and which pillars are earning attention versus filling a calendar.' },
      { step: 'Pillar and format design', body: 'Three to five themes with formats matched to each — not every idea deserves a reel.' },
      { step: 'Production rhythm', body: 'A cadence sized to what can be sustained without the quality collapsing in month two.' },
      { step: 'Measure and prune', body: 'Monthly review against qualified reach and conversion, with the underperforming pillar retired rather than defended.' },
    ],
    deliverables: ['Channel audit', 'Pillar and format plan', 'Monthly content batch', 'Community management guidelines', 'Monthly performance review'],

    engagement: {
      shape: 'Monthly retainer',
      cadence: 'Batch production monthly, publishing weekly, review monthly',
      commitment: 'Three months minimum. Channels do not turn around inside one',
    },

    notFor: [
      'Brands who want follower growth as the objective. We will not optimise for it and the numbers will look worse than a giveaway campaign would produce.',
      'Businesses whose buyers are not on social in any meaningful way. Some categories genuinely are not, and search or direct sales is the better spend.',
      'Teams unable to supply subject-matter access. The best-performing owned content needs someone from the business on camera or on the record.',
    ],

    pairs: {
      services: [['AI content strategy', '/services/ai-content-strategy'], ['Video production', '/services/video-production']],
      industries: [['Beauty & Wellness', '/industries/beauty'], ['Healthcare', '/industries/healthcare']],
    },

    faqs: [
      { q: 'Will our follower count grow?', a: 'Usually, as a by-product. It is not what we optimise for, and if you need follower growth as the headline outcome we are probably the wrong choice — a giveaway campaign will beat us on that number and lose on every other one.' },
      { q: 'How often should we post?', a: 'Less than most agencies recommend and more consistently than most brands manage. Three considered posts a week beats seven filler ones, because the algorithm and the audience are both judging whether individual pieces are worth finishing.' },
      { q: 'Do we need to be on every platform?', a: 'No, and spreading thin is the most common way owned channels fail. Two channels done properly outperform five maintained. Which two depends on where your buyers actually are, which is the first thing the audit answers.' },
    ],
  },

  /* ======================================================== blog writing */
  'blog-writing': {
    metaTitle: 'Blog Writing',
    metaDescription:
      'Editorial written to be found by search and quoted by AI assistants — answer-first, sourced, and published under a real name.',
    lede:
      'Most brand blogs are written for a crawler and read by nobody. The format that works now is the opposite: written for a person who has a specific question, structured so a machine can lift the answer.',

    question: 'What kind of article actually gets found in 2026?',
    answer:
      'One that answers a real question in its first 60 words, with a named author and sources you can check. Google’s AI Overviews still overlap heavily with organic rankings, so classic SEO is not obsolete — but ChatGPT correlates far less with rankings and rewards something different: short, self-contained, attributable passages a model can quote without hedging. An article that opens with brand poetry gets neither. One that opens with the answer gets both.',

    metric: {
      label: 'Measured on',
      value: 'Citations and qualified organic entries',
      body: 'Whether the piece gets quoted by an assistant, and whether the people arriving from search were looking for something you sell. Pageviews measure neither.',
    },

    misconception: {
      wrong: '“We need to publish more to rank.”',
      right:
        'Volume without substance now actively hurts — thin pages published to fill a calendar are exactly what recent core updates demote. Four articles worth reading beat forty written for a crawler, and cost less.',
    },

    outcomes: [
      'Articles that answer questions your buyers actually type',
      'Answer-first structure that AI assistants can quote verbatim',
      'A named author with real credentials, which is most of what E-E-A-T means in practice',
    ],
    process: [
      { step: 'Question research', body: 'What your buyers actually search and ask, rather than what a keyword tool suggests they might.' },
      { step: 'Answer-first drafting', body: 'The core question answered in the first 60 words, self-contained enough to be quoted, before any context or preamble.' },
      { step: 'Sourcing', body: 'Real figures with links. Where a number cannot be sourced, the point is made qualitatively rather than invented.' },
      { step: 'Structure and schema', body: 'Headings that read as questions, FAQ blocks, internal links, and Article and Person schema so the byline resolves to a real identity.' },
    ],
    deliverables: ['Researched articles', 'Answer-first blocks', 'FAQ and Article schema', 'Internal linking plan', 'Publishing-ready markdown'],

    engagement: {
      shape: 'Per article, or a monthly editorial retainer',
      cadence: 'Weekly or fortnightly publication, agreed against a rotating topic plan',
      commitment: 'Three months minimum — organic does not report back faster than that',
    },

    notFor: [
      'Brands needing traffic this quarter. Organic realistically takes three to six months to contribute, and anyone promising faster is describing paid media.',
      'Anyone wanting volume for its own sake. We will not publish thin articles to hit a count, and that is usually the first disagreement.',
      'Categories where your buyers genuinely do not search. Some B2B niches are sold entirely on relationships, and content is a poor substitute.',
    ],

    pairs: {
      services: [['AI content strategy', '/services/ai-content-strategy'], ['Website development', '/services/website-development']],
      industries: [['Healthcare', '/industries/healthcare'], ['Fintech', '/industries/fintech']],
    },

    faqs: [
      { q: 'Do you use AI to write the articles?', a: 'For research breadth and structuring, not for the prose. An article that reads as machine-written fails the only test that matters — whether someone who does this work would recognise it as true. Every piece is published under a named author with real credentials, which means it has to survive being attributed.' },
      { q: 'How long should an article be?', a: 'Long enough to answer the question and no longer. In practice 1,200 to 1,600 words covers most topics properly. Padding to hit a word count is visible to a reader and increasingly to a ranking system.' },
      { q: 'What is an answer-first block?', a: 'The first 50 to 80 words, written to answer the article’s core question completely and to stand alone if lifted out of the page. It is what an AI assistant quotes, and it is what a busy reader uses to decide whether to continue.' },
    ],
  },

  /* ====================================================== graphic design */
  'graphic-design': {
    metaTitle: 'Graphic Design',
    metaDescription:
      'Brand and performance design built as a system — templates your team can use without breaking the brand.',
    lede:
      'Most design engagements produce beautiful files that decay within a quarter, because nothing was built for the people who have to make the next hundred assets.',

    question: 'What should a design engagement actually leave behind?',
    answer:
      'A system, not a folder. Individual assets solve this week; a system — tokens, templates, rules and the reasoning behind them — solves the next two years. The practical test is whether someone who was not in the original conversation can produce an on-brand asset without asking permission. Most design handovers fail that test, which is why brands drift within a quarter and end up commissioning another identity project.',

    metric: {
      label: 'Measured on',
      value: 'Assets your team ships unaided',
      body: 'If every new asset needs a designer, the system failed. The measure is how much correct output happens without us.',
    },

    misconception: {
      wrong: '“We need a rebrand.”',
      right:
        'Usually the identity is fine and the problem is that nobody knows how to apply it. Guidelines that live in a PDF nobody opens produce the same drift as having no guidelines. Templates that make the right thing the easy thing do not.',
    },

    outcomes: [
      'Templates your team can use without a designer',
      'Rules with reasoning attached, so exceptions can be judged rather than guessed',
      'Consistency that survives the first month after handover',
    ],
    process: [
      { step: 'Audit', body: 'What exists, what is actually being used, and where the current system breaks down in practice.' },
      { step: 'Token and rule definition', body: 'Colour, type, spacing and motion defined as reusable values with contrast and accessibility checked, not chosen per asset.' },
      { step: 'Template build', body: 'The formats you actually make weekly, built as templates in tools your team already has.' },
      { step: 'Handover and rules', body: 'Written guidance covering not just what to do but why, so a new hire can make a judgement call correctly.' },
    ],
    deliverables: ['Design token set', 'Template library', 'Written usage rules', 'Accessible colour pairings', 'Handover session'],

    engagement: {
      shape: 'Fixed-scope project',
      cadence: 'Audit and tokens in weeks one to two, templates in weeks three to four, handover in week five',
      commitment: 'No retainer required. Ongoing design support is available separately',
    },

    notFor: [
      'Brands wanting a single campaign look. That is a campaign job and cheaper bought as one.',
      'Teams with no capacity to use the system. Templates nobody has time to open are worse than no templates, because they create the illusion of a solution.',
      'Anyone expecting a full identity rebuild at this scope. That is a larger engagement and we will say so rather than deliver a thin version of it.',
    ],

    pairs: {
      services: [['Website development', '/services/website-development'], ['Social media growth', '/services/social-media-growth']],
      industries: [['Education & EdTech', '/industries/education'], ['Real Estate', '/industries/real-estate']],
    },

    faqs: [
      { q: 'What is a design token?', a: 'A named, reusable value — a colour, a spacing step, a type size — defined once and referenced everywhere, rather than picked per asset. It is what makes consistency automatic instead of a matter of vigilance, and it is what lets a site, a deck and a social template genuinely match.' },
      { q: 'Do you check accessibility?', a: 'Contrast ratios are checked and documented as part of the token set. It matters commercially as well as ethically — we have measured brand colours that fail contrast on a dark background badly enough to be effectively invisible, which is worth knowing before it ships.' },
      { q: 'Which tools do you build templates in?', a: 'Whatever your team already uses and can hire for. A beautiful system in a tool nobody on your side owns is a liability the day the engagement ends.' },
    ],
  },
};

export const getService = (slug) => serviceDetail[slug];
