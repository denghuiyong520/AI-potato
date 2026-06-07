import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { CheckCircle, Layers, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import SectionTitle from '@/components/shared/SectionTitle'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import ProcessSection from '@/components/home/ProcessSection'
import BottomCTASection from '@/components/home/BottomCTASection'
import { buildAlternates } from '@/lib/seo'
import { AUDIENCE_PAGES } from '@/data/audience-pages'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'services.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, '/services'),
  }
}

export default async function ServicesPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t  = await getTranslations({ locale, namespace: 'services' })
  const ta = await getTranslations({ locale, namespace: 'audience' })

  const moqTiers = [0, 1, 2].map((i) => ({
    qty:   t(`moq.tiers.${i}.qty`),
    label: t(`moq.tiers.${i}.label`),
    note:  t(`moq.tiers.${i}.note`),
  }))

  const fabricCategories = [0, 1, 2].map((ci) => ({
    name:  t(`fabrics.categories.${ci}.name`),
    items: [0, 1, 2, 3].map((ii) => t(`fabrics.categories.${ci}.items.${ii}`)),
  }))

  const techniques = [0, 1, 2, 3, 4, 5].map((i) => ({
    name:        t(`techniques.items.${i}.name`),
    description: t(`techniques.items.${i}.description`),
  }))

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-ink text-white">
        <div className="container-site max-w-3xl">
          <AnimatedSection>
            <h1 className="font-display font-bold text-cream-100 mb-5 whitespace-pre-line"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', lineHeight: 1.05 }}>
              {t('hero.title')}
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-cream-400 text-lg max-w-xl leading-relaxed">{t('hero.subtitle')}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Process section (reused from home) */}
      <ProcessSection />

      {/* MOQ */}
      <section className="section-padding bg-[var(--bg-base)]">
        <div className="container-site">
          <SectionTitle title={t('moq.title')} subtitle={t('moq.subtitle')} />
          <AnimatedSection>
            <p className="text-ink-muted max-w-2xl mx-auto text-center mb-10 leading-relaxed">
              {t('moq.description')}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {moqTiers.map(({ qty, label, note }, i) => (
              <StaggerItem key={i}>
                <div className={`rounded-2xl p-7 text-center border ${
                  i === 1
                    ? 'bg-violet-600 text-white border-violet-600 shadow-lg scale-105'
                    : 'bg-white border-cream-200 shadow-card'
                }`}>
                  <p className={`font-display font-bold text-2xl mb-1 ${i === 1 ? 'text-white' : 'text-ink'}`}>
                    {qty}
                  </p>
                  <p className={`font-semibold text-sm mb-3 ${i === 1 ? 'text-violet-100' : 'text-ink'}`}>
                    {label}
                  </p>
                  <p className={`text-xs leading-relaxed ${i === 1 ? 'text-violet-200' : 'text-ink-muted'}`}>
                    {note}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Fabrics */}
      <section className="section-padding bg-[var(--bg-surface)]">
        <div className="container-site">
          <SectionTitle title={t('fabrics.title')} subtitle={t('fabrics.subtitle')} />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fabricCategories.map(({ name, items }, ci) => (
              <StaggerItem key={ci}>
                <div className="bg-white rounded-2xl p-7 border border-cream-200 shadow-card h-full">
                  <div className="flex items-center gap-2.5 mb-5">
                    <Layers size={18} className="text-violet-500" />
                    <h3 className="font-semibold text-ink">{name}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {items.map((item, ii) => (
                      <li key={ii} className="flex items-center gap-2 text-sm text-ink-muted">
                        <CheckCircle size={14} className="text-violet-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Decoration Techniques */}
      <section className="section-padding bg-[var(--bg-base)]">
        <div className="container-site">
          <SectionTitle title={t('techniques.title')} subtitle={t('techniques.subtitle')} />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {techniques.map(({ name, description }, i) => (
              <StaggerItem key={i}>
                <div className="group bg-[var(--bg-surface)] rounded-2xl p-6 border border-cream-200 hover:border-violet-200 hover:shadow-card transition-all duration-300 h-full">
                  <div className="w-8 h-8 rounded-full bg-violet-100 group-hover:bg-violet-600 flex items-center justify-center mb-4 transition-colors">
                    <span className="text-xs font-bold text-violet-600 group-hover:text-white transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-ink mb-2">{name}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Who We Serve — audience landing pages */}
      <section className="section-padding bg-[var(--bg-base)]">
        <div className="container-site">
          <SectionTitle title={ta('serveTitle')} subtitle={ta('serveSubtitle')} />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {AUDIENCE_PAGES.map((page) => (
              <StaggerItem key={page.slug}>
                <Link
                  href={`/clothing-manufacturer-for/${page.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-cream-200 bg-white p-5 hover:border-violet-200 hover:shadow-card transition-all duration-300 h-full"
                >
                  <span className="font-semibold text-ink text-sm leading-snug">{page.h1}</span>
                  <ArrowRight size={16} className="text-violet-500 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <BottomCTASection />
    </>
  )
}
