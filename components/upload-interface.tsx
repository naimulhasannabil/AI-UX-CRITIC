"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileImage, Link2, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { analyzeDesign } from "@/app/actions/analyze-design"
import { fetchFigmaFile } from "@/app/actions/fetch-figma"
import { FigmaLinkDialog } from "@/components/figma-link-dialog"

export function UploadInterface() {
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showFigmaDialog, setShowFigmaDialog] = useState(false)
  const [isFetchingFigma, setIsFetchingFigma] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      setSelectedFile(files[0])
      console.log("[v0] Dropped file:", files[0].name)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setSelectedFile(files[0])
      console.log("[v0] Selected file:", files[0].name)
    }
  }

  const handleFigmaLinkSubmit = async (url: string, accessToken: string) => {
    setIsFetchingFigma(true)

    try {
      console.log("[v0] Fetching Figma file...")
      const result = await fetchFigmaFile(url, accessToken)

      if (!result.success) {
        alert(result.error || "Failed to fetch Figma file")
        setIsFetchingFigma(false)
        return
      }

      console.log("[v0] Figma file fetched successfully")
      setShowFigmaDialog(false)
      setIsFetchingFigma(false)

      setIsAnalyzing(true)
      const analysisResult = await analyzeDesign(result.imageUrl!)

      console.log("[v0] Analysis complete:", analysisResult)

      sessionStorage.setItem("analysisResult", JSON.stringify(analysisResult))
      sessionStorage.setItem("analysisImage", result.imageUrl!)

      router.push("/analyze")
    } catch (error) {
      console.error("[v0] Error fetching Figma file:", error)
      alert("An error occurred while fetching the Figma file. Please try again.")
      setIsFetchingFigma(false)
      setIsAnalyzing(false)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert("Please select a file first")
      return
    }

    setIsAnalyzing(true)

    try {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64String = reader.result as string

        console.log("[v0] Starting AI analysis...")

        const result = await analyzeDesign(base64String)

        console.log("[v0] Analysis complete:", result)

        sessionStorage.setItem("analysisResult", JSON.stringify(result))
        sessionStorage.setItem("analysisImage", base64String)

        router.push("/analyze")
      }

      reader.readAsDataURL(selectedFile)
    } catch (error) {
      console.error("[v0] Error during analysis:", error)
      alert("An error occurred during analysis. Please try again.")
      setIsAnalyzing(false)
    }
  }

  return (
    <>
      <section id="analyze" className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Start Analyzing Your Design</h2>
          <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
            Upload a screenshot, Figma file, or paste a Figma link to get instant UX feedback.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card
            className={`border-2 border-dashed p-12 text-center transition-all ${
              isDragging ? "border-primary bg-primary/5" : "border-border/50 bg-card/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-6">
              <div className="rounded-full bg-primary/10 p-6">
                <Upload className="h-12 w-12 text-primary" />
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  {selectedFile ? `Selected: ${selectedFile.name}` : "Drag & drop your design here"}
                </h3>
                <p className="text-muted-foreground">or choose from the options below</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="screenshot-upload">
                  <Button variant="outline" className="gap-2 bg-transparent" asChild>
                    <span>
                      <FileImage className="h-4 w-4" />
                      Upload Screenshot
                    </span>
                  </Button>
                  <input
                    id="screenshot-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>

                <label htmlFor="figma-upload">
                  <Button variant="outline" className="gap-2 bg-transparent" asChild>
                    <span>
                      <FileImage className="h-4 w-4" />
                      Upload Figma File
                    </span>
                  </Button>
                  <input id="figma-upload" type="file" accept=".fig" className="hidden" onChange={handleFileSelect} />
                </label>

                <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setShowFigmaDialog(true)}>
                  <Link2 className="h-4 w-4" />
                  Paste Figma Link
                </Button>
              </div>

              <div className="w-full border-t border-border/50 pt-6">
                <Button
                  size="lg"
                  className="w-full sm:w-auto glow-button"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !selectedFile}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    "Start Analysis"
                  )}
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">Supported formats: PNG, JPG, .fig files, Figma links</p>
            </div>
          </Card>
        </div>
      </section>

      <FigmaLinkDialog
        open={showFigmaDialog}
        onOpenChange={setShowFigmaDialog}
        onFigmaLinkSubmit={handleFigmaLinkSubmit}
        isLoading={isFetchingFigma}
      />
    </>
  )
}
