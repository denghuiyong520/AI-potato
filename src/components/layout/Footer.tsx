import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Mail, MessageCircle, MapPin, Clock, Youtube, Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  const t  = useTranslations('footer')
  const tn = useTranslations('nav')

  const quickLinks = [
    { href: '/',          label: tn('home')      },
    { href: '/about',     label: tn('about')     },
    { href: '/products',  label: tn('products')  },
    { href: '/services',  label: tn('services')  },
    { href: '/portfolio', label: tn('portfolio') },
    { href: '/factory',   label: 'Manufacturing' },
    { href: '/blog',      label: tn('blog')      },
    { href: '/contact',   label: tn('contact')   },
  ]

  const trustLinks = [
    { href: '/custom-process',    label: 'Custom Process'    },
    { href: '/quality-guarantee', label: 'Quality Guarantee' },
    { href: '/shipping-policy',   label: 'Shipping Policy'   },
    { href: '/tools',             label: 'Free Tools'        },
    { href: '/faq',               label: 'FAQ'               },
  ]

  return (
    <footer className="bg-ink text-cream-300 pt-16 pb-8">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <p className="font-display font-bold text-cream-100 tracking-[0.12em] text-sm uppercase mb-4">
              Potato Apparel
            </p>
            <p className="text-sm leading-relaxed text-cream-500 max-w-xs">
              {t('tagline')}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://youtube.com/@denghuiyong520"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-cream-500 hover:text-cream-100 transition-colors"
              >
                <Youtube size={18} />
              </a>

              <a
                href="https://www.instagram.com/denghuiyong520"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-cream-500 hover:text-cream-100 transition-colors"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-cream-500 hover:text-cream-100 transition-colors"
              >
                <Facebook size={18} />
              </a>

              <a
                href="https://wa.me/447907131539"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-cream-500 hover:text-[#25D366] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cream-500 mb-5">
              {t('quickLinks')}
            </p>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-cream-400 hover:text-cream-100 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Support Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cream-500 mb-5">
              Support
            </p>
            <ul className="space-y-3">
              {trustLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-cream-400 hover:text-cream-100 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cream-500 mb-5">
              {t('contact')}
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-cream-500 mt-0.5 shrink-0" />
                <a href="mailto:sales@potatoapparel.com" className="text-sm text-cream-400 hover:text-cream-100 transition-colors">
                  sales@potatoapparel.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle size={15} className="text-cream-500 mt-0.5 shrink-0" />
                <a href="https://wa.me/447907131539" target="_blank" rel="noopener noreferrer" className="text-sm text-cream-400 hover:text-cream-100 transition-colors">
                  +44 7907 131539
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-cream-500 mt-0.5 shrink-0" />
                <span className="text-sm text-cream-500">{t('addressValue')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} className="text-cream-500 mt-0.5 shrink-0" />
                <span className="text-sm text-cream-500">{t('hoursValue')}</span>
              </li>
            </ul>
          </div>

          {/* CTA block */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cream-500 mb-5">
              Get Started
            </p>
            <div className="bg-ink-light/40 rounded-2xl p-5 border border-cream-800/20">
              <p className="font-display text-lg font-semibold text-cream-100 mb-2 leading-snug">
                {t('ctaTitle')}
              </p>
              <p className="text-xs text-cream-500 mb-4">
                {t('ctaSubtitle')}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center text-xs font-semibold px-5 py-2.5 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors w-full mb-2"
              >
                {t('ctaButton')}
              </Link>
              <a
                href="https://wa.me/447907131539"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-xs font-semibold px-5 py-2.5 border border-cream-700 text-cream-400 rounded-full hover:border-cream-500 hover:text-cream-200 transition-colors w-full"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream-800/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream-600">
            © {new Date().getFullYear()} Potato Apparel. {t('rights')}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/shipping-policy" className="text-xs text-cream-600 hover:text-cream-300 transition-colors">
              Shipping Policy
            </Link>
            <Link href="/quality-guarantee" className="text-xs text-cream-600 hover:text-cream-300 transition-colors">
              Quality Guarantee
            </Link>
            <Link href="/privacy-policy" className="text-xs text-cream-600 hover:text-cream-300 transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/terms-of-service" className="text-xs text-cream-600 hover:text-cream-300 transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
