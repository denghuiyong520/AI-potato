/**
 * De-watermark + self-host product images.
 *
 * For every product in src/data/products.json:
 *   - downloads each main/detail image from hongyuapparel.com
 *   - detail images: if they carry the "HONGYU APPAREL" top header, the band
 *     is repainted with the sampled background and stamped "POTATO APPAREL";
 *     "Product Information" spec sheets (blue banner) and clean shots are left
 *     as-is. Main images are clean (just optimized).
 *   - optimizes (resize + mozjpeg) and writes to public/products/<slug>/...
 *   - writes a new products.json with local /products/... paths
 *
 * Env:
 *   SAMPLE_N=10   only process first N products (measurement run)
 *   WRITE_JSON=1  rewrite products.json (full run only)
 */
import sharp from 'sharp'
import https from 'https'
import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const PRODUCTS = path.join(ROOT, 'src/data/products.json')
const OUT_DIR = path.join(ROOT, 'public/products')
const SAMPLE_N = process.env.SAMPLE_N ? parseInt(process.env.SAMPLE_N) : 0
const WRITE_JSON = process.env.WRITE_JSON === '1'

const MAIN_W = 900
const DETAIL_W = 1080
const Q = 80

function fetchBuf(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects < 3) {
        return resolve(fetchBuf(res.headers.location, redirects + 1))
      }
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode))
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks)))
    }).on('error', reject)
  })
}

async function analyseTop(buf) {
  const meta = await sharp(buf).metadata()
  const W = meta.width, H = meta.height
  const bandH = Math.max(40, Math.round(H * 0.085))
  const { data, info } = await sharp(buf).extract({ left: 0, top: 0, width: W, height: bandH }).raw().toBuffer({ resolveWithObject: true })
  const px = info.width * info.height
  let dark = 0, blue = 0
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    if (r < 90 && g < 90 && b < 90) dark++
    if (b > 110 && b - r > 45 && b - g > 25) blue++
  }
  const c = await sharp(buf).extract({ left: 6, top: 6, width: 20, height: 20 }).raw().toBuffer({ resolveWithObject: true })
  let r = 0, g = 0, b = 0, n = c.data.length / c.info.channels
  for (let i = 0; i < c.data.length; i += c.info.channels) { r += c.data[i]; g += c.data[i + 1]; b += c.data[i + 2] }
  const avg = (r / n + g / n + b / n) / 3
  const bg = `rgb(${Math.round(r / n)},${Math.round(g / n)},${Math.round(b / n)})`
  let kind = 'clean'
  if (blue / px > 0.03) kind = 'specsheet'
  else if (dark / px > 0.012 && avg > 190) kind = 'hongyu'
  return { W, H, bandH, kind, bg }
}

async function rebrandBand(buf, a) {
  const fontSize = Math.round(a.bandH * 0.5)
  const overlay = Buffer.from(
    `<svg width="${a.W}" height="${a.bandH}"><rect x="0" y="0" width="${a.W}" height="${a.bandH}" fill="${a.bg}"/><text x="50%" y="50%" dy="0.34em" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="${fontSize}" letter-spacing="2" fill="#1a1a1a">POTATO APPAREL</text></svg>`
  )
  return sharp(buf).composite([{ input: overlay, top: 0, left: 0 }]).toBuffer()
}

async function processImage(url, destAbs, kind /* 'main' | 'detail' */) {
  if (fs.existsSync(destAbs)) return { skipped: true, bytes: fs.statSync(destAbs).size, tag: 'exists' }
  const buf = await fetchBuf(url)
  let out = buf, tag = kind === 'main' ? 'main' : 'clean'
  if (kind === 'detail') {
    const a = await analyseTop(buf)
    if (a.kind === 'hongyu') { out = await rebrandBand(buf, a); tag = 'rebranded' }
    else tag = a.kind // specsheet | clean
  }
  const width = kind === 'main' ? MAIN_W : DETAIL_W
  fs.mkdirSync(path.dirname(destAbs), { recursive: true })
  await sharp(out).resize({ width, withoutEnlargement: true }).jpeg({ quality: Q, mozjpeg: true }).toFile(destAbs)
  return { skipped: false, bytes: fs.statSync(destAbs).size, tag }
}

const products = JSON.parse(fs.readFileSync(PRODUCTS, 'utf8'))
const list = SAMPLE_N ? products.slice(0, SAMPLE_N) : products
console.log(`Processing ${list.length} / ${products.length} products  (SAMPLE_N=${SAMPLE_N || 'all'})`)

let totalBytes = 0, count = 0
const tags = {}
const startTs = Date.now()

for (const p of products) {
  const inSample = list.includes(p)
  const newMain = [], newDetail = []
  for (let i = 0; i < (p.mainImages || []).length; i++) {
    const url = p.mainImages[i]
    const rel = `/products/${p.slug}/main/${i + 1}.jpg`
    if (inSample) {
      try {
        const r = await processImage(url, path.join(ROOT, 'public', rel), 'main')
        totalBytes += r.bytes; count++; tags[r.tag] = (tags[r.tag] || 0) + 1
      } catch (e) { console.log(`  ! ${p.slug} main ${i}: ${e.message}`) }
    }
    newMain.push(rel)
  }
  for (let i = 0; i < (p.detailImages || []).length; i++) {
    const url = p.detailImages[i]
    const rel = `/products/${p.slug}/detail/${i + 1}.jpg`
    if (inSample) {
      try {
        const r = await processImage(url, path.join(ROOT, 'public', rel), 'detail')
        totalBytes += r.bytes; count++; tags[r.tag] = (tags[r.tag] || 0) + 1
      } catch (e) { console.log(`  ! ${p.slug} detail ${i}: ${e.message}`) }
    }
    newDetail.push(rel)
  }
  if (WRITE_JSON) { p.mainImages = newMain; p.detailImages = newDetail }
}

if (WRITE_JSON) {
  fs.writeFileSync(PRODUCTS, JSON.stringify(products, null, 2) + '\n', 'utf8')
  console.log('products.json rewritten to local paths.')
}

const secs = ((Date.now() - startTs) / 1000).toFixed(0)
const mb = (totalBytes / 1024 / 1024).toFixed(1)
const avgKB = count ? (totalBytes / count / 1024).toFixed(0) : 0
console.log(`\nProcessed ${count} images in ${secs}s → ${mb} MB  (avg ${avgKB} KB/img)`)
console.log('Tags:', JSON.stringify(tags))
if (SAMPLE_N) {
  const totalImgs = products.reduce((s, p) => s + (p.mainImages?.length || 0) + (p.detailImages?.length || 0), 0)
  const projMB = ((totalBytes / count) * totalImgs / 1024 / 1024).toFixed(0)
  console.log(`Projected full size: ~${projMB} MB for all ${totalImgs} images across ${products.length} products`)
}
