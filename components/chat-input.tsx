"use client"

import { useState, useRef } from "react"
import { SendHorizonal, Mic, Paperclip, X } from "lucide-react"
import type { FormEvent, ChangeEvent, KeyboardEvent } from "react"

interface ChatInputProps {
  input: string
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>) => void
  isLoading: boolean
}

export default function ChatInput({ input, handleInputChange, handleSubmit, isLoading }: ChatInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Speech recognition
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Your browser doesn't support speech recognition. Try Chrome or Edge.")
      return
    }

    setIsListening(true)

    // Use the appropriate speech recognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript
      if (textareaRef.current) {
        const currentValue = textareaRef.current.value
        textareaRef.current.value = currentValue + (currentValue ? " " : "") + speechResult

        // Trigger onChange to update state
        const inputEvent = new Event("input", { bubbles: true })
        textareaRef.current.dispatchEvent(inputEvent)
      }
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error)
      setIsListening(false)
    }

    recognition.start()
  }

  // File handling
  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)

    // Create preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      // For non-image files, just show the name
      setFilePreview(null)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setFilePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // If there's a file, you would handle it here
    if (input.trim() || selectedFile) {
      handleSubmit(e)
      removeFile()
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="relative">
      {selectedFile && (
        <div className="mb-2 p-2 bg-[#1a1a1a]/80 rounded-lg border border-[#9c6bff]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {filePreview ? (
              <img src={filePreview || "/placeholder.svg"} alt="Preview" className="w-10 h-10 object-cover rounded" />
            ) : (
              <div className="w-10 h-10 bg-[#2a2a2a] rounded flex items-center justify-center">
                <Paperclip className="w-5 h-5 text-[#9c6bff]" />
              </div>
            )}
            <span className="text-sm text-[#e0e0e0] truncate max-w-[200px]">{selectedFile.name}</span>
          </div>
          <button type="button" onClick={removeFile} className="p-1 hover:bg-[#2a2a2a] rounded-full">
            <X className="w-4 h-4 text-[#e0e0e0]/70" />
          </button>
        </div>
      )}

      <div className="flex items-end gap-2">
        <button type="button" onClick={handleFileClick} className="p-2 rounded-full hover:bg-white/5 transition-all">
          <Paperclip className="w-5 h-5 text-[#e0e0e0]/50" />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt"
          name="file"
        />

        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Ask anything..."
            rows={1}
            className="w-full bg-[#1a1a1a]/60 border border-[#9c6bff]/20 rounded-xl p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#9c6bff]/50 resize-none placeholder:text-[#e0e0e0]/30 transition-all duration-300"
            style={{
              minHeight: "50px",
              maxHeight: "150px",
            }}
            onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                if (input.trim() || selectedFile) {
                  // Call handleSubmit directly with the keyboard event
                  handleSubmit(e)
                }
              }
            }}
          />

          <button
            type="submit"
            disabled={(!input.trim() && !selectedFile) || isLoading}
            className="absolute right-3 bottom-3 p-1.5 rounded-full bg-[#9c6bff] text-white disabled:opacity-50 hover:bg-[#8a2be2] transition-all hover:shadow-[0_0_15px_rgba(156,107,255,0.5)] disabled:hover:bg-[#9c6bff] disabled:hover:shadow-none"
          >
            <SendHorizonal className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={startListening}
          className={`p-2 rounded-full transition-all ${
            isListening ? "bg-[#9c6bff]/30 text-[#9c6bff] animate-pulse" : "hover:bg-white/5 text-[#e0e0e0]/50"
          }`}
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>
    </form>
  )
}
