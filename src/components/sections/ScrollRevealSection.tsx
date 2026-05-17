'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  GraduationCap, Globe, UserCircle,
  Banknote, CalendarClock, BookOpen,
  FileText, ListChecks, Zap,
  Home, Layers, Users,
} from 'lucide-react'
import Container from '@/components/ui/Container'

gsap.registerPlugin(ScrollTrigger)

interface Card {
  Icon: React.ElementType
  title: string
  desc: string
}

interface Panel {
  id: string
  label: string
  title: string[]
  bg: string
  labelColor: string
  cards: Card[]
}

const panels: Panel[] = [
  {
    id: '01',
    label: 'Üniversite Seçimi',
    title: ['Hayalindeki', 'Okulu Bul'],
    bg: '#ede9e1',
    labelColor: '#b06020',
    cards: [
      { Icon: GraduationCap, title: '500+ Üniversite', desc: 'Dünyanın en prestijli okulları tek çatı altında' },
      { Icon: Globe, title: '45+ Ülke', desc: 'Her kıtada eğitim ve kariyer fırsatı' },
      { Icon: UserCircle, title: 'Kişisel Eşleşme', desc: 'Profiline göre üniversite öneri sistemi' },
    ],
  },
  {
    id: '02',
    label: 'Burs & Finansman',
    title: ['Eğitimini', 'Finanse Et'],
    bg: '#e1e7ed',
    labelColor: '#1d5f8a',
    cards: [
      { Icon: Banknote, title: 'Burs Veritabanı', desc: "1000'den fazla burs fırsatı listesi" },
      { Icon: CalendarClock, title: 'Başvuru Takvimi', desc: 'Son başvuru tarihlerini kaçırma' },
      { Icon: BookOpen, title: 'Danışman Desteği', desc: 'Uzman ekibimizle başvuru hazırlığı' },
    ],
  },
  {
    id: '03',
    label: 'Vize & Hazırlık',
    title: ['Sınırları', 'Aş'],
    bg: '#e1ede5',
    labelColor: '#1d6b36',
    cards: [
      { Icon: FileText, title: 'Vize Rehberi', desc: 'Ülkeye özel adım adım vize süreci' },
      { Icon: ListChecks, title: 'Belge Kontrol', desc: 'Eksik evrak bırakmayan hazırlık listesi' },
      { Icon: Zap, title: 'Hızlı Başvuru', desc: 'Ortalama 3 günde vize randevusu' },
    ],
  },
  {
    id: '04',
    label: 'Kampüs Hayatı',
    title: ['Yeni Hayatına', 'Başla'],
    bg: '#ede9e1',
    labelColor: '#7a5010',
    cards: [
      { Icon: Home, title: 'Konaklama', desc: 'Yurt, apart ve kiralık daire rehberi' },
      { Icon: Layers, title: 'Kampüs Hayatı', desc: 'Kulüpler, etkinlikler ve sosyal ağlar' },
      { Icon: Users, title: 'Topluluk', desc: 'Aynı şehirdeki Türk öğrenci ağı' },
    ],
  },
]

export default function ScrollRevealSection() {
  const panelRefs     = useRef<(HTMLElement | null)[]>([])
  const labelRefs     = useRef<(HTMLDivElement | null)[]>([])
  const titleLineRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([])

  // Match panel dimensions to visible viewport (below sticky header)
  useEffect(() => {
    const updateDimensions = () => {
      const header = document.querySelector('header')
      const hh = header?.offsetHeight ?? 116
      panelRefs.current.forEach(panel => {
        if (!panel) return
        panel.style.top    = `${hh}px`
        panel.style.height = `${window.innerHeight - hh}px`
      })
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      panels.forEach((_, i) => {
        const panel = panelRefs.current[i]
        if (!panel) return

        const label      = labelRefs.current[i]
        const titleLines = [0, 1]
          .map(li => titleLineRefs.current[i * 2 + li])
          .filter(Boolean) as HTMLDivElement[]
        const cards = [0, 1, 2]
          .map(ci => cardRefs.current[i * 3 + ci])
          .filter(Boolean) as HTMLDivElement[]

        gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
          .fromTo(label,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          )
          .fromTo(titleLines,
            { y: '110%' },
            { y: '0%', duration: 1, ease: 'power4.out', stagger: 0.08 },
            '-=0.2'
          )
          .fromTo(cards,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', stagger: 0.09 },
            '-=0.5'
          )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    // mt-20 creates the gap between UniversityGrid and this section
    <div className="mt-20 lg:mt-28">
      {panels.map((panel, i) => (
        <section
          key={panel.id}
          ref={el => { panelRefs.current[i] = el }}
          className="sticky overflow-hidden"
          style={{
            zIndex: i + 1,
            backgroundColor: panel.bg,
            top: '116px',
            height: 'calc(100vh - 116px)',
          }}
        >
          <Container className="h-full flex flex-col px-8 lg:px-16 pt-10 lg:pt-12 pb-12 lg:pb-14">

            {/* ── Label — top of panel, visible during stacking transitions ── */}
            <div
              ref={el => { labelRefs.current[i] = el }}
              className="text-center shrink-0 mb-auto"
              style={{ opacity: 0 }}
            >
              <span
                className="text-[11px] font-semibold tracking-[0.4em] uppercase"
                style={{ color: panel.labelColor }}
              >
                {panel.id} · {panel.label}
              </span>
            </div>

            {/* ── Bottom content: two-column grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr] gap-6 lg:gap-10 shrink-0">

              {/* Left: title + cards */}
              <div className="flex flex-col gap-7">

                {/* Title */}
                <h2 className="text-[clamp(3rem,5.5vw,7rem)] font-bold text-gray-900 leading-[0.88] tracking-tight">
                  {panel.title.map((line, li) => (
                    <div key={li} className="overflow-hidden">
                      <div
                        ref={el => { titleLineRefs.current[i * 2 + li] = el }}
                        style={{ transform: 'translateY(110%)' }}
                      >
                        {line}
                      </div>
                    </div>
                  ))}
                </h2>

                {/* Cards row */}
                <div className="grid grid-cols-3 gap-3 lg:gap-4">
                  {panel.cards.map((card, ci) => {
                    const Icon = card.Icon
                    return (
                      <div
                        key={ci}
                        ref={el => { cardRefs.current[i * 3 + ci] = el }}
                        className="bg-white rounded-2xl p-5 lg:p-6 shadow-sm"
                        style={{ opacity: 0 }}
                      >
                        <Icon size={26} className="text-gray-900" strokeWidth={1.5} />
                        <h3 className="text-gray-900 text-sm font-semibold mt-4 leading-snug">
                          {card.title}
                        </h3>
                        <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    )
                  })}
                </div>

              </div>

              {/* Right: image placeholder — parallelogram clip */}
              {/* Replace the inner div's background with <Image> when ready */}
              <div
                className="hidden lg:block h-full min-h-[340px] overflow-hidden"
                style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
              >
                <div
                  className="h-full w-full"
                  style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}
                />
              </div>

            </div>
          </Container>
        </section>
      ))}
    </div>
  )
}
