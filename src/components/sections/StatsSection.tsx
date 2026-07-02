import { useTranslations } from 'next-intl'
import Reveal from '@/components/ui/Reveal'

export default function StatsSection() {
  const t = useTranslations('stats')
  const items = t.raw('items') as { years: string; label: string }[]

  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-10 py-14">
      <Reveal className="flex items-baseline justify-between border-b border-[#2D2D2D]/15 pb-4 mb-10">
        <h2 className="font-display text-4xl sm:text-5xl text-[#2D2D2D] leading-none">Career</h2>
        <span className="font-mincho text-[11px] tracking-[0.3em] text-[#2D2D2D]/50">経歴</span>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-5 border-t border-l border-[#2D2D2D]/12">
        {items.map((item, i) => (
          <Reveal
            key={i}
            delay={i * 90}
            className="border-b border-r border-[#2D2D2D]/12 flex flex-col items-center justify-center text-center py-8"
          >
            <div className="font-display text-5xl sm:text-6xl text-[#8A8FAB] leading-none font-semibold">
              {item.years}
            </div>
            <div className="font-mincho text-xs text-[#2D2D2D]/60 mt-3 tracking-wide">{item.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
