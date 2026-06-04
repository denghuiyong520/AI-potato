'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionTitle from '@/components/shared/SectionTitle'

export default function StatsSection() {
  const t = useTranslations('stats')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const items = [0, 1, 2, 3].map((i) => ({
    value: t(`items.${i}.value`),
    label: t(`items.${i}.label`),
  }))

  return (
    <section className="section-padding bg-ink text-white overflow-hidden">
      <div className="container-site">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} light />

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {items.map(({ value, label }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-center lg:text-left"
            >
              <p className="font-display font-bold text-cream-100 mb-2 leading-none"
                 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                {value}
              </p>
              <p className="text-cream-500 text-sm lg:text-base">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
