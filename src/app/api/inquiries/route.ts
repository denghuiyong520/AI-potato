import { NextRequest, NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { sendInquiryNotification, sendCustomerAutoReply, type InquiryAttachment } from '@/lib/mailer'
import { isRateLimited } from '@/lib/rate-limit'

// ── Supabase client ──────────────────────────────────────────────────────────
// Created lazily so a missing env var produces a clear, logged error instead
// of crashing the whole route at import time.
function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error('Supabase env vars missing (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  }
  return createSupabaseClient(url, key)
}

// ── Field limits ──────────────────────────────────────────────────────────────
const MAX_TEXT_LEN = { name: 200, email: 254, phone: 40, company: 200, message: 5000, misc: 200 }
const MAX_FILES = 10
const MAX_FILE_BYTES = 8 * 1024 * 1024 // 8MB per file
const MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024 // 20MB combined
const ALLOWED_FILE_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'application/pdf',
])

function truncate(value: string, max: number): string {
  return value.trim().slice(0, max)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= MAX_TEXT_LEN.email
}

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // ── Rate limit (per IP, best-effort — see lib/rate-limit.ts) ─────────────
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please wait a moment and try again.' }, { status: 429 })
    }

    // ── Parse body (multipart for file uploads, JSON as a fallback) ──────────
    const contentType = req.headers.get('content-type') ?? ''
    const fields: Record<string, string> = {}
    const attachments: InquiryAttachment[] = []
    let totalAttachmentBytes = 0

    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData()
      for (const [key, value] of Array.from(form.entries())) {
        if (value instanceof File) {
          if (key !== 'files') continue
          if (attachments.length >= MAX_FILES) {
            return NextResponse.json({ error: `Too many files (max ${MAX_FILES}).` }, { status: 400 })
          }
          if (!ALLOWED_FILE_TYPES.has(value.type)) {
            return NextResponse.json({ error: `Unsupported file type: ${value.type || value.name}` }, { status: 400 })
          }
          if (value.size > MAX_FILE_BYTES) {
            return NextResponse.json({ error: `File too large: ${value.name} (max 8MB).` }, { status: 400 })
          }
          totalAttachmentBytes += value.size
          if (totalAttachmentBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
            return NextResponse.json({ error: 'Total attachment size exceeds 20MB.' }, { status: 400 })
          }
          const buf = Buffer.from(await value.arrayBuffer())
          attachments.push({
            filename: value.name.slice(0, 200), // originals live in-memory only — never a filesystem temp path
            content: buf,
            contentType: value.type || 'application/octet-stream',
          })
        } else {
          fields[key] = String(value)
        }
      }
    } else {
      Object.assign(fields, await req.json())
    }

    // ── Honeypot — hidden field that only bots fill in ───────────────────────
    if (fields.company_website) {
      // Pretend success so bots don't learn the honeypot rejected them.
      return NextResponse.json({ success: true }, { status: 201 })
    }

    const {
      type = 'contact', name, email, phone, countryIso,
      company, platform, budget, productSku, productTitle, productUrl,
      quantity, whatsapp, message,
    } = fields

    // ── Server-side validation ────────────────────────────────────────────────
    if (!name?.trim())    return NextResponse.json({ error: 'Name is required' },    { status: 400 })
    if (!email?.trim())   return NextResponse.json({ error: 'Email is required' },   { status: 400 })
    if (!message?.trim()) return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    if (!isValidEmail(email.trim()))
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    if (message.length > MAX_TEXT_LEN.message)
      return NextResponse.json({ error: 'Message is too long' }, { status: 400 })

    const cleanName    = truncate(name, MAX_TEXT_LEN.name)
    const cleanEmail   = truncate(email, MAX_TEXT_LEN.email).toLowerCase()
    const cleanPhone   = phone    ? truncate(phone, MAX_TEXT_LEN.phone)     : undefined
    const cleanCompany = company  ? truncate(company, MAX_TEXT_LEN.company) : undefined
    const cleanWhatsapp = whatsapp ? truncate(whatsapp, MAX_TEXT_LEN.phone) : undefined
    const cleanMessage = truncate(message, MAX_TEXT_LEN.message)
    const sourceUrl = req.headers.get('referer') || undefined

    // Same files that get emailed below, re-encoded as base64 data: URLs so
    // the admin backend has them too — previously attachments were only
    // ever emailed, invisible to anyone who only checks the admin panel.
    const attachmentsForDb = attachments.map((a) => ({
      filename: a.filename,
      contentType: a.contentType,
      dataUrl: `data:${a.contentType};base64,${a.content.toString('base64')}`,
    }))

    // ── 1. Save to Supabase (always attempted first — the durable record) ────
    const supabase = createClient()
    // Insert only — no .select() afterwards. Reading the row back would require
    // a SELECT RLS policy, which we intentionally withhold so the public anon
    // key can write leads but never read them. The frontend only needs success.
    const { error: dbError } = await supabase
      .from('inquiries')
      .insert({
        type,
        name:          cleanName,
        email:         cleanEmail,
        phone:         cleanPhone         || null,
        country_iso:   countryIso         || null,
        company:       cleanCompany       || null,
        platform:      platform           || null,
        budget:        budget             || null,
        product_sku:   productSku         || null,
        product_title: productTitle       || null,
        product_url:   productUrl         || null,
        quantity:      quantity           || null,
        whatsapp:      cleanWhatsapp      || null,
        message:       cleanMessage,
        source_url:    sourceUrl          || null,
        attachments:   attachmentsForDb.length > 0 ? attachmentsForDb : null,
      })

    if (dbError) {
      console.error('[inquiries] DB error:', dbError)
      return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 })
    }

    // ── 2. Send the internal notification over SMTP ───────────────────────────
    // This is NOT best-effort: if it fails, the frontend must be told the
    // truth (the lead is still safe in Supabase as a backup, but sales won't
    // see it in their inbox unless someone checks the DB).
    try {
      await sendInquiryNotification({
        type, name: cleanName, email: cleanEmail, phone: cleanPhone,
        whatsapp: cleanWhatsapp,
        countryIso, company: cleanCompany, platform, budget,
        productSku, productTitle, productUrl, quantity,
        message: cleanMessage, sourceUrl,
      }, attachments)
    } catch (err) {
      console.error('[inquiries] SMTP notification failed:', err)
      return NextResponse.json(
        { error: 'Your inquiry was saved but the notification email failed to send. Our team will still follow up — you can also reach us directly at sales@potatoapparel.com.' },
        { status: 502 },
      )
    }

    // ── 3. Best-effort confirmation email to the customer ─────────────────────
    sendCustomerAutoReply(cleanEmail, cleanName).catch((err) =>
      console.error('[inquiries] Customer auto-reply failed:', err),
    )

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('[inquiries] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
