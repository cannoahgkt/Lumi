import ChatInterface from "@/components/chat-interface"
import NavBar from "@/components/nav-bar"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20 text-foreground overflow-hidden transition-all duration-500">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse floating" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl floating"
             style={{ animationDelay: '2s' }} />
      </div>
      
      <NavBar />
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <ChatInterface />
      </div>
    </main>
  )
}
