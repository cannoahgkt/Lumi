"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Zap, Brain, Key } from "lucide-react"
import { AI_PROVIDERS, getModelById } from "@/lib/providers"
import type { AIModel } from "@/types"

interface ModelSelectorProps {
  selectedModel: string
  selectedProvider: string
  onModelChange: (model: string, provider: string) => void
}

export function ModelSelector({ selectedModel, selectedProvider, onModelChange }: ModelSelectorProps) {
  const currentModel = getModelById(selectedModel)

  const getProviderIcon = (providerId: string) => {
    switch (providerId) {
      case "groq":
        return <Zap className="h-3 w-3" />
      case "openrouter":
        return <Brain className="h-3 w-3" />
      case "user-key":
        return <Key className="h-3 w-3" />
      default:
        return null
    }
  }

  const getProviderBadgeColor = (providerId: string) => {
    switch (providerId) {
      case "groq":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "openrouter":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "user-key":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="liquid-glass-button gap-2 max-w-xs"
        >
          {getProviderIcon(selectedProvider)}
          <span className="truncate">
            {currentModel?.name || selectedModel}
          </span>
          <ChevronDown className="h-3 w-3 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-80 liquid-glass-card"
      >
        {AI_PROVIDERS.map((provider) => (
          <div key={provider.id}>
            <DropdownMenuLabel className="flex items-center gap-2 py-3">
              {getProviderIcon(provider.id)}
              <span>{provider.name}</span>
              <Badge 
                variant="outline" 
                className={`text-xs ${getProviderBadgeColor(provider.id)}`}
              >
                {provider.apiKeyRequired ? "Your Key" : "Free"}
              </Badge>
            </DropdownMenuLabel>
            
            {provider.models.map((model) => (
              <DropdownMenuItem
                key={model.id}
                onClick={() => onModelChange(model.id, provider.id)}
                className={`flex flex-col items-start gap-1 py-3 px-3 ${
                  selectedModel === model.id ? "bg-accent" : ""
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">{model.name}</span>
                  {model.contextLength && (
                    <Badge variant="secondary" className="text-xs">
                      {model.contextLength.toLocaleString()} tokens
                    </Badge>
                  )}
                </div>
                {model.description && (
                  <span className="text-xs text-muted-foreground">
                    {model.description}
                  </span>
                )}
              </DropdownMenuItem>
            ))}
            
            <DropdownMenuSeparator />
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
