'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { ArrowRight, X } from 'lucide-react'

export default function FloatingCTA() {
  const [visible, setVisible]   = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Show after 8 seconds or 40% scroll, whichever comes first
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true)
    }, 8000)

    function onScroll() {
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (scrollPct > 0.4 && !dismissed) setVisible(true)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [dismissed])

  function dismiss() {
    setDismissed(true)
    setVisible(false)
  }

  if (!visible) return null

  return (
    // Mobile only — hidden on desktop (Navbar CTA handles desktop)
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="bg-gray-950 text-white rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold leading-snug">Get a Free Sample Quote</p>
          <p className="text-gray-400 text-[11px] mt-0.5">Reply in 4 hours · MOQ 50 pcs</p>
        </div>
        <Link
          href="/request-samples"
          className="shrink-0 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
          onClick={dismiss}
        >
          Request <ArrowRight size={12} />
        </Link>
        <button
          onClick={dismiss}
          className="shrink-0 text-gray-500 hover:text-gray-300 transition-colors p-1"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
