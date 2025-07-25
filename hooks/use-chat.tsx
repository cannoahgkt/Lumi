"use client"

import { useState } from "react"
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react"
import type { Message } from "@/types"
import { v4 as uuidv4 } from "uuid"

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content: input,
      role: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call API to get AI response
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to get response")
      }

      const data = await response.json()

      // Add AI message
      const aiMessage: Message = {
        id: uuidv4(),
        content: data.response,
        role: "assistant",
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error: any) {
      console.error("Error:", error)

      // Add error message with specific details
      const errorMessage: Message = {
        id: uuidv4(),
        content: error.message?.includes("Ollama") || error.message?.includes("model") 
          ? error.message
          : "I'm having trouble connecting right now. Please make sure Ollama is running with the Llama3 model installed. You can install it by running 'ollama pull llama3' in your terminal.",
        role: "assistant",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  }
}
