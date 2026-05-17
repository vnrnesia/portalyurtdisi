'use client'

import { ChevronDown, Search, Menu, X } from 'lucide-react'
import Image from 'next/image'

const navLinks = ['Events', 'Research', 'Faculty']

interface NavBarProps {
  menuOpen: boolean
  onMenuToggle: () => void
  fullMenuOpen: boolean
  onHamburgerClick: () => void
}

export default function NavBar({
  menuOpen,
  onMenuToggle,
  fullMenuOpen,
  onHamburgerClick,
}: NavBarProps) {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white">
      {/* Logo */}
      <a href="/">
        <Image
          src="/logo.png"
          alt="Portal Yurtdışı"
          width={180}
          height={48}
          priority
          className="object-contain"
        />
      </a>

      {/* Sağ navigasyon */}
      <div className="flex items-center gap-8">
        {/* All Pages dropdown trigger */}
        <button
          onClick={onMenuToggle}
          className="flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-orange-500 transition-colors"
        >
          All Pages
          <ChevronDown
            size={15}
            className={`transition-transform duration-300 ${menuOpen ? 'rotate-180 text-orange-500' : ''}`}
          />
        </button>

        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-sm font-medium text-gray-800 hover:text-orange-500 transition-colors"
          >
            {link}
          </a>
        ))}

        {/* Search */}
        <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <Search size={15} strokeWidth={2} />
          <span>Search</span>
        </button>

        {/* Hamburger / Close */}
        <button
          onClick={onHamburgerClick}
          aria-label={fullMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          {fullMenuOpen ? (
            <X size={20} strokeWidth={1.75} />
          ) : (
            <Menu size={20} strokeWidth={1.75} />
          )}
        </button>
      </div>
    </nav>
  )
}
