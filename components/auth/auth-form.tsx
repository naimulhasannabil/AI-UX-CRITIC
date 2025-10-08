"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Mail, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

interface AuthFormProps {
  mode: "signin" | "signup"
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(formData.email, formData.password, formData.name)
      setTimeout(() => {
        setIsLoading(false)
        router.push("/dashboard")
      }, 500)
    } catch (error) {
      console.error("Auth error:", error)
      setIsLoading(false)
    }
  }

  const handleSocialAuth = (provider: string) => {
    console.log(`Authenticating with ${provider}`)
    // Implement social auth logic here
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background/50"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="bg-background/50"
            />
          </div>

          {mode === "signin" && (
            <div className="flex items-center justify-end">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <Button type="submit" className="w-full glow-effect" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === "signin" ? "Signing in..." : "Creating account..."}
              </>
            ) : mode === "signin" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialAuth("github")}
            className="bg-background/50"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialAuth("google")}
            className="bg-background/50"
          >
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>

        {mode === "signup" && (
          <p className="mt-4 text-center text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
