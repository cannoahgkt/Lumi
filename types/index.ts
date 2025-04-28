export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  file?: {
    name: string
    type: string
    url?: string
  }
}
