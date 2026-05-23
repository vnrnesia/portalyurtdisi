'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const announcements = [
  'Registration ends on May 10, 2025',
  'Result for Semester 4 will be declared on May 8, 2025',
  'The university will remain closed on May 12, 2025',
  'New courses available for Fall 2025 enrollment',
  'Campus orientation week starts May 15, 2025',
  'Scholarship applications open until June 1, 2025',
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
    <div className="bg-white border-t border-gray-200">
      <div className="flex items-center h-9">
        {/* Sabit sol metin */}
        <div className="flex-shrink-0 px-6 text-[13px] font-bold text-gray-900 border-r border-gray-300 h-full flex items-center">
          Apply / Admitted? Let&apos;s make it official!
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
                <span className="text-[13px] text-gray-700 px-1">{item}</span>
                <span className="mx-3 text-gray-400 text-[10px] select-none">●</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
