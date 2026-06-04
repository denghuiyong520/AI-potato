export interface CartItem {
  /** product slug (URL identifier) */
  slug: string
  sku: string
  title: string
  /** e.g. "From $8.00" or null if not yet priced */
  price: string | null
  /** parsed numeric price for calculations, null if unparseable */
  priceNum: number | null
  /** path like /products/AR002/main/1.jpg */
  image: string
  category: string
  quantity: number
}
