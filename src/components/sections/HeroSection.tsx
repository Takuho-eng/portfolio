'use client'
import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('hero')
  const roles = t.raw('roles') as string[]

  return (
    <section className="px-6 pt-12 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,white 2px,white 4px)', backgroundSize: '100% 4px' }}
      />
      <div className="absolute right-0 top-0 w-48 h-48 rounded-full border border-white/5" />
      <div className="absolute right-8 top-8 w-24 h-24 rounded-full border border-[#c8ff00]/10" />

      <p className="text-xs tracking-[0.15em] text-white/35 uppercase mb-4">
        {t('eyebrow')}
      </p>

      <h1 className="font-bebas text-[80px] sm:text-[100px] leading-[0.88] text-white mb-3">
        {t('name1')}<br />
        <span className="text-[#c8ff00]">{t('name2')}</span>
      </h1>

      <p className="text-sm text-white/45 font-light leading-relaxed mb-7 max-w-xs whitespace-pre-line">
        {t('sub')}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {roles.map((role, i) => (
          <span
            key={i}
            className={`text-xs px-3 py-1.5 rounded-full border ${
              i === 0
                ? 'bg-[#c8ff00] text-[#0a0a0a] border-[#c8ff00] font-medium'
                : 'border-white/15 text-white/60'
            }`}
          >
            {role}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 bg-[#c8ff00] text-[#0a0a0a] text-sm font-medium py-3 px-5 rounded-md">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M16 2v4M8 2v4M2 10h20M7 15h.01M12 15h.01M17 15h.01"/>
          </svg>
          {t('btnSave')}
        </button>
        <a href="#works" className="flex-1 text-center text-sm text-white/60 py-3 px-5 border border-white/20 rounded-md hover:border-white/40 transition-colors">
          {t('btnWorks')}
        </a>
      </div>
    </section>
  )
}
