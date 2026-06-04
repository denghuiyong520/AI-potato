'use client'

import { Send } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface Props {
  sku:      string
  title:    string
  className?: string
}

export default function InquiryButton({ sku, title, className }: Props) {
  const t = useTranslations('products.detail')

  const params = new URLSearchParams({
    sku,
    product: title,
  })

  return (
    <Link
      href={`/contact?${params.toString()}`}
      className={cn(
        'flex-1 flex items-center justify-center gap-2 bg-violet-600 text-white font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-violet-700 transition-colors shadow-sm',
        className,
      )}
    >
      <Send size={15} />
      {t('inquire')}
    </Link>
  )
}
