'use client'

import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface BlogFilterProps {
  categories: string[]
  active: string
  onChange: (cat: string) => void
}

export default function BlogFilter({ categories, active, onChange }: BlogFilterProps) {
  const t = useTranslations('blog.filter')

  const labelMap: Record<string, string> = {
    all:           t('all'),
    'Brand Building':  t('brandBuilding'),
    Manufacturing:     t('manufacturing'),
    'Design & Tech Pack': t('design'),
    'Industry Insights': t('trends'),
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            'text-sm font-medium px-4 py-2 rounded-full border transition-all duration-200',
            active === cat
              ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
              : 'bg-white text-ink-muted border-cream-300 hover:border-ink hover:text-ink',
          )}
        >
          {labelMap[cat] ?? cat}
        </button>
      ))}
    </div>
  )
}
