import { useTranslations } from 'next-intl'
import { Layers, Zap, Users, ShieldCheck } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'

const icons = [Layers, Zap, Users, ShieldCheck]

export default function FeaturesSection() {
  const t = useTranslations('features')

  const items = [0, 1, 2, 3].map((i) => ({
    icon: icons[i],
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }))

  return (
    <section className="section-padding bg-[var(--bg-surface)]">
      <div className="container-site">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map(({ icon: Icon, title, description }, i) => (
            <StaggerItem key={i}>
              <div className="group h-full bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-cream-200">
                <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-5 group-hover:bg-violet-100 transition-colors">
                  <Icon size={22} className="text-violet-600" />
                </div>
                <h3 className="font-display font-semibold text-xl text-ink mb-3">{title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
