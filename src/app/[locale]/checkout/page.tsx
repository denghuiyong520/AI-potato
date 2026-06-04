'use client'

import { useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { ChevronRight, LockKeyhole } from 'lucide-react'
import OrderSummary from '@/components/checkout/OrderSummary'
import PaymentOptions from '@/components/checkout/PaymentOptions'
import { useCartStore } from '@/store/cartStore'

export default function CheckoutPage() {
  const t      = useTranslations('checkout')
  const locale = useLocale()
  const router = useRouter()
  const items  = useCartStore((s) => s.items)

  // Redirect to cart if empty
  useEffect(() => {
    if (items.length === 0) {
      router.replace(`/${locale}/cart`)
    }
  }, [items, router, locale])

  if (items.length === 0) return null

  return (
    <div className="pt-24 lg:pt-32 pb-20 bg-[var(--bg-base)]">
      <div className="container-site max-w-5xl">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-8 flex-wrap">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/cart" className="hover:text-ink transition-colors">{t('cart')}</Link>
          <ChevronRight size={12} />
          <span className="text-ink font-semibold">{t('checkout')}</span>
        </nav>

        {/* Page title */}
        <div className="flex items-center gap-3 mb-8">
          <h1 className="font-display font-bold text-ink"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
            {t('checkout')}
          </h1>
          <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
            <LockKeyhole size={11} />
            {t('secureCheckout')}
          </span>
        </div>

        {/* Main grid: Order summary (left) + Payment (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">

          {/* Left: Order summary */}
          <div className="bg-white border border-cream-200 rounded-2xl p-6 lg:p-8">
            <OrderSummary />
          </div>

          {/* Right: Payment options */}
          <div className="bg-white border border-cream-200 rounded-2xl p-6 lg:p-8 lg:sticky lg:top-28">
            <PaymentOptions />
          </div>
        </div>

      </div>
    </div>
  )
}
