import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { importedProducts } from '@/data/products'

const BASE_URL = 'https://potatoapparel.com' // TODO: replace with real domain
const LOCALES  = ['en', 'zh', 'fr', 'de', 'es']

function url(locale: string, path = ''): string {
  return `${BASE_URL}/${locale}${path}`
}

const STATIC_ROUTES: Array<{ path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '',           priority: 1.0, freq: 'weekly'  },
  { path: '/products',  priority: 0.9, freq: 'weekly'  },
  { path: '/services',  priority: 0.8, freq: 'monthly' },
  { path: '/about',     priority: 0.7, freq: 'monthly' },
  { path: '/portfolio', priority: 0.7, freq: 'monthly' },
  { path: '/blog',      priority: 0.7, freq: 'weekly'  },
  { path: '/contact',   priority: 0.6, freq: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const posts    = getAllPosts()
  const entries: MetadataRoute.Sitemap = []
  const now      = new Date()

  // ── Static pages × all locales ────────────────────────────────────────────
  for (const { path, priority, freq } of STATIC_ROUTES) {
    for (const locale of LOCALES) {
      entries.push({ url: url(locale, path), lastModified: now, changeFrequency: freq, priority })
    }
  }

  // ── Product pages × all locales ───────────────────────────────────────────
  for (const product of importedProducts) {
    for (const locale of LOCALES) {
      entries.push({
        url:             url(locale, `/products/${product.slug}`),
        lastModified:    new Date(product.importedAt),
        changeFrequency: 'monthly',
        priority:        product.mainImages.length > 0 ? 0.8 : 0.6,
      })
    }
  }

  // ── Blog posts (English-first; add translations as they are created) ──────
  for (const post of posts) {
    entries.push({
      url:             url('en', `/blog/${post.slug}`),
      lastModified:    new Date(post.date),
      changeFrequency: 'monthly',
      priority:        0.6,
    })
  }

  return entries
}
