import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    // Format history for Ollama
    const formattedHistory = history.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }))

    // Call Ollama API with optimized parameters
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        messages: [...formattedHistory, { role: "user", content: message }],
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 256, // Limit token generation for faster responses
        },
      }),
    })

    if (!response.ok) {
      throw new Error("Ollama API error")
    }

    const data = await response.json()

    return NextResponse.json({
      response: data.message.content,
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
