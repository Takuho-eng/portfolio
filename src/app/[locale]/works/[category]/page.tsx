import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import Nav from '@/components/ui/Nav'

const themes: Record<string, { bg: string; text: string; label: string }> = {
  engineer: { bg: '#DDE5F0', text: '#3A5A9A', label: 'ENGINEER' },
  video: { bg: '#EAE2F2', text: '#6B5EA8', label: 'VIDEO' },
  design: { bg: '#DCF0E2', text: '#2D7A45', label: 'DESIGN' },
  education: { bg: '#F0ECDC', text: '#7A6520', label: 'EDU' },
  food: { bg: '#F0E0DE', text: '#8A2D2D', label: 'F&B' }
}

const categories = Object.keys(themes)

type Highlight = { title: string; meta: string; desc: string; href?: string; img?: string }

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    categories.map((category) => ({ locale, category }))
  )
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; category: string }>
}) {
  const { locale, category } = await params
  if (!(category in themes)) return {}
  const t = await getTranslations({
    locale,
    namespace: `workPages.categories.${category}`
  })
  return { title: `${t('title')} | TAKU WORKS` }
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ locale: string; category: string }>
}) {
  const { locale, category } = await params
  if (!hasLocale(routing.locales, locale) || !(category in themes)) notFound()
  setRequestLocale(locale)

  const theme = themes[category]
  const t = await getTranslations('workPages')
  const tc = await getTranslations(`workPages.categories.${category}`)
  const skills = tc.raw('skills') as string[]
  const highlights = tc.raw('highlights') as Highlight[]

  return (
    <main className="min-h-screen bg-[#F0EDE4]">
      <Nav />

      <header className="px-6 pt-10 pb-8" style={{ backgroundColor: theme.bg }}>
        <Link
          href="/#works"
          className="inline-flex items-center gap-1.5 text-xs text-[#2D2D2D]/55 hover:text-[#2D2D2D] transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          {t('backHome')}
        </Link>
        <div className="font-bebas text-6xl leading-none tracking-wide" style={{ color: theme.text }}>
          {theme.label}
        </div>
        <div className="mt-3 flex items-baseline gap-3">
          <h1 className="text-lg font-medium text-[#2D2D2D]">{tc('title')}</h1>
          <span className="text-xs text-[#2D2D2D]/55">{tc('subtitle')}</span>
        </div>
      </header>

      <section className="px-6 py-8 border-t border-[#2D2D2D]/10">
        <p className="text-sm leading-relaxed text-[#2D2D2D]/75">{tc('intro')}</p>
      </section>

      <section className="px-6 py-8 border-t border-[#2D2D2D]/10">
        <h2 className="font-bebas text-3xl text-[#2D2D2D] tracking-wider mb-5">
          {t('highlightsTitle')}
        </h2>
        <div className="flex flex-col gap-3">
          {highlights.map((item, i) => {
            const card = (
              <div className="rounded-xl overflow-hidden border border-[#2D2D2D]/8 bg-[#2D2D2D]/5 hover:border-[#2D2D2D]/25 transition-colors">
                {item.img && (
                  <div className="flex justify-center" style={{ backgroundColor: theme.bg }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.img} alt={item.title} loading="lazy" className="w-full h-auto max-h-[560px] object-contain" />
                  </div>
                )}
                <div className="flex items-start justify-between gap-3 p-4">
                  <div>
                    <div className="text-sm text-[#2D2D2D] font-medium leading-snug">{item.title}</div>
                    <div className="text-[10px] text-[#2D2D2D]/45 mt-1">{item.meta}</div>
                    <p className="text-xs text-[#2D2D2D]/65 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                  {item.href && (
                    <span
                      className="shrink-0 inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider"
                      style={{ color: theme.text }}
                    >
                      {t('viewDetail')}
                      <ArrowUpRight size={12} />
                    </span>
                  )}
                </div>
              </div>
            )
            if (!item.href) return <div key={i}>{card}</div>
            return item.href.startsWith('http') ? (
              <a key={i} href={item.href} target="_blank" rel="noopener noreferrer">{card}</a>
            ) : (
              <Link key={i} href={item.href}>{card}</Link>
            )
          })}
        </div>
      </section>

      <section className="px-6 py-8 border-t border-[#2D2D2D]/10">
        <h2 className="font-bebas text-3xl text-[#2D2D2D] tracking-wider mb-5">
          {t('skillsTitle')}
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-3 py-1.5 rounded-full border border-[#2D2D2D]/12"
              style={{ backgroundColor: theme.bg, color: theme.text }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}
