import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ArrowRight, BadgeCheck } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import BottomCTASection from '@/components/home/BottomCTASection'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about.meta' })
  return { title: t('title'), description: t('description') }
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t  = await getTranslations({ locale, namespace: 'about' })
  const tn = await getTranslations({ locale, namespace: 'common' })

  const values = [0, 1, 2, 3].map((i) => ({
    title:       t(`values.items.${i}.title`),
    description: t(`values.items.${i}.description`),
  }))

  const facilityStats = [0, 1, 2, 3].map((i) => ({
    value: t(`facility.stats.${i}.value`),
    label: t(`facility.stats.${i}.label`),
  }))

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Potato Apparel',
    url: 'https://potatoapparel.com', // TODO: replace with real domain
    foundingDate: '2014',
    description: 'Professional OEM/ODM apparel manufacturer based in China.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+44-7907-131539',
      email: 'sales@potatoapparel.com',
      contactType: 'Sales',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1920&h=800&fit=crop&q=80&auto=format"
            alt="Our factory"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-ink/70" />
        </div>
        <div className="container-site relative z-10 max-w-3xl">
          <AnimatedSection>
            <h1 className="font-display font-bold text-cream-100 mb-5 whitespace-pre-line"
                style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)', lineHeight: 1.1 }}>
              {t('hero.title')}
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-cream-400 text-lg max-w-xl leading-relaxed">{t('hero.subtitle')}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-[var(--bg-base)]">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="right">
              <div>
                <SectionTitle title={t('story.title')} align="left" className="mb-8" />
                <div className="space-y-5 text-ink-light leading-relaxed">
                  <p>{t('story.p1')}</p>
                  <p>{t('story.p2')}</p>
                  <p>{t('story.p3')}</p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 mt-8 bg-violet-600 text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-violet-700 transition-colors"
                >
                  {tn('getQuote')} <ArrowRight size={16} />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.1}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-float">
                <Image
                  src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop&q=80&auto=format"
                  alt="Potato Apparel factory floor"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[var(--bg-surface)]">
        <div className="container-site">
          <SectionTitle title={t('values.title')} />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ title, description }, i) => (
              <StaggerItem key={i}>
                <div className="bg-white rounded-2xl p-7 shadow-card border border-cream-200 h-full">
                  <BadgeCheck size={28} className="text-violet-500 mb-4" />
                  <h3 className="font-display font-semibold text-xl text-ink mb-3">{title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Facility stats */}
      <section className="section-padding bg-ink text-white">
        <div className="container-site">
          <SectionTitle title={t('facility.title')} subtitle={t('facility.subtitle')} light />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {facilityStats.map(({ value, label }, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-display font-bold text-cream-100 mb-2"
                     style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                    {value}
                  </p>
                  <p className="text-cream-500 text-sm">{label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Factory images grid */}
      <section className="section-padding bg-[var(--bg-base)]">
        <div className="container-site">
          <SectionTitle title="Inside Our Factory" subtitle="State-of-the-art production floor, cutting room, and QC department." />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              '1521572163474-6864f9cf17ab',
              '1591047139829-d91aecb6caea',
              '1543076447-215ad9ba6923',
              '1506629082955-511b1aa562c8',
              '1566174053879-31528523f8ae',
              '1588850561407-ed78c282e89b',
            ].map((photoId, i) => (
              <AnimatedSection key={photoId} delay={i * 0.05} className={i === 0 ? 'col-span-2 lg:col-span-1' : ''}>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-cream-200">
                  <Image
                    src={`https://images.unsplash.com/photo-${photoId}?w=600&h=450&fit=crop&q=80&auto=format`}
                    alt={`Apparel manufacturing ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <BottomCTASection />
    </>
  )
}
