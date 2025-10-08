"use client"

import { Navbar } from "@/components/navbar"
import { ProtectedRoute } from "@/components/protected-route"
import { UploadInterface } from "@/components/upload-interface"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <UploadInterface />
        </div>
      </div>
    </ProtectedRoute>
  )
}
