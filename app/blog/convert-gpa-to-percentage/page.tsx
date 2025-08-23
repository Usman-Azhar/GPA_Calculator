import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Clock, User, ArrowLeft, BarChart3, Calculator, CheckCircle, AlertTriangle } from "lucide-react"

export default function ConvertGPAToPercentage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">Guide</Badge>
            <Badge variant="outline" className="text-white border-white/30">
              Featured
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            How to Convert GPA to Percentage (With Examples & Calculator)
          </h1>

          <div className="flex items-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Academic Team</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>7 min read</span>
            </div>
            <span>January 10, 2025</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="prose prose-lg max-w-none">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <BarChart3 className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-orange-900 mb-2">Master GPA to Percentage Conversion</h3>
                <p className="text-orange-800 text-sm leading-relaxed">
                  Learn the universal formula, see practical examples, and use our calculator to convert any GPA to
                  percentage. Essential for international applications and academic comparisons.
                </p>
              </div>
            </div>
          </div>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">Why Convert GPA to Percentage?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Converting GPA to percentage is essential for international applications, scholarship requirements, job
              applications, and comparing academic performance across different educational systems.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Common Use Cases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>International university applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Scholarship and fellowship applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Job applications requiring percentage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Academic performance comparisons</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    Important Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                      <span>Different institutions may have specific requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                      <span>Some countries use different conversion methods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                      <span>Always verify with target institution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                      <span>Consider professional credential evaluation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">The Universal Conversion Formula</h2>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Standard Formula</CardTitle>
                <CardDescription>This formula works for any GPA scale worldwide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-200 text-center mb-6">
                  <div className="text-2xl font-bold text-orange-600 mb-2">Percentage = (GPA ÷ Scale) × 100</div>
                  <p className="text-sm text-orange-700">
                    Where Scale is the maximum possible GPA (4.0, 4.3, 5.0, 10.0, etc.)
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="font-semibold">GPA</div>
                    <div className="text-muted-foreground">Your actual GPA</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="font-semibold">Scale</div>
                    <div className="text-muted-foreground">Maximum possible GPA</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="font-semibold">Percentage</div>
                    <div className="text-muted-foreground">Result (0-100%)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">Step-by-Step Conversion Examples</h2>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    4.0 Scale Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Given Information</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>GPA:</strong> 3.75
                        </li>
                        <li>
                          <strong>Scale:</strong> 4.0 (maximum possible)
                        </li>
                        <li>
                          <strong>Goal:</strong> Convert to percentage
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Calculation</h4>
                      <div className="space-y-2 text-sm font-mono bg-muted/30 p-3 rounded">
                        <div>Percentage = (3.75 ÷ 4.0) × 100</div>
                        <div>Percentage = 0.9375 × 100</div>
                        <div className="font-bold text-orange-600">Percentage = 93.75%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    4.3 Scale Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Given Information</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>GPA:</strong> 3.9
                        </li>
                        <li>
                          <strong>Scale:</strong> 4.3 (Canadian system)
                        </li>
                        <li>
                          <strong>Goal:</strong> Convert to percentage
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Calculation</h4>
                      <div className="space-y-2 text-sm font-mono bg-muted/30 p-3 rounded">
                        <div>Percentage = (3.9 ÷ 4.3) × 100</div>
                        <div>Percentage = 0.9070 × 100</div>
                        <div className="font-bold text-orange-600">Percentage = 90.70%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      3
                    </span>
                    10.0 Scale Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Given Information</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>GPA:</strong> 8.5
                        </li>
                        <li>
                          <strong>Scale:</strong> 10.0 (Indian system)
                        </li>
                        <li>
                          <strong>Goal:</strong> Convert to percentage
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Calculation</h4>
                      <div className="space-y-2 text-sm font-mono bg-muted/30 p-3 rounded">
                        <div>Percentage = (8.5 ÷ 10.0) × 100</div>
                        <div>Percentage = 0.85 × 100</div>
                        <div className="font-bold text-orange-600">Percentage = 85.00%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">Comprehensive Conversion Table</h2>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Quick Reference Guide</CardTitle>
                <CardDescription>Common GPA to percentage conversions for different scales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">GPA</th>
                        <th className="text-left p-2">4.0 Scale</th>
                        <th className="text-left p-2">4.3 Scale</th>
                        <th className="text-left p-2">5.0 Scale</th>
                        <th className="text-left p-2">10.0 Scale</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-medium">4.0 / 4.3 / 5.0 / 10.0</td>
                        <td className="p-2">100.00%</td>
                        <td className="p-2">100.00%</td>
                        <td className="p-2">100.00%</td>
                        <td className="p-2">100.00%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">3.8 / 4.1 / 4.75 / 9.5</td>
                        <td className="p-2">95.00%</td>
                        <td className="p-2">95.35%</td>
                        <td className="p-2">95.00%</td>
                        <td className="p-2">95.00%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">3.6 / 3.9 / 4.5 / 9.0</td>
                        <td className="p-2">90.00%</td>
                        <td className="p-2">90.70%</td>
                        <td className="p-2">90.00%</td>
                        <td className="p-2">90.00%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">3.4 / 3.7 / 4.25 / 8.5</td>
                        <td className="p-2">85.00%</td>
                        <td className="p-2">86.05%</td>
                        <td className="p-2">85.00%</td>
                        <td className="p-2">85.00%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">3.2 / 3.4 / 4.0 / 8.0</td>
                        <td className="p-2">80.00%</td>
                        <td className="p-2">79.07%</td>
                        <td className="p-2">80.00%</td>
                        <td className="p-2">80.00%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">3.0 / 3.2 / 3.75 / 7.5</td>
                        <td className="p-2">75.00%</td>
                        <td className="p-2">74.42%</td>
                        <td className="p-2">75.00%</td>
                        <td className="p-2">75.00%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">Grade Equivalents and Performance Levels</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>US Grade Equivalents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-green-50 rounded">
                      <span className="font-medium">97-100%</span>
                      <span>A+</span>
                    </div>
                    <div className="flex justify-between p-2 bg-green-50 rounded">
                      <span className="font-medium">93-96%</span>
                      <span>A</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-50 rounded">
                      <span className="font-medium">90-92%</span>
                      <span>A-</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-50 rounded">
                      <span className="font-medium">87-89%</span>
                      <span>B+</span>
                    </div>
                    <div className="flex justify-between p-2 bg-yellow-50 rounded">
                      <span className="font-medium">83-86%</span>
                      <span>B</span>
                    </div>
                    <div className="flex justify-between p-2 bg-yellow-50 rounded">
                      <span className="font-medium">80-82%</span>
                      <span>B-</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-green-50 rounded">
                      <span className="font-medium">90-100%</span>
                      <span className="text-green-600 font-semibold">Outstanding</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-50 rounded">
                      <span className="font-medium">80-89%</span>
                      <span className="text-blue-600 font-semibold">Excellent</span>
                    </div>
                    <div className="flex justify-between p-2 bg-yellow-50 rounded">
                      <span className="font-medium">70-79%</span>
                      <span className="text-yellow-600 font-semibold">Good</span>
                    </div>
                    <div className="flex justify-between p-2 bg-orange-50 rounded">
                      <span className="font-medium">60-69%</span>
                      <span className="text-orange-600 font-semibold">Satisfactory</span>
                    </div>
                    <div className="flex justify-between p-2 bg-red-50 rounded">
                      <span className="font-medium">Below 60%</span>
                      <span className="text-red-600 font-semibold">Needs Improvement</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">Special Considerations</h2>

            <div className="space-y-6">
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    Weighted vs Unweighted GPA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-yellow-800 text-sm mb-3">
                    Some institutions use weighted GPAs that can exceed the standard scale maximum (e.g., 4.5 on a 4.0
                    scale due to honors courses).
                  </p>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• Always specify if your GPA is weighted or unweighted</li>
                    <li>• Some applications require unweighted GPA only</li>
                    <li>• Conversion may need adjustment for weighted GPAs</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    International Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800 text-sm mb-3">
                    Different countries may have specific conversion requirements or preferred methods.
                  </p>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• UK: Often requires specific conversion tables</li>
                    <li>• Canada: May use different provincial standards</li>
                    <li>• Australia: Has its own GPA scale (7.0)</li>
                    <li>• Europe: ECTS grading scale may be preferred</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">Tips for Accurate Conversion</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Best Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Always verify your institution's exact GPA scale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Round to two decimal places for consistency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Keep documentation of your conversion method</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Use official transcripts when possible</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Common Mistakes to Avoid</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                      <span>Using the wrong scale maximum</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                      <span>Confusing weighted and unweighted GPAs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                      <span>Not accounting for institutional variations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                      <span>Assuming all 4.0 scales are identical</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-10">
            <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardHeader>
                <CardTitle className="text-2xl">Use Our GPA to Percentage Converter</CardTitle>
                <CardDescription>Get instant, accurate conversions with our professional calculator</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/percentage"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Convert Now
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                  >
                    <Calculator className="h-4 w-4" />
                    Calculate GPA First
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
