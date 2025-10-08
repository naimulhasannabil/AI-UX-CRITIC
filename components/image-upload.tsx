"use client"

import type React from "react"

import { useCallback, useState, useEffect } from "react"
import { Upload, X, Clipboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageUploadProps {
  onImageSelect: (image: string) => void
  currentImage: string | null
}

export function ImageUpload({ onImageSelect, currentImage }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onImageSelect(result)
      }
      reader.readAsDataURL(file)
    },
    [onImageSelect],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  const handleClear = useCallback(() => {
    onImageSelect("")
  }, [onImageSelect])

  const handlePaste = useCallback(async () => {
    try {
      const clipboardItems = await navigator.clipboard.read()
      for (const item of clipboardItems) {
        for (const type of item.types) {
          if (type.startsWith("image/")) {
            const blob = await item.getType(type)
            const file = new File([blob], "pasted-image.png", { type })
            handleFile(file)
            return
          }
        }
      }
      alert("No image found in clipboard")
    } catch (error) {
      console.error("[v0] Error reading clipboard:", error)
      alert("Failed to read clipboard. Please make sure you've granted clipboard permissions.")
    }
  }, [handleFile])

  useEffect(() => {
    const handlePasteEvent = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return

      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          e.preventDefault()
          const file = item.getAsFile()
          if (file) handleFile(file)
          break
        }
      }
    }

    window.addEventListener("paste", handlePasteEvent)
    return () => window.removeEventListener("paste", handlePasteEvent)
  }, [handleFile])

  return (
    <div>
      {currentImage ? (
        <div className="relative">
          <Image
            src={currentImage}
            alt="Uploaded screenshot"
            width={400}
            height={300}
            className="w-full rounded-lg border border-border object-contain"
            unoptimized // Since it's a data URL, we need to unoptimize
          />
          <Button variant="destructive" size="icon" className="absolute right-2 top-2" onClick={handleClear}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border/50 bg-muted/20 hover:border-primary/50 hover:bg-muted/30"
          }`}
        >
          <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="flex cursor-pointer flex-col items-center gap-4 p-8">
            <div className="rounded-full bg-primary/10 p-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="mb-1 font-medium">Drop your screenshot here</p>
              <p className="text-sm text-muted-foreground">or click to browse</p>
            </div>
            <p className="text-xs text-muted-foreground">PNG, JPG, or WebP (max 10MB)</p>
          </label>
          <div className="mt-2">
            <Button variant="outline" size="sm" onClick={handlePaste} className="gap-2 bg-transparent">
              <Clipboard className="h-4 w-4" />
              Paste from Clipboard
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}