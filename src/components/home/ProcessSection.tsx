import { useTranslations } from 'next-intl'
import SectionTitle from '@/components/shared/SectionTitle'
import { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'

export default function ProcessSection() {
  const t = useTranslations('process')

  const steps = [0, 1, 2, 3, 4, 5].map((i) => ({
    number:      t(`steps.${i}.number`),
    title:       t(`steps.${i}.title`),
    description: t(`steps.${i}.description`),
  }))

  return (
    <section className="section-padding bg-[var(--bg-surface)]">
      <div className="container-site">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <StaggerContainer className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-cream-300 z-0"
            style={{ left: '4rem', right: '4rem' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4 relative z-10">
            {steps.map(({ number, title, description }, i) => (
              <StaggerItem key={i}>
                <div className="flex lg:flex-col gap-4 lg:gap-0">
                  {/* Number circle */}
                  <div className="shrink-0 lg:mb-5">
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-violet-200 flex items-center justify-center shadow-soft">
                      <span className="font-display font-bold text-violet-600 text-lg">{number}</span>
                    </div>
                  </div>
                  <div className="lg:mt-0 pt-0 lg:pt-0">
                    <h3 className="font-semibold text-ink text-base mb-2">{title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
