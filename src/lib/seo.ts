import type { Metadata } from 'next'

// ─── Canonical site origin ─────────────────────────────────────────────────
// The site is served on the `www` host (Vercel 308-redirects the apex →
// www). Canonical tags, hreflang, OG URLs, and the sitemap MUST all use this
// exact origin or Google sees conflicting signals.
export const SITE_URL = 'https://www.potatoapparel.com'

export const LOCALES = ['en', 'zh', 'fr', 'de', 'es'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

/**
 * Build locale-aware `alternates` for a page's metadata.
 *
 * Produces a self-referencing canonical for the *current* locale plus a full
 * hreflang set (every locale + `x-default`). This is what lets Google index
 * each language version independently instead of collapsing them into /en.
 *
 * @param locale  current request locale (e.g. 'zh')
 * @param path    path AFTER the locale segment, with leading slash.
 *                '' for the locale home, '/about', '/products/foo', etc.
 */
export function buildAlternates(locale: string, path = ''): Metadata['alternates'] {
  const languages: Record<string, string> = {}
  for (const l of LOCALES) {
    languages[l] = `${SITE_URL}/${l}${path}`
  }
  languages['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}${path}`

  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages,
  }
}

/**
 * Alternates for English-only content (e.g. blog posts that are not
 * translated). Canonical and x-default both point at the English URL so the
 * non-English locale prefixes are not treated as thin duplicates.
 *
 * @param path path AFTER the locale segment, with leading slash.
 */
export function buildEnglishOnlyAlternates(path = ''): Metadata['alternates'] {
  const en = `${SITE_URL}/${DEFAULT_LOCALE}${path}`
  return {
    canonical: en,
    languages: {
      en,
      'x-default': en,
    },
  }
}
