"use client"

import { Button } from "@/components/ui/button"
import { TypewriterText } from "@/components/typewriter-text"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const scrollToAnalyze = () => {
    const analyzeSection = document.getElementById("analyze")
    analyzeSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="container mx-auto px-4 pt-32 pb-20">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
          <Sparkles className="h-4 w-4" />
          <span>AI-Powered UX Analysis</span>
        </div>

        <h1 className="mb-6 max-w-4xl text-balance text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
          <TypewriterText texts={["Upload your design.", "Get instant UX feedback.", "Ship better products."]} />
        </h1>

        <p className="mb-10 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl">
          Analyze usability, accessibility, and visual design in seconds. Upload screenshots or Figma files to receive
          actionable feedback with annotated visuals and UX scorecards.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/analyze">
            <Button size="lg" className="glow-button group h-12 px-8 text-base">
              Try Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent" onClick={scrollToAnalyze}>
            View Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
