import type { Metadata } from 'next'
import SampleRequestForm from '@/components/leads/SampleRequestForm'
import { CheckCircle, Star, Clock, Package, Shield, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Request Free Samples | Custom Apparel Manufacturer | Potato Apparel',
  description:
    'Request samples from Potato Apparel — custom t-shirts, hoodies, and streetwear. Sample credit on first bulk order. 7-day turnaround. MOQ from 50 pcs.',
  openGraph: {
    title: 'Request Custom Apparel Samples — Free Credit on First Bulk Order',
    description:
      'Get physical samples of our custom t-shirts, hoodies, and streetwear in 7–10 days. Sample cost credited against your first bulk order.',
  },
}

const trustSignals = [
  { icon: Clock,    text: 'Samples in 7–10 days' },
  { icon: Package,  text: 'MOQ from 50 pcs' },
  { icon: Shield,   text: 'AQL 2.5 quality guaranteed' },
  { icon: CheckCircle, text: 'Sample cost credited on bulk' },
]

const recentActivity = [
  { brand: 'Streetwear brand (Los Angeles)', action: 'Requested hoodie samples', time: '2h ago' },
  { brand: 'Fitness brand (London)',          action: 'Placed first bulk order',  time: '5h ago' },
  { brand: 'DTC brand (Sydney)',              action: 'Requested t-shirt samples', time: '8h ago' },
  { brand: 'Amazon seller (Toronto)',         action: 'Started production run',    time: '1d ago' },
]

const testimonials = [
  {
    text: 'Samples arrived in 9 days, exactly as spec. We placed a 200-unit bulk order the same week.',
    name: 'James O.',
    role: 'Streetwear Brand Founder',
    country: 'UK',
    stars: 5,
  },
  {
    text: 'The sample credit made it risk-free to test quality. Our hoodies retail at $95 and customers love them.',
    name: 'Sarah M.',
    role: 'DTC Brand Owner',
    country: 'USA',
    stars: 5,
  },
  {
    text: 'We were using Printify. After seeing the sample quality difference, we switched entirely to custom manufacturing.',
    name: 'Lena K.',
    role: 'Shopify Store Owner',
    country: 'Germany',
    stars: 5,
  },
]

export default function RequestSamplesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Custom Apparel Samples',
            description: 'Pre-production samples for custom t-shirts, hoodies, and apparel. 7-10 day turnaround.',
            brand: { '@type': 'Brand', name: 'Potato Apparel' },
            offers: {
              '@type': 'Offer',
              price: '50',
              priceCurrency: 'USD',
              description: 'Sample fee credited against first bulk order of 200+ pieces',
            },
          }),
        }}
      />

      <div className="min-h-screen bg-[#f7f7f5]">
        {/* Hero strip */}
        <section className="bg-gray-950 text-white pt-28 pb-12 lg:pt-36 lg:pb-16">
          <div className="container-site max-w-5xl">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                ● Now accepting samples
              </span>
              <span className="text-gray-400 text-sm">Avg. response time: under 4 hours</span>
            </div>
            <h1 className="font-display font-bold text-3xl lg:text-5xl leading-tight mb-4 max-w-3xl">
              See the Quality Before You Commit. <span className="text-violet-400">Request Samples Today.</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mb-8">
              Custom t-shirts, hoodies, streetwear, and activewear — physical samples in your hands within 7–10 days. Sample cost credited against your first bulk order.
            </p>
            <div className="flex flex-wrap gap-4">
              {trustSignals.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm text-white/80">
                  <Icon size={13} className="text-violet-400" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main content: form + social proof */}
        <section className="py-12 lg:py-16">
          <div className="container-site max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

              {/* Form — 3 cols */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-3xl shadow-card border border-cream-200 overflow-hidden">
                  <div className="bg-violet-600 px-8 py-5">
                    <h2 className="font-display font-bold text-xl text-white">Request Your Samples</h2>
                    <p className="text-violet-200 text-sm mt-1">Fill in below — we reply within 4 hours with a sample quote.</p>
                  </div>
                  <div className="p-8">
                    <SampleRequestForm />
                  </div>
                </div>

                {/* Reassurance below form */}
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> No spam, ever</span>
                  <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> No commitment to bulk</span>
                  <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> Reply within 4 hours</span>
                  <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> NDA available on request</span>
                </div>
              </div>

              {/* Social proof — 2 cols */}
              <div className="lg:col-span-2 space-y-5">

                {/* Live activity feed */}
                <div className="bg-white rounded-2xl border border-cream-200 p-5">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Recent Activity</p>
                  <div className="space-y-3">
                    {recentActivity.map(({ brand, action, time }) => (
                      <div key={brand} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <Package size={13} className="text-violet-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{brand}</p>
                          <p className="text-xs text-gray-500">{action} · <span className="text-violet-500">{time}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonials */}
                <div className="space-y-3">
                  {testimonials.map(({ text, name, role, country, stars }) => (
                    <div key={name} className="bg-white rounded-2xl border border-cream-200 p-5">
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: stars }).map((_, i) => (
                          <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-3">&ldquo;{text}&rdquo;</p>
                      <p className="text-xs font-semibold text-gray-900">{name}</p>
                      <p className="text-xs text-gray-400">{role} · {country}</p>
                    </div>
                  ))}
                </div>

                {/* Factory photo */}
                <div className="relative rounded-2xl overflow-hidden aspect-video">
                  <Image
                    src="https://images.unsplash.com/photo-1593250816874-8edf4f732edb?w=600&h=340&fit=crop&q=80&auto=format"
                    alt="Potato Apparel — fabric and textile quality close-up"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent flex items-end p-4">
                    <div>
                      <p className="text-white font-semibold text-sm">15,000 m² Factory</p>
                      <p className="text-gray-300 text-xs">Guangzhou, China · 300+ workers</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Process strip */}
        <section className="py-12 bg-white border-t border-cream-200">
          <div className="container-site max-w-4xl">
            <h2 className="font-display font-bold text-2xl text-gray-900 text-center mb-8">
              What Happens After You Submit
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { step: '1', title: 'We Reply', desc: 'Within 4 hours with a sample quote', color: 'bg-violet-600' },
                { step: '2', title: 'You Approve', desc: 'Confirm specs, pay sample fee', color: 'bg-violet-600' },
                { step: '3', title: 'We Build', desc: 'Sample made in 7–10 days', color: 'bg-violet-600' },
                { step: '4', title: 'You Receive', desc: 'Review quality, approve bulk', color: 'bg-green-500' },
              ].map(({ step, title, desc, color }) => (
                <div key={step} className="text-center">
                  <div className={`w-10 h-10 ${color} text-white font-bold rounded-full flex items-center justify-center mx-auto mb-3 text-lg`}>
                    {step}
                  </div>
                  <p className="font-bold text-gray-900 text-sm mb-1">{title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alternative CTA */}
        <section className="py-10 bg-[#f7f7f5]">
          <div className="container-site max-w-xl text-center">
            <p className="text-gray-500 text-sm mb-4">Prefer to talk first?</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://wa.me/447907131539?text=Hi!%20I%27d%20like%20to%20request%20samples%20for%20my%20clothing%20brand."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#22be5c] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us Now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-semibold text-sm px-6 py-3 rounded-full hover:border-violet-400 hover:text-violet-700 transition-colors"
              >
                Full Inquiry Form <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
