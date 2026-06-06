import type { ReactNode } from 'react'
import { Playfair_Display, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

// ─── Google Analytics 4 ───────────────────────────────────────────────────────
// Replace G-XXXXXXXXXX with your real Measurement ID from:
//   GA4 → Admin → Data Streams → Web stream → Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-XXXXXXXXXX'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-[var(--bg-base)] text-[var(--text-primary)]" suppressHydrationWarning>
        {children}

        {/* ── Google Analytics 4 ─────────────────────────────────────────────
            strategy="afterInteractive" loads after hydration — does not
            block rendering or affect Core Web Vitals (LCP / FID / CLS).
            Swap G-XXXXXXXXXX → real ID, or set NEXT_PUBLIC_GA_MEASUREMENT_ID
            in .env.local / Vercel environment variables.
        ─────────────────────────────────────────────────────────────────── */}
        {GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
