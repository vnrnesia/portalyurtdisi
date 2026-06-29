'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { X, Mail, Phone, MapPin } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Hizmetler', href: '#' },
  { label: 'Hakkımızda', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'İletişim', href: '#' },
]

const SOCIAL_LINKS = ['Twitter', 'Instagram', 'LinkedIn', 'YouTube']

interface FullScreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const rightColRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  // Timeline bir kez oluşturulur
  useEffect(() => {
    const overlay = overlayRef.current
    const closeBtn = closeBtnRef.current
    const links = linkRefs.current
    const rightCol = rightColRef.current

    if (!overlay || !closeBtn || !rightCol) return

    gsap.set(overlay, { visibility: 'hidden', scaleY: 0, transformOrigin: 'top' })
    gsap.set(links, { y: '110%' })
    gsap.set(rightCol, { opacity: 0, y: 30 })
    gsap.set(closeBtn, { opacity: 0 })

    const tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        gsap.set(overlay, { visibility: 'hidden' })
        document.body.classList.remove('overflow-hidden')
      },
    })

    // Stage 1: overlay açılır
    tl.set(overlay, { visibility: 'visible' }, 0)
    tl.to(overlay, { scaleY: 1, duration: 0.5, ease: 'power4.inOut' }, 0)

    // Stage 2: linkler maskeden çıkar
    tl.to(
      links,
      { y: '0%', duration: 0.7, ease: 'power4.out', stagger: 0.08 },
      0.3
    )

    // Stage 3: sağ kolon + close butonu
    tl.to(rightCol, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.45)
    tl.to(closeBtn, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.45)

    tlRef.current = tl

    return () => {
      tl.kill()
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  // isOpen değişince play / reverse
  useEffect(() => {
    const tl = tlRef.current
    if (!tl) return

    if (isOpen) {
      tl.play()
      document.body.classList.add('overflow-hidden')
    } else {
      tl.reverse()
    }
  }, [isOpen])

  const handleMouseEnter = (el: HTMLAnchorElement | null) => {
    if (!el) return
    gsap.to(el, { x: 12, duration: 0.3, ease: 'power2.out' })
  }

  const handleMouseLeave = (el: HTMLAnchorElement | null) => {
    if (!el) return
    gsap.to(el, { x: 0, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-neutral-950 flex flex-col overflow-y-auto lg:grid lg:grid-cols-[65fr_35fr] lg:overflow-hidden"
      style={{ visibility: 'hidden' }}
    >
      {/* Close butonu */}
      <button
        ref={closeBtnRef}
        onClick={onClose}
        aria-label="Menüyü kapat"
        className="absolute top-6 right-6 lg:top-8 lg:right-8 z-10 text-white/60 hover:text-white transition-colors p-2"
      >
        <X size={28} strokeWidth={1.5} />
      </button>

      {/* Sol — Ana navigasyon */}
      <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-24 xl:px-32 pt-24 pb-10 lg:py-0 lg:flex-1">
        <nav>
          {NAV_LINKS.map((link, i) => (
            <div key={link.label} className="overflow-hidden py-1">
              <a
                ref={(el) => { linkRefs.current[i] = el }}
                href={link.href}
                onClick={onClose}
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                className="block text-white text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-none hover:text-orange-500 transition-colors duration-200"
              >
                {link.label}
              </a>
            </div>
          ))}
        </nav>
      </div>

      {/* Sağ — İletişim & Sosyal */}
      <div
        ref={rightColRef}
        className="flex flex-col justify-end pb-12 lg:pb-16 px-6 sm:px-10 lg:px-12 border-t lg:border-t-0 lg:border-l border-white/10"
      >
        {/* İletişim bilgileri */}
        <div className="mb-10">
          <p className="text-[11px] font-semibold tracking-widest text-white/30 uppercase mb-5">
            İletişim
          </p>
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="mailto:info@portalyurtdisi.com"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Mail size={15} strokeWidth={1.5} />
                info@portalyurtdisi.com
              </a>
            </li>
            <li>
              <a
                href="tel:+902120000000"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Phone size={15} strokeWidth={1.5} />
                +90 212 000 00 00
              </a>
            </li>
            <li>
              <span className="flex items-center gap-3 text-white/70 text-sm">
                <MapPin size={15} strokeWidth={1.5} />
                İstanbul, Türkiye
              </span>
            </li>
          </ul>
        </div>

        {/* Sosyal medya */}
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-white/30 uppercase mb-5">
            Sosyal Medya
          </p>
          <ul className="flex flex-col gap-3">
            {SOCIAL_LINKS.map((s) => (
              <li key={s}>
                <a
                  href="#"
                  className="text-white/70 hover:text-orange-400 transition-colors text-sm font-medium"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Alt copyright */}
        <p className="mt-12 text-white/20 text-xs">
          © {new Date().getFullYear()} Portal Yurtdışı
        </p>
      </div>
    </div>
  )
}
