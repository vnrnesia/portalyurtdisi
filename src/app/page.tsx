import Header from '@/components/header'
import Hero from '@/components/hero/Hero'
import LeadSearchBar from '@/components/sections/LeadSearchBar'
import WhyUs from '@/components/sections/WhyUs'
import UniversityGrid from '@/components/sections/UniversityGrid'
import WizardForm from '@/components/sections/WizardForm'
import ServiceTabs from '@/components/sections/ServiceTabs'
import Testimonials from '@/components/sections/Testimonials'
import ProcessSteps from '@/components/sections/ProcessSteps'
import PortalGPT from '@/components/sections/PortalGPT'
import PopularCities from '@/components/sections/PopularCities'
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
        <LeadSearchBar />
        <WhyUs />
        <UniversityGrid />
        <WizardForm />
        <ServiceTabs />
        <Testimonials />
        <ProcessSteps />
        <PortalGPT />
        <PopularCities />
        <ContactFormSection />
        <LatestBlogPosts />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
