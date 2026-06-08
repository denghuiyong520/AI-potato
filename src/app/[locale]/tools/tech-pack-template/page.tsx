import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ChevronRight, ArrowRight } from 'lucide-react'
import BottomCTASection from '@/components/home/BottomCTASection'
import TechPackTemplate from '@/components/tools/TechPackTemplate'
import { buildAlternates, SITE_URL } from '@/lib/seo'

const PATH = '/tools/tech-pack-template'

const OG_LOCALE: Record<string, string> = {
  en: 'en_US', zh: 'zh_CN', fr: 'fr_FR', de: 'de_DE', es: 'es_ES',
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tools.techpack.meta' })
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

export default async function TechPackTemplatePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t  = await getTranslations({ locale, namespace: 'tools.techpack' })
  const tm = await getTranslations({ locale, namespace: 'tools.techpack.meta' })

  const schema = {
    '@context':       'https://schema.org',
    '@type':          'HowTo',
    name:             tm('title'),
    description:      tm('description'),
    url:              `${SITE_URL}/${locale}${PATH}`,
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Style info',     text: 'Fill in brand, style name, number, season, and sample size.' },
      { '@type': 'HowToStep', position: 2, name: 'Sketch / flats', text: 'Attach front and back flat sketches of the garment.' },
      { '@type': 'HowToStep', position: 3, name: 'Bill of Materials', text: 'List every fabric, trim, label and packaging component.' },
      { '@type': 'HowToStep', position: 4, name: 'Measurements',   text: 'Enter points of measure with tolerances across your size run.' },
      { '@type': 'HowToStep', position: 5, name: 'Colorways, construction, artwork, labels', text: 'Specify colorways, construction details, decoration placement, and labels.' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {/* Print: hide site chrome so only the template sheet prints */}
      <style dangerouslySetInnerHTML={{ __html: '@media print { header, footer, .fixed, .no-print { display: none !important; } body { background: #fff !important; } #techpack-sheet { border: 0 !important; } }' }} />

      <section className="no-print pt-32 pb-10 lg:pt-40 lg:pb-12 bg-[var(--bg-surface)]">
        <div className="container-site max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
            <Link href="/" className="hover:text-ink transition-colors">{t('breadcrumbHome')}</Link>
            <ChevronRight size={12} className="shrink-0" />
            <span className="text-ink font-medium">{tm('h1')}</span>
          </nav>
          <h1 className="font-display font-bold text-ink mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: 1.08 }}>
            {tm('h1')}
          </h1>
          <p className="text-ink-muted text-lg leading-relaxed max-w-2xl">{t('intro')}</p>
        </div>
      </section>

      <section className="pb-16 bg-[var(--bg-base)]">
        <div className="container-site max-w-4xl pt-10">
          <TechPackTemplate />
        </div>
      </section>

      {/* Why it matters + links */}
      <section className="no-print pb-16 bg-[var(--bg-base)]">
        <div className="container-site max-w-3xl">
          <h2 className="font-display font-bold text-ink text-xl mb-4">{t('whyTitle')}</h2>
          <div className="prose prose-sm max-w-none text-ink-muted leading-relaxed space-y-3">
            <p>{t('why1')}</p>
            <p>{t('why2')}</p>
          </div>

          <div className="mt-8 rounded-2xl bg-violet-50 border border-violet-100 p-6">
            <p className="font-semibold text-ink mb-3">{t('ctaTitle')}</p>
            <div className="flex flex-wrap gap-2.5">
              <Link href="/blog/how-to-create-a-tech-pack" className="inline-flex items-center gap-1.5 bg-white border border-cream-300 hover:border-violet-300 text-ink text-sm font-medium px-4 py-2 rounded-full transition-colors">
                {t('guideLink')} <ArrowRight size={13} />
              </Link>
              <Link href="/tools/apparel-cost-calculator" className="inline-flex items-center gap-1.5 bg-white border border-cream-300 hover:border-violet-300 text-ink text-sm font-medium px-4 py-2 rounded-full transition-colors">
                {t('calcLink')} <ArrowRight size={13} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">
                {t('quoteLink')} <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="no-print">
        <BottomCTASection />
      </div>
    </>
  )
}
