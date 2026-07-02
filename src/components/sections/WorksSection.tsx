import { useTranslations } from 'next-intl'
import { ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import Reveal from '@/components/ui/Reveal'

const themeMeta: Record<string, { img: string; tint: string; label: string; text: string }> = {
  eng: { img: '/img/card-eng.jpg', tint: '#1F3A6B', label: 'ENGINEER', text: 'text-[#3A5A9A]' },
  video: { img: '/img/card-video.jpg', tint: '#3E2F63', label: 'VIDEO', text: 'text-[#6B5EA8]' },
  design: { img: '/img/card-design.jpg', tint: '#194B2C', label: 'DESIGN', text: 'text-[#2D7A45]' },
  edu: { img: '/img/card-edu.jpg', tint: '#5A4A14', label: 'EDU', text: 'text-[#7A6520]' },
  food: { img: '/img/gelato.jpg', tint: '#6B1F1F', label: 'F&B', text: 'text-[#8A2D2D]' }
}

export default function WorksSection() {
  const t = useTranslations('works')
  const items = t.raw('items') as {
    cat: string; title: string; meta: string; theme: string; slug: string; featured?: boolean
  }[]

  return (
    <section id="works" className="max-w-5xl mx-auto px-6 sm:px-10 py-16 scroll-mt-20">
      <Reveal className="flex items-baseline justify-between border-b border-[#2D2D2D]/15 pb-4 mb-10">
        <h2 className="font-display text-4xl sm:text-5xl text-[#2D2D2D] leading-none">Works</h2>
        <span className="font-mincho text-[11px] tracking-[0.3em] text-[#2D2D2D]/50">{t('subtitle')}</span>
      </Reveal>

      <div className="flex flex-col divide-y divide-[#2D2D2D]/12">
        {items.map((item, i) => {
          const m = themeMeta[item.theme]
          return (
            <Reveal key={i} delay={(i % 2) * 120}>
              <Link
                href={`/works/${item.slug}`}
                className="group grid sm:grid-cols-[1.1fr_1fr] gap-6 sm:gap-10 items-center py-8"
              >
                <div className="relative rounded-sm overflow-hidden h-44 sm:h-56">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.img}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 mix-blend-multiply"
                    style={{ backgroundColor: m.tint, opacity: 0.62 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  <span className="absolute bottom-4 left-5 font-display text-4xl sm:text-5xl leading-none tracking-wide text-white/95">
                    {m.label}
                  </span>
                </div>

                <div className="sm:pr-4">
                  <div className="font-mincho text-[11px] tracking-[0.25em] text-[#2D2D2D]/45 uppercase mb-3">
                    {item.cat}
                  </div>
                  <div className="font-mincho text-lg sm:text-xl text-[#2D2D2D] leading-snug">
                    {item.title}
                  </div>
                  <div className="font-ui text-xs text-[#2D2D2D]/45 mt-2 tracking-wide">{item.meta}</div>
                  <span className="inline-flex items-center gap-1.5 mt-5 font-ui text-[11px] tracking-[0.2em] uppercase text-[#2D2D2D]/70 transition-colors group-hover:text-[#8A8FAB]">
                    View
                    <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
