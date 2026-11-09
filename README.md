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
