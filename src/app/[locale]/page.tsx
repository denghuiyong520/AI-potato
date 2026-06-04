import type { Metadata } from 'next'
import React from 'react'
import { setRequestLocale } from 'next-intl/server'
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

export const metadata: Metadata = {
  title: 'Custom Apparel Manufacturer | OEM/ODM Clothing | Potato Apparel',
  description:
    'Professional custom apparel manufacturer in China. T-shirts, hoodies, streetwear & more. MOQ from 50 pcs, 7-day sampling, AQL 2.5 QC. Serving USA, UK, AU, EU & Middle East.',
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
  openGraph: {
    title: 'Potato Apparel | Custom Clothing Manufacturer — MOQ from 50 pcs',
    description:
      'OEM/ODM apparel manufacturing with low MOQ, fast 7-day sampling, and AQL 2.5 quality control. T-shirts, hoodies, streetwear, activewear and more.',
    url: 'https://potatoapparel.com',
    siteName: 'Potato Apparel',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop&q=80&auto=format',
        width: 1200,
        height: 630,
        alt: 'Potato Apparel Custom Clothing Manufacturer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Apparel Manufacturer | Potato Apparel',
    description: 'OEM/ODM clothing manufacturer. MOQ 50 pcs, 7-day sampling, worldwide shipping.',
  },
  alternates: {
    canonical: 'https://potatoapparel.com/en',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Potato Apparel',
  url: 'https://potatoapparel.com',
  logo: 'https://potatoapparel.com/logo.png',
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
  url: 'https://potatoapparel.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://potatoapparel.com/en/products?search={search_term_string}',
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
      <LatestBlogSection />
      <BottomCTASection />
    </>
  )
}
