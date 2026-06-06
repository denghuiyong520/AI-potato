'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'

// Palette cycles per testimonial index — keeps consistent colour regardless of animation
const AVATAR_PALETTES = [
  { bg: 'bg-violet-600', text: 'text-white' },
  { bg: 'bg-sky-600',    text: 'text-white' },
  { bg: 'bg-rose-600',   text: 'text-white' },
]

function TestimonialAvatar({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
  const { bg, text } = AVATAR_PALETTES[index % AVATAR_PALETTES.length]
  return (
    <div
      className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center font-bold text-sm select-none ${bg} ${text}`}
      aria-label={name}
    >
      {initials}
    </div>
  )
}

export default function TestimonialsSection() {
  const t = useTranslations('testimonials')
  const [active, setActive] = useState(0)

  const items = [0, 1, 2].map((i) => ({
    name:    t(`items.${i}.name`),
    role:    t(`items.${i}.role`),
    country: t(`items.${i}.country`),
    rating:  Number(t(`items.${i}.rating`)),
    text:    t(`items.${i}.text`),
  }))

  function prev() { setActive((a) => (a - 1 + items.length) % items.length) }
  function next() { setActive((a) => (a + 1) % items.length) }

  return (
    <section className="section-padding bg-[var(--bg-base)]">
      <div className="container-site">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <div className="max-w-3xl mx-auto">
          {/* Testimonial card */}
          <div className="relative bg-white rounded-3xl shadow-card p-8 lg:p-12 border border-cream-200 overflow-hidden">
            {/* Decorative quote mark */}
            <Quote
              size={80}
              className="absolute top-6 right-8 text-violet-100 fill-violet-50"
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: items[active].rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg lg:text-xl text-ink-light leading-relaxed font-light mb-8 relative z-10">
                  &ldquo;{items[active].text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* TODO: Replace with real client avatar photos */}
                  <TestimonialAvatar name={items[active].name} index={active} />
                  <div>
                    <p className="font-semibold text-ink text-sm">{items[active].name}</p>
                    <p className="text-xs text-ink-muted">
                      {items[active].role} · {items[active].country}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === active ? 'bg-violet-600 w-6' : 'bg-cream-300 hover:bg-cream-400'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full border border-cream-300 flex items-center justify-center text-ink-muted hover:bg-cream-100 hover:text-ink transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full border border-cream-300 flex items-center justify-center text-ink-muted hover:bg-cream-100 hover:text-ink transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
