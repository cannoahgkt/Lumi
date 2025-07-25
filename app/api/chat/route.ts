import { NextResponse } from "next/server"

// Demo responses for when Ollama is not available
const demoResponses = [
  "Hello! I'm LUMI AI, powered by Llama 3. I'm currently running in demo mode since Ollama isn't connected. To enable full functionality, please install Ollama and run 'ollama pull llama3'.",
  "I'd love to help you with that! However, I'm currently in demo mode. For real AI responses, please set up Ollama with the Llama 3 model on your system.",
  "That's an interesting question! In demo mode, I can't provide full AI responses. To unlock my complete capabilities, please install Ollama and the Llama 3 model.",
  "I understand you want to chat! Right now I'm running in demonstration mode. For actual AI conversations, you'll need to install Ollama and run 'ollama pull llama3'.",
]

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Format history for Ollama
    const formattedHistory = history?.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    })) || []

    // Use environment variable for Ollama URL, with fallback to localhost
    const ollamaUrl = process.env.OLLAMA_URL || "http://localhost:11434"
    
    try {
      // Call Ollama API with optimized parameters
      const response = await fetch(`${ollamaUrl}/api/chat`, {
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
            num_predict: 512,
            top_p: 0.9,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`)
      }

      const data = await response.json()

      if (!data.message?.content) {
        throw new Error("Invalid response from Ollama")
      }

      return NextResponse.json({
        response: data.message.content,
      })
    } catch (ollamaError: any) {
      // If Ollama is not available, return demo response
      console.log("Ollama not available, using demo mode")
      
      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)]
      
      return NextResponse.json({
        response: randomResponse,
        demo: true,
      })
    }
  } catch (error: any) {
    console.error("Error in chat API:", error)
    
    return NextResponse.json({ 
      error: "Failed to process request",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    }, { status: 500 })
  }
}
