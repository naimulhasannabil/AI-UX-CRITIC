"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, AlertCircle, CheckCircle, Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExportPDFButton } from "@/components/export-pdf-button"
import { AnalysisResult } from "@/lib/types"


interface AnalysisResultsProps {
  analysis: AnalysisResult
  image: string | null
  title?: string
}

export function AnalysisResults({ analysis, image, title = "UX Analysis" }: AnalysisResultsProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-5 w-5" />
      case "high":
        return <AlertCircle className="h-5 w-5" />
      case "medium":
        return <Info className="h-5 w-5" />
      default:
        return <CheckCircle className="h-5 w-5" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "high":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <ExportPDFButton analysis={analysis} title={title} image={image} />
      </div>

      {/* Overall Score */}
      <Card className="border-border/50 bg-card/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">UX Score</h3>
            <p className="text-sm text-muted-foreground">Overall design quality</p>
          </div>
          <div className={`text-5xl font-bold ${getScoreColor(analysis.overallScore)}`}>{analysis.overallScore}</div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/50 bg-background p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Accessibility</span>
              <span className={`text-lg font-bold ${getScoreColor(analysis.scores.accessibility)}`}>
                {analysis.scores.accessibility}
              </span>
            </div>
            <Progress value={analysis.scores.accessibility} className="h-2" />
          </div>

          <div className="rounded-lg border border-border/50 bg-background p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Usability</span>
              <span className={`text-lg font-bold ${getScoreColor(analysis.scores.usability)}`}>
                {analysis.scores.usability}
              </span>
            </div>
            <Progress value={analysis.scores.usability} className="h-2" />
          </div>

          <div className="rounded-lg border border-border/50 bg-background p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Visual Design</span>
              <span className={`text-lg font-bold ${getScoreColor(analysis.scores.visual)}`}>
                {analysis.scores.visual}
              </span>
            </div>
            <Progress value={analysis.scores.visual} className="h-2" />
          </div>

          <div className="rounded-lg border border-border/50 bg-background p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Layout</span>
              <span className={`text-lg font-bold ${getScoreColor(analysis.scores.layout)}`}>
                {analysis.scores.layout}
              </span>
            </div>
            <Progress value={analysis.scores.layout} className="h-2" />
          </div>
        </div>
      </Card>

      {/* Summary */}
      <Card className="border-border/50 bg-card/50 p-6">
        <h3 className="mb-3 text-lg font-semibold">Summary</h3>
        <p className="leading-relaxed text-muted-foreground">{analysis.summary}</p>
      </Card>

      {/* Issues */}
      <Card className="border-border/50 bg-card/50 p-6">
        <h3 className="mb-4 text-lg font-semibold">Issues & Recommendations</h3>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="high">High</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="low">Low</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {analysis.issues.map((issue, index) => (
              <IssueCard
                key={index}
                issue={issue}
                getSeverityIcon={getSeverityIcon}
                getSeverityColor={getSeverityColor}
              />
            ))}
          </TabsContent>

          {["critical", "high", "medium", "low"].map((severity) => (
            <TabsContent key={severity} value={severity} className="space-y-4">
              {analysis.issues
                .filter((issue) => issue.severity === severity)
                .map((issue, index) => (
                  <IssueCard
                    key={index}
                    issue={issue}
                    getSeverityIcon={getSeverityIcon}
                    getSeverityColor={getSeverityColor}
                  />
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  )
}

function IssueCard({ issue, getSeverityIcon, getSeverityColor }: any) {
  return (
    <div className="rounded-lg border border-border/50 bg-background p-4 transition-all hover:border-primary/30">
      <div className="flex items-start gap-3">
        <div className={`rounded-lg border p-2 ${getSeverityColor(issue.severity)}`}>
          {getSeverityIcon(issue.severity)}
        </div>

        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              {issue.severity}
            </Badge>
            <span className="text-sm text-muted-foreground">{issue.category}</span>
          </div>

          <h4 className="mb-2 font-semibold">{issue.title}</h4>
          <p className="mb-3 text-sm text-muted-foreground">{issue.description}</p>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <div className="mb-1 text-xs font-medium text-primary">💡 Suggestion</div>
            <p className="text-sm">{issue.suggestion}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
