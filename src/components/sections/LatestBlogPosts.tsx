import { getPosts, getFeaturedImage, getCategories_from_post } from '@/lib/wordpress'
import LatestBlogPostsSlider from './LatestBlogPostsSlider'

export default async function LatestBlogPosts() {
  const { posts } = await getPosts(1, 6)
  if (!posts.length) return null

  const mapped = posts.map(post => ({
    slug: post.slug,
    category: getCategories_from_post(post)[0] ?? 'Blog',
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    image: getFeaturedImage(post),
    date: post.date,
  }))

  return <LatestBlogPostsSlider posts={mapped} />
}
