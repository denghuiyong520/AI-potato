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
    // AVIF first (smaller than WebP) with WebP fallback — faster LCP on the
    // 3,792 self-hosted product images. Vercel caches the optimized output.
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
