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
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      // Add AI message
      const aiMessage: Message = {
        id: uuidv4(),
        content: data.response,
        role: "assistant",
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error:", error)

      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        content: "This AI interface was developed for demonstration purposes. The AI backend runs locally and is not deployed for public use.",
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
