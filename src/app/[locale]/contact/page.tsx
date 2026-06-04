import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { Mail, MessageCircle, MapPin, Clock } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import InquiryForm from '@/components/contact/InquiryForm'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact.meta' })
  return { title: t('title'), description: t('description') }
}

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'contact' })

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Potato Apparel',
    description: 'Contact page for Potato Apparel OEM/ODM clothing manufacturer.',
    url: 'https://potatoapparel.com/contact', // TODO: replace with real domain
  }

  const contactItems = [
    {
      icon:  Mail,
      label: t('info.email'),
      value: 'sales@potatoapparel.com',
      href:  'mailto:sales@potatoapparel.com',
    },
    {
      icon:  MessageCircle,
      label: t('info.whatsapp'),
      value: '+44 7907 131539',
      href:  'https://wa.me/447907131539',
    },
    {
      icon:  MapPin,
      label: t('info.address'),
      value: t('info.addressValue'),
      href:  'https://maps.google.com/?q=Haizhu+District+Guangzhou+China',
    },
    {
      icon:  Clock,
      label: t('info.hours'),
      value: t('info.hoursValue'),
      href:  undefined,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-14 lg:pt-40 lg:pb-16 bg-[var(--bg-surface)]">
        <div className="container-site text-center max-w-2xl mx-auto">
          <AnimatedSection>
            <h1 className="font-display font-bold text-ink mb-4"
                style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)', lineHeight: 1.1 }}>
              {t('hero.title')}
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-ink-muted text-lg leading-relaxed">{t('hero.subtitle')}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-[var(--bg-base)]">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Contact info sidebar */}
            <AnimatedSection direction="right" className="lg:col-span-1">
              <div className="space-y-6">
                <h2 className="font-display font-bold text-xl text-ink">{t('info.title')}</h2>
                <div className="space-y-5">
                  {contactItems.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={16} className="text-violet-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-0.5">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-sm text-ink hover:text-violet-600 transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm text-ink-muted">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social links */}
                <div className="pt-4 border-t border-cream-200">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
                    Follow Us
                  </p>
                  <div className="flex gap-3">
                    {/* YouTube */}
                    <a
                      href="https://youtube.com/@denghuiyong520"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-ink-muted hover:text-ink border border-cream-200 rounded-full px-3 py-1.5 transition-colors"
                    >
                      YouTube
                    </a>
                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/denghuiyong520"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-ink-muted hover:text-ink border border-cream-200 rounded-full px-3 py-1.5 transition-colors"
                    >
                      Instagram
                    </a>
                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/447907131539"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#25D366] hover:text-white hover:bg-[#25D366] border border-[#25D366]/30 hover:border-[#25D366] rounded-full px-3 py-1.5 transition-all"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Inquiry form */}
            <AnimatedSection direction="left" delay={0.1} className="lg:col-span-2">
              <Suspense fallback={<div className="h-96 bg-cream-50 rounded-2xl animate-pulse" />}>
                <InquiryForm />
              </Suspense>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
