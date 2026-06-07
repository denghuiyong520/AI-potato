import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ChevronRight, ArrowRight } from 'lucide-react'
import BottomCTASection from '@/components/home/BottomCTASection'
import CostCalculator from '@/components/tools/CostCalculator'
import { buildAlternates, SITE_URL } from '@/lib/seo'

const PATH = '/tools/apparel-cost-calculator'

const OG_LOCALE: Record<string, string> = {
  en: 'en_US', zh: 'zh_CN', fr: 'fr_FR', de: 'de_DE', es: 'es_ES',
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tools.meta' })
  return {
    title:       { absolute: t('title') },
    description: t('description'),
    alternates:  buildAlternates(locale, PATH),
    openGraph: {
      type:        'website',
      locale:      OG_LOCALE[locale] ?? 'en_US',
      url:         `${SITE_URL}/${locale}${PATH}`,
      title:       t('title'),
      description: t('description'),
      siteName:    'Potato Apparel',
      images:      [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: t('title') }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       t('title'),
      description: t('description'),
      images:      [`${SITE_URL}/og-default.jpg`],
    },
  }
}

export default async function CostCalculatorPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'tools' })

  const appSchema = {
    '@context':       'https://schema.org',
    '@type':          'WebApplication',
    name:             t('meta.title'),
    description:      t('meta.description'),
    url:              `${SITE_URL}/${locale}${PATH}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem:  'Any',
    offers:           { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher:        { '@type': 'Organization', name: 'Potato Apparel' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <section className="pt-32 pb-12 lg:pt-40 lg:pb-14 bg-[var(--bg-surface)]">
        <div className="container-site max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
            <Link href="/" className="hover:text-ink transition-colors">{t('breadcrumbHome')}</Link>
            <ChevronRight size={12} className="shrink-0" />
            <span className="text-ink font-medium">{t('meta.h1')}</span>
          </nav>

          <h1
            className="font-display font-bold text-ink mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: 1.08 }}
          >
            {t('meta.h1')}
          </h1>
          <p className="text-ink-muted text-lg leading-relaxed max-w-2xl">{t('intro')}</p>
        </div>
      </section>

      <section className="pb-16 bg-[var(--bg-base)]">
        <div className="container-site max-w-4xl pt-10">
          <CostCalculator />
        </div>
      </section>

      {/* How it works */}
      <section className="pb-16 bg-[var(--bg-base)]">
        <div className="container-site max-w-3xl">
          <h2 className="font-display font-bold text-ink text-xl mb-5">{t('howTitle')}</h2>
          <div className="prose prose-sm max-w-none text-ink-muted leading-relaxed space-y-3">
            <p>{t('how1')}</p>
            <p>{t('how2')}</p>
            <p>{t('how3')}</p>
          </div>

          {/* Internal links */}
          <div className="mt-8 rounded-2xl bg-violet-50 border border-violet-100 p-6">
            <p className="font-semibold text-ink mb-3">{t('ctaTitle')}</p>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/manufacturing/custom-hoodies"
                className="inline-flex items-center gap-1.5 bg-white border border-cream-300 hover:border-violet-300 text-ink text-sm font-medium px-4 py-2 rounded-full transition-colors"
              >
                Custom Hoodies <ArrowRight size={13} />
              </Link>
              <Link
                href="/manufacturing/custom-t-shirts"
                className="inline-flex items-center gap-1.5 bg-white border border-cream-300 hover:border-violet-300 text-ink text-sm font-medium px-4 py-2 rounded-full transition-colors"
              >
                Custom T-Shirts <ArrowRight size={13} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
              >
                {t('getQuote')} <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Related guide link */}
          <p className="text-sm text-ink-muted mt-6">
            {t('relatedPrefix')}{' '}
            <Link href="/blog/ddp-fob-exw-shipping-incoterms-clothing" className="font-semibold text-violet-600 hover:text-violet-800 transition-colors">
              DDP vs FOB vs EXW: Shipping Incoterms Explained
            </Link>
            .
          </p>
        </div>
      </section>

      <BottomCTASection />
    </>
  )
}
