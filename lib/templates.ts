import type { PromptTemplate } from "@/types"

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: "default",
    name: "Chat",
    description: "Regular conversation",
    template: "{message}",
    category: "general",
  },
  {
    id: "explain-code",
    name: "Explain Code",
    description: "Explain how code works",
    template: "Please explain this code in detail, including what it does, how it works, and any important concepts:\n\n{message}",
    category: "development",
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "Review code for improvements",
    template: "Please review this code and suggest improvements for readability, performance, security, and best practices:\n\n{message}",
    category: "development",
  },
  {
    id: "debug-help",
    name: "Debug Help",
    description: "Help debug code issues",
    template: "I'm having an issue with this code. Please help me debug it and suggest fixes:\n\n{message}",
    category: "development",
  },
  {
    id: "summarize",
    name: "Summarize",
    description: "Create a concise summary",
    template: "Please provide a clear and concise summary of the following:\n\n{message}",
    category: "productivity",
  },
  {
    id: "explain-concept",
    name: "Explain Concept",
    description: "Explain complex topics simply",
    template: "Please explain this concept in simple terms, as if explaining to someone who's new to the topic:\n\n{message}",
    category: "learning",
  },
  {
    id: "write-email",
    name: "Write Email",
    description: "Draft professional emails",
    template: "Please help me write a professional email with the following details:\n\n{message}",
    category: "productivity",
  },
  {
    id: "translate",
    name: "Translate",
    description: "Translate text to another language",
    template: "Please translate the following text. If no target language is specified, ask which language to translate to:\n\n{message}",
    category: "utility",
  },
  {
    id: "brainstorm",
    name: "Brainstorm",
    description: "Generate creative ideas",
    template: "Let's brainstorm creative ideas about:\n\n{message}\n\nPlease provide multiple diverse suggestions with brief explanations.",
    category: "creativity",
  },
  {
    id: "improve-writing",
    name: "Improve Writing",
    description: "Enhance writing quality",
    template: "Please improve this text for clarity, flow, and engagement while maintaining the original meaning:\n\n{message}",
    category: "productivity",
  },
]

export function getTemplateById(templateId: string): PromptTemplate | undefined {
  return PROMPT_TEMPLATES.find(t => t.id === templateId)
}

export function applyTemplate(template: PromptTemplate, message: string): string {
  return template.template.replace("{message}", message)
}

export const TEMPLATE_CATEGORIES = [
  "general",
  "development", 
  "productivity",
  "learning",
  "creativity",
  "utility",
] as const
