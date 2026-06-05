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
    <nav className="flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-[#0a0a0a]/90 border-b border-white/5">
      <span className="font-bebas text-2xl text-[#c8ff00] tracking-wider">
        {t('logo')}
      </span>
      <div className="flex items-center gap-4">
        <a href="#works" className="text-white/50 text-sm hover:text-white transition-colors">
          {t('works')}
        </a>
        <a href="#contact" className="text-white/50 text-sm hover:text-white transition-colors">
          {t('contact')}
        </a>
        <div className={`flex bg-white/8 rounded-full p-0.5 gap-0.5 border border-white/10 ${isPending ? 'opacity-60' : ''}`}>
          {(['ja', 'en'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => switchLocale(lang)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                locale === lang
                  ? 'bg-[#c8ff00] text-[#0a0a0a]'
                  : 'text-white/50 hover:text-white/80'
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
