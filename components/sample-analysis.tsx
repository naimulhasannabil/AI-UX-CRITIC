import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"

const sampleIssues = [
  {
    severity: "critical",
    category: "Accessibility",
    issue: "Low contrast text",
    description: "Text color #6B7280 on white background has contrast ratio of 3.2:1",
    fix: "Increase contrast ratio to 4.5:1, try #111827 instead",
  },
  {
    severity: "medium",
    category: "Layout",
    issue: "Inconsistent spacing",
    description: "Button margins vary between 12px and 16px",
    fix: "Use consistent spacing scale (8px, 16px, 24px)",
  },
  {
    severity: "low",
    category: "Visual",
    issue: "Font size too small",
    description: "Body text is 12px, below recommended 14px minimum",
    fix: "Increase body text to 14px or 16px for better readability",
  },
]

export function SampleAnalysis() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Sample Analysis Results</h2>
        <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
          See how our AI identifies issues and provides actionable recommendations.
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <Card className="mb-6 border-border/50 bg-card/50 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">UX Score</h3>
              <p className="text-muted-foreground">Overall design quality</p>
            </div>
            <div className="text-5xl font-bold text-primary">78</div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border/50 bg-background p-4">
              <div className="mb-1 text-sm text-muted-foreground">Accessibility</div>
              <div className="text-2xl font-bold">72</div>
            </div>
            <div className="rounded-lg border border-border/50 bg-background p-4">
              <div className="mb-1 text-sm text-muted-foreground">Layout</div>
              <div className="text-2xl font-bold">81</div>
            </div>
            <div className="rounded-lg border border-border/50 bg-background p-4">
              <div className="mb-1 text-sm text-muted-foreground">Visual</div>
              <div className="text-2xl font-bold">82</div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {sampleIssues.map((item, index) => {
            const Icon =
              item.severity === "critical" ? AlertTriangle : item.severity === "medium" ? AlertCircle : CheckCircle

            const severityColor =
              item.severity === "critical" ? "destructive" : item.severity === "medium" ? "default" : "secondary"

            return (
              <Card key={index} className="border-border/50 bg-card/50 p-6 transition-all hover:border-primary/30">
                <div className="flex items-start gap-4">
                  <div
                    className={`rounded-lg p-2 ${
                      item.severity === "critical"
                        ? "bg-destructive/10 text-destructive"
                        : item.severity === "medium"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-green-500/10 text-green-500"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant={severityColor} className="capitalize">
                        {item.severity}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{item.category}</span>
                    </div>

                    <h4 className="mb-2 text-lg font-semibold">{item.issue}</h4>
                    <p className="mb-3 text-muted-foreground">{item.description}</p>

                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                      <div className="mb-1 text-sm font-medium text-primary">Suggested Fix</div>
                      <p className="text-sm">{item.fix}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
