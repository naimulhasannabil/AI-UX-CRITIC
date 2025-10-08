"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { ProtectedRoute } from "@/components/protected-route"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, TrendingUp, FileText, Clock, Star, MoreVertical, Eye, Download, Trash2 } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAnalyses } from "@/lib/analysis-context"
import Image from "next/image" // Add this import

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { analyses, deleteAnalysis } = useAnalyses()

  const totalAnalyses = analyses.length
  const averageScore = totalAnalyses > 0 ? Math.round(analyses.reduce((acc, a) => acc + a.score, 0) / totalAnalyses) : 0
  const totalIssues = analyses.reduce((acc, a) => acc + a.criticalIssues + a.warningIssues + a.infoIssues, 0)

  // Calculate this month's analyses
  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
  const thisMonthCount = analyses.filter((a) => a.timestamp >= firstDayOfMonth).length

  const filteredAnalyses = analyses.filter((analysis) =>
    analysis.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Manage and review your UX analyses</p>
            </div>
            <Link href="/upload">
              <Button size="lg" className="gap-2 glow-button">
                <Plus className="h-5 w-5" />
                New Analysis
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Analyses</p>
                  <p className="mt-2 text-3xl font-bold">{totalAnalyses}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="bg-card/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="mt-2 text-3xl font-bold">{averageScore || "—"}</p>
                </div>
                <div className="rounded-full bg-green-500/10 p-3">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </Card>

            <Card className="bg-card/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Issues Found</p>
                  <p className="mt-2 text-3xl font-bold">{totalIssues}</p>
                </div>
                <div className="rounded-full bg-amber-500/10 p-3">
                  <Star className="h-6 w-6 text-amber-500" />
                </div>
              </div>
            </Card>

            <Card className="bg-card/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="mt-2 text-3xl font-bold">{thisMonthCount}</p>
                </div>
                <div className="rounded-full bg-blue-500/10 p-3">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search analyses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {totalAnalyses === 0 ? (
            <Card className="bg-card/50 p-12 text-center">
              <div className="mx-auto max-w-md">
                <div className="mb-4 inline-flex rounded-full bg-primary/10 p-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">No analyses yet</h3>
                <p className="mb-6 text-muted-foreground">Start analyzing your designs to see them here</p>
                <Link href="/upload">
                  <Button size="lg" className="gap-2">
                    <Plus className="h-5 w-5" />
                    Create First Analysis
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <>
              {/* Analyses Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredAnalyses.map((analysis) => (
                  <Card
                    key={analysis.id}
                    className="group overflow-hidden bg-card/50 transition-all hover:border-primary/50"
                  >
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      {/* Replace img with Image component */}
                      <Image
                        src={analysis.thumbnail || "/placeholder.svg"}
                        alt={analysis.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute right-2 top-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-8 w-8 rounded-full bg-background/80 p-0 backdrop-blur-sm"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Export Report
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => deleteAnalysis(analysis.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <h3 className="mb-1 font-semibold">{analysis.title}</h3>
                          <p className="text-sm text-muted-foreground">{analysis.date}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`${
                            analysis.score >= 80
                              ? "border-green-500/50 bg-green-500/10 text-green-500"
                              : analysis.score >= 60
                                ? "border-amber-500/50 bg-amber-500/10 text-amber-500"
                                : "border-red-500/50 bg-red-500/10 text-red-500"
                          }`}
                        >
                          {analysis.score}
                        </Badge>
                      </div>

                      <div className="mb-4 flex gap-2 text-sm">
                        {analysis.criticalIssues > 0 && (
                          <div className="flex items-center gap-1 text-red-500">
                            <div className="h-2 w-2 rounded-full bg-red-500" />
                            <span>{analysis.criticalIssues}</span>
                          </div>
                        )}
                        {analysis.warningIssues > 0 && (
                          <div className="flex items-center gap-1 text-amber-500">
                            <div className="h-2 w-2 rounded-full bg-amber-500" />
                            <span>{analysis.warningIssues}</span>
                          </div>
                        )}
                        {analysis.infoIssues > 0 && (
                          <div className="flex items-center gap-1 text-blue-500">
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                            <span>{analysis.infoIssues}</span>
                          </div>
                        )}
                      </div>

                      <Button variant="outline" className="w-full bg-transparent glow-button">
                        View Analysis
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredAnalyses.length === 0 && (
                <Card className="bg-card/50 p-12 text-center">
                  <p className="text-muted-foreground">No analyses found matching your search.</p>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}