"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, ExternalLink } from "lucide-react"

interface FigmaLinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onFigmaLinkSubmit: (url: string, accessToken: string) => void
  isLoading?: boolean
}

export function FigmaLinkDialog({ open, onOpenChange, onFigmaLinkSubmit, isLoading }: FigmaLinkDialogProps) {
  const [figmaUrl, setFigmaUrl] = useState("")
  const [accessToken, setAccessToken] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (figmaUrl.trim() && accessToken.trim()) {
      onFigmaLinkSubmit(figmaUrl, accessToken)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Import from Figma</DialogTitle>
          <DialogDescription>Paste your Figma file URL and access token to analyze your design.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="figma-url">Figma File URL</Label>
            <Input
              id="figma-url"
              placeholder="https://www.figma.com/file/..."
              value={figmaUrl}
              onChange={(e) => setFigmaUrl(e.target.value)}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">Example: https://www.figma.com/file/ABC123/My-Design</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="access-token">Figma Access Token</Label>
            <Input
              id="access-token"
              type="password"
              placeholder="figd_..."
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              <a
                href="https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                Get your access token
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={!figmaUrl.trim() || !accessToken.trim() || isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                "Import Design"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
