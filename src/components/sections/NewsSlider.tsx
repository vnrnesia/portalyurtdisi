'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'

interface Slide {
  id:       string
  category: string
  title:    string
  desc:     string
  cta:      string
  seed:     string
}

const slides: Slide[] = [
  {
    id:       'burs',
    category: 'Burs Haberleri',
    title:    '2025 Rusya Devlet Bursu Başvuruları Başladı',
    desc:     '15.000+ yabancı öğrenciye verilen Rusya devlet bursu başvuruları açıldı. Son başvuru tarihi 1 Haziran 2025.',
    cta:      'Başvur',
    seed:     '200',
  },
  {
    id:       'vize',
    category: 'Vize Rehberi',
    title:    'Rusya Öğrenci Vizesinde Yeni Düzenleme',
    desc:     '2025 itibarıyla biyometrik veri zorunluluğu kaldırıldı; başvuru süreci belirgin biçimde kısaldı.',
    cta:      'Detay',
    seed:     '210',
  },
  {
    id:       'kampus',
    category: 'Kampüs Hayatı',
    title:    "Moskova'da Türk Öğrenci Buluşması Düzenlendi",
    desc:     "500+ Türk öğrencinin katıldığı buluşmada kariyer rehberliği ve ağ kurma fırsatları sunuldu.",
    cta:      'İncele',
    seed:     '220',
  },
  {
    id:       'ranking',
    category: 'Sıralamalar',
    title:    "MGU ve SPBU QS 2025'te Yükseldi",
    desc:     "Moskova Devlet Üniversitesi QS'de ilk 100'e girdi. Saint Petersburg da üst sıralarda yer aldı.",
    cta:      'Listele',
    seed:     '230',
  },
  {
    id:       'program',
    category: 'Yeni Programlar',
    title:    "Rusya'da İngilizce Tıp Eğitimi Fırsatları Arttı",
    desc:     "Kazan ve Voronej tıp fakülteleri 2025-2026'dan itibaren tam İngilizce müfredat sunuyor.",
    cta:      'Gör',
    seed:     '240',
  },
  {
    id:       'haber',
    category: 'Gündem',
    title:    "Portal Yurtdışı 12.000. Öğrencisini Yurt Dışına Gönderdi",
    desc:     "Kuruluşumuzdan bu yana toplam 12.000 öğrenci hedef üniversitelerine başarıyla yerleştirildi.",
    cta:      'Hikaye',
    seed:     '250',
  },
]

// Width of the active card. Right-side inactive cards share the remaining 45%.
// Left-side cards (index < active) are always 0%.
const ACTIVE_W = '55%'

function getWidthFor(cardIdx: number, activeIdx: number): string {
  if (cardIdx < activeIdx) return '0%'
  if (cardIdx === activeIdx) {
    const rightCount = slides.length - 1 - activeIdx
    return rightCount > 0 ? ACTIVE_W : '100%'
  }
  const rightCount = slides.length - 1 - activeIdx
  return `${(45 / rightCount).toFixed(2)}%`
}

export default function NewsSlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])
  const contentRef  = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)
  const tlRef       = useRef<gsap.core.Timeline | null>(null)

  // Kill timeline on unmount
  useEffect(() => () => { tlRef.current?.kill() }, [])

  const goTo = useCallback((nextIdx: number) => {
    if (isAnimating.current || nextIdx === activeIndex) return
    isAnimating.current = true

    tlRef.current?.kill()
    const tl = gsap.timeline({ onComplete: () => { isAnimating.current = false } })
    tlRef.current = tl

    // 1. Content fade-out
    tl.to(contentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.18,
      ease: 'power2.in',
    })

    // 2. All card widths simultaneously:
    //    left  → 0%  (disappear)
    //    active → 55% (or 100% if last)
    //    right  → distribute remaining 45% evenly
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      tl.to(card, {
        width: getWidthFor(i, nextIdx),
        duration: 0.65,
        ease: 'power3.out',
      }, 0.1)
    })

    // 3. Update React state mid-timeline → triggers re-render of content
    tl.call(() => setActiveIndex(nextIdx), [], 0.18)

    // 4. Content fade-in (after React settles)
    tl.fromTo(contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      0.38
    )
  }, [activeIndex])

  const prev = useCallback(() => goTo((activeIndex - 1 + slides.length) % slides.length), [activeIndex, goTo])
  const next = useCallback(() => goTo((activeIndex + 1) % slides.length), [activeIndex, goTo])

  const active = slides[activeIndex]

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container className="px-8 lg:px-16">

        {/* ── Header ── */}
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <div className="mb-5">
              <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-gray-500 mb-2">HABERLER</p>
              <div className="relative h-px bg-gray-300 w-full">
                <div className="absolute left-0 top-0 w-8 h-[2px] bg-[#f04420] -translate-y-px" />
              </div>
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold text-gray-900 leading-tight tracking-tight">
              Güncel Haberler<br />ve Duyurular
            </h2>
          </div>

          <div className="flex gap-2 shrink-0 mt-1">
            <button
              onClick={prev}
              className="w-11 h-11 flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Önceki"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Sonraki"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </Container>

      {/* ── Desktop Accordion ── */}
      <div
        className="hidden lg:flex gap-[3px] overflow-hidden px-8 lg:px-16"
        style={{ height: 520 }}
      >
          {slides.map((slide, i) => {
            const isActive = i === activeIndex
            return (
              <div
                key={slide.id}
                ref={el => { cardRefs.current[i] = el }}
                className="relative flex-shrink-0 overflow-hidden cursor-pointer"
                style={{ width: getWidthFor(i, 0) }}
                onClick={() => goTo(i)}
              >
                {/* Photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${slide.seed}/900/700`}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

                {/* Narrow label — visible only when inactive */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
                  style={{ opacity: isActive ? 0 : 1 }}
                >
                  <span
                    className="text-white/60 text-[10px] font-semibold tracking-[0.35em] uppercase whitespace-nowrap select-none"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    {slide.category}
                  </span>
                </div>

                {/* Active: category badge top-left */}
                <div
                  className="absolute top-5 left-5 transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0 }}
                >
                  <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-white/60">
                    {slide.category}
                  </span>
                </div>

                {/* Active: slide counter bottom-right */}
                <div
                  className="absolute bottom-5 right-5 transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0 }}
                >
                  <span className="text-white/30 text-xs font-mono tabular-nums">
                    {String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            )
          })}
      </div>

      <Container className="px-8 lg:px-16">
        {/* ── Text Content (desktop) — cross-fades on change ── */}
        <div
          ref={contentRef}
          className="hidden lg:flex mt-8 items-end justify-between gap-12"
        >
          {/* Left: category + title */}
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-green-500 mb-3 block">
              {active.category}
            </span>
            <h3 className="text-[clamp(1.4rem,2.2vw,2rem)] font-bold text-gray-900 leading-snug tracking-tight">
              {active.title}
            </h3>
          </div>

          {/* Right: desc + CTA */}
          <div className="flex flex-col items-end gap-4 shrink-0 max-w-sm">
            <p className="text-gray-500 text-[15px] leading-relaxed text-right">
              {active.desc}
            </p>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-700 transition-colors text-white text-sm font-medium rounded-full">
              {active.cta} <ArrowRight size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* ── Mobile Fallback ── */}
        <div className="flex lg:hidden gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden -mx-8 px-8">
          {slides.map(slide => (
            <article
              key={slide.id}
              className="flex-shrink-0 w-[78vw] rounded-xl overflow-hidden flex flex-col"
            >
              <div className="relative aspect-video">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${slide.seed}/600/400`}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-widest uppercase text-white/60">
                  {slide.category}
                </span>
              </div>
              <div className="pt-4">
                <h3 className="text-gray-900 font-semibold text-[15px] leading-snug mb-2">
                  {slide.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                  {slide.desc}
                </p>
              </div>
            </article>
          ))}
        </div>

      </Container>
    </section>
  )
}
