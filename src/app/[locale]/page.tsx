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
  title: 'Potato Apparel | OEM/ODM Clothing Manufacturer',
  description:
    'Professional OEM/ODM clothing manufacturer based in China. Low MOQ from 50 pcs, fast 7-day sampling, strict QC, serving 30+ countries.',
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }): React.JSX.Element {
  setRequestLocale(locale)
  return (
    <>
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
