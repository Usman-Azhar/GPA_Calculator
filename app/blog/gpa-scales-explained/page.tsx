import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Clock, User, ArrowLeft, GraduationCap, Globe, CheckCircle } from "lucide-react"

export default function GPAScalesExplained() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">Education</Badge>
            <Badge variant="outline" className="text-white border-white/30">
              Featured
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            GPA Scales Explained: 4.0 vs 4.3 vs 5.0 – What's the Difference?
          </h1>

          <div className="flex items-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Academic Team</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>6 min read</span>
            </div>
            <span>January 12, 2025</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="prose prose-lg max-w-none">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <GraduationCap className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">Understanding GPA Scales</h3>
                <p className="text-green-800 text-sm leading-relaxed">
                  Different universities worldwide use various GPA scales to measure academic performance. This guide
                  explains the most common scales and helps you understand which one your institution uses.
                </p>
              </div>
            </div>
          </div>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">What Are GPA Scales?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              A GPA scale is the numerical system used to convert letter grades into grade points for calculating your
              Grade Point Average. The scale determines the maximum possible GPA and how letter grades are weighted.
            </p>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Global Variations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Different countries and educational systems have developed their own GPA scales based on their grading
                  traditions and academic standards. Understanding these differences is crucial for international
                  students and those applying to foreign universities.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">The 4.0 Scale: Most Common System</h2>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>4.0 Scale Overview</CardTitle>
                <CardDescription>Used by most US universities and many international institutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Grade Point Values</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">A+ / A</span>
                        <span>4.0</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">A-</span>
                        <span>3.7</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">B+</span>
                        <span>3.3</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">B</span>
                        <span>3.0</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">B-</span>
                        <span>2.7</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">C+ and below</span>
                        <span>2.3 - 0.0</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Key Characteristics</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Maximum GPA: 4.0</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>A+ and A both equal 4.0</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Most widely recognized</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Standard for US admissions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Universities Using 4.0 Scale</h4>
                <p className="text-sm text-muted-foreground mb-3">Examples include:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <span>• Harvard University</span>
                  <span>• Stanford University</span>
                  <span>• MIT</span>
                  <span>• UCLA</span>
                  <span>• University of Michigan</span>
                  <span>• NYU</span>
                  <span>• Most US colleges</span>
                  <span>• Many international schools</span>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">The 4.3 Scale: Canadian Standard</h2>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>4.3 Scale Overview</CardTitle>
                <CardDescription>Primarily used by Canadian universities and some US institutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Grade Point Values</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">A+</span>
                        <span className="font-bold text-green-600">4.3</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">A</span>
                        <span>4.0</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">A-</span>
                        <span>3.7</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">B+</span>
                        <span>3.3</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">B and below</span>
                        <span>3.0 - 0.0</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Key Differences</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Maximum GPA: 4.3</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>A+ = 4.3 (higher than A)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Rewards exceptional performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Common in Canada</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Universities Using 4.3 Scale</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <span>• University of Toronto</span>
                  <span>• McGill University</span>
                  <span>• University of British Columbia</span>
                  <span>• McMaster University</span>
                  <span>• Some US graduate schools</span>
                  <span>• Select private institutions</span>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">The 5.0 Scale: European Approach</h2>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>5.0 Scale Overview</CardTitle>
                <CardDescription>Used by some European universities and specialized programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Typical Grade Distribution</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">Excellent (A+)</span>
                        <span>5.0</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">Very Good (A)</span>
                        <span>4.5</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">Good (A-/B+)</span>
                        <span>4.0</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">Satisfactory (B)</span>
                        <span>3.0</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">Pass and below</span>
                        <span>2.0 - 0.0</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Characteristics</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Maximum GPA: 5.0</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>More granular grading</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>European standard in some countries</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Used in specialized programs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">The 10.0 Scale: Indian System</h2>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>10.0 Scale Overview</CardTitle>
                <CardDescription>Widely used in Indian universities and technical institutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Grade Distribution</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">Outstanding (O)</span>
                        <span>10.0</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">Excellent (A+)</span>
                        <span>9.0</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">Very Good (A)</span>
                        <span>8.0</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">Good (B+)</span>
                        <span>7.0</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">Average and below</span>
                        <span>6.0 - 0.0</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Maximum GPA: 10.0</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Highly detailed scale</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Standard in Indian education</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Used by IITs, NITs, and most universities</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Indian Institutions Using 10.0 Scale</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <span>• IIT (All campuses)</span>
                  <span>• NIT (All campuses)</span>
                  <span>• BITS Pilani</span>
                  <span>• Delhi University</span>
                  <span>• Mumbai University</span>
                  <span>• Most Indian universities</span>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">How to Convert Between Scales</h2>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Conversion Formula</CardTitle>
                <CardDescription>Universal method for converting between any GPA scales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted/30 rounded-lg font-mono text-center mb-4">
                  New GPA = (Current GPA ÷ Current Scale) × New Scale
                </div>

                <h4 className="font-semibold mb-3">Conversion Examples</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">4.0 to 4.3 Scale</h5>
                    <p className="text-sm text-muted-foreground">3.5 GPA on 4.0 scale</p>
                    <p className="text-sm">(3.5 ÷ 4.0) × 4.3 = 3.76</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">10.0 to 4.0 Scale</h5>
                    <p className="text-sm text-muted-foreground">8.5 GPA on 10.0 scale</p>
                    <p className="text-sm">(8.5 ÷ 10.0) × 4.0 = 3.4</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">Which Scale Should You Use?</h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>For US Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">Use the 4.0 scale for:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Undergraduate admissions</li>
                    <li>• Graduate school applications</li>
                    <li>• Scholarship applications</li>
                    <li>• Job applications in the US</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>For Canadian Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">Check if the institution uses:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• 4.3 scale (most common)</li>
                    <li>• 4.0 scale (some institutions)</li>
                    <li>• Percentage system (some provinces)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>For International Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">Always verify the required scale:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Check university websites</li>
                    <li>• Contact admissions offices</li>
                    <li>• Use official conversion tools when available</li>
                    <li>• Consider professional credential evaluation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-10">
            <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-2xl">Calculate Your GPA on Any Scale</CardTitle>
                <CardDescription>Use our calculators that support all major GPA scales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    <GraduationCap className="h-4 w-4" />
                    GPA Calculator
                  </Link>
                  <Link
                    href="/percentage"
                    className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                  >
                    Scale Converter
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </article>
      </main>
    </div>
  )
}
