'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const t = useTranslations('hero')

  const headline = t('headline').split('\n')

  return (
    <section className="relative h-screen min-h-[600px] max-h-[1000px] flex items-center overflow-hidden">
      {/* Hero background — self-hosted (LCP element; same-origin for fast LCP) */}
      <Image
        src="/hero.jpg"
        alt="Potato Apparel custom clothing manufacturing facility"
        fill
        priority
        fetchPriority="high"
        quality={82}
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay — dark bottom-to-top for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/60 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 container-site w-full">
        <div className="max-w-2xl">
          {/* Pre-headline badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            OEM / ODM Clothing Manufacturer
          </motion.div>

          {/* Headline — single H1 with animated lines (one H1 per page for SEO) */}
          <h1
            className="overflow-hidden mb-6 font-display font-bold text-white leading-[1.05]"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
          >
            {headline.map((line, i) => (
              <motion.span
                key={i}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-white/80 text-base lg:text-lg max-w-xl leading-relaxed mb-10"
          >
            {t('subheadline')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {t('cta1')}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-200"
            >
              {t('cta2')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs tracking-widest uppercase">{t('scrollDown')}</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
