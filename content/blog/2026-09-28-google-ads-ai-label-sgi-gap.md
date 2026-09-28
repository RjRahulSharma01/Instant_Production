---
title: "Your Google AI ad label doesn't satisfy India's SGI rule"
slug: google-ads-ai-label-sgi-gap
excerpt: "Google's new AI ad label is self-declared and unchecked. India's SGI rule needs a visible on-ad label the platform has verified."
category: AI Video
banner: /images/blog/google-ads-ai-label-sgi-gap.webp
bannerAlt: "A glowing toggle switch beside a stamped amber compliance seal, both floating against a dark charcoal backdrop"
publishAt: 2026-09-28
tags:
  - AI Video
  - Compliance
keywords:
  - google ads ai label india
  - sgi labelling rules india
  - ai generated ad disclosure compliance
related:
  - ai-video-ad-labelling-india
  - veo-watermark-vs-india-label
draft: false
metaTitle: ''
metaDescription: ''
updated: ''
---

Google's new AI ad label, rolled out through July 2026 across Search, YouTube and Discover, is a checkbox advertisers tick themselves. Google says plainly it will not verify whether AI was actually used. India's SGI rule works the opposite way: the platform has to check the declaration, not just display it. Ticking Google's box does not clear that bar.

## What Google actually shipped

The feature sits inside My Ad Center. A viewer opens the three-dot menu or info icon on an ad and finds a section called "How this ad was made," which states whether AI was involved in creating or editing it. Google's own advertising policy page names three places this now matters for compliance purposes: the European Union, India, and New York, because all three have rules requiring disclosure of AI-generated or AI-edited assets.

Disclosure works two ways. If an advertiser builds the creative inside Google's own generative tools, such as Product Studio or Asset Studio, the label attaches automatically. If the creative came from anywhere else, including Midjourney, Runway, Sora, or an agency's own pipeline, the advertiser has to flip a manual control. Google's policy page is explicit that using this setting "does not guarantee compliance with specific local regulations," and its advertiser-facing writeup on the launch confirms Google is not independently checking the claim either way.

That second part is the whole problem for an Indian campaign. A self-reported, unverified toggle sitting three taps deep in a menu most viewers never open is not what the IT Rules ask for.

## What India's SGI rule actually asks for

The Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Amendment Rules, 2026 were notified on 10 February 2026 and took effect on 20 February. They created a defined category, synthetically generated information (SGI): audio, visual or audio-visual content made or altered with a computer resource in a way that appears real and would be taken for a genuine person or event. [We covered the full definition and its carve-outs separately](/blog/ai-video-ad-labelling-india), but two obligations matter here specifically.

First, the label itself has to be on the content, not buried in a settings panel. The final rules dropped the draft's 10% screen-coverage number and replaced it with a qualitative bar: visual SGI needs a label that is prominent, easily noticeable and adequately perceivable to an ordinary viewer, and audio SGI needs a prefixed spoken disclosure. A label reachable only by clicking an info icon does not meet a "prominent and easily noticeable" test on its own.

Second, the checking happens on the platform's side, not the advertiser's word. Significant social media intermediaries, meaning platforms with more than five million registered Indian users such as YouTube and Meta, must require a declaration at upload and deploy technical measures to verify it. The earlier draft's "endeavour to deploy" language became a hard "deploy appropriate technical measures" in the final rules. A platform that knowingly lets undeclared or mislabelled SGI through risks its safe harbour protection under Section 79 of the IT Act.

Google Ads' toggle satisfies neither half. It is not a label on the creative, and it is not a verified declaration flowing through to the platform's own upload-side checks.

| | Google's AI ad label | India's SGI requirement |
|---|---|---|
| Where it appears | My Ad Center, behind a menu, on the ad only "based on local requirements" | On the content itself, prominent and easily noticeable |
| Who declares it | The advertiser, self-reported | The uploader, at time of upload |
| Who verifies it | Nobody, by Google's own statement | The platform, using deployed technical measures |
| What non-compliance risks | Google ad policy action | Platform safe harbour loss; advertiser liability under ASCI's Code |

## Where this actually bites a campaign

Most of what agencies run through Google's generative tools right now is safe. Background cleanup, an upscaled product shot, a colour-graded cutdown: none of that is SGI, and none of it needs either label.

Three places it does bite. A synthetic presenter delivering a product pitch in a Performance Max video asset counts as SGI under the Amendment Rules and as medium-risk under ASCI's draft guidelines, which call for disclosure regardless of what Google's toggle says. A generated demo shot, a serum absorbing into skin that was never filmed, a car interior that does not exist, carries the same exposure. And a virtual influencer or AI double of a real spokesperson needs a label on the creative even when the manual "AI-assisted" control in Google Ads was never touched at all, because the obligation sits with the advertiser and the uploading platform, not with an ad-tech setting.

> The Google toggle tells Google what it thinks it made. It does not tell India's platforms or India's regulator that the declaration was checked.

We have started treating the Google Ads AI label the way we treat alt text: worth filling in, never a substitute for doing the actual compliance work. A client running AI-generated video through [our video production](/services/video-production) pipeline still gets an on-creative label sized and timed against ASCI's disclaimer legibility rules, independent of whatever box got ticked in the ad platform.

## What to check before the next upload

Run every AI-touched video asset against ASCI's three-tier test before it goes near Google Ads: prohibited content stays prohibited no matter how it is labelled, medium-risk content (synthetic presenters, AI product demos, virtual influencers) needs an on-creative label, and routine editing needs nothing. Keep a record of that classification separately from Google's settings, because Google's own disclosure history for a campaign is not the audit trail an Indian regulator or ASCI complaint would ask for.

If a client insists the Google Ads toggle is enough, the honest answer is that it covers a different problem: helping Google's own users understand an ad, not satisfying a statutory labelling and verification requirement aimed at platforms and advertisers. Those two things reading the same word, "AI," does not make them the same obligation.

Sources:
- [Updates to AI labeling requirements (July 2026), Google Ads Advertising Policies Help](https://support.google.com/adspolicy/answer/17257106?hl=en)
- [Google introduces new AI labels for Ads, Google](https://blog.google/products/ads-commerce/google-ads-ai-transparency-labels/)
- [Google will now disclose which ads are made with AI, TechCrunch](https://techcrunch.com/2026/07/09/google-will-now-disclose-which-ads-are-made-with-ai/)
- [Beyond the Draft: India's Amended IT Rules for Synthetically Generated Information, Rodl](https://www.roedl.it/en-gb/it/insights/pages/tech-data-bites/2-26/beyond-draft-indias-amended-it-rules-synthetically-generated-information.aspx)
