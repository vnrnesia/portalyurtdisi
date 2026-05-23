'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Container from '@/components/ui/Container'

interface Post {
  slug: string
  category: string
  title: string
  excerpt: string
  image: string | null
  date: string
}

const ACTIVE_W = '55%'

function getWidthFor(cardIdx: number, activeIdx: number, total: number): string {
  if (cardIdx < activeIdx) return '0%'
  if (cardIdx === activeIdx) {
    const rightCount = total - 1 - activeIdx
    return rightCount > 0 ? ACTIVE_W : '100%'
  }
  const rightCount = total - 1 - activeIdx
  return `${(45 / rightCount).toFixed(2)}%`
}

export default function LatestBlogPostsSlider({ posts }: { posts: Post[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])
  const contentRef  = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)
  const tlRef       = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => () => { tlRef.current?.kill() }, [])

  const goTo = useCallback((nextIdx: number) => {
    if (isAnimating.current || nextIdx === activeIndex) return
    isAnimating.current = true
    tlRef.current?.kill()
    const tl = gsap.timeline({ onComplete: () => { isAnimating.current = false } })
    tlRef.current = tl

    tl.to(contentRef.current, { opacity: 0, y: -10, duration: 0.18, ease: 'power2.in' })
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      tl.to(card, { width: getWidthFor(i, nextIdx, posts.length), duration: 0.65, ease: 'power3.out' }, 0.1)
    })
    tl.call(() => setActiveIndex(nextIdx), [], 0.18)
    tl.fromTo(contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      0.38
    )
  }, [activeIndex, posts.length])

  const prev = useCallback(() => goTo((activeIndex - 1 + posts.length) % posts.length), [activeIndex, goTo, posts.length])
  const next = useCallback(() => goTo((activeIndex + 1) % posts.length), [activeIndex, goTo, posts.length])

  const active = posts[activeIndex]

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container className="px-8 lg:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <div className="mb-5">
              <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-gray-500 mb-2">BLOG</p>
              <div className="relative h-px bg-gray-300 w-full">
                <div className="absolute left-0 top-0 w-8 h-[2px] bg-[#f04420] -translate-y-px" />
              </div>
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold text-gray-900 leading-tight tracking-tight">
              Güncel Yazılar<br />ve Rehberler
            </h2>
          </div>
          <div className="flex gap-2 shrink-0 mt-1">
            <button onClick={prev} className="w-11 h-11 flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors" aria-label="Önceki">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} className="w-11 h-11 flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors" aria-label="Sonraki">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Container>

      {/* Desktop Accordion */}
      <div className="hidden lg:flex gap-[3px] overflow-hidden px-8 lg:px-16" style={{ height: 520 }}>
        {posts.map((post, i) => {
          const isActive = i === activeIndex
          return (
            <div
              key={post.slug}
              ref={el => { cardRefs.current[i] = el }}
              className="relative flex-shrink-0 overflow-hidden cursor-pointer"
              style={{ width: getWidthFor(i, 0, posts.length) }}
              onClick={() => goTo(i)}
            >
              {post.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

              {/* Inactive: vertical label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300" style={{ opacity: isActive ? 0 : 1 }}>
                <span className="text-white/60 text-[10px] font-semibold tracking-[0.35em] uppercase whitespace-nowrap select-none" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  {post.category}
                </span>
              </div>

              {/* Active: category top-left */}
              <div className="absolute top-5 left-5 transition-opacity duration-300" style={{ opacity: isActive ? 1 : 0 }}>
                <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-white/60">{post.category}</span>
              </div>

              {/* Active: counter bottom-right */}
              <div className="absolute bottom-5 right-5 transition-opacity duration-300" style={{ opacity: isActive ? 1 : 0 }}>
                <span className="text-white/30 text-xs font-mono tabular-nums">
                  {String(i + 1).padStart(2, '0')} / {String(posts.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <Container className="px-8 lg:px-16">
        {/* Desktop text content */}
        <div ref={contentRef} className="hidden lg:flex mt-8 items-end justify-between gap-12">
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-[#f04420] mb-3 block">
              {active.category}
            </span>
            <h3
              className="text-[clamp(1.4rem,2.2vw,2rem)] font-bold text-gray-900 leading-snug tracking-tight"
              dangerouslySetInnerHTML={{ __html: active.title }}
            />
          </div>
          <div className="flex flex-col items-end gap-4 shrink-0 max-w-sm">
            <div
              className="text-gray-500 text-[15px] leading-relaxed text-right line-clamp-3"
              dangerouslySetInnerHTML={{ __html: active.excerpt }}
            />
            <Link
              href={`/blog/${active.slug}`}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-700 transition-colors text-white text-sm font-medium rounded-full"
            >
              Oku <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Mobile fallback */}
        <div className="flex lg:hidden gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden -mx-8 px-8">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex-shrink-0 w-[78vw] rounded-xl overflow-hidden flex flex-col"
            >
              <div className="relative aspect-video bg-gray-200">
                {post.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-widest uppercase text-white/60">{post.category}</span>
              </div>
              <div className="pt-4">
                <h3 className="text-gray-900 font-semibold text-[15px] leading-snug mb-2" dangerouslySetInnerHTML={{ __html: post.title }} />
                <div className="text-gray-500 text-xs leading-relaxed line-clamp-2" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
