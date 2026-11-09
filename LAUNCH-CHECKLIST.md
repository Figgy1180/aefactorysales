# Launch checklist

## Needed to go live
- [x] Web3Forms: one key, every form (quotes, reviews, dealers) delivers to info@aefactorysales.com
- [ ] Cloudflare account + GitHub repo (see README)
- [ ] Domain DNS pointed at Cloudflare Pages

## Facts to confirm (the site uses the safest wording until then)
- [x] Frames: heat welded, no screws, PVC-fiber blend, aluminum core, ceramic coating (confirmed Nov 5)
- [x] Frame colors: Night Gray and Bright White (confirmed Nov 5)
- [x] Hours: 24/7 by appointment (in schema and footer)
- [x] Dealer contact: (713) 791-8073 and info@aefactorysales.com. No personal names or numbers on the site.
- [x] Projects were installed by the A&E crew (that department is now part of the company)
- [ ] **Project photos are loaded from the aesds.com (Framer) image host.** Self-host them once downloaded so the page doesn't break if aesds.com changes.
- [ ] **Response times.** "We call within one business day" and "written quote within 1 to 3 days" came from the Oct 29 draft. Keep?
- [ ] **Garage screens.** Price examples are math on a 16 × 7 ft opening at $24/$28 per sq ft. Is that how you'd quote a garage? Any minimum?
- [ ] **Reviews.** /reviews/ collects them (with publish permission). Add only verified, word-for-word reviews to src/data/reviews.ts. They then appear on the site automatically.
- [ ] **Google review link.** Paste the Business Profile short link into googleReviewUrl in src/data/site.ts to show the Google button.

## Right after launch
- [ ] Google Search Console + Bing Webmaster Tools, submit sitemap
- [ ] Google Business Profile: same name, address, phone as the site; link to aefactorysales.com; add photos
- [ ] Ask every finished job for a Google review
- [ ] One case study page per finished job (neighborhood, size, system, photos, homeowner quote)
- [ ] City pages once each city has a real project to show
