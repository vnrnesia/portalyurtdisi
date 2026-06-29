'use client'

import { useState } from 'react'
import {
  Sparkles,
  GraduationCap,
  Globe,
  Wallet,
  BookOpen,
  Languages,
  Check,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from 'lucide-react'

type Stage = 'idle' | 'loading' | 'results' | 'done'

const factors = [
  { Icon: GraduationCap, label: 'Akademik hedefleriniz' },
  { Icon: Globe, label: 'Gitmek istediğiniz ülke' },
  { Icon: Wallet, label: 'Bütçe aralığınız' },
  { Icon: BookOpen, label: 'Bölüm tercihleriniz' },
  { Icon: Languages, label: 'Dil seviyeniz' },
]

const quickPrompts = [
  'Tıp okumak istiyorum, bütçem 5.000$, Rusya veya Avrupa olabilir',
  'Mühendislik · Polonya · İngilizce',
  'Dil okulu · İspanya · 4.000$',
]

// Mock sonuçlar (backend/AI sonradan eklenecek)
const mockResults = [
  { name: 'Kazan Federal Üniversitesi', program: 'Tıp · Rusça', country: 'Rusya', tuition: '~4.500 $/yıl', match: 95 },
  { name: 'Sechenov Üniversitesi', program: 'Tıp · İngilizce', country: 'Moskova, Rusya', tuition: '~6.000 $/yıl', match: 88 },
  { name: 'Lublin Tıp Üniversitesi', program: 'Tıp · İngilizce', country: 'Polonya', tuition: '~9.000 $/yıl', match: 81 },
]

export default function PortalGPT() {
  const [stage, setStage] = useState<Stage>('idle')
  const [prompt, setPrompt] = useState('')
  const [contact, setContact] = useState('')

  const analyze = () => {
    if (!prompt.trim()) return
    setStage('loading')
    // AI simülasyonu
    setTimeout(() => setStage('results'), 1500)
  }

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contact.trim()) return
    setStage('done')
  }

  const reset = () => {
    setStage('idle')
    setPrompt('')
    setContact('')
  }

  return (
    <section className="bg-[#1c1c1e] py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-34">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* SOL — tanıtım */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f04420]/15 text-[#f7a58e] px-3.5 py-1.5 mb-6">
              <Sparkles size={14} />
              <span className="text-[12px] font-bold tracking-[0.15em] uppercase">Portal GPT</span>
            </div>

            <h2 className="text-[clamp(1.9rem,3vw,2.7rem)] font-bold text-white leading-[1.12] tracking-tight">
              Nereden Başlayacağınızı Bilmiyor musunuz?
            </h2>
            <p className="mt-3 text-[15px] font-semibold text-white/80">
              Portal GPT — Kişiye Özel Üniversite Seçim Robotu
            </p>
            <p className="mt-4 text-[15px] text-white/55 leading-relaxed max-w-md">
              Yazılım ekibimiz ve eğitim danışmanlarımızın ortak çalışmasıyla geliştirilen
              Portal GPT, sizin için en uygun üniversite ve bölüm seçeneklerini analiz ederek
              kişiye özel eğitim yol haritası oluşturur.
            </p>

            <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3">
              {factors.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-white/70 text-[14px]">
                  <Icon size={16} className="text-[#f04420] flex-shrink-0" />
                  {label}
                </li>
              ))}
            </ul>

            <p className="mt-7 text-[13px] text-white/40 leading-relaxed max-w-md">
              Sonuçlar danışmanlarımız tarafından doğrulanarak size özel hazırlanır.
            </p>
          </div>

          {/* SAĞ — interaktif panel */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-7">

            {/* Panel başlığı */}
            <div className="flex items-center gap-2 pb-4 mb-5 border-b border-gray-100">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#f04420]/10">
                <Sparkles size={16} className="text-[#f04420]" />
              </span>
              <div>
                <p className="text-[14px] font-bold text-[#1c1c1e] leading-none">Portal GPT</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Üniversite Seçim Asistanı</p>
              </div>
              <span className="ml-auto text-[10px] font-bold tracking-wider uppercase text-[#f04420] bg-[#f04420]/10 rounded px-2 py-1">
                Beta
              </span>
            </div>

            {/* idle / loading — prompt */}
            {(stage === 'idle' || stage === 'loading') && (
              <div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  disabled={stage === 'loading'}
                  placeholder="Örn: Tıp okumak istiyorum, bütçem 5.000$, Rusya veya Avrupa olabilir"
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#f04420] focus:bg-white transition-colors"
                />

                <div className="flex flex-wrap gap-2 mt-3">
                  {quickPrompts.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setPrompt(q)}
                      disabled={stage === 'loading'}
                      className="text-[12px] text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1.5 transition-colors max-w-full truncate"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={analyze}
                  disabled={stage === 'loading' || !prompt.trim()}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#f04420] hover:bg-[#d93a1a] disabled:opacity-50 disabled:cursor-not-allowed text-white text-[14px] font-bold rounded-xl px-6 py-3.5 transition-colors"
                >
                  {stage === 'loading' ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Analiz ediliyor…
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Analiz Et
                    </>
                  )}
                </button>
              </div>
            )}

            {/* results — 3 uyum kartı + iletişim input */}
            {stage === 'results' && (
              <div>
                <p className="text-[13px] font-semibold text-[#1c1c1e] mb-3">
                  Senin için en uygun 3 seçenek:
                </p>
                <div className="flex flex-col gap-2.5">
                  {mockResults.map((r) => (
                    <div key={r.name} className="rounded-xl border border-gray-200 p-3.5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[14px] font-bold text-[#1c1c1e] leading-snug">{r.name}</p>
                          <p className="text-[12.5px] text-gray-500 mt-0.5">
                            {r.program} · {r.country} · {r.tuition}
                          </p>
                        </div>
                        <span className="text-[14px] font-bold text-[#f04420] flex-shrink-0">%{r.match}</span>
                      </div>
                      <div className="mt-2.5 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full bg-[#f04420]" style={{ width: `${r.match}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={submitContact} className="mt-5 pt-5 border-t border-gray-100">
                  <p className="text-[13px] font-semibold text-[#1c1c1e] mb-2.5">
                    Sana özel detaylı yol haritası için iletişim bilgini bırak:
                  </p>
                  <div className="flex gap-2">
                    <input
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                      placeholder="Telefon veya e-posta"
                      className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#f04420] focus:bg-white transition-colors"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 bg-[#f04420] hover:bg-[#d93a1a] text-white text-[14px] font-bold rounded-xl px-5 transition-colors whitespace-nowrap"
                    >
                      Gönder
                      <ArrowRight size={16} />
                    </button>
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 text-[11.5px] text-gray-400">
                    <Check size={13} className="text-[#f04420]" />
                    Sonuçlar danışmanlarımız tarafından doğrulanarak hazırlanır.
                  </p>
                </form>
              </div>
            )}

            {/* done — başarı */}
            {stage === 'done' && (
              <div className="py-8 text-center">
                <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-[#f04420]/10 mb-4">
                  <CheckCircle2 size={30} className="text-[#f04420]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#1c1c1e]">Talebin alındı!</h3>
                <p className="mt-2 text-[14px] text-gray-500 leading-relaxed max-w-xs mx-auto">
                  Eğitim danışmanımız en kısa sürede seninle iletişime geçecek.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 text-[13px] font-semibold text-[#f04420] hover:underline"
                >
                  Yeni analiz yap
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}
