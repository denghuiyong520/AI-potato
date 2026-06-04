'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Copy, Check, CreditCard, Building2, ExternalLink } from 'lucide-react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useCartStore } from '@/store/cartStore'
import { useOrderStore } from '@/store/orderStore'
import { generateOrderId } from '@/lib/orderUtils'
import { BANK_ACCOUNTS, BANK_CURRENCIES } from '@/lib/bankDetails'
import type { BankCurrency } from '@/store/orderStore'
import { cn } from '@/lib/utils'

type PayMethod = 'paypal' | 'bank' | 'card'

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? 'sb'

// ─── PayPal SVG logo ─────────────────────────────────────────────────────────
function PayPalLogo() {
  return (
    <svg viewBox="0 0 124 33" className="h-5" aria-hidden>
      <path fill="#253B80" d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.66h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.748-4.985-1.748"/>
      <path fill="#253B80" d="M47.049 14.4c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.36.42.469 1.044.332 1.906"/>
      <path fill="#179BD7" d="M66.654 14.316h-3.278a.57.57 0 0 0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0-.558-.658"/>
      <path fill="#179BD7" d="M59.118 20.099c-.314 1.841-1.794 3.077-3.655 3.077-.938 0-1.689-.301-2.172-.872-.479-.568-.659-1.376-.509-2.276.293-1.825 1.796-3.101 3.629-3.101.919 0 1.664.305 2.157.883.497.582.692 1.396.55 2.289"/>
      <path fill="#253B80" d="M84.096 14.316h-3.291a.954.954 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678h-3.234a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.468-.895"/>
      <path fill="#179BD7" d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.569.569 0 0 0 .562.66h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.306-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.748-4.983-1.748"/>
      <path fill="#179BD7" d="M95.78 14.4c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.36.42.468 1.044.331 1.906"/>
      <path fill="#253B80" d="M115.384 14.316h-3.277a.569.569 0 0 0-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.710 2.741-7.313 6.586-.312 1.918.133 3.752 1.221 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0-.561-.658"/>
      <path fill="#253B80" d="M107.848 20.099c-.314 1.841-1.795 3.077-3.656 3.077-.938 0-1.689-.301-2.172-.872-.479-.568-.658-1.376-.507-2.276.293-1.825 1.795-3.101 3.629-3.101.918 0 1.664.305 2.156.883.498.582.692 1.396.55 2.289"/>
      <path fill="#179BD7" d="M113.938 7.067l-2.805 17.849a.568.568 0 0 0 .562.659h2.822c.469 0 .867-.34.939-.803l2.768-17.536a.57.57 0 0 0-.562-.66h-3.162a.571.571 0 0 0-.562.491"/>
      <path fill="#253B80" d="M7.266 29.154l.523-3.322-1.165-.027H1.061L4.927 1.292a.316.316 0 0 1 .314-.268h9.38c3.114 0 5.263.648 6.385 1.927.526.6.861 1.227 1.023 1.917.17.724.173 1.589.007 2.644l-.012.077v.676l.526.298a3.69 3.69 0 0 1 1.065.812c.45.513.741 1.165.864 1.938.127.795.085 1.741-.123 2.812-.24 1.232-.628 2.305-1.152 3.183a6.547 6.547 0 0 1-1.828 2.043 7.514 7.514 0 0 1-2.43 1.109 11.37 11.37 0 0 1-3.049.374h-.724a2.184 2.184 0 0 0-2.157 1.839l-.055.301-1.064 6.745-.047.239c-.012.074-.031.111-.058.136a.155.155 0 0 1-.096.033H7.266z"/>
      <path fill="#179BD7" d="M23.048 7.667c-.028.179-.06.362-.096.55-1.237 6.351-5.469 8.545-10.874 8.545H9.326a1.338 1.338 0 0 0-1.321 1.132L6.596 27.455l-.399 2.531a.704.704 0 0 0 .695.814h4.881c.578 0 1.069-.42 1.16-.99l.048-.248.919-5.832.059-.32c.09-.572.582-.992 1.16-.992h.73c4.729 0 8.431-1.92 9.513-7.476.452-2.321.218-4.259-.978-5.622a4.667 4.667 0 0 0-1.336-1.053z"/>
    </svg>
  )
}

// ─── Copy-to-clipboard helper ─────────────────────────────────────────────────
function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(value).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button
      onClick={copy}
      className="ml-2 text-ink-muted hover:text-violet-600 transition-colors"
      aria-label="Copy"
    >
      {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
    </button>
  )
}

// ─── Bank Transfer Panel ──────────────────────────────────────────────────────
function BankTransferPanel({ onConfirm }: { onConfirm: (currency: BankCurrency) => void }) {
  const t = useTranslations('checkout')
  const [currency, setCurrency] = useState<BankCurrency>('USD')
  const bank = BANK_ACCOUNTS[currency]

  return (
    <div>
      {/* Currency tabs */}
      <div className="flex gap-1 mb-5 bg-cream-50 p-1 rounded-xl">
        {BANK_CURRENCIES.map((c) => (
          <button
            key={c}
            onClick={() => setCurrency(c)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all',
              currency === c
                ? 'bg-white shadow-sm text-ink'
                : 'text-ink-muted hover:text-ink',
            )}
          >
            <span>{BANK_ACCOUNTS[c].flag}</span>
            {c}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currency}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          {/* Account name */}
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
            {t('bankAccountName')}
          </p>
          <p className="font-semibold text-ink mb-4 text-base">{bank.accountName}</p>

          {/* Fields */}
          <div className="rounded-xl border border-cream-200 overflow-hidden divide-y divide-cream-100 mb-4">
            {bank.fields.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-ink-muted font-medium w-36 shrink-0">{label}</span>
                <div className="flex items-center gap-1 min-w-0">
                  <span className="font-mono text-ink font-semibold truncate">{value}</span>
                  <CopyButton value={value} />
                </div>
              </div>
            ))}
          </div>

          {/* Bank address */}
          <p className="text-xs text-ink-muted leading-relaxed mb-5">
            <span className="font-semibold">{t('bankAddress')}:</span> {bank.bankAddress}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Confirm Order button */}
      <button
        onClick={() => onConfirm(currency)}
        className="w-full py-3.5 bg-ink text-white font-semibold rounded-full hover:bg-ink-light transition-colors text-sm"
      >
        {t('confirmOrder')}
      </button>
      <p className="text-xs text-center text-ink-muted mt-3">{t('bankTransferNote')}</p>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function PaymentOptions() {
  const t        = useTranslations('checkout')
  const locale   = useLocale()
  const router   = useRouter()

  const items    = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.subtotal)
  const clearCart = useCartStore((s) => s.clearCart)
  const setOrder  = useOrderStore((s) => s.setOrder)

  const [method, setMethod] = useState<PayMethod>('paypal')

  function handleBankConfirm(currency: BankCurrency) {
    const orderId = generateOrderId()
    setOrder({
      orderId,
      method: 'bank',
      currency,
      items,
      subtotal,
      createdAt: new Date().toISOString(),
    })
    clearCart()
    router.push(`/${locale}/order-success`)
  }

  function handlePayPalSuccess() {
    const id = generateOrderId()
    setOrder({
      orderId: id,
      method: 'paypal',
      items,
      subtotal,
      createdAt: new Date().toISOString(),
    })
    clearCart()
    router.push(`/${locale}/order-success`)
  }

  const paypalAmount = subtotal ? subtotal.toFixed(2) : '1.00'

  const methods: { id: PayMethod; label: string; icon: React.ReactNode }[] = [
    {
      id: 'paypal',
      label: 'PayPal',
      icon: <PayPalLogo />,
    },
    {
      id: 'bank',
      label: t('bankTransfer'),
      icon: <Building2 size={18} className="text-blue-600" />,
    },
    {
      id: 'card',
      label: t('creditCard'),
      icon: <CreditCard size={18} className="text-slate-500" />,
    },
  ]

  return (
    <div>
      <h2 className="font-display font-bold text-lg text-ink mb-5">{t('paymentMethod')}</h2>

      {/* Method selector */}
      <div className="space-y-2 mb-6">
        {methods.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setMethod(id)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all',
              method === id
                ? 'border-violet-500 bg-violet-50'
                : 'border-cream-200 hover:border-cream-400',
            )}
          >
            {/* Radio dot */}
            <span
              className={cn(
                'w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0',
                method === id ? 'border-violet-500' : 'border-cream-300',
              )}
            >
              {method === id && (
                <span className="w-2 h-2 rounded-full bg-violet-500" />
              )}
            </span>
            {/* Icon */}
            <span className="shrink-0 flex items-center">{icon}</span>
            {/* Label */}
            <span className={cn(
              'font-medium text-sm',
              method === id ? 'text-ink' : 'text-ink-muted',
            )}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Panel content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={method}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="bg-cream-50 rounded-2xl p-5 border border-cream-200"
        >
          {/* ── PayPal ── */}
          {method === 'paypal' && (
            <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: 'USD' }}>
              <div>
                <PayPalButtons
                  style={{ layout: 'vertical', color: 'blue', shape: 'pill', label: 'pay' }}
                  createOrder={(_data, actions) =>
                    actions.order.create({
                      intent: 'CAPTURE',
                      purchase_units: [{
                        amount: { currency_code: 'USD', value: paypalAmount },
                        description: `Potato Apparel Order (${items.length} item${items.length !== 1 ? 's' : ''})`,
                      }],
                    })
                  }
                  onApprove={async (_data, actions) => {
                    await actions.order?.capture()
                    handlePayPalSuccess()
                  }}
                />
                <div className="mt-3 text-center">
                  <p className="text-xs text-ink-muted">{t('orPayDirect')}</p>
                  <a
                    href="https://paypal.me/PotatoApparel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-violet-600 hover:underline font-semibold mt-1"
                  >
                    paypal.me/PotatoApparel <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </PayPalScriptProvider>
          )}

          {/* ── Bank Transfer ── */}
          {method === 'bank' && (
            <BankTransferPanel onConfirm={handleBankConfirm} />
          )}

          {/* ── Card (Coming Soon) ── */}
          {method === 'card' && (
            <div className="py-4 text-center">
              <CreditCard size={32} className="mx-auto mb-3 text-cream-300" />
              <p className="font-semibold text-ink mb-2">{t('cardComingSoon')}</p>
              <p className="text-sm text-ink-muted max-w-xs mx-auto">{t('cardComingSoonNote')}</p>
              {/* TODO: Add Stripe Elements here when NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is ready */}
              {/* import { loadStripe } from '@stripe/stripe-js' */}
              {/* import { Elements } from '@stripe/react-stripe-js' */}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
