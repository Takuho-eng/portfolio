import { useTranslations } from 'next-intl'

export default function StatsSection() {
  const t = useTranslations('stats')
  const items = t.raw('items') as { years: string; label: string }[]

  return (
    <section className="px-6 py-8 border-t border-[#2D2D2D]/10">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {items.map((item, i) => (
          <div key={i} className="bg-[#2D2D2D]/5 rounded-lg p-3 border border-[#2D2D2D]/8 text-center">
            <div className="font-bebas text-3xl text-[#8A8FAB] leading-none">{item.years}</div>
            <div className="text-xs text-[#2D2D2D]/55 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
