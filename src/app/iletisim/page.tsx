'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/Footer'

const SEHIRLER = ['Moskova', 'Sankt-Peterburg', 'Kazan', 'Ekaterinburg', 'Nijniy Novgorod', 'Henüz karar vermedim']
const PROGRAMLAR = ['Tıp', 'Diş Hekimliği', 'Eczacılık', 'Mühendislik', 'Bilgisayar Bilimleri', 'İktisat / İşletme', 'Hukuk', 'Uluslararası İlişkiler', 'Diğer']

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function IletisimPage() {
  const [form, setForm] = useState({ ad: '', telefon: '', email: '', sehir: '', program: '', mesaj: '' })
  const [status, setStatus] = useState<Status>('idle')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/iletisim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, kaynak: 'İletişim Sayfası' }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Header />
      <main>

        {/* ── Form + Info ── */}
        <section
          className="bg-[#f9f9f7] flex items-center py-5"
          style={{ minHeight: 'calc(100dvh - 116px)', maxHeight: 'calc(100dvh - 116px)', overflowY: 'auto' }}
        >
          <div className="w-full max-w-7xl mx-auto px-8 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

              {/* ── Left: Form ── */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-7">
                {status === 'success' ? (
                  <div className="flex flex-col items-center text-center py-10">
                    <CheckCircle size={44} className="text-[#f04420] mb-4" strokeWidth={1.5} />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Başvurun Alındı!</h2>
                    <p className="text-gray-500 text-[14px] leading-relaxed max-w-sm">
                      Danışmanlarımız en kısa sürede <strong>{form.telefon}</strong> numaralı telefonundan seni arayacak.
                    </p>
                    <button
                      onClick={() => { setStatus('idle'); setForm({ ad: '', telefon: '', email: '', sehir: '', program: '', mesaj: '' }) }}
                      className="mt-6 px-6 py-2 border border-gray-200 rounded-full text-[13px] text-gray-600 hover:border-gray-400 transition-colors"
                    >
                      Yeni Başvuru
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f04420]" />
                      <span className="text-[11px] font-semibold tracking-[0.42em] uppercase text-[#f04420]">
                        BAŞVURU FORMU
                      </span>
                    </div>

                    {/* Ad Soyad + Telefon */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
                          Ad Soyad <span className="text-[#f04420]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.ad}
                          onChange={set('ad')}
                          placeholder="Adın ve soyadın"
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-[13px] text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#f04420] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
                          Telefon <span className="text-[#f04420]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.telefon}
                          onChange={set('telefon')}
                          placeholder="+90 5XX XXX XX XX"
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-[13px] text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#f04420] transition-colors"
                        />
                      </div>
                    </div>

                    {/* E-posta */}
                    <div>
                      <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
                        E-posta
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="ornek@email.com"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-[13px] text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#f04420] transition-colors"
                      />
                    </div>

                    {/* Şehir + Program */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
                          İlgilendiğin Şehir
                        </label>
                        <select
                          value={form.sehir}
                          onChange={set('sehir')}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-[13px] text-gray-800 focus:outline-none focus:border-[#f04420] transition-colors bg-white appearance-none"
                        >
                          <option value="">Seçiniz</option>
                          {SEHIRLER.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
                          İlgilendiğin Program
                        </label>
                        <select
                          value={form.program}
                          onChange={set('program')}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-[13px] text-gray-800 focus:outline-none focus:border-[#f04420] transition-colors bg-white appearance-none"
                        >
                          <option value="">Seçiniz</option>
                          {PROGRAMLAR.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Mesaj */}
                    <div>
                      <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
                        Eklemek İstediklerin
                      </label>
                      <textarea
                        rows={3}
                        value={form.mesaj}
                        onChange={set('mesaj')}
                        placeholder="Sormak istediğin sorular, özel durumun vb."
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-[13px] text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#f04420] transition-colors resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-500 text-[12px]">Bir hata oluştu, lütfen tekrar deneyin.</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-[#f04420] hover:bg-[#d93a1a] disabled:opacity-60 transition-colors text-white text-[13px] font-semibold rounded-xl"
                    >
                      {status === 'loading' ? (
                        <><Loader2 size={15} className="animate-spin" /> Gönderiliyor…</>
                      ) : (
                        <>Ücretsiz Danışmanlık Al <ArrowRight size={13} strokeWidth={2.5} /></>
                      )}
                    </button>

                    <p className="text-center text-gray-400 text-[11px]">
                      Bilgileriniz yalnızca danışmanlık amacıyla kullanılır.
                    </p>
                  </form>
                )}
              </div>

              {/* ── Right: Info ── */}
              <div className="flex flex-col h-full space-y-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f04420]" />
                    <span className="text-[11px] font-semibold tracking-[0.42em] uppercase text-[#f04420]">
                      NEDEN BİZ?
                    </span>
                  </div>
                  <h2 className="text-[clamp(1.3rem,2vw,1.9rem)] font-bold text-gray-900 leading-tight tracking-tight mb-2">
                    10+ Yıllık Deneyim,<br />Binlerce Başarılı Öğrenci
                  </h2>
                  <p className="text-gray-500 text-[13px] leading-relaxed">
                    Rusya'da üniversite eğitimi konusunda Türkiye'nin en köklü danışmanlık firmalarından biriyiz.
                  </p>
                </div>

                {[
                  { n: '%100', l: 'Öğrenci Memnuniyeti' },
                  { n: '14',   l: 'Partner Üniversite' },
                  { n: '5',    l: 'Şehirde Hizmet' },
                  { n: '%100', l: 'Vize Başarı Oranı' },
                ].map(item => (
                  <div key={item.l} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                    <p className="text-[1.6rem] font-bold text-gray-900 leading-none w-24 shrink-0">{item.n}</p>
                    <p className="text-gray-500 text-[13px] leading-snug">{item.l}</p>
                  </div>
                ))}

                <div className="bg-[#1c1c1c] rounded-2xl p-5 mt-auto">
                  <p className="text-white/40 text-[10px] font-semibold tracking-widest uppercase mb-1.5">Acil Görüşme</p>
                  <p className="text-white text-[14px] font-semibold mb-0.5">WhatsApp ile ulaşın</p>
                  <p className="text-white/50 text-[12px] mb-3">Hızlı yanıt için WhatsApp hattımızdan yazabilirsiniz.</p>
                  <a
                    href="https://wa.me/905XXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#f04420] text-white text-[12px] font-semibold rounded-full hover:bg-[#d93a1a] transition-colors"
                  >
                    WhatsApp'ta Yaz <ArrowRight size={12} strokeWidth={2.5} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
