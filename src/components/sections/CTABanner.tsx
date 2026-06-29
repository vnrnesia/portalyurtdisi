'use client'

import { useRef, useState, useEffect } from 'react'
import { ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react'

export default function CTABanner() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().then(() => setPlaying(true)).catch(() => {})
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) }
    else { v.play(); setPlaying(true) }
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    const next = !muted
    v.muted = next
    setMuted(next)
    if (!next && v.paused) { v.play(); setPlaying(true) }
  }

  return (
    <section className="relative bg-white overflow-hidden py-10 lg:py-16 px-4 sm:px-8 min-h-screen flex items-center">

      {/* Arka plan ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[#f0c9a0]/40 blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-10">

        {/* ── Başlık ── */}
        <h2 className="text-[#f04420] text-center font-light tracking-tight leading-[1.1] text-[clamp(1.6rem,3.5vw,2.8rem)]">
          Hayallerindeki üniversiteye,<br />seninle ulaşıyoruz.
        </h2>

        {/* ── Ana kart ── */}
        <div className="w-full max-w-3xl rounded-2xl overflow-hidden border border-white/[0.06] bg-[#161616] flex flex-col lg:flex-row shadow-2xl">

          {/* Sol — Video */}
          <div
            className="relative lg:w-[58%] aspect-video bg-black cursor-pointer group"
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src="/recap.mp4"
              loop
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Ses aç/kapat — sağ alt */}
            <button
              className="absolute bottom-3 right-3 z-20 w-7 h-7 rounded bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/70 transition-colors"
              onClick={(e) => { e.stopPropagation(); toggleMute() }}
              aria-label={muted ? 'Sesi aç' : 'Sesi kapat'}
            >
              {muted
                ? <VolumeX className="w-3.5 h-3.5 text-white" />
                : <Volume2 className="w-3.5 h-3.5 text-white" />
              }
            </button>

            {/* Play overlay */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
              <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
                {playing
                  ? <Pause className="w-5 h-5 text-white fill-white" />
                  : <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                }
              </div>
            </div>

            {/* Pause — sol alt */}
            <button
              className="absolute bottom-3 left-3 w-7 h-7 rounded bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => { e.stopPropagation(); togglePlay() }}
            >
              {playing
                ? <Pause className="w-3.5 h-3.5 text-white fill-white" />
                : <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
              }
            </button>
          </div>

          {/* Sağ — Metin + Butonlar */}
          <div className="lg:w-[42%] px-8 py-10 lg:py-12 flex flex-col justify-center gap-7 border-t lg:border-t-0 lg:border-l border-white/[0.06]">
            <p className="text-white text-[1.35rem] font-medium leading-snug">
              Geleceğine Giden Yolu<br />Birlikte Planlayalım.
            </p>
            <p className="text-white/55 text-[13px] leading-relaxed -mt-3">
              Gerçek deneyimlerle yurtdışı eğitim sürecini tüm detaylarıyla keşfedin.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="group/btn flex items-center justify-between gap-4 px-5 py-4 rounded-full bg-[#222]/80 border border-white/10 text-white text-[13px] hover:bg-[#2a2a2a] transition-colors"
              >
                <span className="text-white/60">
                  <span className="text-white font-semibold">Telegram</span>{' '}
                  Güncel Duyurular ve Yardımlaşma Topluluğu
                </span>
                <ArrowRight size={15} className="shrink-0 text-white/70" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between gap-4 px-5 py-4 rounded-full bg-[#222]/80 border border-white/10 text-white text-[13px] hover:bg-[#2a2a2a] transition-colors"
              >
                <span className="text-white/60">
                  <span className="text-white font-semibold">YouTube</span>{' '}
                  Gerçek Öğrenci Deneyimi / Süreç
                </span>
                <div className="w-7 h-7 rounded-full bg-white/15 border border-white/10 flex items-center justify-center shrink-0">
                  <Play size={11} className="fill-white text-white ml-0.5" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ── Alt şerit ── */}
        <div className="w-full max-w-3xl rounded-xl bg-[#161616] border border-white/[0.06] px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            Nereden başlayacağınızı bilmiyor musunuz? Uzmanlarımızla ücretsiz ön görüşme planlayın.
          </p>
          <a
            href="#"
            className="shrink-0 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-white text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors whitespace-nowrap"
          >
            Hemen Başla
          </a>
        </div>

      </div>
    </section>
  )
}
