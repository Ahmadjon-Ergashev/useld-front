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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "US ELD",
    "description": "Professional ELD logbook service helping trucking companies stay FMCSA compliant.",
    "telephone": "+12247861501",
    "email": "useldsales@gmail.com",
    "url": "https://useldservice.com",
    "image": "https://useldservice.com/logo.ico",
    "founder": "US ELD Team",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "service": {
      "@type": "Service",
      "name": "ELD Compliance",
      "description": "FMCSA compliant ELD solutions and DOT audit support."
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
