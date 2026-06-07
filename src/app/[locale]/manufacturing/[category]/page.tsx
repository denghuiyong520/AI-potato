import type { Metadata } from 'next'
import { notFound }        from 'next/navigation'
import Image               from 'next/image'
import { ChevronRight, ArrowRight, Package, Clock, MessageCircle } from 'lucide-react'
import { Link }            from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import BottomCTASection    from '@/components/home/BottomCTASection'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import SectionTitle        from '@/components/shared/SectionTitle'
import { buildAlternates, SITE_URL, LOCALES } from '@/lib/seo'
import {
  MANUFACTURING_SLUGS,
  getManufacturingCategory,
} from '@/data/manufacturing-categories'
import {
  getImportedProductsByCategory,
  getImportedProductsBySubcategory,
} from '@/data/products'
import type { ImportedProduct } from '@/types/product'

// ─── Static params ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    MANUFACTURING_SLUGS.map((category) => ({ locale, category }))
  )
}

// ─── Metadata ──────────────────────────────────────────────────────────────────
const TITLE_SUFFIX: Record<string, string> = {
  en: 'Wholesale MOQ 50 pcs',
  zh: '批发起订量 50 件',
  fr: 'Gros MOQ dès 50 pièces',
  de: 'Großhandel MOQ ab 50 Stück',
  es: 'Mayoreo MOQ desde 50 pzs',
}

const OG_LOCALE: Record<string, string> = {
  en: 'en_US', zh: 'zh_CN', fr: 'fr_FR', de: 'de_DE', es: 'es_ES',
}

export async function generateMetadata({
  params: { locale, category: slug },
}: {
  params: { locale: string; category: string }
}): Promise<Metadata> {
  const cat = getManufacturingCategory(slug)
  if (!cat) return {}

  const suffix = TITLE_SUFFIX[locale] ?? TITLE_SUFFIX.en
  const path   = `/manufacturing/${slug}`

  return {
    title: { absolute: `${cat.h1} | ${suffix} | Potato Apparel` },
    description: cat.description,
    alternates:  buildAlternates(locale, path),
    openGraph: {
      type:        'website',
      locale:      OG_LOCALE[locale] ?? 'en_US',
      url:         `${SITE_URL}/${locale}${path}`,
      title:       `${cat.h1} | Potato Apparel`,
      description: cat.description,
      siteName:    'Potato Apparel',
      images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: cat.h1 }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${cat.h1} | Potato Apparel`,
      description: cat.description,
      images:      [`${SITE_URL}/og-default.jpg`],
    },
  }
}

// ─── Schema builders ───────────────────────────────────────────────────────────
function buildJsonLd(
  cat: ReturnType<typeof getManufacturingCategory> & {},
  products: ImportedProduct[],
  locale: string,
  slug: string,
) {
  const pageUrl = `${SITE_URL}/${locale}/manufacturing/${slug}`

  const breadcrumb = {
    '@context':       'https://schema.org',
    '@type':          'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',          item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Manufacturing', item: `${SITE_URL}/${locale}/manufacturing/${slug}` },
      { '@type': 'ListItem', position: 3, name: cat.h1,          item: pageUrl },
    ],
  }

  const collection = {
    '@context':   'https://schema.org',
    '@type':      'CollectionPage',
    name:         cat.h1,
    description:  cat.description,
    url:          pageUrl,
    mainEntity: {
      '@type':          'ItemList',
      name:             `${cat.h1} Products`,
      numberOfItems:    products.length,
      itemListElement:  products.slice(0, 12).map((p, i) => ({
        '@type':    'ListItem',
        position:   i + 1,
        name:       p.title_en,
        url:        `${SITE_URL}/${locale}/products/${p.slug}`,
        ...(p.mainImages[0] ? { image: `${SITE_URL}${p.mainImages[0]}` } : {}),
      })),
    },
  }

  const faqPage = {
    '@context':   'https://schema.org',
    '@type':      'FAQPage',
    mainEntity:   cat.faqs.map((faq) => ({
      '@type':          'Question',
      name:             faq.q,
      acceptedAnswer:   { '@type': 'Answer', text: faq.a },
    })),
  }

  return [breadcrumb, collection, faqPage]
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function getProducts(cat: NonNullable<ReturnType<typeof getManufacturingCategory>>): ImportedProduct[] {
  if (Array.isArray(cat.productCategory)) {
    return cat.productCategory.flatMap((c) => getImportedProductsByCategory(c))
  }
  return getImportedProductsBySubcategory(cat.productCategory, cat.productSubcategory ?? null)
}

// ─── Product card (server) ─────────────────────────────────────────────────────
function ProductCard({ product }: { product: ImportedProduct }) {
  const img = product.mainImages[0] ?? null

  return (
    <Link
      href={`/products/${product.slug}`}
           className="group block rounded-xl overflow-hidden border border-cream-200 hover:border-violet-200 hover:shadow-card transition-all duration-300 bg-white"
    >
      <div className="relative aspect-square bg-cream-50 overflow-hidden">
        {img ? (
          <Image
            src={img}
            alt={product.title_en}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package size={32} className="text-cream-300" />
          </div>
        )}
      </div>
      <div className="p-3 lg:p-4">
        <p className="text-sm font-semibold text-ink leading-snug line-clamp-2 mb-1">
          {product.title_en}
        </p>
        <div className="flex items-center justify-between gap-2 mt-1">
          {product.gsm && (
            <span className="text-xs text-ink-muted">{product.gsm}</span>
          )}
          {product.price && (
            <span className="text-xs font-bold text-violet-600">{product.price}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

// ─── FAQ Accordion (server — uses <details>/<summary>) ─────────────────────────
function FaqAccordion({ faqs }: { faqs: NonNullable<ReturnType<typeof getManufacturingCategory>>['faqs'] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <details
          key={i}
          className="group rounded-xl border border-cream-200 bg-white overflow-hidden"
          {...(i === 0 ? { open: true } : {})}
        >
          <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none hover:bg-cream-50 transition-colors select-none">
            <span className="font-semibold text-ink text-sm leading-snug">{faq.q}</span>
            <span className="shrink-0 w-5 h-5 rounded-full border border-cream-300 group-open:border-violet-400 group-open:bg-violet-50 flex items-center justify-center transition-colors">
              <svg
                viewBox="0 0 10 10"
                className="w-2.5 h-2.5 text-ink-muted group-open:text-violet-600 group-open:rotate-180 transition-all"
                fill="none" stroke="currentColor" strokeWidth="1.5"
              >
                <path d="M2 3.5L5 6.5L8 3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </summary>
          <div className="px-6 pb-5 pt-0">
            <p className="text-sm text-ink-muted leading-relaxed">{faq.a}</p>
          </div>
        </details>
      ))}
    </div>
  )
}

// ─── Related category card ─────────────────────────────────────────────────────
function RelatedCategoryCard({ slug }: { slug: string }) {
  const cat = getManufacturingCategory(slug)
  if (!cat) return null

  return (
    <Link
      href={`/manufacturing/${slug}`}
           className="group flex items-center gap-4 rounded-xl border border-cream-200 bg-white p-4 hover:border-violet-200 hover:shadow-card transition-all duration-300"
    >
      <div className="w-9 h-9 rounded-full bg-violet-50 group-hover:bg-violet-100 flex items-center justify-center shrink-0 transition-colors">
        <ArrowRight size={15} className="text-violet-500 group-hover:translate-x-0.5 transition-transform" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink truncate">{cat.h1}</p>
        <p className="text-xs text-ink-muted truncate">MOQ 50 pcs · OEM/ODM</p>
      </div>
    </Link>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ManufacturingCategoryPage({
  params: { locale, category: slug },
}: {
  params: { locale: string; category: string }
}) {
  const cat = getManufacturingCategory(slug)
  if (!cat) notFound()

  const allProducts = getProducts(cat)
  const featured    = allProducts.slice(0, 12)
  const totalCount  = allProducts.length

  const schemas = buildJsonLd(cat, allProducts, locale, slug)

  const t = await getTranslations({ locale, namespace: 'manufacturing' })

  return (
    <>
      {/* JSON-LD */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-14 lg:pt-40 lg:pb-20 bg-[var(--bg-surface)]">
        <div className="container-site max-w-4xl">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
            <Link href="/" locale={locale} className="hover:text-ink transition-colors">
              {t('breadcrumbHome')}
            </Link>
            <ChevronRight size={12} className="shrink-0" />
            <span className="text-ink-muted">{t('breadcrumbManufacturing')}</span>
            <ChevronRight size={12} className="shrink-0" />
            <span className="text-ink font-medium">{cat.h1}</span>
          </nav>

          <AnimatedSection>
            <h1
              className="font-display font-bold text-ink mb-5"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.08 }}
            >
              {cat.h1}
            </h1>
          </AnimatedSection>

          {/* Highlights strip */}
          <AnimatedSection delay={0.08}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {cat.highlights.map(({ label, value }) => (
                <div key={label} className="rounded-xl bg-white border border-cream-200 px-4 py-3 text-center shadow-sm">
                  <p className="text-xs text-ink-muted mb-0.5">{label}</p>
                  <p className="text-sm font-bold text-ink">{value}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Intro copy */}
          <AnimatedSection delay={0.12}>
            <div className="prose prose-sm lg:prose-base max-w-none text-ink-muted leading-relaxed space-y-4">
              {cat.intro.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA row */}
          <AnimatedSection delay={0.18}>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/request-samples"
                               className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 shadow hover:shadow-md hover:-translate-y-0.5"
              >
                <Clock size={14} />
                {t('requestSample')}
              </Link>
              <Link
                href="/contact"
                               className="inline-flex items-center gap-2 bg-white border border-cream-300 hover:border-violet-300 text-ink font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 hover:shadow hover:-translate-y-0.5"
              >
                <MessageCircle size={14} />
                {t('getQuote')}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="section-padding bg-[var(--bg-base)]">
          <div className="container-site">
            <SectionTitle
              title={t('productsSection')}
              subtitle={`${totalCount} ${t('productsSubtitle')}`}
              align="left"
            />

            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
              {featured.map((product) => (
                <StaggerItem key={product.slug}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </StaggerContainer>

            {totalCount > 12 && (
              <div className="mt-10 text-center">
                <Link
                  href={`/products?category=${Array.isArray(cat.productCategory) ? cat.productCategory[0] : cat.productCategory}`}
                                   className="inline-flex items-center gap-2 border border-violet-300 text-violet-600 hover:bg-violet-50 font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200"
                >
                  {t('viewAll')} ({totalCount}) <ArrowRight size={15} />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Why Potato Apparel ────────────────────────────────────────────────── */}
      <section className="section-padding bg-[var(--bg-surface)]">
        <div className="container-site">
          <SectionTitle
            title={t('whyTitle')}
            subtitle={t('whySubtitle')}
          />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              {
                num: '01',
                title: t('why1Title'),
                desc:  t('why1Desc'),
              },
              {
                num: '02',
                title: t('why2Title'),
                desc:  t('why2Desc'),
              },
              {
                num: '03',
                title: t('why3Title'),
                desc:  t('why3Desc'),
              },
            ].map(({ num, title, desc }) => (
              <StaggerItem key={num}>
                <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-card h-full">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                    <span className="text-xs font-bold text-violet-600">{num}</span>
                  </div>
                  <h3 className="font-semibold text-ink mb-2">{title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-[var(--bg-base)]">
        <div className="container-site max-w-3xl">
          <SectionTitle title={t('faqSection')} align="left" />
          <AnimatedSection>
            <FaqAccordion faqs={cat.faqs} />
          </AnimatedSection>
        </div>
      </section>

      {/* ── Related Categories ────────────────────────────────────────────────── */}
      {cat.related.length > 0 && (
        <section className="pb-16 bg-[var(--bg-base)]">
          <div className="container-site max-w-3xl">
            <h2 className="font-display font-bold text-ink text-xl mb-6">{t('relatedSection')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cat.related.map((relSlug) => (
                <RelatedCategoryCard key={relSlug} slug={relSlug} />
              ))}
            </div>
          </div>
        </section>
      )}

      <BottomCTASection />
    </>
  )
}
