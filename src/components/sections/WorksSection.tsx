import { useTranslations } from 'next-intl'

const themeStyles: Record<string, string> = {
  eng: 'bg-[#DDE5F0]',
  video: 'bg-[#EAE2F2]',
  design: 'bg-[#DCF0E2]',
  edu: 'bg-[#F0ECDC]',
  food: 'bg-[#F0E0DE]'
}

const themeColors: Record<string, string> = {
  eng: 'text-[#3A5A9A]',
  video: 'text-[#6B5EA8]',
  design: 'text-[#2D7A45]',
  edu: 'text-[#7A6520]',
  food: 'text-[#8A2D2D]'
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
    <section id="works" className="px-6 py-8 border-t border-[#2D2D2D]/10">
      <div className="flex justify-between items-baseline mb-5">
        <h2 className="font-bebas text-3xl text-[#2D2D2D] tracking-wider">{t('title')}</h2>
        <span className="text-xs text-[#2D2D2D]/50">{t('subtitle')}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className={`rounded-xl overflow-hidden border border-[#2D2D2D]/8 cursor-pointer hover:border-[#2D2D2D]/25 transition-colors ${item.featured ? 'col-span-2' : ''}`}
          >
            <div className={`${themeStyles[item.theme]} flex items-end p-4 ${item.featured ? 'h-24' : 'h-16'}`}>
              <span className={`font-bebas text-2xl leading-none ${themeColors[item.theme]}`}>
                {themeLabels[item.theme]}
              </span>
            </div>
            <div className="bg-[#2D2D2D]/5 p-3">
              <div className="text-[10px] text-[#2D2D2D]/45 uppercase tracking-wider mb-1">{item.cat}</div>
              <div className="text-xs text-[#2D2D2D] font-medium leading-snug">{item.title}</div>
              <div className="text-[10px] text-[#2D2D2D]/45 mt-1">{item.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
