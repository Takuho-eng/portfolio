'use client'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useTransition } from 'react'

export default function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const switchLocale = (next: string) => {
    const segments = pathname.split('/')
    if (segments[1] === 'ja' || segments[1] === 'en') {
      segments[1] = next
    } else {
      segments.splice(1, 0, next)
    }
    const newPath = segments.join('/') || `/${next}`
    startTransition(() => {
      router.push(newPath)
    })
  }

  return (
    <nav className="flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-[#F0EDE4]/90 border-b border-[#2D2D2D]/10">
      <span className="font-bebas text-2xl text-[#8A8FAB] tracking-wider">
        {t('logo')}
      </span>
      <div className="flex items-center gap-4">
        <a href={`/${locale}#works`} className="text-[#2D2D2D]/55 text-sm hover:text-[#2D2D2D] transition-colors">
          {t('works')}
        </a>
        <a href={`/${locale}#contact`} className="text-[#2D2D2D]/55 text-sm hover:text-[#2D2D2D] transition-colors">
          {t('contact')}
        </a>
        <div className={`flex bg-[#2D2D2D]/8 rounded-full p-0.5 gap-0.5 border border-[#2D2D2D]/12 ${isPending ? 'opacity-60' : ''}`}>
          {(['ja', 'en'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => switchLocale(lang)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                locale === lang
                  ? 'bg-[#8A8FAB] text-white'
                  : 'text-[#2D2D2D]/55 hover:text-[#2D2D2D]/80'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
