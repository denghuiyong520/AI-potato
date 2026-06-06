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
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
      // Product images from hongyuapparel.com CDN
      { protocol: 'https', hostname: 'www.hongyuapparel.com' },
    ],
  },
}

export default withBundleAnalyzer(withNextIntl(nextConfig))
