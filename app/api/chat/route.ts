import { NextResponse } from "next/server"
import type { ChatRequest, ChatResponse, Message } from "@/types"
import { getModelById } from "@/lib/providers"

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(ip: string): string {
  return `rate_limit:${ip}`
}

function isRateLimited(ip: string): boolean {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 20 // 20 requests per minute

  const record = rateLimitMap.get(key)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return false
  }

  if (record.count >= maxRequests) {
    return true
  }

  record.count++
  return false
}

async function callOpenRouter(messages: Message[], model: string, options: any = {}) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error("OpenRouter API key not configured")
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": "LUMI AI Chat",
    },
    body: JSON.stringify({
      model,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1000,
      top_p: options.topP || 0.9,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error?.message || `OpenRouter API error: ${response.status}`)
  }

  const data = await response.json()
  
  return {
    content: data.choices[0]?.message?.content || "No response generated",
    usage: data.usage,
  }
}

async function callGroq(messages: Message[], model: string, options: any = {}) {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    throw new Error("Groq API key not configured")
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1000,
      top_p: options.topP || 0.9,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error?.message || `Groq API error: ${response.status}`)
  }

  const data = await response.json()
  
  return {
    content: data.choices[0]?.message?.content || "No response generated",
    usage: data.usage,
  }
}

async function callUserAPIKey(messages: Message[], model: string, apiKey: string, options: any = {}) {
  // For user-provided keys, we'll use OpenAI format
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model === "gpt-4" ? "gpt-4" : "gpt-3.5-turbo",
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1000,
      top_p: options.topP || 0.9,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error?.message || `OpenAI API error: ${response.status}`)
  }

  const data = await response.json()
  
  return {
    content: data.choices[0]?.message?.content || "No response generated",
    usage: data.usage,
  }
}

export async function POST(req: Request) {
  try {
    // Get client IP for rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for")
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown"

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      )
    }

    const body: ChatRequest = await req.json()
    const { message, messages, model, provider, apiKey, options = {} } = body

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    if (!model || !provider) {
      return NextResponse.json(
        { error: "Model and provider are required" },
        { status: 400 }
      )
    }

    // Validate model
    const modelInfo = getModelById(model)
    if (!modelInfo) {
      return NextResponse.json(
        { error: "Invalid model specified" },
        { status: 400 }
      )
    }

    // Build conversation history
    const conversationMessages: Message[] = [
      ...messages,
      {
        id: "temp",
        content: message,
        role: "user",
        timestamp: new Date(),
      },
    ]

    let result: { content: string; usage?: any }

    // Route to appropriate provider
    switch (provider) {
      case "openrouter":
        result = await callOpenRouter(conversationMessages, model, options)
        break
      case "groq":
        result = await callGroq(conversationMessages, model, options)
        break
      case "user-key":
        if (!apiKey) {
          return NextResponse.json(
            { error: "API key is required for this provider" },
            { status: 400 }
          )
        }
        result = await callUserAPIKey(conversationMessages, model, apiKey, options)
        break
      default:
        return NextResponse.json(
          { error: "Unsupported provider" },
          { status: 400 }
        )
    }

    const response: ChatResponse = {
      content: result.content,
      model,
      provider,
      usage: result.usage,
    }

    return NextResponse.json(response)

  } catch (error: any) {
    console.error("Chat API error:", error)

    // Return user-friendly error messages
    let errorMessage = "I'm having trouble processing your request right now."
    
    if (error.message?.includes("API key")) {
      errorMessage = "There's an issue with the API configuration. Please try again or contact support."
    } else if (error.message?.includes("rate limit") || error.message?.includes("quota")) {
      errorMessage = "The service is currently experiencing high demand. Please try again in a moment."
    } else if (error.message?.includes("model")) {
      errorMessage = "The selected model is not available. Please try a different model."
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    )
  }
}
