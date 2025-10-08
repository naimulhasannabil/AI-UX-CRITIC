"use server"

export async function fetchFigmaFile(fileUrl: string, accessToken: string) {
  try {
    // Extract file key from URL
    const fileKeyMatch = fileUrl.match(/file\/([a-zA-Z0-9]+)/)
    if (!fileKeyMatch) {
      throw new Error("Invalid Figma URL format")
    }

    const fileKey = fileKeyMatch[1]

    // Fetch file data from Figma API
    const fileResponse = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: {
        "X-Figma-Token": accessToken,
      },
    })

    if (!fileResponse.ok) {
      throw new Error(`Figma API error: ${fileResponse.statusText}`)
    }

    const fileData = await fileResponse.json()

    // Get the first page/frame to render
    const firstPage = fileData.document.children[0]
    const nodeId = firstPage?.id

    if (!nodeId) {
      throw new Error("No pages found in Figma file")
    }

    // Fetch image for the first page
    const imageResponse = await fetch(`https://api.figma.com/v1/images/${fileKey}?ids=${nodeId}&format=png&scale=2`, {
      headers: {
        "X-Figma-Token": accessToken,
      },
    })

    if (!imageResponse.ok) {
      throw new Error(`Figma Image API error: ${imageResponse.statusText}`)
    }

    const imageData = await imageResponse.json()
    const imageUrl = imageData.images[nodeId]

    if (!imageUrl) {
      throw new Error("Failed to get image URL from Figma")
    }

    // Fetch the actual image and convert to base64
    const imageBlob = await fetch(imageUrl)
    const arrayBuffer = await imageBlob.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString("base64")
    const dataUrl = `data:image/png;base64,${base64}`

    return {
      success: true,
      imageUrl: dataUrl,
      fileName: fileData.name || "Figma Design",
    }
  } catch (error) {
    console.error("[v0] Figma fetch error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch Figma file",
    }
  }
}
