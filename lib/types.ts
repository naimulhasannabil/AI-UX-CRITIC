export interface Issue {
  severity: "critical" | "high" | "medium" | "low"
  category: string
  title: string
  description: string
  suggestion: string
}

export interface AnalysisIssue {
  id: number
  x: number
  y: number
  severity: "critical" | "warning" | "info"
  message: string
  category: string
  title: string
  description: string
  suggestion: string
}

export interface AnalysisResult {
  overallScore: number
  scores: {
    accessibility: number
    usability: number
    visual: number
    layout: number
  }
  issues: AnalysisIssue[]
  summary: string
}


export interface SavedAnalysis {
  id: string
  title: string
  date: string
  timestamp: number
  score: number
  criticalIssues: number
  warningIssues: number
  infoIssues: number
  thumbnail: string | null
  analysis: AnalysisResult
}
