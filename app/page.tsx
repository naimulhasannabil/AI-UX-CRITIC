import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"
import { SampleAnalysis } from "@/components/sample-analysis"
import { Navbar } from "@/components/navbar"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div id="features">
        <FeaturesGrid />
      </div>
      <SampleAnalysis />
      <CTASection />
    </main>
  )
}
