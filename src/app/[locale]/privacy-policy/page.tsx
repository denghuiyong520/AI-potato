import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Shield, Eye, Cookie, Mail, Lock, Globe, UserCheck, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Potato Apparel',
  description:
    'Learn how Potato Apparel collects, uses, and protects your personal data. GDPR-compliant privacy policy for our clothing manufacturing services.',
  openGraph: {
    title: 'Privacy Policy | Potato Apparel',
    description:
      'How Potato Apparel handles your personal data, cookies, and privacy rights under GDPR and applicable law.',
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
    icon: Eye,
    id: 'information-we-collect',
    title: '1. Information We Collect',
    content: [
      {
        subtitle: '1.1 Information You Provide Directly',
        body: `When you contact us, request a quote, or place an order, we collect: your name and job title; company name and business address; email address and phone number; shipping and billing address; product requirements, order specifications, and design files; payment information (processed securely via third-party processors — we do not store card numbers); and any other information you choose to share in correspondence.`,
      },
      {
        subtitle: '1.2 Information Collected Automatically',
        body: `When you visit ${WEBSITE}, we automatically collect: your IP address and approximate location; browser type, version, and operating system; pages viewed, time spent, and navigation paths; referring URL (how you found our site); device identifiers; and cookie and tracking technology data (see Section 4).`,
      },
      {
        subtitle: '1.3 Information from Third Parties',
        body: `We may receive information about you from advertising platforms (Google Ads, Meta), analytics providers (Google Analytics), and business partners who refer clients to us. We use this information only for the purposes described in this policy.`,
      },
    ],
  },
  {
    icon: UserCheck,
    id: 'how-we-use-information',
    title: '2. How We Use Your Information',
    content: [
      {
        subtitle: '2.1 Service Delivery',
        body: `To process and fulfill your orders; provide custom clothing manufacturing and sampling services; communicate order status, production updates, and delivery tracking; respond to inquiries, quotes, and support requests; and issue invoices and process payments.`,
      },
      {
        subtitle: '2.2 Business Operations',
        body: `To maintain our customer records and business relationships; comply with legal and regulatory obligations (export compliance, tax, accounting); detect and prevent fraud, abuse, and security threats; and improve our manufacturing processes and product quality.`,
      },
      {
        subtitle: '2.3 Marketing & Advertising',
        body: `With your consent or where we have a legitimate interest, we use your information to: send marketing emails about new products, promotions, and industry news; run targeted advertising campaigns on Google, Meta, and other platforms; and measure the effectiveness of our marketing activities. You may opt out of marketing communications at any time using the unsubscribe link in any email or by contacting us at ${EMAIL}.`,
      },
      {
        subtitle: '2.4 Analytics & Website Improvement',
        body: `We use aggregated analytics data to understand how visitors use our website, which pages are most popular, and how to improve the user experience. This data does not identify individual users.`,
      },
    ],
  },
  {
    icon: Globe,
    id: 'legal-basis',
    title: '3. Legal Basis for Processing (GDPR)',
    content: [
      {
        subtitle: '',
        body: `If you are located in the European Economic Area (EEA) or United Kingdom, we process your personal data on the following legal bases:\n\n• **Contract performance** — Processing necessary to fulfil orders and provide our services.\n• **Legitimate interests** — Analytics, fraud prevention, and direct marketing to existing customers, where your interests and rights do not override ours.\n• **Consent** — For marketing emails, cookies that are not strictly necessary, and remarketing advertising. You may withdraw consent at any time.\n• **Legal obligation** — Processing required to comply with applicable laws (tax, export controls, accounting records).`,
      },
    ],
  },
  {
    icon: Cookie,
    id: 'cookies',
    title: '4. Cookies & Tracking Technologies',
    content: [
      {
        subtitle: '4.1 What Are Cookies?',
        body: `Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, measure traffic, and deliver relevant advertising.`,
      },
      {
        subtitle: '4.2 Cookies We Use',
        body: `**Strictly Necessary Cookies** — Required for the website to function (session management, security). Cannot be disabled.\n\n**Analytics Cookies** — Google Analytics (\_ga, \_gid, \_gat) to measure site traffic and user behaviour. Data is aggregated and anonymised.\n\n**Advertising & Remarketing Cookies** — Google Ads conversion tracking and remarketing tags; Meta Pixel for Facebook/Instagram advertising. These allow us to show relevant ads to people who have visited our site and measure ad effectiveness.\n\n**Preference Cookies** — Remember your language, currency, or other settings.`,
      },
      {
        subtitle: '4.3 Managing Cookies',
        body: `You can control cookies through your browser settings or a consent management tool. Disabling analytics or advertising cookies will not affect your ability to use our website, but may reduce the relevance of ads you see. For Google Analytics opt-out, visit: https://tools.google.com/dlpage/gaoptout`,
      },
    ],
  },
  {
    icon: Globe,
    id: 'data-sharing',
    title: '5. How We Share Your Information',
    content: [
      {
        subtitle: '',
        body: `We do not sell your personal data. We share your information only in these circumstances:\n\n• **Service Providers** — Shipping carriers (DHL, FedEx, UPS), payment processors, cloud storage, email service providers, and IT support, who are bound by data processing agreements.\n• **Advertising Platforms** — Google LLC and Meta Platforms Inc. receive hashed email addresses and event data for advertising measurement. Both are certified under applicable data transfer frameworks.\n• **Legal Compliance** — We may disclose your data to government authorities, courts, or regulators when required by law, to enforce our terms, or to protect the rights, property, or safety of ${COMPANY} and others.\n• **Business Transfers** — If ${COMPANY} is involved in a merger, acquisition, or sale, your data may be transferred as part of that transaction. We will notify you before your data is subject to a different privacy policy.\n• **With Your Consent** — For any other purpose, with your explicit consent.`,
      },
    ],
  },
  {
    icon: Globe,
    id: 'international-transfers',
    title: '6. International Data Transfers',
    content: [
      {
        subtitle: '',
        body: `${COMPANY} is based in China. When we process data from EEA or UK residents, we transfer personal data internationally. We ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) approved by the European Commission, or reliance on the UK International Data Transfer Agreement where applicable. Google and Meta operate under the EU–US Data Privacy Framework and UK adequacy decisions where relevant.`,
      },
    ],
  },
  {
    icon: Lock,
    id: 'data-retention',
    title: '7. Data Retention',
    content: [
      {
        subtitle: '',
        body: `We retain personal data for as long as necessary to fulfil the purposes described in this policy:\n\n• **Customer records & order history** — 7 years (for tax and legal compliance)\n• **Marketing contact lists** — Until you opt out or request deletion\n• **Analytics data** — 26 months (Google Analytics default, after which data is aggregated)\n• **Website server logs** — 90 days\n• **Job applicant data** — 12 months after the position is filled\n\nWhen data is no longer needed, we securely delete or anonymise it.`,
      },
    ],
  },
  {
    icon: Shield,
    id: 'your-rights',
    title: '8. Your Privacy Rights',
    content: [
      {
        subtitle: '',
        body: `Depending on your location, you may have the following rights regarding your personal data:\n\n• **Access** — Request a copy of the personal data we hold about you.\n• **Rectification** — Ask us to correct inaccurate or incomplete data.\n• **Erasure ("Right to be Forgotten")** — Request deletion of your data, subject to legal retention obligations.\n• **Restriction** — Ask us to limit how we process your data in certain circumstances.\n• **Portability** — Receive your data in a structured, machine-readable format.\n• **Object** — Object to processing based on legitimate interests or for direct marketing.\n• **Withdraw Consent** — Withdraw any consent you have given at any time, without affecting the lawfulness of processing before withdrawal.\n\nTo exercise any of these rights, contact us at ${EMAIL}. We will respond within 30 days. If you are in the EEA or UK and believe we have not addressed your concern, you have the right to lodge a complaint with your local data protection authority.`,
      },
    ],
  },
  {
    icon: Shield,
    id: 'security',
    title: '9. Data Security',
    content: [
      {
        subtitle: '',
        body: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, accidental loss, alteration, or disclosure. These include: TLS/SSL encryption for data in transit; access controls limiting data to authorised personnel; regular security reviews; and secure deletion procedures.\n\nNo method of transmission over the internet is 100% secure. If you believe your data has been compromised, please contact us immediately at ${EMAIL}.`,
      },
    ],
  },
  {
    icon: AlertCircle,
    id: 'children',
    title: '10. Children\'s Privacy',
    content: [
      {
        subtitle: '',
        body: `Our services are intended for businesses and adults aged 18 and over. We do not knowingly collect personal data from children under 16. If you believe a child has provided us with personal information, please contact us and we will delete it promptly.`,
      },
    ],
  },
  {
    icon: Globe,
    id: 'third-party-links',
    title: '11. Third-Party Links',
    content: [
      {
        subtitle: '',
        body: `Our website may contain links to third-party websites (social media platforms, partner sites, carriers). We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies before providing any personal information.`,
      },
    ],
  },
  {
    icon: AlertCircle,
    id: 'changes',
    title: '12. Changes to This Policy',
    content: [
      {
        subtitle: '',
        body: `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with a revised "Last Updated" date. For material changes, we may also send an email notification. Your continued use of our website after changes are posted constitutes acceptance of the updated policy.`,
      },
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Privacy Policy | Potato Apparel',
            description: 'Privacy policy for Potato Apparel clothing manufacturer.',
            url: `${WEBSITE}/en/privacy-policy`,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${WEBSITE}/en` },
                { '@type': 'ListItem', position: 2, name: 'Privacy Policy' },
              ],
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-14 lg:pt-40 lg:pb-16 bg-gray-950 text-white">
        <div className="container-site max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            <Shield size={13} />
            GDPR Compliant
          </div>
          <h1 className="font-display font-bold text-4xl lg:text-5xl mb-5 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {COMPANY} is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            Effective date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Company: {COMPANY} &nbsp;·&nbsp; {ADDRESS}
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
            <a href="#contact" className="text-sm text-violet-700 hover:text-violet-900 hover:underline">
              13. Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white">
        <div className="container-site max-w-4xl">
          <div className="space-y-14">
            {sections.map(({ icon: Icon, id, title, content }) => (
              <div key={id} id={id} className="scroll-mt-24">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={18} className="text-violet-600" />
                  </div>
                  <h2 className="font-display font-bold text-2xl text-gray-900 leading-snug">
                    {title}
                  </h2>
                </div>
                <div className="pl-14 space-y-5">
                  {content.map((block, i) => (
                    <div key={i}>
                      {block.subtitle && (
                        <h3 className="font-semibold text-gray-800 mb-2">{block.subtitle}</h3>
                      )}
                      <div className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                        {block.body.split('\n').map((line, j) => {
                          // Render bold markdown-like **text**
                          const parts = line.split(/\*\*(.*?)\*\*/g)
                          return (
                            <p key={j} className={line.startsWith('•') ? 'flex gap-2 mb-1' : 'mb-2'}>
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
                  ))}
                </div>
                <div className="mt-8 border-b border-gray-100" />
              </div>
            ))}

            {/* Contact section */}
            <div id="contact" className="scroll-mt-24">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-violet-600" />
                </div>
                <h2 className="font-display font-bold text-2xl text-gray-900">
                  13. Contact Us
                </h2>
              </div>
              <div className="pl-14">
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  For any questions, requests, or concerns about this Privacy Policy or the way we handle your personal data, please contact us:
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
                <p className="text-gray-500 text-sm mt-4">
                  We aim to respond to all privacy-related requests within <strong className="text-gray-700">30 days</strong>. For EU/UK residents: if you are unsatisfied with our response, you have the right to contact your local supervisory authority (e.g., the ICO in the UK or your national DPA in the EU).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gray-950 text-white">
        <div className="container-site max-w-2xl text-center">
          <h2 className="font-display font-bold text-2xl mb-4">
            Questions or Concerns?
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            We take your privacy seriously. Reach out and we will be happy to help.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`mailto:${EMAIL}`}
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm"
            >
              Email Us
            </a>
            <Link
              href="/terms-of-service"
              className="border border-white/30 hover:border-white text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
