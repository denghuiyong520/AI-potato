'use client'

import { useState, useEffect } from 'react'
import { X, Zap } from 'lucide-react'
import { Link } from '@/i18n/navigation'

const STORAGE_KEY = 'pa_ann_bar_closed_v2'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const closed = localStorage.getItem(STORAGE_KEY)
      if (!closed) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  function dismiss() {
    setVisible(false)
    try { localStorage.setItem(STORAGE_KEY, '1') } catch { /* */ }
  }

  if (!visible) return null

  return (
    <div className="relative z-50 bg-violet-600 text-white text-sm py-2.5 px-4">
      <div className="container-site flex items-center justify-center gap-3 text-center">
        <Zap size={13} className="shrink-0 text-yellow-300" />
        <p className="text-[13px] font-medium leading-snug">
          <span className="font-bold">Free sample credit</span> on first bulk orders this month — MOQ just 50 pcs.{' '}
          <Link
            href="/request-samples"
            className="underline underline-offset-2 hover:text-yellow-200 transition-colors font-semibold whitespace-nowrap"
          >
            Request yours →
          </Link>
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
