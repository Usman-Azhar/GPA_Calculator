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
  title: "GPA Calculator - Free Semester & CGPA Calculator Tool",
  description:
    "Free GPA calculator for students. Calculate semester GPA, cumulative CGPA, and convert to percentage. Supports 4.0, 4.3 scales. Accurate & easy to use.",
  keywords: [
    "GPA calculator",
    "semester GPA calculator",
    "cumulative GPA calculator",
    "CGPA calculator",
    "GPA to percentage converter",
    "college GPA calculator",
    "university grade calculator",
    "4.0 scale GPA",
    "4.3 scale GPA",
    "student grade tools",
    "academic calculator",
    "free GPA calculator",
    "grade point average calculator",
    "semester grade calculator",
    "college grade tracker",
  ].join(", "),
  authors: [{ name: "GPA Calculator Team" }],
  creator: "GPA Calculator",
  publisher: "GPA Calculator",
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
    url: "https://gpa-calculator.vercel.app",
    siteName: "GPA Calculator",
    title: "Free GPA Calculator - Calculate Semester & Cumulative GPA",
    description:
      "Calculate your GPA instantly with our free tool. Supports semester GPA, cumulative CGPA, and percentage conversion. Multiple grading scales supported.",
    images: [
      {
        url: "/semester-gpa-calculator.png",
        width: 1200,
        height: 630,
        alt: "Free GPA Calculator - Calculate Semester and Cumulative GPA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free GPA Calculator - Calculate Semester & Cumulative GPA",
    description:
      "Calculate your GPA instantly with our free tool. Supports multiple grading scales and percentage conversion.",
    images: ["/semester-gpa-calculator.png"],
  },
  alternates: {
    canonical: "https://gpa-calculator.vercel.app",
  },
  category: "education",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#f59e0b" }],
  },
  manifest: "/site.webmanifest",
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
              name: "GPA Calculator",
              description:
                "Free GPA calculator for students to calculate semester GPA, cumulative CGPA, and convert to percentage with multiple grading system support",
              url: "https://gpa-calculator.vercel.app",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "GPA Calculator Team",
              },
              featureList: [
                "Semester GPA calculation",
                "Cumulative GPA (CGPA) calculation",
                "GPA to percentage conversion",
                "Multiple grading systems (4.0, 4.3, 5.0, 10.0 scales)",
                "Real-time calculation",
                "PDF report export",
                "Free to use",
              ],
            }),
          }}
        />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="msapplication-TileColor" content="#f59e0b" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="2NOasTZlgL9VKaI0dtzicOEBZGFBtYKhZTTxgx5nQBU" />
      </head>
      <body className="font-sans">
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
