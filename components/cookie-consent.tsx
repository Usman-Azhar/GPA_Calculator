"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Cookie, Settings, Shield, BarChart3, Target } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  advertising: boolean
  preferences: boolean
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    analytics: false,
    advertising: false,
    preferences: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(consent)
        setPreferences(savedPreferences)
      } catch (error) {
        console.error("Error parsing cookie preferences:", error)
      }
    }
  }, [])

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs))
    setPreferences(prefs)
    setShowBanner(false)
    setShowSettings(false)

    // Initialize analytics and advertising based on preferences
    if (prefs.analytics && typeof window !== "undefined") {
      // Initialize Google Analytics
      console.log("[v0] Analytics cookies accepted - would initialize GA")
    }

    if (prefs.advertising && typeof window !== "undefined") {
      // Initialize advertising cookies
      console.log("[v0] Advertising cookies accepted - would initialize AdSense")
    }
  }

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      advertising: true,
      preferences: true,
    }
    savePreferences(allAccepted)
  }

  const acceptEssential = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      advertising: false,
      preferences: false,
    }
    savePreferences(essentialOnly)
  }

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === "essential") return // Essential cookies cannot be disabled

    const newPreferences = { ...preferences, [key]: value }
    setPreferences(newPreferences)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
        <div className="container mx-auto max-w-6xl">
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
                    <Cookie className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">We use cookies to enhance your experience</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      We use essential cookies to make our site work. We'd also like to set optional cookies to help us
                      improve our website and analyze how it's used.
                      <a href="/privacy" className="text-primary hover:underline ml-1">
                        Learn more in our Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <Dialog open={showSettings} onOpenChange={setShowSettings}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Settings className="h-4 w-4" />
                        Customize
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Cookie className="h-5 w-5" />
                          Cookie Preferences
                        </DialogTitle>
                        <DialogDescription>
                          Choose which cookies you'd like to accept. You can change these settings at any time.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6 py-4">
                        {/* Essential Cookies */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Shield className="h-5 w-5 text-green-600" />
                              <div>
                                <h4 className="font-medium">Essential Cookies</h4>
                                <p className="text-sm text-muted-foreground">Required for basic site functionality</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">Always Active</Badge>
                              <Switch checked={true} disabled />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground ml-8">
                            These cookies are necessary for the website to function and cannot be switched off.
                          </p>
                        </div>

                        {/* Analytics Cookies */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <BarChart3 className="h-5 w-5 text-blue-600" />
                              <div>
                                <h4 className="font-medium">Analytics Cookies</h4>
                                <p className="text-sm text-muted-foreground">Help us understand how you use our site</p>
                              </div>
                            </div>
                            <Switch
                              checked={preferences.analytics}
                              onCheckedChange={(checked) => updatePreference("analytics", checked)}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground ml-8">
                            These cookies help us understand how visitors interact with our website by collecting
                            anonymous information.
                          </p>
                        </div>

                        {/* Advertising Cookies */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Target className="h-5 w-5 text-orange-600" />
                              <div>
                                <h4 className="font-medium">Advertising Cookies</h4>
                                <p className="text-sm text-muted-foreground">Used to show relevant ads</p>
                              </div>
                            </div>
                            <Switch
                              checked={preferences.advertising}
                              onCheckedChange={(checked) => updatePreference("advertising", checked)}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground ml-8">
                            These cookies are used by advertising services to display relevant advertisements.
                          </p>
                        </div>

                        {/* Preference Cookies */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Settings className="h-5 w-5 text-purple-600" />
                              <div>
                                <h4 className="font-medium">Preference Cookies</h4>
                                <p className="text-sm text-muted-foreground">Remember your settings and preferences</p>
                              </div>
                            </div>
                            <Switch
                              checked={preferences.preferences}
                              onCheckedChange={(checked) => updatePreference("preferences", checked)}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground ml-8">
                            These cookies remember your preferences and settings for a better experience.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                        <Button onClick={acceptEssential} variant="outline" className="flex-1 bg-transparent">
                          Accept Essential Only
                        </Button>
                        <Button onClick={() => savePreferences(preferences)} className="flex-1">
                          Save Preferences
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button onClick={acceptEssential} variant="outline" size="sm">
                    Essential Only
                  </Button>
                  <Button onClick={acceptAll} size="sm" className="bg-primary hover:bg-primary/90">
                    Accept All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

// Hook to check if specific cookie types are accepted
export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    advertising: false,
    preferences: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (consent) {
      try {
        const savedPreferences = JSON.parse(consent)
        setPreferences(savedPreferences)
      } catch (error) {
        console.error("Error parsing cookie preferences:", error)
      }
    }
  }, [])

  return preferences
}
