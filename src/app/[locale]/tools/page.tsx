import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Calculator, FileText, BookOpen, ArrowRight } from 'lucide-react'
import BottomCTASection from '@/components/home/BottomCTASection'
import { buildAlternates, SITE_URL } from '@/lib/seo'

const PATH = '/tools'

const OG_LOCALE: Record<string, string> = {
  en: 'en_US', zh: 'zh_CN', fr: 'fr_FR', de: 'de_DE', es: 'es_ES',
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tools.hub' })
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
      images:      [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: t('h1') }],
    },
  }
}

export default async function ToolsHubPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'tools.hub' })

  const resources = [
    { href: '/tools/apparel-cost-calculator', icon: Calculator, title: t('calcTitle'), desc: t('calcDesc'), tag: t('tagTool') },
    { href: '/tools/tech-pack-template',      icon: FileText,   title: t('techpackTitle'), desc: t('techpackDesc'), tag: t('tagTemplate') },
    { href: '/blog/apparel-manufacturing-glossary', icon: BookOpen, title: t('glossaryTitle'), desc: t('glossaryDesc'), tag: t('tagGuide') },
  ]

  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-14 bg-[var(--bg-surface)]">
        <div className="container-site max-w-3xl text-center">
          <h1 className="font-display font-bold text-ink mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: 1.08 }}>
            {t('h1')}
          </h1>
          <p className="text-ink-muted text-lg leading-relaxed">{t('intro')}</p>
        </div>
      </section>

      <section className="pb-20 bg-[var(--bg-base)]">
        <div className="container-site max-w-4xl pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {resources.map(({ href, icon: Icon, title, desc, tag }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col rounded-2xl border border-cream-200 bg-white p-6 hover:border-violet-200 hover:shadow-card transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-violet-50 group-hover:bg-violet-100 flex items-center justify-center transition-colors">
                    <Icon size={20} className="text-violet-600" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-violet-500 bg-violet-50 px-2 py-1 rounded-full">{tag}</span>
                </div>
                <h2 className="font-display font-bold text-lg text-ink mb-1.5">{title}</h2>
                <p className="text-sm text-ink-muted leading-relaxed flex-1">{desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 mt-4 group-hover:gap-2.5 transition-all">
                  {t('open')} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BottomCTASection />
    </>
  )
}
