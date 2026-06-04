'use client'

import { useState } from 'react'
import { ChevronDown, MessageCircle, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const faqs = [
  {
    category: 'Getting Started',
    items: [
      { q: 'What is your minimum order quantity (MOQ)?', a: 'Our standard MOQ is 50 pieces per style, per colour for blank garments. For fully custom OEM orders (custom fabric, construction, or cut & sew), the MOQ is 100 pieces per style per colour. We recommend starting with a sample order before committing to bulk.' },
      { q: 'Do you offer samples before bulk production?', a: 'Yes — we highly recommend sampling before bulk. Sample lead time is 7–10 business days. Sample cost varies by garment type ($20–$80 per sample) and is fully refundable against your first bulk order of 200+ pieces.' },
      { q: 'Can I order a mix of sizes and colours?', a: 'Absolutely. For blank goods orders, you can mix sizes and colours freely as long as the total reaches our 50-piece MOQ. For fully custom garments, each colour typically requires its own 100-piece minimum.' },
      { q: 'What is the difference between OEM and ODM?', a: 'OEM (Original Equipment Manufacturer) means you provide the designs and we manufacture to your spec. ODM (Original Design Manufacturer) means we design the garment for you, or you choose from our existing styles and add your branding. Both options are available with no restrictions on branding or labelling.' },
    ],
  },
  {
    category: 'Pricing & Payment',
    items: [
      { q: 'How is pricing calculated?', a: 'Pricing depends on: garment style, fabric weight (GSM), order quantity, number of print/embroidery positions, and packaging requirements. Prices drop significantly at higher quantities. Request a free quote with your specs for an exact price within 24 hours.' },
      { q: 'What payment methods do you accept?', a: 'We accept T/T bank transfer, PayPal, and Western Union. Standard payment terms are 30% deposit to begin production and 70% balance before shipment. For repeat customers with an established track record, we may offer net payment terms.' },
      { q: 'Are there any hidden fees?', a: 'No. Your quoted price includes manufacturing, basic folding and polybag packing, and QC inspection. Additional charges only apply for: custom hang tags, woven labels, special packaging, or express production. All extras are itemised in your proforma invoice before you confirm.' },
      { q: 'Do you charge for artwork or design revisions?', a: 'Basic artwork clean-up and print file preparation is included free. For complex design work or multiple revision rounds, we may charge a small design fee ($30–$80). Screen setup fees ($15–$25 per colour) apply for screen printing and are one-time costs.' },
    ],
  },
  {
    category: 'Production & Timeline',
    items: [
      { q: 'How long does production take?', a: 'Standard bulk production takes 20–30 business days after sample approval and deposit payment. Blank/stock garments ship within 5–10 days. Rush production (15 days) is available for a 20% surcharge on orders under 500 pieces.' },
      { q: 'Can I visit the factory?', a: 'Yes, factory visits are welcome and encouraged for large buyers. Our factory is in Guangzhou, Guangdong Province. We also offer virtual factory tours via video call. Contact us to schedule.' },
      { q: 'What happens if my order is delayed?', a: 'We build buffer time into every production schedule. If an unexpected delay occurs, we notify you immediately and provide a revised ETA. For delays caused on our end that exceed 7 days, we offer a discount on the affected order.' },
      { q: 'Can I track my production status?', a: 'Yes. We assign every order a production coordinator who sends weekly photo updates via WhatsApp or email. You can request a production status report at any time during manufacturing.' },
    ],
  },
  {
    category: 'Customisation & Branding',
    items: [
      { q: 'What printing methods do you offer?', a: 'We offer: screen printing (best for 1–6 colour designs at volume), DTG (digital direct-to-garment, ideal for full-colour photos), discharge printing (soft vintage look), embroidery (structured logos and text), heat transfer, woven patches, and rubber patches. Our team will recommend the best method for your design and order size.' },
      { q: 'Can you add my own brand labels and tags?', a: 'Yes — full private label service is included on all orders. This covers: woven neck labels (replacing our label with yours), woven size labels, hang tags, care labels, and packaging. We can also do white-label or completely unbranded garments if preferred.' },
      { q: 'Can I customise the fabric, GSM, or garment construction?', a: 'Yes, for OEM orders with 100+ pieces per style. You can specify the exact GSM, yarn count, fabric composition, garment dimensions, and construction details. We will source the fabric to your spec or provide options from our approved fabric library.' },
      { q: 'Do you have a colour matching service?', a: 'Yes. We use Pantone colour matching for fabric and print colours. For fabric dyeing, we match to a Pantone code or a physical swatch provided by you. For printing, we use a D65 light box to ensure colour accuracy.' },
    ],
  },
  {
    category: 'Shipping & Logistics',
    items: [
      { q: 'Which countries do you ship to?', a: 'We ship worldwide including the USA, UK, Canada, Australia, Germany, France, Netherlands, UAE, Saudi Arabia, and 150+ other countries. We work with DHL, FedEx, UPS for express, and use sea freight for large orders to reduce cost.' },
      { q: 'What are the shipping costs and transit times?', a: 'Shipping cost depends on order weight and destination. Typical costs: small orders (50–100 pcs) to US/UK run $150–$300 by express (5–7 days). Larger orders are usually sent by sea freight (25–35 days) at $0.30–$0.80 per kg. We provide a shipping quote before you confirm payment.' },
      { q: 'Do you handle customs clearance?', a: 'We ship DDP (Delivered Duty Paid) on request, meaning we handle export customs from China. For import customs at your destination, we provide all commercial invoices and packing lists. We recommend you consult a local customs broker for import duty calculations, especially for the EU and UK.' },
      { q: 'Can you ship directly to Amazon FBA warehouses?', a: 'Yes. We are experienced in Amazon FBA prep requirements including FNSKU labelling, polybag requirements, suffocation warnings, and carton dimensions. We can ship directly to your designated FBA warehouse. Please provide your FBA shipment details during the order process.' },
    ],
  },
  {
    category: 'Quality & Returns',
    items: [
      { q: 'What is your quality guarantee?', a: 'Every order ships with an AQL 2.5 quality inspection report. We guarantee garments meet the specs in your approved sample. If you receive items that do not match the approved sample specifications, we will remanufacture or provide a refund for the non-conforming pieces.' },
      { q: 'What if I receive damaged or incorrect items?', a: 'Contact us within 14 days of delivery with photos. For confirmed manufacturing defects or items not matching your approved sample, we will rework, remanufacture, or refund — at our cost. Normal variation within ±0.5 cm on measurements and slight colour variation across dye lots are considered within industry tolerance.' },
      { q: 'Do you offer garment testing or certifications?', a: 'Yes. We can arrange third-party lab testing (SGS, Bureau Veritas, Intertek) for CPSC, REACH, EN71, CA Prop 65, and other compliance requirements. Testing fees are additional and quoted per garment category. Turnaround is typically 5–10 days.' },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-start justify-between gap-4"
      >
        <span className="font-semibold text-gray-900 text-[15px] leading-snug">{q}</span>
        <ChevronDown size={18} className={cn('text-gray-400 shrink-0 mt-0.5 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="pb-5 text-gray-600 text-[14px] leading-relaxed -mt-1">
          {a}
        </div>
      )}
    </div>
  )
}

export default function FAQContent() {
  return (
    <div className="pt-32 pb-20 bg-[#f7f7f5]">
      <div className="container-site max-w-3xl">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Everything you need to know about custom apparel manufacturing, ordering, and shipping with Potato Apparel.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((cat) => (
            <div key={cat.category} className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
              <h2 className="font-bold text-xl text-gray-900 mb-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-violet-500 rounded-full inline-block" />
                {cat.category}
              </h2>
              <div className="mt-4">
                {cat.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 bg-violet-600 text-white rounded-2xl p-8 text-center">
          <MessageCircle size={32} className="mx-auto mb-4 opacity-80" />
          <h2 className="font-display font-bold text-2xl mb-2">Still have questions?</h2>
          <p className="text-violet-200 mb-6">Our sales team replies within 24 hours — often much faster.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="bg-white text-violet-700 font-semibold px-6 py-3 rounded-full hover:bg-violet-50 transition-colors flex items-center gap-2">
              Contact Sales Team <ArrowRight size={15} />
            </Link>
            <a href="https://wa.me/447907131539" target="_blank" rel="noopener noreferrer" className="border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:border-white transition-colors">
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
