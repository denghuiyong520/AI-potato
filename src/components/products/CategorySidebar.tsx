'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORY_TREE } from '@/data/categories'
import { cn } from '@/lib/utils'

interface Props {
  /** Current active category from URL */
  activeCategory: string
  /** Current active subcategory from URL */
  activeSubcategory: string | null
  /** Product count per category slug */
  categoryCounts: Record<string, number>
  /** Product count per subcategory slug */
  subcategoryCounts: Record<string, number>
}

export default function CategorySidebar({
  activeCategory,
  activeSubcategory,
  categoryCounts,
  subcategoryCounts,
}: Props) {
  const router   = useRouter()
  const pathname = usePathname()

  // Track which parent categories are expanded
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    // Pre-expand the active category on mount
    const init: Record<string, boolean> = {}
    if (activeCategory !== 'all') init[activeCategory] = true
    return init
  })

  // When active category changes (e.g. URL navigation), expand it
  useEffect(() => {
    if (activeCategory !== 'all') {
      setExpanded((prev) => ({ ...prev, [activeCategory]: true }))
    }
  }, [activeCategory])

  function navigate(category: string, sub?: string) {
    const params = new URLSearchParams()
    if (category !== 'all') params.set('category', category)
    if (sub)               params.set('sub', sub)
    const qs = params.toString()
    router.push(pathname + (qs ? `?${qs}` : ''))
  }

  function toggleExpand(catValue: string) {
    setExpanded((prev) => ({ ...prev, [catValue]: !prev[catValue] }))
  }

  const totalProducts = Object.values(categoryCounts).reduce((a, b) => a + b, 0)

  return (
    <nav className="select-none">
      {/* All Products */}
      <button
        onClick={() => navigate('all')}
        className={cn(
          'w-full text-left px-0 py-2 text-[13px] font-semibold transition-colors border-b border-cream-100 mb-2 pb-3',
          activeCategory === 'all'
            ? 'text-violet-600'
            : 'text-ink-muted hover:text-ink',
        )}
      >
        All Products
        <span className="ml-1.5 text-[11px] font-normal text-ink-muted/60">
          ({totalProducts})
        </span>
      </button>

      <ul className="space-y-0.5">
        {CATEGORY_TREE.map((cat) => {
          const hasSubs   = (cat.subcategories?.length ?? 0) > 0
          const isActive  = activeCategory === cat.value
          const isExpanded = expanded[cat.value] ?? false
          const count     = categoryCounts[cat.value] ?? 0

          return (
            <li key={cat.value}>
              {/* Parent row */}
              <div className="flex items-center gap-0">
                {/* Category name button */}
                <button
                  onClick={() => {
                    navigate(cat.value)
                    if (hasSubs && !isExpanded) toggleExpand(cat.value)
                  }}
                  className={cn(
                    'flex-1 text-left py-2 text-[13px] transition-colors',
                    isActive && !activeSubcategory
                      ? 'text-violet-600 font-semibold'
                      : count > 0
                        ? 'text-ink font-medium hover:text-violet-600'
                        : 'text-ink-muted/50 font-medium cursor-default',
                  )}
                >
                  {cat.label}
                  {count > 0 && (
                    <span className="ml-1.5 text-[11px] font-normal text-ink-muted/50">
                      ({count})
                    </span>
                  )}
                </button>

                {/* Expand arrow — only for categories with subs */}
                {hasSubs && (
                  <button
                    onClick={() => toggleExpand(cat.value)}
                    className="p-1.5 text-ink-muted/40 hover:text-ink-muted transition-colors"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={12} />
                    </motion.div>
                  </button>
                )}
              </div>

              {/* Subcategory list */}
              {hasSubs && (
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.ul
                      key="subs"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      {cat.subcategories!.map((sub) => {
                        const subCount  = subcategoryCounts[sub.value] ?? 0
                        const isSubActive = isActive && activeSubcategory === sub.value
                        if (subCount === 0) return null  // hide empty subcategories
                        return (
                          <li key={sub.value}>
                            <button
                              onClick={() => navigate(cat.value, sub.value)}
                              className={cn(
                                'w-full text-left pl-3 py-1.5 text-[12px] transition-colors',
                                isSubActive
                                  ? 'text-violet-600 font-semibold'
                                  : 'text-ink-muted hover:text-ink',
                              )}
                            >
                              {sub.label}
                              <span className="ml-1 text-[11px] text-ink-muted/40">
                                ({subCount})
                              </span>
                            </button>
                          </li>
                        )
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
