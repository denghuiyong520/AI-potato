import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'zh', 'fr', 'de', 'es'],
  defaultLocale: 'en',
  // 'as-needed' = English URLs have no prefix (/about), other locales do (/fr/about)
  localePrefix: 'always',
})
