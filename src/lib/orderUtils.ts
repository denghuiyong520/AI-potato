/** Generate a unique order ID: PA-YYYYMMDD-XXXX */
export function generateOrderId(): string {
  const now  = new Date()
  const date = now.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `PA-${date}-${rand}`
}
