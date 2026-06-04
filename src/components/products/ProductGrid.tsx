'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { Search, X } from 'lucide-react'
import type { ImportedProduct } from '@/types/product'

interface Props {
  /** Products already filtered by category/subcategory from the server */
  products: ImportedProduct[]
  /** Initial search term from URL ?search= param */
  initialSearch?: string
  /** Human-readable label for the active category/sub, e.g. "Hoodies" */
  activeLabel: string
  activeCategory: string
  activeSubcategory: string | null
  /** Breadcrumb parent category label (if drilling into a subcategory) */
  activeCatLabel?: string
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-violet-100 text-violet-700 rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  )
}

export default function ProductGrid({
  products,
  initialSearch = '',
  activeLabel,
  activeCategory,
  activeSubcategory,
  activeCatLabel,
}: Props) {
  const lt = useTranslations('products.listing')

  const [query, setQuery] = useState(initialSearch)
  const inputRef = useRef<HTMLInputElement>(null)

  // Sync if initialSearch changes (e.g. user navigates with different ?search= param)
  useEffect(() => {
    setQuery(initialSearch)
  }, [initialSearch])

  // ── Filter logic ──────────────────────────────────────────────────────────
  const trimmed = query.trim().toLowerCase()
  const displayed = trimmed
    ? products.filter((p) =>
        p.sku.toLowerCase().includes(trimmed) ||
        p.title_en.toLowerCase().includes(trimmed) ||
        (p.title_zh && p.title_zh.toLowerCase().includes(trimmed)) ||
        p.category.toLowerCase().includes(trimmed) ||
        (p.subcategory ?? '').toLowerCase().includes(trimmed)
      )
    : products

  // ── Clear search ──────────────────────────────────────────────────────────
  function clearSearch() {
    setQuery('')
    inputRef.current?.focus()
  }

  return (
    <>
      {/* ── Search bar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-5">
        {/* Breadcrumb (left) */}
        <p className="text-xs text-ink-muted flex-1 min-w-0">
          {activeCategory !== 'all' && (
            <>
              <Link href="/products" className="hover:text-ink transition-colors">
                All Products
              </Link>
              {' / '}
              {activeSubcategory && activeCatLabel && (
                <>
                  <Link
                    href={`/products?category=${activeCategory}`}
                    className="hover:text-ink transition-colors"
                  >
                    {activeCatLabel}
                  </Link>
                  {' / '}
                </>
              )}
              <span className="text-ink font-medium">{activeLabel}</span>
              {' · '}
            </>
          )}
          {trimmed ? (
            <>
              <span className="font-medium text-ink">{displayed.length}</span>
              {' result'}
              {displayed.length !== 1 ? 's' : ''}
              {' for '}
              <span className="text-violet-600 font-semibold">&apos;{query.trim()}&apos;</span>
            </>
          ) : (
            <>
              <span className="font-medium text-ink">{products.length}</span>
              {' '}
              {products.length === 1 ? 'product' : 'products'}
            </>
          )}
        </p>

        {/* Search input (right) */}
        <div className="relative shrink-0">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted/50 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="pl-8 pr-7 py-1.5 text-[12px] bg-white border border-cream-200 rounded-lg text-ink placeholder-ink-muted/40 outline-none focus:border-violet-300 focus:ring-1 focus:ring-violet-100 transition-all w-48"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-muted/40 hover:text-ink-muted transition-colors"
              aria-label="Clear search"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* ── Product grid ─────────────────────────────────────────────────────── */}
      {displayed.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {displayed.map((product) => {
            // Extract clean price number for display (e.g. "From $11.99" → "$11.99")
            const priceDisplay = product.price
              ? product.price.replace(/^From\s*/i, '')
              : lt('priceOnRequest')

            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden hover:shadow-[0_6px_28px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-300"
                style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}
              >
                {/* Product image */}
                <div className="relative aspect-[4/5] overflow-hidden" style={{ background: '#f2f2ef' }}>
                  {product.mainImages[0] ? (
                    <Image
                      src={product.mainImages[0]}
                      alt={product.title_en}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[#ccc] text-xs">
                      No image
                    </div>
                  )}
                  {product.gsm && (
                    <span className="absolute top-2.5 left-2.5 bg-[#222] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider">
                      {product.gsm}
                    </span>
                  )}
                </div>

                {/* Card info */}
                <div className="px-3 pt-2.5 pb-3">
                  <p className="text-[11px] font-bold text-violet-600 mb-1">
                    #{trimmed ? highlight(product.sku, query.trim()) : product.sku}
                  </p>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[13px] font-bold text-gray-900 leading-snug line-clamp-2 flex-1">
                      {trimmed ? highlight(product.title_en, query.trim()) : product.title_en}
                    </p>
                    <p className="text-[14px] font-bold text-gray-900 whitespace-nowrap shrink-0 mt-0.5">
                      {priceDisplay}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        /* ── Empty search state ─────────────────────────────────────────────── */
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cream-100 mb-4">
            <Search size={22} className="text-ink-muted/40" />
          </div>
          <p className="text-base font-semibold text-ink mb-1">
            No products found for{' '}
            <span className="text-violet-600">&apos;{query.trim()}&apos;</span>
          </p>
          <p className="text-sm text-ink-muted mb-5">
            Try a different keyword, or browse all products below.
          </p>
          <button
            onClick={clearSearch}
            className="inline-flex items-center gap-2 bg-violet-600 text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-violet-700 transition-colors"
          >
            Browse All Products
          </button>
        </div>
      )}
    </>
  )
}
