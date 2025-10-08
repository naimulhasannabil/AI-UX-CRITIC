"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, AlertTriangle, Info, CheckCircle2, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { AnalysisResult, AnalysisIssue } from "@/lib/types"

const severityConfig = {
  critical: {
    icon: AlertCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  info: {
    icon: Info,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
}

interface AnalysisSidebarProps {
  isAnalyzing: boolean
  selectedAnnotation: number | null
  onAnnotationSelect: (id: number | null) => void
  analysisResult: AnalysisResult | null
}

export function AnalysisSidebar({
  isAnalyzing,
  selectedAnnotation,
  onAnnotationSelect,
  analysisResult,
}: AnalysisSidebarProps) {
  if (isAnalyzing) {
    return (
      <Card className="flex h-[600px] items-center justify-center bg-card/50 p-6">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Generating insights...</p>
        </div>
      </Card>
    )
  }

  const issues = analysisResult?.issues || []
  const criticalCount = issues.filter((i) => i.severity === "critical").length
  const warningCount = issues.filter((i) => i.severity === "warning").length
  const infoCount = issues.filter((i) => i.severity === "info").length
  const overallScore = analysisResult?.score || 72

  const renderIssueCard = (issue: AnalysisIssue) => {
    const config = severityConfig[issue.severity]
    const Icon = config.icon
    const isSelected = selectedAnnotation === issue.id

    return (
      <Card
        key={issue.id}
        className={`cursor-pointer border-2 p-4 transition-all hover:border-primary/50 ${
          isSelected ? "border-primary bg-primary/5" : "border-border/50"
        }`}
        onClick={() => onAnnotationSelect(isSelected ? null : issue.id)}
      >
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`rounded-full p-1 ${config.bg}`}>
              <Icon className={`h-4 w-4 ${config.color}`} />
            </div>
            <Badge variant="outline" className="text-xs">
              {issue.category}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">#{issue.id}</span>
        </div>

        <h3 className="mb-2 font-semibold">{issue.title}</h3>
        <p className="mb-3 text-sm text-muted-foreground">{issue.description}</p>

        <div className={`rounded-lg border p-3 ${config.bg} ${config.border}`}>
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="h-3 w-3" />
            Suggestion
          </div>
          <p className="text-sm">{issue.suggestion}</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 p-6">
      <div className="mb-6">
        <h2 className="mb-4 text-xl font-bold">UX Score</h2>
        <div className="mb-2 flex items-end justify-between">
          <span className="text-4xl font-bold text-primary">{overallScore}</span>
          <span className="text-sm text-muted-foreground">/ 100</span>
        </div>
        <Progress value={overallScore} className="mb-4 h-2" />

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-red-500/10 p-2">
            <div className="text-2xl font-bold text-red-500">{criticalCount}</div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
          <div className="rounded-lg bg-amber-500/10 p-2">
            <div className="text-2xl font-bold text-amber-500">{warningCount}</div>
            <div className="text-xs text-muted-foreground">Warnings</div>
          </div>
          <div className="rounded-lg bg-blue-500/10 p-2">
            <div className="text-2xl font-bold text-blue-500">{infoCount}</div>
            <div className="text-xs text-muted-foreground">Info</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="critical">
            <AlertCircle className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="warning">
            <AlertTriangle className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="info">
            <Info className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">{issues.map(renderIssueCard)}</div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="critical" className="mt-4">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">{issues.filter((i) => i.severity === "critical").map(renderIssueCard)}</div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="warning" className="mt-4">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">{issues.filter((i) => i.severity === "warning").map(renderIssueCard)}</div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="info" className="mt-4">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">{issues.filter((i) => i.severity === "info").map(renderIssueCard)}</div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
