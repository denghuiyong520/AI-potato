import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

// Called by the admin-api Express service after a product/blog write succeeds.
// This is what makes an edit show up live (via on-demand ISR) without a full
// Vercel redeploy — the storefront pages stay fully static otherwise.
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret')
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const { path, tag } = body as { path?: string; tag?: string }

  if (!path && !tag) {
    return NextResponse.json({ error: 'Provide "path" or "tag"' }, { status: 400 })
  }

  if (path) revalidatePath(path)
  if (tag) revalidateTag(tag)

  return NextResponse.json({ revalidated: true })
}
