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
    <div className="w-full max-w-5xl h-[85vh] flex flex-col liquid-glass-card shadow-2xl overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Chat header */}
      <div className="relative p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-primary animate-pulse pulse-glow"></div>
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/30 animate-ping"></div>
            </div>
            <div>
              <h2 className="font-space-grotesk text-xl font-bold text-foreground">LLAMA 3</h2>
              <p className="text-sm text-muted-foreground">AI Assistant • Online</p>
            </div>
          </div>
          
          <div className="liquid-glass rounded-xl px-4 py-2">
            <span className="text-xs font-medium text-primary">POWERED BY OLLAMA</span>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-modern">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="relative mb-8">
              <div className="w-20 h-20 rounded-3xl liquid-glass flex items-center justify-center floating">
                <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center">
                  <div className="w-6 h-6 rounded-lg bg-white/90"></div>
                </div>
              </div>
              <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl -z-10"></div>
            </div>
            
            <h3 className="text-2xl font-bold mb-3 font-space-grotesk gradient-text">
              LUMI AI ASSISTANT
            </h3>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Powered by Llama 3 open-source model. Ask me anything about code, science, history, 
              or creative writing. I'm here to help you explore and learn.
            </p>
            
            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mt-8 justify-center">
              {["Code Analysis", "Creative Writing", "Problem Solving", "Research"].map((feature) => (
                <div key={feature} className="liquid-glass rounded-full px-4 py-2">
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => <Message key={message.id} message={message} />)}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-4 items-start">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                    <div className="w-5 h-5 text-white">
                      <div className="flex space-x-1 justify-center items-center">
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-sm -z-10"></div>
                </div>
                
                <div className="max-w-[75%] liquid-glass-card p-4 shadow-lg rounded-tl-lg">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-sm">LUMI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="relative p-6 border-t border-border/50">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
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
