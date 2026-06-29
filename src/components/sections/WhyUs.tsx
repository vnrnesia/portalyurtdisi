'use client'

import Link from 'next/link'
import RevealText from '@/components/anim/RevealText'
import Reveal from '@/components/anim/Reveal'
import {
  GraduationCap,
  ClipboardCheck,
  BadgeCheck,
  Plane,
  ShieldCheck,
  Headphones,
  ArrowRight,
} from 'lucide-react'

interface Feature {
  Icon: React.ElementType
  title: string
  desc: string
}

const features: Feature[] = [
  {
    Icon: GraduationCap,
    title: 'Doğru Üniversite Seçimi',
    desc: 'Profilinize ve bütçenize en uygun üniversite ile programları birlikte belirliyoruz.',
  },
  {
    Icon: ClipboardCheck,
    title: 'Eksiksiz Başvuru Dosyası',
    desc: 'Belgelerinizi titizlikle hazırlayıp başvurunuzu eksiksiz ve zamanında tamamlıyoruz.',
  },
  {
    Icon: BadgeCheck,
    title: 'Yüksek Vize Onay Oranı',
    desc: 'Schengen ve Rusya vizelerinde güçlü başvuru stratejisiyle onay şansınızı artırıyoruz.',
  },
  {
    Icon: Plane,
    title: 'Uçtan Uca Süreç Yönetimi',
    desc: 'Üniversite seçiminden uçak biletine kadar tüm süreci sizin adınıza yönetiyoruz.',
  },
  {
    Icon: ShieldCheck,
    title: 'Güvenli ve Şeffaf Süreç',
    desc: 'YÖK denkliğine uygun, net ücretlendirme ve şeffaf bir yol haritasıyla çalışıyoruz.',
  },
  {
    Icon: Headphones,
    title: '7/24 Uzman Desteği',
    desc: 'Süreç boyunca size özel danışmanınız her aşamada yanınızda.',
  },
]

export default function WhyUs() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-34">

        {/* Üst başlık satırı */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12">
          {/* Sol — badge + başlık */}
          <div className="lg:max-w-[420px]">
            <div className="mb-5">
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-500 mb-2">Avantajlar</p>
              <div className="relative h-px bg-gray-300 w-40">
                <div className="absolute left-0 top-0 w-8 h-[2px] bg-gray-500 -translate-y-px" />
              </div>
            </div>
            <RevealText
              as="h2"
              className="text-[clamp(2rem,3.4vw,2.9rem)] font-bold text-[#1c1c1e] leading-[1.1] tracking-tight"
              text={"Neden Portal\nYurtdışı'nı Seçmelisiniz?"}
            />
          </div>

          {/* Orta — açıklama */}
          <p className="lg:max-w-[300px] text-[15px] text-gray-500 leading-relaxed">
            Üniversite seçiminden vize onayına kadar — derinlik ve güvenden ödün
            vermeden, hızlı ve net çözümler.
          </p>

          {/* Sağ — CTA buton + ok */}
          <div className="inline-flex gap-px flex-shrink-0 self-start lg:self-auto">
            <Link
              href="/basvuru"
              className="bg-[#f04420] hover:bg-[#d93a1a] text-white text-[15px] font-semibold px-7 py-4 flex items-center transition-colors"
            >
              Ücretsiz Danışmanlık
            </Link>
            <Link
              href="/basvuru"
              aria-label="Başvuru"
              className="bg-[#f04420] hover:bg-[#d93a1a] text-white px-4 flex items-center transition-colors"
            >
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Kart grid'i */}
        <div className="mt-14 lg:mt-16 grid grid-cols-1 md:grid-cols-3 border-t border-l border-gray-200">
          {features.map((f, i) => {
            const Icon = f.Icon
            return (
              <Reveal
                key={i}
                y={18}
                delay={(i % 3) * 0.07}
                className="border-r border-b border-gray-200 p-8 lg:p-9 flex flex-col min-h-[230px]"
              >
                <Icon size={26} strokeWidth={1.75} className="text-[#f04420]" />
                <div className="mt-auto pt-10">
                  <h3 className="text-[16px] font-bold text-[#1c1c1e]">{f.title}</h3>
                  <p className="mt-2 text-[14px] text-gray-500 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
