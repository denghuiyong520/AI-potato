// Minimal in-memory sliding-window rate limiter for a low-volume contact
// form. Deliberately lightweight — no Redis/KV dependency, just a Map that
// self-prunes. Good enough to blunt naive bots/scripts hammering the form.
//
// Known limitation: Vercel serverless functions are not guaranteed to reuse
// the same instance between requests, so this limit is per-instance, not
// globally enforced across the whole deployment. It still helps because
// Vercel does reuse warm instances for bursts of traffic from the same
// client in short succession, which is the common abuse pattern. For a
// hard global guarantee, move this to Upstash Redis or Vercel KV.

const hits = new Map<string, number[]>()

const WINDOW_MS = 60_000 // 1 minute
const MAX_REQUESTS = 5   // per IP per window

export function isRateLimited(key: string): boolean {
  const now = Date.now()
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps)
    return true
  }

  timestamps.push(now)
  hits.set(key, timestamps)

  // Occasional cleanup so the map doesn't grow unbounded over the process lifetime.
  if (hits.size > 500) {
    for (const [k, v] of Array.from(hits.entries())) {
      if (v.every((t: number) => now - t >= WINDOW_MS)) hits.delete(k)
    }
  }

  return false
}
