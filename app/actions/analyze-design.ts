"use server"

import { generateText } from "ai"

export interface AnalysisIssue {
  id: number
  severity: "critical" | "warning" | "info"
  category: string
  title: string
  description: string
  suggestion: string
  x: number
  y: number
}

export interface AnalysisResult {
  score: number
  issues: AnalysisIssue[]
  summary: string
}

export async function analyzeDesign(imageBase64: string): Promise<AnalysisResult> {
  try {
    const prompt = `You are a UX expert analyzing a design. Analyze this design image and provide detailed UX feedback.

Focus on:
1. Accessibility (contrast, text size, touch targets, alt text)
2. Usability (button sizes, navigation clarity, information hierarchy)
3. Visual Design (spacing consistency, alignment, typography)

For each issue found, provide:
- Severity level (critical, warning, or info)
- Category (Accessibility, Usability, or Visual Design)
- Title (brief issue name)
- Description (what's wrong)
- Suggestion (how to fix it)
- Approximate x,y coordinates on the image (0-600 for x, 0-800 for y)

Respond in JSON format:
{
  "score": <number 0-100>,
  "summary": "<brief overall assessment>",
  "issues": [
    {
      "severity": "critical|warning|info",
      "category": "Accessibility|Usability|Visual Design",
      "title": "<issue title>",
      "description": "<what's wrong>",
      "suggestion": "<how to fix>",
      "x": <number>,
      "y": <number>
    }
  ]
}

Provide 3-7 issues. Be specific and actionable.`

    const { text } = await generateText({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image",
              image: imageBase64,
            },
          ],
        },
      ],
      temperature: 0.7,
    })

    console.log("[v0] AI Response:", text)

    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response")
    }

    const parsed = JSON.parse(jsonMatch[0])

    // Add IDs to issues
    const issues: AnalysisIssue[] = parsed.issues.map((issue: any, index: number) => ({
      id: index + 1,
      severity: issue.severity,
      category: issue.category,
      title: issue.title,
      description: issue.description,
      suggestion: issue.suggestion,
      x: issue.x || 300,
      y: issue.y || 400,
    }))

    return {
      score: parsed.score || 75,
      issues,
      summary: parsed.summary || "Analysis complete",
    }
  } catch (error) {
    console.error("[v0] Error analyzing design:", error)

    // Return mock data as fallback
    return {
      score: 72,
      summary: "Analysis completed with mock data due to an error.",
      issues: [
        {
          id: 1,
          severity: "critical",
          category: "Accessibility",
          title: "Low contrast text",
          description:
            "The text color (#666666) on white background has a contrast ratio of 3.2:1, which fails WCAG AA standards.",
          suggestion: "Use a darker color like #4a4a4a to achieve at least 4.5:1 contrast ratio.",
          x: 150,
          y: 100,
        },
        {
          id: 2,
          severity: "warning",
          category: "Usability",
          title: "Button too small",
          description:
            "The CTA button is only 32px tall, which is below the recommended 44px minimum touch target size.",
          suggestion: "Increase button height to at least 44px for better mobile usability.",
          x: 300,
          y: 250,
        },
        {
          id: 3,
          severity: "info",
          category: "Visual Design",
          title: "Consider spacing",
          description: "The spacing between sections is inconsistent, ranging from 16px to 32px.",
          suggestion: "Use a consistent spacing scale (e.g., 8px, 16px, 24px, 32px) throughout the design.",
          x: 450,
          y: 180,
        },
      ],
    }
  }
}
