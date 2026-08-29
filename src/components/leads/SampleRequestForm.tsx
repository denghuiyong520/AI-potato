'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackLead } from '@/lib/gtag'

const GARMENT_OPTIONS = [
  'T-Shirts / Tees',
  'Hoodies / Sweatshirts',
  'Joggers / Sweatpants',
  'Polo Shirts',
  'Activewear',
  'Streetwear / Oversized',
  'Jackets / Outerwear',
  'Other',
]

interface FormState {
  name: string
  email: string
  whatsapp: string
  garments: string[]
  quantity: string
  message: string
}

export default function SampleRequestForm() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', whatsapp: '', garments: [], quantity: '', message: '',
  })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [honeypot, setHoneypot] = useState('') // anti-bot trap — see hidden input below

  function toggleGarment(g: string) {
    setForm((f) => ({
      ...f,
      garments: f.garments.includes(g)
        ? f.garments.filter((x) => x !== g)
        : [...f.garments, g],
    }))
  }

  function validate() {
    const errs: Partial<FormState> = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')

    try {
      const message = [
        `Sample Request`,
        `Garments: ${form.garments.join(', ') || 'Not specified'}`,
        `Quantity: ${form.quantity || 'Not specified'}`,
        form.message ? `Notes: ${form.message}` : '',
        form.whatsapp ? `WhatsApp: ${form.whatsapp}` : '',
      ].filter(Boolean).join('\n')

      const fd = new FormData()
      fd.set('type', 'sample_request')
      fd.set('name', form.name)
      fd.set('email', form.email)
      fd.set('phone', form.whatsapp)
      fd.set('whatsapp', form.whatsapp)
      fd.set('quantity', form.quantity)
      fd.set('message', message)
      fd.set('company_website', honeypot) // honeypot

      const res = await fetch('/api/inquiries', { method: 'POST', body: fd })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? 'Submit failed')
      }
      trackLead({ type: 'sample_request' })
      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : '')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10 px-4">
        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-green-500" />
        </div>
        <h3 className="font-display font-bold text-xl text-gray-900 mb-2">Sample Request Received!</h3>
        <p className="text-gray-500 text-sm max-w-xs mx-auto">
          We&apos;ll reply within 4 hours with your sample quote. Check your email and WhatsApp.
        </p>
        <div className="mt-6 p-4 bg-violet-50 rounded-xl text-sm text-violet-700">
          <p className="font-semibold mb-1">What&apos;s next:</p>
          <ol className="text-left space-y-1 text-xs">
            <li>1. We reply with sample pricing and options</li>
            <li>2. You approve specs and pay sample fee</li>
            <li>3. Sample ready in 7–10 days</li>
            <li>4. Sample cost credited on bulk order</li>
          </ol>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — invisible to real visitors, bots that auto-fill every field trip it */}
      <input
        type="text"
        name="company_website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />
      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="e.g. Alex Johnson"
          className={cn(
            'w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400 transition-shadow',
            errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white',
          )}
        />
        {errors.name && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="you@yourbrand.com"
          className={cn(
            'w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400 transition-shadow',
            errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white',
          )}
        />
        {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.email}</p>}
      </div>

      {/* WhatsApp */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
          WhatsApp Number <span className="text-gray-400 font-normal">(optional — faster replies)</span>
        </label>
        <input
          type="tel"
          value={form.whatsapp}
          onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
          placeholder="+1 555 000 1234"
          className="w-full border border-gray-200 bg-gray-50 focus:bg-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400 transition-shadow"
        />
      </div>

      {/* Garment type selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          What do you need? <span className="text-gray-400 font-normal">(select all that apply)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {GARMENT_OPTIONS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => toggleGarment(g)}
              className={cn(
                'text-xs font-medium px-3 py-1.5 rounded-full border transition-all',
                form.garments.includes(g)
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-700',
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity range */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
          Estimated Order Quantity
        </label>
        <select
          value={form.quantity}
          onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
          className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400 transition-shadow"
        >
          <option value="">Select quantity range</option>
          <option value="50-100">50–100 pieces (Startup)</option>
          <option value="100-300">100–300 pieces (Small brand)</option>
          <option value="300-500">300–500 pieces (Growing brand)</option>
          <option value="500-1000">500–1,000 pieces (Established)</option>
          <option value="1000+">1,000+ pieces (Scale)</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>

      {/* Optional message */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
          Brief notes <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          rows={2}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="e.g. 380gsm oversized hoodie, screen print on chest. Or: I'll share a reference image on WhatsApp."
          className="w-full border border-gray-200 bg-gray-50 focus:bg-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400 transition-shadow resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-bold text-sm px-6 py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
      >
        {status === 'loading' ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          <>Request My Samples <ArrowRight size={16} /></>
        )}
      </button>

      {status === 'error' && (
        <p className="text-center text-sm text-red-500">
          {errorMsg || 'Unable to send your inquiry. Please try again or contact us directly at sales@potatoapparel.com.'}{' '}
          <a href="https://wa.me/447907131539" className="underline">WhatsApp us directly</a>.
        </p>
      )}

      <p className="text-center text-xs text-gray-400">
        🔒 Your details are private. We never share or spam. Reply in &lt;4 hours.
      </p>
    </form>
  )
}
