'use client'

import { useState, useRef } from 'react'
import RevealText from '@/components/anim/RevealText'
import {
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

interface Recommendation {
  name: string
  program: string
  country: string
  tuition: string
  match: number
  reason: string
}

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

interface ChatMsg {
  role: 'user' | 'assistant'
  content: string
}

export default function PortalGPT() {
  const [stage, setStage] = useState<Stage>('idle')
  const [prompt, setPrompt] = useState('')
  const [followUp, setFollowUp] = useState('')
  const [contact, setContact] = useState('')
  const [aiMessage, setAiMessage] = useState('')
  const [results, setResults] = useState<Recommendation[]>([])
  const [history, setHistory] = useState<ChatMsg[]>([])
  const [error, setError] = useState('')
  const [thinking, setThinking] = useState(false)
  const [sending, setSending] = useState(false)
  const [firstPrompt, setFirstPrompt] = useState('')

  // Her sohbet için kalıcı oturum kimliği (Sheets'te tek satırda toplanır)
  const sessionIdRef = useRef('')
  const ensureSession = () => {
    if (!sessionIdRef.current) {
      sessionIdRef.current =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `s_${Date.now()}_${Math.random().toString(36).slice(2)}`
    }
    return sessionIdRef.current
  }

  // Tek noktadan AI çağrısı — hem ilk analiz hem takip soruları için
  const send = async (text: string, currentHistory: ChatMsg[]) => {
    const res = await fetch('/api/portalgpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: text, history: currentHistory, sessionId: ensureSession() }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || 'Bir hata oluştu.')

    const recs: Recommendation[] = Array.isArray(data.recommendations) ? data.recommendations : []
    setAiMessage(data.message || '')
    setResults(recs)

    // Asistan yanıtını geçmişe ekle (öneri adlarıyla birlikte — bağlam korunur)
    const assistantSummary = [
      data.message || '',
      recs.length ? 'Önerilenler: ' + recs.map((r) => `${r.name} (${r.program})`).join(', ') : '',
    ].filter(Boolean).join(' ')
    setHistory([...currentHistory, { role: 'user', content: text }, { role: 'assistant', content: assistantSummary }])
  }

  const analyze = async () => {
    if (!prompt.trim()) return
    setError('')
    setFirstPrompt(prompt)
    setStage('loading')
    try {
      await send(prompt, [])
      setStage('results')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu.')
      setStage('idle')
    }
  }

  const askFollowUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!followUp.trim() || thinking) return
    setError('')
    setThinking(true)
    try {
      await send(followUp, history)
      setFollowUp('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu.')
    } finally {
      setThinking(false)
    }
  }

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contact.trim() || sending) return
    setSending(true)
    setError('')
    try {
      const summary = results
        .map((r) => `• ${r.name} — ${r.program} (%${r.match})`)
        .join('\n')
      const res = await fetch('/api/iletisim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ad: 'Portal GPT Talebi',
          telefon: contact,
          kaynak: 'PortalGPT',
          sessionId: ensureSession(),
          mesaj: `İlk girdi: ${firstPrompt}\n\nSon öneriler:\n${summary || '—'}`,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Gönderilemedi.')
      }
      setStage('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gönderilemedi.')
    } finally {
      setSending(false)
    }
  }

  const reset = () => {
    setStage('idle')
    setPrompt('')
    setFollowUp('')
    setContact('')
    setAiMessage('')
    setResults([])
    setHistory([])
    setFirstPrompt('')
    setError('')
    sessionIdRef.current = '' // yeni sohbet = yeni oturum satırı
  }

  return (
    <section className="bg-[#1c1c1e] py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-34">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* SOL — tanıtım */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f04420]/15 text-[#f7a58e] px-3.5 py-1.5 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sadecelogo2.png" alt="" className="w-3.5 h-3.5 object-contain brightness-0 invert" />
              <span className="text-[12px] font-bold tracking-[0.15em] uppercase">Portal GPT</span>
            </div>

            <RevealText
              as="h2"
              className="text-[clamp(1.9rem,3vw,2.7rem)] font-bold text-white leading-[1.12] tracking-tight"
              text={"Nereden Başlayacağınızı\nBilmiyor musunuz?"}
            />
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
          <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-7 w-full overflow-hidden">

            {/* Panel başlığı */}
            <div className="flex items-center gap-2 pb-4 mb-5 border-b border-gray-100">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#f04420]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/sadecelogo2.png" alt="Portal GPT" className="w-5 h-5 object-contain brightness-0 invert" />
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

                <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-3">
                  {quickPrompts.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setPrompt(q)}
                      disabled={stage === 'loading'}
                      className="text-[12.5px] leading-relaxed text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl px-3.5 py-2.5 transition-colors text-left w-full sm:w-auto"
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
                      <img src="/sadecelogo2.png" alt="" className="w-4 h-4 object-contain brightness-0 invert" />
                      Analiz Et
                    </>
                  )}
                </button>

                {error && (
                  <p className="mt-3 text-[12.5px] text-red-500 text-center">{error}</p>
                )}
              </div>
            )}

            {/* results — kompakt uyum kartları + sohbet + iletişim */}
            {stage === 'results' && (
              <div>
                {aiMessage && (
                  <p className="text-[12.5px] text-gray-600 leading-snug mb-3 bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                    {aiMessage}
                  </p>
                )}

                {results.length > 0 && (
                  <div className="flex flex-col gap-2 max-h-[244px] overflow-y-auto pr-1 -mr-1">
                    {results.map((r, i) => (
                      <div key={`${r.name}-${i}`} className="rounded-lg border border-gray-200 px-3 py-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[13px] font-bold text-[#1c1c1e] leading-snug truncate">{r.name}</p>
                          <span className="text-[13px] font-bold text-[#f04420] flex-shrink-0">%{r.match}</span>
                        </div>
                        <p className="text-[11.5px] text-gray-500 mt-0.5 truncate">
                          {[r.program, r.country, r.tuition].filter(Boolean).join(' · ')}
                        </p>
                        <div className="mt-2 h-1 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full rounded-full bg-[#f04420]" style={{ width: `${r.match}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Takip sorusu — sohbete devam */}
                <form onSubmit={askFollowUp} className="mt-3">
                  <div className="flex gap-2">
                    <input
                      value={followUp}
                      onChange={(e) => setFollowUp(e.target.value)}
                      disabled={thinking}
                      placeholder="Tekrar sor: ör. bütçem 3.000$ olsa?"
                      className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#f04420] focus:bg-white transition-colors disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={thinking || !followUp.trim()}
                      className="inline-flex items-center justify-center w-10 bg-[#1c1c1e] hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                      aria-label="Tekrar sor"
                    >
                      {thinking ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src="/sadecelogo2.png" alt="" className="w-4 h-4 object-contain brightness-0 invert" />
                      )}
                    </button>
                  </div>
                  {thinking && (
                    <p className="mt-1.5 text-[11.5px] text-gray-400">Portal GPT yazıyor…</p>
                  )}
                </form>

                <form onSubmit={submitContact} className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-[12px] font-semibold text-[#1c1c1e] mb-2">
                    Detaylı yol haritası için iletişim bilgini bırak:
                  </p>
                  <div className="flex gap-2">
                    <input
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                      placeholder="Telefon veya e-posta"
                      className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-[13.5px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#f04420] focus:bg-white transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center gap-1.5 bg-[#f04420] hover:bg-[#d93a1a] disabled:opacity-50 disabled:cursor-not-allowed text-white text-[13.5px] font-bold rounded-lg px-4 transition-colors whitespace-nowrap"
                    >
                      {sending ? <Loader2 size={15} className="animate-spin" /> : <>Gönder<ArrowRight size={15} /></>}
                    </button>
                  </div>
                  {error && <p className="mt-1.5 text-[12px] text-red-500">{error}</p>}
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-400">
                    <Check size={12} className="text-[#f04420]" />
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
