import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'portfolio.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, '/portfolio'),
    keywords: [
      'custom clothing portfolio',
      'apparel manufacturing samples',
      'custom t-shirt portfolio',
      'hoodie manufacturing portfolio',
      'streetwear manufacturer work',
      'OEM clothing examples',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=1200&h=630&fit=crop',
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default function PortfolioPage() {
  return <PortfolioGrid />
}
