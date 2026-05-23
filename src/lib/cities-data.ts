export interface University {
  slug: string
  name: string
  shortName: string
  logo: string
  ranking?: string
  tagline: string
  description: string
  highlights: { label: string; value: string }[]
  programs: { category: string; items: string[] }[]
  requirements: string[]
  tuition: string
  founded: string
}

export interface City {
  slug: string
  name: string
  nameRu: string
  subtitle: string
  quote: string
  quoteAuthor: string
  paragraphs: string[]
  universities: University[]
  image: string
  monthlyCost: string
}

export const cities: City[] = [
  {
    slug: 'moskova',
    name: 'Moskova',
    nameRu: 'Москва',
    subtitle: 'Başkent & Fırsat Şehri',
    quote: 'YURTDIŞI EĞİTİM, DÜNYAYA BAKIŞ AÇIMIZI DEĞİŞTİREN EN ETKİLİ YOLDUR',
    quoteAuthor: 'Chantal Mitchell',
    paragraphs: [
      "Moskova, yalnızca Rusya'nın başkenti değil; aynı zamanda ülkenin ekonomi, finans, teknoloji ve akademi merkezidir. Dünyaca tanınan üniversiteleri, güçlü akademik kadrosu ve uluslararası öğrenci ağıyla Moskova, öğrencilerine sadece diploma değil, global bir vizyon kazandırır.",
      "Büyük şirketlerin merkezleri, geniş staj ve iş imkânları, dinamik şehir hayatı ve güçlü ulaşım ağı sayesinde Moskova'da eğitim almak; kariyer yolculuğunuza en güçlü başlangıcı yapmanızı sağlar.",
      "Moskova, Rusya'nın en büyük ve en gelişmiş şehri olduğu için diğer şehirlere göre biraz daha yüksek maliyetlidir. 30.000 TL öğrenci yurdunda yaşayan bir öğrenci için yeterli olacaktır.",
    ],
    image: '/cities/moscow.png',
    monthlyCost: '30.000 TL',
    universities: [
      {
        slug: 'mgu',
        name: 'Lomonosov Moskova Devlet Üniversitesi',
        shortName: 'MGU (MSU)',
        logo: '/universiteler/lomonosov_moscow_state_university_logo.jpg',
        ranking: 'QS Dünya #87 · Rusya #1',
        tagline: 'Dünya Sıralamalarında İlk 150–200 Bandında',
        description:
          "1755 yılında kurulan Lomonosov Moskova Devlet Üniversitesi, Rusya'nın en prestijli üniversitesidir. Dünya sıralamalarında sürekli ilk 200'de yer alan MGU, 40'tan fazla fakültesi ve 300'den fazla bölümüyle bilim, teknoloji, hukuk, tıp ve beşeri bilimlerde güçlü bir akademik kadro sunar.",
        highlights: [
          { label: 'Kuruluş', value: '1755' },
          { label: 'Öğrenci', value: '47.000+' },
          { label: 'Fakülte', value: '40+' },
          { label: 'Uluslararası Öğrenci', value: '8.000+' },
        ],
        programs: [
          {
            category: 'Mühendislik & Doğa Bilimleri',
            items: ['Fizik', 'Kimya', 'Matematik', 'Bilgisayar Mühendisliği', 'Biyoloji'],
          },
          {
            category: 'Sosyal & İnsani Bilimler',
            items: ['Hukuk', 'İktisat', 'Psikoloji', 'Tarih', 'Felsefe'],
          },
          {
            category: 'Tıp & Sağlık',
            items: ['Tıp (Lisans)', 'Eczacılık', 'Diş Hekimliği'],
          },
        ],
        requirements: [
          "Lise diploması (Türkiye'deki diploma Rusya tarafından tanınmaktadır)",
          'Pasaport (en az 2 yıl geçerli)',
          'Sağlık raporu',
          'Rusça yeterlilik belgesi veya hazırlık yılı kaydı',
          'Başvuru formu ve fotoğraf',
        ],
        tuition: '250.000 – 450.000 TL / yıl',
        founded: '1755',
      },
      {
        slug: 'bauman',
        name: 'Bauman Moskova Devlet Teknik Üniversitesi',
        shortName: 'BMSTU',
        logo: '/universiteler/bmstu.png',
        ranking: 'QS Dünya #311 · Rusya Mühendislik #1',
        tagline: 'Mühendislik ve Teknik Alanlarda Güçlü',
        description:
          "1830 yılında kurulan Bauman Moskova Devlet Teknik Üniversitesi (BMSTU), Rusya'nın en köklü ve saygın teknik üniversitesidir. Havacılık, uzay mühendisliği, robotik, savunma teknolojileri ve bilgi işlem alanlarında dünya çapında tanınan mezunlar yetiştirmektedir.",
        highlights: [
          { label: 'Kuruluş', value: '1830' },
          { label: 'Öğrenci', value: '23.000+' },
          { label: 'Bölüm', value: '60+' },
          { label: 'Araştırma Merkezi', value: '80+' },
        ],
        programs: [
          {
            category: 'Mühendislik',
            items: ['Makine Mühendisliği', 'Havacılık & Uzay', 'Otomotiv Mühendisliği', 'Nükleer Enerji', 'Robotik'],
          },
          {
            category: 'Bilişim & Teknoloji',
            items: ['Yazılım Mühendisliği', 'Bilgisayar Bilimleri', 'Yapay Zeka', 'Siber Güvenlik'],
          },
          {
            category: 'Doğa Bilimleri',
            items: ['Uygulamalı Matematik', 'Fizik Mühendisliği', 'Malzeme Bilimi'],
          },
        ],
        requirements: [
          'Lise diploması (tercihen sayısal ağırlıklı)',
          'Pasaport',
          'Matematik ve fizik notlarını gösteren transkript',
          'Rusça hazırlık yılı (Türkçe kayıt mümkün)',
          'Sağlık raporu ve fotoğraf',
        ],
        tuition: '280.000 – 380.000 TL / yıl',
        founded: '1830',
      },
      {
        slug: 'hse',
        name: 'HSE Üniversitesi (Yüksek Ekonomi Okulu)',
        shortName: 'HSE',
        logo: '/universiteler/hse.png',
        ranking: 'QS Dünya #322 · Rusya Sosyal Bilimler #1',
        tagline: 'Ekonomi, İşletme ve Sosyal Bilimlerde Öne Gelen Kurum',
        description:
          "HSE Üniversitesi (Higher School of Economics), 1992 yılında kurulan ve hızla büyüyerek Rusya'nın önde gelen araştırma üniversitelerinden biri haline gelen modern bir kurumdur. Ekonomi, işletme, hukuk, sosyal bilimler ve dijital teknoloji alanlarında güçlü İngilizce eğitim seçenekleri sunmaktadır.",
        highlights: [
          { label: 'Kuruluş', value: '1992' },
          { label: 'Öğrenci', value: '45.000+' },
          { label: 'İngilizce Program', value: '50+' },
          { label: 'Uluslararası Partner', value: '700+' },
        ],
        programs: [
          {
            category: 'Ekonomi & İşletme',
            items: ['İktisat', 'İşletme', 'Finans', 'Uluslararası Ticaret', 'Pazarlama'],
          },
          {
            category: 'Sosyal Bilimler',
            items: ['Sosyoloji', 'Siyaset Bilimi', 'Uluslararası İlişkiler', 'Psikoloji'],
          },
          {
            category: 'Dijital & Teknoloji',
            items: ['Bilgisayar Bilimleri', 'Veri Analizi', 'Yapay Zeka', 'Tasarım'],
          },
        ],
        requirements: [
          'Lise diploması',
          'Pasaport',
          'İngilizce programlar için IELTS/TOEFL (bazı programlar için)',
          'Başvuru essay\'i',
          'Sağlık raporu',
        ],
        tuition: '300.000 – 500.000 TL / yıl',
        founded: '1992',
      },
      {
        slug: 'rudn',
        name: "Halkların Dostluğu Üniversitesi",
        shortName: 'RUDN',
        logo: '/universiteler/RUDN_logo.png',
        ranking: 'QS Dünya #441 · Uluslararası Çeşitlilik #1',
        tagline: 'En Uluslararası Rus Üniversitesi',
        description:
          "RUDN Üniversitesi (Peoples' Friendship University of Russia), dünyanın en çok ülkeden öğrenci kabul eden üniversitelerinden biridir. 160'tan fazla ülkeden öğrenciye ev sahipliği yapan RUDN, Türk öğrenciler arasında Moskova'nın en popüler üniversitelerinden biridir. Tıp, hukuk, mühendislik ve sosyal bilimlerde güçlü programlar sunmaktadır.",
        highlights: [
          { label: 'Kuruluş', value: '1960' },
          { label: 'Uluslararası Öğrenci', value: '10.000+' },
          { label: 'Ülke', value: '160+' },
          { label: 'Türk Öğrenci', value: '1.500+' },
        ],
        programs: [
          {
            category: 'Tıp & Sağlık',
            items: ['Tıp (6 yıl)', 'Diş Hekimliği', 'Eczacılık', 'Veterinerlik'],
          },
          {
            category: 'Hukuk & Sosyal Bilimler',
            items: ['Hukuk', 'Uluslararası İlişkiler', 'İktisat', 'Sosyoloji'],
          },
          {
            category: 'Mühendislik',
            items: ['Bilgisayar Mühendisliği', 'İnşaat Mühendisliği', 'Çevre Mühendisliği'],
          },
        ],
        requirements: [
          'Lise diploması',
          'Pasaport',
          'Sağlık raporu (tıp için ek muayene)',
          'Fotoğraf',
          'Rusça hazırlık yılı mevcut',
        ],
        tuition: '200.000 – 400.000 TL / yıl',
        founded: '1960',
      },
      {
        slug: 'mephi',
        name: 'Nükleer Araştırma Üniversitesi MEPhI',
        shortName: 'MEPhI',
        logo: '/universiteler/MEPhI_Logo2014_en_.png',
        ranking: 'QS Dünya #536 · Rusya Nükleer & Enerji #1',
        tagline: 'Bilim ve Nükleer Teknoloji Odaklı',
        description:
          "MEPhI (Moscow Engineering Physics Institute), 1942 yılında kurulmuş olup nükleer fizik, enerji teknolojileri ve uygulamalı matematik alanlarında Rusya'nın en elit kurumlarından biridir. Rusya'nın atom enerjisi devlet şirketi Rosatom ile güçlü ortaklığı, mezunlara uluslararası kariyer kapıları açmaktadır.",
        highlights: [
          { label: 'Kuruluş', value: '1942' },
          { label: 'Öğrenci', value: '8.000+' },
          { label: 'Araştırma Lab.', value: '50+' },
          { label: 'Rosatom Ortaklığı', value: 'Var' },
        ],
        programs: [
          {
            category: 'Nükleer & Enerji',
            items: ['Nükleer Fizik', 'Nükleer Enerji Mühendisliği', 'Plazma Fiziği', 'Radyasyon Güvenliği'],
          },
          {
            category: 'Mühendislik & Bilişim',
            items: ['Elektrik-Elektronik Mühendisliği', 'Siber Güvenlik', 'Yapay Zeka'],
          },
          {
            category: 'Temel Bilimler',
            items: ['Teorik Fizik', 'Uygulamalı Matematik', 'Lazer Teknolojisi'],
          },
        ],
        requirements: [
          'Lise diploması (sayısal/fen bilimleri ağırlıklı)',
          'Fizik ve matematik notları yüksek olmalı',
          'Pasaport',
          'Rusça hazırlık yılı zorunlu',
          'Sağlık raporu',
        ],
        tuition: '220.000 – 350.000 TL / yıl',
        founded: '1942',
      },
    ],
  },
]

export function getCity(slug: string): City | null {
  return cities.find(c => c.slug === slug) ?? null
}

export function getUniversity(citySlug: string, uniSlug: string): University | null {
  return getCity(citySlug)?.universities.find(u => u.slug === uniSlug) ?? null
}
