# AE Factory Sales: full-photo integration review

November 21, 2026 | Review proposal, not production approval

## Recommendation

Keep the live site's immersive full-photo entrance and bee/yellow identity. Replace the exterior with the enhanced Lake Conroe outdoor-kitchen interior, remove snow and seasonal decoration, then use the newer design's clearer choices, tools and practical buying information. The strongest version sells a usable patio first, then explains the system. It should not make a homeowner understand five product names before seeing which problem AE solves.

The working draft is based on redesign-preview to retain its routes and improvements, with the live site's photo-led experience restored. This is an implementation choice that reduces migration loss; it is not a recommendation to replace every existing feature or publish every new claim unchanged.

## Versions and evidence

A: live-layout source, main 9b3b97a; aefactorysales.com rendered homepage and callback modal inspected. B: redesign-preview 6e56b67fa2273e4d1fb760a99ca3288068b68cf2, updated November 21; its local rendered homepage inspected. Older GPT source/reference was also identified (site source 210d8e3; prior quality branch fb8741d). B is the freshest comparison candidate; the owner's exact intended 'new site' remains unconfirmed, so check any separately supplied preview before merging.

Twenty independently assigned simulated buyer reviews inspected frozen A/B source snapshots, with some source-image inspection. They are expert heuristic perspectives, not 20 real homeowners, measured preference votes, timed usability sessions, a live crawl of every route, or conversion evidence. Full individual reports and inspected paths are retained under reviews/01.md through 20.md. Root additionally inspected rendered homepages, callback behavior, the estimate journey and visualizer controls.

## What to retain, integrate and change

| Area | Live A | Newer B | Integrated direction |
| --- | --- | --- | --- |
| First impression | Strong full-photo immersion; exterior and snow weaken interior-use story | Furnished interior, but split collage reduces immersion | One enhanced interior across full hero; readable gradient; no seasonal decoration |
| Product choice | Five systems arrive early | Room, screens and both explain needs | Three plain-language paths immediately after hero; detailed products deeper |
| Visualizer | Already has five systems, colors, tint, corners, dimensions, multiple openings | Better mobile upload access, correct full-opening Hybrid depiction, direct visit link | Retain controls and improvements; optional exploration; manual photo placement local |
| Contact | Short name/phone callback | Dedicated fuller design-visit intake | Keep both: request a call without address, or provide address for a home visit |
| Price | Opening-area math and estimates already exist | Clearer tax/extras language and installed scope | Retain estimator; put qualifications beside the result, not only in FAQ |
| Proof | Real metal-screen projects | Adds Sugar Land blue-tinted Hybrid doors, factory/process detail | Preserve new evidence; confirm provenance; show original photos alongside any enhancement |
| Confidence | Existing samples/measurement and no-pressure language | Better care, repair and payment sequence | Explain fit, summer comfort, service and payment before requesting commitment |
| Navigation | Existing product URLs and related links | Largely retained routes | Preserve deep links and route structure; keep call/visit distinct from tools |
| Mobile | Two contact actions; short callback | Three bottom actions; longer visit form | Two bottom actions, readable text and optional tools; device QA still needed |
| Honesty | Broad comparison claims | Some better scope caveats, several contradictions remain | Qualify pest claims and permits; resolve business terms before production |

## What the updated site should feel like

1. Enter a finished patio, not a component catalog. Warm interior, visible room context, white/yellow sentence-case copy. Headline: 'Your favorite room. Already under your roof.' Supporting text distinguishes tinted PC weather shelter from metal-screen airflow and Hybrid flexibility. Primary action plans a patio; secondary action opens the visualizer.
2. Choose the outcome. Shelter from wind/rain; breeze without bugs; switch between both. These links reach the relevant system sections. PC remains prominent without burying metal screens.
3. Explore without committing. Visualizer is optional, with a sample photo, manual placement and clear AI choice. The estimator accepts uncertain sizes. Neither tool should be required to contact AE.
4. See believable proof. Use original installed interiors and open/closed views; distinguish showroom, homeowner job, schematic and AI-enhanced image. Show Sugar Land PC doors as that configuration, not proof of every PC product or a fully enclosed room's summer comfort.
5. Understand the purchase. Price by opening width times height, with tax/extras, measured final scope, approval requirements, payment milestones, aftercare and written warranty terms. Offer showroom appointments separately from home visits.
6. Finish with a person. Short callback for uncertain shoppers, fuller home-visit request for ready buyers, obvious phone access. A request is not a reserved calendar appointment.

## Twenty buyer lenses and decisions

| Review | Buyer task | Main recommendation |
| --- | --- | --- |
| 01 | First-time patio shopper | A's immersion with B's plain-language choice framework |
| 02 | Busy phone user | Short inquiry and 'not sure' route; avoid crowding mobile actions |
| 03 | Fixed budget | Tax, extras and payment terms beside estimate |
| 04 | PC heat/humidity concerns | Set uninsulated summer expectations; avoid cooling guarantees |
| 05 | Dog owner | Distinguish aluminum/stainless mesh; qualify pet-door compatibility and pest protection |
| 06 | Imagine my patio | Retain tool controls, correct Hybrid depiction; explicit AI choice |
| 07 | Skeptical buyer | Real linked projects and review provenance before assertions |
| 08 | Keyboard/vision needs | Sentence case, legible photo overlay, visible focus and non-tool path |
| 09 | Compare competing offers | Separate retrofit scope from new sunroom additions |
| 10 | HOA/custom project | Approval sequence, permit consistency and confirmed custom limits |
| 11 | Showroom visitor | Phone appointment route, not a home-address form |
| 12 | Hybrid shopper | Explain panels closed, mesh closed and both open; obtain same-opening proof |
| 13 | Privacy-conscious buyer | Local manual mode; remote analysis only by explicit choice |
| 14 | Arrival from Google | Preserve deep URLs, breadcrumbs and relevant comparisons |
| 15 | Slow mobile connection | One high-priority hero; lazy optional imagery; no autoplay burden |
| 16 | Aftercare before deposit | Resolve warranty authority, labor and paid replacement scope |
| 17 | Premium outdoor living | Finished interiors before machinery and component detail |
| 18 | Unsure of fit/no measurements | Measurement-free assessment route; do not promise universal fit |
| 19 | Wants a human now | Name/phone callback; clear hours and response expectations |
| 20 | Ready to choose/pay | Itemized scope, completion evidence and complete payment/warranty terms |

## Changes implemented in the review draft

- Full-width enhanced Lake Conroe hero, responsive image widths, original-project link and visible enhancement/material disclosure. Standard bee branding; seasonal hat, lights/banner and snow presentation removed from this draft.
- Three outcome links directly below hero. Newer product cards, guides, diagrams, factory pages, project data, estimator and visit route retained. Visualizer teaser lazy-loaded rather than eager.
- New QuickContact component: required name/phone, consent record, inline status, no street address or measurements. Existing full design-visit form retained. Mobile bar simplified to Call AE / Plan my patio; showroom section calls for a showroom appointment.
- Manual visualizer photo selection no longer invokes automatic AI analysis. Capability-enabled AI button is explicit and disclosed; home/privacy/terms copy aligned. Regression exercise executes the actual photo-loading source with a mocked capability response and confirms sample/selection do not invoke analysis, while explicit action does.
- Quiz result now states preliminary opening-area range, tax/extras exclusions and 50% order / balance-before-installation schedule. Broad small-animal exclusion and universal no-permit statements qualified. Analytics lead_type uses form ID rather than a subject containing contact details. Inline confirmation focus targets its actual status element.
- Development mode and PUBLIC_PREVIEW builds disable form delivery keys. Synthetic preview QA must check the empty key before testing a valid submission.

## Decisions still needed before production

| Priority | Conflict or evidence gap | Required resolution |
| --- | --- | --- |
| P0 | A three-year parts vs B five-year parts; B notes no separate factory agreement signed | Owner confirms effective customer promise, exclusions, labor/travel/removal coverage and responsible party; obtain executed manufacturer backing separately |
| P0 | Fixed/Hybrid 11.5-ft claims vs category 10-ft wording; newer panel wind figures | Confirm product-specific size matrix and original test scope; synchronize page/schema copy; never imply installed-room/hurricane certification |
| P0 | Ramp/water-stop included vs add-on wording; fixed $200 pet door vs prior quoted extras | Approve price/inclusion/compatibility matrix and apply to quiz, product pages and quote |
| P0 | Competitor price chart still mixes additions and retrofits | Separate scopes at every chart; cite dated matched quotes or mark missing comparator pricing; avoid treating totals as equivalent jobs |
| P1 | Anonymous feedback and new Sugar Land provenance | Confirm photo rights/project details, permission and feedback source; obtain real published review links |
| P1 | Hybrid demonstration only schematic plus limited installed views | Photograph/video all three states on one opening; document manual operation and ordinary care |
| P1 | 'Within a month' vs approvals/custom scope | Set order-ready starting conditions and customer/HOA dependencies consistently |
| P1 | WebGL and AI behavior on actual customers' devices | Test Chrome/Safari/iPhone/Android, disabled WebGL, AI on/off/failure, image uploads and keyboard corner placement |
| P1 | Lead destination and analytics attribution | Mock success/failure first, then owner-authorized labeled test inquiry and confirm receipt/CRM mapping; verify GA4/Clarity IDs and exclude personal data |

B's five-year and specification wording remain in this review proposal as newer source claims; this report does not certify them or authorize publication. No new business policy was chosen to settle those conflicts.

## Validation and practical limits

PUBLIC_PREVIEW=1 npm test passed: Astro build, copy checks, internal links/assets and JSON-LD parse checks. Integration regression passed for hero disclosure, absence of holiday assets, empty preview callback key and explicit AI invocation. git diff --check passed. Exact counts and final commit are recorded in HANDOFF.md.

Rendered desktop review confirmed the full-photo hero, standard logo, three outcome paths, callback validation and empty-key preview response. Medium -> enclose -> Clearfold -> See my price displayed $8,000 to $12,000 with the new tax/extras/payment text. The visualizer loaded controls and the correct visit link, but this browser reported WebGL off, so its overlay rendering is unverified. No claim of mobile-device, accessibility conformance, Lighthouse scores, live delivery or conversion improvement is made. A temporary narrow-iframe check was blocked by existing frame protection and removed; it does not count as mobile QA.

QA correction: one earlier synthetic callback attempt occurred before the development server's preview setting was enforced. The test used 'Preview Test' and a reserved fictional phone number; receipt was not confirmed. Development delivery is now disabled by code as well as preview environment. Do not treat this attempt as a real customer lead or verified delivery.

## Improvement plan and measurement

Before launch: settle P0 claims; finish real-device and tool failure-path tests; review image fidelity, copy and source provenance; verify lead routing with an authorized labeled test. Preserve existing URLs, titles/canonical structure and product links. Keep the review branch distinct from production.

After an approved launch: measure qualified inquiries and booked/attended visits per eligible session, plus source and product interest. Use callback starts, successful lead receipts, estimate completion and visualizer-to-contact transitions as diagnostic steps. A successful form event is not a sale; reconcile events with CRM records. Do not send names, phones, addresses, home photos or free-text notes to analytics. Configure session-recording masking and consent appropriately before enabling it.

Prioritize observed abandonment and repeated questions over decorative changes. Test one significant change at a time with sufficient traffic and a predeclared primary outcome. Keep seasonal topics in content rather than global snow. Maintain a dated claim register, monthly broken-flow checks and evidence-linked updates; do not invent rankings or conversion lifts from these simulated reviews.

## Evidence locations

Repository: Figgy1180/aefactorysales. Frozen live/layout source main 9b3b97a; newer source redesign-preview 6e56b67. Project image: src/assets/projects/p6/1-kitchen-inside.jpg; project record slug lake-conroe-outdoor-kitchen-enclosure. New PC record: src/data/projects.ts p37 and its five image files. Technical and warranty claims: src/data/site.ts, src/pages/patio-enclosures/index.astro, src/pages/pricing.astro, CLAUDE.md. Privacy behavior: src/pages/patio-visualizer.astro and src/pages/privacy.astro. Buyer reports list their exact inspected paths. Shared context consulted: Company Reference and November 20 Claude Website Handoff; newer source conflicts are explicitly preserved above.
