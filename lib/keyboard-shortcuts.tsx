"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "./theme-context"

export function KeyboardShortcuts() {
  const router = useRouter()
  const { toggleTheme } = useTheme()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K: Focus search (if on dashboard)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
      }

      // Cmd/Ctrl + N: New analysis
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault()
        router.push("/upload")
      }

      // Cmd/Ctrl + D: Dashboard
      if ((e.metaKey || e.ctrlKey) && e.key === "d") {
        e.preventDefault()
        router.push("/dashboard")
      }

      // Cmd/Ctrl + /: AI Assistant
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault()
        router.push("/assistant")
      }

      // Cmd/Ctrl + Shift + T: Toggle theme
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "T") {
        e.preventDefault()
        toggleTheme()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router, toggleTheme])

  return null
}
