// One-time backfill: reads the existing static content (categories.ts,
// products.json, content/blog/*.mdx) and upserts it into Postgres via
// Prisma. Idempotent (upsert by slug) — safe to re-run.
//
// Guard: refuses to overwrite a row an admin has already edited via the
// Express API (updatedAt !== createdAt) unless run with --force, so a
// re-run can't clobber real admin edits with stale JSON/MDX data.
//
// Run with: npm run db:backfill   (needs DATABASE_URL / DIRECT_URL in .env.local)

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { PrismaClient } from '@prisma/client'
import { CATEGORY_TREE } from '../src/data/categories'
import productsRaw from '../src/data/products.json'

const prisma = new PrismaClient()
const FORCE = process.argv.includes('--force')

interface ImportedProductRaw {
  sku: string; slug: string
  title_zh?: string | null; title_en: string
  category: string; subcategory?: string | null
  notes?: string; sellingPoints?: string[]
  colorsInfo?: string | null; sizesInfo?: string | null
  price?: string | null; material?: string | null; gsm?: string | null; weight?: string | null
  mainImages?: string[]; detailImages?: string[]
  detailDims?: unknown
  referenceUrl?: string; sheetName?: string
  supplier?: string; sourceFolder?: string
  importedAt: string
  needsReview?: boolean | string[]
}

async function backfillCategories() {
  for (const cat of CATEGORY_TREE) {
    await prisma.category.upsert({
      where: { slug: cat.value },
      update: { label: cat.label },
      create: { slug: cat.value, label: cat.label },
    })
  }
  for (const cat of CATEGORY_TREE) {
    for (const sub of cat.subcategories ?? []) {
      const parent = await prisma.category.findUniqueOrThrow({ where: { slug: cat.value } })
      await prisma.subcategory.upsert({
        where: { slug: sub.value },
        update: { label: sub.label, categoryId: parent.id },
        create: { slug: sub.value, label: sub.label, categoryId: parent.id },
      })
    }
  }
  console.log(`Categories: ${CATEGORY_TREE.length} upserted.`)
}

async function backfillProducts() {
  const products = productsRaw as ImportedProductRaw[]
  const knownCategorySlugs = new Set(CATEGORY_TREE.map((c) => c.value))
  const knownSubcategorySlugs = new Set(CATEGORY_TREE.flatMap((c) => (c.subcategories ?? []).map((s) => s.value)))

  let created = 0, updated = 0, skippedEdited = 0, skippedBadCategory = 0

  for (const p of products) {
    if (!knownCategorySlugs.has(p.category)) {
      skippedBadCategory++
      console.warn(`  SKIP ${p.slug}: unknown category "${p.category}"`)
      continue
    }
    const subcategorySlug = p.subcategory && knownSubcategorySlugs.has(p.subcategory) ? p.subcategory : null
    const needsReview = Array.isArray(p.needsReview) ? p.needsReview.length > 0 : Boolean(p.needsReview)

    const existing = await prisma.product.findUnique({ where: { slug: p.slug } })
    if (existing && existing.updatedAt.getTime() !== existing.createdAt.getTime() && !FORCE) {
      skippedEdited++
      continue
    }

    const data = {
      sku: p.sku,
      titleZh: p.title_zh ?? null,
      titleEn: p.title_en,
      categorySlug: p.category,
      subcategorySlug,
      notes: p.notes ?? null,
      sellingPoints: p.sellingPoints ?? [],
      colorsInfo: p.colorsInfo ?? null,
      sizesInfo: p.sizesInfo ?? null,
      price: p.price ?? null,
      material: p.material ?? null,
      gsm: p.gsm ?? null,
      weight: p.weight ?? null,
      mainImages: p.mainImages ?? [],
      detailImages: p.detailImages ?? [],
      detailDims: (p.detailDims ?? null) as never,
      referenceUrl: p.referenceUrl ?? null,
      sheetName: p.sheetName ?? null,
      supplier: p.supplier ?? null,
      sourceFolder: p.sourceFolder ?? null,
      needsReview,
      importedAt: new Date(p.importedAt),
    }

    if (existing) {
      await prisma.product.update({ where: { slug: p.slug }, data })
      updated++
    } else {
      await prisma.product.create({ data: { ...data, slug: p.slug } })
      created++
    }
  }

  console.log(`Products: ${created} created, ${updated} updated, ${skippedEdited} skipped (already admin-edited), ${skippedBadCategory} skipped (unknown category).`)
  return products.length
}

async function backfillBlog() {
  const blogDir = path.join(__dirname, '..', 'content', 'blog')
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'))
  let created = 0, updated = 0, skippedEdited = 0

  for (const file of files) {
    const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8')
    const { data, content } = matter(raw)
    const slug = file.replace(/\.mdx$/, '')

    const existing = await prisma.blogPost.findUnique({ where: { slug } })
    if (existing && existing.updatedAt.getTime() !== existing.createdAt.getTime() && !FORCE) {
      skippedEdited++
      continue
    }

    const postData = {
      title: data.title,
      description: data.description,
      content,
      date: new Date(data.date),
      category: data.category,
      author: data.author ?? 'Potato Apparel Team',
      tags: data.tags ?? [],
      coverImage: data.coverImage,
    }

    if (existing) {
      await prisma.blogPost.update({ where: { slug }, data: postData })
      updated++
    } else {
      await prisma.blogPost.create({ data: { ...postData, slug } })
      created++
    }
  }

  console.log(`Blog posts: ${created} created, ${updated} updated, ${skippedEdited} skipped (already admin-edited).`)
  return files.length
}

async function verify(expectedProducts: number, expectedPosts: number) {
  const productCount = await prisma.product.count()
  const postCount = await prisma.blogPost.count()

  const sourceProductSlugs = new Set((productsRaw as ImportedProductRaw[]).map((p) => p.slug))
  const dbProducts = await prisma.product.findMany({ select: { slug: true } })
  const dbProductSlugs = new Set(dbProducts.map((p) => p.slug))
  const missingFromDb = Array.from(sourceProductSlugs).filter((s) => !dbProductSlugs.has(s))
  const extraInDb = Array.from(dbProductSlugs).filter((s) => !sourceProductSlugs.has(s))

  console.log('\n── Verification ──────────────────────────')
  console.log(`Products in DB: ${productCount} (source file has ${expectedProducts})`)
  console.log(`Blog posts in DB: ${postCount} (source files: ${expectedPosts})`)
  if (missingFromDb.length > 0) console.log(`⚠ Missing from DB (${missingFromDb.length}):`, missingFromDb.slice(0, 10))
  if (extraInDb.length > 0) console.log(`ℹ Extra in DB not in source (${extraInDb.length}) — likely admin-created:`, extraInDb.slice(0, 10))
  if (missingFromDb.length === 0 && productCount >= expectedProducts && postCount >= expectedPosts) {
    console.log('✅ Backfill verification passed — all source slugs present in DB.')
  } else {
    console.log('❌ Verification found a mismatch — review above before trusting the DB as source of truth.')
    process.exitCode = 1
  }
}

async function main() {
  console.log(FORCE ? 'Running with --force (will overwrite admin-edited rows)\n' : 'Running (admin-edited rows will be skipped, not overwritten)\n')
  await backfillCategories()
  const expectedProducts = await backfillProducts()
  const expectedPosts = await backfillBlog()
  await verify(expectedProducts, expectedPosts)
}

main()
  .catch((err) => {
    console.error('Backfill failed:', err)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
