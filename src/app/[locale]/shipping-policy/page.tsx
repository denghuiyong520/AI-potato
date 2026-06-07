import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Truck, Package, Clock, Globe, ShieldCheck, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import BottomCTASection from '@/components/home/BottomCTASection'
import { buildAlternates } from '@/lib/seo'

const baseMetadata: Metadata = {
  title: 'Shipping Policy | Worldwide Apparel Delivery | Potato Apparel',
  description:
    'Potato Apparel ships to 150+ countries. Express delivery in 5–7 days or sea freight in 25–35 days. Amazon FBA direct shipping, DDP available. Full tracking on every order.',
  keywords: [
    'clothing manufacturer shipping policy',
    'apparel manufacturer shipping',
    'custom clothing shipping from China',
    'clothing supplier worldwide shipping',
    'Amazon FBA apparel shipping',
  ],
  openGraph: {
    title: 'Shipping Policy | Potato Apparel Custom Clothing Manufacturer',
    description:
      'Express courier (5–7 days) or sea freight (25–35 days) to 150+ countries. DDP available. Direct-to-FBA shipping supported.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return { ...baseMetadata, alternates: buildAlternates(locale, '/shipping-policy') }
}

const shippingMethods = [
  {
    icon: Truck,
    name: 'Express Courier',
    carriers: 'DHL / FedEx / UPS',
    transit: '5–7 business days',
    best: 'Orders under 200 kg',
    description:
      'Door-to-door tracked delivery. Ideal for samples, small bulk orders, and urgent shipments. Full online tracking from pickup to delivery.',
    included: ['Real-time tracking link', 'Signature on delivery', 'Commercial invoice + packing list', 'Export customs handled by us'],
  },
  {
    icon: Globe,
    name: 'Sea Freight (LCL)',
    carriers: 'Maersk / MSC / COSCO',
    transit: '25–35 business days',
    best: 'Orders over 200 kg',
    description:
      'Less-than-container load (LCL) sea freight. Significantly lower cost per kg for larger orders. Best for non-urgent bulk shipments.',
    included: ['Port-to-port or door-to-door', 'Full tracking milestones', 'Commercial invoice + B/L', 'Export customs handled by us'],
  },
  {
    icon: Package,
    name: 'Amazon FBA Direct',
    carriers: 'Varies by destination',
    transit: '7–35 days (method dependent)',
    best: 'Amazon sellers',
    description:
      'We ship directly to your Amazon FBA warehouse. We handle FNSKU labelling, polybag prep, suffocation warnings, carton dimensions, and box labelling to Amazon standards.',
    included: ['FNSKU labelling included', 'Polybag & suffocation warning', 'Amazon-compliant carton labelling', 'Shipment ID coordination'],
  },
]

const destinations = [
  { region: 'United States', express: '5–7 days', sea: '25–30 days', expressNote: 'DHL / FedEx' },
  { region: 'United Kingdom', express: '4–6 days', sea: '25–30 days', expressNote: 'DHL / FedEx' },
  { region: 'Canada', express: '5–7 days', sea: '28–35 days', expressNote: 'DHL / UPS' },
  { region: 'Australia', express: '5–8 days', sea: '22–28 days', expressNote: 'DHL / FedEx' },
  { region: 'Germany', express: '4–6 days', sea: '22–28 days', expressNote: 'DHL Express' },
  { region: 'France', express: '4–6 days', sea: '22–28 days', expressNote: 'DHL / FedEx' },
  { region: 'Netherlands', express: '4–6 days', sea: '22–28 days', expressNote: 'DHL Express' },
  { region: 'UAE', express: '4–5 days', sea: '15–20 days', expressNote: 'DHL / FedEx' },
  { region: 'Saudi Arabia', express: '4–6 days', sea: '15–20 days', expressNote: 'DHL / FedEx' },
  { region: 'Other Countries', express: '6–10 days', sea: '25–40 days', expressNote: 'DHL / FedEx / UPS' },
]

const packagingStandards = [
  { item: 'Per-garment packaging', desc: 'Individual polybag with size sticker (included as standard)' },
  { item: 'Hang tags', desc: 'Custom hang tags attached — your design or our template' },
  { item: 'Woven labels', desc: 'Brand neck labels and size labels sewn in before packing' },
  { item: 'Carton boxing', desc: 'Standard export cartons with product details, quantity, and PO reference' },
  { item: 'Retail packaging', desc: 'Custom boxes, tissue paper, ribbon, or branded bags on request' },
  { item: 'Amazon FBA prep', desc: 'FNSKU labels, suffocation warnings, box labels to Amazon spec' },
]

const importantNotes = [
  {
    icon: AlertCircle,
    title: 'Import Duties & Taxes',
    text: 'Import duties and local taxes are the responsibility of the consignee unless DDP (Delivered Duty Paid) is selected. DDP is available for most major markets — request it in your inquiry. We recommend consulting a local customs broker for EU and UK import calculations.',
  },
  {
    icon: ShieldCheck,
    title: 'Cargo Insurance',
    text: 'All shipments are covered by basic carrier liability. We strongly recommend purchasing additional cargo insurance for orders above $5,000. We can arrange this on your behalf — just ask when confirming your shipment.',
  },
  {
    icon: Clock,
    title: 'Transit Time Note',
    text: 'Transit times quoted are business days from the point of handover to the carrier. They exclude production lead time, public holidays, and any delays caused by customs inspection at destination. Express transit times have higher reliability than sea freight.',
  },
]

export default function ShippingPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Shipping Policy | Potato Apparel',
            description: 'Potato Apparel worldwide shipping policy. Express and sea freight to 150+ countries.',
            url: 'https://potatoapparel.com/en/shipping-policy',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://potatoapparel.com/en' },
                { '@type': 'ListItem', position: 2, name: 'Shipping Policy' },
              ],
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gray-950 text-white">
        <div className="container-site max-w-4xl text-center">
          <span className="inline-block bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            150+ Countries
          </span>
          <h1 className="font-display font-bold text-4xl lg:text-5xl mb-5 leading-tight">
            Worldwide Shipping
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            From our Guangzhou factory to your warehouse door — fast, tracked, and fully documented. Express courier or sea freight depending on your order size and timeline.
          </p>
        </div>
      </section>

      {/* Key stats */}
      <section className="py-10 bg-violet-600 text-white">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: '150+', label: 'Countries Served' },
              { value: '5–7', label: 'Days Express Delivery' },
              { value: '100%', label: 'Orders Fully Tracked' },
              { value: 'DDP', label: 'Duty-Paid Option Available' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl lg:text-3xl font-bold font-display mb-1">{s.value}</p>
                <p className="text-violet-200 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Methods */}
      <section className="py-20 bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Shipping Methods
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Choose the method that best fits your timeline and order size.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {shippingMethods.map(({ icon: Icon, name, carriers, transit, best, description, included }) => (
              <div key={name} className="border border-gray-100 rounded-2xl p-6 hover:border-violet-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-violet-600" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-1">{name}</h3>
                <p className="text-sm text-violet-600 font-medium mb-1">{carriers}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    {transit}
                  </span>
                  <span className="text-xs bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full">
                    Best for: {best}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
                <ul className="space-y-1.5">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                      <CheckCircle size={13} className="text-violet-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transit Times by Destination */}
      <section className="py-20 bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Estimated Transit Times
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Times shown are from handover to carrier, excluding production lead time.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl overflow-hidden border border-gray-100 text-sm">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="text-left px-6 py-4 font-semibold">Destination</th>
                  <th className="text-left px-6 py-4 font-semibold">Express Courier</th>
                  <th className="text-left px-6 py-4 font-semibold">Sea Freight (LCL)</th>
                  <th className="text-left px-6 py-4 font-semibold">Carriers</th>
                </tr>
              </thead>
              <tbody>
                {destinations.map((d, i) => (
                  <tr key={d.region} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-3.5 font-medium text-gray-900">{d.region}</td>
                    <td className="px-6 py-3.5 text-gray-600">{d.express}</td>
                    <td className="px-6 py-3.5 text-gray-600">{d.sea}</td>
                    <td className="px-6 py-3.5 text-gray-500 text-xs">{d.expressNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Packaging Standards */}
      <section className="py-20 bg-white">
        <div className="container-site max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Packaging Standards
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Every order is packed to retail-ready standards before it leaves the factory.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packagingStandards.map(({ item, desc }) => (
              <div key={item} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <CheckCircle size={18} className="text-violet-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item}</p>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-gray-50">
        <div className="container-site max-w-4xl">
          <h2 className="font-display font-bold text-2xl text-gray-900 mb-8 text-center">
            Important Notes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {importantNotes.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100">
                <Icon size={24} className="text-violet-500 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="container-site max-w-2xl text-center">
          <h2 className="font-display font-bold text-3xl mb-4">Questions About Shipping?</h2>
          <p className="text-gray-400 mb-8">
            Get an exact shipping quote for your order size and destination. We respond within 24 hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-4 rounded-full transition-colors flex items-center gap-2"
            >
              Get a Shipping Quote <ArrowRight size={16} />
            </Link>
            <Link
              href="/faq"
              className="border border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-full transition-colors"
            >
              View All FAQs
            </Link>
          </div>
        </div>
      </section>

      <BottomCTASection />
    </>
  )
}
