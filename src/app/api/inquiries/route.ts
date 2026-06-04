import { NextRequest, NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Use plain supabase-js client in API routes — no SSR/cookie adapter needed
function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      type = 'contact',
      name,
      email,
      phone,
      countryIso,
      company,
      platform,
      budget,
      productSku,
      productTitle,
      message,
    } = body

    // Basic server-side validation
    if (!name?.trim())    return NextResponse.json({ error: 'Name is required' },    { status: 400 })
    if (!email?.trim())   return NextResponse.json({ error: 'Email is required' },   { status: 400 })
    if (!message?.trim()) return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const supabase = createClient()

    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        type,
        name:          name.trim(),
        email:         email.trim().toLowerCase(),
        phone:         phone?.trim()   || null,
        country_iso:   countryIso      || null,
        company:       company?.trim() || null,
        platform:      platform        || null,
        budget:        budget          || null,
        product_sku:   productSku      || null,
        product_title: productTitle    || null,
        message:       message.trim(),
        source_url:    req.headers.get('referer') || null,
      })
      .select('id, created_at')
      .single()

    if (error) {
      console.error('[inquiries] Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 })
  } catch (err) {
    console.error('[inquiries] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
