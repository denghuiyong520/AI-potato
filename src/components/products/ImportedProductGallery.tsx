'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  mainImages: string[]
  name: string
}

export default function ImportedProductGallery({ mainImages, name }: Props) {
  const [active, setActive] = useState(0)

  const prev = () => setActive((i) => (i - 1 + mainImages.length) % mainImages.length)
  const next = () => setActive((i) => (i + 1) % mainImages.length)

  if (mainImages.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-cream-100 flex items-center justify-center text-ink-muted text-sm">
        No images available
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-cream-100 shadow-card group">
        <Image
          src={mainImages[active]}
          alt={`${name} — view ${active + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />

        {/* Navigation arrows (visible on hover or if > 1 image) */}
        {mainImages.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dot indicator */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {mainImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-all',
                    i === active ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80',
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails (show up to 8) */}
      {mainImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {mainImages.slice(0, 8).map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={cn(
                'relative aspect-square rounded-xl overflow-hidden border-2 transition-all',
                i === active
                  ? 'border-violet-500 shadow-sm'
                  : 'border-transparent hover:border-cream-300',
              )}
            >
              <Image
                src={src}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
