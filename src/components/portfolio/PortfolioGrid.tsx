'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import BottomCTASection from '@/components/home/BottomCTASection'
import { unsplashUrl } from '@/data/products'

const portfolioItems = [
  { id: 1,  category: 'tshirts',    title: 'Premium Heavyweight Tee',      client: 'LA Streetwear Brand',      photoId: '1521572163474-6864f9cf17ab' },
  { id: 2,  category: 'hoodies',    title: 'Cropped Fleece Pullover',      client: 'UK Lifestyle Label',        photoId: '1620799140408-edc6dcb6d633' },
  { id: 3,  category: 'activewear', title: 'Seamless Ribbed Yoga Set',     client: 'NYC Yoga Brand',            photoId: '1506629082955-511b1aa562c8' },
  { id: 4,  category: 'streetwear', title: 'Oversized Graphic Tee',        client: 'Paris Youth Label',         photoId: '1529374255404-311a2a4f1fd9' },
  { id: 5,  category: 'dresses',    title: 'Ribbed Bodycon Mini Dress',    client: 'Sydney Fashion House',      photoId: '1566174053879-31528523f8ae' },
  { id: 6,  category: 'activewear', title: 'High-Waist Seamless Set',      client: 'Miami Active Brand',        photoId: '1518310383802-640c2de311b2' },
  { id: 7,  category: 'streetwear', title: 'Satin Varsity Bomber',         client: 'Toronto Streetwear Co',     photoId: '1591047139829-d91aecb6caea' },
  { id: 8,  category: 'tshirts',    title: 'Vintage Wash Heavyweight',     client: 'Berlin Creative Studio',    photoId: '1503341504253-dff4815485f1' },
  { id: 9,  category: 'hoodies',    title: 'Woven Coach Jacket',           client: 'Singapore Streetwear',      photoId: '1551028719-00167b16eac5'    },
  { id: 10, category: 'streetwear', title: 'Tapered Cargo Sweatpant',      client: 'Dubai Fashion Label',       photoId: '1552902865-b72c031ac5ea'    },
  { id: 11, category: 'streetwear', title: 'Oversized Denim Jacket',       client: 'London Design Studio',      photoId: '1543076447-215ad9ba6923'    },
  { id: 12, category: 'tshirts',    title: 'Custom Polo Shirt',            client: 'Barcelona Street Brand',    photoId: '1588850561407-ed78c282e89b' },
  { id: 13, category: 'hoodies',    title: 'Zip-Up Premium Hoodie',        client: 'Amsterdam Fashion Label',   photoId: '1614252370068-85bdf2eac7d3' },
  { id: 14, category: 'tshirts',    title: 'Embroidered Logo Polo',        client: 'UAE Luxury Brand',          photoId: '1489987707849-b10df7e3f5f0' },
  { id: 15, category: 'streetwear', title: 'Screen Print Sweatshirt',      client: 'Riyadh Streetwear Brand',   photoId: '1515886657613-9f3515b0c78f' },
  { id: 16, category: 'activewear', title: 'Compression Training Set',     client: 'Canadian Fitness Brand',    photoId: '1571019613454-1cb2f99b2d8b' },
]

export default function PortfolioGrid() {
  const t = useTranslations('portfolio')

  const allFilters = ['all', 'tshirts', 'hoodies', 'activewear', 'streetwear', 'dresses']
  const filterLabels = allFilters.map((f) => f === 'all' ? t('filter.all') : t(`filter.${f}`))

  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? portfolioItems
    : portfolioItems.filter((p) => p.category === active)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-[var(--bg-surface)]">
        <div className="container-site text-center max-w-2xl mx-auto">
          <AnimatedSection>
            <h1 className="font-display font-bold text-ink mb-4"
                style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)', lineHeight: 1.1 }}>
              {t('hero.title')}
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-ink-muted text-lg leading-relaxed">{t('hero.subtitle')}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section-padding bg-[var(--bg-base)]">
        <div className="container-site">
          {/* Filter bar */}
          <AnimatedSection className="mb-10">
            <div className="flex flex-wrap gap-2">
              {allFilters.map((f, i) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`text-sm font-medium px-4 py-2 rounded-full border transition-all duration-200 ${
                    active === f
                      ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                      : 'bg-white text-ink-muted border-cream-300 hover:border-ink hover:text-ink'
                  }`}
                >
                  {filterLabels[i]}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-cream-200 aspect-[3/4]">
                    <Image
                      src={unsplashUrl(item.photoId, 400, 530)}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-all duration-300 flex items-end">
                      <div className="p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-white font-semibold text-sm">{item.title}</p>
                        <p className="text-white/70 text-xs">{item.client}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-[var(--bg-surface)]">
        <div className="container-site max-w-xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-ink mb-3">{t('cta.title')}</h2>
            <p className="text-ink-muted mb-6">{t('cta.subtitle')}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-violet-600 text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-violet-700 transition-colors"
            >
              {t('cta.button')} <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <BottomCTASection />
    </>
  )
}
