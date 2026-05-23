import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, GraduationCap, MapPin, Wallet } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/Footer'
import ContactFormSection from '@/components/sections/ContactFormSection'
import { cities, getCity } from '@/lib/cities-data'

export function generateStaticParams() {
  return cities.map(c => ({ sehir: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ sehir: string }> }) {
  const { sehir } = await params
  const city = getCity(sehir)
  if (!city) return {}
  return {
    title: `${city.name} – Portal Yurtdışı`,
    description: city.paragraphs[0],
  }
}

export default async function CityPage({ params }: { params: Promise<{ sehir: string }> }) {
  const { sehir } = await params
  const city = getCity(sehir)
  if (!city) notFound()

  return (
    <>
      <Header />
      <main>

        {/* ── Hero ── */}
        <section className="bg-white pt-10">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-gray-400 text-[12px] font-medium tracking-wide mb-6">
              <Link href="/" className="hover:text-gray-700 transition-colors">Ana Sayfa</Link>
              <span className="text-gray-300">/</span>
              <span className="hover:text-gray-700 transition-colors">Şehirler</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-semibold">{city.name}</span>
            </div>

            {/* Rounded image card */}
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '16/6' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={city.image}
                alt={city.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Title below image */}
            <div className="pt-8 pb-14">
              <p className="text-[11px] font-semibold tracking-[0.45em] uppercase text-gray-400 mb-3">
                {city.nameRu}
              </p>
              <h1 className="text-[clamp(3rem,7vw,6.5rem)] font-bold text-gray-900 leading-[0.88] tracking-tight">
                {city.name}
                <span className="block text-[#f04420]">({city.subtitle})</span>
              </h1>
            </div>

          </div>
        </section>

        {/* ── Quote ── */}
        <section className="bg-[#f9f9f7] border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-8 lg:px-16 py-10">
            <p className="text-[13px] font-semibold tracking-[0.06em] text-gray-800 uppercase">
              "{city.quote}"
            </p>
            <p className="text-gray-400 text-[13px] italic mt-1">– {city.quoteAuthor}</p>
          </div>
        </section>

        {/* ── Description + Stats ── */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <div className="grid lg:grid-cols-[1fr_320px] gap-16 lg:gap-24 items-start">

              <div className="space-y-5">
                {city.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-gray-600 text-[15px] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                  />
                ))}
              </div>

              <div className="space-y-4">
                <div className="border border-gray-100 rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f04420]/10 flex items-center justify-center shrink-0">
                    <GraduationCap size={18} className="text-[#f04420]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-1">Üniversite Sayısı</p>
                    <p className="text-2xl font-bold text-gray-900">{city.universities.length}</p>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f04420]/10 flex items-center justify-center shrink-0">
                    <Wallet size={18} className="text-[#f04420]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-1">Aylık Yaşam Maliyeti</p>
                    <p className="text-2xl font-bold text-gray-900">{city.monthlyCost}</p>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f04420]/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-[#f04420]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-1">Şehir</p>
                    <p className="text-2xl font-bold text-gray-900">{city.name}</p>
                    <p className="text-gray-400 text-sm">{city.nameRu}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Universities Grid ── */}
        <section className="bg-[#f9f9f7] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">

            <div className="mb-12">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04420]" />
                <span className="text-[11px] font-semibold tracking-[0.42em] uppercase text-[#f04420]">
                  ÜNİVERSİTELER
                </span>
              </div>
              <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-gray-900 tracking-tight">
                {city.name}&apos;da Partner Üniversitelerimiz
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {city.universities.map(uni => (
                <Link
                  key={uni.slug}
                  href={`/sehirler/${city.slug}/${uni.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 p-7 hover:border-[#f04420]/30 hover:shadow-lg transition-all duration-300"
                >
                  {/* Logo */}
                  <div className="h-14 flex items-center mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={uni.logo}
                      alt={uni.shortName}
                      className="h-full w-auto max-w-[140px] object-contain"
                    />
                  </div>

                  <p className="text-[10px] font-semibold tracking-widest uppercase text-[#f04420] mb-1">
                    {uni.shortName}
                  </p>
                  <h3 className="text-gray-900 font-bold text-[15px] leading-snug mb-2">
                    {uni.name}
                  </h3>
                  {uni.ranking && (
                    <p className="text-gray-400 text-[12px] mb-4">{uni.ranking}</p>
                  )}
                  <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-3">
                    {uni.tagline}
                  </p>

                  <div className="mt-6 flex items-center gap-1.5 text-[#f04420] text-[12px] font-semibold group-hover:gap-3 transition-all">
                    İncele <ArrowRight size={12} strokeWidth={2.5} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <ContactFormSection />
      <Footer />
    </>
  )
}
