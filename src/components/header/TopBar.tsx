'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

const aboutLinks = [
  { label: 'Şirket', href: '/hakkimizda/sirket' },
  { label: 'Ekibimiz', href: '/hakkimizda/ekibimiz' },
  { label: 'Popüler Sorular', href: '/hakkimizda/sss' },
]

const plainLinks = [
  { label: 'Hizmetler', href: '/hizmetler' },
  { label: 'İletişim', href: '/iletisim' },
]

const languages = [
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'tm', label: 'Türkmençe', flag: '🇹🇲' },
]

export default function TopBar() {
  return (
    <div className="bg-[#1c1c1e]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-34 h-[68px] flex items-center justify-between gap-6">

        {/* Sol grup: logo + nav */}
        <div className="flex items-center gap-9">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Portal Yurtdışı"
              width={150}
              height={36}
              priority
              className="object-contain brightness-0 invert"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-5">
            {/* Hakkımızda — dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-[5px] text-[14px] font-medium text-white/85 hover:text-white transition-colors whitespace-nowrap">
                Hakkımızda
                <ChevronDown
                  size={14}
                  strokeWidth={2.25}
                  className="text-white/55 group-hover:rotate-180 transition-transform duration-200"
                />
              </button>

              <div
                className="absolute top-full left-0 pt-3 min-w-[200px]
                           opacity-0 invisible translate-y-1
                           group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                           transition-all duration-200 ease-out"
              >
                <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] border border-gray-100 py-2">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-5 py-2.5 text-[14px] text-gray-700 hover:text-[#f04420] hover:bg-gray-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {plainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14px] font-medium text-white/85 hover:text-white transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sağ aksiyonlar */}
        <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
          {/* Dil seçici */}
          <div className="relative group">
            <button className="flex items-center gap-[5px] text-[14px] text-white/85 hover:text-white transition-colors">
              <span className="text-[16px] leading-none">🇹🇷</span>
              <ChevronDown
                size={13}
                strokeWidth={2.25}
                className="text-white/55 group-hover:rotate-180 transition-transform duration-200"
              />
            </button>

            <div
              className="absolute top-full right-0 pt-3 min-w-[170px]
                         opacity-0 invisible translate-y-1
                         group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                         transition-all duration-200 ease-out"
            >
              <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] border border-gray-100 py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="flex w-full items-center gap-2.5 px-5 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[#f04420] transition-colors"
                  >
                    <span className="text-[16px] leading-none">{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/basvuru"
            className="bg-[#f04420] hover:bg-[#d93a1a] text-white text-[14px] font-bold px-5 py-[9px] rounded-[8px] transition-colors whitespace-nowrap leading-none"
          >
            Başvuru Yap
          </Link>
        </div>

      </div>
    </div>
  )
}
