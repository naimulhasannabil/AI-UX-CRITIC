import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const prompt = convertToModelMessages(messages)

  const result = streamText({
    model: "google/gemini-1.5-pro",
    system: `You are an expert UX designer and consultant with years of experience in user experience design, accessibility, and usability. 
    
Your role is to:
- Provide actionable UX advice and best practices
- Help users improve their designs with specific, practical suggestions
- Explain UX principles in clear, understandable terms
- Offer insights on accessibility, usability, visual design, and user research
- Be encouraging and constructive in your feedback
- Use examples when helpful to illustrate concepts

Keep your responses concise but thorough. Focus on practical, implementable advice.`,
    prompt,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log("[v0] Assistant chat aborted")
      }
    },
    consumeSseStream: consumeStream,
  })
}
