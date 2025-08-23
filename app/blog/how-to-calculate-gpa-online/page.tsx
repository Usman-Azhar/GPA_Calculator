import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Clock, User, ArrowLeft, Calculator, CheckCircle, AlertCircle } from "lucide-react"

export default function HowToCalculateGPAOnline() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">Tutorial</Badge>
            <Badge variant="outline" className="text-white border-white/30">
              Featured
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            How to Calculate Your GPA Online (Step-by-Step Guide for Students)
          </h1>

          <div className="flex items-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Academic Team</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>8 min read</span>
            </div>
            <span>January 15, 2025</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <Calculator className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Summary</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  This comprehensive guide will teach you how to calculate your GPA using online tools, understand
                  different grading systems, and track your academic performance effectively. Perfect for students at
                  any level.
                </p>
              </div>
            </div>
          </div>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">What is GPA and Why Does It Matter?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Grade Point Average (GPA) is a standardized way to measure academic performance. It's calculated by
              averaging the grade points earned in all courses, weighted by the number of credit hours for each course.
            </p>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Why GPA Matters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Required for college admissions and scholarship applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Determines academic standing and graduation eligibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Influences job opportunities and graduate school acceptance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Helps track academic progress and identify areas for improvement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">Step-by-Step Guide to Calculate GPA Online</h2>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    Choose the Right GPA Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Select a reliable online GPA calculator that supports your university's grading system:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Look for calculators that support multiple grading scales (4.0, 4.3, 5.0, 10.0)</li>
                    <li>Ensure it handles both letter grades and numerical grades</li>
                    <li>Choose tools that save your data for future reference</li>
                    <li>Verify it calculates both semester and cumulative GPA</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    Select Your Grading System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Identify your university's grading scale:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">4.0 Scale (Most Common)</h4>
                      <ul className="text-sm space-y-1">
                        <li>A+ = 4.0, A = 4.0, A- = 3.7</li>
                        <li>B+ = 3.3, B = 3.0, B- = 2.7</li>
                        <li>C+ = 2.3, C = 2.0, C- = 1.7</li>
                        <li>D+ = 1.3, D = 1.0, F = 0.0</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">4.3 Scale</h4>
                      <ul className="text-sm space-y-1">
                        <li>A+ = 4.3, A = 4.0, A- = 3.7</li>
                        <li>B+ = 3.3, B = 3.0, B- = 2.7</li>
                        <li>Same for C, D, F grades</li>
                        <li>Used by some Canadian universities</li>
                      </ul>
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
                    Enter Your Course Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">For each course, you'll need to input:</p>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-2">Course Name</h4>
                      <p className="text-sm text-muted-foreground">
                        Enter a descriptive name like "Calculus I" or "English Literature"
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-2">Grade Received</h4>
                      <p className="text-sm text-muted-foreground">
                        Select your letter grade (A+, A, A-, B+, etc.) from the dropdown
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-2">Credit Hours</h4>
                      <p className="text-sm text-muted-foreground">
                        Enter the number of credits (usually 1-6, commonly 3 for most courses)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      4
                    </span>
                    Calculate and Review Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Once you've entered all courses, click "Calculate GPA" to see:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>
                        <strong>Your GPA:</strong> Rounded to two decimal places (e.g., 3.75)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>
                        <strong>Total Credits:</strong> Sum of all credit hours
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>
                        <strong>Percentage Equivalent:</strong> Your GPA converted to percentage
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>
                        <strong>Performance Feedback:</strong> Academic standing assessment
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid</h2>

            <div className="space-y-4">
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2">Using the Wrong Grading Scale</h4>
                      <p className="text-orange-800 text-sm">
                        Always verify your university's grading scale. Using 4.0 when your school uses 4.3 will give
                        incorrect results.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2">Incorrect Credit Hours</h4>
                      <p className="text-orange-800 text-sm">
                        Double-check credit hours for each course. Lab courses, seminars, and lectures may have
                        different credit values.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2">Including Non-Credit Courses</h4>
                      <p className="text-orange-800 text-sm">
                        Don't include pass/fail courses, audited classes, or non-credit activities in your GPA
                        calculation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">Tips for Maintaining a High GPA</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Attend all classes and participate actively</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Complete assignments on time and with quality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Form study groups with classmates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Utilize office hours and tutoring services</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Planning & Organization</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Track your GPA regularly each semester</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Plan course loads strategically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Consider retaking courses if allowed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Balance challenging and easier courses</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-10">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl">Ready to Calculate Your GPA?</CardTitle>
                <CardDescription>
                  Use our professional GPA calculator to track your academic performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    <Calculator className="h-4 w-4" />
                    Start Calculating
                  </Link>
                  <Link
                    href="/semester-gpa"
                    className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                  >
                    Semester GPA Calculator
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
