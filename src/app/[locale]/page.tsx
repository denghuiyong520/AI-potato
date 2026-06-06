import type { Metadata } from 'next'
import React from 'react'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { SITE_URL, buildAlternates } from '@/lib/seo'

// Map next-intl locale → Open Graph locale (BCP-47-ish, region-qualified)
const OG_LOCALE: Record<string, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  fr: 'fr_FR',
  de: 'de_DE',
  es: 'es_ES',
}
import HeroSection              from '@/components/home/HeroSection'
import FeaturesSection          from '@/components/home/FeaturesSection'
import ServiceTiersSection      from '@/components/home/ServiceTiersSection'
import ProductCategoriesSection from '@/components/home/ProductCategoriesSection'
import ProcessSection           from '@/components/home/ProcessSection'
import StatsSection             from '@/components/home/StatsSection'
import TestimonialsSection      from '@/components/home/TestimonialsSection'
import CertificationsSection    from '@/components/home/CertificationsSection'
import LatestBlogSection        from '@/components/home/LatestBlogSection'
import BottomCTASection         from '@/components/home/BottomCTASection'
import VSComparisonSection      from '@/components/home/VSComparisonSection'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'home.meta' })
  const title = t('title')
  const description = t('description')
  return {
    title: { absolute: title },
    description,
    keywords: [
      'custom apparel manufacturer',
      'OEM clothing manufacturer',
      'custom t-shirt manufacturer',
      'custom hoodie manufacturer',
      'private label clothing manufacturer',
      'streetwear manufacturer',
      'bulk apparel supplier',
      'custom clothing supplier China',
      'low MOQ clothing manufacturer',
    ],
    alternates: buildAlternates(locale, ''),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: 'Potato Apparel',
      locale: OG_LOCALE[locale] ?? 'en_US',
      type: 'website',
      images: [
        {
          url:    'https://www.potatoapparel.com/og-default.jpg',
          width:  1200,
          height: 630,
          alt:    'Potato Apparel — Custom OEM/ODM Clothing Manufacturer',
        },
      ],
    },
    twitter: {
      card:        'summary_large_image',
      title,
      description,
      images:      ['https://www.potatoapparel.com/og-default.jpg'],
    },
  }
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Potato Apparel',
  url: 'https://www.potatoapparel.com',
  logo: 'https://www.potatoapparel.com/logo-112.png',
  description:
    'Professional OEM/ODM apparel manufacturer based in Guangzhou, China. Custom t-shirts, hoodies, streetwear, activewear and more. Low MOQ from 50 pieces.',
  foundingDate: '2014',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 350 },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Guangzhou',
    addressRegion: 'Guangdong',
    addressCountry: 'CN',
    streetAddress: 'Haizhu District',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+44-7907-131539',
      contactType: 'sales',
      availableLanguage: ['English', 'Chinese'],
    },
    {
      '@type': 'ContactPoint',
      email: 'sales@potatoapparel.com',
      contactType: 'customer service',
    },
  ],
  sameAs: [
    'https://youtube.com/@denghuiyong520',
    'https://www.instagram.com/denghuiyong520',
  ],
  areaServed: ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'NL', 'AE', 'SA'],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Potato Apparel',
  url: 'https://www.potatoapparel.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.potatoapparel.com/en/products?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }): React.JSX.Element {
  setRequestLocale(locale)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HeroSection />
      <FeaturesSection />
      <ServiceTiersSection />
      <ProductCategoriesSection />
      <ProcessSection />
      <StatsSection />
      <TestimonialsSection />
      <CertificationsSection />
      <VSComparisonSection />
      <LatestBlogSection />
      <BottomCTASection />
    </>
  )
}
