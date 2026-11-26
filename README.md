# Instant Production: website, blog engine and admin

The live site for **[Instant Production](https://instantproduction.in)**, a media agency for regulated and fast-moving Indian categories: healthcare, fintech, real estate, education, beauty and D2C.

It is more than a brochure site. It is a small content operation that runs itself: posts are written in Markdown or imported from Google Docs, checked automatically, scheduled, published every morning by a GitHub Action, and measured with a daily analytics snapshot that stays in the repo.

Built by [Rahul Sharma](https://github.com/RjRahulSharma01) with Claude as an AI pair-programmer.

## What's inside

| Part | What it does | Where |
|------|--------------|-------|
| Website | React 18 + Vite + Tailwind, with Framer Motion and Lenis for motion and smooth scroll. Industry pages with their own data visualisations | `src/` |
| Blog engine | Markdown posts with frontmatter, compiled at build time. Posts with a future `publishAt` date are stripped from the build, so they never reach the browser early | `content/blog/`, `scripts/build-blog.mjs` |
| Pre-flight checks | Blocks a deploy on missing banners, broken internal links, duplicate slugs or bad dates | `scripts/check-blog.mjs`, `scripts/check-links.mjs` |
| Scheduled publishing | A GitHub Action rebuilds the site at 06:00 IST every day through a Vercel deploy hook, so scheduled posts go live on their date | `.github/workflows/publish-scheduled-posts.yml` |
| Analytics history | The same Action writes one JSON snapshot a day from Vercel Analytics and Google Search Console, so the history outlives their retention windows | `scripts/snapshot-analytics.mjs`, `public/analytics/` |
| Admin | A browser admin at `/admin` that edits posts through GitHub, with a Google Doc importer, an analytics tab and a creator-database view | `public/admin/` |
| Serverless API | GitHub OAuth for the admin, plus Google Sheets and Search Console reads signed with a service-account JWT, with no heavy SDK | `api/` |
| Banner compositor | Turns an AI-generated image into a 1200×630 WebP blog banner with the logo placed in the quieter corner | `scripts/blog-banner.py` |

## How a post goes live

```
Write in Markdown or import a Google Doc in /admin
        ↓
Commit to content/blog/ (with a publishAt date)
        ↓
npm run build → build-blog → check-blog → check-links → vite build
        ↓
06:00 IST GitHub Action → Vercel deploy hook → post is live on its date
        ↓
Daily analytics snapshot committed to public/analytics/
```

## Run it locally

```bash
npm install
npm run dev          # builds the blog index, then starts Vite
npm run blog:check   # run the pre-flight checks on their own
npm run build        # full production build with all checks
```

## Configuration

No secrets live in this repo. Set these in Vercel (for `api/`) or as GitHub Actions secrets (for the daily workflow):

- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`: admin sign-in
- `VERCEL_DEPLOY_HOOK`: the daily rebuild
- `GSC_SERVICE_ACCOUNT`, `GSC_SITE_URL`, `VERCEL_API_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_TEAM_ID`: optional, for the analytics snapshot

See the comments at the top of the workflow file for step-by-step setup.

## Stack

React · Vite · Tailwind CSS · Redux Toolkit · React Router · Framer Motion · Vercel Functions · GitHub Actions · Google Search Console API · Python (Pillow)
