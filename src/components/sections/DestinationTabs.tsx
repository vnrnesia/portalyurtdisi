'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Stat {
  label: string
  value: string
}

interface City {
  key: string
  name: string
  img: string
  tagline: string
  stats: Stat[]
}

const cities: City[] = [
  {
    key: 'moskova',
    name: 'Moskova',
    img: '/cities/moscow.png',
    tagline: "Rusya'nın başkenti, dünya sıralamasındaki köklü üniversitelerin merkezi.",
    stats: [
      { label: 'Üniversite', value: '250+' },
      { label: 'Uluslararası Öğrenci', value: '180.000+' },
      { label: 'Yıllık Ücret', value: '3.000 – 8.000 $' },
      { label: 'Eğitim Dili', value: 'Rusça • İngilizce' },
    ],
  },
  {
    key: 'petersburg',
    name: 'Saint Petersburg',
    img: '/cities/petersburg.png',
    tagline: 'Kültür ve sanatın başkenti, güçlü tıp ve sosyal bilim programları.',
    stats: [
      { label: 'Üniversite', value: '90+' },
      { label: 'Uluslararası Öğrenci', value: '90.000+' },
      { label: 'Yıllık Ücret', value: '2.500 – 7.000 $' },
      { label: 'Eğitim Dili', value: 'Rusça • İngilizce' },
    ],
  },
  {
    key: 'kazan',
    name: 'Kazan',
    img: '/cities/view-of-the-kazan-kremlin-2026-03-24-08-50-35-utc.jpg',
    tagline: 'Uygun bütçeli yaşam ve güçlü tıp & havacılık üniversiteleriyle öne çıkan şehir.',
    stats: [
      { label: 'Üniversite', value: '40+' },
      { label: 'Uluslararası Öğrenci', value: '50.000+' },
      { label: 'Yıllık Ücret', value: '2.000 – 5.500 $' },
      { label: 'Eğitim Dili', value: 'Rusça • İngilizce' },
    ],
  },
  {
    key: 'yekaterinburg',
    name: 'Yekaterinburg',
    img: '/cities/yekaterinburg.png',
    tagline: 'Mühendislik ve madencilikte güçlü, uygun yaşam maliyetli sanayi şehri.',
    stats: [
      { label: 'Üniversite', value: '30+' },
      { label: 'Uluslararası Öğrenci', value: '25.000+' },
      { label: 'Yıllık Ücret', value: '2.000 – 5.000 $' },
      { label: 'Eğitim Dili', value: 'Rusça • İngilizce' },
    ],
  },
]

export default function DestinationTabs() {
  const [active, setActive] = useState(0)
  const imgRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // sekme değişince görsel + kart animasyonu
  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(imgRef.current, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' })
    }
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.1 })
    }
  }, [active])

  const city = cities[active]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-34">

        {/* Başlık satırı */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12">
          <div className="lg:max-w-[480px]">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-3 h-3 bg-[#f04420]" />
              <span className="text-[12px] font-bold tracking-[0.2em] text-[#1c1c1e] uppercase">
                Eğitim Şehirleri
              </span>
            </div>
            <h2 className="text-[clamp(2rem,3.4vw,2.9rem)] font-bold text-[#1c1c1e] leading-[1.1] tracking-tight">
              Hayalindeki Şehirde Eğitim
            </h2>
          </div>
          <p className="lg:max-w-[320px] text-[15px] text-gray-500 leading-relaxed lg:pt-2">
            Moskova&apos;dan Kazan&apos;a — her bütçeye ve hedefe uygun şehri ve
            üniversiteyi birlikte belirleyelim.
          </p>
        </div>

        {/* Sekmeler */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {cities.map((c, i) => (
            <button
              key={c.key}
              onClick={() => setActive(i)}
              className={cn(
                'rounded-xl border py-4 px-4 text-[15px] font-semibold transition-colors',
                i === active
                  ? 'bg-[#f04420] border-[#f04420] text-white'
                  : 'bg-white border-gray-200 text-[#1c1c1e] hover:border-gray-300'
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Görsel + overlay kart */}
        <div className="mt-6 relative rounded-2xl overflow-hidden h-[440px] lg:h-[580px] bg-gray-100">
          <div ref={imgRef} className="absolute inset-0">
            <Image
              src={city.img}
              alt={city.name}
              fill
              priority
              quality={90}
              className="object-cover"
              sizes="(max-width: 1320px) 100vw, 1320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </div>

          {/* Overlay istatistik kartı */}
          <div
            ref={cardRef}
            className="absolute inset-x-4 bottom-4 lg:inset-x-8 lg:bottom-8 bg-white rounded-2xl shadow-2xl p-6 lg:p-7"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="text-[20px] font-bold text-[#1c1c1e]">{city.name}</h3>
                <p className="mt-1 text-[13.5px] text-gray-500 max-w-md leading-snug">{city.tagline}</p>
              </div>
              <a
                href="/sehirler"
                className="hidden sm:inline-flex items-center gap-2 flex-shrink-0 bg-[#f04420] hover:bg-[#d93a1a] text-white text-[13.5px] font-bold rounded-lg px-5 py-2.5 transition-colors"
              >
                Şehri İncele
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 border-t border-gray-100 pt-5">
              {city.stats.map((s) => (
                <div key={s.label}>
                  <p className="text-[12px] text-gray-400 mb-1">{s.label}</p>
                  <p className="text-[17px] font-bold text-[#1c1c1e]">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
