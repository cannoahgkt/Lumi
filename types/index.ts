export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  model?: string
  file?: {
    name: string
    type: string
    url?: string
  }
}

export interface AIProvider {
  id: string
  name: string
  models: AIModel[]
  apiKeyRequired: boolean
}

export interface AIModel {
  id: string
  name: string
  provider: string
  description?: string
  contextLength?: number
  pricing?: {
    input: number
    output: number
  }
}

export interface ChatRequest {
  message: string
  messages: Message[]
  model: string
  provider: string
  apiKey?: string
  template?: string
  options?: {
    temperature?: number
    maxTokens?: number
    topP?: number
  }
}

export interface ChatResponse {
  content: string
  model: string
  provider: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

export interface PromptTemplate {
  id: string
  name: string
  description: string
  template: string
  category: string
  variables?: string[]
}

export interface UserSettings {
  defaultModel: string
  defaultProvider: string
  apiKeys: Record<string, string>
  preferences: {
    temperature: number
    maxTokens: number
    autoSave: boolean
  }
}
