import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ChevronRight, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import BottomCTASection from '@/components/home/BottomCTASection'
import ImportedProductGallery from '@/components/products/ImportedProductGallery'
import AddToCartButton from '@/components/products/AddToCartButton'
import InquiryButton from '@/components/products/InquiryButton'
import type { ImportedProduct } from '@/types/product'
import {
  importedProducts,
  getImportedProductBySlug,
  getImportedRelated,
} from '@/data/products'

const BASE_URL = 'https://potatoapparel.com'
const LOCALES  = ['en', 'zh', 'fr', 'de', 'es']

// ─── SEO helpers ─────────────────────────────────────────────────────────────

function buildEnDescription(p: ImportedProduct): string {
  const parts: string[] = []
  if (p.gsm)        parts.push(p.gsm)
  if (p.material)   parts.push(p.material)
  parts.push(p.title_en)
  if (p.colorsInfo) parts.push(p.colorsInfo)
  if (p.sizesInfo)  parts.push(`Sizes ${p.sizesInfo}`)
  if (p.price)      parts.push(p.price)
  parts.push('MOQ 50 pcs')
  return parts.join(' · ') + '. Custom OEM/ODM wholesale apparel manufacturer.'
}

function buildProductJsonLd(p: ImportedProduct) {
  const priceMatch = p.price?.match(/\$(\d+\.?\d*)/)
  const price      = priceMatch?.[1] ?? null
  return {
    '@context':    'https://schema.org',
    '@type':       'Product',
    name:          p.title_en,
    sku:           p.sku,
    description:   buildEnDescription(p),
    image:         p.mainImages.map((img) => `${BASE_URL}${img}`),
    brand:         { '@type': 'Brand', name: 'Potato Apparel' },
    category:      p.category.replace(/-/g, ' '),
    offers: {
      '@type':       'Offer',
      priceCurrency: 'USD',
      ...(price ? { price, priceValidUntil: '2027-12-31' } : {}),
      availability:  'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller:        { '@type': 'Organization', name: 'Potato Apparel' },
    },
    additionalProperty: [
      p.gsm        && { '@type': 'PropertyValue', name: 'GSM',      value: p.gsm        },
      p.material   && { '@type': 'PropertyValue', name: 'Material', value: p.material   },
      p.sizesInfo  && { '@type': 'PropertyValue', name: 'Sizes',    value: p.sizesInfo  },
      p.colorsInfo && { '@type': 'PropertyValue', name: 'Colors',   value: p.colorsInfo },
      p.weight     && { '@type': 'PropertyValue', name: 'Weight',   value: p.weight     },
    ].filter(Boolean),
  }
}

// ─── generateStaticParams ─────────────────────────────────────────────────────

export async function generateStaticParams() {
  return importedProducts.map((p) => ({ slug: p.slug }))
}

// ─── generateMetadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const product = getImportedProductBySlug(slug)
  if (!product) return {}
  const description = buildEnDescription(product)
  const ogImage = product.mainImages[0]
    ? `${BASE_URL}${product.mainImages[0]}`
    : `${BASE_URL}/og-default.jpg`
  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, `${BASE_URL}/${l}/products/${slug}`])
  )
  return {
    title:       `${product.title_en} | Wholesale MOQ 50 pcs`,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/products/${slug}`,
      languages: { ...languages, 'x-default': `${BASE_URL}/en/products/${slug}` },
    },
    openGraph: {
      type:        'website',
      title:       `${product.title_en} | Potato Apparel`,
      description,
      url:         `${BASE_URL}/${locale}/products/${slug}`,
      images:      [{ url: ogImage, width: 800, height: 1000, alt: product.title_en }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${product.title_en} | Potato Apparel`,
      description,
      images:      [ogImage],
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ImportedProductDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  const product = getImportedProductBySlug(slug)
  if (!product) notFound()

  const t       = await getTranslations({ locale, namespace: 'products.detail' })
  const related = getImportedRelated(slug, product.category, 4)

  // ── Parse description lines ─────────────────────────────────────────────────
  // Spec lines: "Key: Value" where key is short (< 30 chars)
  const isSpecLine = (l: string) => /^[A-Za-z ]+:\s+\S/.test(l) && l.indexOf(':') < 30

  const rawLines = (product.notes ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 2)

  // Lines shown as inline spec rows (bold label + value)
  const specLines = rawLines.filter(isSpecLine)

  // Narrative paragraphs (shipping note, feature, customization callout)
  const descLines = rawLines.filter(
    (l) => !isSpecLine(l) && !l.match(/^#[A-Z0-9]+$/)
  )

  // Clean price — "From $11.99" → "$11.99"
  const priceClean = product.price?.replace(/^From\s*/i, '') ?? ''

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProductJsonLd(product)) }}
      />

      <div className="pt-20 lg:pt-28 pb-20" style={{ background: '#f7f7f5' }}>
        <div className="container-site max-w-5xl">

          {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5 flex-wrap">
            <Link href="/" className="hover:text-gray-600 transition-colors">{t('home')}</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="hover:text-gray-600 transition-colors">{t('breadcrumbProducts')}</Link>
            <ChevronRight size={12} />
            <span className="text-gray-700">{product.title_en}</span>
          </nav>

          {/* ── Full-width product title header (hongyuapparel style) ────────── */}
          <div
            className="mb-6 px-5 py-4 bg-white rounded-lg"
            style={{ border: '1.5px dashed #ccc' }}
          >
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-xl lg:text-2xl font-bold leading-snug text-gray-900">
                <span className="text-violet-600 mr-2">#{product.sku}</span>
                {product.title_en}
              </h1>
              {/* Scissors icon — decorative, like hongyuapparel */}
              <svg className="shrink-0 mt-1 opacity-30" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
                <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
                <line x1="8.12" y1="8.12" x2="12" y2="12"/>
              </svg>
            </div>
            {product.title_zh && (
              <p className="text-sm text-gray-400 mt-1 font-chinese">{product.title_zh}</p>
            )}
          </div>

          {/* ── Main two-column layout ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-8 items-start">

            {/* Left: Gallery */}
            <ImportedProductGallery
              mainImages={product.mainImages}
              name={product.title_en}
            />

            {/* Right: Product info — hongyuapparel Introduction style */}
            <div className="bg-white rounded-xl p-5 lg:p-6">

              {/* "Introduction" label */}
              <p className="text-[13px] font-semibold text-violet-600 mb-3 tracking-wide">
                Introduction
              </p>

              {/* Product name + price row */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <p className="text-[14px] text-gray-800 font-medium leading-snug">
                  #{product.sku} {product.title_en}
                </p>
                {priceClean && (
                  <span className="text-xl font-bold text-violet-600 whitespace-nowrap shrink-0">
                    {priceClean}
                  </span>
                )}
              </div>

              {/* Narrative description paragraphs */}
              {descLines.length > 0 && (
                <div className="mb-3 space-y-1.5">
                  {descLines.map((line, i) => (
                    <p key={i} className="text-[13px] text-gray-600 leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {/* Spec lines — hongyuapparel bold-label inline style */}
              {specLines.length > 0 && (
                <div className="mb-3 space-y-1.5 border-t border-gray-100 pt-3">
                  {specLines.map((line, i) => {
                    const ci = line.indexOf(':')
                    const label = line.substring(0, ci).trim()
                    const value = line.substring(ci + 1).trim()
                    return (
                      <p key={i} className="text-[13px] text-gray-700 leading-relaxed">
                        <strong className="font-semibold text-gray-900">{label}:</strong>{' '}
                        {value}
                      </p>
                    )
                  })}
                </div>
              )}

              {/* Weight / Dimensions footer */}
              {(product.weight || product.gsm) && (
                <p className="text-[12px] text-violet-500 mt-3 pt-3 border-t border-gray-100">
                  {product.weight && (
                    <><span className="font-semibold">Weight</span>&nbsp;&nbsp;{product.weight}&nbsp;&nbsp;&nbsp;</>
                  )}
                  {product.gsm && (
                    <><span className="font-semibold">GSM</span>&nbsp;&nbsp;{product.gsm}</>
                  )}
                </p>
              )}

              {/* ── CTAs — hongyuapparel style: quantity + buttons ───────── */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2.5">
                  <InquiryButton sku={product.sku} title={product.title_en} />
                  <AddToCartButton
                    slug={product.slug}
                    sku={product.sku}
                    title={product.title_en}
                    price={product.price}
                    image={product.mainImages[0] ?? ''}
                    category={product.category}
                  />
                  <a
                    href="https://wa.me/447907131539"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-sm px-4 py-3 rounded-full hover:bg-[#1ebe5d] transition-colors shadow-sm"
                  >
                    <MessageCircle size={15} />
                    {t('whatsapp')}
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* ── Detail images (size charts, colour selection, fabric closeups) ── */}
          {product.detailImages.length > 0 && (
            <div className="mt-10">
              <div className="max-w-2xl mx-auto space-y-2">
                {product.detailImages.map((src, i) => (
                  <div key={src} className="relative w-full overflow-hidden rounded-lg bg-white">
                    <Image
                      src={src}
                      alt={`${product.title_en} – detail ${i + 1}`}
                      width={900}
                      height={900}
                      className="w-full h-auto object-contain"
                      sizes="(max-width: 900px) 100vw, 800px"
                      loading={i < 3 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Related products ──────────────────────────────────────────── */}
          {related.length > 0 && (
            <div className="mt-14 border-t border-gray-200 pt-10">
              <h2 className="font-bold text-xl text-gray-900 mb-6">{t('related')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p) => {
                  const rPrice = p.price?.replace(/^From\s*/i, '') ?? 'Price on request'
                  return (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden hover:shadow-md transition-all"
                      style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}
                    >
                      <div className="relative aspect-[4/5]" style={{ background: '#f2f2ef' }}>
                        {p.mainImages[0] ? (
                          <Image
                            src={p.mainImages[0]}
                            alt={p.title_en}
                            fill
                            className="object-cover group-hover:scale-103 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gray-100" />
                        )}
                      </div>
                      <div className="px-3 pt-2.5 pb-3">
                        <p className="text-[11px] font-bold text-violet-600 mb-1">#{p.sku}</p>
                        <div className="flex items-start justify-between gap-1.5">
                          <p className="text-[12px] font-bold text-gray-900 leading-snug line-clamp-2 flex-1">{p.title_en}</p>
                          <p className="text-[13px] font-bold text-gray-900 whitespace-nowrap shrink-0">{rPrice}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

        </div>
      </div>

      <BottomCTASection />
    </>
  )
}
