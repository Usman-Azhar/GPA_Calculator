"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, Plus, Calculator, TrendingUp, Sparkles, Download, AlertCircle, BookOpen } from "lucide-react"
import { Navigation } from "@/components/navigation"
import jsPDF from "jspdf"
import "jspdf-autotable"

interface Course {
  id: string
  name: string
  grade: string
  credits: number
}

const gradingSystems = {
  "4.0": {
    name: "4.0 Scale",
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
  "4.3": {
    name: "4.3 Scale",
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
  "5.0": {
    name: "5.0 Scale",
    scale: 5.0,
    grades: {
      "A+": 5.0,
      A: 4.5,
      "A-": 4.0,
      "B+": 3.5,
      B: 3.0,
      "B-": 2.5,
      "C+": 2.0,
      C: 1.5,
      "C-": 1.0,
      D: 0.5,
      F: 0.0,
    },
  },
  "10.0": {
    name: "10.0 Scale",
    scale: 10.0,
    grades: {
      "A+": 10.0,
      A: 9.0,
      "A-": 8.0,
      "B+": 7.0,
      B: 6.0,
      "B-": 5.0,
      "C+": 4.0,
      C: 3.0,
      "C-": 2.0,
      D: 1.0,
      F: 0.0,
    },
  },
}

export default function SemesterGPACalculator() {
  const [courses, setCourses] = useState<Course[]>([{ id: "1", name: "", grade: "", credits: 3 }])
  const [gpa, setGPA] = useState<number | null>(null)
  const [gradingSystem, setGradingSystem] = useState<keyof typeof gradingSystems>("4.0")
  const [totalCredits, setTotalCredits] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const [percentage, setPercentage] = useState<number | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [semesterName, setSemesterName] = useState("")

  const currentGradePoints = gradingSystems[gradingSystem].grades
  const currentScale = gradingSystems[gradingSystem].scale

  useEffect(() => {
    const savedData = localStorage.getItem("semester-gpa-data")
    if (savedData) {
      try {
        const { courses: savedCourses, gradingSystem: savedSystem, semesterName: savedSemester } = JSON.parse(savedData)
        if (savedCourses && Array.isArray(savedCourses)) setCourses(savedCourses)
        if (savedSystem && gradingSystems[savedSystem as keyof typeof gradingSystems]) setGradingSystem(savedSystem)
        if (savedSemester) setSemesterName(savedSemester)
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

  useEffect(() => {
    const dataToSave = { courses, gradingSystem, semesterName }
    localStorage.setItem("semester-gpa-data", JSON.stringify(dataToSave))
  }, [courses, gradingSystem, semesterName])

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
            if (isNaN(numValue) || numValue <= 0) return { ...course, [field]: 0 }
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

    if (newErrors.length > 0) setErrors(newErrors)

    if (validCourses.length === 0) {
      setGPA(null)
      setTotalCredits(0)
      setPercentage(null)
      setIsCalculating(false)
      return
    }

    // Semester GPA Formula: (Sum of (grade × credits)) ÷ (Sum of credits)
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

  const exportToPDF = () => {
    if (!gpa || courses.length === 0) return

    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.text("📊 Semester GPA Report", 20, 30)

    doc.setFontSize(12)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45)
    doc.text(`Semester: ${semesterName || "Current Semester"}`, 20, 55)
    doc.text(`Grading System: ${gradingSystems[gradingSystem].name}`, 20, 65)

    doc.setFontSize(16)
    doc.text("Semester GPA Summary", 20, 85)
    doc.setFontSize(14)
    doc.text(`Semester GPA: ${gpa.toFixed(2)} / ${currentScale.toFixed(1)}`, 20, 100)
    doc.text(`Total Credits: ${totalCredits}`, 20, 110)
    if (percentage) {
      doc.text(`Percentage: ${percentage.toFixed(2)}%`, 20, 120)
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
      startY: 135,
      theme: "grid",
      headStyles: { fillColor: [59, 130, 246] },
    })

    doc.save(`Semester-GPA-Report-${new Date().toISOString().split("T")[0]}.pdf`)
  }

  const resetCalculator = () => {
    setCourses([{ id: "1", name: "", grade: "", credits: 3 }])
    setGPA(null)
    setTotalCredits(0)
    setPercentage(null)
    setErrors([])
    setSemesterName("")
    localStorage.removeItem("semester-gpa-data")
  }

  const getGPAFeedback = (gpa: number) => {
    const percentage = (gpa / currentScale) * 100
    if (percentage >= 90) return { text: "Outstanding Semester!", icon: "🏆", color: "text-green-600" }
    if (percentage >= 80) return { text: "Excellent Semester!", icon: "🎉", color: "text-green-500" }
    if (percentage >= 70) return { text: "Good Semester!", icon: "👍", color: "text-blue-500" }
    if (percentage >= 60) return { text: "Keep Improving!", icon: "📚", color: "text-yellow-500" }
    return { text: "Focus Next Semester!", icon: "💪", color: "text-orange-500" }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-full">
              <BookOpen className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">📚 Semester GPA Calculator</h1>
              <p className="text-xl text-white/90 mt-2">Calculate Your Current Semester Grade Point Average</p>
            </div>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            Track your academic performance for the current semester. Enter your courses and grades to calculate your
            semester GPA using the standard formula.
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

        <section className="mb-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Semester Information</CardTitle>
              <CardDescription>Enter your semester details and select your grading system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="semester-name" className="font-medium">
                    Semester Name (Optional)
                  </Label>
                  <Input
                    id="semester-name"
                    placeholder="e.g., Fall 2024, Spring 2025"
                    value={semesterName}
                    onChange={(e) => setSemesterName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="grading-system" className="font-medium">
                    Grading System
                  </Label>
                  <Select
                    value={gradingSystem}
                    onValueChange={(value) => setGradingSystem(value as keyof typeof gradingSystems)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select grading system" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(gradingSystems).map(([key, system]) => (
                        <SelectItem key={key} value={key}>
                          {system.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <CardTitle>Course Information</CardTitle>
                </div>
                <CardDescription>
                  Enter your courses for this semester. Using {gradingSystems[gradingSystem].name}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="overflow-x-auto">
                  <div className="min-w-full space-y-4">
                    {courses.map((course) => (
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
                            placeholder="e.g., Calculus I"
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
                            placeholder="e.g., 3"
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
                  <CardTitle>Semester GPA Results</CardTitle>
                </div>
                <CardDescription>
                  {semesterName ? `${semesterName} Results` : "Current Semester Results"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {gpa !== null ? (
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">{gpa.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      out of {currentScale.toFixed(1)} • {totalCredits} credits
                    </div>

                    {percentage && (
                      <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-600">{percentage.toFixed(2)}%</div>
                        <div className="text-sm text-green-600">Percentage Equivalent</div>
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
                    {isCalculating ? "Calculating..." : "Calculate Semester GPA"}
                  </Button>

                  {gpa !== null && (
                    <Button variant="outline" onClick={exportToPDF} className="w-full bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF Report
                    </Button>
                  )}

                  <Button variant="outline" onClick={resetCalculator} className="w-full bg-transparent">
                    Reset Calculator
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground space-y-1 bg-muted/50 p-3 rounded-lg">
                  <div className="font-medium">Formula Used:</div>
                  <div className="text-xs">Semester GPA = (Sum of Grade Points) ÷ (Sum of Credits)</div>
                  <div className="mt-2 font-medium">Current Grade Scale:</div>
                  {Object.entries(currentGradePoints)
                    .slice(0, 6)
                    .map(([grade, points]) => (
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
      </main>
    </div>
  )
}
