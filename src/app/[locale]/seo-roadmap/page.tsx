import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { ArrowRight, TrendingUp, FileText, Link2, Target, BarChart2, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'SEO Roadmap & Blog Content Strategy | Potato Apparel',
  description: 'Our 12-month SEO roadmap and 100 target blog topics for custom apparel manufacturing keywords.',
  robots: { index: false, follow: true },
}

const months = [
  {
    period: 'Month 1–2',
    phase: 'Technical Foundation',
    icon: Target,
    color: 'bg-blue-600',
    tasks: [
      'Submit XML sitemap to Google Search Console & Bing Webmaster Tools',
      'Set up Google Analytics 4 with enhanced e-commerce events',
      'Configure hreflang tags for all 5 language variants',
      'Audit and fix all crawl errors, broken links, and redirect chains',
      'Add canonical tags to all pages',
      'Compress images and improve Core Web Vitals (LCP < 2.5s)',
      'Create Google Business Profile (Guangzhou factory + UK contact)',
      'Set up Bing Webmaster Tools',
      'Verify domain authority baseline with Ahrefs/Semrush',
      'Submit to 5 key apparel industry directories',
    ],
  },
  {
    period: 'Month 3–4',
    phase: 'On-Page Optimisation',
    icon: FileText,
    color: 'bg-violet-600',
    tasks: [
      'Publish 8 high-priority blog posts (custom t-shirt, hoodie, streetwear, bulk apparel keywords)',
      'Optimise all product pages with keyword-rich descriptions',
      'Add FAQ schema to key product category pages',
      'Create individual landing pages for: T-Shirts, Hoodies, Activewear, Streetwear, Polo Shirts',
      'Add customer testimonials with Schema markup to homepage',
      'Improve About page with manufacturing timeline and team content',
      'Create country-specific landing pages (US, UK, Australia, UAE)',
      'Add BreadcrumbList schema to all pages',
      'Optimise image alt tags across all pages',
      'A/B test homepage CTA button copy',
    ],
  },
  {
    period: 'Month 5–6',
    phase: 'Content Expansion',
    icon: TrendingUp,
    color: 'bg-green-600',
    tasks: [
      'Publish 15 additional blog posts targeting long-tail keywords',
      'Create a Manufacturer Comparison page (vs. Alibaba, vs. Printful)',
      'Publish a Fabric Guide (cotton types, GSM guide, performance fabrics)',
      'Create a Free MOQ Calculator tool page',
      'Launch a Lookbook/Style Guide tied to seasonal collections',
      'Write 5 detailed customer case studies with results',
      'Publish Embroidery and Screen Printing capability pages',
      'Create a Sustainability page (OEKO-TEX, organic cotton, rPET)',
      'Develop a Size Guide Hub page',
      'Publish a Glossary of Apparel Manufacturing Terms',
    ],
  },
  {
    period: 'Month 7–8',
    phase: 'Link Building',
    icon: Link2,
    color: 'bg-orange-600',
    tasks: [
      'Guest post outreach: 20 fashion/e-commerce blogs',
      'Submit to apparel manufacturer directories: ThomasNet, Maker\'s Row, Sewport',
      'HARO (Help a Reporter Out) responses for fashion/manufacturing queries',
      'Create shareable infographic: "The Anatomy of a Perfect Hoodie"',
      'Reach out to Shopify and Amazon seller blogs for feature articles',
      'Sponsor or participate in fashion startup podcasts',
      'Build relationships with clothing brand accelerators for referrals',
      'Create partner program for fashion consultants and sourcing agents',
      'Submit to e-commerce and DTC brand resource directories',
      'Pursue links from fashion school and design college resource pages',
    ],
  },
  {
    period: 'Month 9–10',
    phase: 'Authority Building',
    icon: BarChart2,
    color: 'bg-red-600',
    tasks: [
      'Publish 20 additional blog posts based on top-performing content',
      'Create a YouTube series: "How We Make [Product Type]" factory tours',
      'Launch monthly newsletter with manufacturing tips (grows email list)',
      'Publish annual Apparel Manufacturing Cost Report',
      'Create comparison content: "Best Custom T-Shirt Manufacturers [Year]"',
      'Develop a Tech Pack Template (free download, captures email)',
      'Build a pricing calculator for custom garment orders',
      'Pursue quotes in major e-commerce and fashion publications',
      'Partner with 3 DTC brand accelerators for preferred supplier status',
      'Create video testimonials with top client brands',
    ],
  },
  {
    period: 'Month 11–12',
    phase: 'Scale & Optimise',
    icon: Globe,
    color: 'bg-teal-600',
    tasks: [
      'Launch programmatic SEO for product subcategory pages (1,000+ pages)',
      'Expand blog to 60+ total articles',
      'Create market-specific content: US customs, UK tariffs, EU regulations',
      'Add Reviews/Testimonials schema to product pages',
      'Build a clothing brand community forum or discussion board',
      'Launch seasonal content calendar (Summer collection, Holiday gifts)',
      'Test AI-overview-optimised FAQ content (AEO)',
      'International hreflang expansion: Arabic, Dutch language content',
      'Analyse top-performing pages and double content investment there',
      'Set quarterly OKRs for organic traffic, keyword rankings, and leads',
    ],
  },
]

const blogTopics = [
  {
    cluster: 'Custom T-Shirt Manufacturing',
    keyword: 'custom t shirt manufacturer',
    topics: [
      'How to Find the Best Custom T-Shirt Manufacturer (2024 Guide)',
      'Custom T-Shirt MOQ: What to Expect from Different Manufacturers',
      'Best Fabrics for Custom T-Shirts: A Complete GSM Guide',
      'Custom T-Shirt Pricing: What It Really Costs in 2024',
      'How to Create a T-Shirt Tech Pack (Free Template)',
      'Screen Printing vs DTG for Custom T-Shirts',
      'Wholesale T-Shirt Manufacturing: From 50 to 50,000 Units',
      'Organic Cotton T-Shirt Manufacturing: What to Know',
      'Custom Heavyweight T-Shirts: The Buyer\'s Guide',
      'Custom T-Shirt Manufacturer vs. Blank Wholesale: Which Is Right?',
    ],
  },
  {
    cluster: 'Custom Hoodie Manufacturing',
    keyword: 'custom hoodie manufacturer',
    topics: [
      'Custom Hoodie Manufacturer: The Complete Brand Guide',
      'Hoodie Fleece Weight Guide: 280gsm vs 380gsm vs 500gsm',
      'Custom Zip-Up Hoodie Manufacturing: Everything You Need to Know',
      'Oversized Hoodie Manufacturing: Silhouette and Pattern Guide',
      'Premium Hoodie Construction: What Separates Good from Great',
      'Custom Hoodie Embroidery: Cost, Design, and Technique Guide',
      'How to Source Cropped Hoodies for Your Brand',
      'Blank vs Custom Hoodies: Which Should Your Brand Start With?',
      'French Terry vs Brushed Fleece: Choosing the Right Hoodie Fabric',
      'Custom Sweatshirt Manufacturing: A Complete Guide',
    ],
  },
  {
    cluster: 'Private Label Clothing',
    keyword: 'private label clothing manufacturer',
    topics: [
      'Private Label Clothing Manufacturing: The Complete Brand Guide',
      'How to Start a Private Label Clothing Brand in 2024',
      'Private Label vs White Label Apparel: Understanding the Difference',
      'Building Your Private Label Brand Identity Through Manufacturing',
      'Private Label Clothing for Amazon: A Seller\'s Full Guide',
      'How to Create Custom Woven Labels for Your Clothing Brand',
      'Private Label Activewear: Sourcing Guide for Fitness Brands',
      'Private Label Streetwear: From Concept to Collection',
      'Custom Hang Tags and Packaging for Private Label Clothing',
      'NDA and IP Protection When Working with Clothing Manufacturers',
    ],
  },
  {
    cluster: 'Streetwear Manufacturing',
    keyword: 'streetwear manufacturer',
    topics: [
      'How to Find a Streetwear Manufacturer for Your Brand',
      'Heavyweight Streetwear Fabrics: A Complete Sourcing Guide',
      'Oversized Clothing Manufacturer: What to Look For',
      'Custom Cargo Pants Manufacturing: Construction and Sourcing',
      'Streetwear Graphic Printing: Screen Print, Embroidery & Beyond',
      'How to Source Custom Bombers and Track Jackets',
      'Vintage Wash Clothing Manufacturing: Techniques and Costs',
      'Premium Streetwear Construction Details That Signal Quality',
      'How to Launch a Streetwear Brand on a Budget',
      'Streetwear Brand Lookbook: How to Create One with Your Manufacturer',
    ],
  },
  {
    cluster: 'Bulk Apparel Ordering',
    keyword: 'bulk apparel supplier',
    topics: [
      'Bulk Apparel Ordering: The Complete Guide for Businesses',
      'How to Calculate the Right Inventory Quantity for Your Brand',
      'Bulk Clothing Orders from China: Step-by-Step Guide',
      'AQL Inspection in Apparel: What It Means and Why It Matters',
      'How to Negotiate Better Pricing on Bulk Clothing Orders',
      'Managing Quality in Large Apparel Production Runs',
      'Sea Freight vs Air Freight for Bulk Apparel: Cost Comparison',
      'Import Duties on Clothing: US, UK, EU, and Australia Guide',
      'Bulk Activewear Sourcing for Gyms and Fitness Brands',
      'Bulk Uniform Manufacturing: Schools, Hospitality, and Corporate',
    ],
  },
  {
    cluster: 'Custom Apparel for E-Commerce',
    keyword: 'custom apparel supplier',
    topics: [
      'How to Source Custom Clothing for Your Shopify Store',
      'Finding a Clothing Supplier for Amazon FBA: Full Seller Guide',
      'Custom Clothing for TikTok Shop Sellers: What to Know',
      'DTC Clothing Brand Unit Economics: Calculating True Margins',
      'How to Use Pre-Orders to Fund Your First Clothing Production',
      'Print-on-Demand vs Cut & Sew: Which Is Right for Your Brand?',
      'E-Commerce Clothing Photography: Working with Your Manufacturer',
      'How to Write Compelling Product Descriptions for Custom Clothing',
      'Sizing Strategy for Online Clothing Brands to Reduce Returns',
      'Inventory Planning for DTC Clothing Brands',
    ],
  },
  {
    cluster: 'Manufacturing Process & Quality',
    keyword: 'clothing manufacturer quality',
    topics: [
      'How to Create a Clothing Tech Pack (Step-by-Step Guide)',
      'What Is AQL and Why Does It Matter for Apparel Buyers?',
      'Understanding Fabric GSM: Complete Guide for Clothing Brands',
      'Pantone Color Matching in Apparel Manufacturing',
      'How to Read and Use a Garment Measurement Spec Sheet',
      'Clothing Factory Certifications: ISO, OEKO-TEX, BSCI Explained',
      'How to Conduct a Remote Factory Audit for Apparel',
      'First Article Inspection vs Full AQL: When to Use Each',
      'Garment Testing Standards: CPSC, REACH, EN71 for Different Markets',
      'Custom Embroidery vs Screen Printing: Complete Comparison',
    ],
  },
  {
    cluster: 'Specific Markets & Niches',
    keyword: 'apparel manufacturer for brands',
    topics: [
      'Custom Activewear Manufacturer: Sourcing Guide for Fitness Brands',
      'Sustainable Clothing Manufacturer: GOTS, OEKO-TEX, rPET Options',
      'Custom Polo Shirt Manufacturing for Corporate and Sports Brands',
      'Children\'s Clothing Manufacturing: Safety Standards and Sourcing',
      'Custom Swimwear Manufacturing: UPF, Chlorine Resistance Guide',
      'Luxury Basics Manufacturing: Premium Fabrics and Construction',
      'Custom Workwear and Uniform Manufacturing Guide',
      'Athletic Apparel Manufacturing: Technical Fabric Sourcing',
      'Plus-Size Clothing Manufacturing: Pattern and Sizing Guide',
      'Custom Outerwear Manufacturing: Jackets, Coats, and Puffers',
    ],
  },
  {
    cluster: 'Shipping & Logistics',
    keyword: 'clothing supplier shipping',
    topics: [
      'Shipping Custom Apparel from China: Complete 2024 Guide',
      'Amazon FBA Prep Requirements for Clothing from Overseas Suppliers',
      'DDP vs DDU Shipping for Apparel Buyers: What to Choose',
      'How Long Does Custom Clothing Take to Manufacture and Ship?',
      'Sea Freight for Apparel: When It Makes Sense (Cost Calculator)',
      'Customs and Import Duties for Clothing: US, UK, EU Guide',
      'How to Ship Clothing Samples Internationally',
      'Freight Forwarder vs. Courier for Apparel Shipments',
      'Packaging Standards for Retail-Ready Clothing Shipments',
      'How to Ship Directly to Amazon FBA from a Chinese Manufacturer',
    ],
  },
  {
    cluster: 'Brand Building & Business',
    keyword: 'start clothing brand',
    topics: [
      'How to Start a Clothing Brand: Complete Step-by-Step Guide',
      'Clothing Brand Business Plan: Template and Key Sections',
      'How Much Does It Cost to Start a Clothing Brand?',
      'Clothing Brand MOQ Strategy: Starting Small, Scaling Smart',
      'Building Your Clothing Brand Story Around Manufacturing Quality',
      'Funding Your First Clothing Collection: Options and Strategy',
      'Clothing Brand Legal Basics: Trademarks, LLC, and Contracts',
      'How to Price Custom Clothing for Retail and Wholesale',
      'Shopify vs. Amazon for DTC Clothing Brands: Comparison',
      'Scaling a Clothing Brand: When to Increase MOQ and Diversify',
    ],
  },
]

export default function SEORoadmapPage() {
  const totalTopics = blogTopics.reduce((sum, c) => sum + c.topics.length, 0)

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container-site max-w-5xl">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            Internal SEO Strategy
          </span>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-gray-900 mb-4">
            12-Month SEO Roadmap
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Potato Apparel organic growth strategy covering technical SEO, content, link building, and authority. Target: top 3 rankings for custom apparel manufacturer keywords in 9 markets.
          </p>
        </div>

        {/* Target keywords */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-12">
          <h2 className="font-bold text-gray-900 mb-4">Primary Target Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'custom t shirt manufacturer',
              'custom hoodie manufacturer',
              'private label clothing manufacturer',
              'streetwear manufacturer',
              'bulk apparel supplier',
              'custom apparel supplier',
              'OEM clothing manufacturer',
              'low MOQ clothing manufacturer',
              'custom clothing manufacturer China',
            ].map((kw) => (
              <span key={kw} className="bg-violet-100 text-violet-700 text-sm font-medium px-3 py-1.5 rounded-full">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Monthly Roadmap */}
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-8">Monthly Execution Plan</h2>
        <div className="space-y-6 mb-16">
          {months.map(({ period, phase, icon: Icon, color, tasks }) => (
            <div key={period} className="border border-gray-100 rounded-2xl overflow-hidden">
              <div className={`${color} px-6 py-4 flex items-center gap-3`}>
                <Icon size={20} className="text-white" />
                <div>
                  <span className="text-white/70 text-xs font-bold uppercase tracking-widest">{period}</span>
                  <h3 className="text-white font-bold text-lg">{phase}</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 bg-gray-100 text-gray-500 text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* 100 Blog Topics */}
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-3">
          {totalTopics} SEO Blog Topics
        </h2>
        <p className="text-gray-500 mb-8">
          Organised by keyword cluster. Each topic targets a specific search intent with internal links to product pages, service pages, and CTAs.
        </p>

        <div className="space-y-8">
          {blogTopics.map(({ cluster, keyword, topics }) => (
            <div key={cluster} className="border border-gray-100 rounded-2xl p-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h3 className="font-bold text-gray-900 text-lg">{cluster}</h3>
                <span className="text-xs bg-violet-100 text-violet-700 px-2.5 py-1 rounded-full font-medium">
                  Target: &ldquo;{keyword}&rdquo;
                </span>
              </div>
              <ol className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {topics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-violet-400 font-bold text-xs mt-0.5 shrink-0 w-5">{i + 1}.</span>
                    {topic}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* KPI targets */}
        <div className="mt-12 bg-gray-950 text-white rounded-2xl p-8">
          <h2 className="font-display font-bold text-2xl mb-6">12-Month KPI Targets</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { metric: 'Organic Sessions / Month', target: '15,000+', baseline: '~500' },
              { metric: 'Keywords Ranking Top 10', target: '200+', baseline: '~10' },
              { metric: 'Organic Leads / Month', target: '80+', baseline: '~5' },
              { metric: 'Domain Rating (Ahrefs)', target: '35+', baseline: '~10' },
              { metric: 'Blog Articles Published', target: '60+', baseline: '4' },
              { metric: 'Referring Domains', target: '100+', baseline: '~10' },
            ].map(({ metric, target, baseline }) => (
              <div key={metric} className="bg-white/5 rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-1">{metric}</p>
                <p className="text-2xl font-bold font-display text-white mb-0.5">{target}</p>
                <p className="text-gray-500 text-xs">from {baseline}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-violet-600 text-white font-semibold px-8 py-4 rounded-full hover:bg-violet-700 transition-colors"
          >
            View Published Blog Articles <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
