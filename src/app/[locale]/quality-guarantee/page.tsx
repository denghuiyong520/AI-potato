import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { ShieldCheck, CheckCircle, ArrowRight, Award, FileText, RefreshCw, AlertCircle, Microscope } from 'lucide-react'
import BottomCTASection from '@/components/home/BottomCTASection'
import { buildAlternates } from '@/lib/seo'

const baseMetadata: Metadata = {
  title: 'Quality Guarantee | AQL 2.5 Inspection | Potato Apparel',
  description:
    'Every Potato Apparel order ships with an AQL 2.5 quality inspection report. 3-stage QC, photo evidence, and a written guarantee against defects. Learn exactly what we promise.',
  keywords: [
    'clothing manufacturer quality guarantee',
    'apparel quality control',
    'AQL inspection clothing',
    'custom clothing quality assurance',
    'OEM apparel quality standard',
  ],
  openGraph: {
    title: 'Quality Guarantee | Potato Apparel Manufacturing',
    description:
      'AQL 2.5 standard. 3-stage QC. Full inspection report with every order. If your garments don\'t match the approved sample, we rework or refund.',
    images: [
      {
        // grQh_x_vZKM — person inspecting/fixing machine, quality-control vibe
        url:    'https://images.unsplash.com/photo-1607718330023-64d147bac374?w=1200&h=630&fit=crop&q=85&auto=format',
        width:  1200,
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
  return { ...baseMetadata, alternates: buildAlternates(locale, '/quality-guarantee') }
}

const qcStages = [
  {
    stage: '01',
    name: 'Inline QC',
    timing: 'During production',
    icon: Microscope,
    description:
      'Our QC officers inspect the first 10 garments off each production line and check every 50th piece throughout the manufacturing run. Issues are identified and corrected immediately — before they multiply across the batch.',
    checks: [
      'First article inspection against Golden Sample',
      'Stitch density and seam quality',
      'Fabric consistency and GSM verification',
      'Print alignment and colour accuracy',
      'Label placement and attachment',
    ],
  },
  {
    stage: '02',
    name: 'Semi-Final QC',
    timing: 'At 80% production completion',
    icon: CheckCircle,
    description:
      'A full AQL inspection is conducted when 80% of the order is complete. We measure a statistically significant sample against your approved tech pack specifications. Any issues found are corrected before the remaining 20% is produced.',
    checks: [
      'Full measurement table vs. tech pack specs',
      'Colour consistency across the batch',
      'Embellishment placement accuracy (print, embroidery)',
      'Trim and hardware quality (zippers, buttons, snaps)',
      'Construction integrity (seams, hems, bartacks)',
    ],
  },
  {
    stage: '03',
    name: 'Final QC & Report',
    timing: 'Before packing and shipment',
    icon: FileText,
    description:
      'The complete final inspection follows AQL 2.5 — the same standard used by major global retailers including Target, H&M, and Zara. You receive a full written QC report before your balance payment is due.',
    checks: [
      'AQL 2.5 pass/fail determination',
      'Measurement table (all size grades)',
      'Photo documentation of each inspection point',
      'Colour fastness verification',
      'Final count vs. order quantity confirmation',
    ],
  },
]

const certifications = [
  {
    name: 'ISO 9001:2015',
    desc: 'International quality management standard covering our entire production process.',
  },
  {
    name: 'OEKO-TEX Standard 100',
    desc: 'Certifies that fabric inputs are free from harmful substances. Available for all cotton and natural fibre products.',
  },
  {
    name: 'BSCI Social Compliance',
    desc: 'Business Social Compliance Initiative audit confirming ethical working conditions in our facility.',
  },
  {
    name: 'SGS Factory Audit',
    desc: 'Third-party verification of our manufacturing capabilities and quality systems.',
  },
  {
    name: 'GRS (Global Recycled Standard)',
    desc: 'Available on request for recycled polyester and sustainable material orders.',
  },
]

const guaranteeTerms = [
  {
    icon: ShieldCheck,
    title: 'Defect-Free Guarantee',
    desc: 'Every shipped unit is inspected against your approved Golden Sample. We guarantee garments match the approved specifications for construction, measurements (±0.5 cm tolerance), colour, and embellishments.',
  },
  {
    icon: RefreshCw,
    title: 'Rework or Refund Policy',
    desc: 'If you receive items that do not conform to your approved sample specifications, contact us within 14 days of delivery with photos. We will rework, remanufacture, or provide a refund for confirmed non-conforming pieces — at our cost.',
  },
  {
    icon: FileText,
    title: 'QC Report with Every Order',
    desc: 'You receive a complete QC report before your balance payment, including measurement tables, inspection photos, AQL outcome, and any corrective actions taken. No surprises after delivery.',
  },
  {
    icon: Award,
    title: 'Golden Sample Reference',
    desc: 'Your approved pre-production sample is kept on file throughout your order lifetime. It serves as the binding quality reference for all production and inspection. We do not deviate from it without your explicit approval.',
  },
]

const thirdPartyTesting = [
  { test: 'CPSC Compliance (USA)', standard: 'Consumer Product Safety Improvement Act' },
  { test: 'REACH Compliance (EU)', standard: 'Restriction of Hazardous Substances' },
  { test: 'EN71 Toy Safety', standard: 'For children\'s apparel' },
  { test: 'CA Prop 65 (California)', standard: 'Chemical exposure warning compliance' },
  { test: 'Colorfastness Testing', standard: 'ISO 105 / AATCC standards' },
  { test: 'Pilling Resistance', standard: 'ISO 12945 / ASTM standards' },
  { test: 'Tensile & Seam Strength', standard: 'ISO 13934 / ASTM D1683' },
  { test: 'GSM Verification', standard: 'ISO 3801 fabric weight standard' },
]

export default function QualityGuaranteePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Quality Guarantee | Potato Apparel',
            description:
              'AQL 2.5 quality inspection on every order. 3-stage QC process with photo documentation.',
            url: 'https://potatoapparel.com/en/quality-guarantee',
          }),
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gray-950 text-white">
        <div className="container-site max-w-4xl text-center">
          <span className="inline-block bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            AQL 2.5 Standard
          </span>
          <h1 className="font-display font-bold text-4xl lg:text-5xl mb-5 leading-tight">
            Our Quality Guarantee
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We stand behind every garment we manufacture. AQL 2.5 inspection on every bulk order, full QC report before you pay the balance, and a written guarantee against defects.
          </p>
        </div>
      </section>

      {/* Core guarantee tiles */}
      <section className="py-20 bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              What We Guarantee
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our quality commitment in writing — not just a promise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guaranteeTerms.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-5 p-6 border border-gray-100 rounded-2xl hover:border-violet-200 hover:shadow-sm transition-all">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center">
                    <Icon size={22} className="text-violet-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Stage QC Process */}
      <section className="py-20 bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              3-Stage Quality Inspection
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Every production run undergoes three separate inspection stages — inline, semi-final, and final. Defects are caught and corrected before they reach you.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {qcStages.map(({ stage, name, timing, icon: Icon, description, checks }) => (
              <div key={stage} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="bg-violet-600 px-6 py-4 flex items-center gap-3">
                  <Icon size={20} className="text-white" />
                  <div>
                    <p className="text-violet-200 text-xs font-bold uppercase tracking-wide">Stage {stage}</p>
                    <h3 className="text-white font-bold">{name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full mb-4 inline-block">
                    {timing}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
                  <ul className="space-y-2">
                    {checks.map((check) => (
                      <li key={check} className="flex items-start gap-2 text-sm text-gray-500">
                        <CheckCircle size={13} className="text-violet-400 shrink-0 mt-0.5" />
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's in the QC report */}
      <section className="py-16 bg-white">
        <div className="container-site max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-gray-900 mb-3">
              Your QC Report Includes
            </h2>
            <p className="text-gray-500">
              Sent to you before balance payment — full transparency before the shipment leaves.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Measurement table (all sizes vs. approved spec)',
              'Photo of each defect category found',
              'AQL 2.5 pass/fail determination',
              'Corrective action log (reworked units)',
              'Colour assessment photos under D65 light',
              'Print and embroidery alignment photos',
              'Final quantity confirmation',
              'Signed inspector signature and date',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <CheckCircle size={16} className="text-violet-500 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-950 text-white">
        <div className="container-site max-w-4xl">
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-center mb-10">
            Certifications &amp; Compliance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map(({ name, desc }) => (
              <div key={name} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <Award size={18} className="text-violet-400 mb-2" />
                <h3 className="font-bold text-white text-sm mb-1">{name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Third-party testing */}
      <section className="py-16 bg-white">
        <div className="container-site max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-gray-900 mb-3">
              Third-Party Lab Testing Available
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              We can arrange independent lab testing through SGS, Bureau Veritas, or Intertek for compliance and market entry requirements. Testing fees are additional and quoted per garment category.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {thirdPartyTesting.map(({ test, standard }) => (
              <div key={test} className="flex items-start gap-3 p-4 border border-gray-100 rounded-xl">
                <AlertCircle size={15} className="text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{test}</p>
                  <p className="text-gray-500 text-xs">{standard}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dispute process */}
      <section className="py-16 bg-violet-50">
        <div className="container-site max-w-3xl">
          <div className="bg-white rounded-2xl p-8 border border-violet-100">
            <ShieldCheck size={32} className="text-violet-600 mb-4" />
            <h2 className="font-display font-bold text-2xl text-gray-900 mb-3">
              How to Make a Quality Claim
            </h2>
            <p className="text-gray-600 mb-6">
              If you believe your order does not meet the approved specifications, here is how to proceed:
            </p>
            <ol className="space-y-3">
              {[
                'Contact your account manager within 14 days of receiving the order.',
                'Provide clear photos of the non-conforming garments alongside the approved sample.',
                'Our QC team reviews within 48 hours and determines responsibility.',
                'Confirmed defects: we rework, remanufacture, or refund — at our cost.',
                'Measurement variation within ±0.5 cm and slight colour variation across dye lots are considered within industry tolerance.',
              ].map((step, i) => (
                <li key={i} className="flex gap-4 text-sm text-gray-600">
                  <span className="w-6 h-6 bg-violet-600 text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="container-site max-w-2xl text-center">
          <h2 className="font-display font-bold text-3xl mb-4">
            Ready to Order with Confidence?
          </h2>
          <p className="text-gray-400 mb-8">
            Start with a sample — see our quality for yourself before committing to bulk production.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-4 rounded-full transition-colors flex items-center gap-2"
            >
              Request a Sample <ArrowRight size={16} />
            </Link>
            <Link
              href="/factory"
              className="border border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-full transition-colors"
            >
              Tour Our Factory
            </Link>
          </div>
        </div>
      </section>

      <BottomCTASection />
    </>
  )
}
