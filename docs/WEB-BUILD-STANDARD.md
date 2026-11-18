# A&E Web Build Standard

The required checklist for aefactorysales.com and every future A&E website, landing page or web tool. Adopted November 18, 2026. Review it every 6 months, or sooner when one of the source standards changes.

This is a practical engineering standard, not legal advice. Have a Texas attorney review the privacy policy and terms once a year or before any big change (such as adding online payments or ad tracking).

## The official standards we follow

| Area | Standard (current version) | Why |
|---|---|---|
| Security risks | [OWASP Top 10:2025](https://owasp.org/Top10/2025/) | The industry's official list of the most common web security risks |
| Security checks | [OWASP ASVS 5.0](https://github.com/OWASP/ASVS) | Detailed verification checklist; Level 1 for brochure sites, Level 2 if we ever add logins or payments |
| Accessibility | [W3C WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/) | What courts and ADA settlements point to; 2.2 AA also covers 2.1 AA |
| Texas privacy | [Texas Data Privacy and Security Act](https://sll.texas.gov/spotlight/2024/07/texas-data-privacy-and-security-act) | Small businesses are generally exempt, but must never sell sensitive data without consent. We follow its notice practices anyway. |
| Reviews | [FTC rule on fake reviews and testimonials](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials) | Civil penalties for fake, bought or misleading reviews |
| Calls and texts | TCPA | Forms must say we may call or text about the request |

## 1. Security (OWASP Top 10:2025)

- **Static first.** Build sites as static pages (Astro) with no server code, no database and no login unless truly needed. Most of the OWASP list cannot happen to a site with nothing to break into.
- **HTTPS only**, with these headers on every page (set in `public/_headers`):
  - `Strict-Transport-Security: max-age=31536000`
  - `Content-Security-Policy` allowing only our own domain plus the exact services we use (today: Web3Forms for forms, Cloudflare Web Analytics). Add a service to the policy before using it.
  - `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Cross-Origin-Opener-Policy: same-origin`
  - `Permissions-Policy` turning off camera, microphone, location, payment, USB and ad topics
- **Secrets:** never put passwords, API secrets or account logins in the code or the repo. Public keys meant for the browser (like the Web3Forms access key) are fine.
- **Forms:** spam honeypot field, no card numbers, no government ID, no passwords. Collect only what we need to reply.
- **Uploaded photos** (visualizer) stay in the visitor's browser. Never upload or store them without telling the visitor first.
- **Supply chain (A03):** keep the dependency list short. Run `npm audit` before every release. Apply security updates for anything that touches the live site. Note any advisory that does not apply and why.
- **Accounts:** two-factor sign-in on GitHub, Cloudflare, Google Business Profile, Squarespace (domain) and the email accounts. Only owners get admin access.
- **Cloudflare settings to keep on:** Always Use HTTPS, minimum TLS 1.2, automatic HTTPS rewrites.

## 2. Accessibility (WCAG 2.2 AA)

- Alt text on every meaningful image; empty alt on decoration.
- Full keyboard access, a skip link, and visible focus on every control.
- Text contrast at least 4.5:1 (3:1 for large text and UI parts).
- Every form field has a visible label; errors are explained in words.
- Anything that moves for more than 5 seconds can be paused (videos have controls), and animations stop under reduced motion.
- Touch targets at least 24 × 24 px (we use 44 px).
- Tables that scroll sideways can be reached by keyboard.
- **No accessibility overlay widgets.** They don't make a site compliant, and businesses that use them still get sued.
- Publish an accessibility statement with a phone and email for help (`/accessibility/`).

## 3. Legal pages and wording

- **Privacy policy** (`/privacy/`): what we collect, what we don't (no tracking cookies), who processes it (Web3Forms, Cloudflare), the call and text consent, how to ask for a copy or deletion, and the date updated.
- **Terms** (`/terms/`): prices are starting prices; the written quote controls; visualizer and renders are illustrations; warranty summary; Texas law.
- **Consent line under every form:** "By sending this, you agree AE Factory Sales may call, text or email you about your request. Message and data rates may apply. We never sell your information."
- **Reviews:** only real customers, shown as written. No invented testimonials, no AI-written reviews, no paying for positive reviews.
- **Claims:** only proven claims (see the brand guide). Label renders and digitally tinted photos as such.
- **Photos:** use only photos we own or have permission to use. Get customers' OK before showing their home.
- **Adding tracking** (Google Analytics, ad pixels, Meta, etc.) means updating the privacy policy first and adding a cookie notice.

## 4. Release checklist (every change)

1. `npx astro build` with no errors
2. `node scripts/check-copy.mjs` and `node scripts/check-links.mjs` pass
3. `npm run qa:a11y`: accessibility scan (axe, WCAG 2.2 AA) on every page, desktop and phone, zero violations
4. `npm run qa:csp`: every page loads with the security policy on and nothing blocked
5. Phone check: no sideways scrolling, no broken images
6. `npm audit` reviewed
7. After deploy: confirm the live headers and spot-check the changed pages

## Status on November 18, 2026 (aefactorysales.com)

- All headers above live and verified; no blocked resources.
- Accessibility scan: zero WCAG 2.2 AA violations on all 42 pages, desktop and phone.
- Privacy, terms and accessibility pages live; consent line on every form.
- Open: Astro has security advisories fixed only in Astro 7. None apply to this site (no `define:vars`, no server islands, images are our own). Plan the Astro 7 upgrade as its own tested change.
- Open: confirm Always Use HTTPS and minimum TLS 1.2 in Cloudflare, and two-factor on every account.
- Open: attorney review of the privacy policy and terms.
