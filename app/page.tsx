import { getContent } from '@/lib/store'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import WhyUsSection from '@/components/sections/WhyUsSection'
import PartnersSection from '@/components/sections/PartnersSection'
import FaqSection from '@/components/sections/FaqSection'
import Footer from '@/components/Footer'

export default async function HomePage() {
  const content = await getContent()
  return (
    <>
      <Navbar />
      <main>
        <HeroSection content={content.hero} />
        <AboutSection content={content.about} />
        <WhyUsSection content={content.whyUs} />
        <PartnersSection content={content.partners} />
        <FaqSection content={content.faq} />
      </main>
      <Footer />
    </>
  )
}
