import type { Metadata } from 'next'
import { notFound }        from 'next/navigation'
import { ChevronRight, ArrowRight, Clock, MessageCircle, CheckCircle, BookOpen } from 'lucide-react'
import { Link }            from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import BottomCTASection    from '@/components/home/BottomCTASection'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import SectionTitle        from '@/components/shared/SectionTitle'
import { buildAlternates, SITE_URL, LOCALES } from '@/lib/seo'
import { AUDIENCE_SLUGS, getAudiencePage } from '@/data/audience-pages'
import { getManufacturingCategory }        from '@/data/manufacturing-categories'

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    AUDIENCE_SLUGS.map((audience) => ({ locale, audience }))
  )
}

const OG_LOCALE: Record<string, string> = {
  en: 'en_US', zh: 'zh_CN', fr: 'fr_FR', de: 'de_DE', es: 'es_ES',
}

export async function generateMetadata({
  params: { locale, audience: slug },
}: {
  params: { locale: string; audience: string }
}): Promise<Metadata> {
  const page = getAudiencePage(slug)
  if (!page) return {}
  const path = `/clothing-manufacturer-for/${slug}`
  return {
    title:       { absolute: page.title },
    description: page.description,
    alternates:  buildAlternates(locale, path),
    openGraph: {
      type:        'website',
      locale:      OG_LOCALE[locale] ?? 'en_US',
      url:         `${SITE_URL}/${locale}${path}`,
      title:       page.title,
      description: page.description,
      siteName:    'Potato Apparel',
      images:      [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: page.h1 }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       page.title,
      description: page.description,
      images:      [`${SITE_URL}/og-default.jpg`],
    },
  }
}

export default async function AudiencePageRoute({
  params: { locale, audience: slug },
}: {
  params: { locale: string; audience: string }
}) {
  const page = getAudiencePage(slug)
  if (!page) notFound()

  const t = await getTranslations({ locale, namespace: 'audience' })
  const pageUrl = `${SITE_URL}/${locale}/clothing-manufacturer-for/${slug}`

  const breadcrumb = {
    '@context':      'https://schema.org',
    '@type':         'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',     item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/${locale}/services` },
      { '@type': 'ListItem', position: 3, name: page.h1,    item: pageUrl },
    ],
  }
  const faqSchema = {
    '@context':  'https://schema.org',
    '@type':     'FAQPage',
    mainEntity:  page.faqs.map((f) => ({
      '@type':        'Question',
      name:           f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      {[breadcrumb, faqSchema].map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Hero */}
      <section className="pt-32 pb-14 lg:pt-40 lg:pb-20 bg-[var(--bg-surface)]">
        <div className="container-site max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
            <Link href="/" className="hover:text-ink transition-colors">{t('breadcrumbHome')}</Link>
            <ChevronRight size={12} className="shrink-0" />
            <Link href="/services" className="hover:text-ink transition-colors">{t('breadcrumbServices')}</Link>
            <ChevronRight size={12} className="shrink-0" />
            <span className="text-ink font-medium">{page.h1}</span>
          </nav>

          <AnimatedSection>
            <h1 className="font-display font-bold text-ink mb-5" style={{ fontSize: 'clamp(1.875rem, 4.2vw, 3.25rem)', lineHeight: 1.08 }}>
              {page.h1}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {page.highlights.map(({ label, value }) => (
                <div key={label} className="rounded-xl bg-white border border-cream-200 px-4 py-3 text-center shadow-sm">
                  <p className="text-xs text-ink-muted mb-0.5">{label}</p>
                  <p className="text-sm font-bold text-ink">{value}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.12}>
            <div className="prose prose-sm lg:prose-base max-w-none text-ink-muted leading-relaxed space-y-4">
              {page.intro.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.18}>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/request-samples" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 shadow hover:shadow-md hover:-translate-y-0.5">
                <Clock size={14} /> {t('requestSample')}
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white border border-cream-300 hover:border-violet-300 text-ink font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 hover:shadow hover:-translate-y-0.5">
                <MessageCircle size={14} /> {t('getQuote')}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How we help */}
      <section className="section-padding bg-[var(--bg-base)]">
        <div className="container-site">
          <SectionTitle title={t('howTitle')} />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {page.points.map((p) => (
              <StaggerItem key={p.title}>
                <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-card h-full flex gap-4">
                  <CheckCircle size={20} className="text-violet-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-ink mb-1.5">{p.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Categories we make */}
      <section className="section-padding bg-[var(--bg-surface)]">
        <div className="container-site max-w-3xl">
          <h2 className="font-display font-bold text-ink text-xl mb-6">{t('categoriesTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {page.categories.map((catSlug) => {
              const cat = getManufacturingCategory(catSlug)
              if (!cat) return null
              return (
                <Link
                  key={catSlug}
                  href={`/manufacturing/${catSlug}`}
                  className="group flex items-center gap-4 rounded-xl border border-cream-200 bg-white p-4 hover:border-violet-200 hover:shadow-card transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-full bg-violet-50 group-hover:bg-violet-100 flex items-center justify-center shrink-0 transition-colors">
                    <ArrowRight size={15} className="text-violet-500 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-sm font-semibold text-ink">{cat.h1}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[var(--bg-base)]">
        <div className="container-site max-w-3xl">
          <SectionTitle title={t('faqTitle')} align="left" />
          <AnimatedSection>
            <div className="space-y-3">
              {page.faqs.map((faq, i) => (
                <details key={i} className="group rounded-xl border border-cream-200 bg-white overflow-hidden" {...(i === 0 ? { open: true } : {})}>
                  <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none hover:bg-cream-50 transition-colors select-none">
                    <span className="font-semibold text-ink text-sm leading-snug">{faq.q}</span>
                    <span className="shrink-0 w-5 h-5 rounded-full border border-cream-300 group-open:border-violet-400 group-open:bg-violet-50 flex items-center justify-center transition-colors">
                      <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 text-ink-muted group-open:text-violet-600 group-open:rotate-180 transition-all" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M2 3.5L5 6.5L8 3.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-sm text-ink-muted leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Related guides */}
      {page.guides && page.guides.length > 0 && (
        <section className="pb-16 bg-[var(--bg-base)]">
          <div className="container-site max-w-3xl">
            <h2 className="font-display font-bold text-ink text-xl mb-6">{t('guidesTitle')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {page.guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/blog/${guide.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-cream-200 bg-white p-4 hover:border-violet-200 hover:shadow-card transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-full bg-violet-50 group-hover:bg-violet-100 flex items-center justify-center shrink-0 transition-colors">
                    <BookOpen size={15} className="text-violet-500" />
                  </div>
                  <p className="text-sm font-semibold text-ink leading-snug">{guide.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <BottomCTASection />
    </>
  )
}
