import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

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

function getPostDir(): string {
  if (fs.existsSync(BLOG_DIR)) return BLOG_DIR
  return ''
}

export function getAllPosts(): BlogPost[] {
  const dir = getPostDir()
  if (!dir) return []

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.(mdx|md)$/, '')
      const filePath = path.join(dir, file)
      const source = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(source)
      const rt = readingTime(content)

      return {
        slug,
        title:              (data.title       as string) ?? '',
        description:        (data.description as string) ?? '',
        date:               (data.date        as string) ?? '',
        category:           (data.category    as string) ?? 'General',
        tags:               (data.tags        as string[]) ?? [],
        coverImage:         (data.coverImage  as string) ?? `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=500&fit=crop&q=80&auto=format`,
        readingTime:        rt.text,
        readingTimeMinutes: Math.ceil(rt.minutes),
        author:             (data.author      as string) ?? 'Potato Apparel Team',
      } satisfies BlogPost
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
  const dir = getPostDir()
  if (!dir) return null

  const candidates = [`${slug}.mdx`, `${slug}.md`]
  const file = candidates.find((c) => fs.existsSync(path.join(dir, c)))
  if (!file) return null

  const source = fs.readFileSync(path.join(dir, file), 'utf-8')
  const { data, content } = matter(source)
  const rt = readingTime(content)

  return {
    slug,
    title:              (data.title       as string) ?? '',
    description:        (data.description as string) ?? '',
    date:               (data.date        as string) ?? '',
    category:           (data.category    as string) ?? 'General',
    tags:               (data.tags        as string[]) ?? [],
    coverImage:         (data.coverImage  as string) ?? `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=630&fit=crop&q=80&auto=format`,
    readingTime:        rt.text,
    readingTimeMinutes: Math.ceil(rt.minutes),
    author:             (data.author      as string) ?? 'Potato Apparel Team',
    content,
  }
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      const aMatch = a.category === category ? 1 : 0
      const bMatch = b.category === category ? 1 : 0
      return bMatch - aMatch
    })
    .slice(0, limit)
}

export function getAllCategories(): string[] {
  const categories = getAllPosts().map((p) => p.category)
  return ['all', ...Array.from(new Set(categories))]
}
