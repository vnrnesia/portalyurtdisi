'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import React from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { Plus, X, Calendar, Users } from 'lucide-react'
import { UNIVERSITIES, type University } from '@/lib/portal-data'

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
    <div className="max-w-[1320px] mx-auto px-4 lg:px-34">
      <div className="border-y border-gray-100 flex h-[42px]">
        <div className="flex-shrink-0 flex items-center gap-2 px-5 border-r border-gray-100 bg-white">
          <span className="hidden lg:inline text-orange-500 text-sm">✳</span>
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap text-orange-500 lg:text-gray-400">
            SF Portal Yurtdışı
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
    </div>
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
  const [scrollTriggered, setScrollTriggered] = useState(false)
  const kfuTriggerRef  = useRef<HTMLDivElement>(null)
  const containerRef   = useRef<HTMLDivElement>(null)
  const overlayRef     = useRef<HTMLDivElement>(null)
  const contentRef     = useRef<HTMLDivElement>(null)
  const cellRefs       = useRef<(HTMLDivElement | null)[]>([])
  const autoRef        = useRef<ReturnType<typeof setInterval> | null>(null)
  const lastAutoIdx    = useRef<number>(-1)
  const selectedIdRef  = useRef<string | null>(null)

  const selectedUni = UNIVERSITIES.find(u => u.id === selectedId) ?? null

  // Mobile-specific refs & state
  const [mobileSelectedId, setMobileSelectedId] = useState<string | null>(null)
  const mobileContainerRef = useRef<HTMLDivElement>(null)
  const mobileOverlayRef   = useRef<HTMLDivElement>(null)
  const mobileContentRef   = useRef<HTMLDivElement>(null)
  const mobileCellRefs     = useRef<(HTMLDivElement | null)[]>([])

  const mobileSelectedUni = UNIVERSITIES.find(u => u.id === mobileSelectedId) ?? null

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

    const GAP = 4
    const targetW = cellW * 2 + GAP
    const targetH = cellH * 2 + GAP

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

  const handleMobileExpand = useCallback((uni: University, idx: number) => {
    const container = mobileContainerRef.current
    const overlay   = mobileOverlayRef.current
    const cell      = mobileCellRefs.current[idx]
    if (!container || !overlay || !cell) return

    const cRect = container.getBoundingClientRect()
    const eRect = cell.getBoundingClientRect()

    const relX  = eRect.left - cRect.left
    const relY  = eRect.top  - cRect.top
    const cellW = eRect.width
    const cellH = eRect.height

    const GAP = 4
    const targetW = cellW * 2 + GAP
    const targetH = cellH * 2 + GAP

    const clampX = Math.min(Math.max(relX, 0), cRect.width  - targetW)
    const clampY = Math.min(Math.max(relY, 0), cRect.height - targetH)

    setMobileSelectedId(uni.id)

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

    if (mobileContentRef.current) {
      gsap.fromTo(
        mobileContentRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.3, delay: 0.28, ease: 'power2.out' },
      )
    }
  }, [])

  const handleMobileClose = useCallback(() => {
    const overlay = mobileOverlayRef.current
    if (!overlay) return
    gsap.to(overlay, {
      scale: 0.94,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setMobileSelectedId(null)
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
    if (userHovering || scrollTriggered) {
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
  }, [userHovering, scrollTriggered, runAutoExpand])

  // Scroll trigger: KFU açılsın
  useEffect(() => {
    const trigger = kfuTriggerRef.current
    if (!trigger) return

    const kfuIdx = UNIVERSITIES.findIndex(u => u.id === 'kfu')
    const kfu = UNIVERSITIES[kfuIdx]

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setScrollTriggered(true)
          observer.disconnect()
          setTimeout(() => {
            if (window.innerWidth >= 1024) {
              handleExpand(kfu, kfuIdx)
            } else {
              handleMobileExpand(kfu, kfuIdx)
            }
          }, 300)
        }
      },
      { threshold: 0.5, rootMargin: '0px 0px -15% 0px' },
    )

    observer.observe(trigger)
    return () => observer.disconnect()
  }, [handleExpand, handleMobileExpand])

  return (
    <section className="bg-white pt-4 pb-16 lg:pt-6 lg:pb-24">
      <StatsTicker />
      <div ref={kfuTriggerRef} />

      {/* Mobile: interactive logo grid */}
      <div className="max-w-[1320px] mx-auto px-4 lg:px-34 lg:hidden mt-8">
        <div className="bg-gray-100 p-1 rounded-xl overflow-hidden">
          {/* Info card */}
          <div className="bg-gray-50 p-5 rounded-xl mb-1">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase mb-2">Keşfet</p>
            <p className="text-[0.95rem] font-semibold text-gray-900 leading-snug">
              Rusya&apos;nın önde gelen üniversitelerinde{' '}
              <span className="text-orange-500">eğitim fırsatlarını</span> keşfet.
            </p>
          </div>

          {/* Cells + overlay container */}
          <div
            ref={mobileContainerRef}
            className="relative grid grid-cols-2 gap-1"
          >
            {UNIVERSITIES.map((uni, i) => (
              <div
                key={uni.id}
                ref={el => { mobileCellRefs.current[i] = el }}
                className="relative bg-white rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
                style={{ height: 120 }}
                onClick={() => handleMobileExpand(uni, i)}
              >
                <div className="flex items-center justify-center p-2">
                  {logos[uni.id]?.(uni.accent, true)}
                </div>
              </div>
            ))}

            {/* Mobile overlay */}
            <div
              ref={mobileOverlayRef}
              className="absolute z-20 overflow-hidden shadow-2xl"
              style={{ display: 'none' }}
            >
              {mobileSelectedUni && (
                <div
                  ref={mobileContentRef}
                  className="w-full h-full flex flex-col p-4 text-white relative overflow-hidden"
                  style={{
                    backgroundColor: mobileSelectedUni.accent,
                    backgroundImage: `url(${mobileSelectedUni.photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.35) 100%)' }} />
                  <div className="relative z-10 flex items-center justify-between">
                    <button
                      onClick={handleMobileClose}
                      className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/35 transition-colors flex items-center justify-center"
                      aria-label="Kapat"
                    >
                      <X size={13} strokeWidth={2} />
                    </button>
                  </div>
                  <div className="mt-auto relative z-10">
                    <p className="text-[2.2rem] font-extralight leading-none tabular-nums">
                      #{mobileSelectedUni.ranking}
                    </p>
                    <p className="text-[10px] opacity-50 mt-0.5 uppercase tracking-wider">Dünya Sıralaması</p>
                  </div>
                  <div className="mt-2 relative z-10">
                    <h3 className="text-[13px] font-semibold leading-snug">{mobileSelectedUni.name}</h3>
                    <p className="text-[11px] opacity-65 mt-1 leading-relaxed">{mobileSelectedUni.description}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-3 pt-2 border-t border-white/20 text-[11px] relative z-10">
                    <span className="flex items-center gap-1 opacity-60">
                      <Calendar size={10} /> {mobileSelectedUni.founded}
                    </span>
                    <span className="flex items-center gap-1 opacity-60">
                      <Users size={10} /> {mobileSelectedUni.students}
                    </span>
                    <Link href={mobileSelectedUni.href} className="ml-auto px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors font-medium">
                      İncele →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {mobileSelectedId && (
              <div className="absolute inset-0 z-10" onClick={handleMobileClose} />
            )}
          </div>
        </div>
      </div>

      {/* Desktop: full interactive grid */}
      <div className="max-w-[1320px] mx-auto px-4 lg:px-34 hidden lg:block overflow-hidden">
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
                className="w-full h-full flex flex-col p-5 text-white relative overflow-hidden"
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
                  <p className="text-[2.4rem] font-extralight leading-none tabular-nums whitespace-nowrap">
                    #{selectedUni.ranking}
                  </p>
                  <p className="text-[10px] opacity-50 mt-0.5 uppercase tracking-wider">Dünya Sıralaması</p>
                </div>

                <div className="mt-2.5 relative z-10">
                  <h3 className="text-[14px] font-semibold leading-snug">{selectedUni.name}</h3>
                  <p className="text-[12px] opacity-65 mt-1 leading-snug line-clamp-2">{selectedUni.description}</p>
                </div>

                <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-white/20 text-[11px] relative z-10">
                  <span className="flex items-center gap-1 opacity-60">
                    <Calendar size={10} /> {selectedUni.founded}
                  </span>
                  <span className="flex items-center gap-1 opacity-60">
                    <Users size={10} /> {selectedUni.students}
                  </span>
                  <Link
                    href={selectedUni.href}
                    className="ml-auto px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors font-medium"
                  >
                    İncele →
                  </Link>
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
      </div>
    </section>
  )
}
