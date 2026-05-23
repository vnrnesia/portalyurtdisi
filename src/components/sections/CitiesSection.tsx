'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { GraduationCap, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Container from '@/components/ui/Container'

const COLLAPSED_W = 130
const EXPANDED_W  = 420
const CARD_H      = 540

const cities = [
  {
    id: 'moscow',
    slug: 'moskova',
    name: 'Moskova',
    ru: 'Москва',
    unis: '5',
    students: '12.000+',
    desc: "Rusya'nın başkenti ve en büyük eğitim merkezi. MGU, RUDN, HSE, Bauman ve MEPhI gibi dünya çapında üniversitelere ev sahipliği yapıyor.",
    img: '/cities/moscow.png',
  },
  {
    id: 'spb',
    slug: 'sankt-peterburg',
    name: 'Sankt-Peterburg',
    ru: 'Санкт-Петербург',
    unis: '3',
    students: '8.500+',
    desc: "Kuzey Avrupa'nın kültür başkenti. SPbGU, SPbPU ve ITMO ile köklü akademik geleneğiyle eşsiz bir eğitim ortamı.",
    img: '/cities/petersburg.png',
  },
  {
    id: 'ekaterinburg',
    slug: 'ekaterinburg',
    name: 'Ekaterinburg',
    ru: 'Екатеринбург',
    unis: '2',
    students: '2.800+',
    desc: "Ural bölgesinin sanayi ve kültür başkenti. Ural Federal Üniversitesi hem Rusça hem İngilizce programlarıyla öne çıkıyor.",
    img: '/cities/yekaterinburg.png',
  },
  {
    id: 'kazan',
    slug: 'kazan',
    name: 'Kazan',
    ru: 'Казань',
    unis: '3',
    students: '3.200+',
    desc: "Tataristan'ın başkenti, hem Türkçe hem Rusça konuşulan çok kültürlü bir eğitim şehri. Türk öğrenciler için ideal.",
    img: '/cities/view-of-the-kazan-kremlin-2026-03-24-08-50-35-utc.jpg',
  },
  {
    id: 'nnov',
    slug: 'nijniy-novgorod',
    name: 'Nijniy Novgorod',
    ru: 'Нижний Новгород',
    unis: '2',
    students: '2.400+',
    desc: "Volga ve Oka nehirleri kavşağındaki tarihi şehir. UNN Lobaçevskiy ve HSE NN ile bilişim ve araştırma odaklı güçlü seçenekler.",
    img: '/cities/nijniy.png',
  },
]

export default function CitiesSection() {
  const [activeId, setActiveId]           = useState<string | null>('kazan')
  const [userHovering, setUserHovering]   = useState(false)
  // scrollRef → overflow-x: auto wrapper (scroll position lives here)
  // trackRef  → inner flex container (card offsetLeft relative to this)
  const scrollRef   = useRef<HTMLDivElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lastIdxRef  = useRef<number>(3)

  // Returns indices of cards whose left edge is currently inside the scroll viewport
  const getVisibleIndices = useCallback((): number[] => {
    const scroll = scrollRef.current
    if (!scroll) return []
    const { scrollLeft, clientWidth } = scroll
    const visible: number[] = []
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const left  = card.offsetLeft
      const right = left + COLLAPSED_W
      if (right > scrollLeft && left < scrollLeft + clientWidth) {
        visible.push(i)
      }
    })
    return visible
  }, [])

  const pickRandom = useCallback(() => {
    const visible = getVisibleIndices()
    if (visible.length === 0) return
    const candidates = visible.filter(i => i !== lastIdxRef.current)
    const pool = candidates.length > 0 ? candidates : visible
    const idx  = pool[Math.floor(Math.random() * pool.length)]
    lastIdxRef.current = idx
    setActiveId(cities[idx].id)
    // No scroll — card is already visible
  }, [getVisibleIndices])

  useEffect(() => {
    if (userHovering) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    const timeout = setTimeout(() => {
      pickRandom()
      intervalRef.current = setInterval(pickRandom, 10000)
    }, 1200)
    return () => {
      clearTimeout(timeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [userHovering, pickRandom])

  const scrollTrack = (dir: 'prev' | 'next') => {
    scrollRef.current?.scrollBy({ left: dir === 'next' ? 360 : -360, behavior: 'smooth' })
  }

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container className="px-8 lg:px-16">
        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-14">
          <div>
            <div className="mb-5">
              <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-gray-500 mb-2">ŞEHİRLER</p>
              <div className="relative h-px bg-gray-300 w-full">
                <div className="absolute left-0 top-0 w-8 h-[2px] bg-[#f04420] -translate-y-px" />
              </div>
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold text-gray-900 leading-tight tracking-tight">
              Rusya'da Eğitim<br />Vereceğiniz Şehirler
            </h2>
          </div>

          <div className="flex items-end gap-8">
            <p className="text-gray-500 text-[15px] leading-relaxed max-w-xs hidden lg:block">
              5 farklı Rus şehrinde 14 partner üniversite,{' '}
              binlerce Türk öğrenci topluluğu seni bekliyor.
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => scrollTrack('prev')}
                className="w-11 h-11 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Önceki"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                onClick={() => scrollTrack('next')}
                className="w-11 h-11 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Sonraki"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>

      </Container>

      {/* ── Full-width track ── */}
      <div
        ref={scrollRef}
        className="overflow-x-auto [&::-webkit-scrollbar]:hidden px-8 lg:px-16"
        style={{ scrollbarWidth: 'none', height: CARD_H }}
        onMouseEnter={() => setUserHovering(true)}
        onMouseLeave={() => { setUserHovering(false); setActiveId('kazan') }}
      >
        <div
          ref={trackRef}
          className="flex gap-[3px] h-full"
          style={{ width: '100%', minWidth: 'max-content' }}
        >
            {cities.map((city, i) => {
              const isActive = activeId === city.id

              return (
                <div
                  key={city.id}
                  ref={el => { cardRefs.current[i] = el }}
                  className="relative flex-shrink-0 overflow-hidden cursor-pointer"
                  style={{
                    width: isActive ? EXPANDED_W : undefined,
                    flex: isActive ? `0 0 ${EXPANDED_W}px` : '1 1 0',
                    minWidth: isActive ? EXPANDED_W : COLLAPSED_W,
                    height: CARD_H,
                    borderRadius: 16,
                    transition: 'flex 0.55s cubic-bezier(0.4,0,0.2,1), min-width 0.55s cubic-bezier(0.4,0,0.2,1)',
                  }}
                  onMouseEnter={() => setActiveId(city.id)}
                >
                  {/* Photo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={city.img}
                    alt={city.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      transform: isActive ? 'scale(1.04)' : 'scale(1.14)',
                      transition: 'transform 0.75s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isActive
                        ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.1) 100%)'
                        : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.45) 100%)',
                      transition: 'background 0.4s ease',
                    }}
                  />

                  {/* Collapsed: vertical label */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{
                      opacity: isActive ? 0 : 1,
                      transition: 'opacity 0.25s ease',
                    }}
                  >
                    <span
                      className="text-white/70 text-[10px] font-semibold tracking-[0.3em] uppercase whitespace-nowrap select-none"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                      {city.name}
                    </span>
                  </div>

                  {/* Expanded content */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-7"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0)' : 'translateY(16px)',
                      transition: 'opacity 0.3s ease 0.2s, transform 0.3s ease 0.2s',
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <p className="text-white/40 text-[11px] tracking-widest mb-1 font-medium">
                      {city.ru}
                    </p>
                    <h3 className="text-white text-[1.4rem] font-bold tracking-tight leading-snug mb-2">
                      {city.name}
                    </h3>
                    <p className="text-white/60 text-[13px] leading-relaxed mb-5 max-w-[260px]">
                      {city.desc}
                    </p>

                    <div className="flex items-center gap-4 mb-5">
                      <div className="flex items-center gap-1.5">
                        <GraduationCap size={11} className="text-white/45" />
                        <span className="text-white text-[12px] font-semibold">{city.unis}</span>
                        <span className="text-white/40 text-[11px]">üniversite</span>
                      </div>
                      <div className="w-px h-3 bg-white/20" />
                      <div className="flex items-center gap-1.5">
                        <Users size={11} className="text-white/45" />
                        <span className="text-white text-[12px] font-semibold">{city.students}</span>
                        <span className="text-white/40 text-[11px]">öğrenci</span>
                      </div>
                    </div>

                    <Link
                      href={`/sehirler/${city.slug}`}
                      className="self-start flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-900 text-[12px] font-semibold hover:bg-white/90 transition-colors"
                    >
                      Keşfet <ArrowRight size={12} strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
