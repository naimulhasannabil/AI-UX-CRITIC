import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-12 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]" />

        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Start Analyzing Now</span>
          </div>

          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Ready to improve your UX?</h2>

          <p className="mx-auto mb-8 max-w-2xl text-balance text-lg text-muted-foreground">
            Upload your first screenshot and get instant AI-powered feedback on your design
          </p>

          <Link href="/analyze">
            <Button size="lg" className="group h-12 px-8 text-base glow-button cursor-pointer">
              Analyze Your Design
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
