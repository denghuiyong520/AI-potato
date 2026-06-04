#!/usr/bin/env tsx
/**
 * Import products from the supplier spreadsheet.
 *
 * Usage:
 *   npx tsx scripts/import-from-sheet.ts
 *
 * Outputs:
 *   src/data/products.json          — PUBLIC  (no internal fields, safe to commit)
 *   src/data/products-internal.json — INTERNAL (gitignored, never commit)
 *
 * ⚠  SECURITY: supplier, cost price, internal notes, price formula, and sample
 *    status are written ONLY to products-internal.json and never appear in
 *    products.json or anywhere in the public site bundle.
 */

import * as fs   from 'fs'
import * as path from 'path'
import * as XLSX from 'xlsx'

// ─── Paths ────────────────────────────────────────────────────────────────────

const WORKBOOK_PATH      = 'E:/空白产品/空白产品介绍.xlsx'
const PUBLIC_IMG_ROOT    = path.join(__dirname, '..', 'public', 'products')
const PUBLIC_JSON_OUT    = path.join(__dirname, '..', 'src', 'data', 'products.json')
const INTERNAL_JSON_OUT  = path.join(__dirname, '..', 'src', 'data', 'products-internal.json')

// ─── Public product type (safe to expose to the site) ────────────────────────

export interface PublicProduct {
  sku:          string
  slug:         string
  title_en:     string
  title_zh:     string
  category:     string
  subcategory:  string | null
  notes:        string           // product specs / description  (col C public notes)
  material:     string | null
  gsm:          string | null
  weight:       string | null
  price:        string | null    // formatted "From $X.XX" from 官网售价
  colorsInfo:   string | null
  sizesInfo:    string | null
  mainImages:   string[]
  detailImages: string[]
  referenceUrl: string           // our own site URL (hongyuapparel.com)
  sheetName:    string
  importedAt:   string
  needsReview:  string[]
}

// ─── Internal product type (NEVER put this in products.json) ─────────────────

interface InternalProduct extends PublicProduct {
  supplier:          string | null
  costPrice:         number | null   // 成本价 or 空白价格
  internalNotes:     string          // second 备注 col (operational notes, NOT public)
  priceFormula:      string | null
  hasPhysicalSample: string | null
}

// ─── Sheet configurations ─────────────────────────────────────────────────────

interface SheetConfig {
  name:            string
  idxSku:          number    // 款号 column
  idxNotes:        number    // public product notes (col C on most sheets)
  idxSupplier:     number    // INTERNAL – never in public JSON
  idxMaterial:     number    // 面料 / GSM field
  idxCost:         number    // INTERNAL – 成本价 or 空白价格
  idxPrice:        number    // 官网售价 (public)
  idxWeight:       number    // 重量
  idxUrl:          number    // 官网链接
  idxNotesInt:     number    // INTERNAL – second 备注 col
  idxPriceFormula: number    // INTERNAL – 价格公式
  idxHasSample:    number    // INTERNAL – 是否有实物样品
  idxStyle:        number    // 款式 (used for subcategory inference)
  idxSubStyle?:    number    // 底面 or second style col (optional)
  defaultCategory: string
  getSubcategory:  (row: string[]) => string | null
}

// Column layout reference (0-indexed):
//
//  Short Sleeve 短袖 / 背心 / 长袖 / 牛仔:
//    0=款式  1=工艺  2=备注(public)  3=供应商  4=面料  5=款号  6=图片
//    7=成本价  8=官网售价  9=重量  10=官网链接  11=备注(internal)  12=价格公式  13=是否有实物样
//
//  卫衣:
//    0=底面  1=款式  2=备注(public)  3=供应商  4=面料  5=款号  6=图片
//    7=空白价格  8=官网售价  9=计费重  10=官网链接  11=备注(internal)  12=价格公式  13=是否有实物样
//
//  Polo (missing 工艺 col → shifts left by 1):
//    0=款式  1=备注(public)  2=供应商  3=面料  4=款号  5=图片
//    6=成本价  7=官网售价  8=重量  9=官网链接  10=备注(internal)  11=价格公式  12=是否有实物样
//
//  裤子:
//    0=款式  1=款式  2=备注(public)  3=供应商  4=面料  5=款号  6=图片
//    7=空白价格  8=官网售价  9=重量  10=官网链接  11=备注(internal)
//
//  童装:
//    0=面料  1=款式  2=备注(public)  3=供应商  4=面料  5=款号  6=图片
//    7=空白价格  8=官网售价  9=重量  10=官网链接  11=价格试算(internal)  12=备注(internal)
//
//  户外:
//    0=款式  1=(empty)  2=备注(public)  3=供应商  4=面料  5=款号  6=图片
//    7=空白价格  8=官网售价  9=重量  10=官网链接  11=备注(internal)

const SHEET_CONFIGS: SheetConfig[] = [
  // ── Short Sleeve ──────────────────────────────────────────────────────────
  {
    name: '短袖',
    idxSku: 5, idxNotes: 2, idxSupplier: 3, idxMaterial: 4,
    idxCost: 7, idxPrice: 8, idxWeight: 9, idxUrl: 10,
    idxNotesInt: 11, idxPriceFormula: 12, idxHasSample: 13,
    idxStyle: 0,
    defaultCategory: 't-shirts',
    getSubcategory(row) {
      const style = str(row[0]).toLowerCase()
      const notes = str(row[2]).toLowerCase()
      if (notes.includes('vintage') || notes.includes('洗水') || notes.includes('水洗')) return 'vintage-t-shirt'
      if (style.includes('oversize') || notes.includes('oversize') || notes.includes('宽松')) return 'oversized-t-shirt'
      return 'basic-fit-t-shirt'
    },
  },

  // ── Vests ─────────────────────────────────────────────────────────────────
  {
    name: '背心',
    idxSku: 5, idxNotes: 2, idxSupplier: 3, idxMaterial: 4,
    idxCost: 7, idxPrice: 8, idxWeight: 9, idxUrl: 10,
    idxNotesInt: 11, idxPriceFormula: 12, idxHasSample: 13,
    idxStyle: 0,
    defaultCategory: 't-shirts',
    getSubcategory: () => 'vest',
  },

  // ── Polo (shifted columns – no 工艺 col) ──────────────────────────────────
  {
    name: 'Polo',
    idxSku: 4, idxNotes: 1, idxSupplier: 2, idxMaterial: 3,
    idxCost: 6, idxPrice: 7, idxWeight: 8, idxUrl: 9,
    idxNotesInt: 10, idxPriceFormula: 11, idxHasSample: 12,
    idxStyle: 0,
    defaultCategory: 't-shirts',
    getSubcategory: () => 'polo',
  },

  // ── Long Sleeve ───────────────────────────────────────────────────────────
  {
    name: '长袖',
    idxSku: 5, idxNotes: 2, idxSupplier: 3, idxMaterial: 4,
    idxCost: 7, idxPrice: 8, idxWeight: 9, idxUrl: 10,
    idxNotesInt: 11, idxPriceFormula: 12, idxHasSample: 14,
    idxStyle: 0,
    defaultCategory: 't-shirts',
    getSubcategory: () => 'long-sleeve',
  },

  // ── Hoodies / Sweatshirts ─────────────────────────────────────────────────
  {
    name: '卫衣',
    idxSku: 5, idxNotes: 2, idxSupplier: 3, idxMaterial: 4,
    idxCost: 7, idxPrice: 8, idxWeight: 9, idxUrl: 10,
    idxNotesInt: 11, idxPriceFormula: 12, idxHasSample: 13,
    idxStyle: 1, idxSubStyle: 0,
    defaultCategory: 'hoodies',
    getSubcategory(row) {
      const base  = str(row[0]).toLowerCase()   // 底面 (毛圈 / 绒面 …)
      const style = str(row[1]).toLowerCase()   // 款式
      if (style.includes('拉链') || style.includes('zip'))   return 'zip-up-hoodie'
      if (style.includes('圆领') && !style.includes('帽'))   return 'sweatshirt'
      if (base.includes('毛圈') || base.includes('terry'))   return 'terry-hoodie'
      return 'fleece-hoodie'
    },
  },

  // ── Pants / Shorts ────────────────────────────────────────────────────────
  {
    name: '裤子',
    idxSku: 5, idxNotes: 2, idxSupplier: 3, idxMaterial: 4,
    idxCost: 7, idxPrice: 8, idxWeight: 9, idxUrl: 10,
    idxNotesInt: 11, idxPriceFormula: -1, idxHasSample: -1,
    idxStyle: 1,
    defaultCategory: 'sweatpants',
    getSubcategory(row) {
      const s = str(row[1]).toLowerCase()
      return s.includes('短') ? 'shorts' : null
    },
  },

  // ── Denim ─────────────────────────────────────────────────────────────────
  {
    name: '牛仔',
    idxSku: 5, idxNotes: 2, idxSupplier: 3, idxMaterial: 4,
    idxCost: 7, idxPrice: 8, idxWeight: 9, idxUrl: 10,
    idxNotesInt: 11, idxPriceFormula: 12, idxHasSample: 14,
    idxStyle: 0,
    defaultCategory: 'denim',
    getSubcategory: () => null,
  },

  // ── Kids Wear ─────────────────────────────────────────────────────────────
  {
    name: '童装',
    idxSku: 5, idxNotes: 2, idxSupplier: 3, idxMaterial: 4,
    idxCost: 7, idxPrice: 8, idxWeight: 9, idxUrl: 10,
    idxNotesInt: 12, idxPriceFormula: 11, idxHasSample: -1,
    idxStyle: 1,
    defaultCategory: 'kids-wear',
    getSubcategory: () => null,
  },

  // ── Outdoor / Activewear ──────────────────────────────────────────────────
  {
    name: '户外',
    idxSku: 5, idxNotes: 2, idxSupplier: 3, idxMaterial: 4,
    idxCost: 7, idxPrice: 8, idxWeight: 9, idxUrl: 10,
    idxNotesInt: 11, idxPriceFormula: -1, idxHasSample: -1,
    idxStyle: 0,
    defaultCategory: 't-shirts',
    getSubcategory: () => null,
  },
]

// ─── Helper utilities ─────────────────────────────────────────────────────────

function str(v: unknown): string {
  return String(v ?? '').trim()
}

function cleanSku(raw: unknown): string {
  const s = str(raw)
  return s.startsWith('#') ? s.slice(1).trim() : s
}

function skuToSlug(sku: string): string {
  return sku.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

function extractGsm(text: string): string | null {
  const m = text.match(/(\d{2,4})\s*[gG][sS]?[mM]/) ?? text.match(/(\d{3,4})\s*[gG](?=[^a-zA-Z]|$)/)
  return m ? `${m[1]}GSM` : null
}

function extractMaterial(notes: string, materialField: string): string | null {
  const t = `${notes} ${materialField}`
  if (/100%棉|纯棉/.test(t))                   return '100% Cotton'
  if (/100%涤|100%聚酯/.test(t))               return '100% Polyester'
  if (/棉.*涤|涤.*棉/.test(t)) {
    const cM = t.match(/(\d+)[%％]棉/)
    const pM = t.match(/(\d+)[%％]涤/)
    if (cM && pM) return `${cM[1]}% Cotton / ${pM[1]}% Polyester`
    return 'Cotton / Polyester Blend'
  }
  if (/华夫格/.test(t))       return 'Waffle Knit'
  if (/毛圈/.test(t))         return 'Terry Cotton'
  if (/fleece/i.test(t))    return 'Fleece'
  return null
}

function parseColors(notes: string): string | null {
  const m = notes.match(/(\d+)\s*色/) ?? notes.match(/(\d+)\s*[Cc]olou?r/i)
  return m ? `${m[1]} Colors` : null
}

function parseSizes(notes: string): string | null {
  const m = notes.match(/([SMLX0-9]{1,4}[-~][SMLX0-9]{1,4})/i)
    ?? notes.match(/(XS[-~][0-9]+XL)/i)
    ?? notes.match(/([SM]-[0-9]{1,2}XL)/i)
  return m ? m[1].toUpperCase() : null
}

function formatPrice(raw: unknown): string | null {
  const n = parseFloat(str(raw))
  if (isNaN(n) || n <= 0) return null
  return `From $${n.toFixed(2)}`
}

function formatWeight(raw: unknown): string | null {
  if (raw === '' || raw == null) return null
  const s = str(raw)
  if (s.includes('kg') || s.includes('g')) return s
  const n = parseFloat(s)
  return isNaN(n) ? s : `${n} kg`
}

/** Derive a human-readable English title from our own product URL slug */
function titleFromUrl(url: string, sku: string): string {
  if (!url || !url.includes('hongyuapparel.com')) return ''
  try {
    const u = new URL(url)
    if (u.search.length > 1) return ''   // preview URLs have no usable slug
    const slug = u.pathname.replace(/^\/|\/$/g, '')
    if (!slug) return ''
    // strip SKU prefix (handle dashes/special chars)
    const skuPat = sku.toLowerCase().replace(/[^a-z0-9]/g, '[-_]?')
    const body = slug.replace(new RegExp(`^${skuPat}[-_]?`, 'i'), '')
    // title-case the slug words
    return body
      .split('-')
      .filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  } catch {
    return ''
  }
}

/** List images already imported to public/products/{sku}/ */
function getImages(sku: string): { main: string[]; detail: string[] } {
  function listDir(dir: string, urlPrefix: string): string[] {
    if (!fs.existsSync(dir)) return []
    return fs.readdirSync(dir)
      .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
      .sort((a, b) => {
        const na = parseInt(a.match(/(\d+)/)?.[1] ?? '0', 10)
        const nb = parseInt(b.match(/(\d+)/)?.[1] ?? '0', 10)
        return na - nb || a.localeCompare(b)
      })
      .map(f => `${urlPrefix}/${f}`)
  }
  const base = path.join(PUBLIC_IMG_ROOT, sku)
  return {
    main:   listDir(path.join(base, 'main'),   `/products/${sku}/main`),
    detail: listDir(path.join(base, 'detail'), `/products/${sku}/detail`),
  }
}

// ─── Process one spreadsheet row ──────────────────────────────────────────────

function processRow(
  row: unknown[],
  cfg: SheetConfig,
  seenSlugs: Set<string>,
): { pub: PublicProduct; int: InternalProduct } | null {

  const rawSku = row[cfg.idxSku]

  // Skip rows with no SKU or with embedded image formulas
  if (!rawSku || str(rawSku).startsWith('=DISP')) return null
  const sku = cleanSku(rawSku)
  if (!sku) return null

  // Deduplicate slugs
  let slug = skuToSlug(sku)
  const base = slug
  let n = 0
  while (seenSlugs.has(slug)) slug = `${base}-${++n}`
  seenSlugs.add(slug)

  const notes       = str(row[cfg.idxNotes])
  const materialStr = str(row[cfg.idxMaterial])
  const rawPrice    = row[cfg.idxPrice]
  const rawWeight   = row[cfg.idxWeight]
  const url         = str(row[cfg.idxUrl])

  const gsm      = extractGsm(materialStr) ?? extractGsm(notes)
  const material = extractMaterial(notes, materialStr)
  const colors   = parseColors(notes)
  const sizes    = parseSizes(notes)
  const price    = formatPrice(rawPrice)
  const weight   = formatWeight(rawWeight)
  const subcategory = cfg.getSubcategory(row as string[])

  // English title: prefer URL-derived, fall back to constructed string
  const fromUrl  = titleFromUrl(url, sku)
  const title_en = fromUrl || [sku, gsm, cfg.defaultCategory].filter(Boolean).join(' ')

  // Chinese title: first non-empty line of notes, or just the SKU
  const firstNoteLine = notes.split('\n')[0].trim()
  const title_zh = firstNoteLine || sku

  const imgs = getImages(sku)

  const needsReview: string[] = []
  if (!price)               needsReview.push('price')
  if (!material)            needsReview.push('material')
  if (!colors)              needsReview.push('colorsInfo')
  if (!sizes)               needsReview.push('sizesInfo')
  if (imgs.main.length === 0) needsReview.push('mainImages')

  const pub: PublicProduct = {
    sku, slug, title_en, title_zh,
    category:     cfg.defaultCategory,
    subcategory,
    notes,
    material, gsm, weight, price,
    colorsInfo:   colors,
    sizesInfo:    sizes,
    mainImages:   imgs.main,
    detailImages: imgs.detail,
    referenceUrl: url,
    sheetName:    cfg.name,
    importedAt:   new Date().toISOString(),
    needsReview,
  }

  // ── INTERNAL FIELDS – only written to products-internal.json ──────────────
  const supplier         = str(row[cfg.idxSupplier]) || null
  const rawCost          = row[cfg.idxCost]
  const costNum          = typeof rawCost === 'number' ? rawCost : parseFloat(str(rawCost))
  const costPrice        = isNaN(costNum) ? null : costNum
  const internalNotes    = str(row[cfg.idxNotesInt])
  const priceFormula     = cfg.idxPriceFormula >= 0 ? str(row[cfg.idxPriceFormula]) || null : null
  const hasPhysicalSample = cfg.idxHasSample >= 0   ? str(row[cfg.idxHasSample])    || null : null

  const int: InternalProduct = {
    ...pub,
    supplier,
    costPrice,
    internalNotes,
    priceFormula,
    hasPhysicalSample,
  }

  return { pub, int }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log(`📖  Reading ${WORKBOOK_PATH}\n`)
  const wb = XLSX.readFile(WORKBOOK_PATH)

  const pubList: PublicProduct[]  = []
  const intList: InternalProduct[] = []
  const seenSlugs = new Set<string>()

  let totalImported = 0
  let totalWithImages = 0

  for (const cfg of SHEET_CONFIGS) {
    const ws = wb.Sheets[cfg.name]
    if (!ws) {
      console.warn(`  ⚠  Sheet "${cfg.name}" not found – skipping`)
      continue
    }

    const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' }) as unknown[][]
    // Row 0 is the header – skip it; also skip fully-empty rows
    const dataRows = rows.slice(1).filter(r => (r as unknown[]).some(c => c !== ''))

    let sheetCount = 0
    let sheetImages = 0

    for (const row of dataRows) {
      const result = processRow(row as unknown[], cfg, seenSlugs)
      if (!result) continue
      pubList.push(result.pub)
      intList.push(result.int)
      sheetCount++
      if (result.pub.mainImages.length > 0) sheetImages++
    }

    console.log(
      `  ✓  ${cfg.name.padEnd(6)}  ${String(sheetCount).padStart(3)} products` +
      `  (${sheetImages} with images)`
    )
    totalImported   += sheetCount
    totalWithImages += sheetImages
  }

  // ── Write public JSON ──────────────────────────────────────────────────────
  fs.mkdirSync(path.dirname(PUBLIC_JSON_OUT), { recursive: true })
  fs.writeFileSync(PUBLIC_JSON_OUT, JSON.stringify(pubList, null, 2), 'utf8')

  // ── Write internal JSON ────────────────────────────────────────────────────
  fs.writeFileSync(INTERNAL_JSON_OUT, JSON.stringify(intList, null, 2), 'utf8')

  console.log(`
✅  PUBLIC   → ${PUBLIC_JSON_OUT}
🔒  INTERNAL → ${INTERNAL_JSON_OUT}  (gitignored – do not commit)

📊  Summary
    Imported:      ${totalImported}
    With images:   ${totalWithImages}
    Missing images:${totalImported - totalWithImages}

ℹ   Next steps:
    1. Update src/data/products.ts to import from products.json
    2. Verify products-internal.json is in .gitignore
`)
}

main()
