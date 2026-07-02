import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import Nav from '@/components/ui/Nav'
import Reveal from '@/components/ui/Reveal'

const themes: Record<string, { bg: string; text: string; label: string; img: string; tint: string }> = {
  engineer: { bg: '#DDE5F0', text: '#3A5A9A', label: 'ENGINEER', img: '/img/card-eng.jpg', tint: '#1F3A6B' },
  video: { bg: '#EAE2F2', text: '#6B5EA8', label: 'VIDEO', img: '/img/card-video.jpg', tint: '#3E2F63' },
  design: { bg: '#DCF0E2', text: '#2D7A45', label: 'DESIGN', img: '/img/card-design.jpg', tint: '#194B2C' },
  education: { bg: '#F0ECDC', text: '#7A6520', label: 'EDU', img: '/img/card-edu.jpg', tint: '#5A4A14' },
  food: { bg: '#F0E0DE', text: '#8A2D2D', label: 'F&B', img: '/img/gelato.jpg', tint: '#6B1F1F' }
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

      {/* full-bleed image hero band */}
      <header className="relative min-h-[52vh] flex items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={theme.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundColor: theme.tint, opacity: 0.55 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a20]/80 via-transparent to-[#1a1a20]/25" />

        <div className="relative max-w-5xl mx-auto w-full px-6 sm:px-10 pt-24 pb-10">
          <Link
            href="/#works"
            className="group inline-flex items-center gap-2 font-ui text-[11px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            {t('backHome')}
          </Link>
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="font-display text-[64px] sm:text-[104px] leading-[0.85] font-semibold text-white drop-shadow-sm">
              {theme.label}
            </h1>
            <span className="font-mincho text-sm sm:text-base text-white/85 shrink-0">{tc('title')}</span>
          </div>
          <div className="font-ui text-xs tracking-[0.2em] uppercase text-white/70 mt-4">
            {tc('subtitle')}
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 sm:px-10 pt-14">
        <Reveal>
          <p className="font-mincho text-[15px] sm:text-base leading-loose text-[#2D2D2D]/70 max-w-2xl">
            {tc('intro')}
          </p>
        </Reveal>
      </section>

      {/* highlights */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-12">
        <Reveal className="flex items-baseline justify-between border-b border-[#2D2D2D]/15 pb-4 mb-10">
          <h2 className="font-display text-3xl sm:text-4xl text-[#2D2D2D] leading-none">Highlights</h2>
          <span className="font-mincho text-[11px] tracking-[0.3em] text-[#2D2D2D]/50">{t('highlightsTitle')}</span>
        </Reveal>

        <div className="flex flex-col gap-5">
          {highlights.map((item, i) => {
            const tags = item.meta.split(/[·・]/).map((s) => s.trim()).filter(Boolean)
            const num = String(i + 1).padStart(2, '0')
            const card = (
              <article
                className="group relative rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
                style={{ backgroundColor: `${theme.bg}59`, borderColor: `${theme.text}22` }}
              >
                {item.img && (
                  <div className="flex justify-center border-b border-[#2D2D2D]/8" style={{ backgroundColor: theme.bg }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.img} alt={item.title} loading="lazy" className="w-full h-auto max-h-[520px] object-contain" />
                  </div>
                )}
                <div className="p-6 sm:p-8">
                  <div className="flex gap-5 sm:gap-7">
                    <span
                      className="font-display text-4xl sm:text-5xl leading-none shrink-0 pt-0.5"
                      style={{ color: theme.text, opacity: 0.42 }}
                    >
                      {num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-mincho text-lg sm:text-xl text-[#2D2D2D] leading-snug">{item.title}</h3>
                        {item.href && (
                          <span
                            className="shrink-0 inline-flex items-center gap-1 font-ui text-[10px] tracking-[0.15em] uppercase transition-transform group-hover:translate-x-0.5"
                            style={{ color: theme.text }}
                          >
                            {t('viewDetail')}
                            <ArrowUpRight size={13} />
                          </span>
                        )}
                      </div>
                      <p className="font-mincho text-sm text-[#2D2D2D]/70 mt-3 leading-loose">{item.desc}</p>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-5">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-ui text-[11px] tracking-wide px-2.5 py-1 rounded-full border bg-white/50"
                              style={{ borderColor: `${theme.text}33`, color: theme.text }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            )
            const inner = !item.href ? (
              card
            ) : item.href.startsWith('http') ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">{card}</a>
            ) : (
              <Link href={item.href} className="block">{card}</Link>
            )
            return (
              <Reveal key={i} delay={(i % 2) * 100}>
                {inner}
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* skills */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-12 pb-24">
        <Reveal className="flex items-baseline justify-between border-b border-[#2D2D2D]/15 pb-4 mb-10">
          <h2 className="font-display text-3xl sm:text-4xl text-[#2D2D2D] leading-none">Skills</h2>
          <span className="font-mincho text-[11px] tracking-[0.3em] text-[#2D2D2D]/50">{t('skillsTitle')}</span>
        </Reveal>
        <Reveal delay={80} className="flex flex-wrap gap-x-8 gap-y-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="font-mincho text-sm text-[#2D2D2D]/75 border-b pb-1"
              style={{ borderColor: theme.text }}
            >
              {skill}
            </span>
          ))}
        </Reveal>
      </section>
    </main>
  )
}
