'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Check, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Group {
  heading: string
  items: string[]
}

interface ServiceTab {
  key: string
  tab: string
  title: string
  desc: string
  cta: string
  list?: string[]
  groups?: Group[]
}

const tabs: ServiceTab[] = [
  {
    key: 'egitim',
    tab: 'Eğitim Danışmanlığı',
    title: 'Yurtdışı Eğitim Danışmanlığı',
    desc: "Rusya, Polonya ve İspanya'daki üniversiteler ile dil okullarına başvuru süreçlerinizi profesyonel olarak yönetiyoruz. Anadili Türkçe olan yurtdışı ekibimiz ile doğru program seçiminden üniversite kabulüne kadar tüm aşamalarda destek sağlıyoruz.",
    cta: 'Programları İncele',
    list: [
      'Üniversite ve bölüm seçimi',
      'Lisans ve yüksek lisans başvuruları',
      'Dil okulu kayıt işlemleri',
      'Evrak hazırlığı ve resmi çeviriler',
      'Üniversite kabul süreçlerinin takibi',
      'Öğrenci vizesi danışmanlığı',
    ],
  },
  {
    key: 'yerlesim',
    tab: 'Yerleşim & Adaptasyon',
    title: 'Yerleşim ve Adaptasyon Hizmetleri',
    desc: 'Yeni bir ülkeye taşınmak yalnızca eğitim almak değildir. Öğrencilerimizin yeni yaşamlarına güvenle başlamaları için ülkeye varış öncesinden başlayarak kapsamlı destek sunuyoruz.',
    cta: 'Yerleşim Hizmetlerini Keşfet',
    list: [
      'Yurt ve konaklama yerleştirmesi',
      'Havalimanı karşılama',
      'Üniversite kayıt işlemleri',
      'Oturum ve göçmenlik prosedürleri',
      'Banka hesabı açılışı',
      'SIM kart ve iletişim desteği',
      'Şehir ve kampüs oryantasyonu',
    ],
  },
  {
    key: 'vize',
    tab: 'Vize Danışmanlığı',
    title: 'Vize Danışmanlığı',
    desc: 'Schengen Bölgesi ve Rusya Federasyonu için kısa ve uzun süreli vize başvurularında profesyonel danışmanlık hizmeti sunuyoruz. Evrak hazırlığından başvuru takibine kadar tüm süreci sizin adınıza yönetiyoruz.',
    cta: 'Vize Sürecinizi Başlatın',
    groups: [
      {
        heading: '🇪🇺 Schengen Vizeleri',
        items: [
          'Avrupa Oturum Kartı',
          'Multi (Çok Girişli) Vize',
          'Turistik Vize',
          'Transit Vize',
          'Ulusal D Tipi Vize',
          'Çalışma ve Uzun Süreli Oturum Vizeleri',
          'Avrupa Öğrenci Vizeleri',
        ],
      },
      {
        heading: '🇷🇺 Rusya Vizeleri',
        items: [
          'Elektronik Vize',
          'Turistik Vize',
          'Öğrenci Vizesi',
          'Çalışma (İşçi) Vizesi',
          'Aile Vizeleri',
        ],
      },
    ],
  },
  {
    key: 'isbirligi',
    tab: 'İş Birliği',
    title: 'İş Birliği — Portal Partner Network',
    desc: 'Eğitim danışmanlıkları, vize merkezleri, influencerlar ve uluslararası partnerler için Portal Partner Network çatısı altında iş birliği fırsatları sunuyoruz.',
    cta: 'Partner Programına Katılın',
    list: [
      'Komisyon Bazlı İş Ortaklığı',
      'Lead ve Öğrenci Paylaşımı',
      'White Label Hizmet Modeli',
      'Admission Outsourcing',
      'CRM ve Operasyon Desteği',
      'Ortak Pazarlama Çalışmaları',
    ],
  },
]

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#f04420]/10 mt-0.5">
        <Check size={12} strokeWidth={3} className="text-[#f04420]" />
      </span>
      <span className="text-[14.5px] text-gray-700 leading-snug">{children}</span>
    </li>
  )
}

export default function ServiceTabs() {
  const [active, setActive] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [active])

  const t = tabs[active]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-34">

        {/* Başlık satırı */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12">
          <div className="lg:max-w-[560px]">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-3 h-3 bg-[#f04420]" />
              <span className="text-[12px] font-bold tracking-[0.2em] text-[#1c1c1e] uppercase">
                Hizmetlerimiz
              </span>
            </div>
            <h2 className="text-[clamp(1.9rem,3.2vw,2.7rem)] font-bold text-[#1c1c1e] leading-[1.12] tracking-tight">
              Uluslararası Yolculuğunuzun Her Aşamasında Yanınızdayız
            </h2>
          </div>
          <p className="lg:max-w-[360px] text-[15px] text-gray-500 leading-relaxed lg:pt-2">
            Rusya, Polonya ve İspanya&apos;da eğitim; Schengen ve Rusya vizelerinde
            profesyonel destek; ülkeye yerleşimden partner iş birliklerine kadar tüm
            süreçleri tek çatı altında yönetiyoruz.
          </p>
        </div>

        {/* Sekmeler */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {tabs.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setActive(i)}
              className={cn(
                'rounded-xl border py-4 px-4 text-[14.5px] font-semibold transition-colors',
                i === active
                  ? 'bg-[#f04420] border-[#f04420] text-white'
                  : 'bg-white border-gray-200 text-[#1c1c1e] hover:border-gray-300'
              )}
            >
              {tab.tab}
            </button>
          ))}
        </div>

        {/* İçerik paneli */}
        <div
          ref={panelRef}
          className="mt-6 rounded-2xl border border-gray-200 bg-[#fafafa] p-8 lg:p-12 grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16"
        >
          {/* Sol — başlık + açıklama + CTA */}
          <div className="flex flex-col">
            <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] font-bold text-[#1c1c1e] leading-tight tracking-tight">
              {t.title}
            </h3>
            <p className="mt-4 text-[15px] text-gray-600 leading-relaxed">{t.desc}</p>
            <a
              href="/hizmetler"
              className="mt-7 lg:mt-auto inline-flex w-fit items-center gap-2 bg-[#f04420] hover:bg-[#d93a1a] text-white text-[14px] font-bold rounded-lg px-6 py-3 transition-colors"
            >
              {t.cta}
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Sağ — Hizmet Kapsamı */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-5">
              {t.groups ? 'Vize Türleri' : 'Hizmet Kapsamı'}
            </p>

            {t.list && (
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3.5">
                {t.list.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            )}

            {t.groups && (
              <div className="grid sm:grid-cols-2 gap-8">
                {t.groups.map((g) => (
                  <div key={g.heading}>
                    <p className="text-[15px] font-bold text-[#1c1c1e] mb-4">{g.heading}</p>
                    <ul className="flex flex-col gap-3.5">
                      {g.items.map((item) => (
                        <CheckItem key={item}>{item}</CheckItem>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
