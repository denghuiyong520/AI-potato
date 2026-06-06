# SEO Strategy — Potato Apparel

*Last updated: 2026-06-07 · Owner: growth · Stack: Next.js 14 + next-intl on Vercel*

> Read alongside [`../product-marketing.md`](../product-marketing.md). This is the master strategy; see sibling files for competitors, content calendar, roadmap, and site structure.

## 1. Situation

- **Brand-new domain** (launched ~June 2026). Organic baseline ≈ 0. Just indexed + sitemap submitted to GSC (www property).
- **Strengths already in place:** clean technical SEO (canonical/hreflang/schema fixed), 1,170+ product pages × 5 locales, 14 buying-guide blog posts, Product/Organization/WebSite schema, fast self-hosted hero.
- **Core challenge:** zero domain authority + a YMYL-adjacent B2B niche where trust signals and content depth decide rankings. We win on long-tail intent before head terms.

## 2. Target market & intent

B2B buyers: independent brand founders, DTC/e-commerce & Amazon FBA sellers, streetwear/activewear labels. Searches cluster into 4 intent types:

| Intent | Example queries | Page type that wins |
|--------|-----------------|---------------------|
| **Commercial — manufacturer** | "custom clothing manufacturer", "OEM clothing manufacturer low MOQ", "private label hoodie manufacturer" | Service/category landing pages |
| **Commercial — product** | "custom oversized t-shirt manufacturer", "275gsm boxy tee wholesale" | Category + product pages |
| **Comparison** | "print on demand vs cut and sew", "Printful alternative manufacturer" | Blog/comparison pages |
| **Informational (TOFU)** | "what is MOQ", "how to start a clothing brand", "how to make a tech pack" | Blog guides (already strong) |

## 3. Keyword pillars (topic clusters)

Build authority cluster-by-cluster. Each pillar = one hub page + supporting product categories + supporting blog posts, all interlinked.

### Pillar A — "Custom Clothing Manufacturer" (head/money)
- Hub: `/services` (or a new `/custom-clothing-manufacturer` landing)
- Targets: custom clothing manufacturer, OEM/ODM clothing manufacturer, low MOQ clothing manufacturer, private label clothing manufacturer, clothing manufacturer for small business / startups
- Supporting: every product-category page + factory/quality/process pages

### Pillar B — Product-type manufacturer pages (highest commercial value)
One optimized **category landing page per garment type**, targeting "custom [type] manufacturer":
- custom **t-shirt** manufacturer · custom **hoodie** manufacturer · custom **sweatshirt** manufacturer · custom **streetwear** manufacturer · custom **activewear** manufacturer · custom **polo shirt** manufacturer · custom **sweatpants/joggers** manufacturer · custom **shorts** manufacturer · custom **denim** manufacturer · **Y2K** clothing manufacturer · custom **kids' clothing** manufacturer · custom **swimwear** manufacturer · custom **dress** manufacturer
- ⚠️ **This is the #1 opportunity** — see SITE-STRUCTURE.md. Category pages currently are thin filter views; they need unique intro copy, FAQ, schema, and internal links to become rankable landing pages.

### Pillar C — Audience / use-case pages
- clothing manufacturer for **Amazon FBA sellers**, for **Shopify brands**, for **startups**, for **streetwear brands**, **private label** for boutiques
- Several already exist as blog posts — promote the best to evergreen landing pages.

### Pillar D — Comparison / alternative (high-conversion BOFU)
- "Printful alternative", "print on demand vs cut and sew", "Gildan blanks vs custom manufacturing", "[competitor] vs Potato Apparel"

### Pillar E — Educational TOFU (already strong, keep expanding)
- MOQ, tech packs, fabric/GSM guides, screen printing vs embroidery, sampling, Incoterms/DDP, QC/AQL explained

## 4. Multilingual strategy

- 5 locales live with correct hreflang. **Prioritize EN first** (largest search demand + where buyers are). ZH/FR/DE/ES product+category pages are translated; **do not** invest heavily in non-EN blog content until EN ranks — focus non-EN on category/product pages where translation already exists.
- Watch GSC for "Duplicate, Google chose different canonical" on thin locales; if it appears, deepen that locale's unique copy.

## 5. Technical priorities (mostly done)

✅ Canonical/hreflang/www/schema/H1/sitemap — complete.
Remaining technical to-dos:
- Add **CollectionPage + ItemList + BreadcrumbList** schema to category pages
- Add **BreadcrumbList** + **AggregateRating/Review** (once real reviews exist) to product pages
- Add **OfferShippingDetails** to Product offers (Merchant Center eligibility)
- Monitor Core Web Vitals in GSC (hero now self-hosted; watch product-gallery LCP)

## 6. KPI targets

| Metric | Baseline (Jun 2026) | 3 Month | 6 Month | 12 Month |
|--------|---------------------|---------|---------|----------|
| Indexed pages (GSC) | ~0 → submitting 1,279 | 800+ | 1,200+ | 1,279 (full) |
| Organic clicks / mo | 0 | 50–150 | 400–800 | 2,000–4,000 |
| Ranking keywords (top 100) | 0 | 150+ | 500+ | 1,500+ |
| Keywords in top 10 | 0 | 5–15 (long-tail) | 40–80 | 150+ |
| Qualified inquiries / mo (organic) | 0 | 2–5 | 8–15 | 25–50 |
| Referring domains | low | +10 | +30 | +75 |
| Core Web Vitals (mobile, "Good") | TBD | all green | maintained | maintained |

*Estimates for a new domain in a competitive B2B niche; assumes consistent content + light link building. Head terms ("custom clothing manufacturer") realistically take 9–18 months.*

## 7. Guardrails

- **Don't** mass-generate thin locale or category pages without unique copy (scaled-content risk).
- **Do** build E-E-A-T: real factory photos, named QC process, founder/team bios, case studies, certifications.
- One pillar at a time. Depth > breadth for a new domain.
