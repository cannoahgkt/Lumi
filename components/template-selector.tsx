"use client"

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
import { ChevronDown, MessageSquare, Code, Mail, Lightbulb, BookOpen, Wrench } from "lucide-react"
import { PROMPT_TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/templates"

interface TemplateSelectorProps {
  selectedTemplate: string
  onTemplateChange: (templateId: string) => void
}

export function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  const currentTemplate = PROMPT_TEMPLATES.find(t => t.id === selectedTemplate)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "general":
        return <MessageSquare className="h-3 w-3" />
      case "development":
        return <Code className="h-3 w-3" />
      case "productivity":
        return <Mail className="h-3 w-3" />
      case "creativity":
        return <Lightbulb className="h-3 w-3" />
      case "learning":
        return <BookOpen className="h-3 w-3" />
      case "utility":
        return <Wrench className="h-3 w-3" />
      default:
        return <MessageSquare className="h-3 w-3" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "general":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      case "development":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "productivity":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "creativity":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "learning":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "utility":
        return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const templatesByCategory = TEMPLATE_CATEGORIES.reduce((acc, category) => {
    acc[category] = PROMPT_TEMPLATES.filter(t => t.category === category)
    return acc
  }, {} as Record<string, typeof PROMPT_TEMPLATES>)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="liquid-glass-button gap-2 max-w-xs"
        >
          {getCategoryIcon(currentTemplate?.category || "general")}
          <span className="truncate">
            {currentTemplate?.name || "Chat"}
          </span>
          <ChevronDown className="h-3 w-3 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-80 max-h-96 overflow-y-auto liquid-glass-card"
      >
        {TEMPLATE_CATEGORIES.map((category) => {
          const templates = templatesByCategory[category]
          if (!templates?.length) return null

          return (
            <div key={category}>
              <DropdownMenuLabel className="flex items-center gap-2 py-3 capitalize sticky top-0 bg-background/95 backdrop-blur-sm z-10 border-b border-border/50">
                {getCategoryIcon(category)}
                <span>{category}</span>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getCategoryColor(category)}`}
                >
                  {templates.length}
                </Badge>
              </DropdownMenuLabel>
              
              {templates.map((template) => (
                <DropdownMenuItem
                  key={template.id}
                  onClick={() => onTemplateChange(template.id)}
                  className={`flex flex-col items-start gap-1 py-3 px-3 cursor-pointer hover:bg-white/5 transition-colors ${
                    selectedTemplate === template.id ? "bg-primary/20" : ""
                  }`}
                >
                  <span className="font-medium">{template.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {template.description}
                  </span>
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator />
            </div>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
