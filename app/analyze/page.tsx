"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Sparkles, Loader2, Info, Save } from "lucide-react"
import { AnalysisResults } from "@/components/analysis-results"
import { ImageUpload } from "@/components/image-upload"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAnalyses } from "@/lib/analysis-context"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function AnalyzePage() {
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [warningMessage, setWarningMessage] = useState<string | null>(null)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [analysisTitle, setAnalysisTitle] = useState("")

  const { saveAnalysis } = useAnalyses()
  const router = useRouter()

  const handleImageSelect = (imageData: string) => {
    setImage(imageData)
    setAnalysis(null)
    setWarningMessage(null)
  }

  const handleAnalyze = async () => {
    if (!image) return

    setIsAnalyzing(true)
    setWarningMessage(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      })

      const data = await response.json()
      setAnalysis(data.analysis)

      if (data.usedMockData && data.message) {
        setWarningMessage(data.message)
      }

      setShowSaveDialog(true)
      setAnalysisTitle(`Analysis ${new Date().toLocaleDateString()}`)
    } catch (error) {
      console.error("[v0] Error analyzing image:", error)
      setWarningMessage("Failed to analyze image. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSave = () => {
    if (analysis && image) {
      saveAnalysis(analysis, image, analysisTitle)
      setShowSaveDialog(false)
      router.push("/dashboard")
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Analysis</span>
          </div>
          <h1 className="mb-4 text-balance text-4xl font-bold md:text-5xl">Analyze Your Design</h1>
          <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
            Upload a screenshot of your website or app to receive instant UX feedback
          </p>
        </div>

        {warningMessage && (
          <div className="mx-auto mb-6 max-w-6xl">
            <Alert variant={warningMessage.includes("credit card") ? "default" : "destructive"}>
              <Info className="h-4 w-4" />
              <AlertTitle>{warningMessage.includes("credit card") ? "Demo Mode" : "Error"}</AlertTitle>
              <AlertDescription className="text-sm">{warningMessage}</AlertDescription>
            </Alert>
          </div>
        )}

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Upload Section */}
            <div>
              <Card className="border-border/50 bg-card/50 p-6">
                <h2 className="mb-4 text-xl font-semibold">Upload Screenshot</h2>
                <ImageUpload onImageSelect={handleImageSelect} currentImage={image} />

                {image && (
                  <Button onClick={handleAnalyze} disabled={isAnalyzing} className="mt-4 w-full" size="lg">
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Analyze Design
                      </>
                    )}
                  </Button>
                )}
              </Card>
            </div>

            {/* Results Section */}
            <div>
              {analysis ? (
                <AnalysisResults analysis={analysis} image={image} title={analysisTitle} />
              ) : (
                <Card className="flex h-full min-h-[400px] items-center justify-center border-border/50 border-dashed bg-card/30 p-6">
                  <div className="text-center">
                    <Upload className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                    <p className="text-muted-foreground">
                      {image ? "Click 'Analyze Design' to get started" : "Upload an image to see analysis results"}
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Analysis</DialogTitle>
            <DialogDescription>Give your analysis a name to save it to your dashboard</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="title" className="mb-2 block">
              Analysis Title
            </Label>
            <Input
              id="title"
              value={analysisTitle}
              onChange={(e) => setAnalysisTitle(e.target.value)}
              placeholder="e.g., Landing Page Redesign"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Skip
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
