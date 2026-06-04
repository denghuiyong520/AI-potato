'use client'

import { useState } from 'react'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import CategorySidebar from './CategorySidebar'

interface Props {
  activeCategory: string
  activeSubcategory: string | null
  categoryCounts: Record<string, number>
  subcategoryCounts: Record<string, number>
}

export default function MobileFilterPanel(props: Props) {
  const [open, setOpen] = useState(false)

  const activeLabel =
    props.activeCategory === 'all'
      ? 'All Products'
      : props.activeSubcategory
        ? props.activeSubcategory
            .split('-')
            .map((w) => w[0].toUpperCase() + w.slice(1))
            .join(' ')
        : props.activeCategory
            .split('-')
            .map((w) => w[0].toUpperCase() + w.slice(1))
            .join(' ')

  return (
    <div className="lg:hidden mb-4 border border-cream-200 rounded-xl overflow-hidden bg-white">
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-ink"
      >
        <span className="flex items-center gap-2 text-ink-muted">
          <SlidersHorizontal size={14} />
          Filter:
          <span className="text-violet-600 font-semibold">{activeLabel}</span>
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={15} className="text-ink-muted" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-cream-100"
          >
            <div className="px-4 py-3">
              <CategorySidebar {...props} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
