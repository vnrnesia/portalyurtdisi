// ─────────────────────────────────────────────────────────────
// Portal Yurtdışı — Merkezi Veri Kaynağı
// Hem site bileşenleri (UniversityGrid) hem de Portal GPT (AI) bu
// dosyadan okur. Tek yerden güncelleyince her yer güncellenir.
// ─────────────────────────────────────────────────────────────

export interface University {
  id: string
  name: string
  shortName: string
  country: string
  flag: string
  ranking: string
  founded: number
  students: string
  description: string
  accent: string
  photo: string
  href: string
  // ── AI eşleştirmesi için opsiyonel zenginleştirme alanları ──
  // Doldurdukça Portal GPT daha isabetli öneri yapar.
  city?: string
  language?: string        // örn: 'Rusça', 'İngilizce', 'Rusça/İngilizce'
  programs?: string[]      // örn: ['Tıp', 'Diş Hekimliği', 'Mühendislik']
  tuitionUSD?: string      // örn: '~4.500 $/yıl'
}

export const UNIVERSITIES: University[] = [
  { id: 'mgu',      name: 'Lomonosov Moskova Devlet Üniversitesi',           shortName: 'МГУ',     country: 'Rusya', flag: '🇷🇺', ranking: '126',     founded: 1755, students: '47,000', description: "Rusya'nın en köklü ve prestijli devlet üniversitesi.",                    accent: '#C8102E', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/%D0%9C%D0%93%D0%A3%2C_%D0%B2%D0%B8%D0%B4_%D1%81_%D0%B2%D0%BE%D0%B7%D0%B4%D1%83%D1%85%D0%B0.jpg/1280px-%D0%9C%D0%93%D0%A3%2C_%D0%B2%D0%B8%D0%B4_%D1%81_%D0%B2%D0%BE%D0%B7%D0%B4%D1%83%D1%85%D0%B0.jpg', href: '/sehirler/moskova/mgu' },
  { id: 'bauman',   name: 'Bauman Moskova Devlet Teknik Üniversitesi',       shortName: 'Bauman',  country: 'Rusya', flag: '🇷🇺', ranking: '298',     founded: 1830, students: '19,000', description: "Teknik bilimler ve mühendislikte Rusya'nın zirvesi.",                      accent: '#003087', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Moscow_MSTU_Bauman_main_building_asv2021-08.jpg/1280px-Moscow_MSTU_Bauman_main_building_asv2021-08.jpg', href: '/sehirler/moskova/bauman' },
  { id: 'rudn',     name: 'RUDN Üniversitesi',                               shortName: 'RUDN',    country: 'Rusya', flag: '🇷🇺', ranking: '242',     founded: 1960, students: '33,000', description: '160+ ülkeden öğrenciyle tam uluslararası bir kampüs.',                    accent: '#CE1126', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/%D0%A0%D0%A3%D0%94%D0%9D_2016.jpg/1280px-%D0%A0%D0%A3%D0%94%D0%9D_2016.jpg', href: '/sehirler/moskova/rudn' },
  { id: 'hse',      name: 'HSE Üniversitesi – Moskova',                      shortName: 'HSE',     country: 'Rusya', flag: '🇷🇺', ranking: '206',     founded: 1992, students: '22,000', description: "Ekonomi ve sosyal bilimlerde Rusya'nın lider üniversitesi.",              accent: '#FF6900', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HSE_new_building_%282015-01-22%29_01.jpg/1280px-HSE_new_building_%282015-01-22%29_01.jpg', href: '/sehirler/moskova/hse' },
  { id: 'kfu',      name: 'Kazan Federal Üniversitesi (Rusça)',              shortName: 'КФУ',     country: 'Rusya', flag: '🇷🇺', ranking: '401-450', founded: 1804, students: '52,000', description: "Türki halkların kültürel ortamında güçlü akademik program.",              accent: '#006B3C', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Kazan_Federal_University_building_08-2016.jpg/1280px-Kazan_Federal_University_building_08-2016.jpg', href: '/sehirler/kazan/kfu' },
  { id: 'spbgu',    name: 'St. Petersburg Devlet Üniversitesi',              shortName: 'СПбГУ',   country: 'Rusya', flag: '🇷🇺', ranking: '265',     founded: 1724, students: '25,000', description: "Rusya'nın en eski üniversitesi, 1724'te Peter the Great kurdu.",          accent: '#8B0000', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Spb_Vasilievsky_Island_Twelve_Collegiums_asv2019-09.jpg/1280px-Spb_Vasilievsky_Island_Twelve_Collegiums_asv2019-09.jpg', href: '/sehirler/saint-petersburg/spbgu' },
  { id: 'polytech', name: 'St.Petersburg Devlet Politeknik Üniversitesi',    shortName: 'SPbPU',   country: 'Rusya', flag: '🇷🇺', ranking: '401-450', founded: 1899, students: '33,000', description: "Mühendislik ve teknolojide Rusya'nın öncü kurumu.",                      accent: '#003D7C', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B5%D1%85%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D0%B8%D0%BD%D1%81%D1%82%D0%B8%D1%82%D1%83%D1%82._%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%BE%D0%B5_%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B501.jpg/1280px-%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B5%D1%85%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D0%B8%D0%BD%D1%81%D1%82%D0%B8%D1%82%D1%83%D1%82._%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%BE%D0%B5_%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B501.jpg', href: '/sehirler/saint-petersburg/spbpu' },
  { id: 'itmo',     name: 'ITMO Üniversitesi',                               shortName: 'ITMO',    country: 'Rusya', flag: '🇷🇺', ranking: '360',     founded: 1900, students: '13,000', description: 'Bilgisayar bilimi ve yapay zekada dünya genelinde tanınan merkez.',      accent: '#0077B6', photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/ITMO_University%27s_main_building%2C_August_2016.jpg/1280px-ITMO_University%27s_main_building%2C_August_2016.jpg", href: '/sehirler/saint-petersburg/itmo' },
  { id: 'urfu',     name: 'Ural Federal Üniversitesi',                       shortName: 'UrFU',    country: 'Rusya', flag: '🇷🇺', ranking: '401-450', founded: 1920, students: '50,000', description: "Ural bölgesinin en büyük araştırma ve eğitim merkezi.",                  accent: '#002F6C', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Ural_State_Technical_University_%28August_2022%29_-_1.jpg/1280px-Ural_State_Technical_University_%28August_2022%29_-_1.jpg', href: '/sehirler/yekaterinburg/urfu' },
  { id: 'mephi',    name: 'Moskova Ulusal Araştırma Nükleer Üniversitesi',   shortName: 'MEPhI',   country: 'Rusya', flag: '🇷🇺', ranking: '591',     founded: 1942, students: '7,000',  description: 'Nükleer enerji ve fizik alanında küresel otorite.',                      accent: '#1A5C2A', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D1%8B%D0%B9_%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81_%D0%9C%D0%98%D0%A4%D0%98_%2821.03.2026%29.jpg/1280px-%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D1%8B%D0%B9_%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81_%D0%9C%D0%98%D0%A4%D0%98_%2821.03.2026%29.jpg', href: '/sehirler/moskova/mephi' },
  { id: 'kspeu',    name: 'Kazan Devlet Enerji Üniversitesi',                shortName: 'KSPEU',   country: 'Rusya', flag: '🇷🇺', ranking: '700+',    founded: 1968, students: '8,000',  description: 'Enerji, elektrik ve çevre mühendisliğinde uzmanlaşmış kurum.',          accent: '#E57200', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D0%B3%D0%BE%D1%81%D1%83%D0%B4%D0%B0%D1%80%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9_%D1%8D%D0%BD%D0%B5%D1%80%D0%B3%D0%B5%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82_26_%D0%B0%D0%BF%D1%80%D0%B5%D0%BB%D1%8F_2013_%D0%B3%D0%BE%D0%B4%D0%B0.jpg/1280px-%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D0%B3%D0%BE%D1%81%D1%83%D0%B4%D0%B0%D1%80%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9_%D1%8D%D0%BD%D0%B5%D1%80%D0%B3%D0%B5%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82_26_%D0%B0%D0%BF%D1%80%D0%B5%D0%BB%D1%8F_2013_%D0%B3%D0%BE%D0%B4%D0%B0.jpg', href: '/sehirler/kazan/kgeu' },
  { id: 'kfuen',    name: 'Kazan Federal Üniversitesi (İngilizce)',          shortName: 'KFU EN',  country: 'Rusya', flag: '🇷🇺', ranking: '401-450', founded: 1804, students: '52,000', description: "İngilizce program seçeneğiyle uluslararası öğrencilere tam açık.",        accent: '#007B7F', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Kazan_Federal_University_building_08-2016.jpg/1280px-Kazan_Federal_University_building_08-2016.jpg', href: '/sehirler/kazan/kfu' },
  { id: 'unn',      name: 'Nijniy Novgorod Lobaçevskiy Devlet Üniversitesi', shortName: 'UNN',    country: 'Rusya', flag: '🇷🇺', ranking: '501-550', founded: 1916, students: '30,000', description: "Matematikçi Lobaçevskiy'nin adını taşıyan köklü araştırma üniversitesi.", accent: '#A0001E', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Lobachevsky_University._Faculty_of_Philology_03.jpg/1280px-Lobachevsky_University._Faculty_of_Philology_03.jpg', href: '/sehirler/nijni-novgorod/nngu' },
  { id: 'hsenn',    name: 'Nijniy Novgorod HSE Üniversitesi',                shortName: 'HSE NN',  country: 'Rusya', flag: '🇷🇺', ranking: '206',     founded: 1996, students: '2,700',  description: 'HSE ağının Nijniy Novgorod kampüsü — bilgisayar ve ekonomi odaklı.',   accent: '#FF6900', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HSE_new_building_%282015-01-22%29_01.jpg/1280px-HSE_new_building_%282015-01-22%29_01.jpg', href: '/sehirler/nijni-novgorod/nngu' },
]

// ── Ülke / hizmet kapsamımız (Portal GPT bağlamı) ──
export const COUNTRY_SERVICES = [
  { country: 'Rusya',    flag: '🇷🇺', note: 'Devlet üniversitelerinde lisans/yüksek lisans, Rusça ve İngilizce programlar, hazırlık (dil) okulu, öğrenci vizesi, yerleşim ve oturum desteği.' },
  { country: 'Polonya',  flag: '🇵🇱', note: 'Avrupa diploması, İngilizce programlar, uygun bütçe, Schengen öğrenci vizesi, part-time çalışma imkânı.' },
  { country: 'İspanya',  flag: '🇪🇸', note: 'İngilizce/İspanyolca programlar, dil okulları, yüksek yaşam kalitesi, Schengen öğrenci vizesi.' },
]

export const SERVICE_SCOPE = [
  'Yurtdışı eğitim danışmanlığı (üniversite ve bölüm seçimi, başvuru, kabul takibi)',
  'Yerleşim ve adaptasyon (konaklama, havalimanı karşılama, oturum, banka, SIM)',
  'Vize danışmanlığı (Schengen ve Rusya — öğrenci, turistik, çalışma, aile)',
  'İş birliği / partner programı',
]

// ── Portal GPT için system prompt bağlamını üretir ──
export function buildPortalContext(): string {
  const unis = UNIVERSITIES.map((u) => {
    const extra = [
      u.programs?.length ? `Programlar: ${u.programs.join(', ')}` : null,
      u.language ? `Dil: ${u.language}` : null,
      u.tuitionUSD ? `Ücret: ${u.tuitionUSD}` : null,
    ].filter(Boolean).join(' | ')
    return `- ${u.name} (${u.country}, sıralama: ${u.ranking}). ${u.description}${extra ? ' ' + extra : ''}`
  }).join('\n')

  const countries = COUNTRY_SERVICES.map((c) => `- ${c.country}: ${c.note}`).join('\n')
  const scope = SERVICE_SCOPE.map((s) => `- ${s}`).join('\n')

  return `PORTAL YURTDIŞI — HİZMET VERDİĞİMİZ ÜLKELER:\n${countries}\n\nHİZMET KAPSAMIMIZ:\n${scope}\n\nPARTNER ÜNİVERSİTELERİMİZ (yalnızca bu listeden öner):\n${unis}`
}
