import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle, ChevronRight } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/Footer'
import ContactFormSection from '@/components/sections/ContactFormSection'
import { cities, getCity, getUniversity } from '@/lib/cities-data'

export function generateStaticParams() {
  return cities.flatMap(c =>
    c.universities.map(u => ({ sehir: c.slug, uni: u.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sehir: string; uni: string }>
}) {
  const { sehir, uni } = await params
  const university = getUniversity(sehir, uni)
  if (!university) return {}
  return {
    title: `${university.name} – Portal Yurtdışı`,
    description: university.description,
  }
}

export default async function UniversityPage({
  params,
}: {
  params: Promise<{ sehir: string; uni: string }>
}) {
  const { sehir, uni } = await params
  const city = getCity(sehir)
  const university = getUniversity(sehir, uni)
  if (!city || !university) notFound()

  return (
    <>
      <Header />
      <main>

        {/* ── Hero ── */}
        <section className="bg-[#1c1c1c] pt-12 pb-16">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/40 text-[12px] font-medium mb-10">
              <Link href="/" className="hover:text-white/70 transition-colors">Ana Sayfa</Link>
              <ChevronRight size={12} />
              <span className="text-white/40">Şehirler</span>
              <ChevronRight size={12} />
              <Link href={`/sehirler/${city.slug}`} className="hover:text-white/70 transition-colors">
                {city.name}
              </Link>
              <ChevronRight size={12} />
              <span className="text-white/80">{university.shortName}</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
              <div>
                {/* Logo */}
                <div className="h-16 mb-8 flex items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={university.logo}
                    alt={university.shortName}
                    className="h-full w-auto max-w-[200px] object-contain brightness-0 invert"
                  />
                </div>

                <p className="text-[#f04420] text-[11px] font-semibold tracking-[0.4em] uppercase mb-3">
                  {university.shortName} · Kuruluş {university.founded}
                </p>
                <h1 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-white leading-tight tracking-tight max-w-2xl">
                  {university.name}
                </h1>
                {university.ranking && (
                  <p className="text-white/40 text-[13px] mt-3">{university.ranking}</p>
                )}
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f04420] text-white text-[14px] font-semibold rounded-full hover:bg-[#d93a1a] transition-colors shrink-0"
              >
                Başvuru Yap <ArrowRight size={14} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Highlights ── */}
        <section className="bg-[#f4f4f2] border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-8 lg:px-16 py-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {university.highlights.map(h => (
                <div key={h.label}>
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-1">
                    {h.label}
                  </p>
                  <p className="text-[1.6rem] font-bold text-gray-900 leading-tight">{h.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Description + Programs + Requirements ── */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <div className="grid lg:grid-cols-[1fr_400px] gap-16 lg:gap-24">

              {/* Left: Description + Programs */}
              <div>
                {/* About */}
                <div className="mb-14">
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f04420]" />
                    <span className="text-[11px] font-semibold tracking-[0.42em] uppercase text-[#f04420]">
                      HAKKINDA
                    </span>
                  </div>
                  <p className="text-gray-600 text-[15px] leading-relaxed">{university.description}</p>
                </div>

                {/* Programs */}
                <div>
                  <div className="flex items-center gap-2.5 mb-7">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f04420]" />
                    <span className="text-[11px] font-semibold tracking-[0.42em] uppercase text-[#f04420]">
                      BÖLÜMLER
                    </span>
                  </div>
                  <div className="space-y-6">
                    {university.programs.map(group => (
                      <div key={group.category}>
                        <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
                          {group.category}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {group.items.map(item => (
                            <span
                              key={item}
                              className="px-3 py-1.5 bg-[#f9f9f7] border border-gray-100 rounded-full text-[13px] text-gray-700 font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Requirements + Tuition */}
              <div className="space-y-6">

                {/* Requirements */}
                <div className="bg-[#f9f9f7] rounded-2xl p-7 border border-gray-100">
                  <p className="text-[11px] font-semibold tracking-[0.4em] uppercase text-gray-400 mb-5">
                    BAŞVURU GEREKSİNİMLERİ
                  </p>
                  <ul className="space-y-3.5">
                    {university.requirements.map(req => (
                      <li key={req} className="flex items-start gap-3">
                        <CheckCircle size={16} className="text-[#f04420] shrink-0 mt-0.5" strokeWidth={2} />
                        <span className="text-gray-600 text-[13.5px] leading-snug">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA card */}
                <div className="bg-[#f04420] rounded-2xl p-7">
                  <p className="text-white font-bold text-[16px] mb-2">Başvurmaya hazır mısınız?</p>
                  <p className="text-white/75 text-[13px] mb-5 leading-relaxed">
                    Uzman danışmanlarımız tüm süreçte yanınızda. Ücretsiz ön görüşme için hemen iletişime geçin.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#f04420] text-[13px] font-bold rounded-full hover:bg-white/90 transition-colors"
                  >
                    Danışman ile Görüş <ArrowRight size={13} strokeWidth={2.5} />
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Other universities in city ── */}
        <section className="bg-[#f9f9f7] py-16">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <p className="text-[11px] font-semibold tracking-[0.4em] uppercase text-gray-400 mb-6">
              {city.name.toUpperCase()}'DAKİ DİĞER ÜNİVERSİTELER
            </p>
            <div className="flex flex-wrap gap-3">
              {city.universities
                .filter(u => u.slug !== university.slug)
                .map(u => (
                  <Link
                    key={u.slug}
                    href={`/sehirler/${city.slug}/${u.slug}`}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-[13px] text-gray-700 font-medium hover:border-[#f04420]/40 hover:text-[#f04420] transition-colors"
                  >
                    {u.shortName} <ArrowRight size={11} strokeWidth={2.5} />
                  </Link>
                ))}
              <Link
                href={`/sehirler/${city.slug}`}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-[13px] text-gray-700 font-medium hover:border-gray-400 transition-colors"
              >
                {city.name} Sayfasına Dön <ArrowRight size={11} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <ContactFormSection />
      <Footer />
    </>
  )
}
