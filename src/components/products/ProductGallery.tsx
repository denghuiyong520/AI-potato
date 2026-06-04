'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { unsplashUrl } from '@/data/products'

interface Props {
  mainSeed: string
  thumbSeeds: string[]
  name: string
}

export default function ProductGallery({ mainSeed, thumbSeeds, name }: Props) {
  const all = [mainSeed, ...thumbSeeds]
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream-100 shadow-card">
        <Image
          src={unsplashUrl(all[active], 800)}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {all.map((seed, i) => (
          <button
            key={seed}
            onClick={() => setActive(i)}
            className={cn(
              'relative aspect-square rounded-xl overflow-hidden border-2 transition-all',
              i === active
                ? 'border-violet-500 shadow-sm'
                : 'border-transparent hover:border-cream-300',
            )}
          >
            <Image
              src={unsplashUrl(seed, 200)}
              alt={`${name} view ${i + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
