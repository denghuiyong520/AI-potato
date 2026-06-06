import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getAllPosts, getAllCategories } from '@/lib/blog'
import AnimatedSection from '@/components/shared/AnimatedSection'
import BlogListClient from '@/components/blog/BlogListClient'
import BottomCTASection from '@/components/home/BottomCTASection'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'blog.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, '/blog'),
  }
}

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t          = await getTranslations({ locale, namespace: 'blog' })
  // Fetched server-side — safe to use fs here
  const posts      = getAllPosts()
  const categories = getAllCategories()

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-[var(--bg-surface)]">
        <div className="container-site text-center max-w-2xl mx-auto">
          <AnimatedSection>
            <h1 className="font-display font-bold text-ink mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
              {t('hero.title')}
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-ink-muted text-lg leading-relaxed">{t('hero.subtitle')}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Interactive list (client component handles filter state) */}
      <section className="section-padding bg-[var(--bg-base)]">
        <div className="container-site">
          <BlogListClient posts={posts} categories={categories} />
        </div>
      </section>

      <BottomCTASection />
    </>
  )
}
