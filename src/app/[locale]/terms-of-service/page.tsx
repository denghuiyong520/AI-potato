import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { FileText, ShoppingBag, AlertCircle, Scale, Mail, Shield, Clock, RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | Potato Apparel',
  description:
    'Terms and conditions governing the use of Potato Apparel\'s website and custom clothing manufacturing services. Read before placing an order.',
  openGraph: {
    title: 'Terms of Service | Potato Apparel',
    description:
      'Terms governing orders, payments, intellectual property, liability, and dispute resolution for Potato Apparel manufacturing services.',
  },
  robots: { index: true, follow: true },
}

const EFFECTIVE_DATE = 'June 1, 2025'
const COMPANY = 'Potato Apparel'
const ADDRESS = 'Haizhu District, Guangzhou, Guangdong, China'
const EMAIL = 'sales@potatoapparel.com'
const WEBSITE = 'https://potatoapparel.com'

const sections = [
  {
    icon: FileText,
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    body: `By accessing ${WEBSITE} or engaging ${COMPANY} for any manufacturing, sampling, or related services, you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you are acting on behalf of a company, you represent that you have authority to bind that entity to these Terms.\n\nIf you do not agree to these Terms, please do not use our website or services.`,
  },
  {
    icon: ShoppingBag,
    id: 'services',
    title: '2. Our Services',
    body: `${COMPANY} provides custom clothing manufacturing services including but not limited to: cut-and-sew garment production; private label and OEM manufacturing; fabric sourcing and material selection; sample development and approval; custom labelling, hang tags, and packaging; and quality control and inspection.\n\nWe reserve the right to modify, suspend, or discontinue any service at any time, with reasonable notice where practicable. We do not guarantee that our services will be available in every country or jurisdiction.`,
  },
  {
    icon: FileText,
    id: 'orders-payment',
    title: '3. Orders, Quotes & Payment',
    body: `**3.1 Quotations** — All price quotations are valid for 14 days from the date of issue unless otherwise stated. Quotes are based on the specifications provided at the time of inquiry; changes to specifications may affect pricing.\n\n**3.2 Order Confirmation** — An order is confirmed only when a written purchase order is accepted by ${COMPANY} and a deposit payment has been received. We reserve the right to decline any order at our discretion.\n\n**3.3 Deposit & Payment Terms** — Standard payment terms are 30% deposit upon order confirmation and 70% balance before shipment. Other arrangements may be agreed in writing. All prices are quoted in USD unless otherwise specified.\n\n**3.4 Late Payment** — We reserve the right to charge interest on overdue amounts at 1.5% per month or the maximum rate permitted by law, whichever is lower. Repeated late payment may result in suspension of services.\n\n**3.5 Taxes & Duties** — Quoted prices exclude import duties, local taxes, and customs clearance fees, which are the buyer's responsibility unless DDP (Delivered Duty Paid) is agreed in writing.`,
  },
  {
    icon: Clock,
    id: 'production-delivery',
    title: '4. Production Lead Times & Delivery',
    body: `**4.1 Lead Times** — Production lead times are estimates provided in good faith and commence after order confirmation, deposit receipt, and final artwork/specification approval. Standard lead time is 15–25 business days depending on product type and order quantity.\n\n**4.2 Delays** — We will notify you promptly of any anticipated delays. ${COMPANY} is not liable for delays caused by: client approval delays; changes to specifications after production commencement; force majeure events (see Section 11); third-party carrier delays; or customs inspections.\n\n**4.3 Delivery** — Risk and title pass to the buyer upon handover to the carrier, unless DDP terms are agreed. Shipping timelines are estimates; express courier transit is typically 5–7 business days and sea freight 25–35 business days from shipment date.`,
  },
  {
    icon: Shield,
    id: 'quality-samples',
    title: '5. Samples & Quality Standards',
    body: `**5.1 Samples** — We strongly recommend ordering samples before bulk production. Sample approval by the client constitutes confirmation that the specification, fabric, construction, and fit meet requirements. Bulk production will be based on the approved sample.\n\n**5.2 Bulk Quality** — We aim to produce garments within ±5% of the approved sample for measurements and within acceptable industry tolerances for colour shade variation. Minor batch-to-batch variation in fabric is inherent to garment manufacturing and does not constitute a defect.\n\n**5.3 Inspection** — Clients are entitled to arrange third-party quality inspection at the factory prior to shipment at their own cost. We will provide reasonable cooperation. Shipment release requires full payment of the balance.\n\n**5.4 Claims** — Any quality claim must be submitted in writing to ${EMAIL} within 14 days of receiving the goods, accompanied by photographic evidence and a detailed description of the defect. Claims submitted after this period may not be accepted. We will not be responsible for defects that arise from misuse, alteration, or normal wear.`,
  },
  {
    icon: RefreshCw,
    id: 'cancellations-returns',
    title: '6. Cancellations & Returns',
    body: `**6.1 Cancellation by Client** — Orders may be cancelled before production commences with written notice. If production has already begun, a cancellation fee equal to the work completed will apply, and the deposit may be forfeited.\n\n**6.2 No General Right of Return** — As all goods are manufactured to custom specifications, we do not accept returns for reasons of change of mind. Returns are accepted only for: confirmed manufacturing defects (where claims are submitted per Section 5.4); incorrect items shipped (wrong style, colour, or size); or goods confirmed as non-conforming to the approved sample.\n\n**6.3 Remedies for Defects** — At our discretion, we will offer: repair or re-production of defective items; a partial or full refund; or a credit note for future orders. We will not be responsible for consequential losses arising from defective goods beyond the order value.`,
  },
  {
    icon: FileText,
    id: 'intellectual-property',
    title: '7. Intellectual Property',
    body: `**7.1 Client Designs** — You represent and warrant that you own or have the right to use all designs, artwork, logos, and trademarks submitted to us for production. You grant ${COMPANY} a limited licence to use your designs solely to manufacture and deliver your order.\n\n**7.2 Indemnification** — You agree to indemnify and hold harmless ${COMPANY} from any claims, damages, or costs arising from third-party intellectual property infringement in connection with designs you provide.\n\n**7.3 ${COMPANY} Intellectual Property** — All content on this website — including text, images, graphics, logos, and design templates — is the property of ${COMPANY} or its licensors. You may not copy, reproduce, or distribute any content without our written permission.\n\n**7.4 Confidentiality** — We treat all client designs, specifications, and business information as confidential and will not share them with third parties except as necessary to fulfil your order (e.g., with fabric suppliers or sub-contractors under confidentiality obligations).`,
  },
  {
    icon: AlertCircle,
    id: 'prohibited-uses',
    title: '8. Prohibited Uses',
    body: `You agree not to use our website or services to: produce counterfeit goods or infringe any third party's intellectual property; manufacture products that are illegal in your jurisdiction or the destination country; engage in deceptive, fraudulent, or misleading business practices; introduce viruses, malware, or other harmful code to our systems; or harvest data, scrape content, or use automated tools without our consent.\n\nViolation of these prohibitions may result in immediate termination of your order without refund and may expose you to legal liability.`,
  },
  {
    icon: Scale,
    id: 'liability',
    title: '9. Limitation of Liability',
    body: `To the maximum extent permitted by applicable law:\n\n• ${COMPANY}'s total liability to you for any claim arising out of or relating to these Terms or our services is limited to the amount paid by you for the specific order giving rise to the claim.\n\n• We are not liable for any indirect, incidental, consequential, special, or punitive damages, including but not limited to: loss of profits; loss of business or contracts; loss of anticipated savings; business interruption; or reputational damage.\n\n• Nothing in these Terms excludes or limits our liability for: death or personal injury caused by our negligence; fraudulent misrepresentation; or any other liability that cannot be excluded by law.\n\nSome jurisdictions do not allow the exclusion or limitation of certain damages. In such jurisdictions, our liability will be limited to the maximum extent permitted by law.`,
  },
  {
    icon: Shield,
    id: 'warranties',
    title: '10. Disclaimer of Warranties',
    body: `Our website and information are provided "as is" and "as available" without warranties of any kind, express or implied, including but not limited to: merchantability; fitness for a particular purpose; accuracy or completeness of information; and uninterrupted or error-free operation of the website.\n\nWe do not warrant that our manufacturing services will meet every specific technical or aesthetic requirement beyond what is agreed in writing and confirmed via approved samples.`,
  },
  {
    icon: AlertCircle,
    id: 'force-majeure',
    title: '11. Force Majeure',
    body: `Neither party will be liable for failure or delay in performing obligations under these Terms to the extent caused by circumstances beyond their reasonable control, including but not limited to: acts of God, natural disasters, pandemics, government restrictions, strikes, wars, or supply chain disruptions. The affected party must notify the other as soon as practicable. If a force majeure event continues for more than 60 days, either party may terminate the affected order with written notice.`,
  },
  {
    icon: Scale,
    id: 'governing-law',
    title: '12. Governing Law & Disputes',
    body: `These Terms are governed by and construed in accordance with the laws of the People's Republic of China, without regard to conflict of law principles.\n\nAny dispute arising out of or in connection with these Terms or our services will first be attempted to be resolved through good-faith negotiation. If negotiation fails within 30 days, the dispute will be submitted to binding arbitration under the rules of the China International Economic and Trade Arbitration Commission (CIETAC), with the seat of arbitration in Guangzhou.\n\nNotwithstanding the foregoing, either party may seek injunctive or other equitable relief from a court of competent jurisdiction to prevent irreparable harm.`,
  },
  {
    icon: FileText,
    id: 'privacy',
    title: '13. Privacy',
    body: `Your use of our website and services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our data collection and use practices.`,
  },
  {
    icon: RefreshCw,
    id: 'changes',
    title: '14. Changes to These Terms',
    body: `We reserve the right to update these Terms at any time. Material changes will be communicated by posting the revised Terms on this page with an updated effective date. Continued use of our services after changes are posted constitutes acceptance. For significant changes, we may also notify you by email.`,
  },
  {
    icon: FileText,
    id: 'general',
    title: '15. General Provisions',
    body: `**Entire Agreement** — These Terms, together with any written order confirmation or manufacturing agreement, constitute the entire agreement between you and ${COMPANY} with respect to the subject matter herein.\n\n**Severability** — If any provision of these Terms is found invalid or unenforceable, the remaining provisions will remain in full force.\n\n**Waiver** — Failure by ${COMPANY} to enforce any provision does not constitute a waiver of that right.\n\n**Assignment** — You may not assign your rights or obligations under these Terms without our prior written consent. We may assign our rights to a successor entity in connection with a merger or acquisition.`,
  },
]

export default function TermsOfServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Terms of Service | Potato Apparel',
            description: 'Terms of service for Potato Apparel clothing manufacturer.',
            url: `${WEBSITE}/en/terms-of-service`,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${WEBSITE}/en` },
                { '@type': 'ListItem', position: 2, name: 'Terms of Service' },
              ],
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-14 lg:pt-40 lg:pb-16 bg-gray-950 text-white">
        <div className="container-site max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            <Scale size={13} />
            Legal Agreement
          </div>
          <h1 className="font-display font-bold text-4xl lg:text-5xl mb-5 leading-tight">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            These terms govern your use of {COMPANY}&apos;s website and custom clothing manufacturing services. Please read them carefully before placing an order.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            Effective date: {EFFECTIVE_DATE} &nbsp;·&nbsp; {COMPANY} &nbsp;·&nbsp; {ADDRESS}
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-10 bg-gray-50 border-b border-gray-200">
        <div className="container-site max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            Contents
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-violet-700 hover:text-violet-900 hover:underline transition-colors truncate"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white">
        <div className="container-site max-w-4xl">
          <div className="space-y-14">
            {sections.map(({ icon: Icon, id, title, body }) => (
              <div key={id} id={id} className="scroll-mt-24">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={18} className="text-violet-600" />
                  </div>
                  <h2 className="font-display font-bold text-2xl text-gray-900 leading-snug">
                    {title}
                  </h2>
                </div>
                <div className="pl-14">
                  <div className="text-gray-600 leading-relaxed text-sm space-y-2">
                    {body.split('\n').map((line, i) => {
                      const parts = line.split(/\*\*(.*?)\*\*/g)
                      return (
                        <p key={i} className={line.startsWith('•') ? 'flex gap-2' : ''}>
                          {parts.map((part, k) =>
                            k % 2 === 1 ? (
                              <strong key={k} className="text-gray-800">
                                {part}
                              </strong>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      )
                    })}
                  </div>
                </div>
                <div className="mt-8 border-b border-gray-100" />
              </div>
            ))}

            {/* Contact section */}
            <div id="contact-us" className="scroll-mt-24">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-violet-600" />
                </div>
                <h2 className="font-display font-bold text-2xl text-gray-900">
                  16. Contact Us
                </h2>
              </div>
              <div className="pl-14">
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 inline-block">
                  <p className="font-bold text-gray-900 mb-1">{COMPANY}</p>
                  <p className="text-sm text-gray-600">{ADDRESS}</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-sm text-violet-600 hover:text-violet-800 font-medium mt-1 inline-block"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gray-950 text-white">
        <div className="container-site max-w-2xl text-center">
          <h2 className="font-display font-bold text-2xl mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Get a free quote for your custom clothing project. We respond within 24 hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/privacy-policy"
              className="border border-white/30 hover:border-white text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
