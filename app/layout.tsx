import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "@/components/style/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "US ELD — Logbook Service | FMCSA Compliant ELD Solutions",
  description:
    "Stay FMCSA compliant with our professional ELD logbook service. 1000+ active drivers, 200+ DOT audits passed. Reliable, affordable, and easy-to-use ELD solutions.",
  keywords: ["ELD", "Logbook", "FMCSA Compliance", "HOS", "Trucking", "DOT Audit", "Logbook Support", "US ELD"],
  authors: [{ name: "US ELD Team" }],
  creator: "US ELD",
  publisher: "US ELD",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "US ELD — Professional Logbook Service",
    description: "Reliable ELD compliance and logbook support for trucking companies and owner operators.",
    url: "https://useldservice.com",
    siteName: "US ELD",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "US ELD — FMCSA Compliant ELD Solutions",
    description: "Expert ELD support and compliance services for the trucking industry.",
  },
  icons: {
    icon: '/logo.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
