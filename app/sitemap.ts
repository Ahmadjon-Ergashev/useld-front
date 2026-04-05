import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://useldservice.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // If you add other public pages like /pricing or /about, add them here
  ]
}
