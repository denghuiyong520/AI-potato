import type { MetadataRoute } from 'next'

const BASE_URL = 'https://potatoapparel.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Primary rule: allow all crawlers, block internal routes ──────────
      {
        userAgent: '*',
        allow:     '/',
        disallow:  [
          '/api/',        // API endpoints — not indexable
          '/_next/',      // Next.js static assets — handled by CDN headers
          '/admin/',      // Any future admin panel
        ],
      },
      // ── Googlebot-specific: explicitly allow full crawl ──────────────────
      {
        userAgent: 'Googlebot',
        allow:     '/',
        disallow:  ['/api/', '/_next/'],
      },
      // ── Googlebot-Image: allow product and factory photography ───────────
      {
        userAgent: 'Googlebot-Image',
        allow:     ['/products/', '/en/', '/zh/', '/fr/', '/de/', '/es/'],
      },
    ],

    // ── Sitemap pointer ──────────────────────────────────────────────────────
    // Next.js generates this dynamically from src/app/sitemap.ts
    sitemap: `${BASE_URL}/sitemap.xml`,

    // ── Crawl-delay hint (optional — Googlebot ignores this; some others use it)
    // host: BASE_URL,
  }
}
