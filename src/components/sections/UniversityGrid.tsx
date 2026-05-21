'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import React from 'react'
import gsap from 'gsap'
import { Plus, X, Calendar, Users } from 'lucide-react'
import Container from '@/components/ui/Container'

const logos: Record<string, (color: string) => React.ReactNode> = {
  mgu: (c) => (
    <svg viewBox="0 0 60 24" fill="none" className="w-16 h-7">
      <text x="0" y="20" fontFamily="Georgia,serif" fontSize="20" fontWeight="700" fill={c} letterSpacing="2">МГУ</text>
    </svg>
  ),
  bauman: (c) => (
    <svg viewBox="0 0 108 24" fill="none" className="w-28 h-7">
      <text x="0" y="20" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill={c} letterSpacing="1">BAUMAN</text>
    </svg>
  ),
  rudn: (c) => (
    <svg viewBox="0 0 76 24" fill="none" className="w-20 h-7">
      <text x="0" y="20" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="900" fill={c} letterSpacing="2">RUDN</text>
    </svg>
  ),
  hse: (c) => (
    <svg viewBox="0 0 52 24" fill="none" className="w-14 h-7">
      <text x="0" y="20" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="900" fill={c} letterSpacing="2">HSE</text>
    </svg>
  ),
  mephi: (c) => (
    <svg viewBox="0 0 82 24" fill="none" className="w-20 h-7">
      <text x="0" y="20" fontFamily="Arial,sans-serif" fontSize="17" fontWeight="700" fill={c} letterSpacing="1">MEPhI</text>
    </svg>
  ),
  spbgu: (c) => (
    <svg viewBox="0 0 88 24" fill="none" className="w-24 h-7">
      <text x="0" y="20" fontFamily="Georgia,serif" fontSize="16" fontWeight="700" fill={c} letterSpacing="1">СПбГУ</text>
    </svg>
  ),
  polytech: (c) => (
    <svg viewBox="0 0 106 24" fill="none" className="w-28 h-7">
      <text x="0" y="20" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill={c} letterSpacing="1">POLYTECH</text>
    </svg>
  ),
  itmo: (c) => (
    <svg viewBox="0 0 72 24" fill="none" className="w-16 h-7">
      <text x="0" y="20" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="900" fill={c} letterSpacing="2">ITMO</text>
    </svg>
  ),
  urfu: (c) => (
    <svg viewBox="0 0 68 24" fill="none" className="w-16 h-7">
      <text x="0" y="20" fontFamily="Arial,sans-serif" fontSize="19" fontWeight="700" fill={c} letterSpacing="1">UrFU</text>
    </svg>
  ),
  kfu: (c) => (
    <svg viewBox="0 0 60 24" fill="none" className="w-14 h-7">
      <text x="0" y="20" fontFamily="Georgia,serif" fontSize="20" fontWeight="700" fill={c} letterSpacing="2">КФУ</text>
    </svg>
  ),
  kfuen: (c) => (
    <svg viewBox="0 0 54 24" fill="none" className="w-14 h-7">
      <text x="0" y="20" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="700" fill={c} letterSpacing="1">KFU</text>
    </svg>
  ),
  kspeu: (c) => (
    <svg viewBox="0 0 96 24" fill="none" className="w-24 h-7">
      <text x="0" y="20" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="700" fill={c} letterSpacing="1">KSPEU</text>
    </svg>
  ),
  unn: (c) => (
    <svg viewBox="0 0 58 24" fill="none" className="w-14 h-7">
      <text x="0" y="20" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="700" fill={c} letterSpacing="2">UNN</text>
    </svg>
  ),
  hsenn: (c) => (
    <svg viewBox="0 0 96 24" fill="none" className="w-24 h-7">
      <text x="0" y="20" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="700" fill={c} letterSpacing="1">HSE NN</text>
    </svg>
  ),
}

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
  accent: string
}

const UNIVERSITIES: University[] = [
  { id: 'mgu',      name: 'Lomonosov Moskova Devlet Üniversitesi',           shortName: 'МГУ',     country: 'Rusya', flag: '🇷🇺', ranking: 75,  founded: 1755, students: '47,000', description: "Rusya'nın en köklü ve prestijli devlet üniversitesi.",                    accent: '#C8102E' },
  { id: 'bauman',   name: 'Bauman Moskova Devlet Teknik Üniversitesi',       shortName: 'Bauman',  country: 'Rusya', flag: '🇷🇺', ranking: 342, founded: 1830, students: '21,000', description: "Teknik bilimler ve mühendislikte Rusya'nın zirvesi.",                      accent: '#003087' },
  { id: 'rudn',     name: 'RUDN Üniversitesi',                               shortName: 'RUDN',    country: 'Rusya', flag: '🇷🇺', ranking: 326, founded: 1960, students: '36,000', description: '160+ ülkeden öğrenciyle tam uluslararası bir kampüs.',                    accent: '#CE1126' },
  { id: 'hse',      name: 'HSE Üniversitesi – Moskova',                      shortName: 'HSE',     country: 'Rusya', flag: '🇷🇺', ranking: 344, founded: 1992, students: '45,000', description: "Ekonomi ve sosyal bilimlerde Rusya'nın lider üniversitesi.",              accent: '#FF6900' },
  { id: 'mephi',    name: 'Moskova Ulusal Araştırma Nükleer Üniversitesi',   shortName: 'MEPhI',   country: 'Rusya', flag: '🇷🇺', ranking: 391, founded: 1942, students: '7,000',  description: 'Nükleer enerji ve fizik alanında küresel otorite.',                      accent: '#1A5C2A' },
  { id: 'spbgu',    name: 'St. Petersburg Devlet Üniversitesi',              shortName: 'СПбГУ',   country: 'Rusya', flag: '🇷🇺', ranking: 242, founded: 1724, students: '30,000', description: "Rusya'nın en eski üniversitesi, 1724'te Peter the Great kurdu.",          accent: '#8B0000' },
  { id: 'polytech', name: 'St.Petersburg Devlet Politeknik Üniversitesi',    shortName: 'SPbPU',   country: 'Rusya', flag: '🇷🇺', ranking: 401, founded: 1899, students: '32,000', description: "Mühendislik ve teknolojide Rusya'nın öncü kurumu.",                      accent: '#003D7C' },
  { id: 'itmo',     name: 'ITMO Üniversitesi',                               shortName: 'ITMO',    country: 'Rusya', flag: '🇷🇺', ranking: 360, founded: 1900, students: '15,000', description: 'Bilgisayar bilimi ve yapay zekada dünya genelinde tanınan merkez.',      accent: '#0077B6' },
  { id: 'urfu',     name: 'Ural Federal Üniversitesi',                       shortName: 'UrFU',    country: 'Rusya', flag: '🇷🇺', ranking: 551, founded: 1920, students: '35,000', description: "Ural bölgesinin en büyük araştırma ve eğitim merkezi.",                  accent: '#002F6C' },
  { id: 'kfu',      name: 'Kazan Federal Üniversitesi (Rusça)',              shortName: 'КФУ',     country: 'Rusya', flag: '🇷🇺', ranking: 392, founded: 1804, students: '50,000', description: "Türki halkların kültürel ortamında güçlü akademik program.",              accent: '#006B3C' },
  { id: 'kfuen',    name: 'Kazan Federal Üniversitesi (İngilizce)',          shortName: 'KFU EN',  country: 'Rusya', flag: '🇷🇺', ranking: 392, founded: 1804, students: '50,000', description: "İngilizce program seçeneğiyle uluslararası öğrencilere tam açık.",        accent: '#007B7F' },
  { id: 'kspeu',    name: 'Kazan Devlet Enerji Üniversitesi',                shortName: 'KSPEU',   country: 'Rusya', flag: '🇷🇺', ranking: 700, founded: 1968, students: '8,000',  description: 'Enerji, elektrik ve çevre mühendisliğinde uzmanlaşmış kurum.',          accent: '#E57200' },
  { id: 'unn',      name: 'Nijniy Novgorod Lobaçevskiy Devlet Üniversitesi', shortName: 'UNN',    country: 'Rusya', flag: '🇷🇺', ranking: 501, founded: 1916, students: '35,000', description: "Matematikçi Lobaçevskiy'nin adını taşıyan köklü araştırma üniversitesi.", accent: '#A0001E' },
  { id: 'hsenn',    name: 'Nijniy Novgorod HSE Üniversitesi',                shortName: 'HSE NN',  country: 'Rusya', flag: '🇷🇺', ranking: 500, founded: 1997, students: '6,000',  description: 'HSE ağının Nijniy Novgorod kampüsü — bilgisayar ve ekonomi odaklı.',   accent: '#FF6900' },
]

const STATS = [
  { label: 'PARTNER ÜNİVERSİTE', value: '14' },
  { label: 'BAŞARILI ÖĞRENCİ',   value: '3,500+' },
  { label: 'HEDEF ŞEHİR',        value: '5' },
  { label: 'VERİLEN BURS',       value: '₺6M+' },
  { label: 'ONAY ORANI',         value: '%91' },
  { label: 'ORTALAMA SÜRE',      value: '38 GÜN' },
  { label: 'AKTİF BAŞVURU',      value: '312' },
]

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
        <div className="flex-shrink-0 flex items-center gap-2 px-5 border-r border-gray-100 bg-white">
          <span className="text-orange-500 text-sm">✳</span>
          <span className="text-[11px] font-semibold text-gray-400 tracking-[0.18em] uppercase whitespace-nowrap">
            Portal Yurtdışı
          </span>
        </div>
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
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none select-none"
        style={{ color: hovered ? uni.accent : '#c0c0c0' }}
      >
        {logos[uni.id]?.(hovered ? uni.accent : '#c0c0c0')}
      </div>

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

export default function UniversityGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef   = useRef<HTMLDivElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
  const cellRefs     = useRef<(HTMLDivElement | null)[]>([])

  const selectedUni = UNIVERSITIES.find(u => u.id === selectedId) ?? null

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

    const targetW = cellW * 2 + 1
    const targetH = cellH * 2 + 1

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
      <StatsTicker />

      <Container className="overflow-hidden">
        <div
          ref={containerRef}
          className="relative grid bg-gray-100 p-1 rounded-xl"
          style={{ gridTemplateColumns: 'repeat(8, 1fr)', gap: '4px' }}
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
                Rusya'nın önde gelen üniversitelerinde{' '}
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

          {UNIVERSITIES.map((uni, i) => (
            <UniCell
              key={uni.id}
              uni={uni}
              index={i}
              cellRefs={cellRefs}
              onExpand={handleExpand}
            />
          ))}

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

                <div className="mt-auto">
                  <p className="text-[3.5rem] font-extralight leading-none tabular-nums">
                    #{selectedUni.ranking}
                  </p>
                  <p className="text-[11px] opacity-50 mt-0.5 uppercase tracking-wider">Dünya Sıralaması</p>
                </div>

                <div className="mt-3">
                  <h3 className="text-base font-semibold leading-snug">{selectedUni.name}</h3>
                  <p className="text-[13px] opacity-65 mt-1 leading-relaxed">{selectedUni.description}</p>
                </div>

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
