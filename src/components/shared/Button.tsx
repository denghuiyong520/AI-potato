import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  as?: 'button' | 'a'
}

const base =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary:
    'bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800 shadow-sm hover:shadow-md rounded-full',
  secondary:
    'bg-ink text-cream-100 hover:bg-ink-light active:bg-ink rounded-full',
  outline:
    'border border-ink text-ink hover:bg-ink hover:text-cream-100 rounded-full',
  ghost:
    'text-ink hover:bg-cream-200 rounded-full',
  whatsapp:
    'bg-[#25D366] text-white hover:bg-[#20bb5a] active:bg-[#1aaa4f] rounded-full shadow-sm hover:shadow-md',
}

const sizes: Record<Size, string> = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-base px-8 py-4',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  target,
  rel,
  onClick,
  type = 'button',
  disabled,
  as,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (href || as === 'a') {
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
