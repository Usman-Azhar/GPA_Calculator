export function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://universitycalc.vercel.app/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin or sensitive areas (none currently)
# Disallow: /admin/

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /`

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
