'use client'

import { useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { CheckCircle, Copy, Check, ArrowRight, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useOrderStore } from '@/store/orderStore'
import { BANK_ACCOUNTS } from '@/lib/bankDetails'

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value).catch(() => {})
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }}
      className="ml-2 text-ink-muted hover:text-violet-600 transition-colors"
    >
      {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
    </button>
  )
}

export default function OrderSuccessPage() {
  const t      = useTranslations('orderSuccess')
  const locale = useLocale()
  const router = useRouter()
  const order  = useOrderStore((s) => s.order)

  useEffect(() => {
    if (!order) router.replace(`/${locale}/products`)
  }, [order, router, locale])

  if (!order) return null

  const bank = order.method === 'bank' && order.currency
    ? BANK_ACCOUNTS[order.currency]
    : null

  return (
    <div className="pt-24 lg:pt-32 pb-20 bg-[var(--bg-base)] min-h-[70vh]">
      <div className="container-site max-w-2xl">

        {/* Success header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-5">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="font-display font-bold text-ink mb-2"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
            {t('title')}
          </h1>
          <p className="text-ink-muted">{t('subtitle')}</p>
        </motion.div>

        {/* Order ID */}
        <div className="bg-white border border-cream-200 rounded-2xl p-5 mb-5 text-center">
          <p className="text-xs text-ink-muted uppercase tracking-wider mb-1">{t('orderId')}</p>
          <div className="flex items-center justify-center gap-2">
            <p className="font-mono font-bold text-xl text-ink">{order.orderId}</p>
            <CopyButton value={order.orderId} />
          </div>
          <p className="text-xs text-ink-muted mt-1">{t('saveOrderId')}</p>
        </div>

        {/* Payment method confirmation */}
        <div className={`rounded-2xl p-5 mb-5 border ${
          order.method === 'paypal'
            ? 'bg-blue-50 border-blue-100'
            : 'bg-amber-50 border-amber-100'
        }`}>
          {order.method === 'paypal' && (
            <p className="text-sm text-blue-700 font-medium text-center">{t('paypalConfirmed')}</p>
          )}
          {order.method === 'bank' && (
            <>
              <p className="font-semibold text-amber-800 mb-3 text-center">{t('bankInstructions')}</p>
              {bank && (
                <div className="bg-white rounded-xl overflow-hidden divide-y divide-cream-100 border border-amber-100">
                  <div className="px-4 py-3 flex justify-between text-sm">
                    <span className="text-ink-muted font-medium">{t('accountName')}</span>
                    <span className="font-semibold text-ink">{bank.accountName}</span>
                  </div>
                  {bank.fields.map(({ label, value }) => (
                    <div key={label} className="px-4 py-3 flex items-center justify-between text-sm">
                      <span className="text-ink-muted font-medium">{label}</span>
                      <div className="flex items-center">
                        <span className="font-mono font-semibold text-ink">{value}</span>
                        <CopyButton value={value} />
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-3 flex items-start justify-between gap-3 text-sm bg-amber-50">
                    <span className="text-amber-700 font-semibold">{t('transferRef')}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono font-bold text-amber-900">{order.orderId}</span>
                      <CopyButton value={order.orderId} />
                    </div>
                  </div>
                </div>
              )}
              <p className="text-xs text-amber-700 mt-3 text-center font-medium">{t('bankRefNote')}</p>
            </>
          )}
        </div>

        {/* Order summary */}
        {order.items.length > 0 && (
          <div className="bg-white border border-cream-200 rounded-2xl p-5 mb-5">
            <h2 className="font-semibold text-ink text-sm mb-4">{t('yourOrder')}</h2>
            <ul className="space-y-3">
              {order.items.map((item) => (
                <li key={item.slug} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-cream-100 shrink-0">
                    {item.image && (
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="48px" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-violet-500 font-semibold">#{item.sku}</p>
                    <p className="text-sm font-medium text-ink line-clamp-1">{item.title}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-ink-muted">×{item.quantity}</p>
                    <p className="text-sm font-semibold text-ink">
                      {item.priceNum !== null ? `$${(item.priceNum * item.quantity).toFixed(2)}` : '—'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            {order.subtotal !== null && (
              <div className="border-t border-cream-100 mt-4 pt-3 flex justify-between text-sm font-bold text-ink">
                <span>Total</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/products"
            className="flex-1 flex items-center justify-center gap-2 bg-violet-600 text-white font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-violet-700 transition-colors"
          >
            {t('continueShopping')} <ArrowRight size={14} />
          </Link>
          <a
            href="https://wa.me/447907131539"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 border border-cream-300 text-ink font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-cream-50 transition-colors"
          >
            <MessageCircle size={15} />
            {t('contactUs')}
          </a>
        </div>

      </div>
    </div>
  )
}
