import { Card } from "@/components/ui/card"
import { Eye, Palette, Accessibility, Zap, Target, CheckCircle } from "lucide-react"

const features = [
  {
    icon: Accessibility,
    title: "Accessibility Checks",
    description:
      "Analyze color contrast, font sizes, and WCAG compliance to ensure your design is accessible to everyone.",
  },
  {
    icon: Palette,
    title: "Visual Consistency",
    description: "Evaluate color palettes, typography, and design system adherence for a cohesive visual experience.",
  },
  {
    icon: Target,
    title: "Usability Analysis",
    description: "Assess CTA clarity, button sizes, spacing, and layout hierarchy for optimal user experience.",
  },
  {
    icon: Eye,
    title: "Layout & Spacing",
    description: "Detect alignment issues, inconsistent spacing, and visual hierarchy problems automatically.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Get comprehensive UX analysis in seconds with AI-powered insights and actionable recommendations.",
  },
  {
    icon: CheckCircle,
    title: "Actionable Fixes",
    description: "Receive specific suggestions with code examples and design alternatives to improve your work.",
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Comprehensive UX Analysis</h2>
        <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
          Our AI analyzes every aspect of your design to help you ship better products faster.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card
              key={feature.title}
              className="group border-border/50 bg-card/50 p-6 transition-all hover:border-primary/50 hover:bg-card"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
