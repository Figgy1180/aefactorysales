# aefactorysales.com

The A&E Factory Sales homeowner website. Astro static site, hosted on Cloudflare Pages.

## What's here

- `src/data/site.ts`: **the single source of truth.** Name, address, phone, email, prices, product specs, sizes, FAQ answers. Change a price or a phone number here and every page updates.
- `src/pages/`: one file per page. `guides/` holds the SEO articles.
- `src/content/guides/`: guide articles in Markdown. Add a new `.md` file and it becomes a page.
- `src/assets/photos/`: real install and factory photos (Astro resizes them to WebP automatically).
- `public/`: logo, favicon, videos, `robots.txt`, `llms.txt`, Cloudflare `_headers` and `_redirects`.
- `scripts/check-copy.mjs`: blocks claims the approved marketing doc says not to use (plastic, hurricane-proof, budget, $0 down, 2 to 3 weeks, em dashes and more).
- `scripts/check-links.mjs`: checks every link, image, title, description, canonical and JSON-LD block.

## Commands

```bash
npm install
npm run dev        # local preview at http://localhost:4321
npm run test       # build + copy check + link/schema check
npm run build      # production build into dist/
```

## Launch on Cloudflare Pages (about 15 minutes)

1. Put this folder in a GitHub repo (private is fine).
2. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git > pick the repo.
3. Build settings: Framework preset **Astro**, build command `npm run build`, output directory `dist`.
4. Environment variable: `PUBLIC_WEB3FORMS_KEY` = your Web3Forms access key (free at web3forms.com, sign up with info@aefactorysales.com). Without it, forms run in preview mode and send nothing.
5. Deploy. Then Custom domains > add `aefactorysales.com` and `www.aefactorysales.com`, and follow Cloudflare's DNS instructions at your domain registrar.
6. After it's live: submit `https://aefactorysales.com/sitemap-index.xml` in Google Search Console and Bing Webmaster Tools.

Every push to GitHub redeploys automatically.

## Before launch: confirm

See `LAUNCH-CHECKLIST.md`.

## Customer journeys and page audits

The quality workflow runs on pull requests targeting `gpt` or `main`, and on pushes to those branches. It never deploys the website. GitHub stores HTML reports, failure screenshots and traces for 14 days; Lighthouse reports are not uploaded to a public report server.

```bash
npm ci
npx playwright install --with-deps chromium
npm run test:journeys
npm run audit:lighthouse
npx playwright show-report
```

Playwright runs seven journeys on desktop Chromium and emulated Pixel 7: navigation, estimator arithmetic, quiz-to-form handoff, dialog focus/Escape, required fields, successful booking with campaign attribution, and rejected booking with retry. All external requests are blocked; the success/failure tests mock Web3Forms. Only synthetic contact details are used. Tests assert the build uses a dummy form key before attempting any valid submission. Failure traces can contain these synthetic details.

Both commands build with a dummy form key. **Do not deploy that `dist/` output.** Run `npm run build` again for a production artifact. Production key management and delivery are separate from these tests.

Lighthouse runs three mobile lab audits each for the homepage, Clearfold and price quiz. Missing title/description and unsuccessful HTTP status fail the job. Performance below 80, or accessibility/best-practices/SEO below 90, are warnings while we establish a baseline. Review the reports before changing thresholds. These scores do not establish Google rankings, AI visibility, accessibility compliance or real-user Core Web Vitals.

This suite does not verify actual email/CRM delivery, call connections, Safari/Firefox, real-device rendering or lead quality. Existing `dataLayer` hooks are tested; GA4/Clarity integration is not added here. Next measurement work: connect the correct Clarity project and consent configuration, then verify qualified-lead outcomes in Jasmine CRM. Keep contact details out of analytics events.

For efficient handoffs, record the tested commit, exact commands/results, report locations, unresolved failures and whether changes are local, proposed, merged or deployed. Reuse the last evidence and rerun only the checks affected by a change. Review quality trends after changes and turn confirmed customer friction into a focused regression test.
