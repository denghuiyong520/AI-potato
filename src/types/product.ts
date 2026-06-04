/**
 * Represents a product imported from the local source folder via scripts/import-products.ts
 * or from the supplier spreadsheet via scripts/import-from-sheet.ts.
 *
 * ⚠  SECURITY: supplier, costPrice, internalNotes, priceFormula, hasPhysicalSample
 *    must NEVER appear in the public site bundle. They live only in
 *    src/data/products-internal.json (gitignored).
 */
export interface ImportedProduct {
  /** e.g. "AR002" */
  sku: string
  /** URL-safe slug, e.g. "ar002" */
  slug: string
  /** Original folder name or first line of product notes in Chinese */
  title_zh: string
  /** Auto-generated English title */
  title_en: string
  /** Category slug: t-shirts | hoodies | sweatpants | denim | kids-wear | … */
  category: string
  /** Subcategory slug, e.g. "oversized-t-shirt" | "terry-hoodie" | null */
  subcategory?: string | null

  // ── Product description ────────────────────────────────────────────────────
  /** Product specs / description parsed from the spreadsheet (col C). Public. */
  notes?: string
  /** Selling points from 卖点.txt (legacy folder-import only). Public. */
  sellingPoints?: string[]

  // ── Spec fields ───────────────────────────────────────────────────────────
  /** e.g. "28 Colors" or null */
  colorsInfo: string | null
  /** e.g. "S-2XL" or null */
  sizesInfo: string | null
  /** e.g. "From $8.00" — from 官网售价 */
  price: string | null
  /** e.g. "100% Cotton" */
  material: string | null
  /** e.g. "230GSM" */
  gsm: string | null
  /** e.g. "0.3 kg" */
  weight?: string | null

  // ── Images ────────────────────────────────────────────────────────────────
  /** Paths relative to /public, e.g. ["/products/AR002/main/1.jpg", ...] */
  mainImages: string[]
  /** Paths relative to /public, e.g. ["/products/AR002/detail/1.jpg", ...] */
  detailImages: string[]

  // ── Reference ─────────────────────────────────────────────────────────────
  /** Our own hongyuapparel.com product page URL — useful for English title derivation */
  referenceUrl?: string
  /** Which spreadsheet sheet the product came from, e.g. "卫衣" */
  sheetName?: string

  // ── Legacy folder-import fields (kept for backward compat) ────────────────
  /** Supplier name — kept for internal use in products-internal.json only.
   *  NEVER display this to customers. */
  supplier?: string
  /** Absolute source folder path — internal only */
  sourceFolder?: string

  // ── Metadata ──────────────────────────────────────────────────────────────
  /** ISO timestamp when imported */
  importedAt: string
  /** Fields that need manual review */
  needsReview: string[]
}
