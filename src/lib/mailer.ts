import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'

// ── SMTP transporter ─────────────────────────────────────────────────────────
// Talks to the self-hosted Poste.io mail server (mail.potatoapparel.com).
// Built lazily + cached so a missing env var throws a clear error at request
// time instead of crashing the route at import time.
let transporter: Transporter | null = null

function getTransporter(): Transporter {
  if (transporter) return transporter

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error('SMTP env vars missing (SMTP_HOST / SMTP_USER / SMTP_PASS)')
  }

  // No `pool` option here — that's an SMTPPool-only field. Plain (non-pooled)
  // SMTP is the default and is the right choice for a low-volume contact form
  // on Vercel serverless, where connections aren't reused across invocations.
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS (secure:false, upgraded automatically)
    auth: { user, pass },
    tls: {
      // mail.potatoapparel.com currently presents Poste.io's default
      // self-signed certificate (O=Poste.io, not a trusted CA), so strict
      // verification fails the STARTTLS handshake before auth is even
      // attempted. This trusts that one known host while Let's Encrypt is
      // set up server-side — remove once a real certificate is issued
      // (see Poste.io → System settings → TLS certificate → Let's Encrypt).
      rejectUnauthorized: false,
    },
  })

  return transporter
}

/** Verify the SMTP connection + auth without sending anything. Used for diagnostics. */
export async function verifySmtp(): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await getTransporter().verify()
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) }
  }
}

// ── HTML escaping ────────────────────────────────────────────────────────────
// All user-submitted text is interpolated into the notification email's HTML,
// so it must be escaped to prevent HTML/markup injection into the message.
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export interface InquiryAttachment {
  filename: string
  content: Buffer
  contentType: string
}

export interface InquiryMailData {
  type: string
  name: string
  email: string
  phone?: string
  whatsapp?: string
  countryIso?: string
  company?: string
  platform?: string
  budget?: string
  productSku?: string
  productTitle?: string
  productUrl?: string
  quantity?: string
  message: string
  sourceUrl?: string
}

const FROM_ADDRESS = 'Potato Apparel Website <sales@potatoapparel.com>'
const NOTIFY_TO = process.env.INQUIRY_TO_EMAIL || process.env.NOTIFY_EMAIL || 'sales@potatoapparel.com'

const BUDGET_LABELS: Record<string, string> = {
  under1k: 'Under $1,000', '1k5k': '$1,000 – $5,000',
  '5k20k': '$5,000 – $20,000', '20kPlus': '$20,000+',
}
const PLATFORM_LABELS: Record<string, string> = {
  shopify: 'Shopify', amazon: 'Amazon', tiktok: 'TikTok Shop',
  offline: 'Offline / Retail', other: 'Other',
}

function buildNotificationHtml(data: InquiryMailData, submittedAt: string): string {
  const rows: [string, string][] = [
    ['Name', esc(data.name)],
    ['Company', data.company ? esc(data.company) : '—'],
    ['Email', `<a href="mailto:${esc(data.email)}">${esc(data.email)}</a>`],
    ['Phone', data.phone ? esc(data.phone) + (data.countryIso ? ` (${esc(data.countryIso.toUpperCase())})` : '') : '—'],
    ['WhatsApp', data.whatsapp ? esc(data.whatsapp) : '—'],
    ['Country', data.countryIso ? esc(data.countryIso.toUpperCase()) : '—'],
    ['Product', data.productTitle ? esc(data.productTitle) + (data.productSku ? ` (#${esc(data.productSku)})` : '') : '—'],
    ['Quantity', data.quantity ? esc(data.quantity) : (data.budget ? (BUDGET_LABELS[data.budget] ?? esc(data.budget)) : '—')],
    ['Platform', data.platform ? (PLATFORM_LABELS[data.platform] ?? esc(data.platform)) : '—'],
    ['Page URL', data.sourceUrl ? `<a href="${esc(data.sourceUrl)}">${esc(data.sourceUrl)}</a>` : '—'],
    ['Product URL', data.productUrl ? `<a href="${esc(data.productUrl)}">${esc(data.productUrl)}</a>` : '—'],
    ['Submitted', esc(submittedAt)],
  ]

  const tableRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:8px 12px;background:#f9f9f9;color:#666;font-size:13px;width:130px;vertical-align:top">${label}</td>
      <td style="padding:8px 12px;color:#111;font-size:13px">${value}</td>
    </tr>`).join('')

  const isProduct = data.type === 'product'
  const badgeColor = isProduct ? '#7c3aed' : '#2563eb'
  const badgeLabel = isProduct ? '🛍 Product Inquiry' : data.type === 'sample_request' ? '📦 Sample Request' : '📩 Contact Inquiry'

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f4f4f5">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.1)">
        <tr>
          <td style="background:#111;padding:24px 32px">
            <p style="margin:0;color:#fff;font-size:20px;font-weight:700">🥔 Potato Apparel</p>
            <p style="margin:4px 0 0;color:#aaa;font-size:13px">New website inquiry</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px 0">
            <span style="display:inline-block;background:${badgeColor};color:#fff;font-size:12px;font-weight:600;padding:4px 12px;border-radius:99px">${badgeLabel}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
              ${tableRows}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 24px">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#374151;text-transform:uppercase;letter-spacing:.05em">Message</p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;font-size:14px;color:#111;line-height:1.6;white-space:pre-wrap">${esc(data.message)}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 32px">
            <a href="mailto:${esc(data.email)}" style="display:inline-block;background:#7c3aed;color:#fff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none">Reply to ${esc(data.name)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;border-top:1px solid #f3f4f6;background:#fafafa">
            <p style="margin:0;font-size:12px;color:#9ca3af">Sent by potatoapparel.com — reply to this email to respond directly to the customer.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

/**
 * Send the internal notification to the sales inbox. FROM is always the
 * verified sending domain (sales@potatoapparel.com) — never the customer's
 * address — with Reply-To set to the customer so a direct reply reaches them.
 * Using the customer's address as FROM would fail SPF/DKIM/DMARC checks.
 */
export async function sendInquiryNotification(
  data: InquiryMailData,
  attachments: InquiryAttachment[] = [],
): Promise<void> {
  const submittedAt = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
  const subject = `New Website Inquiry - ${data.name}${data.company ? ` - ${data.company}` : ''}`

  await getTransporter().sendMail({
    from: FROM_ADDRESS,
    to: NOTIFY_TO,
    replyTo: data.email,
    subject,
    html: buildNotificationHtml(data, submittedAt),
    attachments: attachments.map((a) => ({
      filename: a.filename,
      content: a.content, // in-memory Buffer only — never a filesystem path
      contentType: a.contentType,
    })),
  })
}

/**
 * Best-effort confirmation email to the customer. Failure here must never
 * fail the overall request — the sales notification above is the part that
 * matters, this is a nice-to-have.
 */
export async function sendCustomerAutoReply(toEmail: string, name: string): Promise<void> {
  await getTransporter().sendMail({
    from: 'Potato Apparel <sales@potatoapparel.com>',
    to: toEmail,
    replyTo: 'sales@potatoapparel.com',
    subject: 'We Received Your Inquiry | Potato Apparel',
    html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f4f4f5">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.1)">
        <tr>
          <td style="background:#111;padding:24px 32px">
            <p style="margin:0;color:#fff;font-size:20px;font-weight:700">🥔 Potato Apparel</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px">
            <p style="margin:0 0 16px;font-size:15px;color:#111;line-height:1.6">Hi ${esc(name)},</p>
            <p style="margin:0 0 16px;font-size:15px;color:#111;line-height:1.6">Thank you for contacting Potato Apparel. We have received your inquiry and our team will review the details and get back to you shortly.</p>
            <p style="margin:0;font-size:15px;color:#111;line-height:1.6">Website: <a href="https://potatoapparel.com" style="color:#7c3aed">potatoapparel.com</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  })
}
