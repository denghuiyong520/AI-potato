import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import FloatingCTA from '@/components/shared/FloatingCTA'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: 'Potato Apparel | OEM/ODM Clothing Manufacturer',
      template: '%s | Potato Apparel',
    },
    description:
      'Professional OEM/ODM apparel manufacturer in China. Low MOQ, fast sampling, 1-on-1 service. Serving global brands since 2014.',
    metadataBase: new URL('https://potatoapparel.com'),

    // ─── Google Search Console verification ──────────────────────────────────
    // How to get your code:
    //   1. Open Google Search Console → Add property → URL prefix
    //   2. Choose "HTML tag" verification method
    //   3. Copy the content value from the <meta> tag shown
    //   4. Paste it below (replace the empty string) or set
    //      NEXT_PUBLIC_GSC_VERIFICATION in your environment variables
    // ─────────────────────────────────────────────────────────────────────────
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? '',
      // yandex: '',   // optional: Yandex Webmaster
      // other: [],    // optional: other search engines
    },
    openGraph: {
      type:        'website',
      siteName:    'Potato Apparel',
      title:       'Potato Apparel | OEM/ODM Clothing Manufacturer',
      description: 'Professional OEM/ODM apparel manufacturer in China. Low MOQ, fast sampling, quality guaranteed.',
      images: [{
        url:    'https://images.unsplash.com/photo-1741176505800-caaa3a52631a?w=1200&h=630&fit=crop&q=85&auto=format',
        width:  1200,
        height: 630,
        alt:    'Potato Apparel — garment manufacturing facility with workers at sewing stations',
      }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       'Potato Apparel | OEM/ODM Clothing Manufacturer',
      description: 'Professional OEM/ODM apparel manufacturer in China. Low MOQ, fast sampling, quality guaranteed.',
      images:      ['https://images.unsplash.com/photo-1741176505800-caaa3a52631a?w=1200&h=630&fit=crop&q=85&auto=format'],
    },
    alternates: {
      languages: {
        'en': '/en',
        'zh': '/zh',
        'fr': '/fr',
        'de': '/de',
        'es': '/es',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  // Enable static rendering & ensure correct locale context
  setRequestLocale(locale)

  // Import messages directly by locale — more reliable than getMessages()
  // which depends on middleware headers that may not be set during static rendering
  const messages = (await import(`../../../messages/${locale}.json`)).default

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AnnouncementBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <FloatingCTA />
    </NextIntlClientProvider>
  )
}
