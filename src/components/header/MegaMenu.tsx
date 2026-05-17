'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight, GraduationCap, Globe, Award, FileText, BookOpen } from 'lucide-react'

const mainLinks = [
  {
    icon: Globe,
    title: 'Ülkeler',
    desc: 'Eğitim almak istediğiniz ülkeyi keşfedin',
  },
  {
    icon: GraduationCap,
    title: 'Üniversiteler',
    desc: 'Dünyaca ünlü kampüsleri inceleyin',
  },
  {
    icon: Award,
    title: 'Burslar',
    desc: 'Hibe ve burs fırsatlarını görüntüleyin',
  },
  {
    icon: FileText,
    title: 'Vize Rehberi',
    desc: 'Adım adım başvuru süreçleri',
  },
  {
    icon: BookOpen,
    title: 'Dil Okulları',
    desc: 'IELTS, TOEFL ve hazırlık programları',
  },
]

const featuredCards = [
  {
    tag: 'Rehber',
    title: 'ABD\'de Lisans Eğitimi — Kapsamlı Başvuru Rehberi',
    color: 'bg-orange-50',
    accent: 'text-orange-500',
  },
  {
    tag: 'Burslar',
    title: '2025 Yurt Dışı Burs Başvuruları ve Son Tarihler',
    color: 'bg-gray-50',
    accent: 'text-gray-500',
  },
]

interface MegaMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLElement[]>([])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !itemsRef.current.includes(el)) itemsRef.current.push(el)
  }

  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return

    if (isOpen) {
      itemsRef.current = []
      gsap.set(menu, { display: 'block' })
      gsap.fromTo(
        menu,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }
      )
    } else {
      gsap.to(menu, {
        y: -10,
        opacity: 0,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => gsap.set(menu, { display: 'none' }),
      })
    }
  }, [isOpen])

  // items stagger — ayrı effect olarak tetiklenir
  useEffect(() => {
    if (!isOpen) return
    const timeout = setTimeout(() => {
      if (itemsRef.current.length) {
        gsap.fromTo(
          itemsRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out', stagger: 0.05 }
        )
      }
    }, 60)
    return () => clearTimeout(timeout)
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}

      {/* Menü paneli */}
      <div
        ref={menuRef}
        className="absolute left-0 right-0 top-full z-50 bg-white border-t-2 border-orange-500 shadow-xl"
        style={{ display: 'none' }}
      >
        <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-[1fr_1.2fr_1fr] gap-10">

          {/* Sol — Öne Çıkanlar */}
          <div>
            <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-5">
              Öne Çıkanlar
            </p>
            <div className="flex flex-col gap-4">
              {featuredCards.map((card, i) => (
                <a
                  key={i}
                  href="#"
                  ref={addToRefs}
                  className={`group block rounded-xl p-5 ${card.color} hover:shadow-md transition-shadow`}
                >
                  <span className={`text-[11px] font-semibold uppercase tracking-wider ${card.accent}`}>
                    {card.tag}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-gray-800 leading-snug group-hover:text-orange-500 transition-colors">
                    {card.title}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-gray-400 group-hover:text-orange-500 transition-colors">
                    Devamını oku <ArrowRight size={12} />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Orta — Sayfalar */}
          <div>
            <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-5">
              Sayfalar
            </p>
            <ul className="flex flex-col gap-1">
              {mainLinks.map((link, i) => {
                const Icon = link.icon
                return (
                  <li key={i}>
                    <a
                      href="#"
                      ref={addToRefs}
                      className="group flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-orange-50 transition-colors"
                    >
                      <span className="mt-0.5 flex-shrink-0 text-orange-400 group-hover:text-orange-500 transition-colors">
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">
                          {link.title}
                        </span>
                        <span className="block text-xs text-gray-500 mt-0.5">{link.desc}</span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Sağ — CTA */}
          <div ref={addToRefs} className="bg-gray-900 rounded-2xl p-7 flex flex-col justify-between">
            {/* Dekoratif SVG */}
            <svg viewBox="0 0 80 80" className="w-14 h-14 text-orange-400" fill="none">
              <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="40" cy="40" r="22" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="40" cy="40" r="8" fill="currentColor" opacity="0.4" />
              <line x1="4" y1="40" x2="76" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              <line x1="40" y1="4" x2="40" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            </svg>

            <div>
              <h3 className="text-white font-bold text-lg leading-snug mt-6">
                Yurt Dışı Eğitimde Doğru Adımı Atın
              </h3>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                Uzman danışmanlarımızla ücretsiz görüşün, size özel yol haritanızı çıkartalım.
              </p>
            </div>

            <a
              href="#"
              className="mt-6 flex items-center justify-between bg-orange-500 hover:bg-orange-600 transition-colors text-white text-sm font-semibold rounded-lg px-5 py-3"
            >
              Danışmanlık Al
              <ArrowRight size={16} />
            </a>
          </div>

        </div>
      </div>
    </>
  )
}
