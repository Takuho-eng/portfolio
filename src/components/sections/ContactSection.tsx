'use client'
import { useTranslations } from 'next-intl'

const links = [
  { key: 'instagram', icon: 'brand-instagram', href: 'https://instagram.com/' },
  { key: 'portfolio', icon: 'world', href: 'https://portfolio-tau-amber-48.vercel.app' },
  { key: 'github', icon: 'brand-github', href: 'https://github.com/' },
  { key: 'email', icon: 'mail', href: 'mailto:t.nagoya11@gmail.com' }
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
    <section id="contact" className="px-6 py-8 bg-[#E8E4DA] border-t border-[#2D2D2D]/10">
      <h2 className="font-bebas text-3xl text-[#2D2D2D] tracking-wider mb-5">{t('title')}</h2>

      <button
        onClick={downloadVCard}
        className="w-full flex items-center justify-center gap-2 bg-[#8A8FAB] text-white text-sm font-medium py-3 rounded-md mb-4 hover:bg-[#9AA0BC] transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M16 2v4M8 2v4M2 10h20M7 15h.01M12 15h.01M17 15h.01"/>
        </svg>
        {t('vcf')}
      </button>

      <div className="grid grid-cols-2 gap-3">
        {links.map(({ key, href }) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#2D2D2D]/5 border border-[#2D2D2D]/12 text-[#2D2D2D]/65 text-xs py-2.5 px-3 rounded-md hover:border-[#2D2D2D]/30 hover:text-[#2D2D2D]/85 transition-all"
          >
            {t(`links.${key}`)}
          </a>
        ))}
      </div>
    </section>
  )
}
