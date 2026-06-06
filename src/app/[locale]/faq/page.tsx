import type { Metadata } from 'next'
import FAQContent from '@/components/faq/FAQContent'
import { buildAlternates } from '@/lib/seo'

const baseMetadata: Metadata = {
  title: 'FAQ | Custom Apparel Manufacturing Questions | Potato Apparel',
  description:
    'Answers to the most common questions about ordering custom apparel — MOQ, sampling, pricing, production timelines, printing, embroidery, shipping, and quality guarantees.',
  keywords: [
    'custom clothing manufacturer FAQ',
    'apparel manufacturer questions',
    'custom t-shirt MOQ',
    'clothing manufacturer pricing',
    'OEM clothing questions',
    'custom hoodie manufacturer FAQ',
  ],
  openGraph: {
    title: 'Custom Apparel Manufacturing FAQ | Potato Apparel',
    description:
      'MOQ, sampling, pricing, production timelines, printing methods, shipping, and quality guarantees — all your questions answered.',
  },
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return { ...baseMetadata, alternates: buildAlternates(locale, '/faq') }
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'What is your minimum order quantity (MOQ)?', acceptedAnswer: { '@type': 'Answer', text: 'Our standard MOQ is 50 pieces per style, per colour for blank garments. For fully custom OEM orders the MOQ is 100 pieces per style per colour.' } },
              { '@type': 'Question', name: 'Do you offer samples before bulk production?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — sample lead time is 7–10 business days. Sample cost is $20–$80 per sample and is fully refundable against your first bulk order of 200+ pieces.' } },
              { '@type': 'Question', name: 'How long does production take?', acceptedAnswer: { '@type': 'Answer', text: 'Standard bulk production takes 20–30 business days after sample approval and deposit payment.' } },
              { '@type': 'Question', name: 'What printing methods do you offer?', acceptedAnswer: { '@type': 'Answer', text: 'Screen printing, DTG printing, discharge printing, embroidery, heat transfer, woven patches, and rubber patches.' } },
              { '@type': 'Question', name: 'Which countries do you ship to?', acceptedAnswer: { '@type': 'Answer', text: 'We ship worldwide including the USA, UK, Canada, Australia, Germany, France, Netherlands, UAE, Saudi Arabia, and 150+ other countries.' } },
              { '@type': 'Question', name: 'Can you ship directly to Amazon FBA warehouses?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We handle FNSKU labelling, polybag requirements, suffocation warnings, and carton dimensions to Amazon standards.' } },
            ],
          }),
        }}
      />
      <FAQContent />
    </>
  )
}
