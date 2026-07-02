import { useTranslations } from 'next-intl'
import Reveal from '@/components/ui/Reveal'

export default function AboutSection() {
  const t = useTranslations('about')

  return (
    <section id="about" className="max-w-5xl mx-auto px-6 sm:px-10 py-16 scroll-mt-20">
      <div className="grid sm:grid-cols-[0.85fr_1fr] gap-8 sm:gap-14 items-center">
        <Reveal variant="left">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/portrait.jpg"
              alt={t('title')}
              loading="lazy"
              className="w-full h-auto rounded-sm object-cover aspect-[4/5] sm:aspect-auto"
            />
            <span className="absolute bottom-3 left-3 font-ui text-[10px] tracking-[0.2em] uppercase text-white/85 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-sm">
              {t('caption')}
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <div className="font-ui text-[11px] tracking-[0.35em] uppercase text-[#2D2D2D]/45 mb-5">
              {t('label')}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-5xl sm:text-6xl text-[#2D2D2D] leading-none">
              {t('title')}
            </h2>
            <div className="font-ui text-xs tracking-[0.2em] uppercase text-[#8A8FAB] mt-3">
              {t('role')}
            </div>
          </Reveal>
          <Reveal delay={180}>
            <p className="font-mincho text-[15px] leading-loose text-[#2D2D2D]/70 mt-7 max-w-lg">
              {t('body')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
