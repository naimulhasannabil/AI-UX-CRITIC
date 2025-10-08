import { generateObject } from "ai"
import { z } from "zod"

export const maxDuration = 30

const analysisSchema = z.object({
  overallScore: z.number().min(0).max(100).describe("Overall UX score from 0-100"),
  scores: z.object({
    accessibility: z.number().min(0).max(100).describe("Accessibility score"),
    usability: z.number().min(0).max(100).describe("Usability score"),
    visual: z.number().min(0).max(100).describe("Visual design score"),
    layout: z.number().min(0).max(100).describe("Layout and spacing score"),
  }),
  summary: z.string().describe("Brief summary of the overall UX quality (2-3 sentences)"),
  issues: z
    .array(
      z.object({
        severity: z.enum(["critical", "high", "medium", "low"]).describe("Issue severity level"),
        category: z.string().describe("Category like Accessibility, Layout, Visual, Typography, etc."),
        title: z.string().describe("Short title of the issue"),
        description: z.string().describe("Detailed description of what's wrong"),
        suggestion: z.string().describe("Specific actionable suggestion to fix the issue"),
      }),
    )
    .describe("List of UX issues found, ordered by severity"),
})

function getMockAnalysis() {
  return {
    overallScore: 78,
    scores: {
      accessibility: 72,
      usability: 85,
      visual: 80,
      layout: 75,
    },
    summary:
      "This design shows good overall structure with clear visual hierarchy. However, there are some accessibility concerns with color contrast and text sizing that should be addressed. The layout is well-organized but could benefit from more consistent spacing.",
    issues: [
      {
        severity: "critical" as const,
        category: "Accessibility",
        title: "Insufficient Color Contrast",
        description:
          "The text color (#666666) on white background has a contrast ratio of 3.2:1, which fails WCAG AA standards for normal text (requires 4.5:1).",
        suggestion:
          "Use a darker color like #595959 or darker to achieve at least 4.5:1 contrast ratio. For large text, aim for 3:1 minimum.",
      },
      {
        severity: "high" as const,
        category: "Accessibility",
        title: "Small Touch Targets",
        description:
          "Several interactive elements (buttons, links) are smaller than the recommended 44x44px minimum touch target size, making them difficult to tap on mobile devices.",
        suggestion:
          "Increase button and link padding to ensure all interactive elements are at least 44x44px. Add more spacing between adjacent clickable elements.",
      },
      {
        severity: "high" as const,
        category: "Usability",
        title: "Unclear Call-to-Action Hierarchy",
        description:
          "Multiple CTAs compete for attention without clear visual hierarchy. Users may be confused about the primary action to take.",
        suggestion:
          "Use size, color, and positioning to establish clear hierarchy. Make the primary CTA larger and more prominent, with secondary actions styled more subtly.",
      },
      {
        severity: "medium" as const,
        category: "Visual",
        title: "Inconsistent Spacing",
        description:
          "Spacing between elements varies inconsistently (ranging from 8px to 28px), creating a less polished appearance and disrupting visual rhythm.",
        suggestion:
          "Adopt a consistent spacing scale (e.g., 8px, 16px, 24px, 32px, 48px) and apply it systematically throughout the design.",
      },
      {
        severity: "medium" as const,
        category: "Layout",
        title: "Unbalanced Visual Weight",
        description:
          "The left side of the layout appears heavier than the right, creating visual imbalance and drawing attention away from key content.",
        suggestion:
          "Redistribute content or add visual elements to the right side. Consider using whitespace strategically to create better balance.",
      },
      {
        severity: "low" as const,
        category: "Typography",
        title: "Limited Font Weight Variation",
        description:
          "The design uses only one or two font weights, missing opportunities to create better hierarchy and emphasis through typography.",
        suggestion:
          "Introduce additional font weights (e.g., semibold for subheadings, bold for emphasis) to enhance typographic hierarchy and readability.",
      },
    ],
  }
}

export async function POST(req: Request) {
  try {
    const { image } = await req.json()

    if (!image) {
      return Response.json({ error: "No image provided" }, { status: 400 })
    }

    // Extract base64 data and media type
    const matches = image.match(/^data:([^;]+);base64,(.+)$/)
    if (!matches) {
      return Response.json({ error: "Invalid image format" }, { status: 400 })
    }

    const mediaType = matches[1]
    const base64Data = matches[2]

    try {
      const { object } = await generateObject({
        model: "openai/gpt-4o",
        schema: analysisSchema,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You are an expert UX designer and accessibility consultant. Analyze this website/app screenshot and provide a comprehensive UX critique.

Evaluate the following aspects:
1. **Accessibility**: Color contrast, text readability, WCAG compliance, touch target sizes
2. **Usability**: Navigation clarity, CTA visibility, user flow, information hierarchy
3. **Visual Design**: Typography, color palette, consistency, whitespace usage
4. **Layout**: Alignment, spacing, responsive design indicators, visual balance

Provide:
- An overall UX score (0-100)
- Individual scores for each category
- A brief summary
- Specific issues with actionable suggestions

Be thorough but constructive. Focus on the most impactful improvements.`,
              },
              {
                type: "image",
                image: base64Data,
                mimeType: mediaType,
              },
            ],
          },
        ],
      })

      return Response.json({ analysis: object })
    } catch (aiError: any) {
      console.error("[v0] AI Gateway error:", aiError)

      if (aiError?.message?.includes("customer_verification_required") || aiError?.message?.includes("credit card")) {
        return Response.json({
          analysis: getMockAnalysis(),
          usedMockData: true,
          message:
            "AI Gateway requires a credit card to be added to your Vercel account. Showing demo analysis with mock data. Visit https://vercel.com/account/billing to add a card and unlock AI-powered analysis.",
        })
      }

      return Response.json({
        analysis: getMockAnalysis(),
        usedMockData: true,
        message: "AI analysis temporarily unavailable. Showing demo analysis with mock data.",
      })
    }
  } catch (error) {
    console.error("[v0] Error analyzing image:", error)
    return Response.json({ error: "Failed to analyze image" }, { status: 500 })
  }
}
