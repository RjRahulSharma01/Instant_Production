// Starter articles.
//
// IMPORTANT: every post below is marked `draft: true`. Drafts are hidden from
// the live blog index and from the sitemap. They are written to be edited —
// add your own examples, numbers and client stories, then flip `draft` to
// false to publish. Nothing here claims a specific result you have not had.

export const blogPosts = [
  {
    slug: 'ai-video-actually-worth-it',
    draft: true,
    title: 'When AI video is actually worth it (and when it is not)',
    excerpt:
      'Generative video is cheap and fast, which makes it easy to use for the wrong brief. A practical test for deciding between AI and a real shoot.',
    category: 'AI Video',
    readingMinutes: 6,
    date: '2026-08-10',
    cover: '/images/blog/ai-video-worth-it.webp',
    keywords: ['AI video production', 'AI vs traditional shoot', 'generative video for brands'],
    body: [
      { type: 'p', text: 'The interesting question about AI video is no longer whether it looks good enough. For a lot of briefs it does. The question is which briefs, and the honest answer is narrower than most agencies selling it will admit.' },
      { type: 'h2', text: 'What AI video is genuinely good at' },
      { type: 'p', text: 'Volume and variation. If you need fifteen versions of an ad concept to test against each other, generation is transformative, because the fifteenth variant costs almost nothing once the first exists. Traditional production has the opposite cost curve.' },
      { type: 'p', text: 'It is also strong for anything impossible or expensive to film: impossible camera moves, environments you cannot access, abstract or conceptual sequences, and product visualisation before a product physically exists.' },
      { type: 'h2', text: 'Where it still falls short' },
      { type: 'p', text: 'Anything where the viewer knows exactly what the subject should look like. Faces they recognise. Your actual product, in detail, in someone’s hands. Food. Fabric. These are the areas where the small wrongnesses read as cheap rather than stylised.' },
      { type: 'p', text: 'It is also poor when the brief needs a specific human performance. Generated performance is improving quickly, but it currently sits in a range between serviceable and slightly unsettling, which is a bad range for a brand film.' },
      { type: 'h2', text: 'A practical test' },
      { type: 'list', items: [
        'Will the viewer be able to verify the subject against reality? If yes, lean toward filming.',
        'Do you need one perfect asset or twenty testable ones? Twenty favours AI.',
        'Is the environment the point, or is the person the point? Environments generate well; people are harder.',
        'Would a real shoot delay the campaign past the moment it matters? Speed has real commercial value.',
      ]},
      { type: 'h2', text: 'The hybrid case' },
      { type: 'p', text: 'In practice the strongest work is usually mixed. Real product footage placed into generated environments, or a filmed hero sequence with generated variations for testing. Treating it as a binary choice is the most common mistake we see.' },
      { type: 'callout', text: 'Rule of thumb: use AI for breadth, use a camera for the shot the whole campaign hangs on.' },
    ],
  },

  {
    slug: 'creative-testing-loop',
    draft: true,
    title: 'Why your ads stopped working (it is almost always creative fatigue)',
    excerpt:
      'When CPMs climb and CTR falls while nothing about your targeting changed, the creative is worn out. How to build a testing loop that prevents it.',
    category: 'Performance Marketing',
    readingMinutes: 7,
    date: '2026-08-10',
    cover: '/images/blog/creative-testing.webp',
    keywords: ['creative fatigue', 'ad creative testing', 'ROAS decline', 'performance marketing'],
    body: [
      { type: 'p', text: 'A campaign that worked for six weeks starts sliding. Cost per acquisition creeps up, click-through drifts down, and nothing in the account changed. The instinct is to blame the algorithm or the audience. Usually it is neither.' },
      { type: 'h2', text: 'What fatigue actually looks like in the data' },
      { type: 'p', text: 'Rising frequency alongside falling click-through rate is the clearest signal. The same people are seeing the same creative repeatedly and have stopped responding. Cost per thousand impressions climbing while relevance falls tends to follow.' },
      { type: 'p', text: 'The trap is that fatigue looks identical to a targeting problem from the top-level dashboard. Both show worsening efficiency. The difference is visible only when you break performance down by creative and by frequency.' },
      { type: 'h2', text: 'Why platform automation made this worse, not better' },
      { type: 'p', text: 'Broad targeting and automated placement removed most of the manual levers that used to occupy media buyers. What is left as the main controllable variable is the creative itself. That is why agencies that ship more concepts tend to outperform agencies with better spreadsheets.' },
      { type: 'h2', text: 'Building a loop rather than a launch' },
      { type: 'list', items: [
        'Ship a fixed number of new concepts per period, not per campaign. Cadence beats intensity.',
        'Change one variable at a time: hook, format, or offer. Changing all three teaches you nothing.',
        'Kill losers early. Most agencies let underperforming creative run far too long out of sunk-cost instinct.',
        'Keep a library of past winners. Refreshed winners often outperform brand new concepts.',
      ]},
      { type: 'h2', text: 'Where UGC fits' },
      { type: 'p', text: 'Creator content is useful here mostly because it is cheap to produce in volume and does not carry the polish that audiences have learned to scroll past. If you are struggling to sustain creative cadence, a creator pipeline is often a more practical fix than a bigger production budget.' },
      { type: 'callout', text: 'If you only track account-level ROAS, you cannot see fatigue until it has already cost you a month.' },
    ],
  },

  {
    slug: 'content-pillars-that-work',
    draft: true,
    title: 'Content pillars are not categories',
    excerpt:
      'Most content pillar exercises produce a list of topics and change nothing. What makes a pillar actually useful is a claim you can defend.',
    category: 'Content Strategy',
    readingMinutes: 5,
    date: '2026-08-10',
    cover: '/images/blog/content-pillars.webp',
    keywords: ['content pillars', 'content strategy framework', 'B2B content planning'],
    body: [
      { type: 'p', text: 'Almost every content strategy deck contains a slide with four pillars on it. Education. Inspiration. Behind the scenes. Product. These are not pillars, they are formats, and they will not help anyone decide what to make on a Tuesday.' },
      { type: 'h2', text: 'A pillar is a position, not a bucket' },
      { type: 'p', text: 'A useful pillar is a claim about your market that you are prepared to defend repeatedly and that a competitor could plausibly disagree with. If nobody could disagree, it is not a position, it is a platitude.' },
      { type: 'p', text: 'The test is simple. Could a competitor put the same pillar on their slide without changing anything? If so, it is doing no work.' },
      { type: 'h2', text: 'How to find yours' },
      { type: 'list', items: [
        'Listen to sales calls. The objections you answer most often are your pillars in disguise.',
        'Look at what you refuse to do. Refusals are positions, and positions make content.',
        'Find the thing you believe that the market mostly does not. Start there.',
      ]},
      { type: 'h2', text: 'Mapping pillars to intent' },
      { type: 'p', text: 'Once you have three to five defensible positions, each needs content at different stages: something for people who do not yet know they have the problem, something for people comparing options, and something for people ready to buy. Most brands overproduce the last category and wonder why nothing compounds.' },
      { type: 'callout', text: 'If your pillars would fit any competitor in your category, you have written a taxonomy, not a strategy.' },
    ],
  },

  {
    slug: 'influencer-content-into-paid',
    draft: true,
    title: 'The influencer mistake that wastes the whole budget',
    excerpt:
      'Brands run creator campaigns, get good organic numbers, then discover they cannot legally use the best content in ads. Fix it in the brief.',
    category: 'Influencer Marketing',
    readingMinutes: 5,
    date: '2026-08-10',
    cover: '/images/blog/influencer-paid.webp',
    keywords: ['influencer marketing', 'UGC usage rights', 'whitelisting', 'creator content paid ads'],
    body: [
      { type: 'p', text: 'A creator campaign performs well. Three of the twelve videos genuinely land. You go to put media spend behind them and discover the contract covered organic posting only. The best assets you paid for are now unusable in the channel where they would have made money.' },
      { type: 'h2', text: 'Why this keeps happening' },
      { type: 'p', text: 'Usage rights are negotiated at the end, as an afterthought, once the creator already has leverage. By then extending rights costs more than it would have at the briefing stage, and sometimes the creator simply declines.' },
      { type: 'h2', text: 'What to agree up front' },
      { type: 'list', items: [
        'Paid usage rights, with a defined duration. Six to twelve months is normal.',
        'Whitelisting permission, so ads can run from the creator’s own handle rather than your brand page.',
        'Editing rights, so you can cut the content into different lengths and aspect ratios.',
        'Renewal terms, priced now rather than negotiated later from a weak position.',
      ]},
      { type: 'h2', text: 'Why whitelisting matters more than it sounds' },
      { type: 'p', text: 'An ad served from a creator’s handle carries their social proof and does not read as brand advertising in the same way. This is generally the highest-leverage part of a creator programme, and it is the part most often left out of the contract.' },
      { type: 'h2', text: 'Measure creators on paid performance, not reach' },
      { type: 'p', text: 'Once creator assets are running as ads, you get a much better signal than engagement: cost per acquisition by creator. That tells you who to work with again. Follower count almost never does.' },
      { type: 'callout', text: 'Decide what happens to the content after the post before you brief the creator, not after.' },
    ],
  },
];

export const publishedPosts = blogPosts.filter((p) => !p.draft);
export const allPosts = blogPosts;
export const getPost = (slug) => blogPosts.find((p) => p.slug === slug);
