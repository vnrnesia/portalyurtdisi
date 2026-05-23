'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import React from 'react'
import gsap from 'gsap'
import { Plus, X, Calendar, Users } from 'lucide-react'
import Container from '@/components/ui/Container'

function LogoImg({ src, alt, hovered }: { src: string; alt: string; hovered: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="h-16 w-auto object-contain max-w-[150px]"
      style={{
        filter: hovered ? 'none' : 'grayscale(1) opacity(0.4)',
        transition: 'filter 0.3s',
      }}
    />
  )
}

const logos: Record<string, (color: string, hovered?: boolean) => React.ReactNode> = {
  mgu: (_c, hovered) => (
    <LogoImg src="/universiteler/lomonosov_moscow_state_university_logo.jpg" alt="МГУ" hovered={!!hovered} />
  ),
  bauman: (_c, hovered) => (
    <LogoImg src="/universiteler/bmstu.png" alt="Bauman MSTU" hovered={!!hovered} />
  ),
  rudn: (_c, hovered) => (
    <LogoImg src="/universiteler/RUDN_logo.png" alt="RUDN" hovered={!!hovered} />
  ),
  hse: (_c, hovered) => (
    <LogoImg src="/universiteler/hse.png" alt="HSE" hovered={!!hovered} />
  ),
  mephi: (_c, hovered) => (
    <LogoImg src="/universiteler/MEPhI_Logo2014_en_.png" alt="MEPhI" hovered={!!hovered} />
  ),
  spbgu: (_c, hovered) => (
    <LogoImg src="/universiteler/SPbGU_Logo.png" alt="СПбГУ" hovered={!!hovered} />
  ),
  polytech: (_c, hovered) => (
    <LogoImg src="/universiteler/peter-the-great-st-petersburg-polytechnic-university.png" alt="SPbPU" hovered={!!hovered} />
  ),
  itmo: (_c, hovered) => (
    <LogoImg src="/universiteler/itmo.png" alt="ITMO" hovered={!!hovered} />
  ),
  urfu: (_c, hovered) => (
    <LogoImg src="/universiteler/uralfederal.jpg" alt="UrFU" hovered={!!hovered} />
  ),
  kfu: (_c, hovered) => (
    <LogoImg src="/universiteler/kfu.png" alt="КФУ" hovered={!!hovered} />
  ),
  kfuen: (_c, hovered) => (
    <LogoImg src="/universiteler/kfu.png" alt="KFU" hovered={!!hovered} />
  ),
  kspeu: (_c, hovered) => (
    <LogoImg src="/universiteler/kgeu" alt="KSPEU" hovered={!!hovered} />
  ),
  unn: (_c, hovered) => (
    <LogoImg src="/universiteler/lobachevsky.png" alt="UNN" hovered={!!hovered} />
  ),
  hsenn: (_c, hovered) => (
    <LogoImg src="/universiteler/hse.png" alt="HSE NN" hovered={!!hovered} />
  ),
}

interface University {
  id: string
  name: string
  shortName: string
  country: string
  flag: string
  ranking: string
  founded: number
  students: string
  description: string
  accent: string
  photo: string
}

const UNIVERSITIES: University[] = [
  { id: 'mgu',      name: 'Lomonosov Moskova Devlet Üniversitesi',           shortName: 'МГУ',     country: 'Rusya', flag: '🇷🇺', ranking: '126',     founded: 1755, students: '47,000', description: "Rusya'nın en köklü ve prestijli devlet üniversitesi.",                    accent: '#C8102E', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/%D0%9C%D0%93%D0%A3%2C_%D0%B2%D0%B8%D0%B4_%D1%81_%D0%B2%D0%BE%D0%B7%D0%B4%D1%83%D1%85%D0%B0.jpg/1280px-%D0%9C%D0%93%D0%A3%2C_%D0%B2%D0%B8%D0%B4_%D1%81_%D0%B2%D0%BE%D0%B7%D0%B4%D1%83%D1%85%D0%B0.jpg' },
  { id: 'bauman',   name: 'Bauman Moskova Devlet Teknik Üniversitesi',       shortName: 'Bauman',  country: 'Rusya', flag: '🇷🇺', ranking: '298',     founded: 1830, students: '19,000', description: "Teknik bilimler ve mühendislikte Rusya'nın zirvesi.",                      accent: '#003087', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Moscow_MSTU_Bauman_main_building_asv2021-08.jpg/1280px-Moscow_MSTU_Bauman_main_building_asv2021-08.jpg' },
  { id: 'rudn',     name: 'RUDN Üniversitesi',                               shortName: 'RUDN',    country: 'Rusya', flag: '🇷🇺', ranking: '242',     founded: 1960, students: '33,000', description: '160+ ülkeden öğrenciyle tam uluslararası bir kampüs.',                    accent: '#CE1126', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/%D0%A0%D0%A3%D0%94%D0%9D_2016.jpg/1280px-%D0%A0%D0%A3%D0%94%D0%9D_2016.jpg' },
  { id: 'hse',      name: 'HSE Üniversitesi – Moskova',                      shortName: 'HSE',     country: 'Rusya', flag: '🇷🇺', ranking: '206',     founded: 1992, students: '22,000', description: "Ekonomi ve sosyal bilimlerde Rusya'nın lider üniversitesi.",              accent: '#FF6900', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HSE_new_building_%282015-01-22%29_01.jpg/1280px-HSE_new_building_%282015-01-22%29_01.jpg' },
  { id: 'mephi',    name: 'Moskova Ulusal Araştırma Nükleer Üniversitesi',   shortName: 'MEPhI',   country: 'Rusya', flag: '🇷🇺', ranking: '591',     founded: 1942, students: '7,000',  description: 'Nükleer enerji ve fizik alanında küresel otorite.',                      accent: '#1A5C2A', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D1%8B%D0%B9_%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81_%D0%9C%D0%98%D0%A4%D0%98_%2821.03.2026%29.jpg/1280px-%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D1%8B%D0%B9_%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81_%D0%9C%D0%98%D0%A4%D0%98_%2821.03.2026%29.jpg' },
  { id: 'spbgu',    name: 'St. Petersburg Devlet Üniversitesi',              shortName: 'СПбГУ',   country: 'Rusya', flag: '🇷🇺', ranking: '265',     founded: 1724, students: '25,000', description: "Rusya'nın en eski üniversitesi, 1724'te Peter the Great kurdu.",          accent: '#8B0000', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Spb_Vasilievsky_Island_Twelve_Collegiums_asv2019-09.jpg/1280px-Spb_Vasilievsky_Island_Twelve_Collegiums_asv2019-09.jpg' },
  { id: 'polytech', name: 'St.Petersburg Devlet Politeknik Üniversitesi',    shortName: 'SPbPU',   country: 'Rusya', flag: '🇷🇺', ranking: '401-450', founded: 1899, students: '33,000', description: "Mühendislik ve teknolojide Rusya'nın öncü kurumu.",                      accent: '#003D7C', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B5%D1%85%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D0%B8%D0%BD%D1%81%D1%82%D0%B8%D1%82%D1%83%D1%82._%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%BE%D0%B5_%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B501.jpg/1280px-%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B5%D1%85%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D0%B8%D0%BD%D1%81%D1%82%D0%B8%D1%82%D1%83%D1%82._%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%BE%D0%B5_%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B501.jpg' },
  { id: 'itmo',     name: 'ITMO Üniversitesi',                               shortName: 'ITMO',    country: 'Rusya', flag: '🇷🇺', ranking: '360',     founded: 1900, students: '13,000', description: 'Bilgisayar bilimi ve yapay zekada dünya genelinde tanınan merkez.',      accent: '#0077B6', photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/ITMO_University%27s_main_building%2C_August_2016.jpg/1280px-ITMO_University%27s_main_building%2C_August_2016.jpg" },
  { id: 'urfu',     name: 'Ural Federal Üniversitesi',                       shortName: 'UrFU',    country: 'Rusya', flag: '🇷🇺', ranking: '401-450', founded: 1920, students: '50,000', description: "Ural bölgesinin en büyük araştırma ve eğitim merkezi.",                  accent: '#002F6C', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Ural_State_Technical_University_%28August_2022%29_-_1.jpg/1280px-Ural_State_Technical_University_%28August_2022%29_-_1.jpg' },
  { id: 'kfu',      name: 'Kazan Federal Üniversitesi (Rusça)',              shortName: 'КФУ',     country: 'Rusya', flag: '🇷🇺', ranking: '401-450', founded: 1804, students: '52,000', description: "Türki halkların kültürel ortamında güçlü akademik program.",              accent: '#006B3C', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Kazan_Federal_University_building_08-2016.jpg/1280px-Kazan_Federal_University_building_08-2016.jpg' },
  { id: 'kspeu',    name: 'Kazan Devlet Enerji Üniversitesi',                shortName: 'KSPEU',   country: 'Rusya', flag: '🇷🇺', ranking: '700+',    founded: 1968, students: '8,000',  description: 'Enerji, elektrik ve çevre mühendisliğinde uzmanlaşmış kurum.',          accent: '#E57200', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D0%B3%D0%BE%D1%81%D1%83%D0%B4%D0%B0%D1%80%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9_%D1%8D%D0%BD%D0%B5%D1%80%D0%B3%D0%B5%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82_26_%D0%B0%D0%BF%D1%80%D0%B5%D0%BB%D1%8F_2013_%D0%B3%D0%BE%D0%B4%D0%B0.jpg/1280px-%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D0%B3%D0%BE%D1%81%D1%83%D0%B4%D0%B0%D1%80%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9_%D1%8D%D0%BD%D0%B5%D1%80%D0%B3%D0%B5%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82_26_%D0%B0%D0%BF%D1%80%D0%B5%D0%BB%D1%8F_2013_%D0%B3%D0%BE%D0%B4%D0%B0.jpg' },
  { id: 'kfuen',    name: 'Kazan Federal Üniversitesi (İngilizce)',          shortName: 'KFU EN',  country: 'Rusya', flag: '🇷🇺', ranking: '401-450', founded: 1804, students: '52,000', description: "İngilizce program seçeneğiyle uluslararası öğrencilere tam açık.",        accent: '#007B7F', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Kazan_Federal_University_building_08-2016.jpg/1280px-Kazan_Federal_University_building_08-2016.jpg' },
  { id: 'unn',      name: 'Nijniy Novgorod Lobaçevskiy Devlet Üniversitesi', shortName: 'UNN',    country: 'Rusya', flag: '🇷🇺', ranking: '501-550', founded: 1916, students: '30,000', description: "Matematikçi Lobaçevskiy'nin adını taşıyan köklü araştırma üniversitesi.", accent: '#A0001E', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Lobachevsky_University._Faculty_of_Philology_03.jpg/1280px-Lobachevsky_University._Faculty_of_Philology_03.jpg' },
  { id: 'hsenn',    name: 'Nijniy Novgorod HSE Üniversitesi',                shortName: 'HSE NN',  country: 'Rusya', flag: '🇷🇺', ranking: '206',     founded: 1996, students: '2,700',  description: 'HSE ağının Nijniy Novgorod kampüsü — bilgisayar ve ekonomi odaklı.',   accent: '#FF6900', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HSE_new_building_%282015-01-22%29_01.jpg/1280px-HSE_new_building_%282015-01-22%29_01.jpg' },
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
  cellRefs: React.RefObject<(HTMLDivElement | null)[]>
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
        {logos[uni.id]?.(hovered ? uni.accent : '#c0c0c0', hovered)}
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
  const [userHovering, setUserHovering] = useState(false)
  const containerRef   = useRef<HTMLDivElement>(null)
  const overlayRef     = useRef<HTMLDivElement>(null)
  const contentRef     = useRef<HTMLDivElement>(null)
  const cellRefs       = useRef<(HTMLDivElement | null)[]>([])
  const autoRef        = useRef<ReturnType<typeof setInterval> | null>(null)
  const lastAutoIdx    = useRef<number>(-1)
  const selectedIdRef  = useRef<string | null>(null)

  const selectedUni = UNIVERSITIES.find(u => u.id === selectedId) ?? null

  // Preload all university photos on mount so they're cache-ready when cards open
  useEffect(() => {
    UNIVERSITIES.forEach(u => {
      const img = new Image()
      img.src = u.photo
    })
  }, [])

  // Keep ref in sync so callbacks don't close over stale state
  useEffect(() => { selectedIdRef.current = selectedId }, [selectedId])

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

  const runAutoExpand = useCallback(() => {
    const candidates = UNIVERSITIES.map((_, i) => i).filter(i => i !== lastAutoIdx.current)
    const idx = candidates[Math.floor(Math.random() * candidates.length)]
    lastAutoIdx.current = idx
    const uni = UNIVERSITIES[idx]

    if (selectedIdRef.current) {
      handleClose()
      setTimeout(() => handleExpand(uni, idx), 280)
    } else {
      handleExpand(uni, idx)
    }
  }, [handleClose, handleExpand])

  useEffect(() => {
    if (userHovering) {
      if (autoRef.current) clearInterval(autoRef.current)
      return
    }
    const initial = setTimeout(() => {
      runAutoExpand()
      autoRef.current = setInterval(runAutoExpand, 15000)
    }, 2000)

    return () => {
      clearTimeout(initial)
      if (autoRef.current) clearInterval(autoRef.current)
    }
  }, [userHovering, runAutoExpand])

  return (
    <section className="bg-white mt-16 py-16 lg:py-24">
      <StatsTicker />

      {/* Mobile: simple logo grid */}
      <Container className="lg:hidden mt-8 overflow-hidden">
        <div className="bg-gray-100 p-1 rounded-xl grid grid-cols-4 gap-1">
          {/* Info card */}
          <div className="col-span-4 bg-gray-50 p-5 rounded-xl">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase mb-2">Keşfet</p>
            <p className="text-[0.95rem] font-semibold text-gray-900 leading-snug">
              Rusya&apos;nın önde gelen üniversitelerinde{' '}
              <span className="text-orange-500">eğitim fırsatlarını</span> keşfet.
            </p>
          </div>
          {UNIVERSITIES.map(uni => (
            <div
              key={uni.id}
              className="relative bg-white rounded-lg overflow-hidden flex items-center justify-center"
              style={{ height: 90 }}
            >
              <div className="flex items-center justify-center p-2">
                {logos[uni.id]?.('#c0c0c0', false)}
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Desktop: full interactive grid */}
      <Container className="hidden lg:block overflow-hidden">
        <div
          ref={containerRef}
          className="relative grid bg-gray-100 p-1 rounded-xl"
          style={{ gridTemplateColumns: 'repeat(8, 1fr)', gap: '4px' }}
          onMouseEnter={() => setUserHovering(true)}
          onMouseLeave={() => setUserHovering(false)}
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
                className="w-full h-full flex flex-col p-6 text-white relative overflow-hidden"
                style={{
                  backgroundColor: selectedUni.accent,
                  backgroundImage: `url(${selectedUni.photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* dark gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.35) 100%)`,
                  }}
                />
                <div className="relative z-10 flex items-center justify-between">
                  <button
                    onClick={handleClose}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/35 transition-colors flex items-center justify-center flex-shrink-0"
                    aria-label="Kapat"
                  >
                    <X size={13} strokeWidth={2} />
                  </button>
                </div>

                <div className="mt-auto relative z-10">
                  <p className="text-[3.5rem] font-extralight leading-none tabular-nums">
                    #{selectedUni.ranking}
                  </p>
                  <p className="text-[11px] opacity-50 mt-0.5 uppercase tracking-wider">Dünya Sıralaması</p>
                </div>

                <div className="mt-3 relative z-10">
                  <h3 className="text-base font-semibold leading-snug">{selectedUni.name}</h3>
                  <p className="text-[13px] opacity-65 mt-1 leading-relaxed">{selectedUni.description}</p>
                </div>

                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/20 text-[11px] relative z-10">
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
