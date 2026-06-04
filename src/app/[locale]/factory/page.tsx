import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { CheckCircle, Factory, Layers, Settings, ShieldCheck, Zap, ArrowRight } from 'lucide-react'
import BottomCTASection from '@/components/home/BottomCTASection'

export const metadata: Metadata = {
  title: 'Our Factory | Custom Apparel Manufacturing Facility | Potato Apparel',
  description: 'Tour our 15,000 m² apparel manufacturing facility in Guangzhou, China. 200+ machines, 300+ skilled workers, ISO-certified quality control. Custom t-shirts, hoodies, and streetwear at scale.',
  openGraph: {
    title: 'Apparel Manufacturing Factory | Potato Apparel',
    description: 'See inside our Guangzhou factory — 15,000 m², 300+ workers, ISO quality control. OEM & ODM manufacturing for global brands.',
    images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop', width: 1200, height: 630 }],
  },
}

const steps = [
  { step: '01', title: 'Design Review & Tech Pack', desc: 'Our technical team reviews your design files, suggests improvements, and creates a detailed tech pack covering measurements, materials, construction methods, and finish specifications.', icon: Layers },
  { step: '02', title: 'Material Sourcing', desc: 'We source fabrics from certified mills — ring-spun cotton, French terry, polyester blends, and performance fabrics — ensuring every roll meets our GSM and quality standards before cutting begins.', icon: Settings },
  { step: '03', title: 'Pattern Making & Sampling', desc: 'Our pattern makers cut and construct your prototype. We typically deliver first samples within 7–10 business days. You review and approve before we proceed to bulk production.', icon: CheckCircle },
  { step: '04', title: 'Bulk Cutting', desc: 'Industrial precision cutters handle up to 200 layers of fabric simultaneously. Our CAD nesting software minimises waste while maintaining dimensional accuracy to ±0.5 cm.', icon: Factory },
  { step: '05', title: 'Sewing & Construction', desc: '300+ skilled sewers working on Brother and Juki industrial machines complete assembly. Each garment passes through multiple workstations for collar attachment, side seaming, hemming, and finishing.', icon: Zap },
  { step: '06', title: 'Printing & Embroidery', desc: 'In-house decoration includes screen printing (up to 12 colours), DTG printing, embroidery (up to 15 threads), heat transfer, woven patches, and puff printing. Zero outsourcing means full quality control.', icon: Settings },
  { step: '07', title: 'Quality Inspection (AQL 2.5)', desc: 'Every production run undergoes AQL 2.5 inspection. Our QC team checks measurements, stitch density, colour fastness, seam strength, and print alignment on 100% of samples in the final batch.', icon: ShieldCheck },
  { step: '08', title: 'Finishing & Packing', desc: 'Garments are steamed, folded, and packed to your specification — polybag per piece, hang tags, woven labels, size stickers, and custom retail packaging all handled in-house.', icon: CheckCircle },
]

const equipment = [
  { category: 'Cutting Department', items: ['Gerber automatic cutting machines ×4', 'Band knife cutters ×8', 'Spreading machines ×6', 'CAD pattern software (Lectra)'] },
  { category: 'Sewing Department', items: ['Juki DDL lockstitch machines ×120', 'Brother overlock machines ×60', 'Flatlock machines ×30', 'Bartack & buttonhole machines ×20'] },
  { category: 'Printing Department', items: ['Anatol 8-colour screen printing carousels ×4', 'DTG printers (Epson SureColor) ×6', 'Discharge & water-based ink stations', 'Heat press machines ×12'] },
  { category: 'Embroidery Department', items: ['12-head Barudan embroidery machines ×8', 'Up to 15-colour thread capability', 'Digitising software (Wilcom EmbroideryStudio)', 'Backing & topping materials in stock'] },
  { category: 'QC & Lab', items: ['Crockmeter (colour fastness testing)', 'GSM balance scales', 'Seam strength testing machine', 'Light box for colour matching (D65 standard)'] },
  { category: 'Finishing & Packing', items: ['Steam pressing tunnel ×2', 'Automatic polybagging machine', 'Hang tag & labelling stations', 'Carton sealing & palletising area'] },
]

const certifications = [
  'ISO 9001:2015 Quality Management',
  'OEKO-TEX Standard 100 (fabric suppliers)',
  'BSCI Social Compliance Audit',
  'SGS Factory Audit Certified',
  'GRS (Global Recycled Standard) available on request',
]

export default function FactoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ManufacturingBusiness',
            name: 'Potato Apparel Factory',
            description: 'Custom apparel manufacturing facility in Guangzhou, China. 15,000 m², 300+ workers.',
            address: { '@type': 'PostalAddress', addressLocality: 'Guangzhou', addressRegion: 'Guangdong', addressCountry: 'CN' },
            telephone: '+44-7907-131539',
            email: 'sales@potatoapparel.com',
            url: 'https://potatoapparel.com/factory',
            numberOfEmployees: { '@type': 'QuantitativeValue', value: 350 },
            hasOfferCatalog: {
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
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative container-site max-w-4xl text-center">
          <span className="inline-block bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">Guangzhou, China</span>
          <h1 className="font-display font-bold text-4xl lg:text-6xl mb-6 leading-tight">
            Our Manufacturing Facility
          </h1>
          <p className="text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto mb-8">
            15,000 m² of precision apparel manufacturing. 300+ skilled workers. Full vertical production from fabric to finished garment — under one roof.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-4 rounded-full transition-colors">
              Request Factory Audit
            </Link>
            <Link href="/custom-process" className="border border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-full transition-colors">
              See Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 bg-violet-600 text-white">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '15,000 m²', label: 'Factory Floor Space' },
              { value: '300+', label: 'Skilled Workers' },
              { value: '500K+', label: 'Units / Month Capacity' },
              { value: '12+', label: 'Years of Operation' },
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
              End-to-End Production Process
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              From your design file to your warehouse door — every step managed in-house for complete quality control.
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

      {/* Equipment */}
      <section className="py-20 bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Workshop & Equipment Overview
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Industrial-grade machines and specialised departments for every stage of garment production.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((dept) => (
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
            <p className="text-gray-500 text-lg">AQL 2.5 standard — the same inspection level used by major global retailers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { phase: 'Inline QC', desc: 'QC officers inspect the first 10 garments off each production line and check every 50th piece throughout production. Issues are caught and corrected before they multiply.' },
              { phase: 'Semi-Final QC', desc: 'At 80% completion, a full AQL inspection is conducted. Measurements, stitch density, colour consistency, and embellishment placement are all verified against your approved sample.' },
              { phase: 'Final QC & Report', desc: 'Every order ships with a detailed QC report including measurement table, photos of inspection results, and AQL outcome. Failed units are reworked or replaced before shipment.' },
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

      {/* Certifications */}
      <section className="py-16 bg-gray-950 text-white">
        <div className="container-site max-w-3xl text-center">
          <h2 className="font-display font-bold text-2xl lg:text-3xl mb-8">Certifications & Compliance</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {certifications.map((cert) => (
              <span key={cert} className="bg-white/10 border border-white/20 text-sm px-4 py-2 rounded-full">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container-site max-w-2xl text-center">
          <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">Ready to Start Your Order?</h2>
          <p className="text-gray-500 mb-8 text-lg">MOQ from 50 pieces. Free samples available. Most orders ship within 25–30 days.</p>
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
