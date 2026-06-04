/**
 * scrape-hongyuapparel.ts
 * Full clone of hongyuapparel.com products:
 *   - Gallery images (main)
 *   - Detail images (size charts, colour selection, fabric closeups from entry-content)
 *   - Full product description / notes
 *   - Subcategory detection
 *
 * Run:  npx tsx scripts/scrape-hongyuapparel.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import { parse as parseHtml } from 'node-html-parser'

// ── Browser-like headers ──────────────────────────────────────────────────────
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://www.hongyuapparel.com/',
  'Cache-Control': 'no-cache',
}

const BASE  = 'https://www.hongyuapparel.com'
const LISTING = `${BASE}/products-and-categories/`
const BATCH = 6
const DELAY = 400

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

async function fetchHtml(url: string): Promise<string> {
  const normalised = url.startsWith('https://www') ? url : url.replace('https://hongyuapparel', 'https://www.hongyuapparel')
  const res = await fetch(normalised, { headers: HEADERS })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractSku(title: string): string {
  const m = title.match(/^#?([A-Z0-9][A-Z0-9\-_.]{1,20})\s/i)
  return m ? m[1].toUpperCase() : ''
}

function cleanTitle(title: string): string {
  return title.replace(/^#[A-Z0-9\-_.]+\s*/i, '').trim()
}

function buildSlug(title: string, sku: string): string {
  const slug = cleanTitle(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80)
  return slug || sku.toLowerCase()
}

function detectCategoryAndSub(title: string, url: string): { category: string; subcategory: string | null } {
  const t = (title + ' ' + url).toLowerCase()

  // ── Hoodies ────────────────────────────────────────────────────────────────
  if (t.includes('hoodie') || t.includes('hoody') || t.includes('zip-up') || t.includes('zip up')) {
    let sub: string | null = null
    if (t.includes('zip'))                                       sub = 'zip-up-hoodie'
    else if (t.includes('terry'))                                sub = 'terry-hoodie'
    else if (t.includes('fleece') || t.includes('french terry')) sub = 'fleece-hoodie'
    else if (t.includes('sweatshirt') || t.includes('crewneck')) sub = 'sweatshirt'
    else                                                         sub = 'fleece-hoodie'
    return { category: 'hoodies', subcategory: sub }
  }
  if (t.includes('sweatshirt') || t.includes('crewneck')) {
    return { category: 'hoodies', subcategory: 'sweatshirt' }
  }
  if (t.includes('sweater'))   return { category: 'sweater', subcategory: null }

  // ── Pants ──────────────────────────────────────────────────────────────────
  if (t.includes('shorts') || t.includes('short ')) return { category: 'sweatpants', subcategory: 'shorts' }
  if (t.includes('sweatpant') || t.includes('jogger') || t.includes(' pant') || t.includes('-pant') || t.includes('trousers')) {
    return { category: 'sweatpants', subcategory: null }
  }

  // ── Denim ──────────────────────────────────────────────────────────────────
  if (t.includes('denim') || t.includes(' jean')) return { category: 'denim', subcategory: null }

  // ── Kids ───────────────────────────────────────────────────────────────────
  if (t.includes('kids') || t.includes('children') || t.includes('baby')) return { category: 'kids-wear', subcategory: null }

  // ── Other categories ───────────────────────────────────────────────────────
  if (t.includes('outdoor') || t.includes('jacket') || t.includes('windbreaker') || t.includes('baseball jacket')) return { category: 'outdoor', subcategory: null }
  if (t.includes('jersey'))                                    return { category: 'jersey', subcategory: null }
  if (t.includes('dress'))                                     return { category: 'dresses', subcategory: null }
  if (t.includes('swim') || t.includes('bikini'))              return { category: 'swimwear', subcategory: null }
  if (t.includes('sleep') || t.includes('pajama'))             return { category: 'sleepwear', subcategory: null }
  if (t.includes('hat') || t.includes(' cap') || t.includes('bag') || t.includes('accessory')) return { category: 'accessories', subcategory: null }

  // ── T-Shirts (default) ─────────────────────────────────────────────────────
  let sub: string | null = null
  if (t.includes('polo'))                                      return { category: 't-shirts', subcategory: 'polo' }
  if (t.includes('tank') || t.includes('vest') || t.includes('singlet') || t.includes('racerback')) sub = 'vest'
  else if (t.includes('long sleeve') || t.includes('long-sleeve') || t.includes('longsleeve')) sub = 'long-sleeve'
  else if (t.includes('vintage') || (t.includes('wash') && !t.includes('basic')) || t.includes('acid') || t.includes('washed') || t.includes('distressed')) sub = 'vintage-t-shirt'
  else if (t.includes('basic fit') || t.includes('basic-fit') || t.includes('slim fit') || t.includes('regular fit') || t.includes('unisex')) sub = 'basic-fit-t-shirt'
  else if (t.includes('oversized') || t.includes('oversize') || t.includes('boxy') || t.includes('drop shoulder')) sub = 'oversized-t-shirt'
  else sub = 'basic-fit-t-shirt' // safe default for t-shirts

  return { category: 't-shirts', subcategory: sub }
}

function extractGsm(title: string, notes: string): string {
  const combined = title + ' ' + notes
  const m = combined.match(/(\d{2,3}(?:\.\d)?)\s*[Gg](?:[Ss][Mm])?\b/)
  if (m) return m[1] + 'GSM'
  return ''
}

// ── Step 1: Get product list ──────────────────────────────────────────────────

async function getProductUrls(): Promise<Array<{ url: string; title: string; price: string }>> {
  console.log('📄  Fetching listing page...')
  const html = await fetchHtml(LISTING)
  const root = parseHtml(html)

  const products: Array<{ url: string; title: string; price: string }> = []
  const seen = new Set<string>()

  root.querySelectorAll('figure a').forEach(a => {
    const href = a.getAttribute('href') || ''
    if (!href.includes(BASE) || seen.has(href)) return
    if (['fabrics','technology','service','about-us','products-and-categories',
         '/ar/','/nl/','/fr/','/de/','/it/','/es/'].some(s => href.includes(s))) return

    let text = a.text.trim().replace(/\s+/g, ' ')
    const priceMatch = text.match(/\$(\d+\.?\d*)/)
    const price = priceMatch ? '$' + priceMatch[1] : ''
    const title = text
      .replace(/Original price was:\s*\$[\d.]+\.?/gi, '')
      .replace(/Current price is:\s*\$[\d.]+\.?/gi, '')
      .replace(/\$[\d.]+/g, '')
      .trim()
      .replace(/\s{2,}/g, ' ')
      .trim()

    if (!title || !href) return
    seen.add(href)
    products.push({ url: href, title, price })
  })

  console.log(`   Found ${products.length} products`)
  return products
}

// ── Step 2: Scrape full product page ──────────────────────────────────────────

interface ScrapedProduct {
  title: string
  price: string
  shortDesc: string       // full text of short description
  specs: Record<string, string>
  mainImages: string[]    // gallery images
  detailImages: string[]  // entry-content images (size charts etc)
}

function scrapeProductPage(html: string): ScrapedProduct {
  const root = parseHtml(html)

  const title = root.querySelector('.product_title, h1.entry-title, h1')?.text?.trim() || ''

  // Price
  const insPrice = root.querySelector('.price ins .woocommerce-Price-amount')
  const regPrice = root.querySelector('.price .woocommerce-Price-amount')
  let price = (insPrice || regPrice)?.text?.trim() || ''
  price = price.match(/\$[\d.]+/)?.[0] || price

  // Full short description text
  const shortDescEl = root.querySelector(
    '.woocommerce-product-details__short-description, .product-short-description'
  )
  const shortDesc = shortDescEl?.text?.trim() || ''

  // Parse specs from short description lines
  const specs: Record<string, string> = {}
  shortDesc.split('\n').forEach(line => {
    const ci = line.indexOf(':')
    if (ci > 0 && ci < 45) {
      const k = line.substring(0, ci).trim().toLowerCase().replace(/\s+/g, '_')
      const v = line.substring(ci + 1).trim()
      if (k && v && v.length < 400) specs[k] = v
    }
  })

  // ── Gallery images (main product photos) ──────────────────────────────────
  const mainImages: string[] = []
  const seenMain = new Set<string>()
  root.querySelectorAll('.woocommerce-product-gallery__image a').forEach(a => {
    const href = a.getAttribute('href') || ''
    if (href.includes(BASE) && href.match(/\.(jpg|jpeg|png|webp)/i)) {
      const clean = href.replace(/-\d+x\d+(\.[a-z]+)$/i, '$1')
      if (!seenMain.has(clean)) { seenMain.add(clean); mainImages.push(clean) }
    }
  })
  if (mainImages.length === 0) {
    root.querySelectorAll('.woocommerce-product-gallery img').forEach(img => {
      const src = img.getAttribute('data-large_image') || img.getAttribute('data-src') || img.getAttribute('src') || ''
      if (src.includes(BASE)) {
        const clean = src.replace(/-\d+x\d+(\.[a-z]+)$/i, '$1')
        if (!seenMain.has(clean)) { seenMain.add(clean); mainImages.push(clean) }
      }
    })
  }

  // ── Detail images from entry-content (size charts, colours, fabric) ────────
  // These are inside the product description body, named *-detail-*.jpg etc.
  const detailImages: string[] = []
  const seenDetail = new Set<string>()

  // Use raw HTML regex on entry-content to find all wp-content image URLs
  // (node-html-parser struggles with deeply nested WP content)
  const entryMatch = html.match(/class="entry-content"([\s\S]*?)(?=<div class="related|<section|<footer|id="comments)/i)
    || html.match(/woocommerce-product-details__short-description"([\s\S]*?)(?=<div class="related|<section|<footer)/i)

  if (entryMatch) {
    const block = entryMatch[1]
    const imgRe = /(?:src|data-src|data-lazy-src)="(https?:\/\/(?:www\.)?hongyuapparel\.com\/wp-content\/uploads\/[^"]+\.(jpg|jpeg|png|webp))"/gi
    let m: RegExpExecArray | null
    while ((m = imgRe.exec(block)) !== null) {
      const src = m[1]
      // Skip tiny thumbnails, logos
      if (src.match(/-\d{2,3}x\d{2,3}\./)) continue
      if (src.includes('logo') || src.includes('icon') || src.includes('favicon')) continue
      // Skip images already in main gallery
      const clean = src.replace(/-\d+x\d+(\.[a-z]+)$/i, '$1')
      if (seenMain.has(clean) || seenDetail.has(clean)) continue
      seenDetail.add(clean)
      detailImages.push(clean)
    }
  }

  return { title, price, shortDesc, specs, mainImages, detailImages }
}

// ── Step 3: Build final product record ───────────────────────────────────────

function buildProduct(listing: { url: string; title: string; price: string }, detail: ScrapedProduct) {
  const rawTitle = listing.title
  const sku      = extractSku(rawTitle)
  const title_en = cleanTitle(rawTitle) || detail.title
  const slug     = buildSlug(rawTitle, sku)
  const { category, subcategory } = detectCategoryAndSub(rawTitle, listing.url)

  const specs    = detail.specs
  const material = specs.material || ''
  const sizesInfo= specs.size || specs.sizes || ''
  const colorsInfo = specs.colors || specs.color || ''
  const weight   = specs.weight || null

  // Clean notes: remove "Introduction" header, product name repeat, "(price...)" lines
  const notes = detail.shortDesc
    .split('\n')
    .map(l => l.trim())
    .filter(l =>
      l.length > 3 &&
      !l.match(/^Introduction\s*$/i) &&
      !l.includes('does not include shipping') &&
      !l.includes('(The price is') &&
      !l.match(/^#[A-Z0-9]/) &&
      !(l === title_en)
    )
    .join('\n')

  const gsm   = extractGsm(rawTitle, notes)
  const rawPrice = detail.price || listing.price || ''
  const price = rawPrice
    ? `From ${rawPrice.startsWith('$') ? rawPrice : '$' + rawPrice}`
    : ''

  return {
    sku,
    slug,
    title_en,
    title_zh:     null as null,
    category,
    subcategory:  subcategory ?? null,
    notes,
    material,
    gsm,
    weight,
    price,
    colorsInfo,
    sizesInfo,
    mainImages:   detail.mainImages.slice(0, 8),
    detailImages: detail.detailImages.slice(0, 15),
    referenceUrl: listing.url,
    sheetName:    'hongyuapparel',
    importedAt:   new Date().toISOString(),
    needsReview:  detail.mainImages.length === 0,
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const listings = await getProductUrls()

  console.log(`\n🔄  Scraping ${listings.length} product pages (batch=${BATCH})...`)
  const scraped: Array<{ listing: typeof listings[0]; detail: ScrapedProduct }> = []
  let ok = 0, err = 0

  for (let i = 0; i < listings.length; i += BATCH) {
    const batch = listings.slice(i, i + BATCH)
    const results = await Promise.allSettled(
      batch.map(async listing => {
        const html   = await fetchHtml(listing.url)
        const detail = scrapeProductPage(html)
        return { listing, detail }
      })
    )
    results.forEach((r, j) => {
      if (r.status === 'fulfilled') { scraped.push(r.value); ok++ }
      else { console.warn(`  ✗ ${batch[j].url}: ${r.reason?.message}`); err++ }
    })
    process.stdout.write(`\r   ${ok + err}/${listings.length}  (${err} errors)`)
    if (i + BATCH < listings.length) await sleep(DELAY)
  }
  console.log(`\n   Done: ${ok} ok, ${err} errors`)

  const products = scraped.map(({ listing, detail }) => buildProduct(listing, detail))

  const outPath = path.join(process.cwd(), 'src/data/products.json')
  fs.writeFileSync(outPath, JSON.stringify(products, null, 2), 'utf-8')
  console.log(`\n✅  Wrote ${products.length} products → ${outPath}`)

  const withImgs   = products.filter(p => p.mainImages.length > 0).length
  const withDetail = products.filter(p => p.detailImages.length > 0).length
  const withPrice  = products.filter(p => p.price).length
  const cats       = Array.from(new Set(products.map(p => p.category))).sort()
  const withSub    = products.filter(p => p.subcategory).length
  console.log(`\n📊  Summary`)
  console.log(`    Total:         ${products.length}`)
  console.log(`    Main images:   ${withImgs}`)
  console.log(`    Detail images: ${withDetail}`)
  console.log(`    With price:    ${withPrice}`)
  console.log(`    With subcat:   ${withSub}`)
  console.log(`    Categories:    ${cats.join(', ')}`)
}

main().catch(e => { console.error(e); process.exit(1) })
