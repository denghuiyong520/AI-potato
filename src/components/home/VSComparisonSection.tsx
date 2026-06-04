import { CheckCircle, XCircle } from 'lucide-react'
import { Link } from '@/i18n/navigation'

const rows = [
  { feature: 'Your own silhouette & pattern',    us: true,  pod: false, blank: false },
  { feature: 'Custom woven neck label',           us: true,  pod: false, blank: false },
  { feature: 'Custom hang tag & packaging',       us: true,  pod: 'paid', blank: false },
  { feature: 'Fabric weight you specify (GSM)',   us: true,  pod: false, blank: false },
  { feature: 'MOQ from 50 pcs',                  us: true,  pod: true,  blank: true  },
  { feature: 'No per-unit print setup fees',      us: true,  pod: true,  blank: true  },
  { feature: 'AQL 2.5 quality inspection',        us: true,  pod: false, blank: false },
  { feature: 'Gross margin 65–75%',               us: true,  pod: false, blank: true  },
  { feature: 'Amazon FBA prep included',          us: true,  pod: 'paid', blank: false },
  { feature: 'Samples in 7–10 days',              us: true,  pod: 'instant', blank: false },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true)      return <CheckCircle size={18} className="text-green-500 mx-auto" />
  if (value === false)     return <XCircle size={18} className="text-red-400 mx-auto" />
  if (value === 'paid')    return <span className="text-xs text-amber-600 font-medium">Extra cost</span>
  if (value === 'instant') return <span className="text-xs text-green-600 font-medium">Instant</span>
  return null
}

export default function VSComparisonSection() {
  return (
    <section className="py-20 bg-[var(--bg-surface)]">
      <div className="container-site max-w-4xl">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-violet-600 uppercase tracking-widest">Why Custom Manufacturing</span>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-ink mt-2 mb-3">
            Custom Manufacturing vs. Your Alternatives
          </h2>
          <p className="text-ink-muted max-w-xl mx-auto">
            Most brands start on print-on-demand or blanks. The ones that scale always switch.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-cream-200 shadow-card">
          <table className="w-full text-sm bg-white">
            <thead>
              <tr className="border-b border-cream-200">
                <th className="text-left px-5 py-4 font-semibold text-ink w-1/2">Feature</th>
                <th className="text-center px-4 py-4 bg-violet-600 text-white font-bold rounded-tl-none">
                  <div className="text-xs uppercase tracking-widest opacity-70 mb-0.5">Potato Apparel</div>
                  Custom Mfg
                </th>
                <th className="text-center px-4 py-4 text-gray-500 font-semibold">
                  <div className="text-xs uppercase tracking-widest opacity-60 mb-0.5">Printful</div>
                  Print-on-Demand
                </th>
                <th className="text-center px-4 py-4 text-gray-500 font-semibold">
                  <div className="text-xs uppercase tracking-widest opacity-60 mb-0.5">Gildan / AS Colour</div>
                  Blank Wholesale
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ feature, us, pod, blank }, i) => (
                <tr key={feature} className={i % 2 === 0 ? 'bg-white' : 'bg-cream-50'}>
                  <td className="px-5 py-3.5 text-ink font-medium">{feature}</td>
                  <td className="text-center px-4 py-3.5 bg-violet-50 border-l border-r border-violet-100">
                    <Cell value={us} />
                  </td>
                  <td className="text-center px-4 py-3.5">
                    <Cell value={pod} />
                  </td>
                  <td className="text-center px-4 py-3.5">
                    <Cell value={blank} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Margin comparison */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Potato Apparel', cost: '~$18', retail: '$75', margin: '76%', highlight: true },
            { label: 'Print-on-Demand',  cost: '~$26', retail: '$75', margin: '65%', highlight: false },
            { label: 'Blanks + Print',   cost: '~$12', retail: '$55', margin: '78%', note: 'Generic product', highlight: false },
          ].map(({ label, cost, retail, margin, highlight, note }) => (
            <div key={label} className={`rounded-xl p-4 border text-center ${highlight ? 'bg-violet-600 border-violet-600 text-white' : 'bg-white border-cream-200'}`}>
              <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${highlight ? 'text-violet-200' : 'text-gray-400'}`}>{label}</p>
              <p className={`text-2xl font-display font-bold mb-1 ${highlight ? 'text-white' : 'text-ink'}`}>{margin}</p>
              <p className={`text-xs ${highlight ? 'text-violet-200' : 'text-gray-400'}`}>gross margin</p>
              <div className={`mt-3 pt-3 border-t ${highlight ? 'border-violet-500' : 'border-cream-200'} text-xs ${highlight ? 'text-violet-200' : 'text-gray-400'}`}>
                {cost} cost · {retail} retail{note ? ` · ${note}` : ''}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/request-samples"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-8 py-4 rounded-full transition-colors shadow-md"
          >
            Start with a Free Sample Quote
          </Link>
          <p className="text-xs text-ink-muted mt-3">No commitment · Sample cost credited on bulk order · Reply in 4 hours</p>
        </div>
      </div>
    </section>
  )
}
