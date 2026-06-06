import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

const BASE_URL = SITE_URL

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── All crawlers ─────────────────────────────────────────────────────
      // NOTE: Do NOT disallow /_next/ — Google needs it to load JS/CSS and
      //       render pages correctly. Blocking it causes "crawled but not
      //       indexed" issues and poor Core Web Vitals in GSC.
      {
        userAgent: '*',
        allow:     '/',
        disallow:  [
          '/api/',      // Server-side API routes — not indexable content
          '/admin/',    // Future admin panel
        ],
      },
    ],

    // Next.js auto-generates this from src/app/sitemap.ts
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
