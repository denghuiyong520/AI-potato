export interface Product {
  slug: string
  sku: string
  name: string
  category: string
  categoryLabel: string
  material: string
  weight: string
  gsm: string
  sizes: string[]
  colors: string
  blankMOQ: string
  logoMOQ: string
  customMOQ: string
  price: string
  mainSeed: string
  thumbSeeds: string[]
  features: string[]
  description: string
}

/** Construct a sized Unsplash image URL from a photo ID */
export function unsplashUrl(id: string, w: number, h: number = w): string {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`
}

export const CATEGORIES: { value: string; label: string }[] = [
  { value: 'all',         label: 'All Products'  },
  { value: 't-shirts',    label: 'T-Shirts'      },
  { value: 'hoodies',     label: 'Hoodies'       },
  { value: 'sweatpants',  label: 'Sweatpants'    },
  { value: 'activewear',  label: 'Activewear'    },
  { value: 'outerwear',   label: 'Outerwear'     },
  { value: 'dresses',     label: 'Dresses'       },
  { value: 'accessories', label: 'Accessories'   },
]

export const products: Product[] = [
  {
    slug: 'oversized-boxy-tshirt-280gsm',
    sku: '#PA-T001',
    name: 'Oversized Boxy T-Shirt 280GSM',
    category: 't-shirts',
    categoryLabel: 'T-Shirts',
    material: '100% Cotton',
    weight: '0.28 kg',
    gsm: '280GSM',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: '20+ colors available',
    blankMOQ: '50 pcs (mix colors & sizes)',
    logoMOQ: '50 pcs (mix colors & sizes)',
    customMOQ: '100 pcs per color per style',
    price: 'From $7.50',
    mainSeed:   '1521572163474-6864f9cf17ab',
    thumbSeeds: ['1503341504253-dff4815485f1', '1529374255404-311a2a4f1fd9', '1554568218-0f1715e72254', '1516762893225-a31fc82e7a92'],
    features: ['Heavyweight 280GSM fabric', 'Boxy oversized silhouette', 'Ribbed crew neck & cuffs', '20+ colorways available'],
    description: 'Our signature boxy fit tee is cut from 100% cotton 280GSM fabric for a premium heavyweight feel. The relaxed, oversized silhouette suits both men and women. Ideal for screen printing, embroidery, puff print and every customisation technique.',
  },
  {
    slug: 'vintage-wash-heavyweight-tee-320gsm',
    sku: '#PA-T002',
    name: 'Vintage Wash Heavyweight Tee 320GSM',
    category: 't-shirts',
    categoryLabel: 'T-Shirts',
    material: '100% Cotton (Enzyme Washed)',
    weight: '0.32 kg',
    gsm: '320GSM',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: '15+ washed colorways',
    blankMOQ: '50 pcs (mix colors & sizes)',
    logoMOQ: '50 pcs (mix colors & sizes)',
    customMOQ: '100 pcs per color per style',
    price: 'From $9.50',
    mainSeed:   '1503341504253-dff4815485f1',
    thumbSeeds: ['1521572163474-6864f9cf17ab', '1529374255404-311a2a4f1fd9', '1554568218-0f1715e72254', '1516762893225-a31fc82e7a92'],
    features: ['Premium 320GSM weight', 'Enzyme washed vintage look', 'Pre-shrunk fabric', 'Distressed texture available'],
    description: 'Enzyme washed for an authentic vintage look from day one. This 320GSM heavyweight tee has a soft, broken-in texture. Available in 15+ washed colorways including acid wash, mineral wash and garment dye finishes.',
  },
  {
    slug: 'cropped-cuffed-hoodie-400gsm',
    sku: '#PA-H001',
    name: 'Cropped Cuffed Hoodie 400GSM',
    category: 'hoodies',
    categoryLabel: 'Hoodies',
    material: '80% Cotton / 20% Polyester Fleece',
    weight: '0.55 kg',
    gsm: '400GSM',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: '25+ colors available',
    blankMOQ: '50 pcs (mix colors & sizes)',
    logoMOQ: '50 pcs (mix colors & sizes)',
    customMOQ: '100 pcs per color per style',
    price: 'From $16.00',
    mainSeed:   '1620799140408-edc6dcb6d633',
    thumbSeeds: ['1556821840-3a63f15732ce', '1565084888279-afa4b9c1aaaa', '1582588678369-02440e6d6b17', '1604176424672-3c6bde0a9bdb'],
    features: ['Premium 400GSM brushed fleece', 'Cropped boxy fit', 'Kangaroo front pocket', 'Double-lined hood'],
    description: 'A premium 400GSM hoodie built for streetwear brands. The cropped boxy silhouette hits at the waist for a modern look. Features a double-lined hood, ribbed cuffs and hem, and spacious kangaroo pocket. Perfect for embroidery and screen printing.',
  },
  {
    slug: 'pullover-oversized-hoodie-380gsm',
    sku: '#PA-H002',
    name: 'Pullover Oversized Hoodie 380GSM',
    category: 'hoodies',
    categoryLabel: 'Hoodies',
    material: '80% Cotton / 20% Polyester Fleece',
    weight: '0.60 kg',
    gsm: '380GSM',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: '30+ colors available',
    blankMOQ: '50 pcs (mix colors & sizes)',
    logoMOQ: '50 pcs (mix colors & sizes)',
    customMOQ: '100 pcs per color per style',
    price: 'From $14.00',
    mainSeed:   '1620799140408-edc6dcb6d633',
    thumbSeeds: ['1521572163474-6864f9cf17ab', '1529374255404-311a2a4f1fd9', '1503341504253-dff4815485f1', '1552902865-b72c031ac5ea'],
    features: ['380GSM mid-weight fleece', 'Oversized relaxed fit', 'Double-layered hood', 'Extended sizes up to 3XL'],
    description: 'Our bestselling pullover hoodie in 380GSM mid-weight fleece. Available in an extended size run up to 3XL, in over 30 colorways. Suitable for DTF, screen print, embroidery and puff print decoration.',
  },
  {
    slug: 'tapered-cargo-sweatpants-350gsm',
    sku: '#PA-P001',
    name: 'Tapered Cargo Sweatpants 350GSM',
    category: 'sweatpants',
    categoryLabel: 'Sweatpants',
    material: '80% Cotton / 20% Polyester Fleece',
    weight: '0.48 kg',
    gsm: '350GSM',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: '20+ colors available',
    blankMOQ: '50 pcs (mix colors & sizes)',
    logoMOQ: '50 pcs (mix colors & sizes)',
    customMOQ: '100 pcs per color per style',
    price: 'From $13.00',
    mainSeed:   '1552902865-b72c031ac5ea',
    thumbSeeds: ['1571171637578-41bc2dd41cd2', '1611911813383-4d64c43b06c6', '1552902865-b72c031ac5ea', '1548690312-1abf8c3a5c60'],
    features: ['350GSM heavyweight fleece', 'Tapered leg + cuffed hem', 'Side cargo pockets', 'Elasticated drawstring waist'],
    description: 'Tapered cargo sweatpants in 350GSM fleece with functional cargo pockets. Features elasticated drawstring waist, tapered leg and cuffed hem. A versatile staple for loungewear and streetwear collections.',
  },
  {
    slug: 'seamless-ribbed-yoga-set',
    sku: '#PA-A001',
    name: 'Seamless Ribbed Yoga Set',
    category: 'activewear',
    categoryLabel: 'Activewear',
    material: '73% Nylon / 27% Spandex',
    weight: '0.30 kg (set)',
    gsm: '230GSM',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: '15+ colors available',
    blankMOQ: '50 sets (mix colors & sizes)',
    logoMOQ: '50 sets (mix colors & sizes)',
    customMOQ: '100 sets per color',
    price: 'From $19.00 / set',
    mainSeed:   '1506629082955-511b1aa562c8',
    thumbSeeds: ['1518310383802-640c2de311b2', '1538805060514-97d9cc172aa5', '1576633587382-13ddf37b1fc1', '1548690312-1abf8c3a5c60'],
    features: ['Seamless 4-way stretch knit', 'Moisture-wicking Nylon/Spandex', 'Ribbed texture finish', 'High-waist legging + crop top set'],
    description: 'Seamless ribbed yoga set in buttery-soft Nylon/Spandex blend. The 4-way stretch and moisture-wicking properties make it ideal for yoga, pilates and studio workouts. Available as full set or separates.',
  },
  {
    slug: 'high-waist-seamless-leggings',
    sku: '#PA-A002',
    name: 'High-Waist Seamless Leggings',
    category: 'activewear',
    categoryLabel: 'Activewear',
    material: '73% Nylon / 27% Spandex',
    weight: '0.20 kg',
    gsm: '220GSM',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: '20+ colors available',
    blankMOQ: '50 pcs (mix colors & sizes)',
    logoMOQ: '50 pcs (mix colors & sizes)',
    customMOQ: '100 pcs per color per style',
    price: 'From $11.00',
    mainSeed:   '1518310383802-640c2de311b2',
    thumbSeeds: ['1506629082955-511b1aa562c8', '1538805060514-97d9cc172aa5', '1576633587382-13ddf37b1fc1', '1548690312-1abf8c3a5c60'],
    features: ['Squat-proof double-layer waistband', 'Seamless knit construction', 'Moisture-wicking fabric', 'Naked-feel comfort'],
    description: 'Premium seamless high-waist leggings with squat-proof double-layer waistband. The seamless construction eliminates friction seams for smooth, comfortable wear. Perfect for yoga, gym, running and everyday athleisure.',
  },
  {
    slug: 'woven-coach-jacket',
    sku: '#PA-J001',
    name: 'Woven Coach Jacket',
    category: 'outerwear',
    categoryLabel: 'Outerwear',
    material: '100% Polyester Woven',
    weight: '0.45 kg',
    gsm: '150GSM shell',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: '15+ colors available',
    blankMOQ: '50 pcs (mix colors & sizes)',
    logoMOQ: '50 pcs (mix colors & sizes)',
    customMOQ: '100 pcs per color per style',
    price: 'From $18.00',
    mainSeed:   '1551028719-00167b16eac5',
    thumbSeeds: ['1591047139829-d91aecb6caea', '1582552938357-32b906df40cb', '1548036328-c9fa89d128fa', '1563178406-4cdc2923acbc'],
    features: ['100% woven polyester shell', 'Full zip with snap buttons', 'Chest welt pocket', 'Ribbed collar, cuffs & hem'],
    description: 'Classic coach jacket silhouette in lightweight woven polyester. Features full-zip closure with snap buttons, chest welt pocket, and ribbed collar, cuffs and hem. Excellent for embroidery on chest and sleeve.',
  },
  {
    slug: 'satin-varsity-bomber-jacket',
    sku: '#PA-J002',
    name: 'Satin Varsity Bomber Jacket',
    category: 'outerwear',
    categoryLabel: 'Outerwear',
    material: 'Satin Shell / Rib Knit Trim',
    weight: '0.55 kg',
    gsm: '160GSM shell',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: '12+ color combinations',
    blankMOQ: '50 pcs (mix colors & sizes)',
    logoMOQ: '50 pcs (mix colors & sizes)',
    customMOQ: '100 pcs per color combination',
    price: 'From $24.00',
    mainSeed:   '1591047139829-d91aecb6caea',
    thumbSeeds: ['1551028719-00167b16eac5', '1582552938357-32b906df40cb', '1548036328-c9fa89d128fa', '1563178406-4cdc2923acbc'],
    features: ['Satin shell + contrasting rib knit', 'Full-zip front', 'Two side welt pockets', 'Custom color combination options'],
    description: 'Varsity-inspired satin bomber with contrasting rib knit collar, cuffs and hem. A perennial streetwear staple that works beautifully with chest and sleeve embroidery. Available in 12+ color body/rib combinations.',
  },
  {
    slug: 'oversized-denim-jacket',
    sku: '#PA-J003',
    name: 'Oversized Denim Jacket',
    category: 'outerwear',
    categoryLabel: 'Outerwear',
    material: '100% Cotton Denim',
    weight: '0.70 kg',
    gsm: '400GSM denim',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: '5 denim washes',
    blankMOQ: '50 pcs (mix washes & sizes)',
    logoMOQ: '50 pcs (mix washes & sizes)',
    customMOQ: '100 pcs per wash per style',
    price: 'From $22.00',
    mainSeed:   '1543076447-215ad9ba6923',
    thumbSeeds: ['1582552938357-32b906df40cb', '1548036328-c9fa89d128fa', '1591047139829-d91aecb6caea', '1551028719-00167b16eac5'],
    features: ['400GSM raw cotton denim', 'Oversized boxy fit', '5 wash options (raw to black)', 'Laser distressing available'],
    description: 'Structured 400GSM denim jacket in an oversized boxy cut. Available in 5 wash options from raw indigo to black. Laser distressing, hand sanding and cat-whisker effects available. Ideal for embroidery, patches and pin decoration.',
  },
  {
    slug: 'ribbed-bodycon-mini-dress',
    sku: '#PA-D001',
    name: 'Ribbed Bodycon Mini Dress',
    category: 'dresses',
    categoryLabel: 'Dresses',
    material: '95% Cotton / 5% Spandex Rib',
    weight: '0.22 kg',
    gsm: '200GSM',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: '20+ colors available',
    blankMOQ: '50 pcs (mix colors & sizes)',
    logoMOQ: '50 pcs (mix colors & sizes)',
    customMOQ: '100 pcs per color per style',
    price: 'From $12.00',
    mainSeed:   '1566174053879-31528523f8ae',
    thumbSeeds: ['1525507119428-b927d6f25d9c', '1496747611176-887788671212', '1591369822096-ffd140ec948f', '1515886097794-b4f3a8b517e0'],
    features: ['Ribbed stretch rib fabric', 'Bodycon silhouette', 'Mini & midi lengths available', 'Spaghetti strap option'],
    description: 'Sleek ribbed bodycon mini dress in stretchy cotton/spandex blend. Hugs the body without being restrictive. Available in both mini and midi length versions, with or without spaghetti straps. Ideal for loungewear and going-out collections.',
  },
  {
    slug: 'structured-baseball-cap',
    sku: '#PA-C001',
    name: 'Structured 6-Panel Baseball Cap',
    category: 'accessories',
    categoryLabel: 'Accessories',
    material: '100% Cotton Twill',
    weight: '0.10 kg',
    gsm: '280GSM',
    sizes: ['One Size (adjustable strap)'],
    colors: '25+ colors available',
    blankMOQ: '50 pcs (mix colors)',
    logoMOQ: '50 pcs (mix colors)',
    customMOQ: '100 pcs per color',
    price: 'From $5.50',
    mainSeed:   '1588850561407-ed78c282e89b',
    thumbSeeds: ['1521673461573-ccac7c6fa485', '1534215754734-18e55168b93c', '1553062407-98eeb64c6a62', '1588850561407-ed78c282e89b'],
    features: ['Structured 6-panel crown', 'Pre-curved brim', 'Adjustable strap back', 'Custom woven label inside'],
    description: 'Classic structured 6-panel baseball cap in 100% cotton twill. Features a pre-curved brim, high structured crown, and adjustable strap back. Ideal for embroidery on the front panel. Custom woven label, taping and brim stitch color available.',
  },
]

export function getProductBySlug(slug: string): Product | null {
  return products.find((p) => p.slug === slug) ?? null
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products
  return products.filter((p) => p.category === category)
}

export function getRelatedProducts(currentSlug: string, category: string, limit = 4): Product[] {
  const same = products.filter((p) => p.slug !== currentSlug && p.category === category)
  return same.length >= limit ? same.slice(0, limit) : [
    ...same,
    ...products.filter((p) => p.slug !== currentSlug && p.category !== category),
  ].slice(0, limit)
}

// ─── Imported products (Phase 1: backed by Postgres via Prisma) ─────────────
// Was: a static array read from products.json at module load. Now: every
// function queries the DB and is async — every call site needs `await`
// added, but the returned ImportedProduct shape is byte-for-byte identical
// to before, so ProductGrid/ImportedProductGallery/buildEnDescription/
// buildProductJsonLd/sitemap.ts need no changes beyond that `await`.
// See prisma/backfill.ts for the one-time migration of products.json's 238
// rows into the `products` table.

import type { ImportedProduct } from '@/types/product'
import { prisma } from '@/lib/prisma'

// Public-safe select — deliberately excludes `supplier`/`sourceFolder`
// (internal-only columns, see prisma/schema.prisma) so they can never leak
// into the storefront's public bundle, matching the pre-migration behavior
// where those fields only ever lived in the gitignored products-internal.json.
const PUBLIC_PRODUCT_SELECT = {
  sku: true, slug: true, titleZh: true, titleEn: true,
  categorySlug: true, subcategorySlug: true,
  notes: true, sellingPoints: true,
  colorsInfo: true, sizesInfo: true, price: true, material: true, gsm: true, weight: true,
  mainImages: true, detailImages: true, detailDims: true,
  referenceUrl: true, sheetName: true,
  needsReview: true, importedAt: true,
} as const

type ProductRow = {
  sku: string; slug: string; titleZh: string | null; titleEn: string
  categorySlug: string; subcategorySlug: string | null
  notes: string | null; sellingPoints: string[]
  colorsInfo: string | null; sizesInfo: string | null; price: string | null
  material: string | null; gsm: string | null; weight: string | null
  mainImages: string[]; detailImages: string[]; detailDims: unknown
  referenceUrl: string | null; sheetName: string | null
  needsReview: boolean; importedAt: Date
}

function toImportedProduct(row: ProductRow): ImportedProduct {
  return {
    sku: row.sku,
    slug: row.slug,
    title_zh: row.titleZh,
    title_en: row.titleEn,
    category: row.categorySlug,
    subcategory: row.subcategorySlug,
    notes: row.notes ?? undefined,
    sellingPoints: row.sellingPoints,
    colorsInfo: row.colorsInfo,
    sizesInfo: row.sizesInfo,
    price: row.price,
    material: row.material,
    gsm: row.gsm,
    weight: row.weight,
    mainImages: row.mainImages,
    detailImages: row.detailImages,
    detailDims: row.detailDims as ImportedProduct['detailDims'],
    referenceUrl: row.referenceUrl ?? undefined,
    sheetName: row.sheetName ?? undefined,
    importedAt: row.importedAt.toISOString(),
    needsReview: row.needsReview,
  }
}

export async function getImportedProducts(): Promise<ImportedProduct[]> {
  const rows = await prisma.product.findMany({ select: PUBLIC_PRODUCT_SELECT })
  return rows.map(toImportedProduct)
}

export async function getImportedProductBySlug(slug: string): Promise<ImportedProduct | null> {
  const row = await prisma.product.findUnique({ where: { slug }, select: PUBLIC_PRODUCT_SELECT })
  return row ? toImportedProduct(row) : null
}

export async function getImportedProductsByCategory(category: string): Promise<ImportedProduct[]> {
  if (category === 'all') return getImportedProducts()
  const rows = await prisma.product.findMany({ where: { categorySlug: category }, select: PUBLIC_PRODUCT_SELECT })
  return rows.map(toImportedProduct)
}

export async function getImportedProductsBySubcategory(
  category: string,
  subcategory: string | null,
): Promise<ImportedProduct[]> {
  if (category === 'all') return getImportedProducts()
  const rows = await prisma.product.findMany({
    where: { categorySlug: category, ...(subcategory ? { subcategorySlug: subcategory } : {}) },
    select: PUBLIC_PRODUCT_SELECT,
  })
  return rows.map(toImportedProduct)
}

/** Count products per subcategory within a parent category */
export async function getSubcategoryCounts(category: string): Promise<Record<string, number>> {
  const rows = await prisma.product.findMany({
    where: category === 'all' ? {} : { categorySlug: category },
    select: { subcategorySlug: true },
  })
  return rows.reduce<Record<string, number>>((acc, p) => {
    if (p.subcategorySlug) acc[p.subcategorySlug] = (acc[p.subcategorySlug] ?? 0) + 1
    return acc
  }, {})
}

/** Count products per top-level category */
export async function getCategoryCounts(): Promise<Record<string, number>> {
  const rows = await prisma.product.findMany({ select: { categorySlug: true } })
  return rows.reduce<Record<string, number>>((acc, p) => {
    acc[p.categorySlug] = (acc[p.categorySlug] ?? 0) + 1
    return acc
  }, {})
}

export async function getImportedRelated(currentSlug: string, category: string, limit = 4): Promise<ImportedProduct[]> {
  const sameRows = await prisma.product.findMany({
    where: { categorySlug: category, slug: { not: currentSlug } },
    select: PUBLIC_PRODUCT_SELECT,
    take: limit,
  })
  if (sameRows.length >= limit) return sameRows.map(toImportedProduct)

  const fillerRows = await prisma.product.findMany({
    where: { categorySlug: { not: category }, slug: { not: currentSlug } },
    select: PUBLIC_PRODUCT_SELECT,
    take: limit - sameRows.length,
  })
  return [...sameRows, ...fillerRows].map(toImportedProduct)
}
