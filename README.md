# Potato Apparel — B2B Clothing Manufacturer Website

A complete, production-ready Next.js 14 (App Router) website for **Potato Apparel**, a China-based OEM/ODM clothing manufacturer serving global brands.

## Tech Stack

- **Next.js 14** — App Router, TypeScript, Server Components
- **Tailwind CSS** — custom design tokens (cream palette + violet accent)
- **Framer Motion** — scroll-triggered animations, hover effects
- **next-intl v3** — 4-language i18n (EN/FR/DE/ES)
- **next-mdx-remote** — MDX blog content rendering
- **gray-matter + reading-time** — blog frontmatter parsing

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Project Structure

```
potato-apparel/
├── content/
│   └── blog/               # MDX blog articles (see "Adding Blog Articles" below)
├── messages/               # i18n translation files
│   ├── en.json             # English (default)
│   ├── fr.json             # French
│   ├── de.json             # German
│   └── es.json             # Spanish
├── public/                 # Static assets (add real images here)
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout (pass-through)
│   │   ├── sitemap.ts      # Dynamic sitemap
│   │   ├── robots.ts       # robots.txt
│   │   └── [locale]/       # All pages under locale routing
│   │       ├── layout.tsx  # Navbar + Footer + WhatsApp button
│   │       ├── page.tsx    # Homepage
│   │       ├── about/
│   │       ├── products/
│   │       ├── services/
│   │       ├── portfolio/
│   │       ├── blog/
│   │       │   ├── page.tsx
│   │       │   └── [slug]/page.tsx
│   │       └── contact/
│   ├── components/
│   │   ├── layout/         # Navbar, Footer, WhatsAppButton
│   │   ├── home/           # All homepage section components
│   │   ├── blog/           # BlogCard, BlogFilter
│   │   ├── contact/        # InquiryForm
│   │   └── shared/         # AnimatedSection, Button, SectionTitle
│   ├── i18n/               # next-intl routing + request config
│   └── lib/                # blog.ts, utils.ts
├── middleware.ts            # next-intl locale detection
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Pages

| Route | Page |
|-------|------|
| `/` | Homepage (Hero, Features, Products, Process, Stats, Testimonials, Blog preview, CTA) |
| `/about` | About Us (story, values, facility) |
| `/products` | Product catalog (8 categories) |
| `/services` | Services (process, MOQ tiers, fabrics, decoration techniques) |
| `/portfolio` | Work portfolio (filterable grid) |
| `/blog` | Blog list (filterable by category) |
| `/blog/[slug]` | Blog article (MDX, SEO structured data, related articles) |
| `/contact` | Contact + Inquiry form |

All pages are available in 4 languages: `en` (default, no prefix), `fr`, `de`, `es`.

---

## Adding a Blog Article

Blog articles are MDX files in `content/blog/`. To add a new post:

### 1. Create the MDX file

```bash
# Create content/blog/your-article-slug.mdx
```

### 2. Add frontmatter

```mdx
---
title: "Your Article Title Here"
description: "A 1–2 sentence summary for SEO and cards (150–160 chars recommended)."
date: "2025-01-15"
category: "Brand Building"   # Brand Building | Manufacturing | Design & Tech Pack | Industry Insights
author: "Potato Apparel Team"
tags: ["tag1", "tag2", "tag3"]
coverImage: "https://your-cdn.com/image.jpg"   # or leave blank for auto-placeholder
---

Your MDX content here...
```

### 3. Available categories

- `Brand Building`
- `Manufacturing`
- `Design & Tech Pack`
- `Industry Insights`

### 4. Write your content in MDX

Standard Markdown works. You can also use any HTML elements. Supported styles:
- `## Headings`
- `**bold**`, `*italic*`
- Ordered and unordered lists
- `> Blockquotes`
- Code blocks with `` ``` ``
- Tables
- Images: `![alt](url)`

The article will automatically appear in:
- The blog list page
- The "Latest Articles" section on the homepage (if it's among the 3 most recent)
- The sitemap

---

## Contact Form

The inquiry form at `/contact` currently **simulates** submission with `console.log()`.

To wire it to a real backend:
1. Open `src/components/contact/InquiryForm.tsx`
2. Find the comment `// TODO: Replace this mock with a real API call`
3. Create a Next.js API route at `src/app/api/inquire/route.ts`
4. Use a service like **Resend**, **Nodemailer**, or **EmailJS** to send form data to `Andy@prettypotato.com`

---

## Replacing Placeholder Content

Search for `// TODO:` in the codebase to find all items that need real content:

| What | Where |
|------|-------|
| Hero background image | `src/components/home/HeroSection.tsx` |
| Product category photos | `src/components/home/ProductCategoriesSection.tsx` |
| Factory/team photos | `src/app/[locale]/about/page.tsx` |
| Portfolio photos | `src/app/[locale]/portfolio/page.tsx` |
| Blog cover images | MDX frontmatter `coverImage` field |
| OG/social share image | `src/app/[locale]/layout.tsx` |
| Real domain | `src/app/sitemap.ts`, `robots.ts`, `layout.tsx` |
| Facebook link | `src/components/layout/Footer.tsx` (replace `href="#"`) |
| Company address | `src/components/layout/Footer.tsx` + contact page |
| Form backend | `src/components/contact/InquiryForm.tsx` |

---

## Contact Details (Pre-configured)

| Channel | Value |
|---------|-------|
| Email | Andy@prettypotato.com |
| WhatsApp | +44 7907 131539 |
| YouTube | https://youtube.com/@denghuiyong520 |
| Instagram | https://www.instagram.com/denghuiyong520 |
| Facebook | Placeholder `#` — update when page is created |
| Address | "Address coming soon" — update when confirmed |

---

## SEO

Every page includes:
- `<title>` and `<meta description>`
- Open Graph tags (og:title, og:description, og:image)
- Twitter Card meta
- `hreflang` alternate language links
- Canonical URL
- Blog posts include `Article` JSON-LD structured data
- `sitemap.xml` (auto-generated, includes all pages and blog posts)
- `robots.txt` (allows all, points to sitemap)

When you have a real domain, update `BASE_URL` in:
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/[locale]/layout.tsx`

---

## Deployment

### Vercel (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other platforms

```bash
npm run build
npm start
```

---

## License

Private — Potato Apparel. All rights reserved.
