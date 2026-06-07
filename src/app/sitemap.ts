import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { importedProducts } from '@/data/products'
import { SITE_URL, LOCALES, DEFAULT_LOCALE } from '@/lib/seo'
import { MANUFACTURING_CATEGORIES } from '@/data/manufacturing-categories'

// Build the hreflang alternates map for a given path (after the locale
// segment). Every URL in a hreflang cluster must reference every other URL
// including itself, so each per-locale <url> carries the full set.
function languagesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of LOCALES) {
    languages[locale] = `${SITE_URL}/${locale}${path}`
  }
  languages['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}${path}`
  return languages
}

const STATIC_ROUTES: Array<{ path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '',                   priority: 1.0, freq: 'weekly'  },
  { path: '/products',          priority: 0.9, freq: 'weekly'  },
  { path: '/services',          priority: 0.8, freq: 'monthly' },
  { path: '/about',             priority: 0.8, freq: 'monthly' },
  { path: '/factory',           priority: 0.8, freq: 'monthly' },
  { path: '/custom-process',    priority: 0.8, freq: 'monthly' },
  { path: '/quality-guarantee', priority: 0.7, freq: 'monthly' },
  { path: '/shipping-policy',   priority: 0.7, freq: 'monthly' },
  { path: '/portfolio',         priority: 0.7, freq: 'monthly' },
  { path: '/blog',              priority: 0.7, freq: 'weekly'  },
  { path: '/faq',               priority: 0.7, freq: 'monthly' },
  { path: '/contact',           priority: 0.6, freq: 'monthly' },
  { path: '/privacy-policy',    priority: 0.3, freq: 'yearly'  },
  { path: '/terms-of-service',  priority: 0.3, freq: 'yearly'  },
  { path: '/request-samples',   priority: 0.8, freq: 'monthly' },
  // NOTE: /seo-roadmap is intentionally excluded — it is noindex and must
  // never appear in the sitemap (conflicting signal + wasted crawl budget).
]

export default function sitemap(): MetadataRoute.Sitemap {
  const posts   = getAllPosts()
  const entries: MetadataRoute.Sitemap = []
  const now     = new Date()

  // ── Static pages × all locales (with full hreflang cluster) ───────────────
  for (const { path, priority, freq } of STATIC_ROUTES) {
    const languages = languagesFor(path)
    for (const locale of LOCALES) {
      entries.push({
        url:             `${SITE_URL}/${locale}${path}`,
        lastModified:    now,
        changeFrequency: freq,
        priority,
        alternates:      { languages },
      })
    }
  }

  // ── Product pages × all locales (with full hreflang cluster) ──────────────
  for (const product of importedProducts) {
    const path      = `/products/${product.slug}`
    const languages = languagesFor(path)
    for (const locale of LOCALES) {
      entries.push({
        url:             `${SITE_URL}/${locale}${path}`,
        lastModified:    new Date(product.importedAt),
        changeFrequency: 'monthly',
        priority:        product.mainImages.length > 0 ? 0.8 : 0.6,
        alternates:      { languages },
      })
    }
  }

  // ── Manufacturing category landing pages × all locales ────────────────────
  for (const cat of MANUFACTURING_CATEGORIES) {
    const path      = `/manufacturing/${cat.slug}`
    const languages = languagesFor(path)
    for (const locale of LOCALES) {
      entries.push({
        url:             `${SITE_URL}/${locale}${path}`,
        lastModified:    now,
        changeFrequency: 'monthly' as const,
        priority:        cat.priority ?? 0.85,
        alternates:      { languages },
      })
    }
  }

  // ── Blog posts (English-only content — no non-EN locale entries) ──────────
  for (const post of posts) {
    const en = `${SITE_URL}/${DEFAULT_LOCALE}/blog/${post.slug}`
    entries.push({
      url:             en,
      lastModified:    new Date(post.date),
      changeFrequency: 'monthly',
      priority:        0.6,
      alternates:      { languages: { en, 'x-default': en } },
    })
  }

  return entries
}
