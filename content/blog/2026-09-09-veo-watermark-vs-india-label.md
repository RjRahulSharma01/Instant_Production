---
title: Veo's watermark is not the label India wants
slug: veo-watermark-vs-india-label
excerpt: Google Ads Asset Studio builds a 10-second Veo ad with SynthID baked in. India asks for a label a viewer can actually see. Those are different jobs.
category: AI Video
banner: /images/blog/veo-watermark-vs-india-label.webp
bannerAlt: A strip of film with faint amber runes glowing inside the emulsion, next to a blank adhesive label peeled off and curling away
publishAt: 2026-09-09
tags:
  - AI Video
  - Compliance
keywords:
  - veo google ads asset studio india
  - synthid watermark ad compliance
  - synthetically generated information label india
  - ai video ad disclosure asci
related:
  - ai-video-ad-labelling-india
  - ai-video-actually-worth-it
draft: false
metaTitle: ''
metaDescription: ''
updated: ''
---

A Veo clip generated inside Google Ads Asset Studio carries SynthID, an invisible watermark embedded in the pixels of every frame. India's IT Amendment Rules 2026 do not ask for an invisible watermark. They ask for a label that is prominent, easily noticeable and adequately perceivable to the person watching. Asset Studio gives you the first and not the second, and nothing in the workflow tells you that.

We started seeing this the week Veo went live in Asset Studio globally on 26 March 2026. Upload up to three product images, get a video up to 10 seconds with natural motion, drop it into a template, serve it. The friction that used to sit between an idea and a YouTube asset is gone. The friction that used to sit between an idea and a compliant YouTube asset is not.

## What SynthID actually does

Google DeepMind's SynthID adds a digital watermark directly into the pixels of AI-generated images and video segments. It is imperceptible to humans, added at the moment of creation, and built to survive cropping, filters, frame rate changes and lossy compression. That is genuinely useful engineering.

It is also, by design, not something a viewer will ever notice. Verification runs through Gemini (upload the file, ask whether it was created by Google AI) or through the SynthID Detector portal, which as of now is still gated behind an early tester waitlist that Google is running with journalists and media professionals.

So the provenance signal exists. It just lives in a place your consumer is never going to look, and your compliance officer cannot currently query at scale.

## What India actually asks for

MeitY notified the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Amendment Rules, 2026 on 10 February 2026, in force from 20 February. The draft version had proposed a hard rule: a watermark covering 10% of the display surface area. That got dropped.

What replaced it is a qualitative standard. Visual synthetically generated information must carry a label that is prominent, easily noticeable and adequately perceivable. Audio SGI needs a prominently prefixed audio disclosure. No percentages, no pixel counts, no safe harbour of "we did the 10%, we are done."

The definition of SGI matters as much as the label. It covers audio, visual or audio-visual content created or altered artificially so as to appear real, authentic or true, and indistinguishable from a natural person or a real-world event. MeitY's own FAQ narrows it further: SGI is synthetic media that realistically appears like a real person or a real-world event and is capable of deceiving viewers. Text-only content, routine editing, accessibility work and translation are explicitly carved out.

> The trigger is not "we used AI." The trigger is "a viewer could mistake this for something that happened."

That distinction is the whole game for an ad team. A Veo clip of your bottle rotating against an abstract gradient is not depicting a real-world event. A Veo clip of a family in a real-looking Indian kitchen using your product is.

## Where the two systems diverge

| | SynthID | IT Amendment Rules 2026 |
|---|---|---|
| Visible to the viewer | No | Yes, required |
| Applies to | Google-generated media | Any synthetic media that looks real |
| Who is on the hook | Google | The platform, and via ASCI, you |
| Survives re-editing | Usually | Only if you re-apply it |
| Verifiable today | Gemini, or a waitlisted portal | By looking at the ad |

The last row is the one that bites. Nobody at ASCI is going to run your creative through a Gemini prompt. They are going to watch the ad the way a consumer watches it.

## The re-edit problem nobody flags

Asset Studio output rarely ships untouched. It goes into an edit, gets a Hindi voiceover, a price super, a festive endframe, a different aspect crop for Shorts. Google says SynthID is built to survive cropping, filters and compression, and in our testing that generally holds for straight transformations of Google-generated frames.

What it does not do is propagate to footage that was never Google-generated. Composite a Veo shot into a 30-second film with live-action coverage and the watermark now covers a fraction of the timeline. Whether the finished ad reads as SGI has nothing to do with which frames carry a watermark and everything to do with whether the finished ad depicts something that looks real.

We now treat the SGI question as an edit-level decision, not a shot-level one, on every [video production](/services/video-production) job that touches generative footage. The question we ask is: would a reasonable viewer, watching this cut once at normal speed on a phone, believe the person or place in it exists? If yes, it gets a label, regardless of how many seconds of it came out of Veo.

## What ASCI adds on top

The IT Rules bind intermediaries. ASCI's draft guidelines, released 8 May 2026 with consultation open until 13 June 2026, bind advertisers, and they are deliberately aligned to the same 10 February amendment.

ASCI sorts AI use into three tiers. High risk is prohibited outright, label or no label: fabricated endorsements, misleading product demonstrations, fake realistic locations, unauthorised deepfakes, AI-generated fictional authority figures such as a synthetic doctor recommending a product. A disclosure does not rescue any of these.

Medium risk requires a label, and this is where most Asset Studio work lands: virtual influencers, likeness or voice replication even with consent, synthetic product demonstrations, fictional AI-generated events or settings, demonstrations of products that do not exist yet. ASCI's proposed wordings are "Audio/Video created using AI" or "Audio/Video enhanced using AI."

Low risk needs nothing: colour correction, background visuals, ambient music, fantastical effects like dragons or fairies, accessibility work. Notice that fantastical effects sit in the safe tier. A dragon is not deceiving anyone about a real-world event, which is exactly consistent with how MeitY drew the SGI line.

The practical read for a performance team: a stylised, obviously-unreal Veo treatment is cheaper to run than a photoreal one, not in media cost but in compliance overhead. That is a creative brief input now, and it belongs in the brief before anyone opens Asset Studio.

## What we changed in our own process

Three things, all boring, all cheap.

First, a field in the asset naming convention that records whether a cut contains SGI. It travels with the file into the ad account, so anyone pulling an asset six weeks later knows what it needs without re-watching it.

Second, the label goes on in the edit, not in the ad platform. Platform-side disclosure toggles exist, but they render differently across placements and some of them are invisible in the feed. A burned-in label is ugly and it works. We put it on the first frame and hold it for the first two seconds, because a label that appears at second eight on a ten-second bumper is a label nobody sees.

Third, we stopped assuming the Google side of the stack covers the India side. It never claimed to. SynthID is a provenance system for the internet. The Amendment Rules are a disclosure system for a viewer. They solve adjacent problems and only one of them is a legal obligation here.

## If you are already running Veo assets

Pull the ones live right now and sort them into two piles: does this depict a person, place or event a viewer could take as real, or not. The second pile is fine. The first pile needs a visible label, and the fastest fix is usually a re-upload with a burned-in first-frame disclosure rather than a rebuild.

The honest caveat: ASCI's guidelines were still in draft when we wrote this, and the final version may move the tier boundaries. The IT Rules are not draft, they are in force, and the standard there is qualitative, which means it will get interpreted case by case rather than measured. Erring toward a visible label costs you a corner of frame one. Erring the other way costs you a takedown window measured in hours.

If you want a second pair of eyes on a specific cut before it goes live, [talk to us](/#contact).

Sources: [MeitY notifies the IT Amendment Rules 2026, Khaitan & Co](https://www.khaitanco.com/thought-leadership/MeitY-notifies-the-IT-Amendment-Rules-2026), [ASCI releases draft guidelines for responsible labelling of AI-generated advertising content, MediaNews4U](https://www.medianews4u.com/asci-releases-draft-guidelines-for-responsible-labelling-of-ai-generated-advertising-content/), [Veo Video Generation Now Available in Google Ads, PPC News Feed](https://ppcnewsfeed.com/ppc-news/2026-03/veo-video-generation-available-google-ads/), [SynthID, Google DeepMind](https://deepmind.google/models/synthid/)
