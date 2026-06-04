'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import type { BlogPost } from '@/lib/blog'
import BlogCard from './BlogCard'
import BlogFilter from './BlogFilter'
import { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'

interface BlogListClientProps {
  posts:      BlogPost[]
  categories: string[]
}

export default function BlogListClient({ posts, categories }: BlogListClientProps) {
  const t = useTranslations('blog')
  const [active, setActive] = useState('all')

  const filtered = useMemo(() => {
    if (active === 'all') return posts
    return posts.filter((p) => p.category === active)
  }, [active, posts])

  return (
    <>
      <div className="mb-10">
        <BlogFilter categories={categories} active={active} onChange={setActive} />
      </div>

      {filtered.length > 0 ? (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="text-center py-16 text-ink-muted">
          {t('noResults')}
        </div>
      )}
    </>
  )
}
