import { getPosts, getFeaturedImage, getCategories_from_post, formatDate } from '@/lib/wordpress'
import Header from '@/components/header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Blog | Portal Yurtdışı',
  description: 'Rusya'da eğitim, burs ve kampüs hayatına dair güncel yazılar.',
}

export default async function BlogPage() {
  const { posts } = await getPosts(1, 12)

  return (
    <>
      <Header />
      <main className="bg-[#f9f9f7] min-h-screen">

        {/* Hero */}
        <section className="bg-white border-b border-gray-100 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f04420]" />
              <span className="text-[11px] font-semibold tracking-[0.42em] uppercase text-[#f04420]">
                BLOG
              </span>
            </div>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-gray-900 leading-tight tracking-tight">
              Güncel Yazılar<br />ve Rehberler
            </h1>
          </div>
        </section>

        {/* Posts grid */}
        <section className="max-w-7xl mx-auto px-8 lg:px-16 py-16">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <p className="text-gray-400 text-[15px]">Henüz yazı yok. WordPress'ten ilk yazını ekle.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => {
                const image = getFeaturedImage(post)
                const cats = getCategories_from_post(post)
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all"
                  >
                    {/* Image */}
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
                      {i === 0 && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#f04420] rounded-full text-[10px] font-semibold text-white tracking-wide">
                          Öne Çıkan
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5">
                      {cats.length > 0 && (
                        <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-[#f04420] mb-2">
                          {cats[0]}
                        </span>
                      )}
                      <h2
                        className="text-[15px] font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-[#f04420] transition-colors"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      <div
                        className="text-gray-500 text-[13px] leading-relaxed line-clamp-3 mb-4 flex-1"
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
          )}
        </section>

      </main>
      <Footer />
    </>
  )
}
