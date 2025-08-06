"use client"

import { useRef, useEffect } from "react"
import ChatInput from "./chat-input"
import Message from "./message"
import { ModelSelector } from "./model-selector"
import { TemplateSelector } from "./template-selector"
import { SettingsDialog } from "./settings-dialog"
import { useChat } from "@/hooks/use-chat"
import { getModelById } from "@/lib/providers"
import { Button } from "./ui/button"
import { Trash2 } from "lucide-react"

export default function ChatInterface() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading,
    selectedModel,
    selectedProvider,
    selectedTemplate,
    settings,
    handleModelChange,
    handleTemplateChange,
    clearChat,
    setSettings,
  } = useChat()

  const currentModel = getModelById(selectedModel)

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
              <h2 className="font-space-grotesk text-xl font-bold text-foreground">
                {currentModel?.name || "LUMI AI"}
              </h2>
              <p className="text-sm text-muted-foreground">
                AI Assistant • {selectedProvider === "user-key" ? "Your API" : "Serverless"}
              </p>
            </div>
          </div>
          
          <div className="liquid-glass rounded-xl px-4 py-2">
            <span className="text-xs font-medium text-primary">
              {selectedProvider.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-4 gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <ModelSelector
              selectedModel={selectedModel}
              selectedProvider={selectedProvider}
              onModelChange={handleModelChange}
            />
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onTemplateChange={handleTemplateChange}
            />
          </div>
          
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearChat}
                className="liquid-glass-button"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <SettingsDialog
              settings={settings}
              onSettingsChange={setSettings}
              onClearChat={clearChat}
            />
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

            <h3 className="text-2xl font-bold text-foreground mb-4 font-space-grotesk">
              Welcome to LUMI AI
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
              Chat with advanced AI models including Claude, GPT-4, Llama, and more. 
              Select a model above and start your conversation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              <div className="liquid-glass p-4 rounded-xl hover:scale-105 transition-transform cursor-pointer">
                <h4 className="font-semibold text-sm mb-2">💡 Ask anything</h4>
                <p className="text-xs text-muted-foreground">
                  General questions, creative writing, brainstorming
                </p>
              </div>
              <div className="liquid-glass p-4 rounded-xl hover:scale-105 transition-transform cursor-pointer">
                <h4 className="font-semibold text-sm mb-2">💻 Code help</h4>
                <p className="text-xs text-muted-foreground">
                  Debug, explain, review, and improve your code
                </p>
              </div>
              <div className="liquid-glass p-4 rounded-xl hover:scale-105 transition-transform cursor-pointer">
                <h4 className="font-semibold text-sm mb-2">📝 Writing tasks</h4>
                <p className="text-xs text-muted-foreground">
                  Emails, summaries, essays, and content creation
                </p>
              </div>
              <div className="liquid-glass p-4 rounded-xl hover:scale-105 transition-transform cursor-pointer">
                <h4 className="font-semibold text-sm mb-2">🎯 Use templates</h4>
                <p className="text-xs text-muted-foreground">
                  Pre-built prompts for common tasks and workflows
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] liquid-glass-message rounded-3xl px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {currentModel?.name || "AI"} is thinking...
                    </span>
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
        <ChatInput
          input={input}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
