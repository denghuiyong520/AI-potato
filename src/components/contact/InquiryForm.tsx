'use client'

import { useState, useRef, useEffect, type DragEvent, type ChangeEvent } from 'react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { Scissors, Upload, X, CheckCircle, AlertCircle, ChevronDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormData {
  name:       string
  email:      string
  phone:      string
  countryIso: string   // ISO code — unique per country (e.g. 'us', 'gb', 'cn')
  budget:     string
  company:    string
  platform:   string
  details:    string
}

interface FormErrors {
  name?:    string
  email?:   string
  details?: string
}

// ── Complete worldwide country dial-code list ─────────────────────────────
// iso: ISO 3166-1 alpha-2 code used by flagcdn.com for flag images
interface Country { code: string; iso: string; name: string }

const ALL_COUNTRIES: Country[] = [
  // Most-used first
  { code: '+1',    iso: 'us', name: 'United States' },
  { code: '+44',   iso: 'gb', name: 'United Kingdom' },
  { code: '+86',   iso: 'cn', name: 'China' },
  { code: '+91',   iso: 'in', name: 'India' },
  { code: '+81',   iso: 'jp', name: 'Japan' },
  { code: '+82',   iso: 'kr', name: 'South Korea' },
  { code: '+61',   iso: 'au', name: 'Australia' },
  { code: '+49',   iso: 'de', name: 'Germany' },
  { code: '+33',   iso: 'fr', name: 'France' },
  { code: '+34',   iso: 'es', name: 'Spain' },
  { code: '+39',   iso: 'it', name: 'Italy' },
  { code: '+55',   iso: 'br', name: 'Brazil' },
  { code: '+52',   iso: 'mx', name: 'Mexico' },
  { code: '+971',  iso: 'ae', name: 'United Arab Emirates' },
  { code: '+966',  iso: 'sa', name: 'Saudi Arabia' },
  { code: '+65',   iso: 'sg', name: 'Singapore' },
  { code: '+60',   iso: 'my', name: 'Malaysia' },
  { code: '+66',   iso: 'th', name: 'Thailand' },
  { code: '+62',   iso: 'id', name: 'Indonesia' },
  { code: '+63',   iso: 'ph', name: 'Philippines' },
  { code: '+84',   iso: 'vn', name: 'Vietnam' },
  { code: '+880',  iso: 'bd', name: 'Bangladesh' },
  { code: '+92',   iso: 'pk', name: 'Pakistan' },
  { code: '+94',   iso: 'lk', name: 'Sri Lanka' },
  { code: '+20',   iso: 'eg', name: 'Egypt' },
  { code: '+27',   iso: 'za', name: 'South Africa' },
  { code: '+234',  iso: 'ng', name: 'Nigeria' },
  { code: '+254',  iso: 'ke', name: 'Kenya' },
  { code: '+212',  iso: 'ma', name: 'Morocco' },
  { code: '+216',  iso: 'tn', name: 'Tunisia' },
  { code: '+213',  iso: 'dz', name: 'Algeria' },
  // ── Europe ──
  { code: '+31',   iso: 'nl', name: 'Netherlands' },
  { code: '+32',   iso: 'be', name: 'Belgium' },
  { code: '+41',   iso: 'ch', name: 'Switzerland' },
  { code: '+43',   iso: 'at', name: 'Austria' },
  { code: '+46',   iso: 'se', name: 'Sweden' },
  { code: '+47',   iso: 'no', name: 'Norway' },
  { code: '+45',   iso: 'dk', name: 'Denmark' },
  { code: '+358',  iso: 'fi', name: 'Finland' },
  { code: '+48',   iso: 'pl', name: 'Poland' },
  { code: '+420',  iso: 'cz', name: 'Czech Republic' },
  { code: '+36',   iso: 'hu', name: 'Hungary' },
  { code: '+40',   iso: 'ro', name: 'Romania' },
  { code: '+30',   iso: 'gr', name: 'Greece' },
  { code: '+351',  iso: 'pt', name: 'Portugal' },
  { code: '+353',  iso: 'ie', name: 'Ireland' },
  { code: '+7',    iso: 'ru', name: 'Russia' },
  { code: '+380',  iso: 'ua', name: 'Ukraine' },
  { code: '+90',   iso: 'tr', name: 'Turkey' },
  { code: '+372',  iso: 'ee', name: 'Estonia' },
  { code: '+371',  iso: 'lv', name: 'Latvia' },
  { code: '+370',  iso: 'lt', name: 'Lithuania' },
  { code: '+421',  iso: 'sk', name: 'Slovakia' },
  { code: '+386',  iso: 'si', name: 'Slovenia' },
  { code: '+385',  iso: 'hr', name: 'Croatia' },
  { code: '+381',  iso: 'rs', name: 'Serbia' },
  { code: '+359',  iso: 'bg', name: 'Bulgaria' },
  { code: '+354',  iso: 'is', name: 'Iceland' },
  { code: '+356',  iso: 'mt', name: 'Malta' },
  { code: '+357',  iso: 'cy', name: 'Cyprus' },
  { code: '+352',  iso: 'lu', name: 'Luxembourg' },
  // ── Americas ──
  { code: '+1',    iso: 'ca', name: 'Canada' },
  { code: '+54',   iso: 'ar', name: 'Argentina' },
  { code: '+56',   iso: 'cl', name: 'Chile' },
  { code: '+57',   iso: 'co', name: 'Colombia' },
  { code: '+51',   iso: 'pe', name: 'Peru' },
  { code: '+58',   iso: 've', name: 'Venezuela' },
  { code: '+593',  iso: 'ec', name: 'Ecuador' },
  { code: '+591',  iso: 'bo', name: 'Bolivia' },
  { code: '+595',  iso: 'py', name: 'Paraguay' },
  { code: '+598',  iso: 'uy', name: 'Uruguay' },
  { code: '+502',  iso: 'gt', name: 'Guatemala' },
  { code: '+506',  iso: 'cr', name: 'Costa Rica' },
  { code: '+507',  iso: 'pa', name: 'Panama' },
  { code: '+1787', iso: 'pr', name: 'Puerto Rico' },
  { code: '+1868', iso: 'tt', name: 'Trinidad and Tobago' },
  { code: '+53',   iso: 'cu', name: 'Cuba' },
  { code: '+1876', iso: 'jm', name: 'Jamaica' },
  { code: '+1809', iso: 'do', name: 'Dominican Republic' },
  // ── Middle East ──
  { code: '+972',  iso: 'il', name: 'Israel' },
  { code: '+98',   iso: 'ir', name: 'Iran' },
  { code: '+964',  iso: 'iq', name: 'Iraq' },
  { code: '+962',  iso: 'jo', name: 'Jordan' },
  { code: '+961',  iso: 'lb', name: 'Lebanon' },
  { code: '+965',  iso: 'kw', name: 'Kuwait' },
  { code: '+968',  iso: 'om', name: 'Oman' },
  { code: '+974',  iso: 'qa', name: 'Qatar' },
  { code: '+973',  iso: 'bh', name: 'Bahrain' },
  { code: '+967',  iso: 'ye', name: 'Yemen' },
  // ── Asia-Pacific ──
  { code: '+64',   iso: 'nz', name: 'New Zealand' },
  { code: '+852',  iso: 'hk', name: 'Hong Kong' },
  { code: '+886',  iso: 'tw', name: 'Taiwan' },
  { code: '+95',   iso: 'mm', name: 'Myanmar' },
  { code: '+855',  iso: 'kh', name: 'Cambodia' },
  { code: '+856',  iso: 'la', name: 'Laos' },
  { code: '+977',  iso: 'np', name: 'Nepal' },
  { code: '+975',  iso: 'bt', name: 'Bhutan' },
  { code: '+960',  iso: 'mv', name: 'Maldives' },
  { code: '+93',   iso: 'af', name: 'Afghanistan' },
  { code: '+998',  iso: 'uz', name: 'Uzbekistan' },
  { code: '+7',    iso: 'kz', name: 'Kazakhstan' },
  { code: '+996',  iso: 'kg', name: 'Kyrgyzstan' },
  { code: '+992',  iso: 'tj', name: 'Tajikistan' },
  { code: '+993',  iso: 'tm', name: 'Turkmenistan' },
  { code: '+994',  iso: 'az', name: 'Azerbaijan' },
  { code: '+374',  iso: 'am', name: 'Armenia' },
  { code: '+995',  iso: 'ge', name: 'Georgia' },
  { code: '+976',  iso: 'mn', name: 'Mongolia' },
  // ── Africa ──
  { code: '+233',  iso: 'gh', name: 'Ghana' },
  { code: '+251',  iso: 'et', name: 'Ethiopia' },
  { code: '+255',  iso: 'tz', name: 'Tanzania' },
  { code: '+256',  iso: 'ug', name: 'Uganda' },
  { code: '+260',  iso: 'zm', name: 'Zambia' },
  { code: '+263',  iso: 'zw', name: 'Zimbabwe' },
  { code: '+237',  iso: 'cm', name: 'Cameroon' },
  { code: '+225',  iso: 'ci', name: "Côte d'Ivoire" },
  { code: '+221',  iso: 'sn', name: 'Senegal' },
  { code: '+223',  iso: 'ml', name: 'Mali' },
  { code: '+230',  iso: 'mu', name: 'Mauritius' },
  { code: '+261',  iso: 'mg', name: 'Madagascar' },
  { code: '+243',  iso: 'cd', name: 'DR Congo' },
  { code: '+244',  iso: 'ao', name: 'Angola' },
  { code: '+258',  iso: 'mz', name: 'Mozambique' },
  { code: '+250',  iso: 'rw', name: 'Rwanda' },
  { code: '+249',  iso: 'sd', name: 'Sudan' },
  { code: '+218',  iso: 'ly', name: 'Libya' },
]

// Render a flag image via flagcdn.com (works on all OS including Windows)
function FlagImg({ iso, size = 20 }: { iso: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w${size}/${iso}.png`}
      srcSet={`https://flagcdn.com/w${size * 2}/${iso}.png 2x`}
      width={size}
      height={Math.round(size * 0.7)}
      alt={iso.toUpperCase()}
      className="rounded-sm object-cover shrink-0"
      style={{ minWidth: size }}
    />
  )
}

export default function InquiryForm() {
  const t = useTranslations('contact.form')
  const searchParams = useSearchParams()

  // Auto-fill details when coming from product page
  const skuParam     = searchParams.get('sku')
  const productParam = searchParams.get('product')
  const autoDetails  = skuParam && productParam
    ? `I'm interested in ${productParam} (SKU: ${skuParam}). Please send me a quote.`
    : ''

  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', countryIso: 'us',
    budget: '', company: '', platform: '', details: autoDetails,
  })

  // Show a pre-fill banner when coming from a product
  const isFromProduct = Boolean(skuParam)
  const [errors,   setErrors]   = useState<FormErrors>({})
  const [files,    setFiles]    = useState<File[]>([])
  const [dragging, setDragging] = useState(false)
  const [status,   setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [codeOpen, setCodeOpen] = useState(false)
  const [search,   setSearch]   = useState('')

  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchRef   = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCodeOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Focus search when dropdown opens
  useEffect(() => {
    if (codeOpen) setTimeout(() => searchRef.current?.focus(), 50)
  }, [codeOpen])

  const filteredCountries = search.trim()
    ? ALL_COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.code.includes(search),
      )
    : ALL_COUNTRIES

  // ── Validation ─────────────────────────────────────────────────────
  function validate(): boolean {
    const errs: FormErrors = {}
    if (!form.name.trim())    errs.name    = t('nameRequired')
    if (!form.email.trim())   errs.email   = t('emailRequired')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t('emailInvalid')
    if (!form.details.trim()) errs.details = t('detailsRequired')
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  // ── Submit ──────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')

    try {
      const res = await fetch('/api/inquiries', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type:         isFromProduct ? 'product' : 'contact',
          name:         form.name,
          email:        form.email,
          phone:        form.phone,
          countryIso:   form.countryIso,
          company:      form.company,
          platform:     form.platform,
          budget:       form.budget,
          message:      form.details,
          productSku:   skuParam     || undefined,
          productTitle: productParam || undefined,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? `HTTP ${res.status}`)
      }

      setStatus('success')
    } catch (err) {
      console.error('Inquiry submit error:', err)
      setStatus('error')
    }
  }

  // ── File handling ───────────────────────────────────────────────────
  function addFiles(incoming: FileList | null) {
    if (!incoming) return
    setFiles((prev) => [...prev, ...Array.from(incoming)].slice(0, 10))
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  function update(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((e) => ({ ...e, [field]: undefined }))
    }
  }

  const selected = ALL_COUNTRIES.find((c) => c.iso === form.countryIso) ?? ALL_COUNTRIES[0]

  // ── Success state ───────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-8">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-5">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className="font-display font-bold text-2xl text-ink mb-3">{t('successTitle')}</h3>
        <p className="text-ink-muted max-w-sm">{t('successText')}</p>
      </div>
    )
  }

  return (
    <div className="relative border-2 border-dashed border-cream-300 rounded-3xl p-8 lg:p-10 bg-white">
      {/* Scissors decoration */}
      <div className="absolute -top-4 right-8 bg-white px-2">
        <Scissors size={20} className="text-violet-400 rotate-45" />
      </div>

      {isFromProduct && (
        <div className="mb-6 flex items-start gap-3 bg-violet-50 border border-violet-100 rounded-xl px-4 py-3">
          <CheckCircle size={16} className="text-violet-500 shrink-0 mt-0.5" />
          <p className="text-sm text-violet-700">
            <span className="font-semibold">Product pre-filled:</span>{' '}
            {productParam} <span className="text-violet-400">(#{skuParam})</span>
          </p>
        </div>
      )}

      <h2 className="font-display font-bold text-center mb-8 text-ink"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
        {t('title')}
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              {t('name')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder={t('namePlaceholder')}
              className={cn('form-input', errors.name && 'form-input-error')}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              {t('email')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder={t('emailPlaceholder')}
              className={cn('form-input', errors.email && 'form-input-error')}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.email}
              </p>
            )}
          </div>

          {/* Phone — full worldwide country picker */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">{t('phone')}</label>
            <div className="flex gap-2">

              {/* Country code button + dropdown */}
              <div ref={dropdownRef} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => { setCodeOpen((o) => !o); setSearch('') }}
                  className="form-input flex items-center gap-2 px-3 justify-between min-w-[96px]"
                >
                  <FlagImg iso={selected.iso} size={20} />
                  <span className="text-xs font-medium text-ink">{selected.code}</span>
                  <ChevronDown
                    size={12}
                    className={cn('text-ink-muted transition-transform ml-0.5', codeOpen && 'rotate-180')}
                  />
                </button>

                {codeOpen && (
                  <div className="absolute top-full left-0 mt-1 z-30 w-72 bg-white border border-cream-200 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden">
                    {/* Search */}
                    <div className="p-2 border-b border-cream-100">
                      <div className="flex items-center gap-2 bg-cream-50 rounded-lg px-3 py-2">
                        <Search size={13} className="text-ink-muted shrink-0" />
                        <input
                          ref={searchRef}
                          type="text"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search country or code…"
                          className="bg-transparent text-sm outline-none flex-1 text-ink placeholder:text-ink-muted"
                        />
                        {search && (
                          <button type="button" onClick={() => setSearch('')}>
                            <X size={12} className="text-ink-muted hover:text-ink" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Country list */}
                    <ul className="max-h-56 overflow-y-auto py-1">
                      {filteredCountries.length === 0 ? (
                        <li className="px-4 py-3 text-sm text-ink-muted text-center">No results</li>
                      ) : (
                        filteredCountries.map((c, i) => (
                          <li key={`${c.code}-${i}`}>
                            <button
                              type="button"
                              onClick={() => {
                                update('countryIso', c.iso)
                                setCodeOpen(false)
                                setSearch('')
                              }}
                              className={cn(
                                'w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-cream-50 transition-colors',
                                c.iso === form.countryIso
                                  ? 'bg-violet-50 text-violet-700'
                                  : 'text-ink',
                              )}
                            >
                              <FlagImg iso={c.iso} size={20} />
                              <span className="flex-1 truncate">{c.name}</span>
                              <span className="text-xs text-ink-muted shrink-0">{c.code}</span>
                            </button>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder={t('phonePlaceholder')}
                className="form-input flex-1"
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">{t('budget')}</label>
            <select
              value={form.budget}
              onChange={(e) => update('budget', e.target.value)}
              className="form-input"
            >
              <option value="">{t('budgetPlaceholder')}</option>
              <option value="under1k">{t('budgetOptions.under1k')}</option>
              <option value="1k5k">{t('budgetOptions.1k5k')}</option>
              <option value="5k20k">{t('budgetOptions.5k20k')}</option>
              <option value="20kPlus">{t('budgetOptions.20kPlus')}</option>
            </select>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">{t('company')}</label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              placeholder={t('companyPlaceholder')}
              className="form-input"
            />
          </div>

          {/* Platform */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">{t('platform')}</label>
            <select
              value={form.platform}
              onChange={(e) => update('platform', e.target.value)}
              className="form-input"
            >
              <option value="">{t('platformPlaceholder')}</option>
              <option value="shopify">{t('platformOptions.shopify')}</option>
              <option value="amazon">{t('platformOptions.amazon')}</option>
              <option value="tiktok">{t('platformOptions.tiktok')}</option>
              <option value="offline">{t('platformOptions.offline')}</option>
              <option value="other">{t('platformOptions.other')}</option>
            </select>
          </div>

          {/* Details — full width */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-ink mb-1.5">
              {t('details')} <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              value={form.details}
              onChange={(e) => update('details', e.target.value)}
              placeholder={t('detailsPlaceholder')}
              className={cn('form-input resize-none', errors.details && 'form-input-error')}
            />
            {errors.details && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.details}
              </p>
            )}
          </div>

          {/* File Upload — full width */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-ink mb-1.5">{t('upload')}</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={cn(
                'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all',
                dragging
                  ? 'border-violet-400 bg-violet-50'
                  : 'border-cream-300 hover:border-violet-300 hover:bg-cream-50',
              )}
            >
              <Upload size={28} className="mx-auto mb-3 text-ink-muted" />
              <p className="text-sm text-ink-muted mb-1">{t('uploadText')}</p>
              <p className="text-xs text-cream-500">{t('uploadHint')}</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e: ChangeEvent<HTMLInputElement>) => addFiles(e.target.files)}
              />
            </div>

            {files.length > 0 && (
              <ul className="mt-3 space-y-2">
                {files.map((file, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between bg-cream-50 border border-cream-200 rounded-lg px-3 py-2"
                  >
                    <span className="text-xs text-ink-muted truncate max-w-[80%]">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-ink-muted hover:text-red-500 transition-colors ml-2 shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm px-10 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {status === 'loading' ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t('submitting')}
              </>
            ) : t('submit')}
          </button>
        </div>

        {status === 'error' && (
          <p className="text-center text-sm text-red-500 mt-4">{t('errorText')}</p>
        )}
      </form>
    </div>
  )
}
