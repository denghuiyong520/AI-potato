'use client'

import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import BottomCTASection from '@/components/home/BottomCTASection'
import { useCartStore } from '@/store/cartStore'

export default function CartPage() {
  const t        = useTranslations('cart')
  const locale   = useLocale()
  const items    = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.subtotal)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQty  = useCartStore((s) => s.updateQty)

  // Build quote request URL for all items
  function buildQuoteUrl(): string {
    const lines = items.map((i) => `${i.sku} ×${i.quantity}`).join(', ')
    const detail = `I'd like a quote for the following items: ${lines}. Please provide pricing and availability.`
    const params = new URLSearchParams({ details: detail })
    return `/${locale}/contact?${params.toString()}`
  }

  return (
    <>
      <div className="pt-24 lg:pt-32 pb-16 bg-[var(--bg-base)] min-h-[60vh]">
        <div className="container-site max-w-4xl">

          {/* Page heading */}
          <h1 className="font-display font-bold text-ink mb-8"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
            {t('title')}
          </h1>

          {/* Empty state */}
          {items.length === 0 ? (
            <div className="text-center py-24 text-ink-muted">
              <ShoppingBag size={48} className="mx-auto mb-5 opacity-20" />
              <p className="text-lg font-medium mb-2">{t('empty')}</p>
              <p className="text-sm mb-8 text-ink-muted">{t('emptyHint')}</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-violet-600 text-white font-semibold text-sm px-7 py-3 rounded-full hover:bg-violet-700 transition-colors"
              >
                {t('browseProducts')} <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

              {/* Cart items table */}
              <div>
                <div className="hidden md:grid grid-cols-[80px_1fr_120px_120px_80px_40px] gap-4 text-xs font-semibold text-ink-muted uppercase tracking-wider px-2 mb-3">
                  <span>{t('image')}</span>
                  <span>{t('product')}</span>
                  <span className="text-center">{t('price')}</span>
                  <span className="text-center">{t('quantity')}</span>
                  <span className="text-right">{t('subtotalCol')}</span>
                  <span />
                </div>

                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.slug}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                        className="bg-white border border-cream-200 rounded-2xl overflow-hidden"
                      >
                        {/* Mobile layout */}
                        <div className="flex items-start gap-3 p-4 md:hidden">
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-100 shrink-0">
                            {item.image && (
                              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-violet-500 font-semibold">#{item.sku}</p>
                            <p className="text-sm font-medium text-ink line-clamp-2 leading-snug">{item.title}</p>
                            <p className="text-xs text-ink-muted mt-1">
                              {item.priceNum !== null ? `$${item.priceNum.toFixed(2)}` : t('priceOnRequest')}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <button onClick={() => updateQty(item.slug, item.quantity - 1)}
                                className="w-7 h-7 rounded-full bg-cream-100 flex items-center justify-center hover:bg-cream-200 transition-colors">
                                <Minus size={12} />
                              </button>
                              <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                              <button onClick={() => updateQty(item.slug, item.quantity + 1)}
                                className="w-7 h-7 rounded-full bg-cream-100 flex items-center justify-center hover:bg-cream-200 transition-colors">
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <button onClick={() => removeItem(item.slug)}
                              className="text-ink-muted hover:text-red-500 transition-colors p-1">
                              <Trash2 size={15} />
                            </button>
                            <p className="text-sm font-bold text-ink">
                              {item.priceNum !== null
                                ? `$${(item.priceNum * item.quantity).toFixed(2)}`
                                : '—'}
                            </p>
                          </div>
                        </div>

                        {/* Desktop layout */}
                        <div className="hidden md:grid grid-cols-[80px_1fr_120px_120px_80px_40px] gap-4 items-center px-4 py-3">
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-cream-100">
                            {item.image && (
                              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-violet-500 font-semibold mb-0.5">#{item.sku}</p>
                            <p className="text-sm font-medium text-ink leading-snug line-clamp-2">{item.title}</p>
                          </div>
                          <p className="text-sm text-center text-ink-muted">
                            {item.priceNum !== null ? `$${item.priceNum.toFixed(2)}` : t('priceOnRequest')}
                          </p>
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => updateQty(item.slug, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-cream-100 flex items-center justify-center hover:bg-cream-200 transition-colors">
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQty(item.slug, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-cream-100 flex items-center justify-center hover:bg-cream-200 transition-colors">
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-ink text-right">
                            {item.priceNum !== null
                              ? `$${(item.priceNum * item.quantity).toFixed(2)}`
                              : '—'}
                          </p>
                          <button onClick={() => removeItem(item.slug)}
                            className="flex justify-center text-ink-muted hover:text-red-500 transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {/* Quote all items button */}
                <div className="mt-5">
                  <Link
                    href={buildQuoteUrl()}
                    className="inline-flex items-center gap-2 border border-violet-200 text-violet-600 hover:bg-violet-50 font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
                  >
                    <Send size={14} />
                    {t('requestQuoteAll')}
                  </Link>
                </div>
              </div>

              {/* Order summary sidebar */}
              <div className="bg-white border border-cream-200 rounded-2xl p-6 sticky top-28">
                <h2 className="font-display font-bold text-base text-ink mb-4">{t('summary')}</h2>

                <div className="space-y-2 mb-5 text-sm">
                  <div className="flex justify-between text-ink-muted">
                    <span>{t('subtotal')}</span>
                    <span className="font-medium text-ink">
                      {subtotal !== null ? `$${subtotal.toFixed(2)}` : t('priceOnRequest')}
                    </span>
                  </div>
                  <div className="flex justify-between text-ink-muted">
                    <span>{t('shipping')}</span>
                    <span className="text-xs text-ink-muted">{t('shippingNote')}</span>
                  </div>
                  <div className="border-t border-cream-100 pt-2 flex justify-between font-bold text-ink text-base">
                    <span>{t('total')}</span>
                    <span>{subtotal !== null ? `$${subtotal.toFixed(2)}` : t('priceOnRequest')}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full text-center bg-violet-600 text-white font-semibold text-sm py-3.5 rounded-full hover:bg-violet-700 transition-colors"
                >
                  {t('proceedToCheckout')}
                </Link>

                <Link
                  href="/products"
                  className="block w-full text-center text-xs text-ink-muted hover:text-ink mt-3 transition-colors"
                >
                  ← {t('continueShopping')}
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
      <BottomCTASection />
    </>
  )
}
