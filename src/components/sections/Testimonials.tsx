'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import Container from '@/components/ui/Container'

interface Testimonial {
  id: number
  name: string
  university: string
  country: string
  program: string
  quote: string
  photo: string
  youtubeId?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Berra',
    university: 'Kazan Federal Üniversitesi',
    country: 'Rusya',
    program: 'Diş Hekimliği · Rusça Hazırlık',
    quote: '"Diş hekimliği okumak için Rusya\'yı seçtim ve hiç pişman olmadım. Portal Yurtdışı tüm evrak sürecini ve Kazan\'a adaptasyonumu çok kolaylaştırdı."',
    photo: '/ogrenciler/berra',
    youtubeId: 'xl4GgIkyVio',
  },
  {
    id: 2,
    name: 'Ömer',
    university: 'Kazan Agrarniye Üniversitesi',
    country: 'Rusya',
    program: 'Rusça Hazırlık',
    quote: '"Kazan\'a geldiğimde Rusça bilmiyordum ama hazırlık programı ve danışmanlarımın desteğiyle hem dili öğrendim hem de üniversiteye sorunsuz yerleştim."',
    photo: '/ogrenciler/omer.png',
  },
  {
    id: 3,
    name: 'Aybars',
    university: 'MEPhI Üniversitesi',
    country: 'Rusya',
    program: 'Tıp · 2. Sınıf · İngilizce',
    quote: '"MEPhI\'de İngilizce tıp eğitimi alıyorum. Portal Yurtdışı sayesinde bu prestijli üniversiteye başvuru sürecini sıfırdan öğrendim ve kabul aldım."',
    photo: '/ogrenciler/aybars.png',
    youtubeId: 'KzjnJPYehW8',
  },
  {
    id: 4,
    name: 'Öykü',
    university: 'Kazan Federal Üniversitesi',
    country: 'Rusya',
    program: 'Tıp · Rusça Hazırlık',
    quote: '"Tıp okumak için Kazan\'ı seçtim. Rusça hazırlık sürecinde hiç yalnız hissetmedim; Portal Yurtdışı ekibi her sorunumda yanımdaydı."',
    photo: '/ogrenciler/oyku.png',
    youtubeId: 'qB2PFs9T8yQ',
  },
  {
    id: 5,
    name: 'Toprak',
    university: 'Kazan Federal Üniversitesi',
    country: 'Rusya',
    program: 'Rusça Hazırlık',
    quote: '"Rusça hazırlık programı sayesinde hem dili öğrendim hem de Kazan\'ı keşfettim. Portal Yurtdışı olmadan bu süreci bu kadar rahat atlatamadım."',
    photo: '/ogrenciler/toprak.png',
    youtubeId: '1sqKxp9scP0',
  },
]

export default function Testimonials() {
  const trackRef  = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const updateButtons = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 10)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateButtons, { passive: true })
    updateButtons()
    return () => el.removeEventListener('scroll', updateButtons)
  }, [updateButtons])

  const scroll = (dir: 'prev' | 'next') => {
    const el = trackRef.current
    if (!el) return
    const card = el.children[0] as HTMLElement
    const step = (card?.offsetWidth ?? 600) + 24
    el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' })
  }

  return (
    <section className="bg-white pt-20 pb-32 lg:pt-28 lg:pb-40">

      {/* Header */}
      <Container className="px-8 lg:px-16 mb-10 lg:mb-14">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-end">

          {/* Left */}
          <div>
            <div className="mb-5">
              <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-gray-500 mb-2">
                YouTube İçeriklerimiz
              </p>
              <div className="relative h-px bg-gray-300 w-full">
                <div className="absolute left-0 top-0 w-8 h-[2px] bg-gray-500 -translate-y-px" />
              </div>
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold text-gray-900 leading-tight tracking-tight">
              Gerçek Hikayeler,<br />Gerçek Sonuçlar.
            </h2>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-5 lg:items-end">
            <div className="flex items-start gap-4">
              <div className="w-8 h-px bg-gray-400 mt-3 shrink-0" />
              <p className="text-gray-500 text-[14px] leading-relaxed">
                Gerçek öğrenci deneyimleri, üniversite ziyaretleri ve birebir süreç videoları yaptığımız işi şeffaf şekilde ortaya koyuyoruz.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => scroll('prev')}
                disabled={!canPrev}
                className="w-11 h-11 flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
                aria-label="Önceki"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll('next')}
                disabled={!canNext}
                className="w-11 h-11 flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
                aria-label="Sonraki"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </Container>

      {/* Carousel track */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 pl-8 lg:pl-16 overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {testimonials.map(t => (
            <article
              key={t.id}
              className="flex-shrink-0 w-[82vw] sm:w-[60vw] lg:w-[calc(50%-12px)] flex flex-col"
            >
              {/* Card */}
              <a
                href={t.youtubeId ? `https://www.youtube.com/watch?v=${t.youtubeId}` : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-5 select-none block"
                style={{ cursor: t.youtubeId ? 'pointer' : 'default' }}
                onMouseEnter={() => setHoveredId(t.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Student photo (default) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.photo}
                  alt={t.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                  style={{
                    transform: hoveredId === t.id && t.youtubeId ? 'scale(1.04)' : 'scale(1)',
                    opacity: hoveredId === t.id && t.youtubeId ? 0 : 1,
                  }}
                />

                {/* YouTube thumbnail on hover */}
                {t.youtubeId && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={`https://img.youtube.com/vi/${t.youtubeId}/maxresdefault.jpg`}
                    alt={`${t.name} video`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                    style={{ opacity: hoveredId === t.id ? 1 : 0 }}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />

                {/* Play button — shown when youtubeId is set */}
                {t.youtubeId && (
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                    style={{ opacity: hoveredId === t.id ? 1 : 0.6 }}
                  >
                    <div className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center transition-transform duration-200"
                      style={{ transform: hoveredId === t.id ? 'scale(1.15)' : 'scale(1)' }}
                    >
                      <Play size={22} className="text-white ml-1" fill="white" />
                    </div>
                  </div>
                )}

                {/* Name + university — top left */}
                <div className="absolute top-5 left-5 right-20">
                  <p className="text-white font-semibold text-base leading-snug">{t.name}</p>
                  <p className="text-white/65 text-sm mt-0.5">{t.university} · {t.country}</p>
                </div>

                {/* Program tag — bottom left */}
                <div className="absolute bottom-5 left-5">
                  <span className="text-[11px] font-medium text-white/60 tracking-wide uppercase">
                    {t.program}
                  </span>
                </div>

                {/* Decorative initial */}
                <div
                  className="absolute -bottom-4 right-4 text-white/[0.07] font-black leading-none pointer-events-none"
                  style={{ fontSize: 'clamp(5rem,12vw,9rem)' }}
                >
                  {t.name[0]}
                </div>
              </a>

              {/* Quote */}
              <p className="text-gray-600 text-[15px] leading-relaxed">
                {t.quote}
              </p>
            </article>
          ))}

          {/* Right-side breathing room */}
          <div className="flex-shrink-0 w-8 lg:w-16" aria-hidden />
        </div>
      </div>

    </section>
  )
}
