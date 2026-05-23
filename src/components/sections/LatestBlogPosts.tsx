import { getPosts, getFeaturedImage, getCategories_from_post, formatDate } from '@/lib/wordpress'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function LatestBlogPosts() {
  const { posts } = await getPosts(1, 3)
  if (!posts.length) return null

  return (
    <section className="bg-[#f9f9f7] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

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
          <Link
            href="/blog"
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 hover:border-gray-500 transition-colors text-[13px] font-medium rounded-full shrink-0"
          >
            Tümünü Gör <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => {
            const image = getFeaturedImage(post)
            const cats = getCategories_from_post(post)
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all"
              >
                <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={post.title.rendered}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-300 text-[11px] font-semibold tracking-widest uppercase">Portal Yurtdışı</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-5">
                  {cats.length > 0 && (
                    <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-[#f04420] mb-2">
                      {cats[0]}
                    </span>
                  )}
                  <h3
                    className="text-[15px] font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-[#f04420] transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div
                    className="text-gray-500 text-[13px] leading-relaxed line-clamp-2 mb-4 flex-1"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-[11px] text-gray-400">{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-[#f04420]">
                      Oku <ArrowRight size={12} strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Mobile: Tümünü Gör */}
        <div className="flex lg:hidden justify-center mt-8">
          <Link
            href="/blog"
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 hover:border-gray-500 transition-colors text-[13px] font-medium rounded-full"
          >
            Tümünü Gör <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>

      </div>
    </section>
  )
}
