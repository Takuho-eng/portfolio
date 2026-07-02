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
    if (next === locale) return
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
    <nav className="sticky top-0 z-50 bg-[#F0EDE4]/85 backdrop-blur-md border-b border-[#2D2D2D]/12">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-6 sm:px-10 py-5">
        <a
          href={`/${locale}`}
          className="flex items-center gap-2.5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo-ship.png" alt="" className="w-7 h-7 object-contain" />
          <span className="font-display text-lg sm:text-xl tracking-[0.25em] text-[#2D2D2D] uppercase">
            Takuho&nbsp;Nagoya
          </span>
        </a>

        <div className="flex items-center gap-6 sm:gap-9">
          <a
            href={`/${locale}#works`}
            className="hidden sm:inline font-ui text-[11px] tracking-[0.28em] uppercase text-[#2D2D2D]/55 hover:text-[#2D2D2D] transition-colors"
          >
            {t('works')}
          </a>
          <a
            href={`/${locale}#contact`}
            className="hidden sm:inline font-ui text-[11px] tracking-[0.28em] uppercase text-[#2D2D2D]/55 hover:text-[#2D2D2D] transition-colors"
          >
            {t('contact')}
          </a>

          <div className={`flex items-center gap-2 font-ui text-[11px] tracking-[0.15em] ${isPending ? 'opacity-50' : ''}`}>
            {(['ja', 'en'] as const).map((lang, i) => (
              <span key={lang} className="flex items-center gap-2">
                {i > 0 && <span className="text-[#2D2D2D]/25">/</span>}
                <button
                  onClick={() => switchLocale(lang)}
                  className={`uppercase transition-colors ${
                    locale === lang
                      ? 'text-[#8A8FAB]'
                      : 'text-[#2D2D2D]/45 hover:text-[#2D2D2D]/80'
                  }`}
                >
                  {lang}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
