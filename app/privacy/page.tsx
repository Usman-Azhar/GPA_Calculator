import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Cookie, Database, Users, Lock } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy - GPA Calculator Pro | Data Protection & Privacy",
  description:
    "Read our comprehensive privacy policy to understand how GPA Calculator Pro collects, uses, and protects your personal information and data.",
  keywords: "privacy policy, data protection, personal information, cookies, GDPR, CCPA, user privacy",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy - GPA Calculator Pro",
    description: "Comprehensive privacy policy explaining how we protect your personal information and data.",
    type: "website",
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="gradient-hero text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <Shield className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Privacy Policy</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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
                <Eye className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-serif">Information We Collect</CardTitle>
              </div>
              <CardDescription>
                We are committed to transparency about the data we collect and how we use it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Information You Provide</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Contact information when you reach out to us (name, email address)</li>
                  <li>• Course information and grades you enter into our calculator (stored locally only)</li>
                  <li>• Feedback and communications you send to us</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Information We Collect Automatically</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Usage data and analytics (pages visited, time spent, interactions)</li>
                  <li>• Device information (browser type, operating system, screen resolution)</li>
                  <li>• IP address and general location information</li>
                  <li>• Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Database className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-serif">How We Use Your Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Primary Uses</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Provide and maintain our GPA calculator service</li>
                  <li>• Respond to your inquiries and provide customer support</li>
                  <li>• Improve our website functionality and user experience</li>
                  <li>• Analyze usage patterns to enhance our services</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Marketing and Communications</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Send important updates about our service (with your consent)</li>
                  <li>• Display relevant advertisements through Google AdSense</li>
                  <li>• Provide personalized content and recommendations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Cookie className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-serif">Cookies and Tracking</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Types of Cookies We Use</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Essential Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Required for basic website functionality and cannot be disabled.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Analytics Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Help us understand how visitors interact with our website (Google Analytics).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Advertising Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Used by Google AdSense to display relevant advertisements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Preference Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Remember your settings and preferences for a better experience.
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
                <CardTitle className="text-2xl font-serif">Information Sharing</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">We Do Not Sell Your Data</h3>
                <p className="text-muted-foreground mb-4">
                  We do not sell, trade, or rent your personal information to third parties for marketing purposes.
                </p>

                <h3 className="text-lg font-semibold mb-3">Limited Sharing</h3>
                <p className="text-muted-foreground mb-2">We may share information only in these circumstances:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• With service providers who help us operate our website (hosting, analytics)</li>
                  <li>• When required by law or to protect our legal rights</li>
                  <li>• In connection with a business transfer or acquisition</li>
                  <li>• With your explicit consent</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-serif">Your Rights and Choices</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Data Protection Rights</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • <strong>Access:</strong> Request a copy of the personal data we hold about you
                  </li>
                  <li>
                    • <strong>Correction:</strong> Ask us to correct inaccurate or incomplete information
                  </li>
                  <li>
                    • <strong>Deletion:</strong> Request deletion of your personal data (subject to legal requirements)
                  </li>
                  <li>
                    • <strong>Portability:</strong> Receive your data in a structured, machine-readable format
                  </li>
                  <li>
                    • <strong>Objection:</strong> Object to processing of your data for marketing purposes
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Cookie Controls</h3>
                <p className="text-muted-foreground">
                  You can control cookies through your browser settings. Note that disabling certain cookies may affect
                  website functionality.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Data Security and Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Security Measures</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• SSL encryption for data transmission</li>
                  <li>• Secure hosting infrastructure</li>
                  <li>• Regular security updates and monitoring</li>
                  <li>• Limited access to personal data on a need-to-know basis</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Data Retention</h3>
                <p className="text-muted-foreground">
                  We retain personal information only as long as necessary to provide our services and comply with legal
                  obligations. GPA calculations are stored locally in your browser and are not transmitted to our
                  servers.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Google Services</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • <strong>Google Analytics:</strong> Website usage analytics and reporting
                  </li>
                  <li>
                    • <strong>Google AdSense:</strong> Advertising services and revenue generation
                  </li>
                  <li>
                    • <strong>Google Fonts:</strong> Web font delivery service
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  These services have their own privacy policies. Please review Google's Privacy Policy for more
                  information.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy or want to exercise your rights, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong>Email:</strong> privacy@gpacalculatorpro.com
                </p>
                <p>
                  <strong>Contact Form:</strong>{" "}
                  <a href="/contact" className="text-primary hover:underline">
                    Visit our contact page
                  </a>
                </p>
                <p>
                  <strong>Response Time:</strong> We will respond to privacy requests within 30 days
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal
                requirements. We will notify users of significant changes by posting the updated policy on our website
                with a new "Last Updated" date. Your continued use of our service after such changes constitutes
                acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 flex justify-center">
          <AdBanner slot="0987654321" format="rectangle" className="max-w-md w-full" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
