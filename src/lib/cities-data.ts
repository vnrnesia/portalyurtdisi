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
  // ── Moskova ────────────────────────────────────────────────────────────────
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

  // ── Saint Petersburg ──────────────────────────────────────────────────────
  {
    slug: 'saint-petersburg',
    name: 'Saint Petersburg',
    nameRu: 'Санкт-Петербург',
    subtitle: 'Kültür & Bilim Şehri',
    quote: 'PETERSBURG, BİR ŞEHİR DEĞİL; BİR DÜŞÜNCE BIÇIMIDIR',
    quoteAuthor: 'Fyodor Dostoyevski',
    paragraphs: [
      "Saint Petersburg, Rusya'nın \"kültür başkenti\" olarak bilinir. Dünyaca ünlü Hermitage Müzesi, görkemli saraylar ve köklü akademik geçmişiyle birleşen bu şehir, hem sanat hem de bilim insanlarına ilham veren eşsiz bir ortam sunar.",
      "Rusya'nın en prestijli üniversitelerinden SPbGU ve ITMO'ya ev sahipliği yapan Petersburg, özellikle mühendislik, bilgisayar bilimleri ve beşeri bilimler alanında uluslararası alanda tanınan eğitim olanakları sunmaktadır.",
      "Moskova'ya kıyasla biraz daha sakin ve öğrenci dostu bir şehir olan Saint Petersburg'da aylık ortalama 22.000–25.000 TL bütçeyle rahat bir öğrenci hayatı sürdürmek mümkündür.",
    ],
    image: '/cities/petersburg.png',
    monthlyCost: '22.000 TL',
    universities: [
      {
        slug: 'spbgu',
        name: 'Saint Petersburg Devlet Üniversitesi',
        shortName: 'SPbGU',
        logo: '/universiteler/SPbGU_Logo.png',
        ranking: 'QS Dünya #242 · Rusya #2',
        tagline: 'Rusya\'nın İkinci En Prestijli Devlet Üniversitesi',
        description:
          "1724 yılında Büyük Petro tarafından kurulan Saint Petersburg Devlet Üniversitesi, Rusya'nın en köklü ve ikinci en prestijli üniversitesidir. Hukuk, iktisat, tıp, matematik ve beşeri bilimler başta olmak üzere geniş bir akademik yelpaze sunar. Mezunları arasında Lenin ve Putin gibi dünya çapında tanınan isimler yer almaktadır.",
        highlights: [
          { label: 'Kuruluş', value: '1724' },
          { label: 'Öğrenci', value: '30.000+' },
          { label: 'Fakülte', value: '24' },
          { label: 'Nobel Mezun', value: '9' },
        ],
        programs: [
          {
            category: 'Hukuk & Sosyal Bilimler',
            items: ['Hukuk', 'Uluslararası İlişkiler', 'Siyaset Bilimi', 'Sosyoloji', 'İktisat'],
          },
          {
            category: 'Fen & Doğa Bilimleri',
            items: ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Coğrafya'],
          },
          {
            category: 'Tıp & Sağlık',
            items: ['Tıp (6 yıl)', 'Diş Hekimliği', 'Farmasötik'],
          },
        ],
        requirements: [
          'Lise diploması (apostil onaylı)',
          'Pasaport (en az 2 yıl geçerli)',
          'Rusça dil belgesi veya hazırlık yılı kaydı',
          'Sağlık raporu',
          'Fotoğraf ve başvuru formu',
        ],
        tuition: '220.000 – 420.000 TL / yıl',
        founded: '1724',
      },
      {
        slug: 'itmo',
        name: 'ITMO Üniversitesi',
        shortName: 'ITMO',
        logo: '/universiteler/itmo.png',
        ranking: 'QS Dünya #360 · Rusya BT #1',
        tagline: 'Rusya\'nın Dijital ve Teknoloji Lideri',
        description:
          "ITMO Üniversitesi, Rusya'nın bilişim teknolojileri, optik mühendislik ve yapay zeka alanlarında en güçlü kurumudur. Uluslararası programlama olimpiyatlarında (ICPC) dünya rekoru kıran takımlarıyla tanınan ITMO, özellikle yazılım, veri bilimi ve siber güvenlik alanında kariyer hedefleyen öğrenciler için ideal bir tercih.",
        highlights: [
          { label: 'Kuruluş', value: '1900' },
          { label: 'Öğrenci', value: '16.000+' },
          { label: 'İngilizce Program', value: '45+' },
          { label: 'ICPC Şampiyonluğu', value: '7×' },
        ],
        programs: [
          {
            category: 'Bilişim & Yapay Zeka',
            items: ['Yazılım Mühendisliği', 'Yapay Zeka', 'Veri Bilimi', 'Siber Güvenlik', 'Bilgisayar Bilimleri'],
          },
          {
            category: 'Mühendislik',
            items: ['Optik Mühendislik', 'Fotonik', 'Robotik', 'Elektronik'],
          },
          {
            category: 'Yönetim & Tasarım',
            items: ['Teknoloji Yönetimi', 'Dijital Tasarım', 'İnovasyon Yönetimi'],
          },
        ],
        requirements: [
          'Lise diploması (tercihen sayısal ağırlıklı)',
          'Pasaport',
          'Matematik ve fizik transkripti',
          'Rusça veya İngilizce yeterlilik belgesi',
          'Sağlık raporu',
        ],
        tuition: '260.000 – 420.000 TL / yıl',
        founded: '1900',
      },
      {
        slug: 'spbpu',
        name: "Büyük Petro Adına Saint Petersburg Politeknik Üniversitesi",
        shortName: 'SPbPU',
        logo: '/universiteler/peter-the-great-st-petersburg-polytechnic-university.png',
        ranking: 'QS Dünya #392 · Rusya Mühendislik #2',
        tagline: 'Mühendislik ve Sanayide Köklü Bir Kurum',
        description:
          "1899 yılında kurulan Saint Petersburg Politeknik Üniversitesi (SPbPU), Rusya'nın önde gelen teknik üniversitelerinden biridir. Mekanik mühendislik, enerji, inşaat ve bilgisayar bilimleri alanlarında güçlü lisans ve lisansüstü programlar sunmaktadır. Sanayiyle derin bağları, öğrencilere staj ve proje temelli öğrenme imkânları sağlar.",
        highlights: [
          { label: 'Kuruluş', value: '1899' },
          { label: 'Öğrenci', value: '29.000+' },
          { label: 'Bölüm', value: '120+' },
          { label: 'Sanayi Ortağı', value: '500+' },
        ],
        programs: [
          {
            category: 'Mühendislik',
            items: ['Makine Mühendisliği', 'İnşaat Mühendisliği', 'Enerji Mühendisliği', 'Havacılık'],
          },
          {
            category: 'Bilişim',
            items: ['Bilgisayar Mühendisliği', 'Yazılım Geliştirme', 'Ağ Sistemleri'],
          },
          {
            category: 'Ekonomi',
            items: ['Ekonomi', 'Yönetim', 'Uluslararası İşletme'],
          },
        ],
        requirements: [
          'Lise diploması',
          'Pasaport',
          'Rusça dil belgesi veya hazırlık yılı',
          'Sağlık raporu ve fotoğraf',
        ],
        tuition: '200.000 – 350.000 TL / yıl',
        founded: '1899',
      },
    ],
  },

  // ── Kazan ─────────────────────────────────────────────────────────────────
  {
    slug: 'kazan',
    name: 'Kazan',
    nameRu: 'Казань',
    subtitle: "Tataristan'ın İncisi",
    quote: 'KAZAN, İKİ DÜNYANIN BULUŞTUĞU EŞSIZ BİR ŞEHİRDİR',
    quoteAuthor: 'Leo Tolstoy',
    paragraphs: [
      "Kazan, Rusya'nın en renkli ve kültürel açıdan en zengin şehirlerinden biridir. Tataristan Cumhuriyeti'nin başkenti olan Kazan, Rus ve Tatar kültürünü harmanlayan eşsiz bir atmosfere sahiptir. Türk öğrenciler için dil ve kültür yakınlığı açısından Rusya'nın en erişilebilir şehirlerinden biridir.",
      "Kazan Federal Üniversitesi ile birlikte uluslararası alanda tanınan yükseköğretim kurumlarına ev sahipliği yapan Kazan, son yıllarda öğrenci nüfusunun hızla arttığı ve kampüs hayatının giderek zenginleştiği dinamik bir şehirdir.",
      "Kazan, Moskova ve Saint Petersburg'a kıyasla çok daha uygun fiyatlıdır. Aylık 15.000–18.000 TL bütçeyle konforlu bir öğrenci hayatı sürdürebilirsiniz.",
    ],
    image: '/cities/view-of-the-kazan-kremlin-2026-03-24-08-50-35-utc.jpg',
    monthlyCost: '16.000 TL',
    universities: [
      {
        slug: 'kfu',
        name: 'Kazan Federal Üniversitesi',
        shortName: 'KFU',
        logo: '/universiteler/kfu.png',
        ranking: 'QS Dünya #601–650 · Rusya #6',
        tagline: "Rusya'nın En Köklü Bölgesel Üniversitesi",
        description:
          "1804 yılında kurulan Kazan Federal Üniversitesi (KFU), dünyanın en eski üniversitelerinden biridir. Kimya, matematik ve tıp alanlarında 200 yıllık köklü bir araştırma geleneğine sahip olan KFU, Rusya'nın Moskova dışındaki en prestijli üniversitelerinden biri olarak kabul edilmektedir. Türk öğrenciler için özel destek programları ve burs imkânları sunmaktadır.",
        highlights: [
          { label: 'Kuruluş', value: '1804' },
          { label: 'Öğrenci', value: '50.000+' },
          { label: 'Uluslararası Öğrenci', value: '6.000+' },
          { label: 'Enstitü', value: '18' },
        ],
        programs: [
          {
            category: 'Tıp & Sağlık',
            items: ['Tıp (6 yıl)', 'Diş Hekimliği', 'Eczacılık', 'Hemşirelik'],
          },
          {
            category: 'Fen & Mühendislik',
            items: ['Kimya', 'Fizik', 'Bilgisayar Bilimleri', 'Petrol Mühendisliği'],
          },
          {
            category: 'Sosyal & Beşeri Bilimler',
            items: ['Hukuk', 'İktisat', 'Uluslararası İlişkiler', 'Dil Bilimleri'],
          },
        ],
        requirements: [
          'Lise diploması (apostil onaylı)',
          'Pasaport',
          'Sağlık raporu',
          'Rusça hazırlık yılı mevcut (ücretli ve ücretsiz seçenekler)',
          'Fotoğraf ve başvuru formu',
        ],
        tuition: '170.000 – 350.000 TL / yıl',
        founded: '1804',
      },
      {
        slug: 'kgeu',
        name: 'Kazan Devlet Enerji Üniversitesi',
        shortName: 'KGEU',
        logo: '/universiteler/kgeu.png',
        ranking: 'Rusya Enerji Sektörü #3',
        tagline: 'Enerji ve Elektrik Mühendisliğinde Uzmanlaşmış',
        description:
          "Kazan Devlet Enerji Üniversitesi (KGEU), enerji sistemleri, elektrik mühendisliği ve ısı tekniği alanlarında Rusya'nın en güçlü uzmanlaşmış üniversitelerinden biridir. Rusya'nın büyük enerji şirketleriyle güçlü sanayi bağlantıları, mezunlara doğrudan iş imkânı sunmaktadır. Makul ücretler ve öğrenci dostu kampüsüyle Türk öğrenciler arasında popüler bir tercih haline gelmektedir.",
        highlights: [
          { label: 'Kuruluş', value: '1968' },
          { label: 'Öğrenci', value: '12.000+' },
          { label: 'Bölüm', value: '35+' },
          { label: 'Sanayi Ortağı', value: '200+' },
        ],
        programs: [
          {
            category: 'Enerji & Elektrik',
            items: ['Elektrik Mühendisliği', 'Enerji Sistemleri', 'Yenilenebilir Enerji', 'Isı Tekniği'],
          },
          {
            category: 'Bilişim',
            items: ['Bilgisayar Bilimleri', 'Otomasyon', 'Mekatronik'],
          },
          {
            category: 'Ekonomi',
            items: ['Enerji Ekonomisi', 'İşletme Yönetimi'],
          },
        ],
        requirements: [
          'Lise diploması',
          'Pasaport',
          'Rusça hazırlık yılı zorunlu (ücretli)',
          'Sağlık raporu ve fotoğraf',
        ],
        tuition: '130.000 – 230.000 TL / yıl',
        founded: '1968',
      },
    ],
  },

  // ── Yekaterinburg ─────────────────────────────────────────────────────────
  {
    slug: 'yekaterinburg',
    name: 'Yekaterinburg',
    nameRu: 'Екатеринбург',
    subtitle: "Ural'ın Kalbi",
    quote: 'URAL DAĞLARINDAKİ BU ŞEHİR, DOĞU İLE BATI ARASINDAKİ KÖPRÜDÜR',
    quoteAuthor: 'Boris Yeltsin',
    paragraphs: [
      "Yekaterinburg, Rusya'nın dördüncü büyük şehri ve Ural bölgesinin merkezi olup Avrupa ile Asya'nın coğrafi sınırında yer almaktadır. Bu eşsiz konumuyla hem Batı hem de Doğu kültürünü bünyesinde barındıran Yekaterinburg, Rusya'nın en hızlı gelişen sanayi ve teknoloji merkezlerinden biridir.",
      "Ural Federal Üniversitesi başta olmak üzere güçlü teknik üniversitelere ev sahipliği yapan Yekaterinburg, mühendislik, metalürji ve madencilik alanlarında kariyer hedefleyen öğrenciler için Rusya'nın en iyi destinasyonlarından biridir.",
      "Büyük şehirler arasında en uygun yaşam maliyetine sahip kentlerden biri olan Yekaterinburg'da aylık ortalama 18.000 TL yeterli bir bütçe sağlamaktadır.",
    ],
    image: '/cities/yekaterinburg.png',
    monthlyCost: '18.000 TL',
    universities: [
      {
        slug: 'urfu',
        name: 'Ural Federal Üniversitesi',
        shortName: 'UrFU',
        logo: '/universiteler/urfu.png',
        ranking: 'QS Dünya #681–690 · Rusya #8',
        tagline: 'Ural Bölgesinin Lider Araştırma Üniversitesi',
        description:
          "1920 yılında kurulan Ural Federal Üniversitesi (UrFU), Rusya'nın en büyük bölgesel üniversitelerinden biridir. Metalurji, madencilik, nükleer enerji ve makine mühendisliği alanlarında yüzyıllık bir deneyime sahip olan UrFU, Ural sanayi bölgesinin en güçlü akademik kurumudur. Geniş burs imkânları ve uluslararası öğrenci programları ile Türk öğrencilere cazip fırsatlar sunmaktadır.",
        highlights: [
          { label: 'Kuruluş', value: '1920' },
          { label: 'Öğrenci', value: '36.000+' },
          { label: 'Bölüm', value: '400+' },
          { label: 'Uluslararası Öğrenci', value: '4.500+' },
        ],
        programs: [
          {
            category: 'Mühendislik & Sanayi',
            items: ['Metalurji', 'Makine Mühendisliği', 'Madencilik', 'Kimya Mühendisliği', 'İnşaat'],
          },
          {
            category: 'Enerji & Çevre',
            items: ['Nükleer Enerji', 'Enerji Sistemleri', 'Çevre Mühendisliği'],
          },
          {
            category: 'Ekonomi & Yönetim',
            items: ['İktisat', 'İşletme', 'Uluslararası Ticaret', 'Kamu Yönetimi'],
          },
        ],
        requirements: [
          'Lise diploması (apostil onaylı)',
          'Pasaport',
          'Rusça dil belgesi veya hazırlık yılı kaydı',
          'Sağlık raporu ve fotoğraf',
          'Başvuru formu',
        ],
        tuition: '160.000 – 300.000 TL / yıl',
        founded: '1920',
      },
    ],
  },

  // ── Nizhny Novgorod ───────────────────────────────────────────────────────
  {
    slug: 'nijni-novgorod',
    name: 'Nizhny Novgorod',
    nameRu: 'Нижний Новгород',
    subtitle: "Volga'nın İncisi",
    quote: 'NİJNİ NOVGOROD, RUS TİCARET VE KÜLTÜRÜNÜN TAŞIDIĞI EFSANEVI BİR ŞEHİRDİR',
    quoteAuthor: 'Maksim Gorki',
    paragraphs: [
      "Nizhny Novgorod, Moskova'nın 400 km doğusunda, Volga ve Oka nehirlerinin kesişim noktasında yer alan tarihi bir şehirdir. Rusya'nın beşinci büyük şehri olan Nizhny Novgorod, otomotiv, savunma sanayi ve bilişim alanlarında önemli bir sanayi merkezidir.",
      "Lobachevsky Devlet Üniversitesi ile bilinçli bir akademik geleneğe ev sahipliği yapan şehir, özellikle matematik, fizik ve bilgisayar bilimleri alanında güçlü programlar sunmaktadır. Rus öğrenci topluluğunun yoğun olduğu şehirde öğrenciler Rusçalarını hızla geliştirmektedir.",
      "Yaşam maliyeti açısından Moskova'nın yaklaşık yarısı kadar olan Nizhny Novgorod'da aylık 15.000 TL ile rahat bir öğrenci hayatı mümkündür.",
    ],
    image: '/cities/nijniy.png',
    monthlyCost: '15.000 TL',
    universities: [
      {
        slug: 'nngu',
        name: 'N.İ. Lobachevsky Adına Nizhny Novgorod Devlet Üniversitesi',
        shortName: 'NNGU',
        logo: '/universiteler/lobachevsky.png',
        ranking: 'QS Dünya #801–1000 · Rusya #10',
        tagline: "Matematik ve Doğa Bilimlerinde Köklü Bir Kurum",
        description:
          "1916 yılında kurulan Nizhny Novgorod Devlet Üniversitesi (NNGU), Rus matematikçi Nikolai Lobachevsky'nin adını taşımaktadır. Matematik, fizik, radyofizik ve kimya alanlarındaki güçlü araştırma geleneğiyle tanınan NNGU, Rusya'nın saygın bölgesel devlet üniversiteleri arasında yer almaktadır. Uluslararası öğrencilere yönelik hazırlık programı ve burs imkânları mevcuttur.",
        highlights: [
          { label: 'Kuruluş', value: '1916' },
          { label: 'Öğrenci', value: '30.000+' },
          { label: 'Fakülte', value: '17' },
          { label: 'Araştırma Enstitüsü', value: '10+' },
        ],
        programs: [
          {
            category: 'Fen Bilimleri',
            items: ['Matematik', 'Fizik', 'Radyofizik', 'Kimya', 'Biyoloji'],
          },
          {
            category: 'Mühendislik & Bilişim',
            items: ['Bilgisayar Bilimleri', 'Bilgi Güvenliği', 'Elektrik-Elektronik', 'Mekatronik'],
          },
          {
            category: 'Sosyal & Beşeri Bilimler',
            items: ['İktisat', 'Hukuk', 'Tarih', 'Uluslararası İlişkiler'],
          },
        ],
        requirements: [
          'Lise diploması (apostil onaylı)',
          'Pasaport',
          'Rusça hazırlık yılı mevcut',
          'Sağlık raporu ve fotoğraf',
          'Başvuru formu',
        ],
        tuition: '140.000 – 270.000 TL / yıl',
        founded: '1916',
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
