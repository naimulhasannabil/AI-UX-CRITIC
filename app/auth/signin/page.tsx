import { AuthForm } from "@/components/auth/auth-form"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="fade-in w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">UX Critic</span>
        </Link>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-balance">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to continue analyzing your designs</p>
        </div>

        <AuthForm mode="signin" />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
