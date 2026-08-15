# Publishing an article

Everything in this folder becomes a blog post. One `.md` file per article.

## The three-step version

1. Copy `_TEMPLATE.md` to a new file, e.g. `2026-09-01-creative-volume.md`
2. Fill in the block at the top, write the article underneath
3. Run `npm run blog:check`, then commit and push

It goes live on the date in `publishAt`. You do not need to be at your computer
that day.

---

## The block at the top

Everything between the two `---` lines. This is the metadata.

| Field | Required | What it does |
|---|---|---|
| `title` | yes | The headline. Shows on the card, the article, and in Google. Keep under 60 characters |
| `slug` | yes | The URL — `instantproduction.in/blog/your-slug`. Lowercase, hyphens, no spaces |
| `excerpt` | yes | The summary on the card and in search results. Under 160 characters |
| `category` | yes | The chip on the card. One category per post |
| `banner` | yes | The header image, e.g. `/images/blog/thing.webp`. File goes in `public/images/blog/` |
| `bannerAlt` | no | What the image shows. Add it — screen readers and Google both use it |
| `publishAt` | yes | `YYYY-MM-DD`. The article appears on this date and not before |
| `tags` | no | `[D2C, Creative Testing]`. Readers can filter the blog by these |
| `keywords` | no | Search terms you are targeting. Used in the page metadata |
| `related` | no | `[other-slug, another-slug]` — renders a "Read next" block at the end |
| `metaTitle` | no | Overrides `title` in search results only, if you want them different |
| `metaDescription` | no | Overrides `excerpt` in search results only |
| `updated` | no | `YYYY-MM-DD` if you revise an old post. Shows as "Updated" and refreshes the sitemap |
| `draft` | no | `draft: true` keeps it out of every build regardless of date |

`draft: true` and a future `publishAt` do different things. A draft is never
published, whatever the date. A future date is published automatically when the
date arrives. Delete the `draft` line when the piece is finished.

## Writing the body

Plain Markdown. The bits you will use:

```
## Section heading
### Sub-heading

A paragraph. Blank line between paragraphs.

**bold**  *italic*  `code`

[link text](/services/video-production)     internal — no page reload
[link text](https://example.com)            external — opens in a new tab

- bullet
- bullet

1. numbered
2. numbered

> A blockquote becomes a highlighted callout box.

| Column | Column |
|---|---|
| cell | cell |

![alt text](/images/blog/diagram.webp)

---     a horizontal rule
```

Do not use a single `#` for headings. That is reserved for the title, which
comes from the block at the top. The check will tell you if you slip.

Reading time is calculated from the word count. You do not set it.

## Images

Put them in `public/images/blog/` and reference them as `/images/blog/name.webp`.

WebP, under 200 KB, 1600×900 for banners. If you have a JPEG or PNG, convert it
first — there is a one-line command in the main README.

The check will fail if you reference an image that is not there, which is the
single most common way a post breaks.

## Interlinking

Every article should link at least once into the rest of the site. It helps
readers, and it is most of what internal-link SEO actually is.

Valid destinations:

```
/services/ai-content-strategy      /industries/healthcare
/services/video-production         /industries/ecommerce
/services/performance-marketing    /industries/fintech
/services/influencer-marketing     /industries/education
/services/website-development      /industries/beauty
/portfolio  /about  /contact       /industries/real-estate
/blog/some-other-post
```

The check verifies each one against that list. A typo'd internal link is worse
than no link, so this fails the build rather than warning.

Write link text that describes where it goes. `[our performance marketing
work](/services/performance-marketing)`, not `[click here](...)`.

## The check

```
npm run blog:check
```

Tells you what is live, what is scheduled, what is a draft, and anything broken.
Errors stop the build. Warnings are advice — thin word count, an excerpt that
will get truncated, a missing alt text.

Run it before you push. It takes a second and saves a failed deploy.

## How scheduling actually works

The build script drops any post dated later than today, so a scheduled article
is not in the site's code at all until its date. Nobody can find it early by
looking at the page source.

A GitHub Action rebuilds the site every morning at 06:00 IST. When a post's date
arrives, that morning's rebuild picks it up and it goes live. You can also
trigger it by hand from the Actions tab if you want something up immediately.

## Editing a published post

Change the file, add `updated: YYYY-MM-DD`, push. Keep the same slug — changing
it breaks every existing link to that article.

## Deleting one

Delete the file. If it had been live and indexed, tell me first so we can add a
redirect rather than leaving a dead URL.
