'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import RevealText from '@/components/anim/RevealText'
import Reveal from '@/components/anim/Reveal'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  TrainFront,
  Wallet,
  Building2,
  Sun,
  Languages,
  Waves,
  Briefcase,
  TrendingUp,
  Landmark,
  GraduationCap,
} from 'lucide-react'

interface Stat {
  Icon: React.ElementType
  value: string
  label: string
}

interface City {
  country: string
  flag: string
  city: string
  desc: string
  forWho: string
  stats: [Stat, Stat]
  img?: string
}

const cities: City[] = [
  {
    country: 'Rusya',
    flag: '🇷🇺',
    city: 'Moskova',
    desc: 'Moskova, Rusya’nın başkenti ve en büyük öğrenci merkezidir. Ülkenin en prestijli üniversitelerine ev sahipliği yapan, hiç durmayan bir metropoldür.',
    forWho: 'Büyük şehir yaşamını seven, kariyer hedefi güçlü öğrenciler için idealdir.',
    stats: [
      { Icon: Award, value: 'Top 100', label: 'Dünya sıralamasında üniversite' },
      { Icon: TrainFront, value: 'Metropol', label: 'Global kariyer ve iş ağı' },
    ],
    img: '/cities/moskova.webp',
  },
  {
    country: 'Rusya',
    flag: '🇷🇺',
    city: 'Kazan',
    desc: 'Kazan, Rusya’nın en çok tercih edilen öğrenci şehirlerinden biridir. Moskova’ya göre daha ekonomik, kültürlerin özgürce yaşandığı Türk kökenli bir bölgedir.',
    forWho: 'Daha ekonomik, dengeli ve sakin bir şehir arayan öğrenciler için uygundur.',
    stats: [
      { Icon: Wallet, value: 'Ekonomik', label: 'Uygun üniversite ve yaşam' },
      { Icon: Building2, value: 'Köklü', label: 'Kazan Federal University' },
    ],
    img: '/cities/kazan.webp',
  },
  {
    country: 'İspanya',
    flag: '🇪🇸',
    city: 'Madrid',
    desc: 'Madrid, İspanya’nın başkenti ve Avrupa’nın en canlı öğrenci şehirlerinden biridir. Zengin sosyal hayatı ve yüksek yaşam kalitesiyle öne çıkar.',
    forWho: 'Sosyal hayatı güçlü, Avrupa’da eğitim almak isteyen öğrenciler için ideal.',
    stats: [
      { Icon: Sun, value: 'Ilıman', label: 'İklim ve yaşam kalitesi' },
      { Icon: Languages, value: 'EN / ES', label: 'Eğitim dili seçeneği' },
    ],
    img: '/cities/madrid.webp',
  },
  {
    country: 'İspanya',
    flag: '🇪🇸',
    city: 'Barcelona',
    desc: 'Barcelona, hem eğitim hem yaşam kalitesi açısından Avrupa’nın en popüler şehirlerindendir. Deniz kenarı yaşamı ve aktif sosyal hayatıyla bilinir.',
    forWho: 'Hem eğitim hem de yaşam kalitesini birlikte isteyen öğrenciler için uygundur.',
    stats: [
      { Icon: Waves, value: 'Deniz kenarı', label: 'Akdeniz şehir yaşamı' },
      { Icon: Briefcase, value: 'Part-time', label: 'Yarı zamanlı iş imkânı' },
    ],
    img: '/cities/barcelona.webp',
  },
  {
    country: 'Polonya',
    flag: '🇵🇱',
    city: 'Varşova',
    desc: 'Varşova, Polonya’nın başkenti ve Orta Avrupa’nın en hızlı gelişen öğrenci şehirlerinden biridir. Çok uluslu ortamı ve gelişen ekonomisiyle dikkat çeker.',
    forWho: 'Avrupa’da uygun bütçeyle kaliteli eğitim almak isteyen öğrenciler için idealdir.',
    stats: [
      { Icon: TrendingUp, value: 'Startup', label: 'Gelişen iş ekosistemi' },
      { Icon: Wallet, value: 'Uygun', label: 'Avrupa’ya göre yaşam maliyeti' },
    ],
    img: '/cities/varsova.webp',
  },
  {
    country: 'Polonya',
    flag: '🇵🇱',
    city: 'Krakow',
    desc: 'Krakow, Polonya’nın en tarihi ve öğrenci dostu şehirlerinden biridir. Kültürel zenginliği ve yoğun öğrenci nüfusuyla canlı bir kampüs şehridir.',
    forWho: 'Sakin, kültürel ve ekonomik bir öğrenci hayatı isteyenler için uygundur.',
    stats: [
      { Icon: Landmark, value: 'Tarihi', label: 'Kültürel zenginlik' },
      { Icon: GraduationCap, value: 'Öğrenci dostu', label: 'Jagiellonian University' },
    ],
    img: '/cities/krakow.webp',
  },
]

const cardGradient =
  'linear-gradient(135deg, #18121d 0%, #3a1410 28%, #b8321a 58%, #f0682a 82%, #f7a93c 100%)'

export default function PopularCities() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const dirRef = useRef(1)

  useEffect(() => {
    const d = dirRef.current
    gsap.fromTo(
      [leftRef.current, rightRef.current],
      { opacity: 0, x: d * 40, y: 0 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.45, 
        ease: 'power2.out', 
        stagger: 0.06,
        onComplete: () => setAnimating(false)
      }
    )
  }, [active])

  const c = cities[active]

  const go = async (d: number) => {
    if (animating) return
    setAnimating(true)
    dirRef.current = d

    // Mevcut içeriği kaydırarak gizle
    await gsap.to([leftRef.current, rightRef.current], {
      opacity: 0,
      x: -d * 40,
      duration: 0.25,
      ease: 'power2.in',
      stagger: 0.04
    })

    // İçeriği güncelle (bu useEffect'i tetikleyecek ve yeni içeriği kaydırarak getirecek)
    setActive((p) => (p + d + cities.length) % cities.length)
  }

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-34">

        {/* Başlık satırı */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="lg:max-w-[640px]">
            <div className="mb-4">
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-500 mb-2">Popüler Şehirler</p>
              <div className="relative h-px bg-gray-300 w-40">
                <div className="absolute left-0 top-0 w-8 h-[2px] bg-gray-500 -translate-y-px" />
              </div>
            </div>
            <RevealText
              as="h2"
              className="text-[clamp(2.1rem,4vw,3.4rem)] font-bold text-[#1c1c1e] leading-[1.05] tracking-tight"
              text={"Geleceğin için\ndoğru şehri seç"}
            />
          </div>
          <p className="lg:max-w-[330px] text-[15px] text-gray-500 leading-relaxed">
            Rusya, İspanya ve Polonya’nın öne çıkan öğrenci şehirleri — her biri
            farklı bir eğitim ve yaşam deneyimi sunar.
          </p>
        </div>

        {/* Izgara — sol kart + sağ panel/istatistikler */}
        <Reveal y={22} className="grid lg:grid-cols-2 gap-5 items-stretch">

          {/* SOL — şehir kartı (fotoğraf varsa fotoğraf, yoksa gradient) */}
          <div
            ref={leftRef}
            className="relative min-h-[380px] lg:min-h-0 flex items-center justify-center overflow-hidden"
            style={c.img ? undefined : { background: cardGradient }}
          >
            {c.img && (
              <>
                <Image
                  src={c.img}
                  alt={c.city}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 660px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
              </>
            )}
            <span className="absolute top-6 left-6 inline-flex items-center gap-2 text-[13px] font-semibold text-white/80 z-10">
              <span className="text-[16px]">{c.flag}</span>
              {c.country}
            </span>
            <span className="relative z-10 text-white font-bold tracking-tight text-[clamp(2.6rem,4.5vw,4rem)] drop-shadow-lg">
              {c.city}
            </span>
          </div>

          {/* SAĞ — alıntı paneli + istatistik kutuları */}
          <div ref={rightRef} className="flex flex-col gap-5">

            {/* Alıntı paneli */}
            <div className="flex-1 border border-gray-200 p-8 lg:p-10 flex flex-col">
              <div className="flex items-center gap-2 text-[15px] font-bold text-[#1c1c1e]">
                <span className="text-[18px]">{c.flag}</span>
                {c.city}
              </div>

              <p className="mt-8 text-[clamp(1.25rem,1.7vw,1.6rem)] text-[#1c1c1e] leading-[1.45]">
                {c.desc}
              </p>

              <div className="mt-auto pt-8">
                <p className="text-[15px] font-bold text-[#1c1c1e]">Kimler için uygun?</p>
                <p className="text-[14px] text-gray-500 mt-1 leading-snug">{c.forWho}</p>
              </div>
            </div>

            {/* İstatistik kutuları */}
            <div className="grid grid-cols-2 gap-5">
              {c.stats.map((s) => {
                const Icon = s.Icon
                return (
                  <div key={s.label} className="border border-gray-200 p-6">
                    <Icon size={24} strokeWidth={1.75} className="text-[#f04420]" />
                    <p className="mt-5 text-[clamp(1.6rem,2.2vw,2.1rem)] font-semibold text-[#1c1c1e] tracking-tight leading-none">
                      {s.value}
                    </p>
                    <p className="mt-2.5 text-[14px] text-gray-500 leading-snug">{s.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* Alt — ileri/geri (kare butonlar) */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => go(-1)}
            aria-label="Önceki"
            className="w-12 h-12 flex items-center justify-center bg-[#f04420] hover:bg-[#d93a1a] text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Sonraki"
            className="w-12 h-12 flex items-center justify-center bg-[#f04420] hover:bg-[#d93a1a] text-white transition-colors"
          >
            <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </section>
  )
}
