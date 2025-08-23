"use client"

import type React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MessageSquare, Phone, MapPin, Clock, Send } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="gradient-hero text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <MessageSquare className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Contact Us</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Have questions about our GPA calculator? Need help with your calculations? We're here to assist you.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8 flex justify-center">
          <AdBanner slot="1234567890" format="horizontal" className="max-w-4xl w-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="p-4 bg-green-100 text-green-800 rounded-lg mb-4">
                      <h3 className="font-semibold text-lg mb-2">Message Sent Successfully!</h3>
                      <p>Thank you for contacting us. We'll respond within 24 hours.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="bug">Bug Report</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief description of your inquiry"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Please provide details about your inquiry..."
                        required
                        rows={6}
                        className="mt-1"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif">Contact Information</CardTitle>
                <CardDescription>Get in touch with our team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">support@gpacalculatorpro.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Response Time</div>
                    <div className="text-sm text-muted-foreground">Within 24 hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">Serving students worldwide</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">How accurate is the calculator?</h4>
                  <p className="text-sm text-muted-foreground">
                    Our calculator is 99.9% accurate and follows standard GPA calculation methods used by universities.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Is it really free?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, completely free with no hidden fees or premium features required.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Can I save my calculations?</h4>
                  <p className="text-sm text-muted-foreground">
                    Currently, calculations are session-based. We're working on a save feature for future updates.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <AdBanner slot="0987654321" format="rectangle" className="max-w-md w-full" />
            </div>
          </div>
        </div>

        <section className="mt-16">
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif">Other Ways to Reach Us</CardTitle>
              <CardDescription>Choose the method that works best for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-6">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat with our support team in real-time during business hours.
                  </p>
                  <Button variant="outline" size="sm">
                    Start Chat
                  </Button>
                </div>

                <div className="p-6">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send us an email and we'll respond within 24 hours.
                  </p>
                  <Button variant="outline" size="sm">
                    Send Email
                  </Button>
                </div>

                <div className="p-6">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Help Center</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse our comprehensive help documentation and guides.
                  </p>
                  <Button variant="outline" size="sm">
                    Visit Help Center
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-muted mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">GPA Calculator Pro</h3>
              <p className="text-muted-foreground text-sm">
                Professional GPA calculator for university students worldwide. Calculate your Grade Point Average with
                precision and ease.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="text-muted-foreground hover:text-primary">
                    GPA Calculator
                  </a>
                </li>
                <li>
                  <a href="/semester-gpa" className="text-muted-foreground hover:text-primary">
                    Semester GPA
                  </a>
                </li>
                <li>
                  <a href="/cumulative-gpa" className="text-muted-foreground hover:text-primary">
                    Cumulative GPA
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/about" className="text-muted-foreground hover:text-primary">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-muted-foreground hover:text-primary">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-muted-foreground hover:text-primary">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/privacy" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-muted-foreground hover:text-primary">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 GPA Calculator Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
