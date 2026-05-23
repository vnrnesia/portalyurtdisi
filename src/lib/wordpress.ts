const WP_BASE = 'https://blog.portalyurtdisi.com/wp-json/wp/v2'

export interface WPPost {
  id: number
  slug: string
  date: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>
  }
}

export interface WPCategory {
  id: number
  name: string
  slug: string
  count: number
}

export async function getPosts(page = 1, perPage = 12): Promise<{ posts: WPPost[]; total: number; totalPages: number }> {
  const res = await fetch(
    `${WP_BASE}/posts?_embed&page=${page}&per_page=${perPage}&status=publish`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) return { posts: [], total: 0, totalPages: 0 }
  const posts: WPPost[] = await res.json()
  const total = Number(res.headers.get('X-WP-Total') ?? 0)
  const totalPages = Number(res.headers.get('X-WP-TotalPages') ?? 0)
  return { posts, total, totalPages }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const res = await fetch(
    `${WP_BASE}/posts?_embed&slug=${slug}&status=publish`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) return null
  const posts: WPPost[] = await res.json()
  return posts[0] ?? null
}

export async function getCategories(): Promise<WPCategory[]> {
  const res = await fetch(`${WP_BASE}/categories?per_page=20`, { next: { revalidate: 3600 } })
  if (!res.ok) return []
  return res.json()
}

export function getFeaturedImage(post: WPPost): string | null {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null
}

export function getCategories_from_post(post: WPPost): string[] {
  return post._embedded?.['wp:term']?.[0]?.map(t => t.name) ?? []
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
