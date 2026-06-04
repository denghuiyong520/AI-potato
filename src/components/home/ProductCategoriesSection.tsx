'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import SectionTitle from '@/components/shared/SectionTitle'
import { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import { ArrowRight } from 'lucide-react'

// Confirmed clothing-relevant Unsplash photo IDs + target category URLs
const categoryData = [
  {
    // White boxy t-shirt flat lay
    photo: '1521572163474-6864f9cf17ab',
    href: '/products?category=t-shirts',
  },
  {
    // White hoodie flat lay
    photo: '1620799140408-edc6dcb6d633',
    href: '/products?category=hoodies',
  },
  {
    // Ribbed bodycon dress
    photo: '1566174053879-31528523f8ae',
    href: '/products?category=dresses',
  },
  {
    // Seamless yoga / activewear set
    photo: '1506629082955-511b1aa562c8',
    href: '/products?category=activewear',
  },
  {
    // High-waist seamless leggings (activewear / swimwear adjacent)
    photo: '1518310383802-640c2de311b2',
    href: '/products?category=activewear',
  },
  {
    // Model in graphic black tee — streetwear vibe
    photo: '1503341504253-dff4815485f1',
    href: '/products?category=t-shirts',
  },
  {
    // Bomber jacket outerwear
    photo: '1591047139829-d91aecb6caea',
    href: '/products?category=outerwear',
  },
  {
    // Structured baseball cap
    photo: '1588850561407-ed78c282e89b',
    href: '/products?category=accessories',
  },
]

function unsplashUrl(id: string, w: number, h: number = w) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`
}

export default function ProductCategoriesSection() {
  const t = useTranslations('categories')

  const items = categoryData.map((data, i) => ({
    name:        t(`items.${i}.name`),
    description: t(`items.${i}.description`),
    photo:       data.photo,
    href:        data.href,
  }))

  return (
    <section className="section-padding bg-[var(--bg-base)]">
      <div className="container-site">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {items.map(({ name, description, photo, href }, i) => (
            <StaggerItem key={i}>
              <Link href={href} className="group block h-full">
                <div className="relative overflow-hidden rounded-2xl bg-cream-200 aspect-[4/5]">
                  <Image
                    src={unsplashUrl(photo, 400, 500)}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                  />
                  {/* Dark gradient at bottom always visible */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />
                  {/* Category name on image */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-white font-semibold text-sm lg:text-base leading-tight">
                      {name}
                    </h3>
                    <p className="text-white/70 text-xs mt-0.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 line-clamp-1">
                      {description}
                    </p>
                  </div>
                  {/* Hover overlay tint */}
                  <div className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/15 transition-all duration-300" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-800 border-b border-violet-300 hover:border-violet-600 pb-0.5 transition-all"
          >
            {t('viewAll')} <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
