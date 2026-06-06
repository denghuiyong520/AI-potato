import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRight, Send } from 'lucide-react'
import BottomCTASection from '@/components/home/BottomCTASection'
import {
  getCategoryCounts,
  getImportedProductsBySubcategory,
  importedProducts,
} from '@/data/products'
import { CATEGORY_TREE, SUB_TO_CATEGORY } from '@/data/categories'
import CategorySidebar from '@/components/products/CategorySidebar'
import MobileFilterPanel from '@/components/products/MobileFilterPanel'
import ProductGrid from '@/components/products/ProductGrid'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'products.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, '/products'),
  }
}

export default async function ProductsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string }
  searchParams: { category?: string; sub?: string; search?: string }
}) {
  const t  = await getTranslations({ locale, namespace: 'products' })
  const lt = await getTranslations({ locale, namespace: 'products.listing' })

  // ── Resolve active category/sub from URL ──────────────────────────────────
  let activeCategory      = searchParams.category || 'all'
  const activeSubcategory = searchParams.sub       || null
  const initialSearch     = searchParams.search    || ''

  // Guard: if `sub` belongs to a different parent category, correct it
  if (activeSubcategory) {
    const correctCat = SUB_TO_CATEGORY[activeSubcategory]
    if (correctCat && correctCat !== activeCategory) {
      activeCategory = correctCat
    }
  }

  // ── Server-side category filtering (search is done client-side) ───────────
  const categoryFiltered = getImportedProductsBySubcategory(
    activeCategory,
    activeSubcategory,
  )

  // ── Counts for sidebar ────────────────────────────────────────────────────
  const categoryCounts = getCategoryCounts()
  const subcategoryCounts: Record<string, number> = importedProducts.reduce<Record<string, number>>(
    (acc, p) => {
      if (p.subcategory) acc[p.subcategory] = (acc[p.subcategory] ?? 0) + 1
      return acc
    },
    {},
  )

  // ── Active labels for breadcrumb ──────────────────────────────────────────
  const activeCatDef  = CATEGORY_TREE.find((c) => c.value === activeCategory)
  const activeSubDef  = activeCatDef?.subcategories?.find((s) => s.value === activeSubcategory)
  const activeLabel   = activeSubDef?.label ?? activeCatDef?.label ?? 'All Products'
  const activeCatLabel = activeCatDef?.label

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[var(--bg-surface)]">
        <div className="container-site text-center max-w-3xl mx-auto">
          <h1
            className="font-display font-bold text-ink mb-4 whitespace-pre-line"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
          >
            {t('hero.title')}
          </h1>
          <p className="text-ink-muted text-lg leading-relaxed">{t('hero.subtitle')}</p>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-20 bg-[var(--bg-base)]">
        <div className="container-site">

          {/* Mobile filter panel */}
          <Suspense fallback={null}>
            <MobileFilterPanel
              activeCategory={activeCategory}
              activeSubcategory={activeSubcategory}
              categoryCounts={categoryCounts}
              subcategoryCounts={subcategoryCounts}
            />
          </Suspense>

          <div className="flex gap-10 items-start">

            {/* ── Desktop sidebar ─────────────────────────────────────────── */}
            <aside className="hidden lg:block w-48 shrink-0 sticky top-28">
              <p className="text-[10px] font-bold uppercase tracking-widest text-ink-muted/60 mb-3">
                {lt('filterTitle')}
              </p>
              <Suspense fallback={null}>
                <CategorySidebar
                  activeCategory={activeCategory}
                  activeSubcategory={activeSubcategory}
                  categoryCounts={categoryCounts}
                  subcategoryCounts={subcategoryCounts}
                />
              </Suspense>

              {/* Sidebar CTA */}
              <div className="mt-8 rounded-xl bg-violet-50 border border-violet-100 p-4">
                <p className="text-sm font-semibold text-ink mb-1">{t('cta.title')}</p>
                <p className="text-xs text-ink-muted mb-3">{t('cta.subtitle')}</p>
                <Link
                  href="/contact"
                  className="flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-800 transition-colors"
                >
                  {t('cta.button')} <ArrowRight size={12} />
                </Link>
              </div>
            </aside>

            {/* ── Right: search bar + product grid (client component) ───────── */}
            <div className="flex-1 min-w-0">
              <Suspense fallback={
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-xl bg-cream-100 animate-pulse aspect-[4/5]" />
                  ))}
                </div>
              }>
                <ProductGrid
                  products={categoryFiltered}
                  initialSearch={initialSearch}
                  activeLabel={activeLabel}
                  activeCategory={activeCategory}
                  activeSubcategory={activeSubcategory}
                  activeCatLabel={activeCatLabel}
                />
              </Suspense>

              {/* Bottom mobile CTA */}
              <div className="mt-12 rounded-2xl bg-[var(--bg-surface)] border border-cream-200 p-6 text-center lg:hidden">
                <p className="font-semibold text-ink mb-1">{t('cta.title')}</p>
                <p className="text-sm text-ink-muted mb-4">{t('cta.subtitle')}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-violet-600 text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-violet-700 transition-colors"
                >
                  <Send size={14} />
                  {t('cta.button')}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <BottomCTASection />
    </>
  )
}
