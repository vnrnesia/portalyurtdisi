'use client'

import { useState } from 'react'
import NavBar from './NavBar'
import AnnouncementTicker from './AnnouncementTicker'
import MegaMenu from './MegaMenu'
import FullScreenMenu from './FullScreenMenu'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [fullMenuOpen, setFullMenuOpen] = useState(false)

  return (
    <>
      <header className="w-full shadow-sm sticky top-0 z-50 bg-white relative">
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
