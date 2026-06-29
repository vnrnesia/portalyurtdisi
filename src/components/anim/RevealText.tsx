'use client'

import { useRef, useEffect, useState, type ElementType } from 'react'

interface RevealTextProps {
  /** Satırlara bölmek için \n kullan: "İlk satır\nİkinci satır" */
  text: string
  className?: string
  as?: ElementType
  /** Saniye cinsinden gecikme */
  delay?: number
}

/**
 * Maskeli satır-satır yazı açılma animasyonu.
 * Saf CSS geçişi + IntersectionObserver ile çalışır (GSAP/smooth scroll'dan bağımsız).
 * Koşulsuz güvenlik ağı: yazı en geç 1.5sn içinde her durumda görünür olur.
 */
export default function RevealText({ text, className, as: Tag = 'h2', delay = 0 }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const lines = text.split('\n')

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

    // Güvenlik ağı: eleman ekrandaysa ama IO bir nedenle tetiklemediyse yine de göster
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
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span
            className="block will-change-transform"
            style={{
              transform: visible ? 'translateY(0)' : 'translateY(115%)',
              transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${delay + i * 0.09}s`,
            }}
          >
            {line || ' '}
          </span>
        </span>
      ))}
    </Tag>
  )
}
