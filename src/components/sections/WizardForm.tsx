'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { Check, ChevronLeft, ChevronRight, ChevronDown, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import Reveal from '@/components/anim/Reveal'

/* ----------------------------- veri ----------------------------- */

type Service = 'egitim' | 'vize' | 'partner' | ''

const services: { id: Exclude<Service, ''>; label: string; desc: string }[] = [
  { id: 'egitim', label: 'Yurtdışı Eğitim Danışmanlığı', desc: 'Üniversite ve program seçimi' },
  { id: 'vize', label: 'Vize Danışmanlığı', desc: 'Schengen & Rusya vize süreçleri' },
  { id: 'partner', label: 'Partnerlik / For Agency', desc: 'Kurumsal iş birliği' },
]

const egitimUlke = ['Rusya', 'Polonya', 'İspanya', 'Henüz karar vermedim']
const programlar = ['Dil Okulu', 'Lisans', 'Yüksek Lisans', 'Tıp', 'Diş Hekimliği', 'Eczacılık', 'Diğer']
const egitimDurumu = ['Lise', 'Ön Lisans', 'Lisans', 'Yüksek Lisans']
const butceler = ['3.000 $ altı', '3.000 – 6.000 $', '6.000 – 10.000 $', '10.000 $ üzeri']
const ingilizce = ['A1-A2', 'B1-B2', 'C1-C2', 'IELTS / TOEFL mevcut']

const vizeUlkeler = ['Litvanya', 'Polonya', 'Estonya', 'Hırvatistan', 'İspanya', 'Fransa', 'Hollanda', 'Yunanistan', 'Rusya']
const vizeTurleri = ['Avrupa Oturum Kartı', 'Multi Vize', 'Turistik', 'Transit', 'Ulusal D Tipi', 'Çalışma Vizesi', 'Öğrenci Vizesi', 'Rusya Elektronik', 'Aile Vizesi']

const benefits = [
  'Anadili Türkçe yurtdışı ekip desteği',
  'Üniversite kabul oranı yüksek başvuru dosyaları',
  'Schengen ve Rusya vize uzmanlığı',
  'Konaklama ve yerleşim desteği',
  'Rusya, Türkiye ve Türkmenistan ofisleri',
]

const steps = ['Hizmet', 'Hedef', 'İletişim']

/* --------------------------- yardımcılar --------------------------- */

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[12.5px] font-semibold text-gray-700 mb-1">
      {children}
      {required && <span className="text-[#f04420]"> *</span>}
    </label>
  )
}

const inputCls =
  'w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-[13.5px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#f04420] transition-colors'

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputCls, 'appearance-none pr-10 cursor-pointer', !value && 'text-gray-400')}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} className="text-gray-800">{o}</option>
          ))}
        </select>
        <ChevronDown size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
}

/* ----------------------------- ana ----------------------------- */

export default function WizardForm() {
  const [step, setStep] = useState(0)
  const [service, setService] = useState<Service>('')

  // eğitim
  const [ulke, setUlke] = useState('')
  const [program, setProgram] = useState('')
  const [durum, setDurum] = useState('')
  const [butce, setButce] = useState('')
  const [ing, setIng] = useState('')
  // vize
  const [vizeUlke, setVizeUlke] = useState('')
  const [vizeTur, setVizeTur] = useState('')
  // iletişim
  const [ad, setAd] = useState('')
  const [telefon, setTelefon] = useState('')
  const [email, setEmail] = useState('')
  const [telegram, setTelegram] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [consent1, setConsent1] = useState(false)
  const [consent2, setConsent2] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const stepRef = useRef<HTMLDivElement>(null)

  // adım değişince içerik animasyonu
  useEffect(() => {
    if (!stepRef.current) return
    gsap.fromTo(
      stepRef.current,
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    )
  }, [step])

  const canNext = step === 0 ? service !== '' : true

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')

    const hizmetLabel = services.find((s) => s.id === service)?.label || service || ''

    // Hizmete göre okunabilir detay özeti
    const detayParts: string[] = []
    if (service === 'egitim') {
      if (ulke) detayParts.push(`Ülke: ${ulke}`)
      if (durum) detayParts.push(`Eğitim durumu: ${durum}`)
      if (ing) detayParts.push(`İngilizce: ${ing}`)
    } else if (service === 'vize') {
      if (vizeUlke) detayParts.push(`Vize ülkesi: ${vizeUlke}`)
      if (vizeTur) detayParts.push(`Vize türü: ${vizeTur}`)
    }
    if (telegram) detayParts.push(`Telegram: ${telegram}`)
    if (whatsapp) detayParts.push(`WhatsApp: ${whatsapp}`)
    detayParts.push(`Onaylar: KVKK ${consent1 ? '✓' : '✗'}, Bilgilendirme ${consent2 ? '✓' : '✗'}`)

    try {
      const res = await fetch('/api/iletisim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ad,
          telefon,
          email,
          kaynak: 'Wizard Form',
          hizmet: hizmetLabel,
          program: service === 'egitim' ? program : '',
          butce: service === 'egitim' ? butce : '',
          detay: detayParts.join(' • '),
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-gray-100 py-12 lg:py-16">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-34">
        <Reveal y={24} className="bg-white border border-gray-100 rounded-[24px] shadow-[0_15px_45px_-15px_rgba(0,0,0,0.12)] p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8 lg:gap-12">

            {/* SOL — form */}
            <div>
              <h2 className="text-[clamp(1.4rem,2.2vw,1.8rem)] font-bold text-[#1c1c1e] tracking-tight">
                Yurtdışı Yolculuğunuza Güvenle Başlayın
              </h2>
              <p className="mt-1.5 text-[14px] text-gray-500">
                Birkaç soruyla size özel ücretsiz ön değerlendirme hazırlayalım.
              </p>

              {/* Adım göstergesi */}
              <div className="flex items-center gap-2 mt-5 mb-6">
                {steps.map((label, i) => (
                  <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'flex items-center justify-center w-7 h-7 rounded-full text-[13px] font-bold transition-colors',
                          i <= step ? 'bg-[#f04420] text-white' : 'bg-gray-100 text-gray-400'
                        )}
                      >
                        {i < step ? <Check size={15} strokeWidth={3} /> : i + 1}
                      </span>
                      <span
                        className={cn(
                          'text-[13px] font-semibold hidden sm:block',
                          i <= step ? 'text-[#1c1c1e]' : 'text-gray-400'
                        )}
                      >
                        {label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={cn('h-px flex-1', i < step ? 'bg-[#f04420]' : 'bg-[#f04420]/30')} />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <div ref={stepRef}>

                  {/* ADIM 1 — Hizmet */}
                  {step === 0 && (
                    <div>
                      <p className="text-[15px] font-semibold text-[#1c1c1e] mb-3">
                        Hangi hizmetimizle ilgileniyorsunuz?
                      </p>
                      <div className="grid sm:grid-cols-3 gap-2.5">
                        {services.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setService(s.id)}
                            className={cn(
                              'rounded-xl border p-4 text-left transition-colors',
                              service === s.id
                                ? 'border-[#f04420] bg-[#f04420]/10'
                                : 'border-gray-200 bg-[#f6f6f7] hover:bg-[#f0f0f1] hover:border-gray-300'
                            )}
                          >
                            <span
                              className={cn(
                                'block text-[14px] font-bold leading-snug',
                                service === s.id ? 'text-[#f04420]' : 'text-[#1c1c1e]'
                              )}
                            >
                              {s.label}
                            </span>
                            <span className="block text-[12.5px] text-gray-500 mt-1">{s.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ADIM 2 — Hedef */}
                  {step === 1 && (
                    <div>
                      <p className="text-[15px] font-semibold text-[#1c1c1e] mb-5">Hedefinizi Tanıyalım</p>

                      {service === 'egitim' && (
                        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-3">
                          <SelectField label="Hangi ülkede eğitim almak istiyorsunuz?" value={ulke} onChange={setUlke} options={egitimUlke} placeholder="Ülke seçiniz" />
                          <SelectField label="Hangi program ile ilgileniyorsunuz?" value={program} onChange={setProgram} options={programlar} placeholder="Program seçiniz" />
                          <SelectField label="Güncel eğitim durumunuz?" value={durum} onChange={setDurum} options={egitimDurumu} placeholder="Durum seçiniz" />
                          <SelectField label="Tahmini bütçeniz" value={butce} onChange={setButce} options={butceler} placeholder="Bütçe seçiniz" />
                          <SelectField label="İngilizce seviyeniz" value={ing} onChange={setIng} options={ingilizce} placeholder="Seviye seçiniz" />
                        </div>
                      )}

                      {service === 'vize' && (
                        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-3">
                          <SelectField label="Başvuracağınız ülke" value={vizeUlke} onChange={setVizeUlke} options={vizeUlkeler} placeholder="Ülke seçiniz" />
                          <SelectField label="Vize türü" value={vizeTur} onChange={setVizeTur} options={vizeTurleri} placeholder="Vize türü seçiniz" />
                        </div>
                      )}

                      {service === 'partner' && (
                        <p className="text-[14px] text-gray-600 leading-relaxed bg-[#f6f6f7] rounded-xl p-5 border border-gray-200">
                          Kurumsal iş birliği ve acente partnerliği için iletişim bilgilerinizi bırakın;
                          ekibimiz sizinle en kısa sürede iletişime geçsin.
                        </p>
                      )}
                    </div>
                  )}

                  {/* ADIM 3 — İletişim */}
                  {step === 2 && (
                    <div>
                      <p className="text-[15px] font-semibold text-[#1c1c1e] mb-4">İletişim Bilgileri</p>
                      <div className="grid sm:grid-cols-3 gap-x-4 gap-y-3">
                        <div>
                          <FieldLabel required>Ad Soyad</FieldLabel>
                          <input type="text" placeholder="Adınız Soyadınız" className={inputCls} required value={ad} onChange={(e) => setAd(e.target.value)} />
                        </div>
                        <div>
                          <FieldLabel required>Telefon</FieldLabel>
                          <input type="tel" placeholder="+90 5xx xxx xx xx" className={inputCls} required value={telefon} onChange={(e) => setTelefon(e.target.value)} />
                        </div>
                        <div>
                          <FieldLabel required>E-posta</FieldLabel>
                          <input type="email" placeholder="ornek@mail.com" className={inputCls} required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                          <FieldLabel>Telegram</FieldLabel>
                          <input type="text" placeholder="@kullanici_adi" className={inputCls} value={telegram} onChange={(e) => setTelegram(e.target.value)} />
                        </div>
                        <div>
                          <FieldLabel>WhatsApp</FieldLabel>
                          <input type="tel" placeholder="+90 5xx xxx xx xx" className={inputCls} value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                        </div>
                      </div>

                      {/* Onay kutuları */}
                      <div className="flex flex-col gap-3 mt-6">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={consent1}
                            onChange={(e) => setConsent1(e.target.checked)}
                            className="mt-0.5 w-4 h-4 accent-[#f04420]"
                            required
                          />
                          <span className="text-[13px] text-gray-600 leading-snug">
                            Kişisel verilerimin işlenmesini kabul ediyorum.
                          </span>
                        </label>
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={consent2}
                            onChange={(e) => setConsent2(e.target.checked)}
                            className="mt-0.5 w-4 h-4 accent-[#f04420]"
                          />
                          <span className="text-[13px] text-gray-600 leading-snug">
                            Portal Yurtdışı&apos;ndan bilgilendirme almak istiyorum.
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                </div>

                {/* Navigasyon */}
                <div className="flex items-center gap-3 mt-7">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={back}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-gray-200 text-[13.5px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ChevronLeft size={16} />
                      Geri
                    </button>
                  )}

                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={next}
                      disabled={!canNext}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-[#f04420] hover:bg-[#d93a1a] disabled:opacity-40 disabled:cursor-not-allowed text-white text-[13.5px] font-bold transition-colors"
                    >
                      İleri
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={status === 'loading' || status === 'success'}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#f04420] hover:bg-[#d93a1a] disabled:opacity-60 text-white text-[13.5px] font-bold transition-colors"
                    >
                      {status === 'loading'
                        ? 'Gönderiliyor…'
                        : status === 'success'
                          ? 'Talebin Alındı ✓'
                          : 'Ücretsiz Ön Değerlendirme Al'}
                      {status !== 'loading' && status !== 'success' && <Send size={15} />}
                    </button>
                  )}
                </div>

                {step === steps.length - 1 && status === 'success' && (
                  <p className="mt-4 text-[13.5px] font-semibold text-green-600">
                    Talebin başarıyla alındı! Danışmanımız en kısa sürede seninle iletişime geçecek.
                  </p>
                )}
                {step === steps.length - 1 && status === 'error' && (
                  <p className="mt-4 text-[13.5px] text-red-500">
                    Bir hata oluştu, lütfen tekrar deneyin.
                  </p>
                )}
              </form>
            </div>

            {/* SAĞ — avantajlar */}
            <div className="lg:border-l lg:border-gray-200 lg:pl-10 flex flex-col">
              <p className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
                Neler Sunuyoruz
              </p>
              <ul className="flex flex-col gap-5">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#f04420]/10 mt-0.5">
                      <Check size={12} strokeWidth={3} className="text-[#f04420]" />
                    </span>
                    <span className="text-[14px] text-gray-700 leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  )
}
