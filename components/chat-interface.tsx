"use client"

import { useRef, useEffect } from "react"
import ChatInput from "./chat-input"
import Message from "./message"
import { useChat } from "@/hooks/use-chat"

export default function ChatInterface() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="w-full max-w-4xl h-[80vh] flex flex-col rounded-xl backdrop-blur-md bg-[#121212]/20 border border-[#9c6bff]/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] overflow-hidden z-0">
      {/* Chat header */}
      <div className="p-4 border-b border-[#9c6bff]/10 backdrop-blur-md bg-[#121212]/40">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#9c6bff] animate-pulse"></div>
          <h2 className="font-['Space_Grotesk'] text-lg font-medium">LLAMA 3 • ONLINE</h2>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#9c6bff]/20 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-[#9c6bff]/20 to-[#00ffff]/20 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#9c6bff] to-[#00ffff]/70"></div>
            </div>
            <h3 className="text-xl font-bold mb-2 font-['Space_Grotesk']">LUMI AI ASSISTANT</h3>
            <p className="text-[#e0e0e0]/70 max-w-md">
              Powered by Llama 3 open-source model. Ask me anything about code, science, history, or creative writing.
            </p>
          </div>
        ) : (
          messages.map((message) => <Message key={message.id} message={message} />)
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-[#9c6bff]/10 backdrop-blur-md bg-[#121212]/40">
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
