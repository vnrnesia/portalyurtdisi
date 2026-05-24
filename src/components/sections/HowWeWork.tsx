'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '@/components/ui/Container'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    id: '01',
    title: 'Profil Analizi ve Hedef Belirleme',
    desc: 'Akademik geçmişin, kariyer hedeflerin ve bütçeni derinlemesine analiz ediyoruz. Seninle bire bir görüşerek en uygun üniversite ve program listeni oluşturuyoruz.',
    imgBg: '#242424',
  },
  {
    id: '02',
    title: 'Burs ve Başvuru Stratejisi',
    desc: "1000+ burs veritabanımızdan profiline en uygun olanları belirliyoruz. Motive mektubu, tavsiye mektubu ve CV'ni birlikte mükemmelleştiriyoruz.",
    imgBg: '#2c2c2c',
  },
  {
    id: '03',
    title: 'Vize ve Lojistik Yönetimi',
    desc: 'Kabul aldıktan sonra vize başvuru sürecini uçtan uca yönetiyoruz. Konaklama, sağlık sigortası ve ilk yerleşim için kapsamlı hazırlık yapıyoruz.',
    imgBg: '#343434',
  },
  {
    id: '04',
    title: 'Kampüs ve Oryantasyon Desteği',
    desc: 'Kampüste ilk gününden itibaren yanındayız. Türk öğrenci toplulukları ile buluşturuyoruz, kampüs hayatına uyum sürecinde rehberlik ediyoruz.',
    imgBg: '#3c3c3c',
  },
]

export default function HowWeWork() {
  const outerRef          = useRef<HTMLDivElement>(null)
  const sectionRef        = useRef<HTMLElement>(null)
  const leftColRef        = useRef<HTMLDivElement>(null)
  const centerRef         = useRef<HTMLDivElement>(null)
  const fillRef           = useRef<HTMLDivElement>(null)
  const circleRefs        = useRef<(HTMLDivElement | null)[]>([])
  const imageRefs         = useRef<(HTMLDivElement | null)[]>([])
  const stepRefs          = useRef<(HTMLDivElement | null)[]>([])
  const contentRefs       = useRef<(HTMLDivElement | null)[]>([])
  // Mobile
  const mobileStepsRef    = useRef<HTMLDivElement>(null)
  const mobileFillRef     = useRef<HTMLDivElement>(null)
  const mobileCircleRefs  = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const hh = document.querySelector('header')?.offsetHeight ?? 116

    if (leftColRef.current) {
      leftColRef.current.style.top = `${hh + 32}px`
    }

    // Daireleri her görselin üst kenarıyla hizala
    // GSAP fromTo anında contentRef'e y:38 uygular; bunu getBoundingClientRect'ten çıkarıyoruz
    const positionCircles = () => {
      if (!centerRef.current) return
      const lineHeight = centerRef.current.offsetHeight
      const lineTop = centerRef.current.getBoundingClientRect().top

      imageRefs.current.forEach((img, i) => {
        const circle = circleRefs.current[i]
        const contentEl = contentRefs.current[i]
        if (!img || !circle) return
        const gsapY = contentEl ? Number(gsap.getProperty(contentEl, 'y')) || 0 : 0
        const imgTop = img.getBoundingClientRect().top - gsapY
        const pct = ((imgTop - lineTop) / lineHeight) * 100
        circle.style.top = `${Math.max(0, pct)}%`
      })
    }
    requestAnimationFrame(() => requestAnimationFrame(positionCircles))
    window.addEventListener('resize', positionCircles)

    const ctx = gsap.context(() => {
      // ── 0. Slide-over entry: clipPath ile section aşağıdan yükselerek açılır ──
      gsap.fromTo(sectionRef.current,
        { clipPath: 'inset(280px 0 0 0 round 32px 32px 0 0)' },
        {
          clipPath: 'inset(0px 0 0 0 round 32px 32px 0 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: outerRef.current,
            start: 'top bottom',
            end: 'top 15%',
            scrub: 1,
          },
        }
      )

      // ── 1. Fill line scrubbed with scroll ──
      gsap.fromTo(fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top top+=${hh + 300}`,
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      )
      gsap.fromTo(fillRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: outerRef.current,
            start: 'top 75%',
            end: 'top 35%',
            scrub: 1,
          },
        }
      )
      gsap.fromTo(fillRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'bottom 65%',
            end: 'bottom 25%',
            scrub: 1,
          },
        }
      )

      // ── 2. Mobile fill line — steps container'a bağlı ──
      gsap.fromTo(mobileFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: mobileStepsRef.current,
            start: 'top 85%',
            end: 'bottom 85%',
            scrub: 1,
          },
        }
      )

      // ── 3. Per-step: content reveal + circle highlight ──
      stepRefs.current.forEach((step, i) => {
        if (!step) return

        gsap.fromTo(contentRefs.current[i],
          { y: 38, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.85, ease: 'power2.out',
            scrollTrigger: { trigger: step, start: 'top 78%', toggleActions: 'play none none none' },
          }
        )

        // Desktop + mobil circle renk geçişi
        ScrollTrigger.create({
          trigger: step,
          start: 'top center',
          end: 'bottom center',
          onEnter:     () => {
            gsap.to(circleRefs.current[i],       { borderColor: 'rgba(240,68,32,0.9)', duration: 0.3 })
            gsap.to(mobileCircleRefs.current[i], { borderColor: 'rgba(240,68,32,0.9)', duration: 0.3 })
          },
          onLeave:     () => {
            gsap.to(circleRefs.current[i],       { borderColor: 'rgba(240,68,32,0.3)', duration: 0.3 })
            gsap.to(mobileCircleRefs.current[i], { borderColor: 'rgba(240,68,32,0.3)', duration: 0.3 })
          },
          onEnterBack: () => {
            gsap.to(circleRefs.current[i],       { borderColor: 'rgba(240,68,32,0.9)', duration: 0.3 })
            gsap.to(mobileCircleRefs.current[i], { borderColor: 'rgba(240,68,32,0.9)', duration: 0.3 })
          },
          onLeaveBack: () => {
            gsap.to(circleRefs.current[i],       { borderColor: 'rgba(240,68,32,0.3)', duration: 0.3 })
            gsap.to(mobileCircleRefs.current[i], { borderColor: 'rgba(240,68,32,0.3)', duration: 0.3 })
          },
        })
      })
    }, sectionRef)

    return () => { window.removeEventListener('resize', positionCircles); ctx.revert() }
  }, [])

  return (
    <div ref={outerRef} className="-mt-[280px] relative z-10">
    <section ref={sectionRef} className="bg-[#1c1c1c] py-24 lg:py-36">
      <Container className="px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_80px_1fr]">

          {/* ── LEFT: pinned headline ─────────────────────────── */}
          <div
            ref={leftColRef}
            className="self-start lg:sticky py-20 lg:py-32"
            style={{ top: '148px' }}
          >
            {/* Kicker */}
            <div className="mb-8">
              <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-gray-400 mb-2">NASIL ÇALIŞIYORUZ</p>
              <div className="relative h-px bg-white/20 w-full">
                <div className="absolute left-0 top-0 w-8 h-[2px] bg-[#f04420] -translate-y-px" />
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-[clamp(2.2rem,4.5vw,4rem)] font-bold text-white leading-[1.05] tracking-tight">
              Yurt Dışı Serüveninizi<br />
              Birlikte Tasarlıyoruz.
            </h2>

            <p className="mt-6 text-gray-500 text-[15px] leading-relaxed max-w-[300px]">
              Profilinden kabul mektubuna, vizeden kampüse — her adımda profesyonel destek.
            </p>
          </div>

          {/* ── CENTER: progress line ──────────────────────────── */}
          <div
            ref={centerRef}
            className="hidden lg:block relative self-stretch"
          >
            {/* Dashed background track */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
              style={{
                backgroundImage: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 6px, transparent 6px, transparent 14px)',
              }}
            />

            {/* Fill line (scaleY animated by GSAP) */}
            <div
              ref={fillRef}
              className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-[#f04420]"
              style={{ height: '100%', transform: 'scaleY(0)', transformOrigin: 'top' }}
            />

            {/* Fixed step circles — JS pozisyonlar, başlangıçta gizli */}
            {steps.map((step, i) => (
              <div
                key={step.id}
                ref={el => { circleRefs.current[i] = el }}
                className="absolute z-10 w-11 h-11 rounded-full bg-[#1c1c1c] flex items-center justify-center"
                style={{
                  left: '50%',
                  top: '0%',
                  transform: 'translate(-50%, -50%)',
                  border: '1.5px solid rgba(240,68,32,0.35)',
                  color: '#f04420',
                }}
              >
                <span className="text-[11px] font-semibold tabular-nums leading-none" style={{ color: 'inherit' }}>
                  {step.id}
                </span>
              </div>
            ))}
          </div>

          {/* ── RIGHT: scrolling content blocks ───────────────── */}
          <div ref={mobileStepsRef} className="relative">

            {/* Mobil sol rail */}
            <div
              className="lg:hidden absolute top-0 bottom-0"
              style={{ left: '20px', width: '2px', zIndex: 0 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 6px, transparent 6px, transparent 14px)',
                }}
              />
              <div
                ref={mobileFillRef}
                className="absolute top-0 w-full bg-[#f04420]"
                style={{ height: '100%', transform: 'scaleY(0)', transformOrigin: 'top' }}
              />
            </div>

            {steps.map((step, i) => (
              <div
                key={step.id}
                ref={el => { stepRefs.current[i] = el }}
                className="relative min-h-[90vh] flex flex-col justify-center py-20 lg:py-28"
              >
                {/* Mobil circle — içeriğin başı (py-20 = 80px) */}
                <div
                  ref={el => { mobileCircleRefs.current[i] = el }}
                  className="lg:hidden absolute z-10 w-9 h-9 rounded-full bg-[#1c1c1c] flex items-center justify-center"
                  style={{
                    left: '20px',
                    top: '80px',
                    transform: 'translateX(-50%)',
                    border: '1.5px solid rgba(240,68,32,0.35)',
                  }}
                >
                  <span className="text-[11px] font-semibold text-[#f04420]">{step.id}</span>
                </div>

                {/* Content wrapper — animated by GSAP */}
                <div
                  ref={el => { contentRefs.current[i] = el }}
                  style={{ opacity: 0 }}
                  className="pl-12 lg:pl-0"
                >
                  {/* Image placeholder */}
                  <div
                    ref={el => { imageRefs.current[i] = el }}
                    className="aspect-[4/3] rounded-2xl overflow-hidden mb-7 bg-[#161616] border border-white/[0.06]"
                  >
                    <div className="w-full h-full" style={{ backgroundColor: step.imgBg }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3 leading-snug tracking-tight">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-[14px] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
    </div>
  )
}
