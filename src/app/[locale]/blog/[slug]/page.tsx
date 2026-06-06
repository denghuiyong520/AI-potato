import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import AnimatedSection from '@/components/shared/AnimatedSection'
import BlogCard from '@/components/blog/BlogCard'
import { buildEnglishOnlyAlternates } from '@/lib/seo'

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title:       post.title,
      description: post.description,
      type:        'article',
      publishedTime: post.date,
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       post.title,
      description: post.description,
    },
    alternates: buildEnglishOnlyAlternates(`/blog/${params.slug}`),
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const t       = await getTranslations({ locale: params.locale, namespace: 'blog' })
  const related = getRelatedPosts(post.slug, post.category)

  const categoryLabels: Record<string, string> = {
    'Brand Building':     t('filter.brandBuilding'),
    'Manufacturing':      t('filter.manufacturing'),
    'Design & Tech Pack': t('filter.design'),
    'Industry Insights':  t('filter.trends'),
  }
  const categoryLabel = categoryLabels[post.category] ?? post.category

  // JSON-LD structured data for Article SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:       post.title,
    description:    post.description,
    image:          post.coverImage,
    datePublished:  post.date,
    author: {
      '@type': 'Organization',
      name:    post.author,
      url:     'https://potatoapparel.com', // TODO: replace with real domain
    },
    publisher: {
      '@type': 'Organization',
      name:    'Potato Apparel',
      logo:    { '@type': 'ImageObject', url: 'https://potatoapparel.com/logo.png' }, // TODO
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[320px] max-h-[560px] bg-cream-200">
        {/* TODO: Replace with real article cover photo */}
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent" />
      </div>

      <article className="bg-[var(--bg-base)]">
        <div className="container-site max-w-3xl mx-auto pt-10 pb-20">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> {t('backToBlog')}
          </Link>

          {/* Category badge */}
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-700 text-xs font-medium px-2.5 py-1 rounded-full border border-violet-100">
                <Tag size={10} /> {categoryLabel}
              </span>
            </div>
          </AnimatedSection>

          {/* Title */}
          <AnimatedSection delay={0.05}>
            <h1 className="font-display font-bold text-ink mb-5"
                style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              {post.title}
            </h1>
          </AnimatedSection>

          {/* Meta */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted mb-8 pb-8 border-b border-cream-300">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {t('publishedOn')} {formatDate(post.date, params.locale)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readingTimeMinutes} {t('minRead')}
              </span>
              <span>{t('by')} {post.author}</span>
            </div>
          </AnimatedSection>

          {/* MDX content */}
          <AnimatedSection delay={0.15}>
            <div className="prose-article">
              <MDXRemote
                source={post.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </div>
          </AnimatedSection>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-cream-300">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1.5 bg-cream-100 text-ink-muted rounded-full border border-cream-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Inline CTA */}
          <div className="mt-12 rounded-2xl bg-violet-50 border border-violet-100 p-7 text-center">
            <h3 className="font-display font-bold text-xl text-ink mb-2">{t('ctaTitle')}</h3>
            <p className="text-sm text-ink-muted mb-5">{t('ctaSubtitle')}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-violet-600 text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-violet-700 transition-colors"
            >
              {t('ctaButton')} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="section-padding-sm bg-[var(--bg-surface)]">
          <div className="container-site">
            <h2 className="font-display font-bold text-2xl text-ink mb-8">{t('relatedArticles')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <AnimatedSection key={p.slug}>
                  <BlogCard post={p} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
