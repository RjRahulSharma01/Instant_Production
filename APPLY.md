# update-20 — E-commerce & D2C industry page

The first of the deep-build industry pages. `/industries/ecommerce` now has its
own component instead of the shared `IndustryDetail` template, the same way
healthcare does. The other four industries are untouched and still render from
the template.

## What's in it

Four files.

| File | What it is |
|---|---|
| `src/data/ecommerceData.js` | Every figure on the page, each tagged with a source key |
| `src/components/ecom/EcomViz.jsx` | Nine hand-built SVG/CSS visuals |
| `src/pages/EcommerceD2C.jsx` | The page |
| `src/App.jsx` | Adds the route ahead of `industries/:slug` |

## Applying it

```
cd /Users/rahul/Documents/GitHub/Instant_Production
git checkout main && git pull
cp -R "/Users/rahul/Desktop/Claude Cowork/Instant-Production/redesign/update-20/." .
git add -A
git commit -m "Deep-build E-commerce & D2C industry page"
```

Then push from GitHub Desktop. Assumes update-19 and everything before it is
already applied — it was, as of the clone this was built against.

## No images

Every visual is drawn in code: SVG, CSS and Framer Motion. No photography, no
generated imagery, no chart library. That means nothing to licence, nothing to
attribute, no `IMAGE-CREDITS.md` entry, and no repeat of the `team.webp`
watermark problem. It also keeps roughly 40 kB of charting code out of the
bundle — the whole page is 49 kB, 15 kB gzipped, and lazy-loaded.

The visuals:

1. **Asset fan-out** — one shoot day threading out into 40 derived assets. The page's argument as a diagram.
2. **Fatigue window arcs** — 2022's 45–60 day window against 2026's 21–35, on one honest scale.
3. **Creative maths calculator** — two sliders, live verdict on whether your output clears your own fatigue window.
4. **ROAS quartile explorer** — eight categories, bottom/median/top quartile, with what moves each one.
5. **Format comparison bars** — static vs video vs UGC, as ROAS ranges.
6. **RTO decay line** — 39.2% → 25.6% → 21.0%.
7. **Quick-commerce donut** — Blinkit / Instamart / Zepto / everyone else.
8. **Category growth bars** — health & pharma through home furnishings.
9. **Geography grid** — 100 cells, 66 of them outside a metro.

## Sourcing

Every number carries a `src` key that resolves to an entry in `SOURCES`, and the
page renders a visible citation list before the CTA. That is the brand
guidelines rule (p.17) enforced in code rather than by memory.

The worked-example table is labelled as a model built from those benchmarks — it
is explicitly **not** presented as an Instant Production client result, and its
arithmetic matches the calculator above it so the page cannot contradict itself.

## Verified

- Production build clean, no console or page errors
- No horizontal overflow at 1440px or 390px
- Renders correctly under `prefers-reduced-motion: reduce` — content appears, motion does not
- Slider controls are 44px tall, clearing the touch-target minimum
- FAQPage and BreadcrumbList schema emitted, including the three answer-first blocks

## Known gap

The page has no photography at all. That is a deliberate consequence of the
image connector being out of credits, not a design position — a photograph of a
real Indian D2C team would strengthen the hero. The layout has room for one
above the scale strip whenever imagery becomes available.
