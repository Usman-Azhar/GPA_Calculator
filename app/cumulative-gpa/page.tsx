"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, Plus, Calculator, TrendingUp, Sparkles, Download, AlertCircle, GraduationCap } from "lucide-react"
import { Navigation } from "@/components/navigation"
import jsPDF from "jspdf"
import "jspdf-autotable"

interface Semester {
  id: string
  name: string
  gpa: number
  credits: number
}

const gradingScales = {
  "4.0": { name: "4.0 Scale", scale: 4.0 },
  "4.3": { name: "4.3 Scale", scale: 4.3 },
  "5.0": { name: "5.0 Scale", scale: 5.0 },
  "10.0": { name: "10.0 Scale", scale: 10.0 },
}

export default function CumulativeGPACalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([{ id: "1", name: "", gpa: 0, credits: 0 }])
  const [cgpa, setCGPA] = useState<number | null>(null)
  const [gradingScale, setGradingScale] = useState<keyof typeof gradingScales>("4.0")
  const [totalCredits, setTotalCredits] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const [percentage, setPercentage] = useState<number | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  const currentScale = gradingScales[gradingScale].scale

  useEffect(() => {
    const savedData = localStorage.getItem("cumulative-gpa-data")
    if (savedData) {
      try {
        const { semesters: savedSemesters, gradingScale: savedScale } = JSON.parse(savedData)
        if (savedSemesters && Array.isArray(savedSemesters)) setSemesters(savedSemesters)
        if (savedScale && gradingScales[savedScale as keyof typeof gradingScales]) setGradingScale(savedScale)
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

  useEffect(() => {
    const dataToSave = { semesters, gradingScale }
    localStorage.setItem("cumulative-gpa-data", JSON.stringify(dataToSave))
  }, [semesters, gradingScale])

  const addSemester = () => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      name: "",
      gpa: 0,
      credits: 0,
    }
    setSemesters([...semesters, newSemester])
  }

  const removeSemester = (id: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((semester) => semester.id !== id))
    }
  }

  const updateSemester = (id: string, field: keyof Semester, value: string | number) => {
    setSemesters((prevSemesters) =>
      prevSemesters.map((semester) => {
        if (semester.id === id) {
          if (field === "gpa" || field === "credits") {
            const numValue = typeof value === "string" ? Number.parseFloat(value) : value
            if (isNaN(numValue) || numValue < 0) return { ...semester, [field]: 0 }
            if (field === "gpa" && numValue > currentScale) return { ...semester, [field]: currentScale }
            return { ...semester, [field]: Math.max(0, numValue) }
          }
          return { ...semester, [field]: value }
        }
        return semester
      }),
    )
  }

  const calculateCGPA = () => {
    setIsCalculating(true)
    setErrors([])
    const newErrors: string[] = []

    const validSemesters = semesters.filter((semester) => {
      const hasValidGPA = semester.gpa > 0 && semester.gpa <= currentScale
      const hasValidCredits = semester.credits > 0
      const hasName = semester.name && semester.name.trim() !== ""

      if (!hasName && (hasValidGPA || hasValidCredits > 0)) {
        newErrors.push(`Semester with GPA ${semester.gpa} is missing a name`)
      }
      if (hasName && !hasValidGPA) {
        newErrors.push(`${semester.name} has invalid GPA`)
      }
      if (hasName && hasValidGPA && !hasValidCredits) {
        newErrors.push(`${semester.name} has invalid credit hours`)
      }

      return hasValidGPA && hasValidCredits
    })

    if (newErrors.length > 0) setErrors(newErrors)

    if (validSemesters.length === 0) {
      setCGPA(null)
      setTotalCredits(0)
      setPercentage(null)
      setIsCalculating(false)
      return
    }

    // Cumulative GPA Formula: (Sum of all semester GPAs weighted by credits) ÷ (Total credits)
    let totalWeightedPoints = 0
    let credits = 0

    validSemesters.forEach((semester) => {
      const weightedPoints = semester.gpa * semester.credits
      totalWeightedPoints += weightedPoints
      credits += semester.credits
    })

    if (credits > 0) {
      const calculatedCGPA = totalWeightedPoints / credits
      const roundedCGPA = Math.round(calculatedCGPA * 100) / 100

      setCGPA(roundedCGPA)
      setTotalCredits(credits)

      const calculatedPercentage = (roundedCGPA / currentScale) * 100
      setPercentage(Math.round(calculatedPercentage * 100) / 100)
    } else {
      setCGPA(null)
      setTotalCredits(0)
      setPercentage(null)
    }

    setIsCalculating(false)
  }

  const exportToPDF = () => {
    if (!cgpa || semesters.length === 0) return

    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.text("🎓 Cumulative GPA Report", 20, 30)

    doc.setFontSize(12)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45)
    doc.text(`Grading Scale: ${gradingScales[gradingScale].name}`, 20, 55)

    doc.setFontSize(16)
    doc.text("Cumulative GPA Summary", 20, 75)
    doc.setFontSize(14)
    doc.text(`Overall CGPA: ${cgpa.toFixed(2)} / ${currentScale.toFixed(1)}`, 20, 90)
    doc.text(`Total Credits: ${totalCredits}`, 20, 100)
    if (percentage) {
      doc.text(`Percentage: ${percentage.toFixed(2)}%`, 20, 110)
    }

    const validSemesters = semesters.filter((semester) => semester.gpa > 0 && semester.credits > 0)
    const tableData = validSemesters.map((semester) => [
      semester.name || "Unnamed Semester",
      semester.gpa.toFixed(2),
      semester.credits.toString(),
      (semester.gpa * semester.credits).toFixed(2),
    ])
    ;(doc as any).autoTable({
      head: [["Semester", "GPA", "Credits", "Grade Points"]],
      body: tableData,
      startY: 125,
      theme: "grid",
      headStyles: { fillColor: [59, 130, 246] },
    })

    doc.save(`Cumulative-GPA-Report-${new Date().toISOString().split("T")[0]}.pdf`)
  }

  const resetCalculator = () => {
    setSemesters([{ id: "1", name: "", gpa: 0, credits: 0 }])
    setCGPA(null)
    setTotalCredits(0)
    setPercentage(null)
    setErrors([])
    localStorage.removeItem("cumulative-gpa-data")
  }

  const getGPAFeedback = (cgpa: number) => {
    const percentage = (cgpa / currentScale) * 100
    if (percentage >= 90) return { text: "Outstanding Academic Record!", icon: "🏆", color: "text-green-600" }
    if (percentage >= 80) return { text: "Excellent Overall Performance!", icon: "🎉", color: "text-green-500" }
    if (percentage >= 70) return { text: "Good Academic Standing!", icon: "👍", color: "text-blue-500" }
    if (percentage >= 60) return { text: "Keep Working Hard!", icon: "📚", color: "text-yellow-500" }
    return { text: "Focus on Improvement!", icon: "💪", color: "text-orange-500" }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-full">
              <GraduationCap className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">🎓 Cumulative GPA Calculator</h1>
              <p className="text-xl text-white/90 mt-2">Calculate Your Overall Academic Performance</p>
            </div>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            Track your overall academic performance across all semesters. Enter your semester GPAs and credits to
            calculate your cumulative GPA (CGPA).
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
              <CardTitle>Grading System</CardTitle>
              <CardDescription>Select your university's grading scale for accurate CGPA calculation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md">
                <Label htmlFor="grading-scale" className="font-medium">
                  Grading Scale
                </Label>
                <Select
                  value={gradingScale}
                  onValueChange={(value) => setGradingScale(value as keyof typeof gradingScales)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select grading scale" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(gradingScales).map(([key, scale]) => (
                      <SelectItem key={key} value={key}>
                        {scale.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  <CardTitle>Semester Information</CardTitle>
                </div>
                <CardDescription>
                  Enter your semester GPAs and credit hours. Using {gradingScales[gradingScale].name}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="overflow-x-auto">
                  <div className="min-w-full space-y-4">
                    {semesters.map((semester) => (
                      <div
                        key={semester.id}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end p-4 border rounded-lg bg-muted/20"
                      >
                        <div className="sm:col-span-5">
                          <Label htmlFor={`semester-${semester.id}`} className="font-medium">
                            Semester Name
                          </Label>
                          <Input
                            id={`semester-${semester.id}`}
                            placeholder="e.g., Fall 2023, Spring 2024"
                            value={semester.name}
                            onChange={(e) => updateSemester(semester.id, "name", e.target.value)}
                            className="mt-1"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <Label htmlFor={`gpa-${semester.id}`} className="font-medium">
                            Semester GPA
                          </Label>
                          <Input
                            id={`gpa-${semester.id}`}
                            type="number"
                            min="0"
                            max={currentScale}
                            step="0.01"
                            placeholder={`0.00 - ${currentScale.toFixed(1)}`}
                            value={semester.gpa || ""}
                            onChange={(e) => {
                              const value = Number.parseFloat(e.target.value) || 0
                              updateSemester(semester.id, "gpa", value)
                            }}
                            className="mt-1"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <Label htmlFor={`credits-${semester.id}`} className="font-medium">
                            Credits
                          </Label>
                          <Input
                            id={`credits-${semester.id}`}
                            type="number"
                            min="1"
                            max="30"
                            step="1"
                            placeholder="e.g., 15"
                            value={semester.credits || ""}
                            onChange={(e) => {
                              const value = Number.parseFloat(e.target.value) || 0
                              updateSemester(semester.id, "credits", value)
                            }}
                            className="mt-1"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeSemester(semester.id)}
                            disabled={semesters.length === 1}
                            className="w-full"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" onClick={addSemester} className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Semester
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-4">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle>Cumulative GPA Results</CardTitle>
                </div>
                <CardDescription>Overall Academic Performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {cgpa !== null ? (
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">{cgpa.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      out of {currentScale.toFixed(1)} • {totalCredits} total credits
                    </div>

                    {percentage && (
                      <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-2xl font-bold text-purple-600">{percentage.toFixed(2)}%</div>
                        <div className="text-sm text-purple-600">Percentage Equivalent</div>
                      </div>
                    )}

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div
                        className={`text-lg font-medium ${getGPAFeedback(cgpa).color} flex items-center justify-center gap-2`}
                      >
                        <Sparkles className="h-5 w-5" />
                        {getGPAFeedback(cgpa).icon} {getGPAFeedback(cgpa).text}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <div className="text-3xl mb-2">--</div>
                    <div className="text-sm">
                      {semesters.some((s) => s.name || s.gpa > 0 || s.credits > 0)
                        ? "Complete semester details to calculate CGPA"
                        : "Enter semester data to calculate CGPA"}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <Button onClick={calculateCGPA} className="w-full" size="lg" disabled={isCalculating}>
                    {isCalculating ? "Calculating..." : "Calculate Cumulative GPA"}
                  </Button>

                  {cgpa !== null && (
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
                  <div className="text-xs">CGPA = (Sum of Weighted Grade Points) ÷ (Total Credits)</div>
                  <div className="text-xs">Weighted Points = Semester GPA × Credits</div>
                  <div className="mt-2 font-medium">Current Scale: {currentScale.toFixed(1)}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
