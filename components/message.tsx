import { cn } from "@/lib/utils"
import type { Message as MessageType } from "@/types"
import { Bot, User } from "lucide-react"

interface MessageProps {
  message: MessageType
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex gap-3 items-start", isUser && "justify-end")}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#9c6bff] to-[#00ffff]/70 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-[#121212]" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-xl p-3 shadow-sm",
          isUser
            ? "bg-[#9c6bff]/20 border border-[#9c6bff]/30 rounded-tr-none"
            : "bg-[#1a1a1a]/60 border border-white/5 rounded-tl-none",
        )}
      >
        <p className="text-[#e0e0e0]">{message.content}</p>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-[#e0e0e0]/10 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-[#e0e0e0]" />
        </div>
      )}
    </div>
  )
}
