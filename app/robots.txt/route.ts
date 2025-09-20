export async function GET() {
  return new Response(
    `User-agent: Googlebot

User-agent: *
Allow: /

Sitemap: https://gpacalculatoronline.vercel.app/sitemap.xml`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    },
  )
}
