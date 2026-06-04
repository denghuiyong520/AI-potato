'use client'

import { useState } from 'react'
import { ShoppingBag, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore, parsePrice } from '@/store/cartStore'
import type { CartItem } from '@/types/cart'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface Props {
  slug:     string
  sku:      string
  title:    string
  price:    string | null
  image:    string
  category: string
  className?: string
}

export default function AddToCartButton({
  slug, sku, title, price, image, category, className,
}: Props) {
  const t = useTranslations('cart')
  const addItem = useCartStore((s) => s.addItem)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    const item: Omit<CartItem, 'quantity'> = {
      slug,
      sku,
      title,
      price,
      priceNum: parsePrice(price),
      image,
      category,
    }
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      className={cn(
        'relative flex-1 flex items-center justify-center gap-2 font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-200 overflow-hidden',
        added
          ? 'bg-green-500 text-white'
          : 'bg-ink text-white hover:bg-ink-light',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2"
          >
            <Check size={15} />
            {t('addedToCart')}
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2"
          >
            <ShoppingBag size={15} />
            {t('addToCart')}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
