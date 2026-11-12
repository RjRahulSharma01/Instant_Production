---
title: "Platforms won't auto-label the AI ads you upload"
slug: platforms-wont-auto-label-uploaded-ai-ads
excerpt: "A scan of 37,768 Meta ad files found 1 in 11 was AI and 2 disclosed it. Google and Meta only auto-label what their own tools make. The rest is on you."
category: AI Video
banner: /images/blog/platforms-wont-auto-label-uploaded-ai-ads.webp
bannerAlt: "A film strip running through a dark scanner gate on a conveyor, a few frames beyond the gate marked with small glowing amber tags and a tangle of gold filament trailing behind, on near-black charcoal"
publishAt: 2026-11-12
tags:
  - AI video
  - Ad disclosure
keywords:
  - AI ad label India
  - C2PA content credentials ads
  - Google Ads AI created or edited
  - Meta AI info label ads
related:
  - asci-ai-label-six-cases-december-2026
  - google-ads-ai-label-sgi-gap
draft: false
metaTitle: ''
metaDescription: ''
updated: ''
---

If your team generates a clip in one tool, edits it in another and uploads the export to Google Ads or Meta, assume no platform will label it as AI for you. Both companies auto-label what their own generative tools produce. Anything made elsewhere depends on the advertiser ticking a box, and the evidence from September says almost nobody does.

That matters more in India than in most markets. India is one of six jurisdictions where Google now shows an AI label on the ad itself, and ASCI's labelling guidelines apply from 29 December 2026. The label is becoming visible to viewers at exactly the moment the habit of declaring it is weakest.

## What the September scan actually found

Resemble AI published its 2026 Synthetic Advertising Report on 22 October. It pulled ads from Meta's public Ad Library in September 2026: 37,768 image and video files from 15,433 ads run by 509 companies across 26 industries. Its detector flagged 3,379 files, about 8.9%, as AI-generated or manipulated.

Two of those 3,379 mentioned AI anywhere in the ad copy. That is 0.06%.

The provenance number is the one we keep coming back to. Resemble checked 971 files for C2PA metadata, the industry standard for attaching a signed "this was made with AI" record to a file. None carried it, including every file it confirmed as fake.

> A label system built on metadata cannot label what arrives without metadata, and almost nothing arrives with it.

The report has real limits, and PPC Land's breakdown lists them plainly. Every verdict comes from Resemble's own detector, with no published false positive rate or score threshold. "Manipulated" is not defined, so a retouched product photo and a fully generated presenter sit in the same bucket. The disclosure count measures written copy only and would miss a label burned into the video frame. And Resemble sells the detection and watermarking products the report recommends. Treat 8.9% as a rough floor, not a census. The 0.06% and the zero C2PA files are harder to explain away.

## Who labels what, platform by platform

Here is how labelling works for an India-targeted campaign as of this week.

| | Made inside the platform's own AI tools | Made elsewhere and uploaded |
|---|---|---|
| Google Ads | Google may apply the label on your behalf, and its tools embed SynthID and C2PA | Labelled only if you mark the asset "AI created or edited" |
| Meta | Labelled automatically when Meta's tools or industry signals such as C2PA detect AI | Relies on your "AI info" declaration in Ads Manager, unless detection catches it |
| What the viewer in India sees | An on-ad label on Google, an "AI info" tag on Meta | Nothing, unless you declared it |

Google's own help page describes three routes to a label: advertisers adding it, Google's ad products adding it at the advertiser's request, and Google applying it automatically to some ads its own products generate. The machine-readable SynthID and C2PA metadata it mentions is for images and videos "generated within Google Ads tools". A Veo clip from Asset Studio arrives labelled. A Runway or Kling clip cut in Premiere does not.

On 5 November Google added California, South Korea and Vietnam to the regions where the label appears on the ad itself, joining the EU, India and New York. Search Engine Roundtable's report on the change is clear that the visible overlay depends on the advertiser designating the asset. Outside those six regions, the disclosure only shows inside About this Ad.

Meta's side works the same way in practice. Its automatic labelling leans on its own tools and on signals such as C2PA. For India-targeted campaigns, Ads Manager has shown advertisers an "AI info" section with a toggle reading "Ad includes media created or edited with AI", reported from July 2026. That toggle is a declaration. Nothing checks it for you before launch.

One detail caught a few teams we spoke to this month. Meta's Graph API v27.0, released on 4 November, added an `is_ai_generated` field. It applies to Page posts, not ad creatives, so a scheduling tool that sets it has not labelled your ads.

## Why your files arrive with no provenance

C2PA metadata is cryptographically signed, which makes it hard to fake and easy to lose. The Content Authenticity Initiative said as much in January: "it is still common for social media and content platforms to remove metadata." Its answer is "durable" credentials, which pair metadata with an invisible watermark and a fingerprint so the record can be recovered after stripping. Most ad pipelines in India are not built that way yet.

Look at how a typical performance video gets made here. The base shot comes from a generator. It goes into Premiere or CapCut for a Hindi voiceover, a price super and an end frame. It is exported, resized for Reels and Shorts, maybe compressed again by a trafficking tool, then uploaded. Every one of those steps can drop the metadata. By the time the file reaches Meta's or Google's servers, it looks like any other video.

So the gap is structural. The detection layer works on files that still carry their history, and the production layer strips that history as a side effect of normal editing.

## Why this lands harder in India

Three Indian obligations now point at the same frame.

The IT Amendment Rules 2026, in force since 20 February, require significant social media platforms to label synthetically generated information and collect a declaration at upload. We covered what that upload declaration means for agencies in [our October piece on the SGI rules](/blog/ai-ad-upload-declaration-sgi-rules-india). Platforms meet that duty by asking you. If you answer wrongly, the false declaration is yours.

ASCI's Guidelines for Responsible Labelling of Synthetically Generated Content in Advertising apply from 29 December 2026. They ask for a label only where synthetic content materially influences a buyer's decision: a synthetic presenter, a cloned voice, a realistic product demonstration. The six cases are in [our breakdown of the ASCI guidelines](/blog/asci-ai-label-six-cases-december-2026). A complaint to ASCI will not care whether Meta's detector missed the file.

Google's on-ad label means Indian viewers will start seeing which ads were declared. Once some ads in a category carry the label, the unlabelled ones that are obviously synthetic start to look like they are hiding something.

## What we changed in our own workflow

We stopped treating the platform as the safety net. Every AI-assisted asset now gets a line in the trafficking sheet: which tool made which shot, whether a real person's face or voice was synthesised, and whether ASCI's materiality test applies. The person uploading reads that line before deciding on the Google asset label and the Meta "AI info" toggle. It takes about a minute per asset.

We also burn the on-screen label into the edit when ASCI would require one, instead of relying on the platform overlay. The overlay only appears in some regions and some placements. A burned-in label travels with the file to YouTube, Meta, OTT and the client's own website, and it survives every re-export.

Finally, we no longer promise clients that "the platform will flag it." Google's help page and Meta's own policy both say, in effect, that uploaded creative is the advertiser's declaration to make.

If you run performance campaigns with AI-assisted creative and want a second pair of eyes on which assets need a label before 29 December, [talk to us](/#contact). The honest caveat: nobody outside a platform can see how well its detector works, so a process that assumes detection will fail is the only one you can actually audit.

Sources: [Only 2 of 3,379 AI-flagged Meta ad files disclosed AI use, PPC Land](https://ppc.land/only-2-of-3-379-ai-flagged-meta-ad-files-disclosed-ai-use-resemble-ai-finds/), [2026 AI in Advertising Report, Resemble AI](https://www.resemble.ai/resources/2026-ai-in-advertising-report), [Google Ads Expands AI Content Disclosure Label To More Regions, Search Engine Roundtable](https://seroundtable.com/google-ads-expands-ai-content-label-disclosure-42461.html), [AI Transparency in ads, Google My Ad Center Help](https://support.google.com/My-Ad-Center-Help/answer/17196133?hl=en), [AI Ad Labels Are Now an Account Setting, Mintec](https://mintec.co/blog/ai-ad-labels-account-setting/), [The three pillars of provenance, Content Authenticity Initiative](https://contentauthenticity.org/blog/three-pillars-of-provenance), [Meta Mandates AI Disclosure Labels for Ads Targeting India, Ministry of Cyber Affairs](https://ministryofcyberaffairs.com/news/meta-mandates-ai-disclosure-labels-for-ads-targeting-india-c576e1f7-22ce-49ec-8c8d-57f444060e07)
