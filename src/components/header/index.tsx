'use client'

import { useState, useEffect, useRef } from 'react'
import NavBar from './NavBar'
import AnnouncementTicker from './AnnouncementTicker'
import MegaMenu from './MegaMenu'
import FullScreenMenu from './FullScreenMenu'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
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
        className="w-full shadow-sm sticky top-0 z-50 bg-white relative"
        style={{
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
      >
        <NavBar
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((p) => !p)}
          fullMenuOpen={fullMenuOpen}
          onHamburgerClick={() => setFullMenuOpen((p) => !p)}
        />
        <AnnouncementTicker />
        <MegaMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </header>
      <FullScreenMenu isOpen={fullMenuOpen} onClose={() => setFullMenuOpen(false)} />
    </>
  )
}
