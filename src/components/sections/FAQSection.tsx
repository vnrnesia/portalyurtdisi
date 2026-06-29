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
    q: 'Yurtdışı eğitim danışmanlığı nedir?',
    a: 'Yurtdışı eğitim danışmanlığı; öğrencilerin üniversite başvurusu, kabul alma, vize işlemleri ve konaklama planlaması gibi tüm adımlarda profesyonel destek almasını sağlayan hizmettir. Özellikle Rusya, İspanya ve Polonya gibi destinasyonlarda başvuru süreçleri karmaşık olabildiğinden danışmanlık büyük avantaj sağlar; başvurudan mezuniyete kadar tüm yurtdışı eğitim sürecinizi sizin adınıza yönetiyoruz.',
  },
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
    q: 'Hangi ülkelerde YKS şartsız üniversite okunabilir?',
    a: 'Birçok ülkede Türkiye\'deki gibi merkezi sınav (YKS) şartı yoktur. Özellikle Rusya, Polonya, Macaristan ve İspanya gibi ülkelerde YKS şartı olmadan üniversite başvurusu yapmak mümkündür.',
  },
  {
    q: 'Schengen ülkelerinde öğrenci vizesi almak zor mu?',
    a: 'Schengen öğrenci vizesi, doğru ve eksiksiz evraklarla başvuru yapıldığında zor bir süreç değildir. Ancak finansal yeterlilik, eğitim planı ve ülkeye geri dönüş niyeti net biçimde ortaya konmazsa reddedilme riski artabilir.',
  },
  {
    q: 'Vize reddi almadan yurtdışı eğitime nasıl başvurabilirim?',
    a: 'Profesyonel danışmanlıkla hazırlanan başvurularda evrak hataları, yanlış finansal sunum ve eksik dosya gibi riskler en aza indirilir. Bu da vize reddi ihtimalini ciddi şekilde düşürür.',
  },
  {
    q: 'Rusya\'da YKS\'ye girmeden hangi bölümlerde üniversite okuyabilirim?',
    a: 'Rusya\'da üniversite eğitimi için YKS şartı aranmaz; öğrenciler lise diplomasıyla doğrudan başvuru yapabilir. Tıp, diş hekimliği, eczacılık, mühendislik (bilgisayar, makine, elektrik-elektronik vb.), işletme ve ekonomi, uluslararası ilişkiler, bilişim ve yazılım teknolojileri ile sosyal bilimler ve psikoloji gibi bölümlerde sınavsız kabul yaygındır. Birçok üniversite, hazırlık yılı (foundation year) üzerinden öğrenci kabul ederek doğrudan eğitime başlama imkânı sunar.',
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
  const [active, setActive] = useState(0)
  const dirRef = useRef(1)
  const frontRef = useRef<HTMLImageElement>(null)
  const backRef = useRef<HTMLImageElement>(null)
  const nameRef = useRef<HTMLSpanElement>(null)
  const mounted = useRef(false)
  const n = CONSULTANTS.length

  const go = (dir: number) => {
    dirRef.current = dir
    setActive((p) => (p + dir + n) % n)
  }

  // 5 sn'de bir sağdaki danışmana geç (loop). Manuel tıklamada sayaç sıfırlanır.
  useEffect(() => {
    const t = setTimeout(() => go(1), 5000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  // Yön duyarlı kaydırma animasyonu
  useEffect(() => {
    const dir = dirRef.current
    if (!mounted.current) { mounted.current = true; return }

    if (frontRef.current && backRef.current) {
      gsap.set(frontRef.current, { xPercent: dir * 100 })
      gsap.set(backRef.current, { xPercent: 0 })
      gsap.to(frontRef.current, { xPercent: 0, duration: 0.55, ease: 'power3.out' })
      gsap.to(backRef.current, { xPercent: -dir * 100, duration: 0.55, ease: 'power3.out' })
    }
    if (nameRef.current) {
      gsap.fromTo(nameRef.current, { xPercent: dir * 100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
    }
  }, [active])

  const prevIdx = (active - 1 + n) % n
  const nextIdx = (active + 1) % n
  const backIdx = (active - dirRef.current + n) % n

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
              <div className="flex items-center gap-5">
                {/* Foto coverflow — yanlar küçük & soluk, orta büyük; yön duyarlı slide */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Sol (önceki) */}
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label={CONSULTANTS[prevIdx].name}
                    className="w-9 h-9 rounded-lg overflow-hidden bg-gray-200 opacity-40 hover:opacity-75 transition-opacity"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={CONSULTANTS[prevIdx].photo} alt="" className="w-full h-full object-cover" />
                  </button>

                  {/* Orta (aktif) — iki katmanlı slide */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-200 ring-2 ring-[#f04420]/25">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img ref={backRef} src={CONSULTANTS[backIdx].photo} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      ref={frontRef}
                      src={CONSULTANTS[active].photo}
                      alt={CONSULTANTS[active].name}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden' }}
                    />
                  </div>

                  {/* Sağ (sonraki) */}
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label={CONSULTANTS[nextIdx].name}
                    className="w-9 h-9 rounded-lg overflow-hidden bg-gray-200 opacity-40 hover:opacity-75 transition-opacity"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={CONSULTANTS[nextIdx].photo} alt="" className="w-full h-full object-cover" />
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  {/* İsim — mask animasyonu için overflow-hidden sarmalayıcı */}
                  <span className="block overflow-hidden h-[19px]">
                    <span ref={nameRef} className="block text-[14px] font-bold text-gray-900 leading-[19px] will-change-transform">
                      {CONSULTANTS[active].name}
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
