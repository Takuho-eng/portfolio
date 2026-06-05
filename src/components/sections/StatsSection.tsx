import { useTranslations } from 'next-intl'

export default function StatsSection() {
  const t = useTranslations('stats')
  const items = t.raw('items') as { years: string; label: string }[]

  return (
    <section className="px-6 py-8 border-t border-white/8">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {items.map((item, i) => (
          <div key={i} className="bg-white/4 rounded-lg p-3 border border-white/6 text-center">
            <div className="font-bebas text-3xl text-[#c8ff00] leading-none">{item.years}</div>
            <div className="text-xs text-white/40 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
