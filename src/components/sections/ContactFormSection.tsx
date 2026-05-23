'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Loader2, CheckCircle } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

// 4 photos, alternating parallax: even cols go down, odd cols go up
const PHOTOS = ['/cta/first.png', '/cta/second', '/cta/third.png', '/cta/fourth.png']

export default function ContactFormSection() {
  const [form, setForm]     = useState({ ad: '', email: '', telefon: '' })
  const [status, setStatus] = useState<Status>('idle')

  const sectionRef = useRef<HTMLDivElement>(null)
  const colRefs    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      }
      colRefs.current.forEach((col, i) => {
        // even index (0,2) → down, odd index (1,3) → up
        gsap.to(col, { y: i % 2 === 0 ? 60 : -60, ease: 'none', scrollTrigger: trigger })
      })
    })
    return () => ctx.revert()
  }, [])

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }))

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/iletisim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ad: form.ad,
          email: form.email,
          telefon: form.telefon,
          mesaj: '',
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div
          ref={sectionRef}
          className="relative overflow-hidden rounded-2xl grid lg:grid-cols-2 lg:h-[520px]"
          style={{ backgroundColor: '#1c1c1c' }}
        >

          {/* ── Left: Form ── */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-10 lg:py-12">

            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/20 mb-4">
              <span className="text-[10px] font-semibold tracking-[0.32em] uppercase text-white/70">
                Bizimle İletişime Geç
              </span>
            </div>

            {status === 'success' ? (
              <div className="flex flex-col gap-3">
                <CheckCircle size={40} className="text-[#f04420]" strokeWidth={1.5} />
                <h2 className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-bold text-white leading-tight tracking-tight">
                  Mesajın Alındı!
                </h2>
                <p className="text-white/50 text-[14px] leading-relaxed">
                  Danışmanlarımız en kısa sürede{' '}
                  <strong className="text-white/80">{form.telefon || form.email}</strong>{' '}
                  üzerinden seninle iletişime geçecek.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ ad: '', email: '', telefon: '' }) }}
                  className="self-start px-5 py-1.5 border border-white/20 rounded-full text-[12px] text-white/60 hover:border-white/40 transition-colors"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-[clamp(1.6rem,3vw,2.5rem)] font-bold text-white leading-tight tracking-tight mb-2">
                  Rusya'da Eğitim<br />Yolculuğuna Başla
                </h2>
                <p className="text-white/45 text-[13px] leading-relaxed mb-5">
                  Formu doldur, uzman danışmanlarımız seninle en kısa sürede iletişime geçsin.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">

                  {/* Ad + E-posta */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold tracking-widest uppercase text-white/35 mb-1.5">
                        Ad Soyad <span className="text-[#f04420]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.ad}
                        onChange={set('ad')}
                        placeholder="Adın ve soyadın"
                        className="w-full px-3 py-2.5 rounded-xl border border-white/10 text-white text-[13px] placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors"
                        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold tracking-widest uppercase text-white/35 mb-1.5">
                        E-posta
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="ornek@email.com"
                        className="w-full px-3 py-2.5 rounded-xl border border-white/10 text-white text-[13px] placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors"
                        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                      />
                    </div>
                  </div>

                  {/* Telefon */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest uppercase text-white/35 mb-1.5">
                      Telefon <span className="text-[#f04420]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.telefon}
                      onChange={set('telefon')}
                      placeholder="+90 5XX XXX XX XX"
                      className="w-full px-3 py-2.5 rounded-xl border border-white/10 text-white text-[13px] placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors"
                      style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-[12px]">Bir hata oluştu, lütfen tekrar deneyin.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 py-3 mt-1 rounded-xl bg-[#f04420] hover:bg-[#d93a1a] disabled:opacity-60 transition-colors text-white text-[13px] font-semibold tracking-wide"
                  >
                    {status === 'loading' ? (
                      <><Loader2 size={16} className="animate-spin" /> Gönderiliyor…</>
                    ) : (
                      <>Mesaj Gönder <ArrowRight size={14} strokeWidth={2.5} /></>
                    )}
                  </button>

                </form>
              </>
            )}
          </div>

          {/* ── Right: Parallax photo grid (4 cols) ── */}
          <div className="relative hidden lg:block overflow-hidden">
            {/* Fade sol */}
            <div className="absolute inset-y-0 left-0 w-12 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #1c1c1c, transparent)' }} />
            {/* Fade üst */}
            <div className="absolute inset-x-0 top-0 h-20 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, #1c1c1c, transparent)' }} />
            {/* Fade alt */}
            <div className="absolute inset-x-0 bottom-0 h-20 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to top, #1c1c1c, transparent)' }} />

            <div className="flex gap-2 h-full px-2 py-2">
              {PHOTOS.map((src, i) => (
                <div
                  key={i}
                  ref={el => { colRefs.current[i] = el }}
                  className="flex-1 overflow-hidden rounded-xl"
                  style={{ marginTop: i % 2 === 0 ? '-30px' : '30px' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
