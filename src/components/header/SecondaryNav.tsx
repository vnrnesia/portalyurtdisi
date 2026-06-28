'use client'

import { ChevronDown, ArrowRight, Check } from 'lucide-react'

type LinkItem = { label: string; href: string }
type FeaturedCard = { title: string; sub: string; cta: string; href: string }

type Section =
  | { kind: 'featured'; heading: string; cards: FeaturedCard[] }
  | { kind: 'links'; heading: string; items: LinkItem[]; gray?: boolean }

type CtaBlock = {
  title?: string
  desc?: string
  bullets?: string[]
  price?: string
  button: string
  href: string
}

type Menu = {
  key: string
  label: string
  sections: Section[]
  cta?: CtaBlock
  footer?: LinkItem[]
  align?: 'left' | 'right'
}

const menus: Menu[] = [
  {
    key: 'ulkeler',
    label: 'Ülkeler',
    align: 'left',
    sections: [
      {
        kind: 'featured',
        heading: 'Öne Çıkanlar',
        cards: [
          { title: 'Rusya’da Eğitim', sub: '2026 Rusya’da TIP Eğitimi', cta: 'Devamını Oku', href: '#' },
          { title: 'İspanya’da Eğitim', sub: 'İspanyolca Dil Eğitimi', cta: 'Devamını Oku', href: '#' },
        ],
      },
      {
        kind: 'links',
        heading: 'Ülkeler',
        gray: true,
        items: [
          { label: 'Rusya', href: '#' },
          { label: 'Polonya', href: '#' },
          { label: 'İspanya', href: '#' },
        ],
      },
    ],
    cta: {
      title: 'Yurtdışında Eğitime İlk Adımı Atın',
      desc: 'Uzman danışmanlarımızla ücretsiz görüşün, size uygun üniversite ve ülkeyi birlikte belirleyelim.',
      button: 'Ücretsiz Ön Görüşme',
      href: '/basvuru',
    },
  },
  {
    key: 'universiteler',
    label: 'Üniversiteler',
    align: 'left',
    sections: [
      {
        kind: 'links',
        heading: 'Popüler Üniversiteler',
        items: [
          { label: 'Moskova Devlet Üniversitesi', href: '#' },
          { label: 'Kazan Federal Üniversitesi', href: '#' },
          { label: 'Clic University', href: '#' },
        ],
      },
      {
        kind: 'links',
        heading: 'Popüler Ülkeler',
        items: [
          { label: 'Rusya', href: '#' },
          { label: 'Polonya', href: '#' },
          { label: 'İspanya', href: '#' },
        ],
      },
      {
        kind: 'links',
        heading: 'Eğitim İmkanları',
        gray: true,
        items: [
          { label: 'Dünya TOP 100 Üniversite', href: '#' },
          { label: 'Ücretsiz Eğitim', href: '#' },
          { label: 'Uygun Fiyatlı Eğitim Seçenekleri', href: '#' },
        ],
      },
    ],
  },
  {
    key: 'programlar',
    label: 'Eğitim Programları',
    align: 'left',
    sections: [
      {
        kind: 'links',
        heading: 'Programlar',
        items: [
          { label: 'Dil Okulları', href: '#' },
          { label: 'Lisans', href: '#' },
          { label: 'Yüksek Lisans', href: '#' },
          { label: 'Master', href: '#' },
          { label: 'Online Eğitim', href: '#' },
        ],
      },
    ],
    cta: {
      title: 'Rusya’da 8 aylık Rusça akademik hazırlık eğitimi',
      bullets: ['Eğitim ücreti', '1 Yıllık konaklama', 'Vize masrafları', 'Uçak bileti'],
      price: 'dahil 5.500$',
      button: 'Ücretsiz Ön Görüşme Al!',
      href: '/basvuru',
    },
  },
  {
    key: 'bolumler',
    label: 'Bölümler',
    align: 'right',
    sections: [
      {
        kind: 'links',
        heading: 'Popüler Bölümler',
        items: [
          { label: 'TIP', href: '#' },
          { label: 'Diş Hekimliği', href: '#' },
          { label: 'Eczacılık', href: '#' },
          { label: 'Veterinerlik', href: '#' },
          { label: 'Yazılım Mühendisliği', href: '#' },
          { label: 'Hukuk', href: '#' },
        ],
      },
    ],
    cta: {
      desc: 'YKS şartı olmadan, YÖK denklik kriterlerine uygun, İngilizce dilinde eğitim imkanı.',
      button: 'Ücretsiz Ön Görüşme Al!',
      href: '/basvuru',
    },
    footer: [{ label: 'Tüm bölümler', href: '#' }],
  },
  {
    key: 'vize',
    label: 'Vize',
    align: 'right',
    sections: [
      {
        kind: 'featured',
        heading: 'Öne Çıkanlar',
        cards: [
          { title: 'SCHENGEN VİZELERİ', sub: 'Avrupa seyahat, eğitim ve çalışma vizeleri', cta: 'Başvuruyu İncele', href: '#' },
          { title: 'RUSYA VİZELERİ', sub: 'Rusya Federasyonu tüm vize kategorileri', cta: 'Başvuruyu İncele', href: '#' },
        ],
      },
      {
        kind: 'links',
        heading: 'Schengen Vizeleri',
        items: [
          { label: 'Avrupa Oturum Kartı', href: '#' },
          { label: 'Multi Vize — Birden fazla giriş hakkı', href: '#' },
          { label: 'Turistik Vize — Kısa süreli seyahatler', href: '#' },
          { label: 'Transit Vize — Aktarmalı seyahatler', href: '#' },
          { label: 'Ulusal D Tipi Vize — Çalışma ve uzun süreli oturum', href: '#' },
          { label: 'Avrupa Öğrenci Vizeleri — Lisans, yüksek lisans ve dil eğitimi', href: '#' },
        ],
      },
    ],
    cta: {
      title: 'Vize Sürecinizi Uzmanlarla Yönetin',
      desc: 'Schengen ve Rusya vizelerinde evrak hazırlığından başvuru takibine kadar tüm süreçlerde yanınızdayız.',
      bullets: ['Evrak Kontrolü', 'Başvuru Dosyası Hazırlığı', 'Konsolosluk Randevusu', 'Başvuru Takibi'],
      button: 'Ücretsiz Ön Değerlendirme',
      href: '/basvuru',
    },
  },
]

/* ---------- alt bileşenler ---------- */

function LinksSection({ section }: { section: Extract<Section, { kind: 'links' }> }) {
  return (
    <div className="min-w-[210px]">
      <p className="text-[16px] font-bold text-[#1c1c1e] mb-5">{section.heading}</p>
      <ul className="flex flex-col gap-0.5">
        {section.items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="block py-2 text-[15px] text-gray-600 hover:text-[#f04420] transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FeaturedSection({ section }: { section: Extract<Section, { kind: 'featured' }> }) {
  return (
    <div className="min-w-[270px]">
      <p className="text-[16px] font-bold text-[#1c1c1e] mb-5">{section.heading}</p>
      <div className="flex flex-col gap-4">
        {section.cards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="group/card block rounded-xl border border-gray-100 p-5 hover:border-[#f04420]/40 hover:bg-orange-50/40 transition-colors"
          >
            <p className="text-[13px] font-semibold text-gray-500">{card.title}</p>
            <p className="mt-1 text-[15.5px] font-semibold text-[#1c1c1e] leading-snug">
              {card.sub}
            </p>
            <span className="inline-flex items-center gap-1 mt-2.5 text-[14px] font-semibold text-[#f04420]">
              {card.cta}
              <ArrowRight size={14} className="group-hover/card:translate-x-0.5 transition-transform" />
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

function CtaCard({ cta }: { cta: CtaBlock }) {
  return (
    <div className="flex flex-col h-full min-w-[300px] max-w-[340px]">
      {cta.title && (
        <h3 className="text-[18px] font-bold text-[#1c1c1e] leading-snug">{cta.title}</h3>
      )}
      {cta.desc && (
        <p className="mt-2.5 text-[14px] text-gray-600 leading-relaxed">{cta.desc}</p>
      )}

      {cta.bullets && (
        <ul className="mt-4 flex flex-col gap-2">
          {cta.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 text-[14px] text-gray-700">
              <Check size={16} strokeWidth={2.5} className="text-[#f04420] flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      )}

      {cta.price && (
        <p className="mt-4 text-[16px] font-bold text-[#1c1c1e]">{cta.price}</p>
      )}

      <a
        href={cta.href}
        className="mt-5 inline-flex items-center justify-center gap-1.5 bg-[#f04420] hover:bg-[#d93a1a] text-white text-[14px] font-bold rounded-lg px-5 py-3 transition-colors"
      >
        {cta.button}
        <ArrowRight size={16} />
      </a>
    </div>
  )
}

function MenuPanel({ menu }: { menu: Menu }) {
  const leftSections = menu.sections.filter(
    (s) => !(s.kind === 'links' && s.gray)
  )
  const graySections = menu.sections.filter(
    (s): s is Extract<Section, { kind: 'links' }> => s.kind === 'links' && !!s.gray
  )
  const hasRight = graySections.length > 0 || !!menu.cta

  return (
    <div
      className={[
        'absolute top-full z-50 pt-3',
        menu.align === 'right' ? 'right-0' : 'left-0',
        'opacity-0 invisible translate-y-1',
        'group-hover:opacity-100 group-hover:visible group-hover:translate-y-0',
        'transition-all duration-200 ease-out',
      ].join(' ')}
    >
      <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden">
        <div className="flex items-stretch">
          {/* Sol — beyaz alan */}
          <div className="flex items-start gap-14 p-9">
            {leftSections.map((section, i) =>
              section.kind === 'featured' ? (
                <FeaturedSection key={i} section={section} />
              ) : (
                <LinksSection key={i} section={section} />
              )
            )}
          </div>

          {/* Sağ — açık gri alan (gri listeler + CTA) */}
          {hasRight && (
            <div className="flex flex-col gap-8 p-9 bg-[#f6f6f7] border-l border-gray-100">
              {graySections.map((section, i) => (
                <LinksSection key={i} section={section} />
              ))}
              {menu.cta && <CtaCard cta={menu.cta} />}
            </div>
          )}
        </div>

        {/* Footer — tam genişlikte ok linkleri */}
        {menu.footer && (
          <div className="border-t border-gray-100 px-9 py-5 flex items-center gap-8">
            {menu.footer.map((f) => (
              <a
                key={f.label}
                href={f.href}
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1c1c1e] hover:text-[#f04420] transition-colors"
              >
                {f.label}
                <ArrowRight size={15} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- ana bileşen ---------- */

export default function SecondaryNav() {
  return (
    <div className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="max-w-[1320px] mx-auto px-34">
        <div className="flex items-center justify-between h-[76px]">

          {menus.map((menu) => (
            <div key={menu.key} className="relative group">
              <button className="flex items-center gap-[7px] h-[76px] text-[16px] font-semibold text-[#1c1c1e] group-hover:text-[#f04420] transition-colors whitespace-nowrap">
                {menu.label}
                <ChevronDown
                  size={16}
                  strokeWidth={2.25}
                  className="text-[#1c1c1e] group-hover:text-[#f04420] group-hover:rotate-180 transition-all duration-200"
                />
              </button>

              <MenuPanel menu={menu} />
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}
