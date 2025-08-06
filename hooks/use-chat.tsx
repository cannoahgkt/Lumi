"use client"

import { useState, useCallback, useEffect } from "react"
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react"
import type { Message, ChatRequest, ChatResponse, UserSettings } from "@/types"
import { v4 as uuidv4 } from "uuid"
import { DEFAULT_MODEL, DEFAULT_PROVIDER } from "@/lib/providers"
import { applyTemplate, getTemplateById } from "@/lib/templates"

// Local storage keys
const STORAGE_KEYS = {
  MESSAGES: "lumi-messages",
  SETTINGS: "lumi-settings",
  API_KEYS: "lumi-api-keys",
} as const

// Default settings
const DEFAULT_SETTINGS: UserSettings = {
  defaultModel: DEFAULT_MODEL,
  defaultProvider: DEFAULT_PROVIDER,
  apiKeys: {},
  preferences: {
    temperature: 0.7,
    maxTokens: 1000,
    autoSave: true,
  },
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL)
  const [selectedProvider, setSelectedProvider] = useState(DEFAULT_PROVIDER)
  const [selectedTemplate, setSelectedTemplate] = useState("default")
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS)

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES)
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages)
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })))
      }

      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS)
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...DEFAULT_SETTINGS, ...parsed })
        setSelectedModel(parsed.defaultModel || DEFAULT_MODEL)
        setSelectedProvider(parsed.defaultProvider || DEFAULT_PROVIDER)
      }
    } catch (error) {
      console.error("Error loading saved data:", error)
    }
  }, [])

  // Save messages to localStorage
  const saveMessages = useCallback((newMessages: Message[]) => {
    if (settings.preferences.autoSave) {
      try {
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(newMessages))
      } catch (error) {
        console.error("Error saving messages:", error)
      }
    }
  }, [settings.preferences.autoSave])

  // Save settings to localStorage
  const saveSettings = useCallback((newSettings: UserSettings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings))
    } catch (error) {
      console.error("Error saving settings:", error)
    }
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleModelChange = (model: string, provider: string) => {
    setSelectedModel(model)
    setSelectedProvider(provider)
    
    // Update settings
    const newSettings = {
      ...settings,
      defaultModel: model,
      defaultProvider: provider,
    }
    setSettings(newSettings)
    saveSettings(newSettings)
  }

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const storeApiKey = (provider: string, apiKey: string) => {
    const newSettings = {
      ...settings,
      apiKeys: {
        ...settings.apiKeys,
        [provider]: apiKey,
      },
    }
    setSettings(newSettings)
    saveSettings(newSettings)
  }

  const clearChat = () => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEYS.MESSAGES)
  }

  const handleSubmit = async (e?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>) => {
    e?.preventDefault()

    if (!input.trim() || isLoading) return

    // Apply template
    const template = getTemplateById(selectedTemplate)
    const processedMessage = template ? applyTemplate(template, input) : input

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content: input, // Show original input in UI
      role: "user",
      timestamp: new Date(),
      model: selectedModel,
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      // Prepare request
      const request: ChatRequest = {
        message: processedMessage, // Send processed message to API
        messages: messages, // Send message history
        model: selectedModel,
        provider: selectedProvider,
        options: {
          temperature: settings.preferences.temperature,
          maxTokens: settings.preferences.maxTokens,
        },
      }

      // Add API key if using user-key provider
      if (selectedProvider === "user-key") {
        const apiKey = settings.apiKeys[selectedProvider]
        if (!apiKey) {
          throw new Error("Please provide your API key in settings to use this model.")
        }
        request.apiKey = apiKey
      }

      // Call API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data: ChatResponse = await response.json()

      // Add AI response
      const aiMessage: Message = {
        id: uuidv4(),
        content: data.content,
        role: "assistant",
        timestamp: new Date(),
        model: data.model,
      }

      const finalMessages = [...newMessages, aiMessage]
      setMessages(finalMessages)
      saveMessages(finalMessages)

    } catch (error: any) {
      console.error("Chat error:", error)

      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        content: error.message || "I apologize, but I encountered an error. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      }

      const finalMessages = [...newMessages, errorMessage]
      setMessages(finalMessages)
      saveMessages(finalMessages)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    // Core state
    messages,
    input,
    isLoading,
    
    // Model selection
    selectedModel,
    selectedProvider,
    selectedTemplate,
    
    // Settings
    settings,
    
    // Actions
    handleInputChange,
    handleSubmit,
    handleModelChange,
    handleTemplateChange,
    storeApiKey,
    clearChat,
    setSettings: (newSettings: UserSettings) => {
      setSettings(newSettings)
      saveSettings(newSettings)
    },
  }
}
