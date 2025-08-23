import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Scale, AlertTriangle, Copyright, Users, Shield } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"

export const metadata: Metadata = {
  title: "Terms of Service - GPA Calculator Pro | Usage Terms & Conditions",
  description:
    "Read our terms of service to understand the rules and guidelines for using GPA Calculator Pro and our educational tools.",
  keywords: "terms of service, terms and conditions, usage agreement, legal terms, user agreement",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms of Service - GPA Calculator Pro",
    description: "Terms of service and usage guidelines for GPA Calculator Pro educational tools.",
    type: "website",
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="gradient-hero text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <FileText className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Terms of Service</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Please read these terms carefully before using our GPA calculator and related services.
            </p>
            <p className="text-white/80 mt-4">Last updated: January 27, 2025</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8 flex justify-center">
          <AdBanner slot="1234567890" format="horizontal" className="max-w-4xl w-full" />
        </div>

        <div className="space-y-8">
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Scale className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-serif">Agreement to Terms</CardTitle>
              </div>
              <CardDescription>
                By accessing and using GPA Calculator Pro, you agree to be bound by these terms.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                These Terms of Service ("Terms") govern your use of the GPA Calculator Pro website and services
                (collectively, the "Service") operated by GPA Calculator Pro ("we," "us," or "our").
              </p>
              <p className="text-muted-foreground">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part
                of these terms, then you may not access the Service.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Important Notice</h4>
                    <p className="text-sm text-yellow-700">
                      These terms may be updated from time to time. Continued use of the service constitutes acceptance
                      of any changes.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-serif">Acceptable Use</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Permitted Uses</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Calculate your Grade Point Average for educational purposes</li>
                  <li>• Access educational resources and information provided on our website</li>
                  <li>• Contact us for support or feedback about our services</li>
                  <li>• Share our website with other students who may benefit from our tools</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Prohibited Uses</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Use the service for any unlawful purpose or in violation of any laws</li>
                  <li>• Attempt to gain unauthorized access to our systems or user accounts</li>
                  <li>• Transmit viruses, malware, or other harmful code</li>
                  <li>• Scrape, crawl, or harvest data from our website without permission</li>
                  <li>• Impersonate others or provide false information</li>
                  <li>• Interfere with or disrupt the service or servers</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-serif">Service Availability and Accuracy</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Service Availability</h3>
                <p className="text-muted-foreground">
                  We strive to maintain high availability of our service, but we do not guarantee uninterrupted access.
                  The service may be temporarily unavailable due to maintenance, updates, or technical issues.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Calculation Accuracy</h3>
                <p className="text-muted-foreground">
                  While we make every effort to ensure our GPA calculations are accurate, we recommend verifying results
                  with your academic institution. Different schools may have specific calculation methods or policies
                  that our calculator may not account for.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Educational Purpose Only</h3>
                <p className="text-muted-foreground">
                  Our GPA calculator is provided for educational and informational purposes only. It should not be
                  considered as official academic advice or replace consultation with academic advisors.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Copyright className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-serif">Intellectual Property</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Our Content</h3>
                <p className="text-muted-foreground">
                  The Service and its original content, features, and functionality are and will remain the exclusive
                  property of GPA Calculator Pro and its licensors. The service is protected by copyright, trademark,
                  and other laws.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Your Content</h3>
                <p className="text-muted-foreground">
                  You retain ownership of any content you provide to us (such as feedback or contact information). By
                  providing content, you grant us a non-exclusive, worldwide, royalty-free license to use, modify, and
                  display such content for the purpose of providing our services.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Third-Party Content</h3>
                <p className="text-muted-foreground">
                  Our service may contain links to third-party websites or services. We do not own or control these
                  third parties and are not responsible for their content or practices.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-serif">Privacy and Data Protection</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Data Collection</h3>
                <p className="text-muted-foreground">
                  Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use,
                  and protect your information. The Privacy Policy is incorporated into these Terms by reference.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Local Storage</h3>
                <p className="text-muted-foreground">
                  GPA calculations and course data are stored locally in your browser and are not transmitted to our
                  servers. This data remains on your device and can be cleared by clearing your browser data.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Disclaimers and Limitations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Disclaimer of Warranties</h3>
                <p className="text-muted-foreground">
                  The service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or
                  implied, and hereby disclaim all other warranties including, without limitation, implied warranties of
                  merchantability, fitness for a particular purpose, or non-infringement.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Limitation of Liability</h3>
                <p className="text-muted-foreground">
                  In no event shall GPA Calculator Pro, its directors, employees, partners, agents, suppliers, or
                  affiliates be liable for any indirect, incidental, special, consequential, or punitive damages,
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Academic Decisions</h3>
                <p className="text-muted-foreground">
                  We are not responsible for any academic decisions made based on calculations from our service. Always
                  consult with your academic institution for official GPA calculations and academic guidance.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Termination by You</h3>
                <p className="text-muted-foreground">
                  You may stop using our service at any time. You can also clear your browser data to remove any locally
                  stored information.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Termination by Us</h3>
                <p className="text-muted-foreground">
                  We may terminate or suspend your access to the service immediately, without prior notice, if you
                  breach these Terms or engage in prohibited activities.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Effect of Termination</h3>
                <p className="text-muted-foreground">
                  Upon termination, your right to use the service will cease immediately. Provisions that by their
                  nature should survive termination shall survive, including ownership provisions, warranty disclaimers,
                  and limitations of liability.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Governing Law and Disputes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Governing Law</h3>
                <p className="text-muted-foreground">
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in
                  which GPA Calculator Pro operates, without regard to conflict of law provisions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Dispute Resolution</h3>
                <p className="text-muted-foreground">
                  Any disputes arising from these Terms or your use of the service should first be addressed through our
                  contact form. We encourage good faith efforts to resolve disputes amicably.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material
                change will be determined at our sole discretion.
              </p>
              <p className="text-muted-foreground mt-4">
                By continuing to access or use our service after those revisions become effective, you agree to be bound
                by the revised terms.
              </p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong>Email:</strong> legal@gpacalculatorpro.com
                </p>
                <p>
                  <strong>Contact Form:</strong>{" "}
                  <a href="/contact" className="text-primary hover:underline">
                    Visit our contact page
                  </a>
                </p>
                <p>
                  <strong>Response Time:</strong> We will respond to legal inquiries within 5 business days
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 flex justify-center">
          <AdBanner slot="0987654321" format="rectangle" className="max-w-md w-full" />
        </div>
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
