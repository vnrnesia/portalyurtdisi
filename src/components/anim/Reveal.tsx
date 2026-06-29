'use client'

import { useRef, useEffect, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Dikey kayma miktarı (px) */
  y?: number
  /** Saniye cinsinden gecikme */
  delay?: number
}

/**
 * Scroll'da görünüme girince minimal fade-up animasyonu.
 * Saf CSS geçişi + IntersectionObserver (GSAP/smooth scroll'dan bağımsız).
 * Koşulsuz güvenlik ağı: içerik en geç 1.5sn içinde görünür olur.
 */
export default function Reveal({ children, className, y = 24, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)

    const safety = window.setInterval(() => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
        setVisible(true)
        window.clearInterval(safety)
      }
    }, 400)

    return () => {
      io.disconnect()
      window.clearInterval(safety)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: 'opacity 0.7s ease-out, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}s`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  )
}
