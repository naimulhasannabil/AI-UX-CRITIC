import { AuthForm } from "@/components/auth/auth-form"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="fade-in w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">UX Critic</span>
        </Link>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-balance">Create your account</h1>
          <p className="text-muted-foreground">Start getting instant UX feedback on your designs</p>
        </div>

        <AuthForm mode="signup" />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/signin" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
