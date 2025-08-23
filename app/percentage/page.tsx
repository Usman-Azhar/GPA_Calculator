"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BarChart3, Calculator, ArrowRight, Info } from "lucide-react"
import { Navigation } from "@/components/navigation"

const gradingScales = [
  { value: "4.0", label: "4.0 Scale", description: "Most US Universities", examples: ["Harvard", "MIT", "Stanford"] },
  {
    value: "4.3",
    label: "4.3 Scale",
    description: "Some Canadian Universities",
    examples: ["University of Toronto", "McGill"],
  },
  { value: "5.0", label: "5.0 Scale", description: "Some European Universities", examples: ["German Universities"] },
  {
    value: "10.0",
    label: "10.0 Scale",
    description: "Indian Universities",
    examples: ["IITs", "NITs", "Most Indian Unis"],
  },
]

const conversionExamples = [
  { gpa: 4.0, scale: 4.0, percentage: 100, grade: "A+" },
  { gpa: 3.7, scale: 4.0, percentage: 92.5, grade: "A-" },
  { gpa: 3.0, scale: 4.0, percentage: 75, grade: "B" },
  { gpa: 2.5, scale: 4.0, percentage: 62.5, grade: "C+" },
  { gpa: 4.3, scale: 4.3, percentage: 100, grade: "A+" },
  { gpa: 3.7, scale: 4.3, percentage: 86.05, grade: "A-" },
  { gpa: 10.0, scale: 10.0, percentage: 100, grade: "A+" },
  { gpa: 8.5, scale: 10.0, percentage: 85, grade: "A" },
]

export default function PercentageConverter() {
  const [gpa, setGPA] = useState<string>("")
  const [scale, setScale] = useState<string>("4.0")
  const [percentage, setPercentage] = useState<number | null>(null)
  const [bulkGPAs, setBulkGPAs] = useState<string>("")
  const [bulkResults, setBulkResults] = useState<Array<{ gpa: number; percentage: number }>>([])

  const convertGPAToPercentage = (gpaValue: string, scaleValue: string) => {
    const gpaNum = Number.parseFloat(gpaValue)
    const scaleNum = Number.parseFloat(scaleValue)

    if (isNaN(gpaNum) || isNaN(scaleNum) || gpaNum < 0 || gpaNum > scaleNum) {
      setPercentage(null)
      return
    }

    const result = (gpaNum / scaleNum) * 100
    setPercentage(Math.round(result * 100) / 100)
  }

  const convertBulkGPAs = () => {
    const gpaList = bulkGPAs
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
    const scaleNum = Number.parseFloat(scale)

    const results = gpaList
      .map((gpaStr) => {
        const gpaNum = Number.parseFloat(gpaStr)
        if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > scaleNum) {
          return { gpa: gpaNum, percentage: 0 }
        }
        const percentage = (gpaNum / scaleNum) * 100
        return { gpa: gpaNum, percentage: Math.round(percentage * 100) / 100 }
      })
      .filter((result) => !isNaN(result.gpa) && result.percentage > 0)

    setBulkResults(results)
  }

  useEffect(() => {
    convertGPAToPercentage(gpa, scale)
  }, [gpa, scale])

  const getGradeEquivalent = (percentage: number) => {
    if (percentage >= 97) return "A+"
    if (percentage >= 93) return "A"
    if (percentage >= 90) return "A-"
    if (percentage >= 87) return "B+"
    if (percentage >= 83) return "B"
    if (percentage >= 80) return "B-"
    if (percentage >= 77) return "C+"
    if (percentage >= 73) return "C"
    if (percentage >= 70) return "C-"
    if (percentage >= 67) return "D+"
    if (percentage >= 65) return "D"
    return "F"
  }

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: "Outstanding", color: "text-green-600", bg: "bg-green-50" }
    if (percentage >= 80) return { level: "Excellent", color: "text-blue-600", bg: "bg-blue-50" }
    if (percentage >= 70) return { level: "Good", color: "text-yellow-600", bg: "bg-yellow-50" }
    if (percentage >= 60) return { level: "Satisfactory", color: "text-orange-600", bg: "bg-orange-50" }
    return { level: "Needs Improvement", color: "text-red-600", bg: "bg-red-50" }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-full">
              <BarChart3 className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">📊 GPA to Percentage Converter</h1>
              <p className="text-xl text-white/90 mt-2">Convert Any GPA to Percentage Instantly</p>
            </div>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            Convert your GPA to percentage using different grading scales. Perfect for international applications,
            scholarship requirements, and academic comparisons.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <section className="grid gap-8 lg:grid-cols-2 mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                <CardTitle className="text-2xl">Single GPA Conversion</CardTitle>
              </div>
              <CardDescription>
                Enter your GPA and select the appropriate grading scale for instant conversion.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gpa-input" className="font-medium">
                    Enter GPA/CGPA
                  </Label>
                  <Input
                    id="gpa-input"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g., 3.75"
                    value={gpa}
                    onChange={(e) => setGPA(e.target.value)}
                    className="mt-1 text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="scale-select" className="font-medium">
                    Grading Scale
                  </Label>
                  <Select value={scale} onValueChange={setScale}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select scale" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradingScales.map((scaleOption) => (
                        <SelectItem key={scaleOption.value} value={scaleOption.value}>
                          {scaleOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-center py-4">
                <ArrowRight className="h-8 w-8 text-muted-foreground" />
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                {percentage !== null ? (
                  <>
                    <div className="text-5xl font-bold text-orange-600 mb-2">{percentage.toFixed(2)}%</div>
                    <div className="text-lg font-medium text-orange-600 mb-2">Percentage Equivalent</div>
                    <div className="text-sm text-muted-foreground mb-3">
                      {gpa} out of {scale} = {percentage.toFixed(2)}%
                    </div>

                    <div className={`inline-block px-4 py-2 rounded-lg ${getPerformanceLevel(percentage).bg}`}>
                      <div className={`font-medium ${getPerformanceLevel(percentage).color}`}>
                        Grade: {getGradeEquivalent(percentage)} • {getPerformanceLevel(percentage).level}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-5xl font-bold text-muted-foreground mb-2">--%</div>
                    <div className="text-sm text-muted-foreground">Enter valid GPA to see percentage</div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <CardTitle className="text-2xl">Bulk GPA Conversion</CardTitle>
              </div>
              <CardDescription>Convert multiple GPAs at once. Enter one GPA per line.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="bulk-gpa" className="font-medium">
                  Enter GPAs (one per line)
                </Label>
                <textarea
                  id="bulk-gpa"
                  className="w-full mt-1 p-3 border border-input rounded-md resize-none h-32"
                  placeholder="3.75&#10;3.25&#10;2.85&#10;3.90"
                  value={bulkGPAs}
                  onChange={(e) => setBulkGPAs(e.target.value)}
                />
              </div>

              <div>
                <Label className="font-medium">
                  Using Scale: {gradingScales.find((s) => s.value === scale)?.label}
                </Label>
              </div>

              <Button onClick={convertBulkGPAs} className="w-full" size="lg">
                Convert All GPAs
              </Button>

              {bulkResults.length > 0 && (
                <div className="max-h-64 overflow-y-auto border rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 sticky top-0">
                      <tr>
                        <th className="p-2 text-left">GPA</th>
                        <th className="p-2 text-left">Percentage</th>
                        <th className="p-2 text-left">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkResults.map((result, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2 font-medium">{result.gpa.toFixed(2)}</td>
                          <td className="p-2 text-orange-600 font-medium">{result.percentage.toFixed(2)}%</td>
                          <td className="p-2">{getGradeEquivalent(result.percentage)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 lg:grid-cols-2 mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle>Grading Scale Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gradingScales.map((scaleInfo) => (
                  <div key={scaleInfo.value} className="p-4 border rounded-lg">
                    <div className="font-semibold text-lg">{scaleInfo.label}</div>
                    <div className="text-sm text-muted-foreground mb-2">{scaleInfo.description}</div>
                    <div className="text-xs text-muted-foreground">Examples: {scaleInfo.examples.join(", ")}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Conversion Examples</CardTitle>
              <CardDescription>Common GPA to percentage conversions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {conversionExamples.map((example, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium">
                        {example.gpa.toFixed(1)} / {example.scale.toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">Grade: {example.grade}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-600">{example.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">How GPA to Percentage Conversion Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Formula</h3>
                  <div className="p-4 bg-muted/50 rounded-lg font-mono text-center">
                    Percentage = (GPA ÷ Scale) × 100
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    This is the standard formula used worldwide for GPA to percentage conversion.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Example Calculation</h3>
                  <div className="space-y-2 text-sm">
                    <div>GPA: 3.75</div>
                    <div>Scale: 4.0</div>
                    <div>Calculation: (3.75 ÷ 4.0) × 100</div>
                    <div className="font-semibold text-orange-600">Result: 93.75%</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Important Notes</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Different universities may have slightly different conversion methods</li>
                  <li>Some institutions use weighted GPAs which may affect the conversion</li>
                  <li>Always check with your target institution for their specific requirements</li>
                  <li>This converter uses the most commonly accepted formula worldwide</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
