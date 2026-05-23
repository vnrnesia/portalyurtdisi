import { getPostBySlug, getPosts, getFeaturedImage, getCategories_from_post, formatDate } from '@/lib/wordpress'
import Header from '@/components/header'
import Footer from '@/components/Footer'
import ContactFormSection from '@/components/sections/ContactFormSection'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  const { posts } = await getPosts(1, 100)
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title.rendered} | Portal Yurtdışı Blog`,
    description: post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160),
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const image = getFeaturedImage(post)
  const cats = getCategories_from_post(post)

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero image */}
        {image && (
          <div className="w-full aspect-[21/7] overflow-hidden bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={post.title.rendered} className="w-full h-full object-cover" />
          </div>
        )}

        <article className="max-w-3xl mx-auto px-8 lg:px-0 py-16">

          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gray-400 hover:text-gray-700 transition-colors mb-10"
          >
            <ArrowLeft size={14} strokeWidth={2.5} /> Blog'a dön
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {cats.map(cat => (
              <span key={cat} className="text-[10px] font-semibold tracking-[0.35em] uppercase text-[#f04420]">
                {cat}
              </span>
            ))}
            <span className="text-[11px] text-gray-400">{formatDate(post.date)}</span>
          </div>

          {/* Title */}
          <h1
            className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-gray-900 leading-tight tracking-tight mb-8"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {/* Content */}
          <div
            className="prose prose-gray prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-a:text-[#f04420] prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-sm"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

        </article>

      </main>
      <ContactFormSection />
      <Footer />
    </>
  )
}
