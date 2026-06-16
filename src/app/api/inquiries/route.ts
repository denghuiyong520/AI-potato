import { NextRequest, NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// ── Clients ───────────────────────────────────────────────────────────────────
// Both clients are created lazily inside the handler so a missing env var
// produces a clear, logged error instead of crashing the whole route at import
// time (which would 500 every request — including ones we could otherwise save).
function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error('Supabase env vars missing (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  }
  return createSupabaseClient(url, key)
}

const NOTIFY_TO = process.env.NOTIFY_EMAIL ?? 'sales@potatoapparel.com'

// ── Email template ────────────────────────────────────────────────────────────
function buildEmailHtml(data: {
  name: string; email: string; phone?: string; countryIso?: string
  company?: string; platform?: string; budget?: string
  productSku?: string; productTitle?: string; message: string
  type: string; sourceUrl?: string
}) {
  const budgetMap: Record<string, string> = {
    under1k: 'Under $1,000', '1k5k': '$1,000 – $5,000',
    '5k20k': '$5,000 – $20,000', '20kPlus': '$20,000+',
  }
  const platformMap: Record<string, string> = {
    shopify: 'Shopify', amazon: 'Amazon', tiktok: 'TikTok Shop',
    offline: 'Offline / Retail', other: 'Other',
  }

  const rows = [
    ['Name',     data.name],
    ['Email',    `<a href="mailto:${data.email}">${data.email}</a>`],
    data.phone    && ['Phone',    data.phone + (data.countryIso ? ` (${data.countryIso.toUpperCase()})` : '')],
    data.company  && ['Company',  data.company],
    data.platform && ['Platform', platformMap[data.platform] ?? data.platform],
    data.budget   && ['Budget',   budgetMap[data.budget]   ?? data.budget],
    data.productSku && ['Product SKU',   `#${data.productSku}`],
    data.productTitle && ['Product',     data.productTitle],
    data.sourceUrl && ['Page',    `<a href="${data.sourceUrl}">${data.sourceUrl}</a>`],
  ].filter(Boolean) as [string, string][]

  const tableRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:8px 12px;background:#f9f9f9;color:#666;font-size:13px;width:120px;vertical-align:top">${label}</td>
      <td style="padding:8px 12px;color:#111;font-size:13px">${value}</td>
    </tr>`).join('')

  const isProduct = data.type === 'product'
  const badgeColor = isProduct ? '#7c3aed' : '#2563eb'
  const badgeLabel = isProduct ? '🛍 Product Inquiry' : '📩 Contact Inquiry'

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f4f4f5">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.1)">
        <!-- Header -->
        <tr>
          <td style="background:#111;padding:24px 32px">
            <p style="margin:0;color:#fff;font-size:20px;font-weight:700">🥔 Potato Apparel</p>
            <p style="margin:4px 0 0;color:#aaa;font-size:13px">New inquiry received</p>
          </td>
        </tr>
        <!-- Badge -->
        <tr>
          <td style="padding:20px 32px 0">
            <span style="display:inline-block;background:${badgeColor};color:#fff;font-size:12px;font-weight:600;padding:4px 12px;border-radius:99px">${badgeLabel}</span>
          </td>
        </tr>
        <!-- Details table -->
        <tr>
          <td style="padding:16px 32px">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
              ${tableRows}
            </table>
          </td>
        </tr>
        <!-- Message -->
        <tr>
          <td style="padding:0 32px 24px">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#374151;text-transform:uppercase;letter-spacing:.05em">Message</p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;font-size:14px;color:#111;line-height:1.6;white-space:pre-wrap">${data.message}</div>
          </td>
        </tr>
        <!-- CTA -->
        <tr>
          <td style="padding:0 32px 32px">
            <a href="mailto:${data.email}" style="display:inline-block;background:#7c3aed;color:#fff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none">Reply to ${data.name}</a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;border-top:1px solid #f3f4f6;background:#fafafa">
            <p style="margin:0;font-size:12px;color:#9ca3af">This notification was sent by Potato Apparel website · <a href="https://potatoapparel.com" style="color:#9ca3af">potatoapparel.com</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      type = 'contact', name, email, phone, countryIso,
      company, platform, budget, productSku, productTitle, message,
    } = body

    // Server-side validation
    if (!name?.trim())    return NextResponse.json({ error: 'Name is required' },    { status: 400 })
    if (!email?.trim())   return NextResponse.json({ error: 'Email is required' },   { status: 400 })
    if (!message?.trim()) return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })

    const sourceUrl = req.headers.get('referer') || undefined

    // ── 1. Save to Supabase ─────────────────────────────────────────────────
    const supabase = createClient()
    const { data: row, error: dbError } = await supabase
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
        source_url:    sourceUrl       || null,
      })
      .select('id, created_at')
      .single()

    if (dbError) {
      console.error('[inquiries] DB error:', dbError)
      return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 })
    }

    // ── 2. Send email notification (non-blocking) ───────────────────────────
    const subject = productSku
      ? `New Product Inquiry — #${productSku} ${productTitle ?? ''}`
      : `New Contact Inquiry from ${name.trim()}`

    // Email is best-effort: the lead is already safely persisted above, so a
    // missing RESEND_API_KEY or send failure must never fail the request.
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      resend.emails.send({
        from:    'Potato Apparel <noreply@potatoapparel.com>',
        to:      [NOTIFY_TO],
        replyTo: email.trim(),
        subject,
        html:    buildEmailHtml({
          type, name: name.trim(), email: email.trim(),
          phone, countryIso, company, platform, budget,
          productSku, productTitle, message: message.trim(), sourceUrl,
        }),
      }).catch(err => console.error('[inquiries] Email send error:', err))
    } else {
      console.warn('[inquiries] RESEND_API_KEY not set — lead saved, email skipped')
    }

    return NextResponse.json({ success: true, id: row.id }, { status: 201 })
  } catch (err) {
    console.error('[inquiries] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
