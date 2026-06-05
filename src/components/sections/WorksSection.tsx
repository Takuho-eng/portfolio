import { useTranslations } from 'next-intl'

const themeStyles: Record<string, string> = {
  eng: 'bg-[#0d1117]',
  video: 'bg-[#110a1e]',
  design: 'bg-[#0a120a]',
  edu: 'bg-[#12120a]',
  food: 'bg-[#120a0a]'
}

const themeColors: Record<string, string> = {
  eng: 'text-[#c8ff00]',
  video: 'text-[#a78bfa]',
  design: 'text-[#86efac]',
  edu: 'text-[#fde68a]',
  food: 'text-[#fca5a5]'
}

const themeLabels: Record<string, string> = {
  eng: 'ENGINEER',
  video: 'VIDEO',
  design: 'DESIGN',
  edu: 'EDU',
  food: 'F&B'
}

export default function WorksSection() {
  const t = useTranslations('works')
  const items = t.raw('items') as {
    cat: string; title: string; meta: string; theme: string; featured?: boolean
  }[]

  return (
    <section id="works" className="px-6 py-8 border-t border-white/8">
      <div className="flex justify-between items-baseline mb-5">
        <h2 className="font-bebas text-3xl text-white tracking-wider">{t('title')}</h2>
        <span className="text-xs text-white/35">{t('subtitle')}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className={`rounded-xl overflow-hidden border border-white/6 cursor-pointer hover:border-white/20 transition-colors ${item.featured ? 'col-span-2' : ''}`}
          >
            <div className={`${themeStyles[item.theme]} flex items-end p-4 ${item.featured ? 'h-24' : 'h-16'}`}>
              <span className={`font-bebas text-2xl leading-none ${themeColors[item.theme]}`}>
                {themeLabels[item.theme]}
              </span>
            </div>
            <div className="bg-white/4 p-3">
              <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{item.cat}</div>
              <div className="text-xs text-white/85 font-medium leading-snug">{item.title}</div>
              <div className="text-[10px] text-white/30 mt-1">{item.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
