# Site Structure & Architecture — Potato Apparel

*Last updated: 2026-06-07*

## Current structure (live)

```
/[locale]                      (en default, + zh/fr/de/es)
├── /                          Home
├── /products                  Catalog (filterable, ?category=&sub=&search=)
│   └── /products/[slug]       1,170+ product detail pages (Product schema ✓)
├── /services
├── /factory
├── /custom-process
├── /quality-guarantee
├── /shipping-policy
├── /portfolio
├── /about
├── /contact
├── /request-samples
├── /blog
│   └── /blog/[slug]           14 posts (English)
├── /faq
├── /privacy-policy /terms-of-service
└── /seo-roadmap               (noindex, excluded from sitemap)
```

Categories live (CATEGORY_TREE): **T-Shirts** (Long Sleeve, Basic Fit, Oversized, Vintage, Vest, Polo), **Hoodies** (Fleece, Terry, Zip-Up), **Sweatshirt**, **Sweater**, **Pants**, **Shorts**, **Denim**, **Y2K Fashion**, **Kids Wear**, **Outdoor**, **Jersey**, **Accessories**, **Dresses**, **Swimwear**, **Sleepwear**.

## 🔴 The #1 structural gap: category landing pages

Right now categories exist only as **filter states of `/products`** (`?category=t-shirts`). Filtered query-param views are weak SEO targets — Google may not index them well, and they have no unique copy.

**Recommendation — create real category landing pages** at clean URLs:

```
/[locale]/manufacturing/custom-t-shirts          → "Custom T-Shirt Manufacturer"
/[locale]/manufacturing/custom-hoodies           → "Custom Hoodie Manufacturer"
/[locale]/manufacturing/custom-sweatshirts
/[locale]/manufacturing/custom-streetwear
/[locale]/manufacturing/custom-activewear
/[locale]/manufacturing/custom-polo-shirts
/[locale]/manufacturing/custom-joggers-sweatpants
/[locale]/manufacturing/custom-shorts
/[locale]/manufacturing/custom-denim
/[locale]/manufacturing/y2k-clothing
/[locale]/manufacturing/custom-kids-clothing
/[locale]/manufacturing/custom-swimwear
/[locale]/manufacturing/custom-dresses
```

Each landing page should have:
- **Unique H1 + 300–600 words** unique intro (why custom [type] here, fabrics/GSM options, MOQ, decoration methods, use cases)
- **CollectionPage + ItemList + BreadcrumbList** schema
- A grid of that category's products (pulls existing catalog data — no new product work)
- A **category-specific FAQ** (MOQ, fabric weights, sampling, pricing) with FAQPage schema
- Internal links: ↑ to /services hub, ↔ to related categories, ↓ to top products, → to relevant blog guide
- CTA: Request Samples / Get a Quote

> Implementation note: this is a **programmatic SEO** opportunity — one template, data-driven from CATEGORY_TREE, ~13 pages × 5 locales. Use `/seo-programmatic` or `/programmatic-seo` to build it. Translation can reuse category labels already in messages files; intro copy needs real (not machine-dumped) text per category to avoid thin-content risk — write EN well first.

## Recommended internal-linking model (hub & spoke)

```
                 Home
                  │
        ┌─────────┼──────────┐
   /services   /factory   /quality-guarantee   (trust hubs)
        │
   Category landing pages  ◄──► related categories
        │            │
   Product pages   Blog guides (contextual, both directions)
        │
   Request Samples / Contact (conversion)
```

Rules:
- Every product page links **up** to its category landing page (breadcrumb + body).
- Every category page links to its **pillar** (/services) and 1–2 **sibling categories**.
- Every blog post links to the **most relevant category landing page** + 1 related post.
- Footer keeps it light (avoid 100+ footer links diluting authority).

## URL hygiene (already good)

- ✅ Lowercase, hyphenated, descriptive slugs
- ✅ Locale subdirectories with hreflang
- ⚠️ Keep faceted filters (`?category=&sub=&search=`) **out of the index** — they're fine for UX but the canonical should point to the clean category landing page (once built). Consider `robots`/canonical handling so filter combinations don't create duplicate crawl paths.

## Crawl budget

1,279 sitemap URLs × effectively 1 (it's already per-locale). Healthy. As category pages are added, add them to `sitemap.ts` with hreflang and keep `/seo-roadmap` and any thin filter URLs out.
