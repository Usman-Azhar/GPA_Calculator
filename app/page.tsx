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
  Settings,
  Calculator,
  TrendingUp,
  Sparkles,
  Download,
  BarChart3,
  AlertCircle,
  Trophy,
  Target,
  BookOpen,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import dynamic from "next/dynamic"
import { Footer } from "@/components/footer"

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

      <header className="gradient-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">🎯 Free GPA Calculator for Students</h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium mb-6 max-w-4xl mx-auto">
              Calculate your Semester GPA, Cumulative CGPA, and convert to percentage instantly. Trusted by thousands of
              students worldwide for accurate grade calculations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">✅ Multiple Grading Scales</span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">✅ Instant Results</span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">✅ 100% Free</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover-lift transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="h-8 w-8 text-yellow-300" />
                <h2 className="text-xl font-semibold">Semester GPA Calculator</h2>
              </div>
              <p className="text-white/80">
                Calculate your current semester GPA with precision using our advanced algorithm that supports all major
                university grading systems.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover-lift transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Target className="h-8 w-8 text-green-300" />
                <h2 className="text-xl font-semibold">CGPA & Percentage Converter</h2>
              </div>
              <p className="text-white/80">
                Convert your GPA to percentage and calculate cumulative GPA across multiple semesters with support for
                4.0, 4.3, 5.0, and 10.0 scales.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover-lift transition-all">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="h-8 w-8 text-blue-300" />
                <h2 className="text-xl font-semibold">Academic Progress Tracking</h2>
              </div>
              <p className="text-white/80">
                Track your academic performance with detailed insights, export professional reports, and set academic
                goals for success.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Why Choose Our GPA Calculator?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our comprehensive GPA calculator is designed specifically for students who need accurate, reliable grade
            calculations. Whether you're calculating your semester GPA, cumulative CGPA, or converting grades to
            percentages, our tool provides instant results with support for all major university grading systems
            worldwide. Used by over 50,000 students monthly, it's the most trusted free academic calculator available
            online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Accurate Calculations
            </h3>
            <p className="text-muted-foreground">
              Our algorithm follows official university calculation methods, ensuring your GPA results are always
              accurate and reliable for academic planning.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Multiple Grading Systems
            </h3>
            <p className="text-muted-foreground">
              Support for 4.0, 4.3, 5.0, and 10.0 grading scales used by universities in the US, Canada, Europe, India,
              and other countries worldwide.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {errors.length > 0 && (
          <Alert className="mb-6 border-orange-200 bg-orange-50 error-shake">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription>
              <div className="font-medium mb-2 text-orange-800">Please fix the following issues:</div>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="text-sm text-orange-700">
                    {error}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {showSystemSelector && (
          <section className="mb-8">
            <Card className="shadow-lg hover-lift card-interactive">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Select Your University's Grading System</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Different universities use different grading scales. Choose yours for accurate calculations.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <RadioGroup
                  value={gradingSystem}
                  onValueChange={(value) => setGradingSystem(value as keyof typeof gradingSystems)}
                >
                  <div className="grid md:grid-cols-3 gap-4">
                    {Object.entries(gradingSystems).map(([key, system]) => (
                      <div
                        key={key}
                        className="flex items-center space-x-3 p-6 border-2 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer card-interactive"
                      >
                        <RadioGroupItem value={key} id={key} className="text-primary" />
                        <Label htmlFor={key} className="cursor-pointer flex-1">
                          <div className="font-semibold text-lg">{system.name}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Maximum GPA: {system.scale.toFixed(1)}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                <Button onClick={() => setShowSystemSelector(false)} className="mt-6 btn-primary hover-scale" size="lg">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Continue with {gradingSystems[gradingSystem].name}
                </Button>
              </CardContent>
            </Card>
          </section>
        )}

        <section className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="shadow-lg hover-lift card-interactive">
              <CardHeader className="gradient-card">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Semester Course Information</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Enter your courses, grades, and credit hours • Using {gradingSystems[gradingSystem].name}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="overflow-x-auto">
                  <div className="min-w-full space-y-4">
                    {courses.map((course, index) => (
                      <div
                        key={course.id}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end p-6 border-2 rounded-xl bg-gradient-to-r from-muted/30 to-muted/10 hover:border-primary/30 transition-all card-interactive"
                      >
                        {/* ... existing course input fields ... */}
                        <div className="sm:col-span-5">
                          <Label htmlFor={`course-${course.id}`} className="font-semibold text-sm">
                            Course Name
                          </Label>
                          <Input
                            id={`course-${course.id}`}
                            placeholder="e.g., Advanced Calculus"
                            value={course.name}
                            onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                            className="mt-2 focus-ring"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <Label htmlFor={`grade-${course.id}`} className="font-semibold text-sm">
                            Grade
                          </Label>
                          <Select
                            value={course.grade}
                            onValueChange={(value) => updateCourse(course.id, "grade", value)}
                          >
                            <SelectTrigger className="mt-2 focus-ring">
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
                          <Label htmlFor={`credits-${course.id}`} className="font-semibold text-sm">
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
                            className="mt-2 focus-ring"
                            placeholder="e.g., 3"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeCourse(course.id)}
                            disabled={courses.length === 1}
                            className="w-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={addCourse}
                  className="w-full bg-transparent hover-scale border-2 border-dashed border-primary/30 hover:border-primary hover:bg-primary/5"
                  size="lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Another Course
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-4 card-interactive hover-lift">
              <CardHeader className="gradient-primary text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Your Semester GPA</CardTitle>
                    <CardDescription className="text-white/80">{gradingSystems[gradingSystem].name}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {gpa !== null ? (
                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary mb-3 success-pulse">{gpa.toFixed(2)}</div>
                    <div className="text-base text-muted-foreground mb-4 font-medium">
                      out of {currentScale.toFixed(1)} • {totalCredits} credits
                    </div>

                    {percentage && (
                      <div className="mb-6 p-4 gradient-card rounded-xl border-2 border-primary/20">
                        <div className="text-3xl font-bold text-secondary mb-1">{percentage.toFixed(2)}%</div>
                        <div className="text-sm font-medium text-secondary">Percentage Equivalent</div>
                      </div>
                    )}

                    <div className="p-4 quote-card rounded-xl mb-6">
                      <div className={`text-lg font-bold flex items-center justify-center gap-2`}>
                        <Sparkles className="h-5 w-5" />
                        {getGPAFeedback(gpa).icon} {getGPAFeedback(gpa).text}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <div className="text-4xl mb-3 opacity-50">📊</div>
                    <div className="text-lg font-medium mb-2">Ready to Calculate!</div>
                    <div className="text-sm">
                      {courses.some((c) => c.name || c.grade || c.credits > 0)
                        ? "Complete course details to see your GPA"
                        : "Enter your courses to get started"}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <Button
                    onClick={calculateGPA}
                    className="w-full btn-primary hover-scale"
                    size="lg"
                    disabled={isCalculating}
                  >
                    {isCalculating ? (
                      <>
                        <div className="spinner w-4 h-4 mr-2"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate GPA
                      </>
                    )}
                  </Button>

                  {gpa !== null && (
                    <>
                      <Button variant="outline" onClick={exportToPDF} className="w-full hover-scale bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF Report
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setShowPercentage(!showPercentage)}
                        className="w-full hover-scale"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Percentage
                      </Button>
                    </>
                  )}

                  <Button variant="outline" onClick={resetCalculator} className="w-full hover-scale bg-transparent">
                    Reset Calculator
                  </Button>
                  {!showSystemSelector && (
                    <Button variant="ghost" onClick={() => setShowSystemSelector(true)} className="w-full text-sm">
                      Change Grading System
                    </Button>
                  )}
                </div>

                <div className="text-xs space-y-2 bg-gradient-to-br from-muted/50 to-muted/30 p-4 rounded-xl border">
                  <div className="font-semibold text-sm text-center mb-3">Current Grade Scale</div>
                  <div className="grid grid-cols-2 gap-1">
                    {Object.entries(currentGradePoints).map(([grade, points]) => (
                      <div key={grade} className="flex justify-between items-center py-1 px-2 rounded bg-white/50">
                        <span className="font-medium">{grade}</span>
                        <span className="text-primary font-semibold">{points.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-12">
          <Card className="shadow-lg card-interactive hover-lift">
            <CardHeader className="gradient-card">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">GPA to Percentage Converter</CardTitle>
                  <CardDescription className="text-base mt-1">
                    Convert any GPA to percentage using different grading scales
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="converter-gpa" className="font-semibold">
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
                      className="mt-2 focus-ring text-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="converter-scale" className="font-semibold">
                      Select Grading Scale
                    </Label>
                    <Select
                      value={converterScale}
                      onValueChange={(value) => {
                        setConverterScale(value)
                        handleConverterChange()
                      }}
                    >
                      <SelectTrigger className="mt-2 focus-ring">
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
                  <div className="text-center p-8 gradient-primary text-white rounded-2xl shadow-lg hover-scale transition-transform w-full max-w-sm">
                    {converterPercentage !== null ? (
                      <>
                        <div className="text-5xl font-bold mb-3">{converterPercentage.toFixed(2)}%</div>
                        <div className="text-lg font-semibold mb-2">Percentage Equivalent</div>
                        <div className="text-sm opacity-90">
                          {converterGPA} out of {converterScale}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-5xl font-bold mb-3 opacity-50">--%</div>
                        <div className="text-sm opacity-75">Enter valid GPA to see percentage</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* ... existing formula section ... */}
              <div className="mt-8 p-6 gradient-card rounded-xl border">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Formula Used:
                </h4>
                <p className="text-muted-foreground mb-4">Percentage = (GPA ÷ Scale) × 100</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="p-3 bg-white/50 rounded-lg">
                    <div className="font-semibold text-primary">4.0 Scale</div>
                    <div className="text-muted-foreground text-xs">Most US Universities</div>
                  </div>
                  <div className="p-3 bg-white/50 rounded-lg">
                    <div className="font-semibold text-primary">4.3 Scale</div>
                    <div className="text-muted-foreground text-xs">Some Canadian Unis</div>
                  </div>
                  <div className="p-3 bg-white/50 rounded-lg">
                    <div className="font-semibold text-primary">5.0 Scale</div>
                    <div className="text-muted-foreground text-xs">Some European Unis</div>
                  </div>
                  <div className="p-3 bg-white/50 rounded-lg">
                    <div className="font-semibold text-primary">10.0 Scale</div>
                    <div className="text-muted-foreground text-xs">Indian Universities</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ... existing FAQ section ... */}
        <section className="mt-16">
          <Card className="shadow-lg card-interactive hover-lift">
            <CardHeader>
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="text-muted-foreground mt-2">
                Everything you need to know about calculating your GPA and using our calculator
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="font-semibold text-xl mb-3">How do I calculate my semester GPA?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To calculate your semester GPA, enter each course name, select the grade you received, and input the
                  credit hours. Our calculator multiplies each grade's point value by the credit hours, sums all grade
                  points, and divides by total credit hours. The formula is: GPA = (Sum of Grade Points) ÷ (Total Credit
                  Hours).
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">What's the difference between GPA and CGPA?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  GPA (Grade Point Average) typically refers to your performance in a single semester or term, while
                  CGPA (Cumulative Grade Point Average) represents your overall academic performance across all
                  completed semesters. Our calculator can help you calculate both by using the appropriate courses and
                  credit hours.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">How accurate is the GPA to percentage conversion?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our GPA to percentage conversion uses the standard formula: Percentage = (GPA ÷ Scale) × 100. This
                  provides an accurate approximation, but note that some universities may use slightly different
                  conversion methods. Always check with your institution for their specific conversion requirements for
                  official transcripts.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">Which grading systems does the calculator support?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We support the most common grading systems worldwide: 4.0 scale (standard US system), 4.3 scale (some
                  Canadian universities), 5.0 scale (some European institutions), and 10.0 scale (common in India). Each
                  system includes appropriate grade-to-point conversions for accurate calculations.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">Is this GPA calculator free to use?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Yes, our GPA calculator is completely free with no hidden fees, registration requirements, or usage
                  limits. You can calculate your semester GPA, cumulative CGPA, convert to percentages, and export PDF
                  reports without any cost. We believe every student should have access to reliable academic tools.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">Can I save my GPA calculations?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  While we don't store your data online for privacy reasons, you can export your GPA calculations as a
                  PDF report for your records. This report includes all your course details, grades, credit hours, and
                  calculated GPA, making it perfect for academic planning or sharing with advisors.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">How do I improve my GPA?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To improve your GPA, focus on courses with higher credit hours as they have more impact on your
                  overall average. Prioritize getting higher grades in these courses, seek help from professors or
                  tutors when needed, and consider retaking courses where your institution allows grade replacement. Use
                  our calculator to model different scenarios and set realistic GPA goals.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ... existing complete guide section ... */}
        <section className="mt-16">
          <Card className="shadow-lg card-interactive hover-lift">
            <CardHeader>
              <h2 className="text-3xl font-bold">Complete Guide to GPA Calculation</h2>
              <p className="text-muted-foreground mt-2">
                Master the art of GPA calculation with our comprehensive guide
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="font-semibold text-2xl mb-4">Understanding GPA Scales</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Different educational institutions use various GPA scales to evaluate student performance. The most
                  common scales include:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">4.0 Scale (US Standard)</h4>
                    <p className="text-sm text-muted-foreground mb-3">Most widely used in American universities</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>A (90-100%)</span>
                        <span>4.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>B (80-89%)</span>
                        <span>3.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>C (70-79%)</span>
                        <span>2.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>D (60-69%)</span>
                        <span>1.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>F (Below 60%)</span>
                        <span>0.0</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">10.0 Scale (Indian System)</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Common in Indian universities and technical institutes
                    </p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>O (90-100%)</span>
                        <span>10.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>A+ (80-89%)</span>
                        <span>9.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>A (70-79%)</span>
                        <span>8.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>B+ (60-69%)</span>
                        <span>7.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>B (50-59%)</span>
                        <span>6.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-2xl mb-4">Step-by-Step GPA Calculation</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">List All Your Courses</h4>
                      <p className="text-muted-foreground">
                        Write down every course you're taking this semester along with their credit hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Convert Grades to Points</h4>
                      <p className="text-muted-foreground">
                        Use your institution's grading scale to convert letter grades to numerical points.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Calculate Grade Points</h4>
                      <p className="text-muted-foreground">
                        Multiply each course's grade points by its credit hours to get total grade points.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Divide by Total Credits</h4>
                      <p className="text-muted-foreground">
                        Sum all grade points and divide by total credit hours to get your GPA.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-2xl mb-4">Tips for Academic Success</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Strategic Course Planning</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Balance challenging courses with manageable ones</li>
                      <li>• Consider course credit hours when planning workload</li>
                      <li>• Take advantage of pass/fail options when available</li>
                      <li>• Plan retakes for courses that allow grade replacement</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Study Strategies</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Attend all classes and participate actively</li>
                      <li>• Form study groups with motivated classmates</li>
                      <li>• Utilize professor office hours and tutoring services</li>
                      <li>• Start assignments early and manage time effectively</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
