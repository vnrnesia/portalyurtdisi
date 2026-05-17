'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import React from 'react'
import gsap from 'gsap'
import { Plus, X, Calendar, Users } from 'lucide-react'
import Container from '@/components/ui/Container'

/* ─── Üniversite SVG Logoları ─────────────────────────────── */
// Siyah-beyaz SVG'ler — hover'da accent rengiyle boyanır

const logos: Record<string, (color: string) => React.ReactNode> = {
  harvard: (c) => (
    <svg viewBox="0 0 80 24" fill="none" className="w-28 h-7">
      <text x="0" y="20" fontFamily="Georgia,serif" fontSize="18" fontWeight="700" fill={c} letterSpacing="2">HARVARD</text>
    </svg>
  ),
  oxford: (c) => (
    <svg viewBox="0 0 72 24" fill="none" className="w-24 h-7">
      <text x="0" y="20" fontFamily="Georgia,serif" fontSize="18" fontWeight="700" fill={c} letterSpacing="1">OXFORD</text>
    </svg>
  ),
  mit: (c) => (
    <svg viewBox="0 0 48 24" fill="none" className="w-16 h-7">
      <text x="0" y="20" fontFamily="Arial,sans-serif" fontSize="22" fontWeight="900" fill={c} letterSpacing="3">MIT</text>
    </svg>
  ),
  cambridge: (c) => (
    <svg viewBox="0 0 110 24" fill="none" className="w-32 h-7">
      <text x="0" y="20" fontFamily="Georgia,serif" fontSize="16" fontWeight="700" fill={c} letterSpacing="1">CAMBRIDGE</text>
    </svg>
  ),
  stanford: (c) => (
    <svg viewBox="0 0 96 24" fill="none" className="w-28 h-7">
      <text x="0" y="20" fontFamily="Georgia,serif" fontSize="17" fontWeight="700" fill={c} letterSpacing="1">STANFORD</text>
    </svg>
  ),
  yale: (c) => (
    <svg viewBox="0 0 52 24" fill="none" className="w-16 h-7">
      <text x="0" y="20" fontFamily="Georgia,serif" fontSize="20" fontWeight="700" fill={c} letterSpacing="2">YALE</text>
    </svg>
  ),
  columbia: (c) => (
    <svg viewBox="0 0 100 24" fill="none" className="w-28 h-7">
      <text x="0" y="20" fontFamily="Georgia,serif" fontSize="17" fontWeight="700" fill={c} letterSpacing="1">COLUMBIA</text>
    </svg>
  ),
  lse: (c) => (
    <svg viewBox="0 0 44 24" fill="none" className="w-14 h-7">
      <text x="0" y="20" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="900" fill={c} letterSpacing="3">LSE</text>
    </svg>
  ),
  toronto: (c) => (
    <svg viewBox="0 0 90 24" fill="none" className="w-28 h-7">
      <text x="0" y="20" fontFamily="Georgia,serif" fontSize="17" fontWeight="700" fill={c} letterSpacing="1">TORONTO</text>
    </svg>
  ),
  melbourne: (c) => (
    <svg viewBox="0 0 110 24" fill="none" className="w-32 h-7">
      <text x="0" y="20" fontFamily="Georgia,serif" fontSize="15" fontWeight="700" fill={c} letterSpacing="1">MELBOURNE</text>
    </svg>
  ),
  nyu: (c) => (
    <svg viewBox="0 0 44 24" fill="none" className="w-14 h-7">
      <text x="0" y="20" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="900" fill={c} letterSpacing="3">NYU</text>
    </svg>
  ),
  amsterdam: (c) => (
    <svg viewBox="0 0 52 24" fill="none" className="w-16 h-7">
      <text x="0" y="20" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="900" fill={c} letterSpacing="2">UvA</text>
    </svg>
  ),
}

/* ─── Veriler ─────────────────────────────────────────────── */

interface University {
  id: string
  name: string
  shortName: string
  country: string
  flag: string
  ranking: number
  founded: number
  students: string
  description: string
  accent: string        // hover rengi
  logo: React.ReactNode // SVG logo
}

const UNIVERSITIES: University[] = [
  { id: 'harvard',   name: 'Harvard University',           shortName: 'Harvard',   country: 'ABD',        flag: '🇺🇸', ranking: 1,  founded: 1636, students: '23,000', description: 'Dünyanın en prestijli araştırma üniversitesi.',          accent: '#8B0000', logo: logos.harvard   },
  { id: 'oxford',    name: 'University of Oxford',         shortName: 'Oxford',    country: 'İngiltere',  flag: '🇬🇧', ranking: 2,  founded: 1096, students: '24,000', description: "Avrupa'nın en eski ve en saygın akademik kurumu.",        accent: '#003D7C', logo: logos.oxford    },
  { id: 'mit',       name: 'MIT',                          shortName: 'MIT',       country: 'ABD',        flag: '🇺🇸', ranking: 3,  founded: 1861, students: '11,000', description: 'Teknoloji ve inovasyon alanında küresel lider.',          accent: '#A31F34', logo: logos.mit       },
  { id: 'cambridge', name: 'University of Cambridge',      shortName: 'Cambridge', country: 'İngiltere',  flag: '🇬🇧', ranking: 4,  founded: 1209, students: '24,000', description: "Newton ve Darwin'in yetiştiği köklü akademik kurum.",     accent: '#003087', logo: logos.cambridge },
  { id: 'stanford',  name: 'Stanford University',          shortName: 'Stanford',  country: 'ABD',        flag: '🇺🇸', ranking: 5,  founded: 1885, students: '17,000', description: "Silikon Vadisi'nin kalbindeki inovasyon merkezi.",         accent: '#8C1515', logo: logos.stanford  },
  { id: 'yale',      name: 'Yale University',              shortName: 'Yale',      country: 'ABD',        flag: '🇺🇸', ranking: 6,  founded: 1701, students: '14,000', description: "Ivy League'nin en köklü liderlik geleneğine sahip kurumu.", accent: '#00356B', logo: logos.yale      },
  { id: 'columbia',  name: 'Columbia University',          shortName: 'Columbia',  country: 'ABD',        flag: '🇺🇸', ranking: 9,  founded: 1754, students: '34,000', description: "New York'un kalbinde küresel bir araştırma üniversitesi.", accent: '#1D4693', logo: logos.columbia  },
  { id: 'lse',       name: 'London School of Economics',   shortName: 'LSE',       country: 'İngiltere',  flag: '🇬🇧', ranking: 45, founded: 1895, students: '12,000', description: 'Sosyal bilimlerde küresel düzeyde lider akademik kurum.',  accent: '#B50938', logo: logos.lse       },
  { id: 'toronto',   name: 'University of Toronto',        shortName: 'Toronto',   country: 'Kanada',     flag: '🇨🇦', ranking: 21, founded: 1827, students: '97,000', description: "Kuzey Amerika'nın önde gelen araştırma üniversitesi.",    accent: '#003D7C', logo: logos.toronto   },
  { id: 'melbourne', name: 'University of Melbourne',      shortName: 'Melbourne', country: 'Avustralya', flag: '🇦🇺', ranking: 33, founded: 1853, students: '52,000', description: "Avustralya'nın en yüksek itibarli akademik kurumu.",      accent: '#00629B', logo: logos.melbourne },
  { id: 'nyu',       name: 'New York University',          shortName: 'NYU',       country: 'ABD',        flag: '🇺🇸', ranking: 38, founded: 1831, students: '60,000', description: "New York'ta çok kültürlü ve uluslararası kampüs.",        accent: '#57068C', logo: logos.nyu       },
  { id: 'amsterdam', name: 'University of Amsterdam',      shortName: 'UvA',       country: 'Hollanda',   flag: '🇳🇱', ranking: 53, founded: 1632, students: '44,000', description: "Avrupa'nın en kozmopolit ve uluslararası kampüsü.",       accent: '#CC0000', logo: logos.amsterdam },
]

const STATS = [
  { label: 'PARTNER ÜNİVERSİTE', value: '250+' },
  { label: 'BAŞARILI ÖĞRENCİ',   value: '12,450' },
  { label: 'HEDEF ÜLKE',         value: '48' },
  { label: 'VERİLEN BURS',       value: '₺15M+' },
  { label: 'ONAY ORANI',         value: '%87' },
  { label: 'ORTALAMA SÜRE',      value: '45 GÜN' },
  { label: 'AKTİF BAŞVURU',      value: '1,234' },
]

/* ─── StatsTicker — header ticker gibi kayan istatistikler ─── */

function StatsTicker() {
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ticker = tickerRef.current
    if (!ticker) return
    const singleWidth = ticker.scrollWidth / 2
    const tween = gsap.fromTo(
      ticker,
      { x: 0 },
      { x: -singleWidth, duration: 28, ease: 'none', repeat: -1 },
    )
    return () => { tween.kill() }
  }, [])

  const items = [...STATS, ...STATS]

  return (
    <Container>
      <div className="border-y border-gray-100 flex h-[42px]">
        {/* Sabit sol etiket */}
        <div className="flex-shrink-0 flex items-center gap-2 px-5 border-r border-gray-100 bg-white">
          <span className="text-orange-500 text-sm">✳</span>
          <span className="text-[11px] font-semibold text-gray-400 tracking-[0.18em] uppercase whitespace-nowrap">
            Portal Yurtdışı
          </span>
        </div>

        {/* Kayan alan — kenarlar blurlu */}
        <div
          className="flex-1 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 88%, transparent 100%)',
          }}
        >
          <div
            ref={tickerRef}
            className="flex items-center h-full whitespace-nowrap will-change-transform"
          >
            {items.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-6 border-r border-gray-100 flex-shrink-0 h-full"
              >
                <span className="text-[10px] text-gray-400 tracking-wider uppercase">{s.label}:</span>
                <span className="text-[13px] font-semibold text-gray-800 tabular-nums">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

/* ─── UniCell — logo siyah-beyaz, hover'da renkli ──────────── */

interface UniCellProps {
  uni: University
  index: number
  cellRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  onExpand: (uni: University, idx: number) => void
}

function UniCell({ uni, index, cellRefs, onExpand }: UniCellProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={el => { cellRefs.current[index] = el }}
      className="relative bg-white overflow-hidden group cursor-default rounded-xl"
      style={{ height: '180px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo — siyah-beyaz varsayılan, hover'da üniversitenin rengi */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none select-none"
        style={{ color: hovered ? uni.accent : '#c0c0c0' }}
      >
        {logos[uni.id]?.(hovered ? uni.accent : '#c0c0c0')}
      </div>

      {/* + butonu */}
      <button
        onClick={() => onExpand(uni, index)}
        className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full border border-gray-200 bg-white/90 flex items-center justify-center
                   opacity-0 group-hover:opacity-100 transition-all duration-200
                   hover:bg-orange-500 hover:border-orange-500 hover:text-white text-gray-400 hover:scale-110"
        aria-label={`${uni.name} hakkında bilgi al`}
      >
        <Plus size={11} strokeWidth={2.5} />
      </button>
    </div>
  )
}

/* ─── Ana Bileşen ─────────────────────────────────────────── */

export default function UniversityGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef   = useRef<HTMLDivElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
  const cellRefs     = useRef<(HTMLDivElement | null)[]>([])

  const selectedUni = UNIVERSITIES.find(u => u.id === selectedId) ?? null

  /* Açılma animasyonu */
  const handleExpand = useCallback((uni: University, idx: number) => {
    const container = containerRef.current
    const overlay   = overlayRef.current
    const cell      = cellRefs.current[idx]
    if (!container || !overlay || !cell) return

    const cRect  = container.getBoundingClientRect()
    const eRect  = cell.getBoundingClientRect()

    const relX  = eRect.left   - cRect.left
    const relY  = eRect.top    - cRect.top
    const cellW = eRect.width
    const cellH = eRect.height

    // Hedef: 2 × 2 hücre (aralarındaki 1 px boşluk dahil)
    const targetW = cellW * 2 + 1
    const targetH = cellH * 2 + 1

    // Container dışına taşmayı engelle
    const clampX = Math.min(Math.max(relX, 0), cRect.width  - targetW)
    const clampY = Math.min(Math.max(relY, 0), cRect.height - targetH)

    setSelectedId(uni.id)

    gsap.set(overlay, {
      display: 'block',
      x: relX, y: relY,
      width: cellW, height: cellH,
      borderRadius: 8,
      opacity: 1, scale: 1,
    })

    gsap.to(overlay, {
      x: clampX, y: clampY,
      width: targetW, height: targetH,
      duration: 0.42,
      ease: 'power3.out',
    })

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.3, delay: 0.28, ease: 'power2.out' },
      )
    }
  }, [])

  /* Kapanma animasyonu */
  const handleClose = useCallback(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    gsap.to(overlay, {
      scale: 0.94,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setSelectedId(null)
        gsap.set(overlay, { display: 'none', scale: 1, opacity: 1 })
      },
    })
  }, [])

  return (
    <section className="bg-white mt-16">

      {/* ── Stats ticker ──────────────────────────────── */}
      <StatsTicker />

      {/* ── Grid ──────────────────────────────────────── */}
      <Container className="overflow-hidden">
      <div
        ref={containerRef}
        className="relative grid bg-gray-100 p-1 rounded-xl"
        style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}
      >
        {/* Sol bilgi kartı — 2 satır kaplar */}
        <div
          className="bg-gray-50 p-8 flex flex-col justify-between rounded-xl"
          style={{ gridRow: '1 / span 2' }}
        >
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase mb-4">
              Keşfet
            </p>
            <p className="text-[1.35rem] font-semibold text-gray-900 leading-snug">
              Dünyanın en iyi üniversitelerinde{' '}
              <span className="text-orange-500">eğitim fırsatlarını</span>{' '}
              keşfet.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors group"
          >
            Tümünü gör
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </a>
        </div>

        {/* 12 üniversite hücresi */}
        {UNIVERSITIES.map((uni, i) => (
          <UniCell
            key={uni.id}
            uni={uni}
            index={i}
            cellRefs={cellRefs}
            onExpand={handleExpand}
          />
        ))}

        {/* ── Genişleme overlay ─────────────────────── */}
        <div
          ref={overlayRef}
          className="absolute z-20 overflow-hidden shadow-2xl"
          style={{ display: 'none' }}
        >
          {selectedUni && (
            <div
              ref={contentRef}
              className="w-full h-full flex flex-col p-6 text-white"
              style={{
                background: `linear-gradient(140deg, ${selectedUni.accent} 0%, ${selectedUni.accent}dd 100%)`,
              }}
            >
              {/* Üst satır */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-widest uppercase opacity-60">
                  {selectedUni.flag} {selectedUni.country}
                </span>
                <button
                  onClick={handleClose}
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/35 transition-colors flex items-center justify-center flex-shrink-0"
                  aria-label="Kapat"
                >
                  <X size={13} strokeWidth={2} />
                </button>
              </div>

              {/* Sıralama */}
              <div className="mt-auto">
                <p className="text-[3.5rem] font-extralight leading-none tabular-nums">
                  #{selectedUni.ranking}
                </p>
                <p className="text-[11px] opacity-50 mt-0.5 uppercase tracking-wider">Dünya Sıralaması</p>
              </div>

              {/* Ad + açıklama */}
              <div className="mt-3">
                <h3 className="text-base font-semibold leading-snug">{selectedUni.name}</h3>
                <p className="text-[13px] opacity-65 mt-1 leading-relaxed">{selectedUni.description}</p>
              </div>

              {/* Alt bilgi satırı */}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/20 text-[11px]">
                <span className="flex items-center gap-1 opacity-60">
                  <Calendar size={10} /> {selectedUni.founded}
                </span>
                <span className="flex items-center gap-1 opacity-60">
                  <Users size={10} /> {selectedUni.students}
                </span>
                <a
                  href="#"
                  className="ml-auto px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors font-medium"
                >
                  Başvur →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Overlay açıkken dışarı tıklamayı yakala */}
        {selectedId && (
          <div
            className="absolute inset-0 z-10"
            onClick={handleClose}
          />
        )}
      </div>
      </Container>
    </section>
  )
}
