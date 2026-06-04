'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Calendar, Clock, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/lib/blog'
import { useLocale, useTranslations } from 'next-intl'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const locale = useLocale()
  const t = useTranslations('blog')

  const categoryLabels: Record<string, string> = {
    'Brand Building':     t('filter.brandBuilding'),
    'Manufacturing':      t('filter.manufacturing'),
    'Design & Tech Pack': t('filter.design'),
    'Industry Insights':  t('filter.trends'),
  }

  const categoryLabel = categoryLabels[post.category] ?? post.category

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <motion.article
        className="h-full bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-cream-200 flex flex-col"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {/* Cover image */}
        <div className="relative overflow-hidden aspect-[16/9] bg-cream-200 shrink-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-ink text-xs font-medium px-2.5 py-1 rounded-full">
              <Tag size={10} />
              {categoryLabel}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 lg:p-6 flex flex-col flex-1">
          <h3 className="font-display font-semibold text-ink text-lg leading-snug mb-2 group-hover:text-violet-700 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-ink-muted leading-relaxed mb-4 flex-1 line-clamp-3">
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-ink-subtle pt-3 border-t border-cream-200">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(post.date, locale)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readingTimeMinutes} {t('minRead')}
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
