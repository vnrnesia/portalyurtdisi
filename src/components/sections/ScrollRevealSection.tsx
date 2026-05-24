'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  GraduationCap, Target, UserCircle,
  FileText, Languages, Stamp,
  Send, ListChecks, Mail,
  ShieldCheck, FolderOpen, ClipboardList,
  Plane, MapPin, Heart,
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
    label: 'Ülke ve Üniversite Seçimi',
    title: ['Doğru Ülke ve', 'Üniversite Seçimi'],
    bg: '#1c1c1c',
    labelColor: '#f04420',
    cards: [
      { Icon: GraduationCap, title: 'Akademik Analiz', desc: 'Öğrencinin akademik geçmişi, kariyer hedefleri ve sosyal yaşam beklentisi değerlendirilir.' },
      { Icon: Target, title: 'Bütçe & Dil Faktörleri', desc: 'Bütçe uygunluğu, dil seviyesi ve adaptasyon faktörleri detaylı şekilde analiz edilir.' },
      { Icon: UserCircle, title: 'Kariyer Planlaması', desc: 'Öğrenciye özel kariyer planlaması yapılır ve en uygun ülke ile üniversite seçenekleri belirlenir.' },
    ],
  },
  {
    id: '02',
    label: 'Evrak Hazırlık ve Tercüme',
    title: ['Evrak Hazırlık ve', 'Resmi Tercüme Süreci'],
    bg: '#222222',
    labelColor: '#f04420',
    cards: [
      { Icon: FileText, title: 'Resmi Belgeler', desc: 'Diploma, transkript, pasaport, fotoğraf, sağlık raporu ve gerekli tüm belgeler eksiksiz hazırlanır.' },
      { Icon: Languages, title: 'Yeminli Tercüme', desc: 'Tüm belgeler yeminli tercüman tarafından çevrilir ve gerektiğinde noter onaylı hale getirilir.' },
      { Icon: Stamp, title: 'Noter Onayı', desc: 'Başvuru kriterlerine uygun olarak belgeler resmi onay sürecinden eksiksiz geçirilir.' },
    ],
  },
  {
    id: '03',
    label: 'Başvuru ve Davetiye Süreci',
    title: ['Üniversite Başvurusu', 've Davetiye Süreci'],
    bg: '#282828',
    labelColor: '#f04420',
    cards: [
      { Icon: Send, title: 'Başvuru Takibi', desc: 'Üniversite başvurusu yapılır, süreç titizlikle takip edilir ve resmi kayıt işlemleri başlatılır.' },
      { Icon: Mail, title: 'Davet Mektubu', desc: 'İçişleri Bakanlığı onaylı resmi davet mektubu süreci danışmanlık ekibimiz tarafından yönetilir.' },
      { Icon: ListChecks, title: 'Prosedür Yönetimi', desc: 'Bu aşamada tüm resmi prosedürler danışmanlık ekibimiz tarafından eksiksiz takip edilir.' },
    ],
  },
  {
    id: '04',
    label: 'Vize İşlemi',
    title: ['Vize', 'İşlemi'],
    bg: '#2e2e2e',
    labelColor: '#f04420',
    cards: [
      { Icon: ClipboardList, title: 'Evrak Listesi', desc: 'Başarılı kabul ve davetiye alındıktan sonra konsolosluk için gerekli evrak listesi hazırlanır.' },
      { Icon: FolderOpen, title: 'Başvuru Dosyası', desc: 'Vize başvuru dosyası eksiksiz oluşturulur, Türkiye\'deki ilgili konsolosluklara başvuru yapılır.' },
      { Icon: ShieldCheck, title: 'Adım Adım Takip', desc: 'Vize süreci danışmanlarımız tarafından başından sonuna kadar adım adım takip edilir.' },
    ],
  },
  {
    id: '05',
    label: 'Varış ve Adaptasyon Süreci',
    title: ["Rusya'ya Varış ve", 'Adaptasyon Süreci'],
    bg: '#343434',
    labelColor: '#f04420',
    cards: [
      { Icon: Plane, title: 'Uçuş Organizasyonu', desc: 'Uygun tarihte uçak bileti organizasyonu yapılır, İstanbul Havalimanı\'ndan danışman eşliğinde kafileli uçuş gerçekleştirilir.' },
      { Icon: MapPin, title: 'Varış Desteği', desc: 'Varışta karşılama ve yurda yerleşim sağlanır, ulaşım kartı, sağlık sigortası ve SIM kart işlemleri tamamlanır.' },
      { Icon: Heart, title: '15 Günlük Adaptasyon', desc: 'Öğrenciler için 15 günlük adaptasyon ve rehberlik süreci başlatılır.' },
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
    const hh = document.querySelector('header')?.offsetHeight ?? 116
    let headerHidden = false
    let lastScrollY = window.scrollY

    const setTops = (offset: number) => {
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return
        panel.style.top = `${offset + i * LABEL_H}px`
      })
    }

    const updateDimensions = () => {
      const offset = headerHidden ? 0 : hh
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return
        const stickyTop = offset + i * LABEL_H
        panel.style.top    = `${stickyTop}px`
        panel.style.height = `${window.innerHeight - (hh + i * LABEL_H)}px`
      })
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    // Header ile aynı scroll mantığı — senkron çalışır
    const onScroll = () => {
      const y = window.scrollY
      const diff = y - lastScrollY
      lastScrollY = y

      if (diff > 6 && y > 80 && !headerHidden) {
        headerHidden = true
        setTops(0)
      } else if (diff < -6 && headerHidden) {
        headerHidden = false
        setTops(hh)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', updateDimensions)
      window.removeEventListener('scroll', onScroll)
    }
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
            className="flex items-center justify-center shrink-0 border-b border-white/[0.08]"
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
          <Container className="flex-1 flex flex-col px-5 sm:px-8 lg:px-16 pt-6 lg:pt-0 pb-6 lg:pb-14 overflow-hidden relative">

            {/* Spacer: masaüstünde içeriği alta iter, mobilde gizli */}
            <div className="hidden lg:block flex-1" />

            {/* Title */}
            <h2 className="text-[clamp(1.4rem,5.2vw,7rem)] font-bold text-[#f04420] leading-[0.88] tracking-tight mb-4 lg:mb-7">
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

            {/* Cards row — 3 kolon grid */}
            <div className="grid grid-cols-3 gap-1.5 lg:gap-4">
              {panel.cards.map((card, ci) => {
                const Icon = card.Icon
                return (
                  <div
                    key={ci}
                    ref={el => { cardRefs.current[i * 3 + ci] = el }}
                    className="bg-white/[0.06] rounded-xl lg:rounded-2xl p-2.5 lg:p-6 border border-white/[0.08]"
                    style={{ opacity: 0 }}
                  >
                    {/* Mobil */}
                    <div className="flex items-center gap-1.5 lg:hidden">
                      <Icon size={12} className="text-white/70 shrink-0" strokeWidth={1.5} />
                      <h3 className="text-white text-[9px] font-semibold leading-snug">{card.title}</h3>
                    </div>
                    <p className="text-white/45 text-[8.5px] mt-1.5 leading-relaxed line-clamp-3 lg:hidden">
                      {card.desc}
                    </p>
                    {/* Masaüstü */}
                    <Icon size={22} className="text-white/80 hidden lg:block" strokeWidth={1.5} />
                    <h3 className="text-white text-sm font-semibold mt-4 leading-snug hidden lg:block">{card.title}</h3>
                    <p className="text-white/50 text-xs mt-2 leading-relaxed hidden lg:block">{card.desc}</p>
                  </div>
                )
              })}
            </div>

            {/* Image placeholder — absolute right, parallelogram clip */}
            <div
              className="hidden lg:block absolute right-0 top-0 bottom-0 w-[36%]"
              style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
            >
              <div className="h-full w-full" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }} />
            </div>

          </Container>
        </section>
      ))}
    </div>
  )
}
