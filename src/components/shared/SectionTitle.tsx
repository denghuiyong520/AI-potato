import { cn } from '@/lib/utils'
import AnimatedSection from './AnimatedSection'

interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  titleClassName?: string
  light?: boolean // for dark-background sections
}

export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  light = false,
}: SectionTitleProps) {
  const alignClass = {
    left:   'items-start text-left',
    center: 'items-center text-center',
    right:  'items-end text-right',
  }[align]

  return (
    <div className={cn('flex flex-col gap-4 mb-14 lg:mb-16', alignClass, className)}>
      <AnimatedSection>
        <h2
          className={cn(
            'font-display font-bold text-display-md',
            light ? 'text-cream-100' : 'text-ink',
            titleClassName,
          )}
        >
          {title}
        </h2>
      </AnimatedSection>

      {subtitle && (
        <AnimatedSection delay={0.1}>
          <p
            className={cn(
              'text-base lg:text-lg max-w-2xl leading-relaxed',
              light ? 'text-cream-400' : 'text-ink-muted',
            )}
          >
            {subtitle}
          </p>
        </AnimatedSection>
      )}

      <AnimatedSection delay={0.15}>
        <div
          className={cn(
            'h-px w-12',
            light ? 'bg-cream-400/40' : 'bg-violet-400',
          )}
        />
      </AnimatedSection>
    </div>
  )
}
