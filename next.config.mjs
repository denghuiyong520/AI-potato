import createNextIntlPlugin from 'next-intl/plugin'
import bundleAnalyzer from '@next/bundle-analyzer'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

// Enable with: ANALYZE=true npm run build  (or: npm run analyze)
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Vercel's Hobby plan caps Image Optimization at 5,000 transformations/mo.
    // With 3,792 self-hosted product images that quota is blown almost instantly,
    // and once exceeded Vercel stops optimizing — every product image 404s/breaks.
    // Serving the originals unoptimized sidesteps the quota entirely (free, and
    // images load reliably). Re-enable optimization if upgrading to Vercel Pro.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
      // Product images are now self-hosted under /public/products (de-watermarked).
    ],
  },
}

export default withBundleAnalyzer(withNextIntl(nextConfig))
