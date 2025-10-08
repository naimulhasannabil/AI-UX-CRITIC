export interface Issue {
  severity: "critical" | "high" | "medium" | "low"
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
  issues: Issue[]
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
