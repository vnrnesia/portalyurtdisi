'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'

interface Testimonial {
  id: number
  name: string
  university: string
  country: string
  program: string
  quote: string
  gradient: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ayşe Kaya',
    university: 'University of Edinburgh',
    country: 'İngiltere',
    program: 'Bilgisayar Mühendisliği MSc',
    quote: '"Portal Yurtdışı\'nın danışmanlık hizmeti olmadan bu süreçte kaybolurdum. Vize başvurusundan burs mülakatına kadar her adımda yanımdalardı."',
    gradient: 'from-indigo-900 via-indigo-800 to-blue-900',
  },
  {
    id: 2,
    name: 'Mehmet Demir',
    university: 'TU München',
    country: 'Almanya',
    program: 'Makine Mühendisliği MSc',
    quote: '"Almanya vize sürecinin bu kadar sorunsuz ilerleyeceğini düşünmezdim. Belge kontrol listesi sayesinde hiçbir evrak eksik olmadı, ilk başvuruda vizemi aldım."',
    gradient: 'from-sky-900 via-cyan-900 to-teal-900',
  },
  {
    id: 3,
    name: 'Zeynep Arslan',
    university: 'Sciences Po Paris',
    country: 'Fransa',
    program: 'Uluslararası İlişkiler MA',
    quote: '"1000\'den fazla burs arasından bana en uygun olanı bulan sistem harika. Tam burs kazandım ve şu an Paris\'te hayallerimi yaşıyorum."',
    gradient: 'from-rose-900 via-pink-900 to-fuchsia-900',
  },
  {
    id: 4,
    name: 'Can Yıldız',
    university: 'ETH Zürich',
    country: 'İsviçre',
    program: 'Veri Bilimi MSc',
    quote: '"ETH\'ye başvururken çok tereddütlüydüm. Kişisel eşleşme sistemi profilime çok uygun olduğunu gösterdi, başvurdum ve kabul aldım!"',
    gradient: 'from-emerald-900 via-green-900 to-teal-900',
  },
  {
    id: 5,
    name: 'Selin Çelik',
    university: 'University of Toronto',
    country: 'Kanada',
    program: 'İşletme MBA',
    quote: '"Kanada öğrenci vizesi için onlarca belge korkutucuydu. Portal Yurtdışı\'nın adım adım rehberi sayesinde tüm süreci sorunsuz tamamladım."',
    gradient: 'from-amber-900 via-orange-900 to-red-900',
  },
]

export default function Testimonials() {
  const trackRef  = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

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
    <section className="bg-white py-20 lg:py-28">

      {/* Header */}
      <Container className="px-8 lg:px-16 mb-10 lg:mb-14">
        <div className="flex items-start justify-between">
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold text-gray-900 max-w-lg leading-tight tracking-tight">
            Öğrencilerimizin Başarı Hikayeleri
          </h2>
          <div className="flex gap-2 shrink-0 mt-1">
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
      </Container>

      {/* Carousel track — overflow hidden clips the peek card */}
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
              {/* Image / gradient card */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-5 select-none">
                <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient}`} />
                <div className="absolute inset-0 bg-black/30" />

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
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-[15px] leading-relaxed flex-1 mb-5">
                {t.quote}
              </p>

              {/* CTA */}
              <button className="w-full flex items-center justify-center gap-2 py-[14px] bg-gray-900 hover:bg-gray-700 transition-colors text-white text-sm font-medium rounded-xl">
                Hikayeyi Oku <ArrowRight size={15} strokeWidth={2.5} />
              </button>
            </article>
          ))}

          {/* Right-side breathing room */}
          <div className="flex-shrink-0 w-8 lg:w-16" aria-hidden />
        </div>
      </div>

    </section>
  )
}
