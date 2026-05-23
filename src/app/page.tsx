import Header from '@/components/header'
import Hero from '@/components/hero/Hero'
import UniversityGrid from '@/components/sections/UniversityGrid'
import ScrollRevealSection from '@/components/sections/ScrollRevealSection'
import Testimonials from '@/components/sections/Testimonials'
import HowWeWork from '@/components/sections/HowWeWork'
import CitiesSection from '@/components/sections/CitiesSection'
import ContactFormSection from '@/components/sections/ContactFormSection'
import LatestBlogPosts from '@/components/sections/LatestBlogPosts'
import FAQSection from '@/components/sections/FAQSection'
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
        <ContactFormSection />
        <LatestBlogPosts />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
