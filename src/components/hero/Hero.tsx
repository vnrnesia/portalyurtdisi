'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import HeroVideo from './HeroVideo'

export default function Hero() {
  const sectionRef   = useRef<HTMLElement>(null)
  const headlineRef  = useRef<HTMLHeadingElement>(null)
  const rightColRef  = useRef<HTMLDivElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)

  // Header yüksekliğini ölçüp section'ı tam kalan viewport yüksekliğine ayarla
  useEffect(() => {
    const update = () => {
      const header = document.querySelector('header')
      const el = sectionRef.current
      if (!header || !el) return
      el.style.height = `${window.innerHeight - header.offsetHeight}px`
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // GSAP içerik animasyonları
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      tl.fromTo(
        headlineRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      )
      .fromTo(
        rightColRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.6'
      )
    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      // CSS fallback — JS ölçüm yüklenene kadar
      style={{ height: 'calc(100vh - 116px)' }}
    >
      <HeroVideo />

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80 pointer-events-none"
        style={{ zIndex: 3 }}
      />

      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-end pb-8 lg:pb-12 px-5 sm:px-8 lg:px-16"
        style={{ zIndex: 4 }}
      >
        {/* Alt grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[62fr_38fr] gap-10 lg:gap-16 items-end">
          <h1
            ref={headlineRef}
            className="text-white font-light tracking-tight leading-[0.92] text-[clamp(2.8rem,6.5vw,6rem)]"
          >
            Yurt Dışında<br />
            Geleceğini<br />
            Şekillendir
          </h1>

          <div ref={rightColRef} className="flex flex-col gap-5 lg:gap-8 pb-1">
            <p className="text-white/65 text-[14px] lg:text-[17px] leading-relaxed max-w-sm">
              ↳ Dünyanın en iyi üniversitelerinde eğitim
              fırsatları ve burs rehberi bir arada.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#universiteler"
                className="inline-flex items-center px-6 py-3 border border-white/25 bg-white/10 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/20 transition-colors"
              >
                Keşfet
              </a>
              <Link
                href="/iletisim"
                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 transition-colors text-white text-sm font-medium"
              >
                Danışmanlık Al
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
