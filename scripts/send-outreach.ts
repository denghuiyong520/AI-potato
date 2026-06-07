/**
 * Day 1 Outreach Emails — Potato Apparel
 * Sends personalized cold emails to 3 confirmed leads via Resend
 */

import 'dotenv/config'
import path from 'path'
import { config } from 'dotenv'
// Load .env.local explicitly (Next.js convention)
config({ path: path.resolve(process.cwd(), '.env.local') })

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY ?? '')

const FROM = 'sales@potatoapparel.com'
const FROM_NAME = 'Sarah | Potato Apparel'

const emails = [
  {
    to: 'contact@amosesclothing.com',
    subject: 'Re: Amoses manufacturing — could we cut your production cost by 30%?',
    brand: 'Amoses',
    founder: 'Amoses team',
    country: 'France',
    context: 'We noticed Amoses already does custom manufacturing with a Turkish workshop — which shows you know exactly what quality looks like.',
    pitch: 'We\'re a factory in Guangzhou doing the same level of custom work at 25–35% lower cost than Turkish production, with shorter lead times on repeat orders and full AQL 2.5 quality documentation.',
    cta: 'request-samples',
  },
  {
    to: 'info@thorfitnesseurope.com',
    subject: 'Thor Fitness Europe — custom gymwear from £4/unit, MOQ 50',
    brand: 'Thor Fitness Europe',
    founder: 'Joel',
    country: 'UK',
    context: 'Came across Thor Fitness Europe while looking at CrossFit brands in the UK — love what you\'re building for the community.',
    pitch: 'We manufacture custom gym and CrossFit apparel from 50 pieces per style. Our UK clients typically pay £4–£9/unit depending on garment type, with their own woven labels, hang tags, and packaging included.',
    cta: 'request-samples',
  },
  {
    to: 'contact@humanwithattitude.com',
    subject: 'HWA manufacturing — custom from 50 pcs, sample in 10 days',
    brand: 'HumanWithAttitude',
    founder: 'HWA team',
    country: 'France',
    context: 'We came across Human With Attitude and love the direction — the blend of sport, music, and art is a strong positioning.',
    pitch: 'We work with creative collectives and brand studios across Europe who want custom-quality garments without the high MOQs. Starting from 50 pieces per style, we handle everything from fabric sourcing to woven labels and packaging.',
    cta: 'request-samples',
  },
]

async function sendOutreach() {
  console.log('📧 Sending Day 1 outreach emails...\n')

  for (const email of emails) {
    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a1a; max-width: 560px; margin: 0 auto; padding: 32px 24px; }
  .brand { font-weight: 700; font-size: 15px; letter-spacing: 0.08em; color: #6d28d9; margin-bottom: 28px; }
  p { font-size: 15px; line-height: 1.7; color: #374151; margin: 0 0 16px; }
  .cta-btn { display: inline-block; background: #6d28d9; color: #fff !important; text-decoration: none; font-weight: 600; font-size: 14px; padding: 14px 28px; border-radius: 50px; margin: 8px 0 24px; }
  .footer { font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; padding-top: 20px; margin-top: 32px; }
  .highlight { background: #f5f3ff; border-left: 3px solid #7c3aed; padding: 12px 16px; border-radius: 0 8px 8px 0; margin: 16px 0; font-size: 14px; }
</style></head>
<body>
  <div class="brand">POTATO APPAREL</div>

  <p>Hi ${email.founder},</p>

  <p>${email.context}</p>

  <p>${email.pitch}</p>

  <div class="highlight">
    <strong>This month only:</strong> Sample cost is fully credited against your first bulk order (200+ pcs). You can test quality with zero risk.
  </div>

  <p>If it's worth a look:</p>

  <a href="https://potatoapparel.com/en/request-samples" class="cta-btn">
    Request Sample Quote →
  </a>

  <p style="font-size:14px;color:#6b7280">Or reply to this email — I'll send pricing within 4 hours. WhatsApp also works: <a href="https://wa.me/447907131539">+44 7907 131539</a></p>

  <div class="footer">
    <strong>Sarah</strong><br>
    Sales Team — Potato Apparel<br>
    📍 Guangzhou, China &nbsp;·&nbsp; 🌐 <a href="https://potatoapparel.com">potatoapparel.com</a><br>
    <br>
    OEKO-TEX fabrics · AQL 2.5 QC · MOQ from 50 pcs · Worldwide shipping<br>
    <br>
    <em style="color:#d1d5db">Not interested? Just reply and I'll never contact you again.</em>
  </div>
</body>
</html>`

    try {
      const result = await resend.emails.send({
        from: `${FROM_NAME} <${FROM}>`,
        to: email.to,
        subject: email.subject,
        html,
      })
      console.log(`✅ Sent to ${email.to} — ID: ${result.data?.id}`)
    } catch (err) {
      console.error(`❌ Failed to send to ${email.to}:`, err)
    }
  }

  console.log('\n✅ Outreach emails complete.')
}

sendOutreach()
