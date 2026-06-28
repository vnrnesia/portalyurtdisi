'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import gsap from 'gsap'

const CONSULTANTS = [
  { name: 'Furkan Ercan', photo: '/danismanlar/furkanercan.png' },
  { name: 'Fırat Böler', photo: '/danismanlar/firatboler.png' },
  { name: 'Sencer Giray Düzenli', photo: '/danismanlar/sencergirayduzenli.png' },
  { name: 'Ferdi Ebinç', photo: '/danismanlar/ferdiebinc.png' },
]

const FAQS = [
  {
    q: 'Yurtdışında üniversite okumak için sınav şart mı?',
    a: 'Hayır. Rusya, Belarus, Kazakistan, Özbekistan ve Azerbaycan gibi birçok ülkede sınavsız lisans ve yüksek lisans programları bulunmaktadır. Program şartları ülke ve üniversiteye göre değişiklik gösterebilir.',
  },
  {
    q: 'Yurtdışı eğitim ücretleri ne kadar?',
    a: 'Rusya\'da devlet üniversitelerinde yıllık eğitim ücreti programa göre 2.000$ ile 6.000$ arasında değişmektedir. Tıp ve diş hekimliği programları bu aralığın üst bölümünde yer alır.',
  },
  {
    q: 'İngilizce seviyem yeterli değil, yine de yurtdışında eğitim alabilir miyim?',
    a: 'Evet. Rusya\'daki birçok üniversite hem Rusça hem de İngilizce müfredatlı programlar sunmaktadır. Ayrıca kayıt öncesi 1 yıllık hazırlık programlarına katılarak dil yeterliliğini kazanabilirsin.',
  },
  {
    q: 'Vize sürecinde destek sağlıyor musunuz?',
    a: 'Evet, davet mektubundan vize başvurusuna kadar tüm süreci sizin adınıza takip ediyoruz. %100 vize başarı oranımızla bugüne kadar hiçbir öğrencimiz vizesiz kalmadı.',
  },
  {
    q: 'Başvuru süreci ne kadar sürer?',
    a: 'Belgelerin tamamlanmasından itibaren ortalama 4–6 hafta içinde kabul mektubunuz hazır olur. Vize süreci de dahil olmak üzere toplam süre genellikle 8–12 haftadır.',
  },
  {
    q: 'Konaklama konusunda yardımcı oluyor musunuz?',
    a: 'Evet. Partner üniversitelerimizin yurt imkânlarını koordine edebilir ya da tercih ettiğiniz şehirde güvenli daire kiralama sürecinde destek sağlayabiliriz.',
  },
  {
    q: 'Rusya\'da Türk öğrenciler için topluluklar var mı?',
    a: 'Kesinlikle. Moskova, Sankt-Peterburg ve Kazan başta olmak üzere Rusya\'nın tüm büyük şehirlerinde aktif Türk öğrenci toplulukları bulunmaktadır.',
  },
  {
    q: 'Danışmanlık hizmetleri ücretli mi?',
    a: 'Hayır. Üniversite seçimi, başvuru ve vize süreçlerindeki danışmanlık hizmetimiz tamamen ücretsizdir. Gelirlerimizi partner üniversitelerimizden sağlamaktayız.',
  },
]

function AccordionItem({ faq, isOpen, onToggle }: { faq: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${isOpen ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'}`}>
          {faq.q}
        </span>
        <span
          className="shrink-0 mt-0.5 text-[#f04420] transition-transform duration-300 ease-in-out"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <Plus size={18} strokeWidth={2} />
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 300}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="pb-5 text-gray-500 text-[14px] leading-relaxed pr-8">
          {faq.a}
        </p>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const flipRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const nameRef = useRef<HTMLSpanElement>(null)
  const idxRef = useRef(0)

  // Danışman 4 sn'de bir kendi etrafında dönerek değişir; isim mask animasyonu ile geçer
  useEffect(() => {
    const id = setInterval(() => {
      const next = (idxRef.current + 1) % CONSULTANTS.length
      const c = CONSULTANTS[next]
      idxRef.current = next

      // Foto — 3D flip (kendi etrafında döner, kenara gelince görsel değişir)
      gsap.timeline()
        .to(flipRef.current, { rotateY: 90, duration: 0.34, ease: 'power2.in' })
        .add(() => { if (imgRef.current) imgRef.current.src = c.photo })
        .fromTo(flipRef.current, { rotateY: -90 }, { rotateY: 0, duration: 0.42, ease: 'power2.out' })

      // İsim — mask animasyonu (eski yukarı çıkar, yeni alttan girer)
      gsap.timeline()
        .to(nameRef.current, { yPercent: -120, duration: 0.3, ease: 'power2.in' })
        .add(() => { if (nameRef.current) nameRef.current.textContent = c.name })
        .fromTo(nameRef.current, { yPercent: 120 }, { yPercent: 0, duration: 0.45, ease: 'power3.out' })
    }, 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="bg-[#f9f9f7] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24">

          {/* ── Left ── */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Label */}
              <div className="mb-5">
                <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-gray-500 mb-2">FAQ</p>
                <div className="relative h-px bg-gray-300 w-full">
                  <div className="absolute left-0 top-0 w-8 h-[2px] bg-gray-500 -translate-y-px" />
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-bold text-gray-900 leading-tight tracking-tight mb-6">
                Aklındaki Sorulara<br />Net Yanıtlar
              </h2>

              {/* Desc */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-px bg-gray-400 mt-3 shrink-0" />
                <p className="text-gray-500 text-[14px] leading-relaxed">
                  Yurtdışı eğitim süreciyle ilgili kafana takılan tüm sorulara burada net ve anlaşılır yanıtlar bulabilirsin.
                </p>
              </div>
            </div>

            {/* Consultant card */}
            <div className="mt-8 lg:mt-14">
              <p className="text-gray-500 text-[13px] leading-relaxed mb-6">
                Uzman danışmanlarımızdan ücretsiz bir ön görüşme planlayıp<br />yurtdışı hayalin için ilk adımı atabilirsin
              </p>
              <div className="flex items-center gap-4">
                {/* Photo — 4 sn'de bir kendi etrafında dönerek değişir */}
                <div className="w-14 h-14 rounded-xl bg-gray-200 shrink-0 overflow-hidden" style={{ perspective: 800 }}>
                  <div ref={flipRef} className="w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      ref={imgRef}
                      src={CONSULTANTS[0].photo}
                      alt="Danışman"
                      className="w-full h-full object-cover"
                      onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden' }}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  {/* İsim — mask animasyonu için overflow-hidden sarmalayıcı */}
                  <span className="block overflow-hidden h-[19px]">
                    <span ref={nameRef} className="block text-[14px] font-bold text-gray-900 leading-[19px] will-change-transform">
                      {CONSULTANTS[0].name}
                    </span>
                  </span>
                  <p className="text-[12px] text-gray-400">Öğrenci Danışmanı</p>
                </div>
                <Link
                  href="/iletisim"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#f04420] hover:bg-[#d93a1a] transition-colors text-white text-[13px] font-semibold rounded-full whitespace-nowrap"
                >
                  Görüşme Planla <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>

          {/* ── Right: Accordion ── */}
          <div className="divide-y divide-gray-200">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
