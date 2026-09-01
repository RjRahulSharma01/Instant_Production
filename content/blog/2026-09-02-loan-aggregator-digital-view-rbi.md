---
title: Loan apps now have to show rival offers
slug: loan-aggregator-digital-view-rbi
excerpt: Para 6 of the RBI Digital Lending Directions took effect on 1 November 2025. A multi-lender loan app must now show every matching offer, not one.
category: Performance Marketing
banner: /images/blog/fintech-cac-trust.webp
bannerAlt: A loan comparison screen showing several lender offers side by side
bannerCaption: ''
publishAt: 2026-09-02
tags:
  - Fintech
  - Performance Marketing
keywords:
  - rbi digital lending directions 2025 marketing
  - loan aggregator digital view para 6
  - digital lending app rbi directory
related:
  - fintech-cac-india
  - dpdp-consent-first-party-data
draft: false
metaTitle: ''
metaDescription: ''
updated: ''
---

If your lending app partners with more than one bank or NBFC, the screen after "check your eligibility" is no longer yours to design. Since 1 November 2025, Para 6 of the Reserve Bank of India (Digital Lending) Directions, 2025 requires that screen to show every lender whose criteria the borrower matched — name, amount, tenor, APR, monthly repayment, penal charges, and a link to each lender's Key Facts Statement. The lenders who did not match have to be named too.

That is a funnel change disguised as a compliance clause. The single-offer landing page — one pre-approved amount, one big yellow button, no alternatives — was the highest-converting screen in Indian digital lending. It is now non-compliant for any multi-lender platform.

## What Para 6 actually says

The RBI notified the Directions on 8 May 2025. Most of the document was consolidation: it folded the June 2023 digital lending guidelines, the September 2022 default loss guarantee rules and the associated FAQs into one instrument. Two things were genuinely new, and both had their own effective dates.

Para 17 required regulated entities to report every digital lending app they or their lending service providers operate to the RBI's CIMS portal by 15 June 2025, with the Chief Compliance Officer certifying the data is accurate.

Para 6 — the multi-lender rules — took effect on 1 November 2025. It applies where a lending service provider sits between the borrower and several regulated entities. In plain terms: loan marketplaces, aggregators, and any embedded-finance surface that shops a single application across a panel.

Three obligations sit inside it:

- A **digital view** of all matching offers, with the RE name, amount, tenor, APR, monthly repayment obligation, penal charges where applicable, and a KFS link per lender.
- Disclosure of the **unmatched lenders** by name.
- **Unbiased presentation.** The LSP cannot directly or indirectly push one RE's product, cannot use dark patterns, and must apply a consistent approach to similarly placed borrowers. If products are ranked, the ranking metric has to be publicly pre-disclosed — and the matchmaking mechanism itself has to be documented.

That last carve-out is the only room left. Ranking is permitted if you publish the rule you rank by. Ranking by which lender pays the best commission, without saying so, is not.

> The compliance question is no longer "did we disclose the APR?" It is "can we document why this lender appeared first, and would we be comfortable publishing that reason?"

## Why this hits acquisition, not just legal

Most fintech growth teams we work with were running a funnel that assumed the offer screen was a closing surface. It is now a comparison surface. Three things break at once.

**Landing page promises stop matching the product.** Creative that says "get your personalised offer" is fine. Creative that implies a single, specific, pre-approved outcome sets up an expectation the compliant screen contradicts, and the mismatch shows up as an application-to-acceptance drop, not as a click-through problem. If you are diagnosing this from click metrics alone you will misread it.

**Attribution windows lengthen.** A borrower shown five offers plus a list of who declined them behaves like a shopper, not a converter. Sessions get longer, comparison happens in-app instead of across four apps, and some share of first-session conversions move to second or third session. Anyone still optimising bids to same-session installs-to-approval will underbid their best cohorts.

**The cooling-off period is a real, budgeted cost.** Borrowers may exit a digital loan during an initial cooling-off window by repaying principal and APR without penalty; the Directions clarify the lender may retain a reasonable one-time processing fee. That means a funded loan is not a settled acquisition. We look at this every time we build a fintech CAC model — if your payback is calculated on disbursal rather than post-cooling-off retention, it is optimistic by whatever your exit rate is.

## The distribution rule most teams missed

Para 17 looked like a filing exercise. It became a distribution gate.

The RBI operationalised a public **Digital Lending Apps directory** on rbi.org.in with effect from 1 July 2025, listing every DLA deployed by a regulated entity, so a borrower can verify an app's claimed association with a bank or NBFC. The Ministry of Finance confirmed this in a Rajya Sabha reply on 17 March 2026, alongside a note that internet intermediaries have been instructed to build real-time vetting to stop advertisements for illegal loan apps originating offshore.

Google Play then attached its store policy to that list. Personal loan apps in India had to appear on the RBI's "DLAs Deployed by Regulated Entities" list by **28 January 2026** to remain on Play. Apps that facilitate lending rather than lend must declare that in the developer declaration and name every partner NBFC and bank in the store listing.

| Requirement | Effective | What it gates |
| --- | --- | --- |
| DLA reporting to CIMS (Para 17) | 15 June 2025 | Whether you appear in the RBI directory |
| RBI public DLA directory live | 1 July 2025 | Borrower-side verification of your app |
| Multi-lender digital view (Para 6) | 1 November 2025 | Your offer screen and ranking logic |
| Play Store listing tied to RBI list | 28 January 2026 | Whether the app is downloadable at all |

The sequencing matters. A missed CIMS filing in June 2025 became an absent directory entry in July, which became a Play Store removal risk in January 2026. No amount of paid spend fixes an app that is not in the store, and a paid campaign pointing at a delisted app burns budget silently — the clicks still bill.

## What we would change in the next sprint

Start with the offer screen, because it is where compliance and conversion are now the same problem. Write down the ranking metric you actually use. If it is APR-ascending, publish that on the page. If it is approval probability, publish that. If you cannot write a sentence you would be willing to show a borrower, the ranking is the problem, not the disclosure.

Then re-baseline. Pull application-to-disbursal for October 2025 and compare it with the same metric from December onwards. If the drop is concentrated at the offer screen rather than at KYC, that is Para 6, not creative fatigue, and no amount of new hooks will recover it. The fix is copy that pre-frames comparison — telling people upfront they will see multiple offers converts better than surprising them with a comparison table they did not expect.

Third, check the store listing against the directory yourself. Not the compliance team's spreadsheet — the actual RBI page, and the actual partner names in your Play description. This takes twenty minutes and it is the single highest-consequence check in the list.

The honest caveat: Para 6 binds the LSP through the regulated entity's contract, and enforcement so far has run through supervisory assessment on a sample basis rather than public penalties. Nobody has been made an example of yet. That is a reason to fix the funnel deliberately over a quarter, not a reason to assume the rule is decorative — the Play Store deadline already demonstrated how quickly a reporting requirement turns into a distribution one.

If you are rebuilding a lending funnel around this, our [fintech work](/industries/fintech) and [performance marketing](/services/performance-marketing) practice both start from the same place: model the cost of the compliant screen before you write the ad. We covered the underlying trust and cost dynamics in [why fintech CAC keeps climbing in India](/blog/fintech-cac-india).

Sources: [RBI (Digital Lending) Directions, 2025](https://rbidocs.rbi.org.in/rdocs/notification/PDFs/36NT8C402BE7C2A349E0BFFF3C526668CD7A.PDF), [Vinod Kothari Consultants analysis of the Directions](https://vinodkothari.com/2025/05/digital-lending-directions-largely-a-consolidation-new-rules-on-multi-lender-platforms-and-lending-apps/), [PIB, Ministry of Finance — Government and RBI Strengthen Measures Against Fraudulent Loan Apps, 17 March 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2241255), [Google Play Console Help — Personal Loans in India](https://support.google.com/googleplay/android-developer/answer/16604194?hl=en)
