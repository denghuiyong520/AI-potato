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
- ⬜ Add BreadcrumbList schema to product pages (individual product pages)
- ⬜ Confirm GSC sitemap status = "Success"; request indexing on top 10 pages
- ⬜ Wire product pages → their category landing page (breadcrumb + body link)
- **Commit:** 8d40453 — feat(seo): add 13 manufacturing category landing pages

## Phase 2 — Expansion (Weeks 5–12)

**Goal: complete commercial coverage + first BOFU + first trust assets.**

- ⬜ Finish remaining ~9 category landing pages (Sweatshirt, Polo, Joggers, Shorts, Denim, Y2K, Kids, Swimwear, Dresses)
- ⬜ Translate category pages to ZH/FR/DE/ES (reuse labels; unique intro per locale, EN-quality)
- ⬜ Publish 2 comparison pages: "Printful alternative", "Gildan blanks vs custom"
- ⬜ Ship 1 link magnet: MOQ/cost calculator (or tech-pack template lead magnet)
- ⬜ Publish 2 case studies (real client stories) → add to homepage + relevant categories
- ⬜ Add OfferShippingDetails to Product offers
- ⬜ Start light link building: directory submissions (`/directory-submissions`), supplier listings, relevant roundups
- **KPI check (Wk 12):** 800+ indexed, 150+ ranking keywords, 5–15 in top 10.

## Phase 3 — Scale (Weeks 13–24 / Months 4–6)

**Goal: content velocity + authority + AI search.**

- ⬜ Audience landing pages (Amazon FBA, Shopify/DTC, startups) promoted from blog
- ⬜ Fabric/GSM library + glossary hub (internal-link spider)
- ⬜ Collect customer reviews → AggregateRating/Review schema on products
- ⬜ Build E-E-A-T: founder/QC-lead bios, certification pages, original factory photo/video shoot
- ⬜ AI-search optimization (`/ai-seo`): FAQ-rich, citable, entity-clear pages for AI Overviews/Perplexity
- ⬜ Outreach/link building (`/cold-email`, `/co-marketing`): guest posts, supplier partnerships, founder communities
- ⬜ Core Web Vitals pass on product galleries
- **KPI check (Mo 6):** 1,200+ indexed, 400–800 clicks/mo, 8–15 inquiries/mo.

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
