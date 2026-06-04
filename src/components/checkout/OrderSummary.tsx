'use client'

import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { useTranslations } from 'next-intl'
import { ShoppingBag } from 'lucide-react'

export default function OrderSummary() {
  const t         = useTranslations('checkout')
  const items     = useCartStore((s) => s.items)
  const subtotal  = useCartStore((s) => s.subtotal)

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-ink-muted">
        <ShoppingBag size={32} className="mb-3 opacity-30" />
        <p className="text-sm">{t('emptyCart')}</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-display font-bold text-lg text-ink mb-5">{t('orderSummary')}</h2>

      {/* Item list */}
      <ul className="space-y-4 mb-6">
        {items.map((item) => (
          <li key={item.slug} className="flex items-start gap-3">
            {/* Thumbnail */}
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-cream-100 shrink-0 border border-cream-200">
              {item.image ? (
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
              ) : (
                <div className="w-full h-full bg-cream-100" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-violet-500 font-semibold mb-0.5">#{item.sku}</p>
              <p className="text-sm font-medium text-ink leading-snug line-clamp-2">{item.title}</p>
              <p className="text-xs text-ink-muted mt-0.5">
                {t('qty')}: {item.quantity}
              </p>
            </div>

            {/* Price */}
            <div className="text-right shrink-0">
              {item.priceNum !== null ? (
                <>
                  <p className="text-sm font-semibold text-ink">
                    ${(item.priceNum * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-xs text-ink-muted">${item.priceNum.toFixed(2)} {t('each')}</p>
                </>
              ) : (
                <p className="text-xs text-ink-muted italic">{t('priceOnRequest')}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="border-t border-cream-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm text-ink-muted">
          <span>{t('subtotal')}</span>
          <span className="font-medium text-ink">
            {subtotal !== null ? `$${subtotal.toFixed(2)}` : t('priceOnRequest')}
          </span>
        </div>
        <div className="flex justify-between text-sm text-ink-muted">
          <span>{t('shipping')}</span>
          <span className="text-ink-muted">{t('shippingNote')}</span>
        </div>
        <div className="border-t border-cream-200 pt-2 flex justify-between">
          <span className="font-bold text-ink text-base">{t('total')}</span>
          <span className="font-bold text-ink text-lg">
            {subtotal !== null ? `$${subtotal.toFixed(2)}` : t('priceOnRequest')}
          </span>
        </div>
      </div>
    </div>
  )
}
