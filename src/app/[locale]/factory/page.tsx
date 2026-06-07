import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { CheckCircle, Factory, Layers, Settings, ShieldCheck, Zap, ArrowRight } from 'lucide-react'
import BottomCTASection from '@/components/home/BottomCTASection'
import { buildAlternates, SITE_URL } from '@/lib/seo'

const baseMetadata: Metadata = {
  title: 'Our Manufacturing Network | Custom Apparel Production | Potato Apparel',
  description: 'How we make your clothing: a vetted network of specialist garment factories in Guangzhou, managed end-to-end by our team — sampling, OEKO-TEX fabrics, AQL 2.5 QC, global shipping.',
  openGraph: {
    title: 'Our Manufacturing Network | Potato Apparel',
    description: 'A vetted network of specialist apparel factories in Guangzhou, managed end-to-end — design, sampling, AQL 2.5 quality control and logistics for global brands.',
    images: [{
      url:    'https://images.unsplash.com/photo-1741176505800-caaa3a52631a?w=1200&h=630&fit=crop&q=85&auto=format',
      width:  1200,
      height: 630,
      alt:    'Apparel manufacturing — garment sewing production line',
    }],
  },
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return { ...baseMetadata, alternates: buildAlternates(locale, '/factory') }
}

const steps = [
  { step: '01', title: 'Design Review & Tech Pack', desc: 'Our technical team reviews your design files, suggests improvements, and builds a detailed tech pack covering measurements, materials, construction methods, and finish specifications.', icon: Layers },
  { step: '02', title: 'Material Sourcing', desc: 'We source fabrics from vetted mills — ring-spun cotton, French terry, polyester blends, and performance fabrics — including OEKO-TEX Standard 100 certified options, confirming every roll meets your GSM and quality spec before cutting.', icon: Settings },
  { step: '03', title: 'Pattern Making & Sampling', desc: 'We commission your prototype from the partner factory best suited to the product. First samples typically arrive within 7–10 business days for your review and approval before bulk.', icon: CheckCircle },
  { step: '04', title: 'Production Matching', desc: 'We assign your order to the specialist factory in our network best equipped for it — knitwear to a knit specialist, denim to a denim house — so every product is made where it is made best.', icon: Factory },
  { step: '05', title: 'Sewing & Construction', desc: 'Skilled sewers on industrial lockstitch, overlock, and flatlock machines complete assembly across multiple workstations — collar attachment, side seaming, hemming, and finishing — to your approved sample.', icon: Zap },
  { step: '06', title: 'Printing & Embroidery', desc: 'Decoration — screen printing (up to 12 colours), DTG, DTF, embroidery (up to 15 colours), heat transfer, woven patches, and puff print — is produced by specialist decorators we manage and inspect directly.', icon: Settings },
  { step: '07', title: 'Quality Inspection (AQL 2.5)', desc: 'We run AQL 2.5 inspection on every production run at the factory. Our QC team checks measurements, stitch density, colour fastness, seam strength, and print alignment against your approved sample.', icon: ShieldCheck },
  { step: '08', title: 'Finishing & Packing', desc: 'Garments are steamed, folded, and packed to your specification — poly bag per piece, hang tags, woven labels, size stickers, and custom retail packaging — then consolidated for shipment.', icon: CheckCircle },
]

const capabilities = [
  { category: 'Cutting', items: ['Automated CAD cutting (Gerber / Lectra)', 'Multi-layer spreading & nesting', 'Dimensional accuracy to ±0.5 cm', 'Low-waste marker optimisation'] },
  { category: 'Sewing', items: ['Industrial lockstitch & overlock', 'Flatlock for activewear seams', 'Bartack & buttonhole finishing', 'Multi-station assembly lines'] },
  { category: 'Printing', items: ['Screen printing up to 8–12 colours', 'DTG & DTF for full-colour art', 'Discharge & water-based inks', 'Puff, gloss & heat-transfer finishes'] },
  { category: 'Embroidery', items: ['Multi-head embroidery machines', 'Up to 15-colour thread capability', 'Flat, 3D puff & chain stitch', 'Artwork digitising included'] },
  { category: 'QC & Testing', items: ['AQL 2.5 inspection on every run', 'GSM verification & colour matching', 'Seam strength & colour-fastness checks', 'Photo + measurement QC report'] },
  { category: 'Finishing & Packing', items: ['Steam pressing & folding', 'Per-piece poly-bagging', 'Hang tags, woven & care labels', 'Custom retail & mailer packaging'] },
]

const trustPoints = [
  'OEKO-TEX Standard 100 certified fabrics available (certificate on request)',
  'AQL 2.5 inspection with a photo + measurement report on every order',
  'Recycled-fabric (GRS) documentation available on request',
  'Vetted, long-term partner factories — matched to each product type',
]

export default function FactoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Potato Apparel',
            description: 'Custom apparel manufacturing partner managing a vetted network of specialist garment factories in Guangzhou, China — OEM & ODM production for global brands.',
            areaServed: 'Worldwide',
            email: 'sales@potatoapparel.com',
            url: `${SITE_URL}/factory`,
            makesOffer: {
              '@type': 'OfferCatalog',
              name: 'Custom Apparel Manufacturing Services',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom T-Shirt Manufacturing' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Hoodie Manufacturing' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Private Label Apparel' } },
              ],
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1741176505800-caaa3a52631a?w=1400&fit=crop&q=85&auto=format)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative container-site max-w-4xl text-center">
          <span className="inline-block bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">Guangzhou, China</span>
          <h1 className="font-display font-bold text-4xl lg:text-6xl mb-6 leading-tight">
            Our Manufacturing Network
          </h1>
          <p className="text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto mb-8">
            We manage a vetted network of specialist garment factories in Guangzhou — matching every product to the facility best equipped to make it, and holding all of them to one quality standard: yours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/request-samples" className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-4 rounded-full transition-colors">
              Request a Sample
            </Link>
            <Link href="/custom-process" className="border border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-full transition-colors">
              See Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* Key Stats — honest service metrics */}
      <section className="py-12 bg-violet-600 text-white">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '50 pcs', label: 'Minimum Order / Style' },
              { value: '7–10 days', label: 'Sample Turnaround' },
              { value: 'AQL 2.5', label: 'Inspection Standard' },
              { value: '30+', label: 'Countries Shipped' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl lg:text-4xl font-bold font-display mb-1">{s.value}</p>
                <p className="text-violet-200 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-20 bg-white">
        <div className="container-site">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              End-to-End Production, Managed by Us
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              From your design file to your warehouse door — we manage every step across our partner network, so you have one point of contact and one quality standard.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="flex gap-5 p-6 border border-gray-100 rounded-2xl hover:border-violet-200 hover:shadow-md transition-all">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center">
                    <Icon size={22} className="text-violet-600" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-violet-500 mb-1">STEP {step}</p>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Capabilities Across Our Network
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The specialist equipment and departments our partner factories bring to every stage of garment production.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((dept) => (
              <div key={dept.category} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">{dept.category}</h3>
                <ul className="space-y-2">
                  {dept.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-violet-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Inspection */}
      <section className="py-20 bg-white">
        <div className="container-site max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Quality Inspection Process
            </h2>
            <p className="text-gray-500 text-lg">AQL 2.5 standard — the same inspection level used by major global retailers, run on every order we manage.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { phase: 'Inline QC', desc: 'Our QC officers inspect the first garments off each line and check throughout the run at the partner factory. Issues are caught and corrected before they multiply.' },
              { phase: 'Semi-Final QC', desc: 'At ~80% completion, a full AQL inspection is conducted. Measurements, stitch density, colour consistency, and embellishment placement are verified against your approved sample.' },
              { phase: 'Final QC & Report', desc: 'Every order ships with a detailed QC report — measurement table, inspection photos, and AQL outcome. Failed units are reworked or replaced before shipment.' },
            ].map((q) => (
              <div key={q.phase} className="bg-violet-50 border border-violet-100 rounded-2xl p-6">
                <ShieldCheck size={28} className="text-violet-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">{q.phase}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Standards */}
      <section className="py-16 bg-gray-950 text-white">
        <div className="container-site max-w-3xl text-center">
          <h2 className="font-display font-bold text-2xl lg:text-3xl mb-8">Standards & Documentation</h2>
          <div className="flex flex-col gap-3 max-w-xl mx-auto text-left">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
                <CheckCircle size={18} className="text-violet-400 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-200">{point}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-6 max-w-lg mx-auto">
            Fabric certifications (e.g. OEKO-TEX Standard 100) are issued to the fabric/mill and supplied per order on request. We are a manufacturing partner managing production across vetted factories, not a single owned facility.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container-site max-w-2xl text-center">
          <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">Ready to Start Your Order?</h2>
          <p className="text-gray-500 mb-8 text-lg">MOQ from 50 pieces. Samples available. Most orders ship within 25–35 days.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-4 rounded-full transition-colors flex items-center gap-2">
              Get a Free Quote <ArrowRight size={16} />
            </Link>
            <Link href="/products" className="border border-gray-200 hover:border-violet-300 text-gray-700 font-semibold px-8 py-4 rounded-full transition-colors">
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      <BottomCTASection />
    </>
  )
}
