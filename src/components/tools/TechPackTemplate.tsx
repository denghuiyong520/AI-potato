'use client'

import { useTranslations } from 'next-intl'
import { Printer } from 'lucide-react'

/**
 * A free, printable garment tech pack template. Users fill it in (on paper or
 * after "Print → Save as PDF") and send it to a manufacturer. Tech packs are
 * industry-standard in English, so the template body is English; the page
 * chrome is translated.
 */

function Field({ label, w = 'auto' }: { label: string; w?: string }) {
  return (
    <div className="flex flex-col gap-1" style={{ width: w }}>
      <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">{label}</span>
      <div className="h-7 border-b border-gray-300" />
    </div>
  )
}

const sizeCols = ['XS', 'S', 'M', 'L', 'XL', '2XL']

const pomRows = [
  'Chest width (1" below armhole)',
  'Body length (HPS to hem)',
  'Shoulder width',
  'Sleeve length',
  'Sleeve opening / cuff',
  'Armhole (straight)',
  'Neck width',
  'Neck drop (front)',
  'Bottom hem width',
  'Bottom hem height',
]

const bomRows = ['Main fabric', 'Secondary fabric', 'Rib / trim', 'Thread', 'Drawcord / elastic', 'Zipper / hardware', 'Woven label', 'Care label', 'Hangtag', 'Poly bag / packaging']

export default function TechPackTemplate() {
  const t = useTranslations('tools.techpack')

  return (
    <div>
      {/* Toolbar (hidden on print) */}
      <div className="no-print flex items-center justify-between gap-4 mb-6">
        <p className="text-sm text-ink-muted">{t('printHint')}</p>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors shrink-0"
        >
          <Printer size={15} /> {t('printButton')}
        </button>
      </div>

      {/* The template sheet */}
      <div id="techpack-sheet" className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-10 text-gray-900 print:border-0 print:rounded-none print:p-0">

        {/* Header */}
        <div className="flex items-start justify-between gap-6 border-b-2 border-gray-900 pb-4 mb-6">
          <div>
            <h2 className="font-display font-bold text-2xl">Garment Tech Pack</h2>
            <p className="text-xs text-gray-500 mt-1">Specification sheet for manufacturing</p>
          </div>
          <div className="text-right text-[10px] text-gray-400 leading-relaxed">
            <p>Prepared with potatoapparel.com</p>
            <p>Free tech pack template</p>
          </div>
        </div>

        {/* Style info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 mb-8">
          <Field label="Brand / Company" />
          <Field label="Style name" />
          <Field label="Style number" />
          <Field label="Season" />
          <Field label="Designer" />
          <Field label="Date" />
          <Field label="Version" />
          <Field label="Sample size" />
        </div>

        {/* Flats / sketch */}
        <SectionTitle n="1" title="Garment Sketch / Flats" />
        <div className="grid grid-cols-2 gap-4 mb-8">
          {['Front view', 'Back view'].map((v) => (
            <div key={v} className="border border-dashed border-gray-300 rounded-lg h-44 flex items-center justify-center text-xs text-gray-400">
              {v} — attach flat sketch
            </div>
          ))}
        </div>

        {/* BOM */}
        <SectionTitle n="2" title="Bill of Materials (BOM)" />
        <table className="w-full text-xs border-collapse mb-8">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border border-gray-200 px-2 py-1.5 font-semibold w-1/4">Component</th>
              <th className="border border-gray-200 px-2 py-1.5 font-semibold">Material / Composition</th>
              <th className="border border-gray-200 px-2 py-1.5 font-semibold w-20">GSM</th>
              <th className="border border-gray-200 px-2 py-1.5 font-semibold w-28">Color / Pantone</th>
              <th className="border border-gray-200 px-2 py-1.5 font-semibold w-20">Supplier</th>
            </tr>
          </thead>
          <tbody>
            {bomRows.map((row) => (
              <tr key={row}>
                <td className="border border-gray-200 px-2 py-2 text-gray-600">{row}</td>
                <td className="border border-gray-200 px-2 py-2" />
                <td className="border border-gray-200 px-2 py-2" />
                <td className="border border-gray-200 px-2 py-2" />
                <td className="border border-gray-200 px-2 py-2" />
              </tr>
            ))}
          </tbody>
        </table>

        {/* Measurements / POM */}
        <SectionTitle n="3" title="Measurement Spec (Points of Measure, in cm)" />
        <table className="w-full text-xs border-collapse mb-2">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border border-gray-200 px-2 py-1.5 font-semibold">Point of Measure</th>
              <th className="border border-gray-200 px-2 py-1.5 font-semibold w-16">Tol. ±</th>
              {sizeCols.map((s) => (
                <th key={s} className="border border-gray-200 px-2 py-1.5 font-semibold text-center w-12">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pomRows.map((row) => (
              <tr key={row}>
                <td className="border border-gray-200 px-2 py-2 text-gray-600">{row}</td>
                <td className="border border-gray-200 px-2 py-2" />
                {sizeCols.map((s) => (
                  <td key={s} className="border border-gray-200 px-2 py-2" />
                ))}
              </tr>
            ))}
            {/* blank rows */}
            {[0, 1, 2].map((i) => (
              <tr key={`blank-${i}`}>
                <td className="border border-gray-200 px-2 py-2 text-gray-300">—</td>
                <td className="border border-gray-200 px-2 py-2" />
                {sizeCols.map((s) => (
                  <td key={s} className="border border-gray-200 px-2 py-2" />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[10px] text-gray-400 mb-8">Tip: measure your sample garment flat. HPS = High Point Shoulder. Tolerance is the acceptable variance per point.</p>

        {/* Colorways */}
        <SectionTitle n="4" title="Colorways" />
        <table className="w-full text-xs border-collapse mb-8">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border border-gray-200 px-2 py-1.5 font-semibold w-12">#</th>
              <th className="border border-gray-200 px-2 py-1.5 font-semibold">Colorway name</th>
              <th className="border border-gray-200 px-2 py-1.5 font-semibold">Body Pantone (TCX)</th>
              <th className="border border-gray-200 px-2 py-1.5 font-semibold">Trim / rib Pantone</th>
              <th className="border border-gray-200 px-2 py-1.5 font-semibold w-24">Qty</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((n) => (
              <tr key={n}>
                <td className="border border-gray-200 px-2 py-2 text-gray-600">{n}</td>
                <td className="border border-gray-200 px-2 py-2" />
                <td className="border border-gray-200 px-2 py-2" />
                <td className="border border-gray-200 px-2 py-2" />
                <td className="border border-gray-200 px-2 py-2" />
              </tr>
            ))}
          </tbody>
        </table>

        {/* Construction */}
        <SectionTitle n="5" title="Construction & Stitching Details" />
        <div className="border border-gray-200 rounded-lg p-3 mb-8 min-h-[120px]">
          <ul className="text-[11px] text-gray-400 space-y-2">
            <li>• Seam type (e.g. overlock, flatlock, coverstitch): __________________________</li>
            <li>• Stitch density (SPI): __________________________</li>
            <li>• Neck / collar construction: __________________________</li>
            <li>• Cuff / hem finish: __________________________</li>
            <li>• Special construction notes: __________________________</li>
          </ul>
        </div>

        {/* Artwork / decoration */}
        <SectionTitle n="6" title="Artwork & Decoration" />
        <table className="w-full text-xs border-collapse mb-8">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border border-gray-200 px-2 py-1.5 font-semibold">Placement</th>
              <th className="border border-gray-200 px-2 py-1.5 font-semibold">Method (print/embroidery/etc.)</th>
              <th className="border border-gray-200 px-2 py-1.5 font-semibold">Size (cm)</th>
              <th className="border border-gray-200 px-2 py-1.5 font-semibold">Colors</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((n) => (
              <tr key={n}>
                <td className="border border-gray-200 px-2 py-3" />
                <td className="border border-gray-200 px-2 py-3" />
                <td className="border border-gray-200 px-2 py-3" />
                <td className="border border-gray-200 px-2 py-3" />
              </tr>
            ))}
          </tbody>
        </table>

        {/* Labels & packaging */}
        <SectionTitle n="7" title="Labels & Packaging" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 mb-8">
          <Field label="Neck label type" />
          <Field label="Care label content" />
          <Field label="Size label" />
          <Field label="Hangtag" />
          <Field label="Poly bag spec" />
          <Field label="Carton / packing" />
        </div>

        {/* Notes */}
        <SectionTitle n="8" title="Notes & Revision History" />
        <div className="border border-gray-200 rounded-lg p-3 min-h-[100px] text-[11px] text-gray-400">
          Use this space for revision dates, comments, and sample-round feedback.
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3 mt-2">
      <span className="w-5 h-5 rounded bg-gray-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">{n}</span>
      <h3 className="font-bold text-sm text-gray-900">{title}</h3>
    </div>
  )
}
