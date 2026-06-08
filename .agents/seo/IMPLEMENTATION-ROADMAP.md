# Implementation Roadmap — Potato Apparel

*Last updated: 2026-06-07*

Status legend: ✅ done · 🔄 in progress · ⬜ to do

## Phase 0 — Technical foundation ✅ (COMPLETE)

- ✅ Site live on Vercel, www canonical, apex→www redirect
- ✅ Per-locale self-canonical + full hreflang (pages + sitemap xhtml:link)
- ✅ Single H1, viewport, mobile-responsive
- ✅ Product / Organization / WebSite schema (SSR)
- ✅ Localized homepage meta + per-locale og:locale
- ✅ Self-hosted brand logo + OG image; self-hosted hero (LCP)
- ✅ Sitemap (1,279 URLs) submitted to GSC; GA4 live
- ✅ robots.txt correct; /seo-roadmap noindex + excluded

## Phase 1 — Foundation (Weeks 1–4)

**Goal: ship the category-landing-page system + claim long-tail.**

- ✅ Build category landing page **template** (CollectionPage + ItemList + Breadcrumb + FAQ schema) — see SITE-STRUCTURE.md
- ✅ Launch **all 13** category pages × 5 locales = 65 pages (EN copy + translated UI; body copy EN-first per strategy)
- ✅ Wire internal linking: homepage cards → landing pages; landing pages → /products / /contact
- ✅ Add category pages to `sitemap.ts` with hreflang (priority 0.85–0.9)
- ✅ Set canonical handling so `?category=` filter URLs canonical to the new landing pages
- ✅ Confirm GSC sitemap status = "Success" (1,279 URLs, status 成功); resubmitted to pick up +65 manufacturing URLs (2026-06-07)
- ✅ Request indexing: 12/13 EN landing pages submitted via URL inspection (2026-06-07); daily quota hit — custom-dresses pending next day
- ✅ Add BreadcrumbList schema to product pages (4-level w/ category landing; 3-level fallback)
- ✅ Wire product pages → their category landing page (breadcrumb + contextual body link)
- **Commits:** 8d40453 (landing pages) · f20929d (product → category linking)

**Phase 1 is now functionally complete.** Remaining is operational (GSC indexing
follow-through) + optional polish. Ready to move into Phase 2 content.

### GSC indexing log (2026-06-07)
Submitted "Request Indexing" for 12 EN pages: custom-t-shirts, custom-hoodies,
custom-joggers-sweatpants, custom-streetwear, custom-activewear, custom-sweatshirts,
custom-polo-shirts, custom-shorts, custom-denim, y2k-clothing, custom-kids-clothing,
custom-swimwear. **Pending (quota):** custom-dresses → resubmit next day.
Sitemap resubmitted; expect "已发现的网页" to rise 1,279 → ~1,344.

## Phase 2 — Expansion (Weeks 5–12)

**Goal: complete commercial coverage + first BOFU + first trust assets.**

- ✅ Finish remaining ~9 category landing pages — DONE (all 13 shipped in Phase 1)
- ⬜ Translate category pages to ZH/FR/DE/ES (intro copy still EN — **holding per strategy** until EN ranks; UI labels already translated)
- ✅ Publish 2 comparison pages: "Printful alternative" + "Gildan blanks vs custom" — DONE
- ✅ Ship 1 link magnet: **Apparel Cost & Margin Calculator** (`/tools/apparel-cost-calculator`) — DONE
- ⬜ Publish 2 case studies (real client stories) — **BLOCKED: needs real client data**; do not fabricate. Flag to owner.
- ⬜ Add OfferShippingDetails to Product offers — **deliberately deferred**: shipping is quote-based DDP/FOB, a fixed rate would be inaccurate (risk of misleading schema).
- ⬜ Start light link building: directory submissions, supplier listings, roundups — off-site, needs owner accounts.
- **KPI check (Wk 12):** 800+ indexed, 150+ ranking keywords, 5–15 in top 10.

## Phase 3 — Scale (Weeks 13–24 / Months 4–6)

**Goal: content velocity + authority + AI search.**

- ✅ Audience landing pages — DONE early: Amazon FBA, Shopify/DTC, startups, streetwear at `/clothing-manufacturer-for/[slug]` (linked from Services hub)
- 🔄 Fabric/GSM library + glossary hub — **glossary DONE** (`apparel-manufacturing-glossary`); fabric library partial (hoodie GSM + activewear fabrics guides). Remaining: deep per-fabric pages.
- ⬜ Collect customer reviews → AggregateRating/Review schema — needs real reviews (do not fabricate).
- ⬜ Build E-E-A-T: founder/QC-lead bios, certification pages, original factory photo/video shoot — needs owner input/assets.
- 🔄 AI-search optimization (`/ai-seo`): FAQ schema across landing/audience pages, glossary, WebSite+Organization+SearchAction schema, and **llms.txt** (llmstxt.org) shipped. Remaining: monitor AI citations; verify Organization `sameAs` social links are real.
- ⬜ Outreach/link building — off-site.
- ⬜ Core Web Vitals pass on product galleries.
- **KPI check (Mo 6):** 1,200+ indexed, 400–800 clicks/mo, 8–15 inquiries/mo.

> **Autonomous build log (2026-06-07 session):** Shipped 13 category pages + product→category linking (Phase 1), then Phase 2/3 content: 9 blog posts (hoodie GSM, Printful alt, activewear fabrics, Incoterms, garment washes, certifications, Gildan vs custom, apparel glossary), the cost calculator tool, and 4 audience landing pages. Total static pages 1,279 → 1,482. **Blocked items all require real client/owner data** (case studies, reviews, founder bios, factory photos) — intentionally not fabricated.

## Phase 4 — Authority (Months 7–12)

**Goal: rank head terms, compound authority.**

- ⬜ Thought-leadership / original-data content (industry MOQ benchmarks, sourcing reports)
- ⬜ Digital PR + media mentions; HARO-style sourcing
- ⬜ Expand winning clusters; refresh top posts quarterly (`/seo-drift` to catch decay)
- ⬜ Advanced schema; sitewide internal-link optimization
- ⬜ Scale non-EN content where a locale shows traction
- **KPI check (Mo 12):** full index, 2,000–4,000 clicks/mo, 150+ top-10 keywords, 25–50 inquiries/mo.

## Cross-phase cadence

- **Weekly:** publish per CONTENT-CALENDAR.md; check GSC coverage for errors.
- **Monthly:** GSC performance review (clicks, impressions, top queries, CTR); fix decaying pages; update KPIs.
- **Quarterly:** competitor re-check (`/seo-competitor-pages`), content refresh, backlink audit (`/seo-backlinks`).

## Risks & mitigations

| Risk | Mitigation |
|------|-----------|
| Duplicate authority vs hongyuapparel.com | Distinct positioning/copy; minimal cross-linking |
| Thin category/locale pages → scaled-content flag | Unique 300–600w EN copy per category before translating |
| Slow indexing on new domain | Strong internal linking, sitemap, request-indexing, earn first links |
| Capacity to produce content | Use `/seo-content` + `/programmatic-seo`; prioritize Pillar B first |
