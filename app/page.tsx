"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Trash2,
  Plus,
  GraduationCap,
  Settings,
  Calculator,
  TrendingUp,
  Sparkles,
  Download,
  BarChart3,
  AlertCircle,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import dynamic from "next/dynamic"

const jsPDF = dynamic(() => import("jspdf").then((mod) => mod.default), { ssr: false })

interface Course {
  id: string
  name: string
  grade: string
  credits: number
}

const gradingSystems = {
  "4.0-with-plus": {
    name: "4.0 Scale (A+ = 4.0)",
    scale: 4.0,
    grades: {
      "A+": 4.0,
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      F: 0.0,
    },
  },
  "4.3-scale": {
    name: "4.3 Scale (A+ = 4.3)",
    scale: 4.3,
    grades: {
      "A+": 4.3,
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      F: 0.0,
    },
  },
  "no-plus": {
    name: "4.0 Scale (No A+)",
    scale: 4.0,
    grades: {
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      F: 0.0,
    },
  },
}

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([{ id: "1", name: "", grade: "", credits: 3 }])
  const [gpa, setGPA] = useState<number | null>(null)
  const [gradingSystem, setGradingSystem] = useState<keyof typeof gradingSystems>("4.0-with-plus")
  const [showSystemSelector, setShowSystemSelector] = useState(true)
  const [totalCredits, setTotalCredits] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showPercentage, setShowPercentage] = useState(false)
  const [percentage, setPercentage] = useState<number | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [converterGPA, setConverterGPA] = useState<string>("")
  const [converterScale, setConverterScale] = useState<string>("4.0")
  const [converterPercentage, setConverterPercentage] = useState<number | null>(null)

  const currentGradePoints = gradingSystems[gradingSystem].grades
  const currentScale = gradingSystems[gradingSystem].scale

  const convertGPAToPercentage = (gpaValue: string, scale: string) => {
    const gpa = Number.parseFloat(gpaValue)
    const scaleNum = Number.parseFloat(scale)

    if (isNaN(gpa) || isNaN(scaleNum) || gpa < 0 || gpa > scaleNum) {
      setConverterPercentage(null)
      return
    }

    const percentage = (gpa / scaleNum) * 100
    setConverterPercentage(Math.round(percentage * 100) / 100)
  }

  const handleConverterChange = () => {
    convertGPAToPercentage(converterGPA, converterScale)
  }

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: "",
      grade: "",
      credits: 3,
    }
    setCourses([...courses, newCourse])
  }

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter((course) => course.id !== id))
    }
  }

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === id) {
          if (field === "credits") {
            const numValue = typeof value === "string" ? Number.parseFloat(value) : value
            if (isNaN(numValue) || numValue <= 0) {
              return { ...course, [field]: 0 }
            }
            return { ...course, [field]: Math.max(0, numValue) }
          }
          return { ...course, [field]: value }
        }
        return course
      }),
    )
  }

  const calculateGPA = () => {
    setIsCalculating(true)
    setErrors([])
    const newErrors: string[] = []

    const validCourses = courses.filter((course) => {
      const hasGrade = course.grade && course.grade.trim() !== ""
      const hasValidCredits = course.credits > 0
      const hasName = course.name && course.name.trim() !== ""

      if (!hasName && (hasGrade || hasValidCredits > 0)) {
        newErrors.push(`Course with grade ${course.grade} is missing a name`)
      }
      if (hasName && !hasGrade) {
        newErrors.push(`${course.name} is missing a grade`)
      }
      if (hasName && hasGrade && !hasValidCredits) {
        newErrors.push(`${course.name} has invalid credit hours`)
      }

      return hasGrade && hasValidCredits
    })

    if (newErrors.length > 0) {
      setErrors(newErrors)
    }

    if (validCourses.length === 0) {
      setGPA(null)
      setTotalCredits(0)
      setPercentage(null)
      setShowPercentage(false)
      setIsCalculating(false)
      return
    }

    let totalPoints = 0
    let credits = 0

    validCourses.forEach((course) => {
      const gradePoints = currentGradePoints[course.grade]
      const coursePoints = gradePoints * course.credits
      totalPoints += coursePoints
      credits += course.credits
    })

    if (credits > 0) {
      const calculatedGPA = totalPoints / credits
      const roundedGPA = Math.round(calculatedGPA * 100) / 100

      setGPA(roundedGPA)
      setTotalCredits(credits)

      const calculatedPercentage = (roundedGPA / currentScale) * 100
      setPercentage(Math.round(calculatedPercentage * 100) / 100)
    } else {
      setGPA(null)
      setTotalCredits(0)
      setPercentage(null)
    }

    setIsCalculating(false)
  }

  const exportToPDF = async () => {
    if (!gpa || courses.length === 0) return

    try {
      const jsPDFModule = await import("jspdf")
      await import("jspdf-autotable")
      const doc = new jsPDFModule.default()

      doc.setFontSize(20)
      doc.text("📊 GPA Report", 20, 30)

      doc.setFontSize(12)
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45)
      doc.text(`Grading System: ${gradingSystems[gradingSystem].name}`, 20, 55)

      doc.setFontSize(16)
      doc.text("GPA Summary", 20, 75)
      doc.setFontSize(14)
      doc.text(`Overall GPA: ${gpa.toFixed(2)} / ${currentScale.toFixed(1)}`, 20, 90)
      doc.text(`Total Credits: ${totalCredits}`, 20, 100)
      if (percentage) {
        doc.text(`Percentage: ${percentage.toFixed(2)}%`, 20, 110)
      }

      const validCourses = courses.filter((course) => course.grade && course.credits > 0)
      const tableData = validCourses.map((course) => [
        course.name || "Unnamed Course",
        course.grade,
        course.credits.toString(),
        (currentGradePoints[course.grade] * course.credits).toFixed(2),
      ])
      ;(doc as any).autoTable({
        head: [["Course Name", "Grade", "Credits", "Grade Points"]],
        body: tableData,
        startY: 125,
        theme: "grid",
        headStyles: { fillColor: [59, 130, 246] },
      })

      doc.save(`GPA-Report-${new Date().toISOString().split("T")[0]}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const resetCalculator = () => {
    setCourses([{ id: "1", name: "", grade: "", credits: 3 }])
    setGPA(null)
    setTotalCredits(0)
    setPercentage(null)
    setShowPercentage(false)
    setErrors([])
  }

  const getGPAFeedback = (gpa: number) => {
    const percentage = (gpa / currentScale) * 100

    if (percentage >= 90) return { text: "Outstanding Performance!", icon: "🏆", color: "text-green-600" }
    if (percentage >= 80) return { text: "Excellent Work!", icon: "🎉", color: "text-green-500" }
    if (percentage >= 70) return { text: "Good Progress!", icon: "👍", color: "text-blue-500" }
    if (percentage >= 60) return { text: "Keep Improving!", icon: "📚", color: "text-yellow-500" }
    return { text: "Focus on Studies!", icon: "💪", color: "text-orange-500" }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-full">
              <GraduationCap className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">📊 Semester GPA Calculator</h1>
              <p className="text-xl text-white/90 mt-2">Calculate Your Semester Grade Point Average</p>
            </div>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            Calculate your semester GPA with precision. Supports multiple grading systems and provides detailed academic
            insights for individual semester performance.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {errors.length > 0 && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-medium mb-2">Please fix the following issues:</div>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="text-sm">
                    {error}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {showSystemSelector && (
          <section className="mb-8">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <CardTitle>Select Your University's Grading System</CardTitle>
                </div>
                <CardDescription>
                  Different universities use different grading scales. Please select the one that matches your
                  institution for accurate GPA calculation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={gradingSystem}
                  onValueChange={(value) => setGradingSystem(value as keyof typeof gradingSystems)}
                >
                  <div className="grid md:grid-cols-3 gap-4">
                    {Object.entries(gradingSystems).map(([key, system]) => (
                      <div
                        key={key}
                        className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <RadioGroupItem value={key} id={key} />
                        <Label htmlFor={key} className="cursor-pointer flex-1">
                          <div className="font-medium">{system.name}</div>
                          <div className="text-sm text-muted-foreground">Max GPA: {system.scale.toFixed(1)}</div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                <Button variant="outline" onClick={() => setShowSystemSelector(false)} className="mt-4">
                  Continue with {gradingSystems[gradingSystem].name}
                </Button>
              </CardContent>
            </Card>
          </section>
        )}

        <section className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <CardTitle>Semester Course Information</CardTitle>
                </div>
                <CardDescription>
                  Enter your semester courses, grades, and credit hours. Using {gradingSystems[gradingSystem].name}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="overflow-x-auto">
                  <div className="min-w-full space-y-4">
                    {courses.map((course, index) => (
                      <div
                        key={course.id}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end p-4 border rounded-lg bg-muted/20"
                      >
                        <div className="sm:col-span-5">
                          <Label htmlFor={`course-${course.id}`} className="font-medium">
                            Course Name
                          </Label>
                          <Input
                            id={`course-${course.id}`}
                            placeholder="e.g., Advanced Calculus"
                            value={course.name}
                            onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                            className="mt-1"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <Label htmlFor={`grade-${course.id}`} className="font-medium">
                            Grade
                          </Label>
                          <Select
                            value={course.grade}
                            onValueChange={(value) => updateCourse(course.id, "grade", value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(currentGradePoints).map(([grade, points]) => (
                                <SelectItem key={grade} value={grade}>
                                  {grade} ({points.toFixed(1)})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="sm:col-span-2">
                          <Label htmlFor={`credits-${course.id}`} className="font-medium">
                            Credits
                          </Label>
                          <Input
                            id={`credits-${course.id}`}
                            type="number"
                            min="0.5"
                            max="6"
                            step="0.5"
                            value={course.credits}
                            onChange={(e) => {
                              const value = Number.parseFloat(e.target.value) || 0
                              updateCourse(course.id, "credits", value)
                            }}
                            className="mt-1"
                            placeholder="e.g., 3 or 1.5"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeCourse(course.id)}
                            disabled={courses.length === 1}
                            className="w-full"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" onClick={addCourse} className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Course
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-4">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle>Your Semester GPA</CardTitle>
                </div>
                <CardDescription>Calculated using {gradingSystems[gradingSystem].name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {gpa !== null ? (
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">{gpa.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      out of {currentScale.toFixed(1)} • {totalCredits} credits
                    </div>

                    {percentage && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600">{percentage.toFixed(2)}%</div>
                        <div className="text-sm text-blue-600">Percentage Equivalent</div>
                      </div>
                    )}

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div
                        className={`text-lg font-medium ${getGPAFeedback(gpa).color} flex items-center justify-center gap-2`}
                      >
                        <Sparkles className="h-5 w-5" />
                        {getGPAFeedback(gpa).icon} {getGPAFeedback(gpa).text}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <div className="text-3xl mb-2">--</div>
                    <div className="text-sm">
                      {courses.some((c) => c.name || c.grade || c.credits > 0)
                        ? "Complete course details to calculate GPA"
                        : "Enter courses to calculate GPA"}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <Button onClick={calculateGPA} className="w-full" size="lg" disabled={isCalculating}>
                    {isCalculating ? "Calculating..." : "Calculate GPA"}
                  </Button>

                  {gpa !== null && (
                    <Button variant="outline" onClick={exportToPDF} className="w-full bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF Report
                    </Button>
                  )}

                  {gpa !== null && (
                    <Button
                      variant="outline"
                      onClick={() => setShowPercentage(!showPercentage)}
                      className="w-full bg-transparent"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Convert GPA to Percentage
                    </Button>
                  )}

                  <Button variant="outline" onClick={resetCalculator} className="w-full bg-transparent">
                    Reset Calculator
                  </Button>
                  {!showSystemSelector && (
                    <Button variant="ghost" onClick={() => setShowSystemSelector(true)} className="w-full text-sm">
                      Change Grading System
                    </Button>
                  )}
                </div>

                <div className="text-xs text-muted-foreground space-y-1 bg-muted/50 p-3 rounded-lg">
                  <div className="font-medium">Current Grade Scale:</div>
                  {Object.entries(currentGradePoints).map(([grade, points]) => (
                    <div key={grade} className="flex justify-between">
                      <span>{grade}:</span>
                      <span>{points.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-12">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <CardTitle className="text-2xl">GPA to Percentage Converter</CardTitle>
              </div>
              <CardDescription>
                Convert any GPA to percentage using different grading scales. Perfect for international applications and
                comparisons.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="converter-gpa" className="font-medium">
                      Enter GPA/CGPA
                    </Label>
                    <Input
                      id="converter-gpa"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="e.g., 3.75"
                      value={converterGPA}
                      onChange={(e) => {
                        setConverterGPA(e.target.value)
                        handleConverterChange()
                      }}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="converter-scale" className="font-medium">
                      Select Grading Scale
                    </Label>
                    <Select
                      value={converterScale}
                      onValueChange={(value) => {
                        setConverterScale(value)
                        handleConverterChange()
                      }}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select scale" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4.0">4.0 Scale</SelectItem>
                        <SelectItem value="4.3">4.3 Scale</SelectItem>
                        <SelectItem value="5.0">5.0 Scale</SelectItem>
                        <SelectItem value="10.0">10.0 Scale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
                    {converterPercentage !== null ? (
                      <>
                        <div className="text-4xl font-bold text-blue-600 mb-2">{converterPercentage.toFixed(2)}%</div>
                        <div className="text-sm text-blue-600 font-medium">Percentage Equivalent</div>
                        <div className="text-xs text-muted-foreground mt-2">
                          {converterGPA} out of {converterScale}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-muted-foreground mb-2">--%</div>
                        <div className="text-sm text-muted-foreground">Enter valid GPA to see percentage</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Formula Used:</h4>
                <p className="text-sm text-muted-foreground">Percentage = (GPA ÷ Scale) × 100</p>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <div className="font-medium">4.0 Scale</div>
                    <div className="text-muted-foreground">Most US Universities</div>
                  </div>
                  <div>
                    <div className="font-medium">4.3 Scale</div>
                    <div className="text-muted-foreground">Some Canadian Unis</div>
                  </div>
                  <div>
                    <div className="font-medium">5.0 Scale</div>
                    <div className="text-muted-foreground">Some European Unis</div>
                  </div>
                  <div>
                    <div className="font-medium">10.0 Scale</div>
                    <div className="text-muted-foreground">Indian Universities</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">How accurate is this semester GPA calculator?</h3>
                <p className="text-muted-foreground">
                  Our semester GPA calculator is highly accurate and supports multiple grading systems used by
                  universities worldwide. It follows standard GPA calculation methods for individual semester
                  performance.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">What grading systems are supported?</h3>
                <p className="text-muted-foreground">
                  We support 4.0 scale (with and without A+), 4.3 scale, and other common university grading systems.
                  You can select the system that matches your institution for accurate calculations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Is this calculator free to use?</h3>
                <p className="text-muted-foreground">
                  Yes, our semester GPA calculator is completely free to use. There are no hidden fees or premium
                  features. Calculate your semester GPA as many times as you need without any restrictions.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-muted mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Semester GPA Calculator</h3>
              <p className="text-muted-foreground text-sm">
                Professional semester GPA calculator for university students worldwide. Calculate your Grade Point
                Average with precision and ease.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Semester GPA Calculator
                  </a>
                </li>
                <li>
                  <a href="/cumulative-gpa" className="text-muted-foreground hover:text-primary transition-colors">
                    Cumulative GPA
                  </a>
                </li>
                <li>
                  <a href="/percentage" className="text-muted-foreground hover:text-primary transition-colors">
                    Percentage Converter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Semester GPA Calculator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
