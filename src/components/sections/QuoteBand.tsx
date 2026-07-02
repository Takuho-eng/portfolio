import { useTranslations } from 'next-intl'
import Reveal from '@/components/ui/Reveal'

type QuoteBandProps = {
  image: string
  silent?: boolean
}

export default function QuoteBand({ image, silent = false }: QuoteBandProps) {
  const t = useTranslations('quote')

  return (
    <section
      className={`relative flex items-center overflow-hidden bg-fixed bg-center bg-cover ${
        silent ? 'min-h-[44vh]' : 'min-h-[62vh]'
      }`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={`absolute inset-0 ${silent ? 'bg-[#1a1a20]/30' : 'bg-[#1a1a20]/55'}`} />
      {!silent && (
        <div className="relative max-w-5xl mx-auto w-full px-6 sm:px-10 text-center">
          <Reveal>
            <p className="font-mincho text-2xl sm:text-4xl leading-relaxed text-white max-w-3xl mx-auto">
              {t('text')}
            </p>
            <p className="font-ui text-[11px] sm:text-xs tracking-[0.3em] uppercase text-white/60 mt-6">
              {t('sub')}
            </p>
          </Reveal>
        </div>
      )}
    </section>
  )
}
