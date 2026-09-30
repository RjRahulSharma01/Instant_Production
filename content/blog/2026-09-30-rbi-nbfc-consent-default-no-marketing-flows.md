---
title: "RBI's consent default is No. Audit your NBFC forms"
slug: rbi-nbfc-consent-default-no-marketing-flows
excerpt: "From 1 January 2027, an NBFC consent box must default to No. Pre-ticked opt-ins, countdown timers and bundled insurance are on the prohibited list."
category: Performance Marketing
banner: /images/blog/rbi-nbfc-consent-default-no-marketing-flows.webp
bannerAlt: "A translucent consent toggle resting in the off position beside a glowing amber padlock and a shattered hourglass on near-black charcoal"
publishAt: 2026-09-30
tags:
  - Fintech
  - Compliance
  - Performance Marketing
keywords:
  - RBI responsible business conduct directions 2026
  - NBFC advertising rules india
  - loan app consent default no
  - dark patterns nbfc marketing
related:
  - loan-aggregator-digital-view-rbi
  - ccpa-dark-patterns-checkout-copy
draft: false
metaTitle: ''
metaDescription: ''
updated: ''
---

From 1 January 2027, every consent box on an NBFC's lead form, app screen or WhatsApp flow has to default to "No" or "I do not agree". A pre-ticked checkbox, a countdown timer on a loan offer, or an insurance add-on that arrives already selected is no longer a conversion tactic. It is a breach of the Reserve Bank of India's Responsible Business Conduct (Second Amendment) Directions, 2026.

The directions were issued on 15 June 2026. NBFCs and Housing Finance Companies with a customer interface get roughly six months to comply. That sounds long until you count how many forms, journeys and agent scripts a lender actually runs.

## What the RBI actually changed

The amendment covers advertising, marketing and sale of financial products. The RBI issued it across regulated entity categories, so banks, small finance banks and co-operative banks are on the same clock. This piece is about NBFC marketing because that is where most of our fintech clients sit.

The parts that touch a media buyer or a landing page designer:

- Consent must be a "specific, informed and unambiguous indication", given by signed declaration, OTP, recorded confirmation or a clearly marked agreement section.
- The default choice in any consent interface must be "No" or "I do not agree".
- Each product needs its own consent. A form selling a loan, an insurance cover and a card must list all three separately.
- Promotional communication needs prior explicit consent, and unsubscribing has to be simple.
- Interest rates and fees must be disclosed prominently in promotional material.
- A lender cannot advertise a third-party product as its own. The role has to be clear.
- Compulsory bundling of a third-party product with an own product is prohibited.

## The dark pattern list is the part that hits creative

The directions bring in the CCPA's Guidelines for Prevention and Regulation of Dark Patterns, 2023, and list eleven prohibited patterns. False urgency, such as a countdown timer or a "rate will rise" prompt, is on it. So are confirm shaming, basket sneaking (an insurance add-on selected by default), forced action, subscription traps, drip pricing, disguised ads, nagging and trick wording.

Lenders must also user-test their interfaces and run periodic internal audits to catch unfair design. That puts a compliance owner on the hook for screens that a growth team used to ship on a Friday.

We have looked at this pattern before on the consumer side, in the [PhysicsWallah checkout fine](/blog/ccpa-dark-patterns-checkout-copy). The difference now is that a regulator with licensing power over the lender is writing the rule, not a consumer authority acting after a complaint.

## Where funnels will break

Most fintech funnels we audit fail on the same four screens.

| Funnel element | Common current setup | Under the new directions |
|---|---|---|
| Consent checkbox on lead form | Pre-ticked, one box covering calls, WhatsApp and partner offers | Default No, separate opt-in per product and per channel |
| Offer screen | "Offer expires in 09:59" timer | Countdown creating false urgency is prohibited |
| Loan plus insurance | Cover added to the cart by default | Basket sneaking and compulsory bundling both prohibited |
| Decline path | Small grey text, or a guilt line such as "No, I don't want to save" | Confirm shaming prohibited |

The consent point matters most for performance teams. A lead form with a single pre-ticked "I agree to be contacted" is how most Meta and Google lead-gen forms are built, and a huge share of the lender's remarketing list comes from it. Under a default-No rule, that list shrinks and the leads that remain are worth more.

## Agents and lead partners are inside the perimeter

The definition of Direct Selling Agents and Direct Marketing Agents now expressly includes Loan Service Providers. The lender has to keep a website list of all empanelled agents, with type, address, engagement period and products handled, and update it within seven calendar days of a change.

Agents must give fee and rate disclosure upfront, contact customers only between 9:00 AM and 7:00 PM unless the customer asks otherwise, and may not misrepresent themselves as employees of the lender. Every agent signs an undertaking before starting.

If you run lead generation for an NBFC, your agency is very likely one of those agents in the regulator's eyes. Ask your client whether you appear on their published list. If you do not, that is a conversation to have this quarter, not in December.

## Mis-selling now has a definition and a refund

The directions define mis-selling as selling an unsuitable product even with consent, selling on incomplete or misleading information, selling without explicit consent, and compulsory bundling. Established mis-selling triggers a full refund, cancellation where applicable, and compensation for loss under the lender's board-approved policy.

Customers can complain within 30 days of receiving the signed agreement. The lender must also collect feedback within 30 days of sale, through a team independent of sales, to confirm the customer understood the product and its risks.

> A consent you cannot prove is a consent you did not get. Log the screen, the default state, the timestamp and the OTP.

Consent records are to be retained for one year after the agreement, according to one law-firm summary of the final text. Read the direction itself for the exact retention clause before you design the logging.

## What we would do before 1 January

Start with an inventory. List every screen where a customer says yes to anything: lead forms, in-app permissions, WhatsApp opt-ins, insurance add-ons, e-mandate pages. Screenshot each one with its default state.

Then fix in this order. Flip every default to No. Split multi-product consents. Delete countdown timers and "rate will rise" prompts from offer screens and retargeting creative. Rewrite decline buttons so they say what they do. Only after that, re-measure conversion, because the funnel numbers you see after the fix are the real baseline for 2027.

Two caveats. First, we are working from secondary summaries of the final text, and they do not agree on every detail: one summary of the earlier draft gave a 9 AM to 6 PM contact window, while summaries of the final NBFC text say 7 PM. Have the lender's compliance team confirm clauses against the RBI notification before you build anything. Second, the directions leave penalties to existing RBI enforcement powers, so we cannot tell you a rupee figure.

If you want a second pair of eyes on a fintech funnel, our [performance marketing team](/services/performance-marketing) does this kind of screen-by-screen audit, and our [fintech page](/industries/fintech) shows the work.

Sources: [RBI Amendment Directions on NBFC Advertising, Marketing and Sale of Financial Products, Mondaq](https://www.mondaq.com/india/financial-services/1814686/rbi-amendment-directions-on-nbfc-advertising-marketing-and-sale-of-financial-products), [RBI Tightens Rules on Advertising, Marketing and Sale of Financial Products, CorpLawUpdates](https://www.corplawupdates.in/updates/rbi-tightens-rules-advertising-marketing-sale-financial-products-regulated-entities), [Selling Without Deceiving: RBI Responsible Business Conduct Second Amendment Directions 2026, VIPS Law Blog](https://vipslawblog.wordpress.com/2026/09/18/selling-without-deceiving-unpacking-the-rbis-responsible-business-conduct-second-amendment-directions-2026/), [From Consent to Compensation: RBI Draft Directions on Sales Practices, Vinod Kothari Consultants](https://vinodkothari.com/2026/02/rbis-draft-directions-on-sales-practices/)
