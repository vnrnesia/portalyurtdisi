'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  short: string
  title: string
  desc: string
  img: string
}

const steps: Step[] = [
  {
    short: 'Profil Analizi',
    title: 'Profil Analizi ve Hedef Belirleme',
    desc: 'Akademik geçmişinizi, bütçenizi, dil seviyenizi ve kariyer hedeflerinizi analiz ederek size en uygun ülke, üniversite veya vize kategorisini belirliyoruz.',
    img: '/ogrenciler/aybars.png',
  },
  {
    short: 'Yol Haritası',
    title: 'Yol Haritası ve Başvurular',
    desc: 'Size özel hazırlanan yol haritası doğrultusunda gerekli evrakları hazırlıyor, resmi çevirileri gerçekleştiriyor ve üniversite veya vize başvurularınızı yapıyoruz.',
    img: '/ogrenciler/omer.png',
  },
  {
    short: 'Kabul & Vize',
    title: 'Kabul, Vize ve Ulaşım Planlaması',
    desc: 'Kabul mektubu veya ön onay sonrasında vize başvurunuzu yönetiyor, konaklama seçeneklerini planlıyor ve uçuş organizasyonlarında destek sağlıyoruz.',
    img: '/ogrenciler/oyku.png',
  },
  {
    short: 'Varış & Oryantasyon',
    title: 'Varış ve Oryantasyon',
    desc: 'Ülkeye girişinizden sonra havalimanı karşılama, üniversite kayıt işlemleri, banka hesabı açılışı, SIM kart temini ve şehir oryantasyonu konularında yanınızda oluyoruz.',
    img: '/ogrenciler/toprak.png',
  },
]

const avatars = ['/ogrenciler/aybars.png', '/ogrenciler/omer.png', '/ogrenciler/oyku.png', '/ogrenciler/toprak.png']

export default function ProcessSteps() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-[#f5f4f2] py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-34">
        <div className="grid lg:grid-cols-[0.85fr_1.6fr] gap-12 lg:gap-16 items-center">

          {/* SOL — başlık + sosyal kanıt + CTA */}
          <div>
            <h2 className="text-[clamp(1.9rem,3vw,2.6rem)] font-bold text-[#1c1c1e] leading-[1.12] tracking-tight">
              Başvurudan Yerleşime Kadar 4 Aşamada Yanınızdayız
            </h2>
            <p className="mt-4 text-[15px] text-gray-500 leading-relaxed">
              Eğitim, vize ve yerleşim süreçlerinizi tek merkezden yönetiyoruz.
            </p>

            <div className="flex items-center gap-3 mt-10">
              <div className="flex -space-x-2.5">
                {avatars.map((a) => (
                  <span key={a} className="relative w-9 h-9 rounded-full ring-2 ring-[#f5f4f2] overflow-hidden bg-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a} alt="" className="w-full h-full object-cover" />
                  </span>
                ))}
              </div>
              <div>
                <p className="text-[16px] font-bold text-[#1c1c1e] leading-none">500+ Öğrenci</p>
                <p className="text-[13px] text-gray-500 mt-1">Hayalindeki üniversiteye yerleşti</p>
              </div>
            </div>

            <Link
              href="/basvuru"
              className="mt-8 inline-flex items-center gap-2 bg-[#f04420] hover:bg-[#d93a1a] text-white text-[14px] font-bold rounded-lg px-6 py-3.5 transition-colors"
            >
              Hemen Başvur
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* SAĞ — genişleyen panel akordeon (desktop) */}
          <div className="hidden lg:flex gap-3 h-[480px]">
            {steps.map((s, i) => {
              const isActive = i === active
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  className="relative rounded-2xl overflow-hidden cursor-pointer transition-[flex-grow] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ flexGrow: isActive ? 6 : 1, flexBasis: 0, minWidth: 0, willChange: 'flex-grow' }}
                >
                  {/* Sabit arka plan görseli (her durumda mevcut, yeniden yüklenmez) */}
                  <Image src={s.img} alt={s.title} fill className="object-cover object-top" sizes="600px" />

                  {/* Kapalı durum katmanı — karartma + dikey etiket */}
                  <div
                    className={cn(
                      'absolute inset-0 transition-opacity duration-300',
                      isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    )}
                  >
                    <div className="absolute inset-0 bg-black/55" />
                    <div className="absolute inset-0 flex flex-col items-center justify-between py-6">
                      <span className="text-[13px] font-bold text-[#f7a58e]">{i + 1}</span>
                      <span
                        className="text-[14px] font-semibold text-white whitespace-nowrap tracking-wide"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        {s.short}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                    </div>
                  </div>

                  {/* Açık durum katmanı — beyaz kart (başlık + görsel + açıklama) */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-white p-6 flex flex-col transition-opacity duration-300',
                      isActive ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none'
                    )}
                  >
                    <p className="text-[13px] font-bold text-[#f04420]">Adım {i + 1}</p>
                    <h3 className="text-[19px] font-bold text-[#1c1c1e] leading-snug mt-1 mb-4">
                      {s.title}
                    </h3>
                    <div className="relative flex-1 min-h-0 rounded-xl overflow-hidden mb-4">
                      <Image src={s.img} alt={s.title} fill className="object-cover object-top" sizes="600px" />
                    </div>
                    <p className="text-[14px] text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* SAĞ — mobil dikey kartlar */}
          <div className="lg:hidden flex flex-col gap-4">
            {steps.map((s, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white border border-gray-100">
                <div className="relative h-40">
                  <Image src={s.img} alt={s.title} fill className="object-cover object-top" sizes="100vw" />
                </div>
                <div className="p-5">
                  <p className="text-[12px] font-bold text-[#f04420]">Adım {i + 1}</p>
                  <h3 className="text-[16px] font-bold text-[#1c1c1e] mt-1 mb-2">{s.title}</h3>
                  <p className="text-[13.5px] text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
