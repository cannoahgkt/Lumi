import ChatInterface from "@/components/chat-interface"
import NavBar from "@/components/nav-bar"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0a0a0a] to-[#121212] text-[#e0e0e0] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] z-0"></div>
      <NavBar />
      <div className="flex-1 flex items-center justify-center p-4 relative z-0">
        <ChatInterface />
      </div>
    </main>
  )
}
