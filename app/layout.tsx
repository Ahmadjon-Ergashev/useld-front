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
    "Stay FMCSA compliant with our professional ELD logbook service. 1000+ active drivers, 200+ DOT audits passed. Start free trial today.",
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
