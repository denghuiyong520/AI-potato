'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { usePathname } from 'next/navigation'   // ← Next.js native (returns full path with locale)
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ChevronRight, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CATEGORIES } from '@/data/products'
import { CATEGORY_TREE } from '@/data/categories'
import CartIcon from '@/components/cart/CartIcon'
import Image from 'next/image'

// ─── constants ────────────────────────────────────────────────────────────────
const LOCALES      = ['en', 'zh', 'fr', 'de', 'es'] as const
const localeLabels: Record<string, string> = { en: 'EN', zh: '中文', fr: 'FR', de: 'DE', es: 'ES' }
const localeNames:  Record<string, string> = {
  en: 'English',
  zh: '中文',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
}

export default function Navbar() {
  const t      = useTranslations('nav')
  const locale = useLocale()
  const nativePath = usePathname()   // e.g. "/fr/products" — full path including locale

  const [scrolled,       setScrolled]       = useState(false)
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [langOpen,       setLangOpen]       = useState(false)
  const [productsOpen,   setProductsOpen]   = useState(false)
  const [mobileProdOpen, setMobileProdOpen] = useState(false)
  const [searchOpen,     setSearchOpen]     = useState(false)
  const [searchQuery,    setSearchQuery]    = useState('')

  const langRef     = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLLIElement>(null)
  const searchRef   = useRef<HTMLInputElement>(null)

  // Strip locale prefix from the native path → "/products"
  const parts            = nativePath.split('/').filter(Boolean)
  const hasLocalePrefix  = LOCALES.includes(parts[0] as typeof LOCALES[number])
  const pathWithoutLocale = '/' + (hasLocalePrefix ? parts.slice(1).join('/') : parts.join('/'))

  // Active-page detection (compare against locale-stripped path)
  const isHome           = pathWithoutLocale === '/'
  const isProductsActive = pathWithoutLocale.startsWith('/products')
  const isAbout          = pathWithoutLocale === '/about'
  const isServices       = pathWithoutLocale === '/services'
  const isPortfolio      = pathWithoutLocale === '/portfolio'
  const isBlog           = pathWithoutLocale === '/blog'
  const isContact        = pathWithoutLocale === '/contact'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMobileProdOpen(false)
    setSearchOpen(false)
    setSearchQuery('')
  }, [nativePath])

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 60)
  }, [searchOpen])

  // Locale switch: manually build URL to avoid next-intl path-doubling bug
  function changeLocale(newLocale: string) {
    const qs       = window.location.search   // preserve query string e.g. ?category=hoodies
    const newPath  = '/' + newLocale + (pathWithoutLocale === '/' ? '' : pathWithoutLocale)
    window.location.href = newPath + qs
    setLangOpen(false)
    setMobileOpen(false)
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = '/' + locale + '/products?search=' + encodeURIComponent(searchQuery.trim())
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  void CATEGORIES // kept for reference; mega menu now uses CATEGORY_TREE

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-40 bg-[#111111] transition-shadow duration-300',
        scrolled && 'shadow-[0_2px_24px_rgba(0,0,0,0.6)]',
      )}
    >
      {/* ── Search overlay ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-[#111111] z-10 flex items-center px-6"
          >
            <form onSubmit={handleSearch} className="flex items-center gap-3 w-full max-w-xl mx-auto">
              <Search size={16} className="text-white/40 shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products…"
                className="flex-1 bg-transparent text-white placeholder-white/35 text-sm outline-none border-b border-white/20 focus:border-white/50 pb-1 transition-colors"
              />
              <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                className="p-1.5 text-white/40 hover:text-white transition-colors" aria-label="Close search">
                <X size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main bar ───────────────────────────────────────────────────────── */}
      {/* 'desk' is a custom Tailwind breakpoint defined in tailwind.config.ts at 960px */}
      <div className="container-site flex items-center h-16">

        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 mr-8 flex items-center opacity-95 hover:opacity-100 transition-opacity duration-200"
        >
          <Image
            src="/logo-nav.png"
            alt="Potato Apparel"
            width={212}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* ── Desktop nav — visible at 960px+ ────────────────────────────── */}
        <ul className="hidden md:flex flex-1 items-center justify-center h-full">

          <li className="h-full flex items-center">
            <NavLink href="/" active={isHome}>{t('home')}</NavLink>
          </li>

          {/* Products — Mega Menu */}
          <li ref={productsRef} className="relative h-full flex items-center"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <NavLink href="/products" active={isProductsActive} chevron>
              {t('products')}
            </NavLink>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.16 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full z-50 pt-2"
                  style={{ width: 520 }}
                >
                  <div className="bg-[#1a1a1a] border border-white/[0.08] rounded-2xl p-5 shadow-[0_16px_56px_rgba(0,0,0,0.7)]">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.07]">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                        Browse
                      </span>
                      <Link
                        href="/products"
                        onClick={() => setProductsOpen(false)}
                        className="flex items-center gap-1 text-[12px] font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        All Products <ChevronRight size={11} />
                      </Link>
                    </div>

                    {/* Category columns — 3-column grid */}
                    <div className="grid grid-cols-3 gap-x-5 gap-y-0">
                      {CATEGORY_TREE.map((cat) => (
                        <div key={cat.value} className="mb-4">
                          {/* Parent link */}
                          <Link
                            href={`/products?category=${cat.value}`}
                            onClick={() => setProductsOpen(false)}
                            className="block text-[13px] font-semibold text-white/85 hover:text-white transition-colors mb-1.5"
                          >
                            {cat.label}
                          </Link>
                          {/* Subcategory links */}
                          {cat.subcategories?.map((sub) => (
                            <Link
                              key={sub.value}
                              href={`/products?category=${cat.value}&sub=${sub.value}`}
                              onClick={() => setProductsOpen(false)}
                              className="block text-[12px] text-white/38 hover:text-white/75 transition-colors py-0.5 pl-1"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li className="h-full flex items-center">
            <NavLink href="/services"  active={isServices}>{t('services')}</NavLink>
          </li>
          <li className="h-full flex items-center">
            <NavLink href="/portfolio" active={isPortfolio}>{t('portfolio')}</NavLink>
          </li>
          <li className="h-full flex items-center">
            <NavLink href="/about"     active={isAbout}>{t('about')}</NavLink>
          </li>
          <li className="h-full flex items-center">
            <NavLink href="/blog"      active={isBlog}>{t('blog')}</NavLink>
          </li>
          <li className="h-full flex items-center">
            <NavLink href="/contact"   active={isContact}>{t('contact')}</NavLink>
          </li>
        </ul>

        {/* ── Desktop right actions — visible at 960px+ ──────────────────── */}
        <div className="hidden md:flex items-center gap-1 ml-auto shrink-0">

          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1 text-[13px] font-medium px-3 py-2 text-white/55 hover:text-white transition-colors"
              aria-label={t('language')}
            >
              {localeLabels[locale]}
              <ChevronDown size={11} className={cn('transition-transform', langOpen && 'rotate-180')} />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.14 }}
                  className="absolute right-0 top-full mt-1.5 w-36 bg-[#1a1a1a] border border-white/[0.08] rounded-xl py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
                >
                  {Object.entries(localeNames).map(([loc, name]) => (
                    <button key={loc} onClick={() => changeLocale(loc)}
                      className={cn(
                        'w-full text-left px-4 py-2.5 text-[13px] transition-colors',
                        loc === locale
                          ? 'bg-white/10 text-white font-medium'
                          : 'text-white/55 hover:bg-white/[0.06] hover:text-white',
                      )}
                    >
                      {localeLabels[loc]} — {name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search */}
          <button onClick={() => setSearchOpen(true)}
            className="p-2.5 text-white/55 hover:text-white transition-colors" aria-label="Search">
            <Search size={16} />
          </button>

          {/* Cart icon */}
          <CartIcon className="ml-2 text-white/70 hover:text-white transition-colors" />

          {/* Get Quote */}
          <Link href="/contact"
            className="ml-3 text-[13px] font-semibold px-5 py-2 rounded-full bg-violet-600 text-white hover:bg-violet-500 transition-colors whitespace-nowrap"
          >
            {t('getQuote')}
          </Link>
        </div>

        {/* ── Mobile right (search + hamburger) — hidden at 960px+ ───────── */}
        <div className="md:hidden flex items-center gap-0.5 ml-auto">
          {/* Cart icon (mobile) */}
          <CartIcon className="p-2 text-white/70 hover:text-white transition-colors" />
          <button onClick={() => setSearchOpen((o) => !o)}
            className="p-2.5 text-white/55 hover:text-white transition-colors" aria-label="Search">
            <Search size={18} />
          </button>
          <button className="p-2 text-white transition-colors"
            onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer — hidden at 960px+ ───────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden bg-[#111111] border-t border-white/[0.08] overflow-hidden"
          >
            <div className="container-site py-4 space-y-0.5">

              <Link href="/"
                className={cn('block px-4 py-3 text-sm font-medium transition-colors',
                  isHome ? 'text-white' : 'text-white/55 hover:text-white')}
              >
                {t('home')}
              </Link>

              {/* Products expandable */}
              <div>
                <button onClick={() => setMobileProdOpen((o) => !o)}
                  className={cn(
                    'flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-colors',
                    isProductsActive ? 'text-white' : 'text-white/55 hover:text-white',
                  )}
                >
                  {t('products')}
                  <ChevronDown size={14} className={cn('transition-transform', mobileProdOpen && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {mobileProdOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pb-2 space-y-0">
                        <Link href="/products"
                          className="block px-4 py-2 text-sm font-semibold text-white/80 hover:text-white"
                        >
                          All Products
                        </Link>
                        {CATEGORY_TREE.map((cat) => (
                          <div key={cat.value}>
                            <Link href={`/products?category=${cat.value}`}
                              className="block px-4 py-2 text-sm font-semibold text-white/55 hover:text-white"
                            >
                              {cat.label}
                            </Link>
                            {cat.subcategories?.map((sub) => (
                              <Link key={sub.value}
                                href={`/products?category=${cat.value}&sub=${sub.value}`}
                                className="block pl-8 pr-4 py-1.5 text-[12px] text-white/30 hover:text-white/70"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {([
                { href: '/services',  label: t('services'),  active: isServices  },
                { href: '/portfolio', label: t('portfolio'), active: isPortfolio },
                { href: '/about',     label: t('about'),     active: isAbout     },
                { href: '/blog',      label: t('blog'),      active: isBlog      },
                { href: '/contact',   label: t('contact'),   active: isContact   },
              ] as const).map(({ href, label, active }) => (
                <Link key={href} href={href}
                  className={cn('block px-4 py-3 text-sm font-medium transition-colors',
                    active ? 'text-white' : 'text-white/55 hover:text-white')}
                >
                  {label}
                </Link>
              ))}

              {/* Language switcher */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center gap-2">
                {LOCALES.map((loc) => (
                  <button key={loc} onClick={() => changeLocale(loc)}
                    className={cn(
                      'text-xs px-3 py-1.5 rounded-full border transition-colors',
                      loc === locale
                        ? 'bg-violet-600 text-white border-violet-600'
                        : 'border-white/20 text-white/45 hover:border-white/50 hover:text-white',
                    )}
                  >
                    {localeLabels[loc]}
                  </button>
                ))}
              </div>

              <Link href="/contact"
                className="block text-center text-sm font-semibold px-5 py-3 bg-violet-600 text-white rounded-full hover:bg-violet-500 transition-colors mt-2"
              >
                {t('getQuote')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ── Reusable desktop nav link with active underline ───────────────────────────
function NavLink({
  href,
  active,
  chevron,
  children,
}: {
  href: string
  active: boolean
  chevron?: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        'relative flex items-center gap-0.5 h-full px-3 text-[13px] font-medium transition-colors whitespace-nowrap',
        active ? 'text-white' : 'text-white/55 hover:text-white',
      )}
    >
      {children}
      {chevron && <ChevronDown size={11} className="mt-px text-white/40" />}
      {active && (
        <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-violet-400" />
      )}
    </Link>
  )
}
