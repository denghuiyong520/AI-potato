'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'

interface Row {
  key: string
  label: string
  value: string
  highlight?: boolean
  good?: boolean | null
}

function num(v: string): number {
  const n = parseFloat(v)
  return Number.isFinite(n) ? n : 0
}

function money(n: number): string {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function CostCalculator() {
  const t = useTranslations('tools.calc')

  // Inputs (strings so fields can be cleared)
  const [unitCost, setUnitCost] = useState('12.00')
  const [qty, setQty]           = useState('100')
  const [freight, setFreight]   = useState('1.50')
  const [duty, setDuty]         = useState('12')
  const [otherFee, setOtherFee] = useState('0.50')
  const [retail, setRetail]     = useState('45.00')

  const r = useMemo(() => {
    const exFactory = num(unitCost)
    const quantity  = Math.max(0, Math.round(num(qty)))
    const frPerUnit = num(freight)
    const dutyPct   = num(duty)
    const other     = num(otherFee)
    const price     = num(retail)

    // Landed cost per unit = ex-factory + duty on ex-factory + freight + other
    const dutyPerUnit = exFactory * (dutyPct / 100)
    const landedUnit  = exFactory + dutyPerUnit + frPerUnit + other

    const totalOrder  = landedUnit * quantity
    const profitUnit  = price - landedUnit
    const marginPct   = price > 0 ? (profitUnit / price) * 100 : 0
    const markup      = landedUnit > 0 ? price / landedUnit : 0
    const totalProfit = profitUnit * quantity

    return { landedUnit, totalOrder, profitUnit, marginPct, markup, totalProfit, quantity, price }
  }, [unitCost, qty, freight, duty, otherFee, retail])

  const marginGood = r.marginPct >= 50 ? true : r.marginPct >= 35 ? null : false

  const rows: Row[] = [
    { key: 'landed',      label: t('out.landed'),      value: money(r.landedUnit) },
    { key: 'profitUnit',  label: t('out.profitUnit'),  value: money(r.profitUnit), good: r.profitUnit > 0 ? true : false },
    { key: 'margin',      label: t('out.margin'),      value: r.marginPct.toFixed(1) + '%', highlight: true, good: marginGood },
    { key: 'markup',      label: t('out.markup'),      value: r.markup.toFixed(2) + '×' },
    { key: 'totalOrder',  label: t('out.totalOrder'),  value: money(r.totalOrder) },
    { key: 'totalProfit', label: t('out.totalProfit'), value: money(r.totalProfit), good: r.totalProfit > 0 ? true : false },
  ]

  const fields: Array<{ id: string; label: string; hint?: string; value: string; set: (v: string) => void; prefix?: string; suffix?: string }> = [
    { id: 'unitCost', label: t('in.unitCost'), hint: t('in.unitCostHint'), value: unitCost, set: setUnitCost, prefix: '$' },
    { id: 'qty',      label: t('in.qty'),      hint: t('in.qtyHint'),      value: qty,      set: setQty },
    { id: 'freight',  label: t('in.freight'),  hint: t('in.freightHint'),  value: freight,  set: setFreight, prefix: '$' },
    { id: 'duty',     label: t('in.duty'),     hint: t('in.dutyHint'),     value: duty,     set: setDuty,    suffix: '%' },
    { id: 'otherFee', label: t('in.otherFee'), hint: t('in.otherFeeHint'), value: otherFee, set: setOtherFee, prefix: '$' },
    { id: 'retail',   label: t('in.retail'),   hint: t('in.retailHint'),   value: retail,   set: setRetail,  prefix: '$' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-8 items-start">
      {/* ── Inputs ──────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-cream-200 p-6 lg:p-7 shadow-card">
        <h2 className="font-display font-bold text-lg text-ink mb-5">{t('inputsTitle')}</h2>
        <div className="space-y-4">
          {fields.map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="block text-sm font-semibold text-ink mb-1">
                {f.label}
              </label>
              <div className="relative">
                {f.prefix && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm pointer-events-none">{f.prefix}</span>
                )}
                <input
                  id={f.id}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  className={`w-full rounded-lg border border-cream-300 bg-cream-50 focus:bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none py-2.5 text-sm text-ink transition-colors ${f.prefix ? 'pl-7' : 'pl-3'} ${f.suffix ? 'pr-8' : 'pr-3'}`}
                />
                {f.suffix && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm pointer-events-none">{f.suffix}</span>
                )}
              </div>
              {f.hint && <p className="text-[11px] text-ink-muted mt-1">{f.hint}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Results ─────────────────────────────────────────────────────────── */}
      <div className="lg:sticky lg:top-28">
        <div className="bg-ink rounded-2xl p-6 lg:p-7 text-white">
          <h2 className="font-display font-bold text-lg text-cream-100 mb-5">{t('resultsTitle')}</h2>
          <div className="space-y-1">
            {rows.map((row) => (
              <div
                key={row.key}
                className={`flex items-center justify-between gap-4 py-3 ${row.highlight ? 'border-y border-white/15 my-1' : 'border-b border-white/5'}`}
              >
                <span className={`text-sm ${row.highlight ? 'font-semibold text-cream-100' : 'text-cream-400'}`}>
                  {row.label}
                </span>
                <span
                  className={`font-bold tabular-nums ${row.highlight ? 'text-2xl' : 'text-base'} ${
                    row.good === true ? 'text-green-400' : row.good === false ? 'text-red-400' : row.highlight ? 'text-white' : 'text-cream-100'
                  }`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Margin verdict */}
          <div className="mt-5 rounded-xl bg-white/5 p-4">
            <p className="text-xs text-cream-400 leading-relaxed">
              {marginGood === true ? t('verdict.good') : marginGood === null ? t('verdict.ok') : t('verdict.low')}
            </p>
          </div>
        </div>

        <p className="text-[11px] text-ink-muted mt-3 leading-relaxed">{t('disclaimer')}</p>
      </div>
    </div>
  )
}
