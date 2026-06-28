'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-anim]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.2,
        }
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-[#1c1c1e] rounded-b-[44px]"
    >
      {/* Sol üst dekoratif ince çizgiler (grid) — sağa/aşağı doğru sönümlenir */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute top-0 bottom-0 left-[88px] w-px bg-gradient-to-b from-white/[0.1] to-transparent" />
        <div className="absolute left-0 right-0 top-[92px] h-px bg-gradient-to-r from-white/[0.1] to-transparent" />
      </div>

      {/* Sağdaki silik logo watermark — ekranın sağına taşıp ~%20'si kesik */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <Image
          src="/sadecelogo2.png"
          alt=""
          width={803}
          height={803}
          quality={100}
          priority
          className="absolute right-0 top-[72%] -translate-y-1/2 translate-x-[20%] w-[clamp(520px,52vw,880px)] h-auto object-contain brightness-0 invert opacity-[0.07] select-none"
        />
      </div>

      <div className="relative max-w-[1320px] mx-auto px-34 py-24 lg:py-32">
        <div className="max-w-[760px]">
          <h1
            data-hero-anim
            className="text-white font-extrabold tracking-tight leading-[1.05] text-[clamp(2.4rem,5vw,4.2rem)]"
          >
            Yurtdışı Eğitim ve Vize Sürecinizi{' '}
            <span className="text-[#f04420]">Güvenle Planlayın</span>
          </h1>

          <p
            data-hero-anim
            className="mt-6 text-white/70 text-[16px] lg:text-[19px] leading-relaxed max-w-[640px]"
          >
            Yurtdışı eğitim ve vize sürecinizi, size özel planlama ile üniversite
            seçiminden vize onayına kadar uçtan uca yöneten danışmanlık hizmetidir.
          </p>

          <div data-hero-anim className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/basvuru"
              className="inline-flex items-center gap-2 bg-[#f04420] hover:bg-[#d93a1a] text-white text-[15px] font-bold px-7 py-4 rounded-xl transition-colors"
            >
              Ücretsiz Danışmanlık
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/hizmetler"
              className="inline-flex items-center px-7 py-4 rounded-xl border border-white/25 text-white text-[15px] font-bold hover:bg-white/10 transition-colors"
            >
              Hizmetlerimiz
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
