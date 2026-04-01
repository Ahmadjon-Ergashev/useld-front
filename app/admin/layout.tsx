import type { Metadata } from 'next'
import '@/components/style/globals.css'

export const metadata: Metadata = {
  title: 'Admin — US ELD Logbook Service',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
