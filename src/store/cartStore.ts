import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types/cart'

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (slug: string) => void
  updateQty: (slug: string, qty: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number | null  // null if any item has no price
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      subtotal: null,

      addItem: (incoming) => {
        set((state) => {
          const existing = state.items.find((i) => i.slug === incoming.slug)
          const updated = existing
            ? state.items.map((i) =>
                i.slug === incoming.slug ? { ...i, quantity: i.quantity + 1 } : i,
              )
            : [...state.items, { ...incoming, quantity: 1 }]
          return {
            items: updated,
            totalItems: updated.reduce((s, i) => s + i.quantity, 0),
            subtotal: calcSubtotal(updated),
          }
        })
      },

      removeItem: (slug) => {
        set((state) => {
          const updated = state.items.filter((i) => i.slug !== slug)
          return {
            items: updated,
            totalItems: updated.reduce((s, i) => s + i.quantity, 0),
            subtotal: calcSubtotal(updated),
          }
        })
      },

      updateQty: (slug, qty) => {
        if (qty <= 0) {
          get().removeItem(slug)
          return
        }
        set((state) => {
          const updated = state.items.map((i) =>
            i.slug === slug ? { ...i, quantity: qty } : i,
          )
          return {
            items: updated,
            totalItems: updated.reduce((s, i) => s + i.quantity, 0),
            subtotal: calcSubtotal(updated),
          }
        })
      },

      clearCart: () => set({ items: [], totalItems: 0, subtotal: null }),
    }),
    {
      name: 'potato-apparel-cart',
      // Only persist items; recompute derived values on hydration
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.totalItems = state.items.reduce((s, i) => s + i.quantity, 0)
          state.subtotal   = calcSubtotal(state.items)
        }
      },
    },
  ),
)

function calcSubtotal(items: CartItem[]): number | null {
  if (items.length === 0) return null
  let total = 0
  for (const item of items) {
    if (item.priceNum === null) return null   // any unpriced item → null
    total += item.priceNum * item.quantity
  }
  return total
}

/** Parse a price string like "From $8.00" → 8.0, or null */
export function parsePrice(price: string | null): number | null {
  if (!price) return null
  const m = price.match(/[\d,]+\.?\d*/)
  if (!m) return null
  return parseFloat(m[0].replace(/,/g, ''))
}
