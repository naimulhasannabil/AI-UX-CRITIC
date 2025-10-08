"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, X, Send, Loader2, Minimize2 } from "lucide-react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

export function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/assistant" }),
  })
  const [input, setInput] = useState("")

  // Check if the chat is currently loading/streaming
  const isLoading = status === "streaming" || status === "submitted"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    sendMessage({ text: input })
    setInput("")
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full p-0 shadow-lg hover:scale-110 transition-transform glow-button cursor-pointer"
      >
        <Sparkles className="h-6 w-6" />
      </Button>
    )
  }

  if (isMinimized) {
    return (
      <Button
        onClick={() => setIsMinimized(false)}
        size="lg"
        className="fixed bottom-6 right-6 z-50 gap-2 rounded-full shadow-lg"
      >
        <Sparkles className="h-5 w-5" />
        UX Assistant
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[400px] flex-col overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/40 bg-card p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-2">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">UX Assistant</h3>
            <p className="text-xs text-muted-foreground">Powered by Gemini</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMinimized(true)}>
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="mb-3 rounded-full bg-primary/10 p-4 inline-block">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Ask me anything about UX design, accessibility, or usability!
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left text-xs bg-transparent"
                  onClick={() => setInput("What are UX best practices?")}
                >
                  What are UX best practices?
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left text-xs bg-transparent"
                  onClick={() => setInput("How to improve accessibility?")}
                >
                  How to improve accessibility?
                </Button>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return (
                      <div key={index} className="whitespace-pre-wrap leading-relaxed">
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
              <div className="rounded-2xl bg-muted px-3 py-2">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span className="text-xs text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border/40 p-3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about UX..."
            disabled={isLoading}
            className="flex-1 text-sm"
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="glow-button">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </Card>
  )
}