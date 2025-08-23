import Head from "next/head"

interface SEOHeadProps {
  title?: string
  description?: string
  canonical?: string
  noindex?: boolean
}

export function SEOHead({
  title = "GPA Calculator Pro - Calculate Your University GPA",
  description = "Professional GPA calculator for university students with support for different grading systems.",
  canonical,
  noindex = false,
}: SEOHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Additional SEO tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </Head>
  )
}
