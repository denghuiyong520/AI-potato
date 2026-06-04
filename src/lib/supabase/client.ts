import { createBrowserClient } from '@supabase/ssr'

/**
 * Browser-side Supabase client.
 * Uses the publishable (anon) key — safe to expose in the browser.
 * RLS policies on the database control what this client can do.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
