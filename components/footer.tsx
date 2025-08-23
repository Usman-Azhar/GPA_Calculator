import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted mt-16 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">GPA Calculator</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The most trusted free GPA calculator for students worldwide. Calculate semester GPA, cumulative CGPA, and
              convert to percentage with support for all major grading systems.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Calculators</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Semester GPA Calculator
                </Link>
              </li>
              <li>
                <Link href="/cumulative-gpa" className="text-muted-foreground hover:text-primary transition-colors">
                  Cumulative GPA Calculator
                </Link>
              </li>
              <li>
                <Link href="/percentage" className="text-muted-foreground hover:text-primary transition-colors">
                  GPA to Percentage Converter
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 GPA Calculator. All rights reserved. | Helping students achieve academic success worldwide.</p>
        </div>
      </div>
    </footer>
  )
}
