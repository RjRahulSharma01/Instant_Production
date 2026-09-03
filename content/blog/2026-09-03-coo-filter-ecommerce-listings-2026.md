---
title: Country of origin is now a filter, not a label
slug: coo-filter-ecommerce-listings-2026
excerpt: Rule 6(10A) took effect on 1 July 2026. Every imported product you list must now be findable through a country-of-origin filter, not just a label line.
category: Content Strategy
banner: /images/blog/d2c-margin-after-everyone.webp
bannerAlt: Packaged retail products lined up for online listing photography
bannerCaption: ''
publishAt: 2026-09-03
tags:
  - Content Strategy
  - Compliance
keywords:
  - country of origin filter e-commerce india
  - legal metrology packaged commodities amendment rules 2026
  - rule 6(10A) imported product listing
  - e-commerce listing compliance india
related:
  - d2c-unit-economics-2026
  - ccpa-dark-patterns-checkout-copy
draft: false
metaTitle: ''
metaDescription: ''
updated: ''
---

If you sell an imported packaged product online in India, country of origin stopped being a line of text on 1 July 2026. Rule 6(10A) of the Legal Metrology (Packaged Commodities) Rules, 2011 now requires every e-commerce entity selling imported products to make those products discoverable through a searchable filter and sortable by country of origin. Writing "Country of Origin: Vietnam" in the description no longer satisfies it.

The change came through the Legal Metrology (Packaged Commodities) Amendment Rules, 2026, notified as G.S.R. 128(E) on 13 February 2026 by the Department of Consumer Affairs. The gap between notification and enforcement was about four and a half months — deliberately, to give platforms time to rebuild listing schemas.

## What the rule actually asks for

Two things, and they are different from each other.

First, imported products must be surfaced through a **searchable filter**. A shopper looking for products from a particular country should be able to find them without scrolling through every SKU.

Second, the listings must be **sortable by country of origin**. That means origin has to exist as a structured field in your catalogue, not as free text buried in a bullet list.

The distinction matters because most brands we work with already declare origin somewhere. They declare it as prose. Prose cannot be sorted. A filter needs a normalised value — "Vietnam", not "Made in Vietnam (Assembled)" on one SKU and "VN" on the next.

## Who it applies to

Rule 6(10A) reads across the definitions in Rules 2(bd), 2(be) and 2(bf) of the 2011 Rules, which means it does not stop at the big marketplaces. It covers:

| Entity type | Covered | Practical implication |
|---|---|---|
| Marketplace platforms | Yes | Must expose an origin filter in category navigation |
| Inventory-led e-commerce | Yes | Own catalogue, own compliance, no seller to blame |
| Foreign e-commerce entities in India | Yes | Applies to the India-facing storefront |
| D2C brands selling imported goods | Yes | Your own Shopify or WooCommerce store counts |

That last row is the one people miss. A D2C skincare brand importing actives from Korea and shipping from a Gurugram warehouse is an e-commerce entity under these Rules. Running your own domain does not put you outside them.

## The penalty is smaller than the cleanup

Non-compliance falls under Section 36 of the Legal Metrology Act, 2009, which since the digital-mode amendments explicitly reaches pre-packaged commodities sold through e-commerce platforms and electronic service providers. A first offence carries a fine up to Rs 25,000, a second up to Rs 50,000, and a subsequent offence a fine of not less than Rs 50,000 extending to Rs 1,00,000, or imprisonment up to one year, or both.

Rs 25,000 will not close a business. The cost sits elsewhere: legal metrology inspectors issue notices per listing, not per company, and a catalogue with 400 imported SKUs and no structured origin field is 400 exposures with a paper trail attached. Responding to those notices, SKU by SKU, is where the money and the calendar actually go.

> The fine is a rounding error. The audit trail it creates is not.

## The May amendment nobody read

While platforms were rebuilding filters, a second change landed upstream. The Legal Metrology (Packaged Commodities) Third Amendment Rules, 2026, issued on 29 May 2026 and effective 1 June 2026, inserted Explanation 2 to Rule 4. It permits importers to affix mandatory declarations on retail packages inside bonded warehouses run by Authorised Economic Operator Tier-2 and Tier-3 certified entities in India — provided every declaration is on the pack before it leaves that warehouse.

For a brand importing in bulk, that is genuinely useful. It means the origin declaration can be applied domestically at a compliant facility rather than being pre-printed overseas, which shortens the lead time on any label correction from a production cycle to a warehouse shift. If your supply chain is the reason your origin data is inconsistent, this is the lever.

## What we do when we pick this up

Origin is a catalogue-hygiene problem wearing a compliance costume. The sequence that works:

**Separate imported from domestic first.** Most catalogues cannot answer "which of these are imported" without someone opening invoices. Until that flag exists as a field, no filter can be built on top of it.

**Normalise to one value per country.** Pick a single canonical spelling and enforce it at data entry. Mixed values are why filters return half the products they should.

**Bind the backend field to the frontend facet.** Plenty of stores have origin sitting in a metafield that never renders as a filter. The rule is about discoverability, so a populated field that no shopper can filter on does not get you there.

**Fix the listing copy last.** Once origin is structured, the product description can stop carrying it as prose — which frees up the first two lines of copy for something that actually sells. We treat this as part of the same pass as the rest of the [listing content strategy](/services/ai-content-strategy), because doing it twice is wasteful.

If you sell across marketplaces and your own store, do the marketplace feed last. Marketplace schemas will accept a clean origin field; they will not clean a dirty one for you.

## The honest caveat

Rule 6(10A) is a discoverability requirement, not a truth requirement. Nothing in the amendment verifies that the origin you declare is correct — that question sits with customs classification and with Section 36 exposure if the declaration is wrong. A brand that builds a beautiful filter on inaccurate origin data has made its own misdeclarations easier for an inspector to sort by.

So the first thing to check is not your product page. It is whether the country of origin on your bill of entry matches the country of origin in your catalogue, SKU by SKU. If those two lists disagree, fix that before you build anything a regulator can sort.

For brands running imported catalogues at scale, this pairs directly with the margin work — see our note on [what is left of a D2C rupee in 2026](/blog/d2c-unit-economics-2026), and how we approach [e-commerce accounts](/industries/ecommerce).

Sources:

- [New Rule Requires E-commerce Platforms to Clearly Display Country of Origin for Imported Products — SCC Times, 21 February 2026](https://www.scconline.com/blog/post/2026/02/21/legal-metrology-packaged-commodities-amendment-rules-2026-explained/)
- [LMPC Rules Amended: New Compliance for E-Commerce — Chambers and Partners](https://chambers.com/articles/lmpc-rules-amended-new-compliance-for-e-commerce)
- [G.S.R. 128(E), Department of Consumer Affairs, 13 February 2026](https://consumeraffairs.gov.in/public/upload/files/2026.02.13%20PCR%201st%20COO%20Filter%20on%20e-commerce%20websites_1771231030.pdf)
- [Legal Metrology (Packaged Commodities) Third Amendment Rules, 2026 — TeamLease RegTech](https://www.teamleaseregtech.com/updates/article/56490/legal-metrology-packaged-commodities-third-amendment-rules-2026/)
- [The Legal Metrology Act, 2009 — India Code](https://www.indiacode.nic.in/bitstream/123456789/2102/1/2009l.pdf)
