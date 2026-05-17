import Header from '@/components/header'
import Hero from '@/components/hero/Hero'
import UniversityGrid from '@/components/sections/UniversityGrid'
import ScrollRevealSection from '@/components/sections/ScrollRevealSection'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <UniversityGrid />
      <ScrollRevealSection />
    </main>
  )
}
