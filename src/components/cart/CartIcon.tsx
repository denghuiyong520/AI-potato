'use client'

import { ShoppingBag } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useCartStore } from '@/store/cartStore'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export default function CartIcon({ className }: Props) {
  const totalItems = useCartStore((s) => s.totalItems)

  return (
    <Link
      href="/cart"
      aria-label="Shopping cart"
      className={cn('relative inline-flex items-center justify-center', className)}
    >
      <ShoppingBag size={20} />
      {totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-violet-600 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 leading-none">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  )
}
