import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Target, Users, Award, BookOpen, Calculator } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About Us - GPA Calculator Pro | Professional Academic Tools",
  description:
    "Learn about GPA Calculator Pro, our mission to help university students calculate their Grade Point Average accurately with support for multiple grading systems.",
  keywords: "about GPA calculator, academic tools, university students, grade point average, educational technology",
  openGraph: {
    title: "About Us - GPA Calculator Pro",
    description:
      "Professional GPA calculator designed for university students worldwide with support for multiple grading systems.",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="gradient-hero text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <GraduationCap className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">About GPA Calculator Pro</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Empowering students worldwide with accurate, professional-grade GPA calculation tools designed for
              academic success.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8 flex justify-center">
          <AdBanner slot="1234567890" format="horizontal" className="max-w-4xl w-full" />
        </div>

        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-serif mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At GPA Calculator Pro, we believe that every student deserves access to accurate, reliable tools for
                tracking their academic progress. Our mission is to provide the most comprehensive and user-friendly GPA
                calculator available, supporting the diverse grading systems used by universities worldwide.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We understand that calculating your GPA can be confusing, especially when different institutions use
                different grading scales. That's why we've created a professional-grade calculator that adapts to your
                university's specific requirements, ensuring accuracy and peace of mind.
              </p>
            </div>
            <div className="gradient-card p-8 rounded-lg">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">500K+</div>
                  <div className="text-sm text-muted-foreground">Students Helped</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Countries Served</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Available</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold font-serif text-center mb-12">Why Choose GPA Calculator Pro?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Multiple Grading Systems</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Support for 4.0, 4.3, and other grading scales used by universities worldwide. Choose the system that
                  matches your institution.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Precision Accuracy</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our calculator uses industry-standard algorithms to ensure your GPA calculations are accurate to the
                  hundredth decimal place.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif">User-Friendly Design</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Intuitive interface designed with students in mind. Easy to use on any device, from desktop to mobile.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Completely Free</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No hidden fees, no premium features, no subscriptions. Our GPA calculator is completely free for all
                  students.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Educational Resources</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Beyond calculation, we provide educational content to help you understand GPA systems and improve your
                  academic performance.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Student-Focused</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built by educators and developers who understand the challenges students face in tracking their
                  academic progress.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif">Our Story</CardTitle>
              <CardDescription>How GPA Calculator Pro came to be</CardDescription>
            </CardHeader>
            <CardContent className="max-w-4xl mx-auto">
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  GPA Calculator Pro was born out of a simple frustration experienced by countless university students:
                  the difficulty of accurately calculating their Grade Point Average across different grading systems
                  and institutions.
                </p>
                <p>
                  Our founding team, comprised of educators, software developers, and former university students,
                  recognized that existing GPA calculators were often inaccurate, difficult to use, or didn't support
                  the variety of grading systems used by universities worldwide.
                </p>
                <p>
                  We set out to create something better – a professional-grade tool that would be accurate, easy to use,
                  and completely free for students everywhere. After months of research into different grading systems
                  and extensive testing with students from various universities, GPA Calculator Pro was launched.
                </p>
                <p>
                  Today, we're proud to serve hundreds of thousands of students from over 50 countries, helping them
                  track their academic progress with confidence and accuracy.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="flex justify-center">
          <AdBanner slot="0987654321" format="rectangle" className="max-w-md w-full" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
