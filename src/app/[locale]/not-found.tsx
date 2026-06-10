import Link from 'next/link'
import { ArrowRight, Home, Search, MessageCircle } from 'lucide-react'

// Custom 404 — keeps lost visitors on-site and routes them to conversion paths.
// Rendered within the [locale] layout (nav + footer present). Text is English
// (the most reliable default for a not-found boundary without params).

const QUICK_LINKS = [
  { href: '/en/products',                          label: 'Browse Products' },
  { href: '/en/manufacturing/custom-t-shirts',     label: 'Custom T-Shirts' },
  { href: '/en/manufacturing/custom-hoodies',      label: 'Custom Hoodies' },
  { href: '/en/manufacturing/custom-streetwear',   label: 'Custom Streetwear' },
  { href: '/en/services',                          label: 'Our Services' },
  { href: '/en/blog',                              label: 'Guides & Blog' },
]

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center pt-32 pb-20 bg-[var(--bg-surface)]">
      <div className="container-site max-w-2xl text-center">
        <p className="font-display font-bold text-violet-500 mb-2" style={{ fontSize: 'clamp(3.5rem, 12vw, 7rem)', lineHeight: 1 }}>
          404
        </p>
        <h1 className="font-display font-bold text-ink mb-4" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          This page took a different cut
        </h1>
        <p className="text-ink-muted text-lg leading-relaxed mb-8 max-w-lg mx-auto">
          The page you are looking for does not exist or has moved. Let us get you back on track — here is where most people go next.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link
            href="/en"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 shadow hover:shadow-md hover:-translate-y-0.5"
          >
            <Home size={15} /> Home
          </Link>
          <Link
            href="/en/products"
            className="inline-flex items-center gap-2 bg-white border border-cream-300 hover:border-violet-300 text-ink font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 hover:shadow hover:-translate-y-0.5"
          >
            <Search size={15} /> Browse Products
          </Link>
          <Link
            href="/en/contact"
            className="inline-flex items-center gap-2 bg-white border border-cream-300 hover:border-violet-300 text-ink font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 hover:shadow hover:-translate-y-0.5"
          >
            <MessageCircle size={15} /> Get a Quote
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-lg mx-auto">
          {QUICK_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center justify-between gap-2 rounded-xl border border-cream-200 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:border-violet-200 hover:shadow-card transition-all duration-300"
            >
              <span className="truncate">{label}</span>
              <ArrowRight size={13} className="text-violet-500 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
