"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X, Settings, LogOut, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const isAuthPage = pathname?.startsWith("/auth")

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-2">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-bold">UX Critic</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {!isAuthPage && (
            <>
              {user ? (
                <>
                  <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                    Dashboard
                  </Link>
                  <Link href="/upload" className="text-sm font-medium transition-colors hover:text-primary">
                    New Analysis
                  </Link>
                  <Link href="/assistant" className="text-sm font-medium transition-colors hover:text-primary">
                    AI Assistant
                  </Link>

                  <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden lg:inline">{user.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link href="/#features" className="text-sm font-medium transition-colors hover:text-primary">
                    Features
                  </Link>
                  <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                  <Link href="/auth/signin">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        {!isAuthPage && (
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && !isAuthPage && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-lg md:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/upload"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  New Analysis
                </Link>
                <Link
                  href="/assistant"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  AI Assistant
                </Link>
                <Button variant="ghost" onClick={toggleTheme} className="w-full justify-start gap-2">
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </Button>
                <Link href="/settings" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-transparent text-red-500"
                  onClick={() => {
                    setIsMenuOpen(false)
                    logout()
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/#features"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Button variant="ghost" onClick={toggleTheme} className="w-full justify-start gap-2">
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </Button>
                <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
