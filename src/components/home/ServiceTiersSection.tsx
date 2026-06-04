'use client'

import { useTranslations } from 'next-intl'
import { Scissors, ArrowRight, Check } from 'lucide-react'
import { Link } from '@/i18n/navigation'

export default function ServiceTiersSection() {
  const t = useTranslations('serviceTiers')

  const tiers = [
    {
      key: 'blank',
      badge: t('blank.badge'),
      title: t('blank.title'),
      subtitle: t('blank.subtitle'),
      moq: t('blank.moq'),
      sampleTime: t('blank.sampleTime'),
      sampleFee: t('blank.sampleFee'),
      bulkTime: t('blank.bulkTime'),
      bulkPrice: t('blank.bulkPrice'),
      features: [
        t('blank.f1'),
        t('blank.f2'),
        t('blank.f3'),
      ],
      highlight: false,
    },
    {
      key: 'logo',
      badge: t('logo.badge'),
      title: t('logo.title'),
      subtitle: t('logo.subtitle'),
      moq: t('logo.moq'),
      sampleTime: t('logo.sampleTime'),
      sampleFee: t('logo.sampleFee'),
      bulkTime: t('logo.bulkTime'),
      bulkPrice: t('logo.bulkPrice'),
      features: [
        t('logo.f1'),
        t('logo.f2'),
        t('logo.f3'),
      ],
      highlight: true,
    },
    {
      key: 'custom',
      badge: t('custom.badge'),
      title: t('custom.title'),
      subtitle: t('custom.subtitle'),
      moq: t('custom.moq'),
      sampleTime: t('custom.sampleTime'),
      sampleFee: t('custom.sampleFee'),
      bulkTime: t('custom.bulkTime'),
      bulkPrice: t('custom.bulkPrice'),
      features: [
        t('custom.f1'),
        t('custom.f2'),
        t('custom.f3'),
      ],
      highlight: false,
    },
  ]

  return (
    <section className="section-padding bg-[var(--bg-base)]">
      <div className="container-site">

        {/* Dashed-frame title block — same style as product detail */}
        <div className="flex justify-center mb-12">
          <div className="relative border-2 border-dashed border-cream-300 rounded-2xl px-10 py-6 text-center max-w-xl w-full">
            <Scissors
              size={22}
              className="absolute -top-3 left-1/2 -translate-x-1/2 text-ink-muted bg-[var(--bg-base)] px-2"
            />
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-2">
              {t('eyebrow')}
            </p>
            <h2
              className="font-display font-bold text-ink leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              {t('title')}
            </h2>
          </div>
        </div>

        {/* Three tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.key}
              className={[
                'relative rounded-2xl border p-7 flex flex-col transition-shadow hover:shadow-card',
                tier.highlight
                  ? 'border-violet-300 bg-violet-50 shadow-sm'
                  : 'border-cream-200 bg-white',
              ].join(' ')}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full whitespace-nowrap">
                  {t('popular')}
                </span>
              )}

              {/* Header */}
              <div className="mb-5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-muted mb-1">
                  {tier.badge}
                </p>
                <h3 className="font-display font-bold text-ink text-xl leading-tight mb-1">
                  {tier.title}
                </h3>
                <p className="text-xs text-violet-500 font-medium">{tier.subtitle}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-cream-300 mb-5" />

              {/* Specs table */}
              <div className="space-y-3 mb-5 flex-1">
                <SpecRow label={t('labels.moq')} value={tier.moq} highlight={tier.highlight} />
                <SpecRow label={t('labels.sampleTime')} value={tier.sampleTime} highlight={tier.highlight} />
                <SpecRow label={t('labels.sampleFee')} value={tier.sampleFee} highlight={tier.highlight} />
                <SpecRow label={t('labels.bulkTime')} value={tier.bulkTime} highlight={tier.highlight} />
                <SpecRow label={t('labels.bulkPrice')} value={tier.bulkPrice} highlight={tier.highlight} />
              </div>

              {/* Feature bullets */}
              <ul className="space-y-1.5 mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-ink-muted">
                    <Check size={13} className="text-violet-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/contact"
                className={[
                  'flex items-center justify-center gap-2 font-semibold text-sm px-5 py-3 rounded-full transition-all',
                  tier.highlight
                    ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm'
                    : 'bg-ink text-white hover:bg-ink-light',
                ].join(' ')}
              >
                {t('cta')} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

function SpecRow({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight: boolean
}) {
  return (
    <div className="flex gap-2 text-sm">
      <span className={['font-semibold shrink-0', highlight ? 'text-violet-700' : 'text-ink'].join(' ')}>
        {label}:
      </span>
      <span className="text-ink-muted leading-snug">{value}</span>
    </div>
  )
}
