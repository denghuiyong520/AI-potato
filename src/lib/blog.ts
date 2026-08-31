import readingTime from 'reading-time'
import { prisma } from '@/lib/prisma'

// Phase 1: backed by Postgres (via Prisma) instead of reading content/blog/*.mdx
// directly. Every exported function keeps its original name/shape so every
// call site only needs `await` added — see prisma/backfill.ts for the
// one-time migration of the existing 26 .mdx files into this table.

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  coverImage: string
  readingTime: string
  readingTimeMinutes: number
  author: string
}

export interface BlogPostWithContent extends BlogPost {
  content: string
}

// Public-safe select — every field a BlogPost needs, nothing more.
const BLOG_SELECT = {
  slug: true,
  title: true,
  description: true,
  date: true,
  category: true,
  tags: true,
  coverImage: true,
  author: true,
  content: true,
} as const

type BlogRow = {
  slug: string
  title: string
  description: string
  date: Date
  category: string
  tags: string[]
  coverImage: string
  author: string
  content: string
}

function toBlogPostBase(row: BlogRow): BlogPost {
  const rt = readingTime(row.content)
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    date: row.date.toISOString().slice(0, 10), // matches original "YYYY-MM-DD" frontmatter granularity
    category: row.category,
    tags: row.tags,
    coverImage: row.coverImage,
    readingTime: rt.text,
    readingTimeMinutes: Math.ceil(rt.minutes),
    author: row.author,
  }
}

// Same reasoning as src/data/products.ts's loadAllProducts(): fetch once per
// process, serve every lookup from memory — avoids hundreds of individual
// per-page DB round-trips during static generation (238 products + 26 posts
// × 5 locales × ~2 calls each blew Next.js's page-data-collection timeout
// when every call hit Postgres directly).
let postsCache: Promise<{ base: BlogPost; content: string }[]> | null = null

function loadAllPosts(): Promise<{ base: BlogPost; content: string }[]> {
  if (!postsCache) {
    postsCache = prisma.blogPost
      .findMany({ select: BLOG_SELECT, orderBy: { date: 'desc' } })
      .then((rows) => rows.map((r) => ({ base: toBlogPostBase(r), content: r.content })))
  }
  return postsCache
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const rows = await loadAllPosts()
  return rows.map((r) => r.base)
}

export async function getPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
  const rows = await loadAllPosts()
  const row = rows.find((r) => r.base.slug === slug)
  return row ? { ...row.base, content: row.content } : null
}

export async function getRelatedPosts(currentSlug: string, category: string, limit = 3): Promise<BlogPost[]> {
  const all = await getAllPosts()
  return all
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      const aMatch = a.category === category ? 1 : 0
      const bMatch = b.category === category ? 1 : 0
      return bMatch - aMatch
    })
    .slice(0, limit)
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const categories = posts.map((p) => p.category)
  return ['all', ...Array.from(new Set(categories))]
}
