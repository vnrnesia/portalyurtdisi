import Header from '@/components/header'
import Hero from '@/components/hero/Hero'
import UniversityGrid from '@/components/sections/UniversityGrid'
import ScrollRevealSection from '@/components/sections/ScrollRevealSection'
import Testimonials from '@/components/sections/Testimonials'
import HowWeWork from '@/components/sections/HowWeWork'
import CitiesSection from '@/components/sections/CitiesSection'
import NewsSlider from '@/components/sections/NewsSlider'
import CTABanner from '@/components/sections/CTABanner'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <main>
        <Header />
        <Hero />
        <UniversityGrid />
        <ScrollRevealSection />
        <Testimonials />
        <HowWeWork />
        <CitiesSection />
        <NewsSlider />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
