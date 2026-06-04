import { useTranslations } from 'next-intl'
import { BadgeCheck } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'

export default function CertificationsSection() {
  const t = useTranslations('certifications')

  // Raw values from the JSON array
  const items: string[] = [
    t('items.0'),
    t('items.1'),
    t('items.2'),
    t('items.3'),
    t('items.4'),
  ]

  return (
    <section className="section-padding-sm bg-[var(--bg-muted)]">
      <div className="container-site">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <StaggerContainer className="flex flex-wrap justify-center gap-4">
          {items.map((cert, i) => (
            <StaggerItem key={i}>
              <div className="flex items-center gap-2.5 bg-white border border-cream-300 rounded-full px-5 py-3 shadow-soft hover:shadow-card transition-shadow">
                <BadgeCheck size={18} className="text-violet-500 shrink-0" />
                <span className="text-sm font-medium text-ink">{cert}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
