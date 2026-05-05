import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Serif_Display, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-dm-serif",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "WasoPay — Trade crypto, the Nigerian way",
  description:
    "Buy and sell USDT, BTC, and ETH with Nigerian Naira. Multi-sig escrow, verified merchants, and 92-second average release time.",
  generator: "WasoPay",
  other: {
    "talentapp:project_verification":
      "167193dd67a6603588e846b77539748c51770ab664993012f8a02515dc81935188d09dc179acd441540ab83c97d2d9b0f6801690016e842f347878462f43845b",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerifDisplay.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
