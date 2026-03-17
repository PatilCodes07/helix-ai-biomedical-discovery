function extractContent(message: any): string {
  if (!message) return ""
  if (typeof message.content === "string") return message.content

  if (Array.isArray(message.content)) {
    return message.content
      .map((part: any) => {
        if (typeof part === "string") return part
        if (part?.type === "text") return part.text || ""
        return ""
      })
      .join("")
  }

  return ""
}

function cleanSectionText(text: string): string {
  return text
    .replace(/^[:\s",-]+/, "")
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"')
    .trim()
}

export async function POST(request: Request) {
  try {
    const { topic } = await request.json()

    if (!topic || typeof topic !== "string") {
      return Response.json({ error: "Topic is required" }, { status: 400 })
    }

    const apiBase = process.env.NVIDIA_API_BASE
    const apiKey = process.env.NVIDIA_API_KEY
    const model = process.env.NVIDIA_MODEL

    if (!apiBase || !apiKey || !model) {
      return Response.json(
        { error: "Missing NVIDIA environment variables" },
        { status: 500 }
      )
    }

    const response = await fetch(`${apiBase}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: `You are Helix, an expert biomedical research assistant.

Return plain text in exactly this format:

Known Discoveries:
• point 1
• point 2
• point 3

Research Gaps:
• point 1
• point 2
• point 3

Suggested Hypothesis:
2-3 sentence hypothesis paragraph

Rules:
- Do NOT return JSON
- Do NOT use markdown code fences
- Keep it concise and scientific
- Use exactly these section headings`,
          },
          {
            role: "user",
            content: `Topic: ${topic}`,
          },
        ],
        temperature: 0.2,
        max_tokens: 1200,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("NVIDIA API error:", data)
      return Response.json(
        { error: data?.error?.message || "NVIDIA API request failed" },
        { status: response.status }
      )
    }

    const raw = extractContent(data?.choices?.[0]?.message)

    console.log("[v0] Raw model response:", raw)

    if (!raw) {
      console.error("[v0] Empty model response:", data)
      return Response.json(
        { error: "Empty response from model" },
        { status: 500 }
      )
    }

    // More flexible regex patterns that handle variations
    const discoveriesMatch = raw.match(
      /(?:Known\s+)?Discoveries?:?\s*([\s\S]*?)(?=Research\s+Gaps?:|Gaps?:|$)/i
    )
    const gapsMatch = raw.match(
      /(?:Research\s+)?Gaps?:?\s*([\s\S]*?)(?=Suggested\s+Hypothesis:|Hypothesis:|$)/i
    )
    const hypothesisMatch = raw.match(
      /(?:Suggested\s+)?Hypothesis:?\s*([\s\S]*?)$/i
    )

    const discoveries = cleanSectionText(
      discoveriesMatch?.[1] || "No discoveries generated"
    )
    const gaps = cleanSectionText(
      gapsMatch?.[1] || "No research gaps generated"
    )
    const hypothesis = cleanSectionText(
      hypothesisMatch?.[1] || "No hypothesis generated"
    )

    const result = {
      discoveries,
      gaps,
      hypothesis,
    }

    console.log("[v0] Final returned JSON:", JSON.stringify(result, null, 2))

    return Response.json(result)
  } catch (error) {
    console.error("Generation error:", error)
    return Response.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    )
  }
}
