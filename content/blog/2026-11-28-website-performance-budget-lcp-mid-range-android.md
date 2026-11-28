---
title: "Our website quotes include a speed budget. Here's why"
slug: website-performance-budget-lcp-mid-range-android
excerpt: "We put LCP, JavaScript weight and the test phone into the scope before design starts. What that budget covers, and how we prove it at handover."
category: Performance Marketing
banner: /images/blog/website-performance-budget-lcp-mid-range-android.webp
bannerAlt: "A smartphone showing a glowing amber webpage wireframe, linked by a light trail to a brass stopwatch, with a brass balance scale holding small glass cubes behind, on near-black charcoal"
publishAt: 2026-11-28
tags:
  - Website Development
  - Core Web Vitals
  - Consideration
keywords:
  - website performance budget
  - website development agency India
  - LCP mid-range Android
  - Core Web Vitals landing page
related:
  - agency-reporting-enquiries-cac-not-roas
  - copyright-act-agency-work-ownership-handover
draft: false
metaTitle: ''
metaDescription: ''
updated: ''
---

Every website we quote carries a written performance budget: under 250 kB of JavaScript on first load, and Largest Contentful Paint under 2.5 seconds on a mid-range Android phone over 4G. It sits in the scope next to the page list, so speed is a deliverable you can check at handover, not a promise made in the pitch.

This post explains what that budget means, why we pick those numbers, and what we will push back on to keep it.

## Why a budget, and why in the scope

Most website briefs we see list pages, features and a reference site the client likes. Speed shows up, if at all, as "should be fast". That word cannot be tested, so it gets traded away one decision at a time: a heavier slider here, a chat widget there, three tracking scripts added in the last week before launch.

A budget turns "fast" into a number that every later decision has to fit inside. When someone wants a new animation library, the question stops being "does it look good?" and becomes "what do we remove to make room for it?" That conversation is far cheaper before design than after launch.

> If speed is not written into the scope, it is the first thing to go when the deadline gets close.

## The numbers we use, and where they come from

The LCP figure is not ours. Google's own guidance on web.dev says sites "should strive to have Largest Contentful Paint of 2.5 seconds or less", measured at "the 75th percentile of page loads, segmented across mobile and desktop devices." That is the same line Google uses for the Core Web Vitals report in Search Console, so a site built to it is being judged on the scale the platforms already use.

What we add is the test condition. A budget measured on the developer's laptop over office Wi-Fi tells you nothing about the people clicking your Meta and Google ads. So we test on a mid-range Android over a 4G connection, because that is much closer to the phones and networks behind an Indian brand's ad traffic than a flagship handset is.

| Budget line | Our target | Why it matters |
|---|---|---|
| Largest Contentful Paint | Under 2.5 s, mid-range Android, 4G | Google's "good" threshold for LCP |
| JavaScript on first load | Under 250 kB | Scripts are what slow cheaper phones the most |
| Accessibility | Built in from the start | Not bolted on after a complaint |
| Editing | Your team updates content | No retainer needed to change a headline |

## The gap the budget is closing

The 2025 Web Almanac from HTTP Archive, published in January 2026 using Chrome UX Report data from July 2025, shows how far the average site still is from these lines. Only 48% of mobile sites passed all three Core Web Vitals, against 56% on desktop. On LCP alone, 74% of desktop pages were rated good compared with 62% on mobile, and mobile had nearly double the rate of poor experiences, 13% against 7%.

The Almanac puts that gap down to "the combined effects of slower networks and less capable devices on mobile." That is exactly the condition most Indian traffic arrives in, which is why we test there instead of on a flagship phone.

The same chapter found that 76% of mobile pages had an image as their LCP element. For a brand site, that image is usually the hero banner or the product shot, the thing we are making anyway. So the fix is often in how the hero is produced and delivered, not in an expensive rebuild.

## Why a marketing agency cares about milliseconds

Websites sit inside a bigger job for us: strategy, production and media under one roof, pointing the same way. We are measured on enquiries, pipeline, CAC and revenue (we explained that reporting choice in [why our reports lead with enquiries](/blog/agency-reporting-enquiries-cac-not-roas)). A slow landing page quietly taxes every rupee of ad spend sent to it.

The best-known evidence is Google's "Milliseconds make millions" study, run by 55 and Deloitte across 37 European and American brand sites and more than 30 million sessions at the end of 2019. A 0.1 second improvement in mobile site speed was linked to an 8.4% rise in retail conversion rates and 10.1% in travel. For lead-generation sites, the biggest effect was a 21.6% improvement in users reaching the form submission page.

Those are other brands in other markets, five years ago, so treat them as direction rather than a forecast for your site. We will not promise you a conversion uplift from speed work. We will promise that the page your ads land on is not the reason the enquiry never arrived.

## How a budget gets held during a build

The budget is only useful if it shapes decisions early. These are the habits that keep it intact.

### Design starts from the hero, not the menu

Because the hero image is usually the LCP element, we design and shoot it with the delivery format in mind: the right dimensions for a phone screen, a modern compressed format, and never lazy-loaded. The Almanac notes that lazy-loading the LCP image "can be harmful because it delays the main content users are waiting to see", and it is one of the most common mistakes we find on sites we inherit.

### Every script has to earn its bytes

Chat widgets, heatmaps, pop-up builders and duplicate analytics tags each look small. Together they are often the reason a site blows past its JavaScript budget. The rule we work to is simple: a script that nobody can name an owner and a purpose for does not go in.

### Test on the slow phone early, not once before launch

A regression caught in week two is a quick fix. Caught in the last week, it becomes an argument about the deadline.

### Your team can edit it without breaking it

We build so your own team can edit the site, with accessibility built in from the first template. You own everything we make, and websites need no retainer from us.

## What we will say no to

Holding a budget means occasionally disappointing someone in a review meeting. The things we most often push back on:

- **Autoplaying background video in the hero.** We will make the video. We will put it lower on the page or behind a tap, so it does not become the thing every visitor waits for.
- **A heavy page builder for a five-page site.** It saves a week of development and costs every visitor a slower load for the life of the site.
- **"Just add the tag" requests on launch day.** Tags go through the same script list as everything else.

If a feature truly matters more than the budget, we say so, write down the trade-off, and adjust the number with you. What we will not do is quietly miss it and hope nobody checks.

## What you receive at handover

The budget numbers are in the scope you signed, so checking them at handover is a matter of running the same test on the same kind of phone. You own the site and everything in it. If you later move it to another team, the budget goes with it, so the next developer knows exactly what "fast" was agreed to mean.

## Is this for you?

If your site mainly exists to turn paid traffic into enquiries or orders, a written speed budget is one of the cheapest protections you can buy for your media spend. If you need a site that wins design awards with heavy 3D and motion, we will tell you honestly that the two goals pull against each other, and help you decide which one matters more.

You can see how we approach builds on our [website development page](/services/website-development) and in our [portfolio](/portfolio). If you want us to look at a current site or a brief against these numbers, [send it to us](/#contact) and we will reply within one working day.

Sources: [Largest Contentful Paint (LCP), web.dev](https://web.dev/articles/lcp) · [Performance, The 2025 Web Almanac, HTTP Archive](https://almanac.httparchive.org/en/2025/performance) · [Milliseconds make millions, web.dev](https://web.dev/case-studies/milliseconds-make-millions)
