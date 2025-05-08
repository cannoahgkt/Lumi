"use client"

import { useState, useRef } from "react"
import { SendHorizonal, Mic, Paperclip, X } from 'lucide-react'
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
          <button 
            type="button" 
            onClick={removeFile}
            className="p-1 hover:bg-[#2a2a2a] rounded-full"
          >
            <X className="w-4 h-4 text-[#e0e0e0]/70" />
          </button>
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-[#1a1a1a]/60 rounded-full border border-[#9c6bff]/20 px-2">
          <button 
            type="button" 
            onClick={handleFileClick}
            className="p-2 rounded-full hover:bg-white/5 transition-all text-[#e0e0e0]/50"
            aria-label="Upload file"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*,.pdf,.doc,.docx,.txt"
            name="file"
          />

          <input
            type="text"
            value={input}
            onChange={(e) => handleInputChange(e as any)}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent border-none outline-none text-[#e0e0e0] placeholder:text-[#e0e0e0]/30 py-2"
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                if (input.trim() || selectedFile) {
                  handleSubmit(e as any)
                }
              }
            }}
          />

          <button 
            type="button" 
            onClick={startListening}
            className={`p-2 rounded-full transition-all ${
              isListening 
                ? 'bg-[#9c6bff]/30 text-[#9c6bff]' 
                : 'hover:bg-white/5 text-[#e0e0e0]/50'
            }`}
            aria-label="Voice input"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>

        <button
          type="submit"
          disabled={(!input.trim() && !selectedFile) || isLoading}
          className="p-3 rounded-full bg-[#9c6bff] text-white disabled:opacity-50 hover:bg-[#8a2be2] transition-all disabled:hover:bg-[#9c6bff] shadow-[0_0_10px_rgba(156,107,255,0.3)]"
          aria-label="Send message"
        >
          <SendHorizonal className="w-5 h-5" />
        </button>
      </div>
    </form>
  )
}