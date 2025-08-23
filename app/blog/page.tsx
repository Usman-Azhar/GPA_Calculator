import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { BookOpen, Clock, User, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    slug: "how-to-calculate-gpa-online",
    title: "How to Calculate Your GPA Online (Step-by-Step Guide for Students)",
    description:
      "Learn how to calculate your GPA using online tools with our comprehensive step-by-step guide. Perfect for students who want to track their academic performance accurately.",
    author: "Academic Team",
    readTime: "8 min read",
    publishDate: "January 15, 2025",
    category: "Tutorial",
    featured: true,
  },
  {
    slug: "gpa-scales-explained",
    title: "GPA Scales Explained: 4.0 vs 4.3 vs 5.0 – What's the Difference?",
    description:
      "Understand the differences between various GPA scales used by universities worldwide. Learn which scale your institution uses and how it affects your academic standing.",
    author: "Academic Team",
    readTime: "6 min read",
    publishDate: "January 12, 2025",
    category: "Education",
    featured: true,
  },
  {
    slug: "convert-gpa-to-percentage",
    title: "How to Convert GPA to Percentage (With Examples & Calculator)",
    description:
      "Master the art of converting GPA to percentage with practical examples and formulas. Essential for international applications and scholarship requirements.",
    author: "Academic Team",
    readTime: "7 min read",
    publishDate: "January 10, 2025",
    category: "Guide",
    featured: true,
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-full">
              <BookOpen className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">GPA Calculator Blog</h1>
              <p className="text-xl text-white/90 mt-2">Expert Guides & Educational Resources</p>
            </div>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            Discover comprehensive guides, tips, and insights about GPA calculation, academic performance tracking, and
            educational success strategies.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Articles</h2>
              <p className="text-muted-foreground">Stay updated with the latest guides and educational content</p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    {post.featured && <Badge variant="default">Featured</Badge>}
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{post.publishDate}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-muted/30 rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help with GPA Calculations?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Use our professional GPA calculators to track your academic performance and plan your educational journey
              effectively.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                GPA Calculator
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/semester-gpa"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
              >
                Semester GPA
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/percentage"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors font-medium"
              >
                Percentage Converter
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
