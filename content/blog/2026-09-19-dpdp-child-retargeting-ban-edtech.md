---
title: Parental consent does not unlock retargeting a teen
slug: dpdp-child-retargeting-ban-edtech
excerpt: Section 9(3) of the DPDP Act bans tracking and targeted ads aimed at under-18s outright. A signed parental consent does not switch it back on.
category: Performance Marketing
banner: /images/blog/dpdp-child-retargeting-ban-edtech.webp
bannerAlt: A closed school exercise notebook on a dark desk with an amber targeting reticle above it breaking into drifting fragments
publishAt: 2026-09-19
tags:
  - Education
  - Performance Marketing
  - Compliance
keywords:
  - dpdp section 9 targeted advertising children
  - edtech retargeting india rules
  - verifiable parental consent dpdp rules 2025
  - behavioural tracking children india
related:
  - dpdp-consent-first-party-data
  - ugc-edtech-franchise-degree-ads
draft: false
metaTitle: ''
metaDescription: ''
updated: ''
---

If your funnel depends on retargeting a 16-year-old who watched a demo class, collecting the parent's consent does not fix it. Section 9(3) of the Digital Personal Data Protection Act, 2023 prohibits tracking, behavioural monitoring and targeted advertising directed at children. It is a flat prohibition, not a default you can toggle with a consent checkbox. The Digital Personal Data Protection Rules, 2025, notified on 14 November 2025, set out the narrow carve-outs, and none of them is marketing.

This matters most for EdTech, test prep, coaching, school supplies and anything else where the user and the buyer are different people. Under the Act, a child is anyone under 18, which is a much wider net than the under-13 line most global ad stacks were built around.

## What Section 9 actually splits into

The section has two mechanically different parts, and teams keep collapsing them into one.

Section 9(1) is the consent rule: before processing a child's personal data you need verifiable consent from a parent or lawful guardian. Rule 10 of the 2025 Rules spells out how that verification can be done, including checking identity and age details you already hold reliably, details the adult volunteers, or a virtual token linked to those details issued by an authorised entity.

Section 9(3) is the conduct rule: no tracking, no behavioural monitoring, no advertising targeted at children. There is no consent path attached to it. The parent cannot sign it away, and neither can the child.

So the compliance work splits cleanly. Consent is an engineering and UX problem. The advertising prohibition is a media-buying problem, and it is the one that quietly breaks existing campaigns.

| | Section 9(1) consent | Section 9(3) prohibition |
|---|---|---|
| Can a parent authorise it | Yes, that is the point | No |
| What it governs | Whether you may process at all | What you may do once processing |
| Rule that operationalises it | Rule 10, verification methods | No enabling rule, it just applies |
| Carve-outs | Fourth Schedule, Parts A and B | Fourth Schedule, Parts A and B |

## The carve-outs are institutional, not commercial

Rule 12 disapplies Sections 9(1) and 9(3) for classes of data fiduciaries listed in Part A of the Fourth Schedule: clinical and mental health establishments, healthcare and allied healthcare professionals, educational institutions, creches and child day-care providers, and transport providers engaged by those institutions. The conditions attached are tight, limiting processing to protecting a child's health, tracking tied to educational activity, safety monitoring and travel safety.

Part B lists purposes rather than entities: exercising a duty in a child's interest under law, issuing a subsidy or benefit or certificate, creating an email-only user account, determining real-time location for safety, making sure detrimental content and advertisements are not reachable, and confirming a data principal is not a child in the first place.

Read that list again from a marketer's seat. An educational institution tracking a student's progress through coursework is inside the carve-out. The same institution building a lookalike audience from that progress data is not. The exemption is written to let schools be schools, not to let schools run ad tech.

> The Act treats a school's attendance log and a school's remarketing pixel as two entirely different things, and only one of them is protected.

## What breaks in a live account

Most clients we work with in education have three exposures, in ascending order of pain.

The first is retargeting pools. If a pixel fires on an under-18 and that person lands in a custom audience, you are behaviourally profiling a child. The Act does not care that your platform calls it a segment.

The second is recommendation and engagement systems. Feed ranking, nudge sequences, streak mechanics and "students like you also enrolled" all rest on behavioural profiles. On an account you know belongs to a minor, those are Section 9(3) territory, not just the ads.

The third is age blindness, and it is the worst one because it is invisible. If you never establish whether a user is a child, you cannot show you stayed on the right side of the line. Rule 10 gives you the mechanics to establish it. Part B of the Fourth Schedule explicitly permits processing for the purpose of confirming that a data principal is not a child, so the diligence itself is lawful.

The penalties sit high enough to be a board-level item. Breaching obligations relating to children can attract up to ₹200 crore, alongside up to ₹250 crore for failing reasonable security safeguards and up to ₹50 crore for other violations.

## What still works

Contextual advertising is the honest answer, and it is a better answer than it sounds. If you place an ad against subject matter rather than against a person's history, you are not using the child's personal data to target. A Class 10 maths ad on a Class 10 maths video is contextual. The same ad chasing a specific student across the open web is not.

The parent is the other answer. In this category the payer is an adult, and an adult's data is ordinary first-party data with ordinary consent rules. Building your addressable audience around parents, not students, is the structural change that survives the rule rather than working around it. We look at this every time we plan an [education](/industries/education) account, and the accounts that already sell to the parent barely need to move.

Creative also has to shift. If students see the ad but parents are the audience, the promise in the ad has to land with a parent: outcomes, credibility, cost, safety. That is a [content strategy](/services/ai-content-strategy) question before it is a media question.

## Where the timeline sits

The Rules commence in tranches. The first tranche took effect on notification in November 2025, the Consent Manager regime follows a year later, and the notice, security, children's consent and rights provisions arrive in the final tranche. Published summaries differ on the exact final date, describing it variously as an eighteen-month runway and as March 2027, so treat 2027 as the planning horizon and confirm the precise date against the gazette before you put it in a board deck.

That gap is not idle time. Age assurance takes longer to build than a consent banner, and the audience architecture change takes a full planning cycle to prove out.

## What to do this quarter

Run an age audit before anything else. Work out what share of your logged-in base is plausibly under 18 and whether you can tell. Most teams cannot answer this, and the answer determines everything downstream.

Then look at your audience lists honestly. Any pool built from on-site behaviour, with no age gate upstream of it, is the thing to rebuild first.

The caveat worth stating plainly: the Act is in force, the Rules are notified, and the Data Protection Board is constituted, but the children's provisions have not yet been tested in an enforcement action. Nobody knows yet how strictly "directed at children" will be read at the margins, for instance on a general-audience platform where some users happen to be minors. Building for the strict reading is cheaper than rebuilding for it later.

Sources: [DPDP Rules, 2025 Notified, Press Information Bureau](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf), [Summary of the Digital Personal Data Protection Rules 2025, Data Security Council of India](https://www.dsci.in/files/content/documents/2025/Digital-Personal-Data-Protection-Rules-2025.pdf), [India Notifies Final Rules for Digital Data Protection Act, Baker Botts](https://ourtake.bakerbotts.com/post/102lund/india-notifies-final-rules-for-digital-data-protection-act), [Prohibition of Behavioral Tracking and Targeted Advertising for Children Under the DPDP Act, CyberPeace](https://cyberpeace.org/resources/blogs/prohibition-of-behavioral-tracking-and-targeted-advertising-for-children-under-the-dpdp-act-2023)
