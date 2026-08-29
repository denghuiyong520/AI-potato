import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import SectionTitle from '@/components/shared/SectionTitle'
import BlogCard from '@/components/blog/BlogCard'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'

export default async function LatestBlogSection() {
  const t = useTranslations('latestBlog')
  const posts = (await getAllPosts()).slice(0, 3)

  if (posts.length === 0) return null

  return (
    <section className="section-padding bg-[var(--bg-surface)]">
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <SectionTitle title={t('title')} subtitle={t('subtitle')} align="left" className="mb-0" />
          </div>
          <AnimatedSection delay={0.1} direction="left">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-800 whitespace-nowrap transition-colors shrink-0"
            >
              {t('viewAll')} <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
