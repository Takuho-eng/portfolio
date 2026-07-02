'use client'
import { useTranslations } from 'next-intl'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

const links = [
  { key: 'instagram', href: 'https://instagram.com/' },
  { key: 'portfolio', href: 'https://portfolio-tau-amber-48.vercel.app' },
  { key: 'github', href: 'https://github.com/' },
  { key: 'email', href: 'mailto:t.nagoya11@gmail.com' }
] as const

export default function ContactSection() {
  const t = useTranslations('contact')

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
    <section id="contact" className="bg-[#E8E4DA] border-t border-[#2D2D2D]/12 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16">
        <Reveal className="flex items-baseline justify-between border-b border-[#2D2D2D]/15 pb-4 mb-10">
          <h2 className="font-display text-4xl sm:text-5xl text-[#2D2D2D] leading-none">Let&rsquo;s Connect</h2>
          <span className="font-mincho text-[11px] tracking-[0.3em] text-[#2D2D2D]/50">連絡先</span>
        </Reveal>

        <Reveal delay={80}>
          <button
            onClick={downloadVCard}
            className="group inline-flex items-center gap-3 font-ui text-sm tracking-[0.1em] text-[#2D2D2D] border-b border-[#8A8FAB] pb-1.5 mb-12"
          >
            <span>{t('vcf')}</span>
            <ArrowDownRight size={16} className="text-[#8A8FAB] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </button>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[#2D2D2D]/12">
          {links.map(({ key, href }, i) => (
            <Reveal
              key={key}
              delay={i * 80}
              className="group border-b border-[#2D2D2D]/12 sm:odd:border-r sm:odd:pr-8 sm:[&:nth-child(even)]:pl-8"
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-5"
              >
                <span className="font-mincho text-base text-[#2D2D2D]/80 group-hover:text-[#2D2D2D] transition-colors">
                  {t(`links.${key}`)}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-[#2D2D2D]/40 group-hover:text-[#8A8FAB] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="font-ui text-[11px] tracking-[0.2em] uppercase text-[#2D2D2D]/40 mt-14">
            © {new Date().getFullYear()} Takuho Nagoya
          </p>
        </Reveal>
      </div>
    </section>
  )
}
