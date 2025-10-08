"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { AnalysisResult } from "./types"

export interface SavedAnalysis {
  id: string
  title: string
  date: string
  timestamp: number
  score: number
  criticalIssues: number
  warningIssues: number
  infoIssues: number
  thumbnail: string
  analysis: AnalysisResult
}

interface AnalysisContextType {
  analyses: SavedAnalysis[]
  saveAnalysis: (analysis: AnalysisResult, image: string, title?: string) => void
  deleteAnalysis: (id: string) => void
  getAnalysis: (id: string) => SavedAnalysis | undefined
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined)

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analyses, setAnalyses] = useState<SavedAnalysis[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load analyses from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("ux-critic-analyses")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setAnalyses(parsed)
      } catch (error) {
        console.error("[v0] Error loading analyses:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save analyses to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ux-critic-analyses", JSON.stringify(analyses))
    }
  }, [analyses, isLoaded])

  const saveAnalysis = (analysis: AnalysisResult, image: string, title?: string) => {
    const timestamp = Date.now()
    const id = `analysis-${timestamp}`

    // ✅ Fixed severity mapping to match your defined types
    const criticalIssues = analysis.issues.filter((i) => i.severity === "critical").length
    const warningIssues = analysis.issues.filter((i) => i.severity === "warning").length
    const infoIssues = analysis.issues.filter((i) => i.severity === "info").length

    const newAnalysis: SavedAnalysis = {
      id,
      title: title || `Analysis ${new Date(timestamp).toLocaleDateString()}`,
      date: getRelativeTime(timestamp),
      timestamp,
      score: analysis.overallScore,
      criticalIssues,
      warningIssues,
      infoIssues,
      thumbnail: image,
      analysis,
    }

    setAnalyses((prev) => [newAnalysis, ...prev])
  }

  const deleteAnalysis = (id: string) => {
    setAnalyses((prev) => prev.filter((a) => a.id !== id))
  }

  const getAnalysis = (id: string) => analyses.find((a) => a.id === id)

  return (
    <AnalysisContext.Provider value={{ analyses, saveAnalysis, deleteAnalysis, getAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  )
}

export function useAnalyses() {
  const context = useContext(AnalysisContext)
  if (context === undefined) {
    throw new Error("useAnalyses must be used within an AnalysisProvider")
  }
  return context
}

function getRelativeTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)

  if (seconds < 60) return "just now"
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`
  return new Date(timestamp).toLocaleDateString()
}
