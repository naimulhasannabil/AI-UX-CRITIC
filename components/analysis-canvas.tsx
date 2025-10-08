"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import type { AnalysisResult } from "@/lib/types"

interface AnalysisCanvasProps {
  isAnalyzing: boolean
  selectedAnnotation: number | null
  onAnnotationSelect: (id: number | null) => void
  analysisResult: AnalysisResult | null
  imageUrl: string
}

export function AnalysisCanvas({
  isAnalyzing,
  selectedAnnotation,
  onAnnotationSelect,
  analysisResult,
  imageUrl,
}: AnalysisCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 600, height: 800 })
  const [hoveredAnnotation, setHoveredAnnotation] = useState<number | null>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!imageUrl) return

    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      setImage(img)
    }
    img.src = imageUrl || "/modern-landing-page-mockup.png"
  }, [imageUrl])

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth - 48
        const height = Math.min(width * 1.33, 800)
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !image) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    // Draw image
    ctx.drawImage(image, 0, 0, dimensions.width, dimensions.height)

    // Draw annotations
    const issues = analysisResult?.issues || []
    issues.forEach((annotation) => {
      const isSelected = selectedAnnotation === annotation.id
      const isHovered = hoveredAnnotation === annotation.id
      const radius = isSelected || isHovered ? 20 : 16

      const colors = {
        critical: "#ef4444",
        warning: "#f59e0b",
        info: "#3b82f6",
      }

      const color = colors[annotation.severity]

      // Draw shadow
      ctx.shadowBlur = isSelected || isHovered ? 15 : 10
      ctx.shadowColor = color
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      // Draw circle
      ctx.beginPath()
      ctx.arc(annotation.x, annotation.y, radius, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.globalAlpha = 0.9
      ctx.fill()

      // Reset shadow
      ctx.shadowBlur = 0

      // Draw number
      ctx.globalAlpha = 1
      ctx.fillStyle = "white"
      ctx.font = "bold 16px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(annotation.id.toString(), annotation.x, annotation.y)
    })
  }, [image, dimensions, analysisResult, selectedAnnotation, hoveredAnnotation])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const issues = analysisResult?.issues || []
    let clickedAnnotation: number | null = null

    // Check if click is within any annotation circle
    for (const annotation of issues) {
      const distance = Math.sqrt(Math.pow(x - annotation.x, 2) + Math.pow(y - annotation.y, 2))
      if (distance <= 20) {
        clickedAnnotation = annotation.id
        break
      }
    }

    onAnnotationSelect(clickedAnnotation)
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const issues = analysisResult?.issues || []
    let hoveredId: number | null = null

    // Check if hover is within any annotation circle
    for (const annotation of issues) {
      const distance = Math.sqrt(Math.pow(x - annotation.x, 2) + Math.pow(y - annotation.y, 2))
      if (distance <= 20) {
        hoveredId = annotation.id
        canvas.style.cursor = "pointer"
        break
      }
    }

    if (!hoveredId) {
      canvas.style.cursor = "default"
    }

    setHoveredAnnotation(hoveredId)
  }

  if (isAnalyzing) {
    return (
      <Card className="flex h-[600px] items-center justify-center bg-card/50">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
          <h3 className="mb-2 text-xl font-semibold">Analyzing your design...</h3>
          <p className="text-muted-foreground">AI is reviewing usability, accessibility, and visual design</p>
        </div>
      </Card>
    )
  }

  return (
    <Card ref={containerRef} className="overflow-hidden bg-card/50 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Visual Analysis</h2>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <span className="text-muted-foreground">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-amber-500" />
            <span className="text-muted-foreground">Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-muted-foreground">Info</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center rounded-lg bg-muted/20 p-4">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMove}
          className="rounded-lg"
        />
      </div>
    </Card>
  )
}
