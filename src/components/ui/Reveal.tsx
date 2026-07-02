'use client'
import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** stagger delay in ms */
  delay?: number
  /** animation style */
  variant?: 'up' | 'fade' | 'left'
}

export default function Reveal({ children, className = '', delay = 0, variant = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true)
      return
    }

    let done = false
    let raf = 0

    const reveal = () => {
      done = true
      setVisible(true)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }

    const check = () => {
      if (done) return
      const rect = el.getBoundingClientRect()
      const trigger = window.innerHeight * 0.9
      if (rect.top < trigger && rect.bottom > 0) reveal()
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; check() })
    }

    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      data-reveal={variant}
      className={`reveal ${visible ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
