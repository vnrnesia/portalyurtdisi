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

// Height of each sticky label strip (px)
const LABEL_H = 52

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
    labelColor: '#9a5218',
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
    labelColor: '#1a5480',
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
    labelColor: '#1a5c30',
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
    bg: '#ede5e1',
    labelColor: '#7a3a10',
    cards: [
      { Icon: Home, title: 'Konaklama', desc: 'Yurt, apart ve kiralık daire rehberi' },
      { Icon: Layers, title: 'Kampüs Hayatı', desc: 'Kulüpler, etkinlikler ve sosyal ağlar' },
      { Icon: Users, title: 'Topluluk', desc: 'Aynı şehirdeki Türk öğrenci ağı' },
    ],
  },
]

export default function ScrollRevealSection() {
  const panelRefs     = useRef<(HTMLElement | null)[]>([])
  const titleLineRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([])

  // Each panel sticks at: headerHeight + i * LABEL_H
  // Each panel height fills: 100vh - (headerHeight + i * LABEL_H)
  useEffect(() => {
    const updateDimensions = () => {
      const hh = document.querySelector('header')?.offsetHeight ?? 116
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return
        const stickyTop = hh + i * LABEL_H
        panel.style.top    = `${stickyTop}px`
        panel.style.height = `${window.innerHeight - stickyTop}px`
      })
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    const hh = document.querySelector('header')?.offsetHeight ?? 116

    const ctx = gsap.context(() => {
      panels.forEach((_, i) => {
        const panel = panelRefs.current[i]
        if (!panel) return

        const titleLines = [0, 1]
          .map(li => titleLineRefs.current[i * 2 + li])
          .filter(Boolean) as HTMLDivElement[]
        const cards = [0, 1, 2]
          .map(ci => cardRefs.current[i * 3 + ci])
          .filter(Boolean) as HTMLDivElement[]

        // Fire when the panel reaches its sticky position (fully in view)
        gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: `top top+=${hh + i * LABEL_H}`,
            toggleActions: 'play none none none',
          },
        })
          .fromTo(titleLines,
            { y: '110%' },
            { y: '0%', duration: 1, ease: 'power4.out', stagger: 0.08 }
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
    <div className="mt-20 lg:mt-28">
      {panels.map((panel, i) => (
        <section
          key={panel.id}
          ref={el => { panelRefs.current[i] = el }}
          className="sticky overflow-hidden flex flex-col"
          style={{
            zIndex: i + 1,
            backgroundColor: panel.bg,
            // CSS fallback — JS updates these on mount
            top: `${116 + i * LABEL_H}px`,
            height: `calc(100vh - ${116 + i * LABEL_H}px)`,
          }}
        >
          {/* ── Label strip — stacks at top as panels accumulate ── */}
          <div
            className="flex items-center justify-center shrink-0 border-b border-black/[0.07]"
            style={{ height: LABEL_H }}
          >
            <span
              className="text-[11px] font-semibold tracking-[0.4em] uppercase"
              style={{ color: panel.labelColor }}
            >
              {panel.id} · {panel.label}
            </span>
          </div>

          {/* ── Main content — pushed to bottom by spacer ── */}
          <Container className="flex-1 flex flex-col px-8 lg:px-16 pb-10 lg:pb-14 overflow-hidden relative">

            {/* Spacer keeps title/cards at the bottom */}
            <div className="flex-1" />

            {/* Title */}
            <h2 className="text-[clamp(2.6rem,5.2vw,7rem)] font-bold text-gray-900 leading-[0.88] tracking-tight mb-7">
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

            {/* Image placeholder — absolute right, parallelogram clip.
                Replace the inner div with <Image> when ready. */}
            <div
              className="hidden lg:block absolute right-0 top-0 bottom-0 w-[36%]"
              style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
            >
              <div className="h-full w-full" style={{ backgroundColor: 'rgba(0,0,0,0.055)' }} />
            </div>

          </Container>
        </section>
      ))}
    </div>
  )
}
