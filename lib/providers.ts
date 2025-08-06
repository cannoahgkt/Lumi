import type { AIProvider, AIModel } from "@/types"

export const AI_PROVIDERS: AIProvider[] = [
  {
    id: "openrouter",
    name: "OpenRouter",
    apiKeyRequired: false, // Will use our server-side key
    models: [
      {
        id: "meta-llama/llama-3.1-405b-instruct",
        name: "Llama 3.1 405B",
        provider: "openrouter",
        description: "Meta's most capable model",
        contextLength: 32768,
      },
      {
        id: "anthropic/claude-3.5-sonnet",
        name: "Claude 3.5 Sonnet",
        provider: "openrouter",
        description: "Anthropic's latest and most capable model",
        contextLength: 200000,
      },
      {
        id: "openai/gpt-4o",
        name: "GPT-4o",
        provider: "openrouter",
        description: "OpenAI's latest multimodal model",
        contextLength: 128000,
      },
      {
        id: "google/gemini-pro-1.5",
        name: "Gemini Pro 1.5",
        provider: "openrouter",
        description: "Google's latest multimodal model",
        contextLength: 1000000,
      },
      {
        id: "mistralai/mixtral-8x7b-instruct",
        name: "Mixtral 8x7B",
        provider: "openrouter",
        description: "Mistral's mixture of experts model",
        contextLength: 32768,
      },
    ],
  },
  {
    id: "groq",
    name: "Groq",
    apiKeyRequired: false, // Will use our server-side key
    models: [
      {
        id: "llama-3.1-70b-versatile",
        name: "Llama 3.1 70B",
        provider: "groq",
        description: "Fast inference with Llama 3.1 70B",
        contextLength: 32768,
      },
      {
        id: "llama-3.1-8b-instant",
        name: "Llama 3.1 8B",
        provider: "groq",
        description: "Ultra-fast inference with Llama 3.1 8B",
        contextLength: 32768,
      },
      {
        id: "mixtral-8x7b-32768",
        name: "Mixtral 8x7B",
        provider: "groq",
        description: "Fast Mixtral inference",
        contextLength: 32768,
      },
    ],
  },
  {
    id: "user-key",
    name: "Your API Key",
    apiKeyRequired: true,
    models: [
      {
        id: "gpt-4",
        name: "GPT-4 (Your Key)",
        provider: "user-key",
        description: "Use your own OpenAI API key",
        contextLength: 8192,
      },
      {
        id: "gpt-3.5-turbo",
        name: "GPT-3.5 Turbo (Your Key)",
        provider: "user-key",
        description: "Use your own OpenAI API key",
        contextLength: 16384,
      },
    ],
  },
]

export const DEFAULT_MODEL = "llama-3.1-8b-instant"
export const DEFAULT_PROVIDER = "groq"

export function getModelById(modelId: string): AIModel | undefined {
  for (const provider of AI_PROVIDERS) {
    const model = provider.models.find(m => m.id === modelId)
    if (model) return model
  }
  return undefined
}

export function getProviderById(providerId: string): AIProvider | undefined {
  return AI_PROVIDERS.find(p => p.id === providerId)
}
