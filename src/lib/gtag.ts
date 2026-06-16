// ── Google Analytics 4 / Google Ads event helper ───────────────────────────────
// Safe to call anywhere on the client. No-ops on the server or when gtag
// hasn't loaded (e.g. GA_MEASUREMENT_ID not configured), so callers never crash.

type GtagParams = Record<string, unknown>

declare global {
  interface Window {
    gtag?: (command: 'event' | 'config' | 'js' | 'set', ...args: unknown[]) => void
  }
}

/** Fire a generic GA4 event. */
export function trackEvent(name: string, params: GtagParams = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

/**
 * Fire the lead-generation conversion. Mark `generate_lead` as a Key Event in
 * GA4 and import it into Google Ads as a conversion to enable Smart Bidding.
 */
export function trackLead(params: {
  type?: string
  productSku?: string
  productTitle?: string
} = {}) {
  trackEvent('generate_lead', {
    lead_type:     params.type ?? 'contact',
    product_sku:   params.productSku,
    product_title: params.productTitle,
  })
}
