'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import RevealText from '@/components/anim/RevealText'
import Reveal from '@/components/anim/Reveal'

interface ServiceTab {
  key: string
  tab: string
  title: string
  desc: string
  cta: string
  img: string
}

const tabs: ServiceTab[] = [
  {
    key: 'egitim',
    tab: 'Eğitim Danışmanlığı',
    title: 'Yurtdışı Eğitim Danışmanlığı',
    desc: "Rusya, Polonya ve İspanya'daki üniversiteler ile dil okullarına başvuru süreçlerinizi profesyonel olarak yönetiyoruz. Anadili Türkçe olan yurtdışı ekibimiz ile doğru program seçiminden üniversite kabulüne kadar tüm aşamalarda destek sağlıyoruz.",
    cta: 'Programları İncele',
    img: '/herasama/danismanlik.webp',
  },
  {
    key: 'yerlesim',
    tab: 'Yerleşim & Adaptasyon',
    title: 'Yerleşim ve Adaptasyon Hizmetleri',
    desc: 'Yeni bir ülkeye taşınmak yalnızca eğitim almak değildir. Öğrencilerimizin yeni yaşamlarına güvenle başlamaları için ülkeye varış öncesinden başlayarak kapsamlı destek sunuyoruz.',
    cta: 'Yerleşim Hizmetlerini Keşfet',
    img: '/herasama/yerlesim.webp',
  },
  {
    key: 'vize',
    tab: 'Vize Danışmanlığı',
    title: 'Vize Danışmanlığı',
    desc: 'Schengen Bölgesi ve Rusya Federasyonu için kısa ve uzun süreli vize başvurularında profesyonel danışmanlık hizmeti sunuyoruz. Evrak hazırlığından başvuru takibine kadar tüm süreci sizin adınıza yönetiyoruz.',
    cta: 'Vize Sürecinizi Başlatın',
    img: '/herasama/vizedanismanligi.webp',
  },
  {
    key: 'isbirligi',
    tab: 'İş Birliği',
    title: 'İş Birliği — Portal Partner Network',
    desc: 'Eğitim danışmanlıkları, vize merkezleri, influencerlar ve uluslararası partnerler için Portal Partner Network çatısı altında iş birliği fırsatları sunuyoruz.',
    cta: 'Partner Programına Katılın',
    img: '/herasama/isbirligi.webp',
  },
]

export default function ServiceTabs() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const dirRef = useRef(1)

  useEffect(() => {
    if (panelRef.current) {
      const d = dirRef.current
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: d * 30, y: 0 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.4, 
          ease: 'power2.out',
          onComplete: () => setAnimating(false)
        }
      )
    }
  }, [active])

  const go = async (i: number) => {
    if (i === active || animating) return
    setAnimating(true)
    const d = i > active ? 1 : -1
    dirRef.current = d

    if (panelRef.current) {
      await gsap.to(panelRef.current, {
        opacity: 0,
        x: -d * 30,
        duration: 0.25,
        ease: 'power2.in',
      })
    }

    setActive(i)
  }

  const t = tabs[active]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-34">

        {/* Başlık satırı */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12">
          <div className="lg:max-w-[560px]">
            <div className="mb-5">
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-500 mb-2">Hizmetlerimiz</p>
              <div className="relative h-px bg-gray-300 w-40">
                <div className="absolute left-0 top-0 w-8 h-[2px] bg-gray-500 -translate-y-px" />
              </div>
            </div>
            <RevealText
              as="h2"
              className="text-[clamp(1.9rem,3.2vw,2.7rem)] font-bold text-[#1c1c1e] leading-[1.12] tracking-tight"
              text={"Uluslararası Yolculuğunuzun\nHer Aşamasında Yanınızdayız"}
            />
          </div>
          <p className="lg:max-w-[360px] text-[15px] text-gray-500 leading-relaxed lg:pt-2">
            Rusya, Polonya ve İspanya&apos;da eğitim; Schengen ve Rusya vizelerinde
            profesyonel destek; ülkeye yerleşimden partner iş birliklerine kadar tüm
            süreçleri tek çatı altında yönetiyoruz.
          </p>
        </div>

        {/* Sekmeler */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {tabs.map((tab, i) => (
            <Reveal key={tab.key} y={16} delay={i * 0.06} className="h-full">
              <button
                onClick={() => go(i)}
                className={cn(
                  'w-full h-full rounded-xl border py-4 px-4 text-[14.5px] font-semibold transition-colors',
                  i === active
                    ? 'bg-[#f04420] border-[#f04420] text-white'
                    : 'bg-white border-gray-200 text-[#1c1c1e] hover:border-gray-300'
                )}
              >
                {tab.tab}
              </button>
            </Reveal>
          ))}
        </div>

        {/* İçerik paneli */}
        <div
          ref={panelRef}
          className="mt-6 rounded-2xl border border-gray-200 bg-[#fafafa] p-8 lg:p-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Sol — başlık + açıklama + CTA */}
          <div className="flex flex-col">
            <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] font-bold text-[#1c1c1e] leading-tight tracking-tight">
              {t.title}
            </h3>
            <p className="mt-4 text-[15px] text-gray-600 leading-relaxed">{t.desc}</p>
            <a
              href="/hizmetler"
              className="mt-7 inline-flex w-fit items-center gap-2 bg-[#f04420] hover:bg-[#d93a1a] text-white text-[14px] font-bold rounded-lg px-6 py-3 transition-colors"
            >
              {t.cta}
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Sağ — görsel */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src={t.img}
              alt={t.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
