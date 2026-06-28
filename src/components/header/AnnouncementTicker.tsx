'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const announcements = [
  '📢 Ücretsiz Üniversite Uygunluk Analizi',
  '🇷🇺 Rusya 2026 Başvuruları Açıldı',
  '🇪🇺 Schengen Multi Vize Başvuruları Devam Ediyor',
  '🇪🇸 İspanya Dil Okullarında Erken Kayıt İndirimi',
  '🤝 Portal Partner Network Başvuruları Başladı',
]

export default function AnnouncementTicker() {
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ticker = tickerRef.current
    if (!ticker) return

    // İçerik iki kez tekrar ettiği için yarısı tek döngünün genişliği
    const singleWidth = ticker.scrollWidth / 2

    const tween = gsap.fromTo(
      ticker,
      { x: 0 },
      {
        x: -singleWidth,
        duration: 40,
        ease: 'none',
        repeat: -1,
      }
    )

    return () => {
      tween.kill()
    }
  }, [])

  // Sorunsuz döngü için içeriği iki kez tekrar et
  const items = [...announcements, ...announcements]

  return (
    <div className="bg-[#f04420]">
      <div className="flex items-center h-9">
        {/* Sabit sol metin */}
        <div className="flex-shrink-0 px-6 text-[13px] font-extrabold text-black border-r border-black/20 h-full flex items-center">
          Başvurular Açıldı | 2026 Kontenjanlarını İnceleyin
        </div>

        {/* Ticker alanı — kenarlar blur ile maskeli */}
        <div
          className="flex-1 overflow-hidden relative"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 6%, black 88%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 6%, black 88%, transparent 100%)',
          }}
        >
          <div
            ref={tickerRef}
            className="flex items-center whitespace-nowrap will-change-transform"
          >
            {items.map((item, i) => (
              <span key={i} className="inline-flex items-center">
                <span className="text-[13px] font-semibold text-black px-1">{item}</span>
                <span className="mx-3 text-black/40 text-[10px] select-none">●</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
