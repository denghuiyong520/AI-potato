#!/usr/bin/env tsx
/**
 * Product Auto-Import Script
 * Usage:
 *   npx tsx scripts/import-products.ts                      # import all suppliers
 *   npx tsx scripts/import-products.ts --supplier "中山帝琦"  # import one supplier
 *   npx tsx scripts/import-products.ts --dry-run            # preview without copying
 *   npx tsx scripts/import-products.ts --max 20             # limit to first N products
 *
 * What it does:
 *  1. Scans E:\2.轻定制Streetwear recursively for product folders
 *     (a product folder = has both 主图/新主图 AND 详情页 subfolders)
 *  2. Reads 卖点.txt for selling points
 *  3. Copies & compresses images → public/products/{sku}/main/ and /detail/
 *  4. Appends new entries to src/data/products-imported.json
 */

import * as fs from 'fs'
import * as path from 'path'
import sharp from 'sharp'
import type { ImportedProduct } from '../src/types/product'

// ─── Config ─────────────────────────────────────────────────────────────────

const SOURCE_ROOT = 'E:\\2.轻定制Streetwear'
const PUBLIC_OUTPUT = path.join(__dirname, '..', 'public', 'products')
const JSON_OUTPUT = path.join(__dirname, '..', 'src', 'data', 'products-imported.json')

/** Max width for main images (height auto) */
const MAIN_IMAGE_MAX_W = 1200
/** Max width for detail images */
const DETAIL_IMAGE_MAX_W = 1200
/** JPEG quality */
const QUALITY = 82
/** Only import images with these extensions */
const IMG_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp'])
/** Skip Thumbs.db and hidden files */
const SKIP_FILES = new Set(['thumbs.db', 'desktop.ini'])

// ─── CLI args ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
const supplierFilter = getArg(args, '--supplier')
const dryRun = args.includes('--dry-run')
const maxProducts = parseInt(getArg(args, '--max') ?? '9999', 10)

function getArg(args: string[], flag: string): string | undefined {
  const idx = args.indexOf(flag)
  return idx !== -1 ? args[idx + 1] : undefined
}

// ─── Category mapping ────────────────────────────────────────────────────────

function detectCategory(folderPath: string): string {
  // Check the path and the leaf folder name for category clues
  // Use simple includes() so prefixes like "1.卫衣" or "2.T恤" still match
  const p = folderPath.replace(/\\/g, '/').toLowerCase()
  if (p.includes('卫衣') || p.includes('hoodie'))               return 'hoodies'
  if (p.includes('裤子') || p.includes('短裤') || p.includes('长裤') || p.includes('卫裤') || p.includes('sweatpant')) return 'sweatpants'
  if (p.includes('背心') || p.includes('坎肩') || p.includes('vest'))  return 'activewear'
  if (p.includes('套装') || p.includes('瑜伽') || p.includes('yoga'))   return 'activewear'
  if (p.includes('外套') || p.includes('夹克') || p.includes('jacket') || p.includes('coat')) return 'outerwear'
  if (p.includes('连衣裙') || p.includes('裙') || p.includes('dress'))  return 'dresses'
  if (p.includes('帽子') || p.includes('cap') || p.includes(' hat'))    return 'accessories'
  if (p.includes('polo'))                                        return 't-shirts'
  if (p.includes('t恤') || p.includes('tshirt') || p.includes('短袖') || p.includes('长袖')) return 't-shirts'
  return 't-shirts' // default
}

// ─── SKU extraction ──────────────────────────────────────────────────────────

function extractSku(folderName: string): string {
  // Match patterns like: #AR002, #8801, AR002#, 2310#, BX100
  const patterns = [
    /^#([A-Z0-9]+)/,           // #AR002..., #8801...
    /^([A-Z0-9]+)#/,           // AR002#..., 2310#...
    /^([A-Z]{2,}\d{3,})/,     // AR002, BX100 (no # prefix)
    /^#?(\d+)/,                // numeric like 2310, 8801
  ]
  for (const pat of patterns) {
    const m = folderName.match(pat)
    if (m) return m[1].toUpperCase()
  }
  // Fallback: sanitize the first 10 chars
  return folderName.replace(/[^A-Za-z0-9]/g, '').slice(0, 10).toUpperCase() || 'UNKNOWN'
}

function skuToSlug(sku: string): string {
  return sku.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
}

// ─── Material / GSM from folder name ────────────────────────────────────────

function extractGsm(text: string): string | null {
  const m = text.match(/(\d{2,3})\s*[gG][sS]?[mM]/) ||
            text.match(/(\d{2,3})\s*克/) ||
            text.match(/(\d{2,3})[gG](?=[^a-zA-Z]|$)/)
  return m ? `${m[1]}GSM` : null
}

function extractMaterial(text: string): string | null {
  if (/纯棉|100%棉|纯色棉/.test(text)) return '100% Cotton'
  if (/棉.*涤|涤.*棉/.test(text)) {
    const cottonM = text.match(/棉(\d+)%/)
    const polyM   = text.match(/涤(\d+)%/)
    if (cottonM && polyM) return `${cottonM[1]}% Cotton / ${polyM[1]}% Polyester`
    return 'Cotton / Polyester Blend'
  }
  if (/华夫格/.test(text)) return 'Waffle Knit Cotton'
  if (/羊羔绒/.test(text)) return 'Sherpa Fleece'
  if (/毛圈/.test(text)) return 'Terry Cotton'
  return null
}

// ─── Read 卖点.txt ───────────────────────────────────────────────────────────

function readSellingPoints(dir: string): string[] {
  const txtPath = path.join(dir, '卖点.txt')
  if (!fs.existsSync(txtPath)) return []
  try {
    const raw = fs.readFileSync(txtPath, 'utf8')
    return raw
      .split(/\n/)
      .map(l => l.trim().replace(/\r/g, ''))
      .filter(l => l.length > 0 && l.length < 200)
  } catch {
    return []
  }
}

// ─── Parse colors / sizes from 卖点.txt ─────────────────────────────────────

function parseColorsAndSizes(lines: string[]): { colors: string | null; sizes: string | null } {
  let colors: string | null = null
  let sizes: string | null  = null
  for (const line of lines) {
    const cM = line.match(/(\d+)\s*[Cc]olor/) || line.match(/(\d+)色/)
    if (cM) colors = `${cM[1]} Colors`
    const sM = line.match(/([XSML0-9]+[-~][XSML0-9]+)/i)
    if (sM) sizes = sM[1].toUpperCase()
  }
  return { colors, sizes }
}

// ─── Auto-generate English title ─────────────────────────────────────────────

function genEnTitle(sku: string, category: string, gsm: string | null, material: string | null): string {
  const catLabel: Record<string, string> = {
    'hoodies':     'Hoodie',
    't-shirts':    'T-Shirt',
    'sweatpants':  'Sweatpants',
    'activewear':  'Active Top',
    'outerwear':   'Jacket',
    'dresses':     'Dress',
    'accessories': 'Cap',
  }
  const parts = [sku]
  if (gsm) parts.push(gsm)
  parts.push(catLabel[category] ?? 'Garment')
  if (material) parts.push(`(${material})`)
  return parts.join(' ')
}

// ─── Image file helpers ──────────────────────────────────────────────────────

function isImage(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase()
  return IMG_EXTS.has(ext) && !SKIP_FILES.has(filename.toLowerCase())
}

function sortImageFiles(files: string[]): string[] {
  return files.sort((a, b) => {
    // Extract trailing numbers for natural sort
    const numA = parseInt(a.match(/(\d+)[^/\\]*$/)?.[1] ?? '0', 10)
    const numB = parseInt(b.match(/(\d+)[^/\\]*$/)?.[1] ?? '0', 10)
    return numA - numB || a.localeCompare(b)
  })
}

// ─── Copy & compress one image ───────────────────────────────────────────────

async function processImage(
  src: string,
  destDir: string,
  index: number,
  maxW: number
): Promise<string | null> {
  const ext = path.extname(src).toLowerCase()
  const destFile = path.join(destDir, `${index}${ext === '.png' ? '.png' : '.jpg'}`)

  if (dryRun) return destFile

  try {
    let pipeline = sharp(src).rotate() // auto-rotate by EXIF
    const meta = await pipeline.metadata()
    if ((meta.width ?? 0) > maxW) {
      pipeline = pipeline.resize(maxW)
    }
    if (ext === '.png') {
      await pipeline.png({ quality: QUALITY }).toFile(destFile)
    } else {
      await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(destFile)
    }
    return destFile
  } catch (err) {
    console.warn(`  ⚠ Failed to process ${path.basename(src)}: ${(err as Error).message}`)
    return null
  }
}

// ─── Process one product folder ──────────────────────────────────────────────

async function processProduct(
  productDir: string,
  supplierName: string,
  existingSlugs: Set<string>
): Promise<ImportedProduct | null> {
  const folderName = path.basename(productDir)
  const sku = extractSku(folderName)
  let slug = skuToSlug(sku)

  // Deduplicate slugs
  let suffix = 0
  const baseSlug = slug
  while (existingSlugs.has(slug)) {
    suffix++
    slug = `${baseSlug}-${suffix}`
  }
  existingSlugs.add(slug)

  // Detect image subfolders
  const mainDirName = fs.existsSync(path.join(productDir, '主图')) ? '主图'
    : fs.existsSync(path.join(productDir, '新主图')) ? '新主图' : null
  const detailDirName = fs.existsSync(path.join(productDir, '详情页')) ? '详情页' : null

  if (!mainDirName || !detailDirName) return null

  const mainDir   = path.join(productDir, mainDirName)
  const detailDir = path.join(productDir, detailDirName)

  // Get image lists
  const mainFiles   = sortImageFiles(fs.readdirSync(mainDir).filter(isImage))
  const detailFiles = sortImageFiles(fs.readdirSync(detailDir).filter(isImage))

  if (mainFiles.length === 0) return null

  const category = detectCategory(productDir)
  const gsm      = extractGsm(folderName)
  const material  = extractMaterial(folderName)

  // Read selling points
  const sellingPoints = readSellingPoints(productDir)
  const { colors, sizes } = parseColorsAndSizes(sellingPoints)

  // Output directories
  const skuOutDir    = path.join(PUBLIC_OUTPUT, sku)
  const mainOutDir   = path.join(skuOutDir, 'main')
  const detailOutDir = path.join(skuOutDir, 'detail')

  if (!dryRun) {
    fs.mkdirSync(mainOutDir, { recursive: true })
    fs.mkdirSync(detailOutDir, { recursive: true })
  }

  // Process main images (limit to 8)
  const mainImagePaths: string[] = []
  const mainLimit = Math.min(mainFiles.length, 8)
  for (let i = 0; i < mainLimit; i++) {
    const src  = path.join(mainDir, mainFiles[i])
    const dest = await processImage(src, mainOutDir, i + 1, MAIN_IMAGE_MAX_W)
    if (dest) {
      const ext = path.extname(dest)
      mainImagePaths.push(`/products/${sku}/main/${i + 1}${ext}`)
    }
  }

  // Process detail images (limit to 20)
  const detailImagePaths: string[] = []
  const detailLimit = Math.min(detailFiles.length, 20)
  for (let i = 0; i < detailLimit; i++) {
    const src  = path.join(detailDir, detailFiles[i])
    const dest = await processImage(src, detailOutDir, i + 1, DETAIL_IMAGE_MAX_W)
    if (dest) {
      const ext = path.extname(dest)
      detailImagePaths.push(`/products/${sku}/detail/${i + 1}${ext}`)
    }
  }

  const needsReview: string[] = []
  if (!gsm) needsReview.push('gsm')
  if (!material) needsReview.push('material')
  if (!colors) needsReview.push('colorsInfo')
  if (!sizes) needsReview.push('sizesInfo')
  needsReview.push('price')  // always needs manual entry

  const product: ImportedProduct = {
    sku,
    slug,
    title_zh: folderName,
    title_en: genEnTitle(sku, category, gsm, material),
    category,
    sellingPoints,
    mainImages: mainImagePaths,
    detailImages: detailImagePaths,
    colorsInfo: colors,
    sizesInfo: sizes,
    price: null,
    material,
    gsm,
    supplier: supplierName,
    sourceFolder: productDir,
    importedAt: new Date().toISOString(),
    needsReview,
  }

  return product
}

// ─── Walk source tree ─────────────────────────────────────────────────────────

function findProductFolders(root: string, filterSupplier?: string): string[] {
  const results: string[] = []

  function walk(dir: string, depth: number) {
    if (depth > 6) return
    let entries: string[]
    try { entries = fs.readdirSync(dir) } catch { return }

    const hasMain   = entries.includes('主图') || entries.includes('新主图')
    const hasDetail = entries.includes('详情页')

    if (hasMain && hasDetail) {
      results.push(dir)
      return // don't recurse into product folders
    }

    for (const e of entries) {
      const child = path.join(dir, e)
      try {
        if (fs.statSync(child).isDirectory()) walk(child, depth + 1)
      } catch { /* skip permission errors */ }
    }
  }

  if (filterSupplier) {
    // Find matching supplier subdirectory
    let suppliers: string[]
    try { suppliers = fs.readdirSync(root) } catch { return results }
    for (const s of suppliers) {
      if (s.includes(filterSupplier)) {
        walk(path.join(root, s), 0)
        return results
      }
    }
    console.warn(`⚠ No supplier folder matching "${filterSupplier}" found`)
  } else {
    walk(root, 0)
  }

  return results
}

// ─── Extract supplier name ────────────────────────────────────────────────────

function getSupplierName(productDir: string): string {
  const rel = path.relative(SOURCE_ROOT, productDir)
  return rel.split(path.sep)[0]
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🔍 Scanning', SOURCE_ROOT, supplierFilter ? `(filter: ${supplierFilter})` : '(all suppliers)')
  if (dryRun) console.log('👀 DRY RUN — no files will be written')

  const productFolders = findProductFolders(SOURCE_ROOT, supplierFilter)
  console.log(`📦 Found ${productFolders.length} product folders`)

  const limited = productFolders.slice(0, maxProducts)

  // Load existing JSON to avoid duplicates
  let existing: ImportedProduct[] = []
  if (fs.existsSync(JSON_OUTPUT)) {
    try { existing = JSON.parse(fs.readFileSync(JSON_OUTPUT, 'utf8')) } catch { existing = [] }
  }
  const existingSlugs = new Set(existing.map(p => p.slug))
  const existingSourceFolders = new Set(existing.map(p => p.sourceFolder))

  const newProducts: ImportedProduct[] = []
  let skipped = 0
  let failed  = 0

  for (let i = 0; i < limited.length; i++) {
    const dir = limited[i]
    const folderName = path.basename(dir)

    // Skip already imported
    if (existingSourceFolders.has(dir)) {
      skipped++
      continue
    }

    const supplier = getSupplierName(dir)
    process.stdout.write(`[${i + 1}/${limited.length}] ${folderName.slice(0, 50)}... `)

    try {
      const product = await processProduct(dir, supplier, existingSlugs)
      if (product) {
        newProducts.push(product)
        process.stdout.write(`✓ ${product.sku}\n`)
      } else {
        process.stdout.write(`skip (no images)\n`)
        failed++
      }
    } catch (err) {
      process.stdout.write(`✗ ERROR: ${(err as Error).message}\n`)
      failed++
    }
  }

  // Write JSON
  if (!dryRun) {
    const all = [...existing, ...newProducts]
    fs.mkdirSync(path.dirname(JSON_OUTPUT), { recursive: true })
    fs.writeFileSync(JSON_OUTPUT, JSON.stringify(all, null, 2), 'utf8')
    console.log(`\n✅ Wrote ${all.length} products to ${JSON_OUTPUT}`)
    console.log(`   • New: ${newProducts.length} | Skipped (already imported): ${skipped} | Failed: ${failed}`)
  } else {
    console.log(`\n📋 DRY RUN: Would import ${limited.length - skipped} new products`)
    newProducts.slice(0, 5).forEach(p => {
      console.log(`   ${p.sku} → ${p.slug} (${p.category}) — ${p.mainImages.length} main, ${p.detailImages.length} detail images`)
    })
  }
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
