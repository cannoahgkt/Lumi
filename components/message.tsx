import { cn } from "@/lib/utils"
import type { Message as MessageType } from "@/types"
import { Bot, User } from "lucide-react"

interface MessageProps {
  message: MessageType
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex gap-4 items-start group", isUser && "justify-end")}>
      {!isUser && (
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-sm -z-10 group-hover:bg-primary/30 transition-colors"></div>
        </div>
      )}

      <div
        className={cn(
          "max-w-[75%] liquid-glass-card p-4 shadow-lg transition-all duration-300 group-hover:shadow-xl",
          isUser
            ? "rounded-tr-lg bg-primary/10 border-primary/20"
            : "rounded-tl-lg",
        )}
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-foreground leading-relaxed m-0 whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>

      {isUser && (
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-2xl liquid-glass flex items-center justify-center border border-border/50">
            <User className="w-5 h-5 text-foreground" />
          </div>
          <div className="absolute -inset-1 bg-foreground/5 rounded-2xl blur-sm -z-10 group-hover:bg-foreground/10 transition-colors"></div>
        </div>
      )}
    </div>
  )
}
