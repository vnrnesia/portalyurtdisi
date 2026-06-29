'use client'

import { useState, useEffect, useRef } from 'react'
import TopBar from './TopBar'
import SecondaryNav from './SecondaryNav'
import AnnouncementTicker from './AnnouncementTicker'
import FullScreenMenu from './FullScreenMenu'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [fullMenuOpen, setFullMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const diff = y - lastY.current

      if (diff > 6 && y > 80) {
        setHidden(true)
      } else if (diff < -6) {
        setHidden(false)
      }

      lastY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className="w-full sticky top-0 z-50 shadow-sm"
        style={{
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
      >
        {/* En üst ince mavi çizgi */}
        <div className="h-[3px] bg-[#2563eb]" />

        {/* Üst koyu bar — logo + ana nav + sağ aksiyonlar */}
        <TopBar />

        {/* Alt beyaz bar — kategori navigasyonu (desktop) */}
        <div className="hidden lg:block">
          <SecondaryNav />
        </div>

        {/* Duyuru bandı — sabit sol metin + kayan ticker (desktop) */}
        <div className="hidden lg:block">
          <AnnouncementTicker />
        </div>

        {/* Mobil hamburger — üst barın sağına overlay olarak yerleştirilir */}
        <div className="lg:hidden absolute top-[3px] right-0 h-[68px] flex items-center pr-5 sm:pr-8">
          <button
            onClick={() => setFullMenuOpen((p) => !p)}
            aria-label={fullMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            className="text-white p-1"
          >
            {fullMenuOpen ? (
              <X size={22} strokeWidth={1.75} />
            ) : (
              <Menu size={22} strokeWidth={1.75} />
            )}
          </button>
        </div>
      </header>

      {/* Tam ekran mobil menü */}
      <FullScreenMenu
        isOpen={fullMenuOpen}
        onClose={() => setFullMenuOpen(false)}
      />
    </>
  )
}
