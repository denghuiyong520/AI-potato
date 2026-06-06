/**
 * Logo & OG image processor
 * Run: node scripts/process-logos.mjs
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root      = path.resolve(__dirname, '..')
const pub       = path.join(root, 'public')

// ─── 1. Remove black background → transparent ─────────────────────────────────
// Pixels with R,G,B all < 30 become fully transparent.
// Everything else (the white logo marks) is kept.

async function removeBlack(inputPath, outputPath) {
  const img  = sharp(inputPath).ensureAlpha()
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info   // channels = 4 (RGBA)
  const px = Buffer.from(data)

  for (let i = 0; i < px.length; i += channels) {
    const r = px[i], g = px[i + 1], b = px[i + 2]
    if (r < 30 && g < 30 && b < 30) {
      px[i + 3] = 0   // transparent
    }
  }

  await sharp(px, { raw: { width, height, channels } })
    .png()
    .toFile(outputPath)

  console.log(`✓ ${path.basename(outputPath)}`)
}

// ─── 2. OG image: 1200×630 pure SVG composite ──────────────────────────────────

async function generateOG(outputPath) {
  const W = 1200, H = 630

  // Inline the logo2 as base64 so we don't need a separate read step
  const logoBytes = readFileSync(path.join(pub, 'logo2.png'))
  const logoB64   = logoBytes.toString('base64')

  // Resize logo2 to fit nicely in the center (max 240px wide, keeping AR)
  const logoMeta  = await sharp(path.join(pub, 'logo2.png')).metadata()
  const logoScale = Math.min(240 / logoMeta.width, 220 / logoMeta.height)
  const lW = Math.round(logoMeta.width  * logoScale)
  const lH = Math.round(logoMeta.height * logoScale)

  const logoResized = await sharp(path.join(pub, 'logo2.png'))
    .resize(lW, lH, { fit: 'contain', background: { r: 17, g: 17, b: 17, alpha: 1 } })
    .png()
    .toBuffer()

  // SVG text layer
  const cx = W / 2
  const ty = H / 2 + lH / 2 + 48   // text starts below logo

  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <!-- top rule -->
    <line x1="80" y1="60" x2="${W - 80}" y2="60" stroke="white" stroke-width="0.5" opacity="0.25"/>

    <!-- brand name -->
    <text x="${cx}" y="${ty}"
      font-family="Georgia, 'Times New Roman', serif"
      font-size="100" font-weight="normal" fill="white"
      text-anchor="middle" letter-spacing="18">POTATO</text>

    <text x="${cx}" y="${ty + 52}"
      font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
      font-size="22" font-weight="300" fill="white" opacity="0.65"
      text-anchor="middle" letter-spacing="10">APPAREL</text>

    <!-- bottom rule -->
    <line x1="80" y1="${H - 60}" x2="${W - 80}" y2="${H - 60}" stroke="white" stroke-width="0.5" opacity="0.25"/>

    <!-- domain -->
    <text x="${cx}" y="${H - 34}"
      font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
      font-size="18" font-weight="300" fill="white" opacity="0.35"
      text-anchor="middle" letter-spacing="3">potatoapparel.com</text>
  </svg>`

  const logoX = Math.round((W - lW) / 2)
  const logoY = Math.round((H - lH) / 2) - 36   // shift up slightly to balance with text below

  await sharp({
    create: { width: W, height: H, channels: 4, background: { r: 17, g: 17, b: 17, alpha: 1 } },
  })
    .composite([
      { input: logoResized,          left: logoX, top: logoY },
      { input: Buffer.from(svg),     gravity: 'center' },
    ])
    .jpeg({ quality: 92 })
    .toFile(outputPath)

  console.log(`✓ ${path.basename(outputPath)}`)
}

// ─── 3. 112×112 icon ───────────────────────────────────────────────────────────

async function generateIcon(inputPath, outputPath) {
  await sharp(inputPath)
    .resize(112, 112, { fit: 'contain', background: { r: 17, g: 17, b: 17, alpha: 1 } })
    .png()
    .toFile(outputPath)
  console.log(`✓ ${path.basename(outputPath)}`)
}

// ─── Main ──────────────────────────────────────────────────────────────────────

;(async () => {
  const logo1 = path.join(pub, 'logo.png')
  const logo2 = path.join(pub, 'logo2.png')

  console.log('Processing logos...')

  await removeBlack(logo1, path.join(pub, 'logo-transparent.png'))
  await removeBlack(logo2, path.join(pub, 'logo-square-transparent.png'))
  await generateOG(path.join(pub, 'og-default.jpg'))
  await generateIcon(logo2, path.join(pub, 'logo-112.png'))

  console.log('\nAll done → public/')
})()
