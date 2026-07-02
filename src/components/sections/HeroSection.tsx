'use client'
import { useTranslations } from 'next-intl'
import { ArrowRight, ArrowDownRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

export default function HeroSection() {
  const t = useTranslations('hero')
  const roles = t.raw('roles') as string[]

  const downloadVCard = () => {
    const vcf = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:名古屋;拓帆;;;',
      'FN:名古屋拓帆',
      'NICKNAME:Takuho Nagoya',
      'TEL;TYPE=CELL:+81-70-2002-6027',
      'EMAIL;TYPE=INTERNET:t.nagoya11@gmail.com',
      'URL:https://portfolio-tau-amber-48.vercel.app',
      'NOTE:Engineer · Video Editor · Designer · Educator · F&B',
      'END:VCARD'
    ].join('\r\n')
    const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'takuho_nagoya.vcf'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden">
      {/* full-bleed hero photograph */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/hero.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a20]/85 via-[#1a1a20]/25 to-[#1a1a20]/40" />

      {/* vertical scroll cue */}
      <span className="hidden sm:flex flex-col items-center gap-2 absolute right-8 top-28 text-white/70">
        <span className="font-ui text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">Scroll</span>
        <span className="w-px h-14 bg-white/40" />
      </span>

      <div className="relative max-w-5xl mx-auto w-full px-6 sm:px-10 pb-16 sm:pb-20">
        <Reveal delay={0}>
          <p className="font-ui text-[11px] tracking-[0.35em] uppercase text-white/70 mb-6">
            {t('eyebrow')}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-display text-[72px] sm:text-[132px] leading-[0.86] text-white font-semibold drop-shadow-sm">
            {t('name1')}
            <br />
            <span className="text-[#C7CADF]">{t('name2')}</span>
          </h1>
        </Reveal>

        <Reveal delay={260}>
          <p className="font-mincho text-[15px] sm:text-base text-white/80 leading-loose mt-7 max-w-md whitespace-pre-line">
            {t('sub')}
          </p>
        </Reveal>

        {/* roles as an editorial hairline-separated row */}
        <Reveal delay={360}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-7 font-ui text-xs tracking-[0.15em] text-white/70">
            {roles.map((role, i) => (
              <span key={i} className="flex items-center gap-x-4">
                {i > 0 && <span className="w-4 h-px bg-white/40" />}
                <span className={i === 0 ? 'text-[#C7CADF]' : ''}>{role}</span>
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={460} className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-11">
          <button
            onClick={downloadVCard}
            className="group inline-flex items-center gap-3 font-ui text-sm tracking-[0.1em] text-white border-b border-[#C7CADF] pb-1.5 w-fit"
          >
            <span>{t('btnSave')}</span>
            <ArrowDownRight size={16} className="text-[#C7CADF] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </button>
          <a
            href="#works"
            className="group inline-flex items-center gap-3 font-ui text-sm tracking-[0.1em] text-white/75 border-b border-white/30 pb-1.5 w-fit hover:text-white transition-colors"
          >
            <span>{t('btnWorks')}</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
