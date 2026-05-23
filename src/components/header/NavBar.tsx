'use client'

import { ChevronDown, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const navLinks = [
  { label: 'Şehirler', href: '/sehirler' },
  { label: 'Üniversiteler', href: '/#universiteler' },
  { label: 'Blog', href: '/blog' },
  { label: 'Hakkımızda', href: '/#hakkimizda' },
]

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
      <div className="flex items-center gap-4 lg:gap-8">
        {/* All Pages dropdown trigger — desktop only */}
        <button
          onClick={onMenuToggle}
          className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-orange-500 transition-colors"
        >
          All Pages
          <ChevronDown
            size={15}
            className={`transition-transform duration-300 ${menuOpen ? 'rotate-180 text-orange-500' : ''}`}
          />
        </button>

        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hidden lg:block text-sm font-medium text-gray-800 hover:text-orange-500 transition-colors"
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/iletisim"
          className="hidden sm:inline-flex items-center px-4 py-2 lg:px-5 bg-[#f04420] hover:bg-[#d93a1a] transition-colors text-white text-sm font-semibold rounded-full"
        >
          İletişim
        </Link>

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
