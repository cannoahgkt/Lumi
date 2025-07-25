"use client"

import { useState, useRef } from "react"
import { SendHorizonal, Mic, Paperclip, X } from 'lucide-react'
import type { FormEvent, ChangeEvent, KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"

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
        <div className="mb-4 p-3 liquid-glass-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            {filePreview ? (
              <img src={filePreview || "/placeholder.svg"} alt="Preview" className="w-12 h-12 object-cover rounded-xl" />
            ) : (
              <div className="w-12 h-12 liquid-glass rounded-xl flex items-center justify-center">
                <Paperclip className="w-6 h-6 text-primary" />
              </div>
            )}
            <span className="text-sm text-foreground truncate max-w-[200px] font-medium">{selectedFile.name}</span>
          </div>
          <Button 
            type="button" 
            variant="ghost"
            size="icon"
            onClick={removeFile}
            className="h-8 w-8 rounded-xl hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      
      <div className="flex items-end gap-3">
        <div className="flex-1 liquid-glass-card overflow-hidden">
          <div className="flex items-center gap-2 p-2">
            <Button 
              type="button" 
              variant="ghost"
              size="icon"
              onClick={handleFileClick}
              className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary shrink-0"
              aria-label="Upload file"
            >
              <Paperclip className="w-5 h-5" />
            </Button>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*,.pdf,.doc,.docx,.txt"
              name="file"
            />

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => handleInputChange(e as any)}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground py-2 px-2 resize-none min-h-[20px] max-h-32 leading-6"
              rows={1}
              onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  if (input.trim() || selectedFile) {
                    handleSubmit(e as any)
                    removeFile()
                  }
                }
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = 'auto'
                target.style.height = target.scrollHeight + 'px'
              }}
            />

            <Button 
              type="button" 
              variant="ghost"
              size="icon"
              onClick={startListening}
              className={`h-10 w-10 rounded-xl shrink-0 transition-all ${
                isListening 
                  ? 'bg-primary/20 text-primary hover:bg-primary/30' 
                  : 'hover:bg-primary/10 hover:text-primary'
              }`}
              aria-label="Voice input"
            >
              <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={(!input.trim() && !selectedFile) || isLoading}
          className="h-12 w-12 rounded-2xl gradient-primary shadow-lg disabled:opacity-50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)] hover:scale-105 transition-all duration-300 shrink-0"
          aria-label="Send message"
        >
          <SendHorizonal className="w-5 h-5" />
        </Button>
      </div>
    </form>
  )
}