import { prisma } from "./prisma"

export interface SiteContent {
  hero: {
    headline: string
    subheadline: string
    btn1: string
    btn2: string
    stats: { value: string; label: string }[]
  }
  about: {
    paragraphs: string[]
    stats: { value: string; label: string }[]
  }
  whyUs: {
    title: string
    items: { icon: string; title: string; description: string }[]
  }
  partners: { name: string; logo?: string }[]
  faq: { question: string; answer: string }[]
}

export const defaultContent: SiteContent = {
  hero: {
    headline: "Stay FMCSA Compliant with Our ELD Logbook Service",
    subheadline: "Get professional ELD support and stay fully compliant with FMCSA regulations.",
    btn1: "Getting started",
    btn2: "View Pricing",
    stats: [
      { value: "1000+", label: "Active Drivers" },
      { value: "200+", label: "DOT Audits Passed" },
      { value: "5+", label: "Years Experience" },
      { value: "24/7", label: "Technical Support" },
    ]
  },
  about: {
    paragraphs: [
      "US ELD Logbook Service has been helping trucking companies stay compliant with FMCSA regulations for over 5 years.",
      "Our experienced specialists provide reliable ELD support and personalized assistance for every driver and fleet.",
      "We have successfully helped pass 200+ DOT Safety Audits and currently support 1000+ active drivers across the United States.",
      "Our goal is simple — make ELD compliance easy, reliable, and stress-free for every trucking company we work with."
    ],
    stats: [
      { value: "1000+", label: "Active Drivers" },
      { value: "200+", label: "DOT Audits Passed" },
      { value: "5+", label: "Years of Experience" },
    ]
  },
  whyUs: {
    title: "Why Choose US ELD",
    items: [
      { icon: "Trophy", title: "Experienced Team", description: "Our professional team has over 5 years of experience working with ELD systems and helping trucking companies stay compliant with FMCSA regulations." },
      { icon: "ShieldCheck", title: "Dedicated Audit Support Team", description: "We have a specially trained team that helps drivers and companies prepare for DOT audits and maintain properly organized logbooks." },
      { icon: "BarChart", title: "Monthly Driver Reports", description: "Our clients receive monthly reports for each driver, allowing fleet owners to monitor activity, compliance, and performance." },
      { icon: "Banknote", title: "Fair and Transparent Billing", description: "You only pay for the days when drivers are active in the system. No hidden fees and no unnecessary charges." },
      { icon: "CheckCircle", title: "Trusted by 1000+ Drivers", description: "Our service has earned the trust of more than 1000 drivers across the United States." },
      { icon: "ClipboardCheck", title: "FMCSA Compliance", description: "Our ELD platform helps drivers maintain accurate Hours of Service (HOS) logs and stay fully compliant with FMCSA regulations." },
      { icon: "Wrench", title: "Reliable Technical Support", description: "Our support team is always ready to assist drivers and fleet managers with any technical or operational questions." },
      { icon: "Zap", title: "Fast and Easy Setup", description: "Getting started with our ELD service is quick and simple. Our specialists guide you through the setup process step by step." },
      { icon: "Truck", title: "Solutions for Owner Operators and Fleets", description: "Our service is designed to work efficiently for both independent drivers and large trucking fleets." },
    ]
  },
  partners: [
    { name: "Highway" },
    { name: "Stripe" },
    { name: "Project44" },
    { name: "Quick Manage" },
    { name: "Trucker Tool" },
  ],
  faq: [
    { question: "Is your ELD service FMCSA compliant?", answer: "Yes. Our ELD solutions are fully compliant with FMCSA regulations and help drivers maintain accurate Hours of Service (HOS) logs." },
    { question: "How quickly can I start using your ELD service?", answer: "You can start the same day. Our team helps with quick setup and provides guidance to ensure everything is working properly." },
    { question: "Do you provide technical support?", answer: "Yes. We offer professional technical support to help drivers resolve issues and manage their logbooks correctly." },
    { question: "Do you help with DOT audits?", answer: "Yes. Our team has helped companies successfully pass 200+ DOT audits by ensuring proper logbook management and compliance." },
    { question: "How much does your ELD service cost?", answer: "Our pricing depends on the platform and features. Plans typically start from $109 per month." },
    { question: "Do you offer a free trial?", answer: "Yes. We periodically offer free trials so companies can test our service before committing." },
  ]
}

export async function getContent(): Promise<SiteContent> {
  try {
    const row = await prisma.siteContent.findFirst({ where: { id: 1 } })
    if (!row) return defaultContent
    return JSON.parse(row.content)
  } catch (error) {
    console.error("Error fetching content from DB:", error)
    return defaultContent
  }
}

export async function updateContent(section: keyof SiteContent, data: any): Promise<SiteContent> {
  const current = await getContent()
  const updated = { ...current, [section]: data }

  await prisma.siteContent.upsert({
    where: { id: 1 },
    create: { id: 1, content: JSON.stringify(updated) },
    update: { content: JSON.stringify(updated) }
  })

  return updated
}

export const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin'
export const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123'
