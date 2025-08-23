import type React from "react"
import type { Metadata } from "next"
import { Geist, Manrope } from "next/font/google"
import "./globals.css"
import { CookieConsent } from "@/components/cookie-consent"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Semester GPA Calculator Pro - Calculate Your University GPA | Free Academic Tool",
  description:
    "Professional semester GPA calculator for university students. Calculate your Grade Point Average with support for different grading systems (4.0, 4.3 scales). Free, accurate, and easy to use academic tool.",
  keywords: [
    "semester GPA calculator",
    "university GPA",
    "grade point average",
    "college calculator",
    "academic tools",
    "4.0 scale",
    "4.3 scale",
    "student calculator",
    "semester GPA",
    "college grades",
    "university grades",
  ].join(", "),
  authors: [{ name: "Semester GPA Calculator Pro Team" }],
  creator: "Semester GPA Calculator Pro",
  publisher: "Semester GPA Calculator Pro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://semester-gpa-calculator-pro.vercel.app",
    siteName: "Semester GPA Calculator Pro",
    title: "Semester GPA Calculator Pro - Calculate Your University GPA",
    description:
      "Professional semester GPA calculator for university students with support for different grading systems. Calculate your Grade Point Average accurately and for free.",
    images: [
      {
        url: "/placeholder-fmp07.png",
        width: 1200,
        height: 630,
        alt: "Semester GPA Calculator Pro - Professional Grade Point Average Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Semester GPA Calculator Pro - Calculate Your University GPA",
    description:
      "Professional semester GPA calculator for university students with support for different grading systems.",
    images: ["/semester-gpa-calculator.png"],
    creator: "@semestergpacalc",
  },
  alternates: {
    canonical: "https://semester-gpa-calculator-pro.vercel.app",
  },
  category: "education",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} ${manrope.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Semester GPA Calculator Pro",
              description:
                "Professional semester GPA calculator for university students with support for different grading systems",
              url: "https://semester-gpa-calculator-pro.vercel.app",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "Semester GPA Calculator Pro Team",
              },
              featureList: [
                "Multiple grading systems support",
                "4.0 and 4.3 GPA scales",
                "Real-time GPA calculation",
                "Course management",
                "Academic performance insights",
              ],
            }),
          }}
        />
        <meta name="theme-color" content="#059669" />
        <meta name="msapplication-TileColor" content="#059669" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans">
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
