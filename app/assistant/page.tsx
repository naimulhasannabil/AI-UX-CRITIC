"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { ProtectedRoute } from "@/components/protected-route"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, Send, Loader2 } from "lucide-react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

export default function AssistantPage() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/assistant" }),
  })

  const [input, setInput] = useState("")

  const isLoading = status === "streaming" || status === "submitted"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    sendMessage({ text: input })
    setInput("")
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />

        <div className="container mx-auto flex flex-1 flex-col px-4 py-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-3">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">UX Assistant</h1>
                <p className="text-muted-foreground">Get expert UX advice powered by Gemini AI</p>
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <Card className="flex flex-1 flex-col overflow-hidden bg-card/50">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-6">
                      <Sparkles className="h-12 w-12 text-primary" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold">How can I help you today?</h2>
                    <p className="mb-6 max-w-md text-muted-foreground">
                      Ask me anything about UX design, accessibility, usability, or get feedback on your designs.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button
                        variant="outline"
                        className="justify-start text-left bg-transparent"
                        onClick={() => {
                          setInput("What are the key principles of good UX design?")
                        }}
                      >
                        What are the key principles of good UX design?
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start text-left bg-transparent"
                        onClick={() => {
                          setInput("How can I improve accessibility in my designs?")
                        }}
                      >
                        How can I improve accessibility in my designs?
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start text-left bg-transparent"
                        onClick={() => {
                          setInput("What are common UX mistakes to avoid?")
                        }}
                      >
                        What are common UX mistakes to avoid?
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start text-left bg-transparent"
                        onClick={() => {
                          setInput("How do I design for mobile-first?")
                        }}
                      >
                        How do I design for mobile-first?
                      </Button>
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.parts.map((part, index) => {
                        if (part.type === "text") {
                          return (
                            <div key={index} className="whitespace-pre-wrap text-sm leading-relaxed">
                              {part.text}
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl bg-muted px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Form */}
            <div className="border-t border-border/40 p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about UX design..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={!input.trim() || isLoading} className="gap-2">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
