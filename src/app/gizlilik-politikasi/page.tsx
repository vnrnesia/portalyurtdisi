import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | Portal Yurtdışı',
  description:
    'SF Portal Vize Danışmanlık Eğitim Danışmanlığı Limited Şirketi gizlilik politikası — toplanan bilgiler, kullanım amaçları, çerezler ve veri güvenliği.',
}

const collected = [
  'İletişim formları verileri',
  'Çerez (cookie) verileri',
  'IP adresi ve teknik kullanım verileri',
]

const usage = [
  'Hizmet sunmak',
  'Randevu ve başvuru süreçlerini yürütmek',
  'Kullanıcı deneyimini geliştirmek',
  'Yasal yükümlülükleri yerine getirmek',
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-[clamp(1.2rem,2vw,1.6rem)] font-bold text-[#1c1c1e] tracking-tight">
        {title}
      </h2>
      <div className="mt-3 text-[15px] text-gray-600 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#f04420]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function GizlilikPolitikasiPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="max-w-[820px] mx-auto px-5 sm:px-8 py-16 lg:py-24">
          {/* Başlık */}
          <div className="mb-6">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-500 mb-2">
              Yasal
            </p>
            <div className="relative h-px bg-gray-300 w-40 mb-6">
              <div className="absolute left-0 top-0 w-8 h-[2px] bg-gray-500 -translate-y-px" />
            </div>
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#1c1c1e] leading-[1.1] tracking-tight">
              Gizlilik Politikası
            </h1>
          </div>

          <Section title="Genel">
            <p>
              <strong className="font-semibold text-[#1c1c1e]">
                SF Portal Vize Danışmanlık Eğitim Danışmanlığı Limited Şirketi
              </strong>{' '}
              kullanıcı gizliliğini korumayı taahhüt eder. Bu web sitesi üzerinden toplanan bilgiler
              yalnızca hizmet sunumu amacıyla kullanılmaktadır.
            </p>
          </Section>

          <Section title="Toplanan Bilgiler">
            <BulletList items={collected} />
          </Section>

          <Section title="Bilgilerin Kullanımı">
            <p>Toplanan bilgiler aşağıdaki amaçlarla kullanılır:</p>
            <BulletList items={usage} />
          </Section>

          <Section title="Çerezler (Cookies)">
            <p>
              Site, kullanıcı deneyimini iyileştirmek için çerezler kullanabilir. Kullanıcılar
              tarayıcı ayarlarından çerezleri reddedebilir.
            </p>
          </Section>

          <Section title="Veri Güvenliği">
            <p>
              Veriler yetkisiz erişime karşı korunmak için uygun teknik ve idari tedbirlerle saklanır.
            </p>
          </Section>

          <Section title="Üçüncü Taraf Bağlantılar">
            <p>
              Web sitesinde üçüncü taraf sitelere link verilebilir. Bu sitelerin içeriklerinden
              şirket sorumlu değildir.
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  )
}
