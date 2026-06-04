/**
 * Stores the last confirmed order so /order-success can display it.
 * Not persisted to localStorage (intentional — cleared on tab close).
 */
import { create } from 'zustand'
import type { CartItem } from '@/types/cart'

export type PaymentMethod = 'paypal' | 'bank' | 'card'
export type BankCurrency  = 'USD' | 'GBP' | 'EUR' | 'AUD'

export interface OrderData {
  orderId:       string
  method:        PaymentMethod
  currency?:     BankCurrency
  items:         CartItem[]
  subtotal:      number | null
  createdAt:     string
}

interface OrderStore {
  order: OrderData | null
  setOrder: (order: OrderData) => void
  clearOrder: () => void
}

export const useOrderStore = create<OrderStore>()((set) => ({
  order: null,
  setOrder: (order) => set({ order }),
  clearOrder: () => set({ order: null }),
}))
