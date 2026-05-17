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
    gradient: 'from-violet-950 via-indigo-950 to-blue-950',
    dot: '#818cf8',
  },
  {
    id: '02',
    title: 'Burs ve Başvuru Stratejisi',
    desc: "1000+ burs veritabanımızdan profiline en uygun olanları belirliyoruz. Motive mektubu, tavsiye mektubu ve CV'ni birlikte mükemmelleştiriyoruz.",
    gradient: 'from-emerald-950 via-teal-950 to-cyan-950',
    dot: '#34d399',
  },
  {
    id: '03',
    title: 'Vize ve Lojistik Yönetimi',
    desc: 'Kabul aldıktan sonra vize başvuru sürecini uçtan uca yönetiyoruz. Konaklama, sağlık sigortası ve ilk yerleşim için kapsamlı hazırlık yapıyoruz.',
    gradient: 'from-rose-950 via-red-950 to-orange-950',
    dot: '#fb7185',
  },
  {
    id: '04',
    title: 'Kampüs ve Oryantasyon Desteği',
    desc: 'Kampüste ilk gününden itibaren yanındayız. Türk öğrenci toplulukları ile buluşturuyoruz, kampüs hayatına uyum sürecinde rehberlik ediyoruz.',
    gradient: 'from-sky-950 via-blue-950 to-indigo-950',
    dot: '#38bdf8',
  },
]

export default function HowWeWork() {
  const sectionRef   = useRef<HTMLElement>(null)
  const leftColRef   = useRef<HTMLDivElement>(null)
  const centerRef    = useRef<HTMLDivElement>(null)
  const fillRef      = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const stepNumRef   = useRef<HTMLSpanElement>(null)
  const stepRefs     = useRef<(HTMLDivElement | null)[]>([])
  const contentRefs  = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const hh = document.querySelector('header')?.offsetHeight ?? 116

    // Set sticky top for left column dynamically
    if (leftColRef.current) {
      leftColRef.current.style.top = `${hh + 32}px`
    }

    const ctx = gsap.context(() => {
      const lineH  = centerRef.current?.offsetHeight ?? 0
      const indicH = indicatorRef.current?.offsetHeight ?? 40

      // ── 1. Dashed fill line: scales from 0 → 1 scrubbed with scroll ──
      gsap.fromTo(fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top top+=${hh}`,
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      )

      // ── 2. Indicator circle travels down the line (scrubbed) ──
      gsap.to(indicatorRef.current, {
        y: lineH - indicH,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `top top+=${hh}`,
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      // ── 3. Per-step animations ──
      stepRefs.current.forEach((step, i) => {
        if (!step) return

        // Slide-up reveal
        gsap.fromTo(contentRefs.current[i],
          { y: 38, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        )

        // Scroll-spy → flip step number in indicator
        const flipNum = (dir: 'down' | 'up') => {
          const el = stepNumRef.current
          if (!el) return
          gsap.timeline()
            .to(el, { opacity: 0, y: dir === 'down' ? -7 : 7, duration: 0.13, ease: 'power1.in' })
            .call(() => { if (el) el.textContent = steps[i].id })
            .to(el, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' })
        }

        ScrollTrigger.create({
          trigger: step,
          start: 'top center',
          end: 'bottom center',
          onEnter:     () => flipNum('down'),
          onEnterBack: () => flipNum('up'),
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#080808]">
      <Container className="px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_64px_1fr]">

          {/* ── LEFT: pinned headline ─────────────────────────── */}
          <div
            ref={leftColRef}
            className="self-start lg:sticky py-20 lg:py-28"
            style={{ top: '148px' }} // CSS fallback; JS overwrites on mount
          >
            {/* Kicker */}
            <div className="flex items-center gap-2.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[11px] font-semibold tracking-[0.42em] uppercase text-green-400">
                NASIL ÇALIŞIYORUZ
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-[1.05] tracking-tight">
              Yurt Dışı Serüveninizi<br />
              Birlikte Tasarlıyoruz.
            </h2>

            <p className="mt-6 text-gray-500 text-[15px] leading-relaxed max-w-[260px]">
              Profilinden kabul mektubuna, vizeden kampüse — her adımda profesyonel destek.
            </p>

            {/* Step indicators row */}
            <div className="flex items-center gap-3 mt-10">
              {steps.map(s => (
                <div key={s.id} className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-gray-600">{s.id}</span>
                  {s.id !== steps[steps.length - 1].id && (
                    <span className="text-gray-800 text-[10px]">—</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── CENTER: progress line ──────────────────────────── */}
          <div
            ref={centerRef}
            className="hidden lg:block relative self-stretch"
          >
            {/* Dashed background track */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
              style={{
                backgroundImage: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 6px, transparent 6px, transparent 12px)',
              }}
            />

            {/* Green fill (scaleY animated by GSAP) */}
            <div
              ref={fillRef}
              className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-green-400/60"
              style={{ height: '100%', transform: 'scaleY(0)', transformOrigin: 'top' }}
            />

            {/* Indicator circle */}
            <div
              ref={indicatorRef}
              className="absolute left-1/2 -translate-x-1/2 top-0 z-10 w-10 h-10 rounded-full bg-[#080808] border-2 border-green-400 flex items-center justify-center shadow-[0_0_16px_rgba(74,222,128,0.25)]"
            >
              <span
                ref={stepNumRef}
                className="text-[10px] font-bold text-green-400 tabular-nums leading-none"
              >
                01
              </span>
            </div>
          </div>

          {/* ── RIGHT: scrolling content blocks ───────────────── */}
          <div>
            {steps.map((step, i) => (
              <div
                key={step.id}
                ref={el => { stepRefs.current[i] = el }}
                className="min-h-[85vh] flex flex-col justify-center py-20 lg:py-24"
              >
                {/* Content wrapper — animated by GSAP */}
                <div
                  ref={el => { contentRefs.current[i] = el }}
                  style={{ opacity: 0 }}
                >
                  {/* Image / gradient placeholder */}
                  <div className={`relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 bg-gradient-to-br ${step.gradient}`}>
                    <div className="absolute inset-0 bg-black/30" />
                    {/* Subtle bottom vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    {/* Decorative large number */}
                    <div
                      className="absolute bottom-3 right-5 font-black text-white/[0.06] leading-none select-none pointer-events-none"
                      style={{ fontSize: 'clamp(5rem,10vw,8rem)' }}
                    >
                      {step.id}
                    </div>
                    {/* Step dot accent */}
                    <div
                      className="absolute top-5 left-5 w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: step.dot }}
                    />
                  </div>

                  {/* Step label */}
                  <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-green-400 mb-3 block">
                    Adım {step.id}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl lg:text-[1.8rem] font-bold text-white mb-4 leading-snug tracking-tight">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-[15px] leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  )
}
