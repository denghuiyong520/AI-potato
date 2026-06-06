import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import {
  ArrowRight, MessageSquare, FileText, Package, CheckCircle,
  Truck, ShieldCheck, Clock, CreditCard, Headphones,
} from 'lucide-react'
import BottomCTASection from '@/components/home/BottomCTASection'

export const metadata: Metadata = {
  title: 'Custom Apparel Manufacturing Process | How to Order | Potato Apparel',
  description:
    'Step-by-step guide to ordering custom apparel with Potato Apparel. From inquiry to delivery — sampling, production, QC, and worldwide shipping. Start in 24 hours.',
  keywords: [
    'custom apparel manufacturing process',
    'how to order custom clothing',
    'OEM clothing order process',
    'custom garment manufacturing steps',
    'clothing manufacturer order guide',
  ],
  openGraph: {
    title: 'How to Order Custom Apparel | Step-by-Step Process',
    description:
      'Clear, transparent process from your first inquiry to delivery at your door. Low MOQ from 50 pcs, 7-day sampling, 20–30 day bulk production.',
    images: [
      {
        // kuyumG6hKWk — textile workers sorting fabric (process/production vibe)
        url:    'https://images.unsplash.com/photo-1684259499086-93cb3e555803?w=1200&h=630&fit=crop&q=85&auto=format',
        width:  1200,
        height: 630,
      },
    ],
  },
}

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Send Your Inquiry',
    duration: 'Response within 24 hours',
    description:
      'Share your project details — garment type, quantity, design concepts, and timeline. You can use our inquiry form, email, or WhatsApp. Our sales team reviews every request and responds within 24 business hours with initial feedback and a rough price range.',
    tips: [
      'Share as much detail as possible — reference images help',
      'Include your target quantity range and deadline',
      'Design files are not required at this stage',
      'We reply within 24 hours, often much faster',
    ],
  },
  {
    number: '02',
    icon: FileText,
    title: 'Design Review & Tech Pack',
    duration: '2–5 business days',
    description:
      'Once we agree on the project scope, our technical team reviews your designs. If you have a tech pack, we verify all specifications. If you don\'t have one, we can help create it from your sketches, reference garments, or inspiration images. We\'ll clarify fabrics, GSM, construction, sizing, trims, and decorations before moving to sampling.',
    tips: [
      'Tech packs are not required — we can build them for you',
      'Provide physical reference garments if possible',
      'Specify Pantone colours for accurate colour matching',
      'ODM option: choose from our existing style library',
    ],
  },
  {
    number: '03',
    icon: Package,
    title: 'Sampling',
    duration: '7–15 business days',
    description:
      'Our pattern makers and sewers construct your prototype based on the approved tech pack. Sample cost is $30–$80 per piece depending on complexity and is fully credited against your bulk order of 200+ pieces. You\'ll receive high-resolution photos before we ship the physical sample. Revision rounds are included — we iterate until every detail is right.',
    tips: [
      'First sample in 7–10 days for standard styles',
      'Complex styles or cut & sew may take 12–15 days',
      'Up to 3 revision rounds included',
      'Sample cost fully refunded on 200+ piece bulk orders',
    ],
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Sample Approval',
    duration: '1–3 days (your review)',
    description:
      'Review the physical sample against your specs and approved tech pack. Test fit, construction quality, print accuracy, fabric feel, and all finishing details. Approve it as-is or request specific refinements. Once you sign off on a Golden Sample, it becomes the official production reference — your guarantee that every bulk unit matches it exactly.',
    tips: [
      'Take your time — approve only when 100% satisfied',
      'The approved Golden Sample governs all QC',
      'Request measurement reports if needed',
      'Video call review available with our tech team',
    ],
  },
  {
    number: '05',
    icon: CreditCard,
    title: 'Proforma Invoice & Deposit',
    duration: '1 business day',
    description:
      'Once the sample is approved, we issue a detailed Proforma Invoice (PI) covering all line items — manufacturing cost, labels, packaging, and any accessories. Payment terms are 30% deposit to commence production, 70% balance before shipment. We accept T/T bank transfer and PayPal.',
    tips: [
      '30% deposit secures your production slot',
      'PI is fully itemised — no hidden costs',
      'T/T bank transfer or PayPal accepted',
      'Proforma issued within 24 hours of sample approval',
    ],
  },
  {
    number: '06',
    icon: Clock,
    title: 'Bulk Production',
    duration: '20–30 business days',
    description:
      'Production begins immediately after deposit is received. Your dedicated production coordinator sends weekly photo and video updates via WhatsApp. You can request a production status report at any time. Our production team uses the approved Golden Sample as the reference for every unit — batch after batch.',
    tips: [
      'Weekly WhatsApp updates as standard',
      'Rush production (15 days) available for a surcharge',
      'You can request additional in-production photos anytime',
      'Delays of more than 7 days (our fault) earn a discount',
    ],
  },
  {
    number: '07',
    icon: ShieldCheck,
    title: 'QC Inspection & Report',
    duration: 'Concurrent with production',
    description:
      'Every order undergoes our three-stage AQL 2.5 quality inspection process: inline QC (checking first 10 units and every 50th), semi-final QC at 80% completion, and a full final inspection before packing. You receive a QC report with photos, measurement tables, and AQL pass/fail documentation before your balance payment.',
    tips: [
      'AQL 2.5 — same standard used by major retailers',
      'Full measurement report included',
      'Photos of inspected garments provided',
      'Failed units are reworked before shipment',
    ],
  },
  {
    number: '08',
    icon: CreditCard,
    title: 'Balance Payment & Packing',
    duration: '1–2 business days',
    description:
      'After QC approval, we issue the balance invoice for the remaining 70%. Once payment is confirmed, garments are steamed, folded, and packed to your specifications — individual polybags, hang tags, woven labels, size stickers, and custom retail packaging. Your commercial invoice and packing list are prepared for customs clearance.',
    tips: [
      'Packing to your exact specification',
      'All required shipping documents prepared',
      'FNSKU labelling for Amazon FBA orders',
      'DDP (Delivered Duty Paid) option available',
    ],
  },
  {
    number: '09',
    icon: Truck,
    title: 'Worldwide Shipping & Delivery',
    duration: '5–35 days depending on method',
    description:
      'We work with DHL, FedEx, and UPS for express delivery (5–7 days), and trusted freight forwarders for sea shipments (25–35 days). We provide full tracking and proactively update you on shipment status. For large orders, sea freight dramatically reduces per-unit shipping cost. We can ship DDP, direct to Amazon FBA warehouses, or to your 3PL.',
    tips: [
      'Express courier for orders under ~200 kg',
      'Sea freight for larger orders to reduce cost',
      'Direct-to-FBA shipping with full prep included',
      'DDP available for most countries',
    ],
  },
  {
    number: '10',
    icon: Headphones,
    title: 'After-Sales Support',
    duration: 'Ongoing',
    description:
      'Our relationship doesn\'t end at delivery. If you receive any items that don\'t match your approved sample specs, contact us within 14 days with photos. We\'ll rework, remanufacture, or refund affected pieces — at our cost. Most clients return for their second collection within 60–90 days. Your dedicated account manager remains your point of contact for all reorders.',
    tips: [
      '14-day claim window for quality issues',
      'Priority production scheduling for repeat clients',
      'Same team, same contact for every order',
      'Reorder pricing improves with volume',
    ],
  },
]

const timeline = [
  { phase: 'Inquiry → Sample Approval', days: '7–18 days' },
  { phase: 'Deposit → Bulk Production Complete', days: '20–30 days' },
  { phase: 'QC + Packing + Express Shipping', days: '7–10 days' },
  { phase: 'Total: Idea to Delivery', days: '~35–60 days' },
]

const faqs = [
  {
    q: 'Do I need a tech pack to get started?',
    a: 'No. You can start with sketches, reference images, or even a physical garment you want to replicate. Our tech team will build the tech pack for you as part of the sampling process.',
  },
  {
    q: 'What is the minimum order quantity?',
    a: 'MOQ is 50 pieces per style per colour for logo customisation, and 100 pieces per style per colour for fully custom cut & sew orders.',
  },
  {
    q: 'Can I order a trial production run before committing to large volumes?',
    a: 'Absolutely. Many clients start with 50–100 pieces to test the market, then scale up on their second order.',
  },
  {
    q: 'How do I communicate during production?',
    a: 'Your dedicated production coordinator sends weekly updates via WhatsApp or email. You can also request status calls at any stage.',
  },
]

export default function CustomProcessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Order Custom Apparel from Potato Apparel',
            description:
              'Step-by-step process for ordering custom clothing from our factory in China — from inquiry to worldwide delivery.',
            totalTime: 'P45D',
            estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '500' },
            step: steps.map((s) => ({
              '@type': 'HowToStep',
              name: s.title,
              text: s.description,
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gray-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1684259499086-93cb3e555803?w=1400&fit=crop&q=85&auto=format)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative container-site max-w-4xl text-center">
          <span className="inline-block bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            Transparent &amp; Simple
          </span>
          <h1 className="font-display font-bold text-4xl lg:text-6xl mb-6 leading-tight">
            From Your Idea to Your Door
          </h1>
          <p className="text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto mb-8">
            Every Potato Apparel order follows the same clear, 10-step process. No surprises, no hidden fees — just consistent quality from first inquiry to final delivery.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-4 rounded-full transition-colors flex items-center gap-2"
            >
              Start Your Project <ArrowRight size={16} />
            </Link>
            <Link
              href="/factory"
              className="border border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-full transition-colors"
            >
              See Our Factory
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline summary */}
      <section className="py-12 bg-violet-600 text-white">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {timeline.map((t) => (
              <div key={t.phase}>
                <p className="text-xl lg:text-2xl font-bold font-display mb-1">{t.days}</p>
                <p className="text-violet-200 text-sm">{t.phase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="container-site max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Your 10-Step Manufacturing Journey
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We guide you through every stage — nothing is left to chance.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map(({ number, icon: Icon, title, duration, description, tips }) => (
              <div
                key={number}
                className="flex gap-6 p-6 lg:p-8 border border-gray-100 rounded-2xl hover:border-violet-200 hover:shadow-md transition-all"
              >
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center mb-2">
                    <Icon size={24} className="text-violet-600" />
                  </div>
                  <p className="text-xs font-bold text-violet-500">STEP {number}</p>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="font-display font-bold text-xl text-gray-900">{title}</h3>
                    <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                      {duration}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-sm text-gray-500">
                        <CheckCircle size={14} className="text-violet-400 shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container-site max-w-3xl">
          <h2 className="font-display font-bold text-3xl text-gray-900 text-center mb-10">
            Process FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="text-violet-600 font-semibold hover:text-violet-700 text-sm flex items-center gap-1 justify-center"
            >
              View all FAQs <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="container-site max-w-2xl text-center">
          <h2 className="font-display font-bold text-3xl mb-4">Ready to Start?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Tell us your project and we&apos;ll respond with a quote within 24 hours. No commitment required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-4 rounded-full transition-colors flex items-center gap-2"
            >
              Get a Free Quote <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/447907131539"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-full transition-colors"
            >
              WhatsApp Us Now
            </a>
          </div>
        </div>
      </section>

      <BottomCTASection />
    </>
  )
}
