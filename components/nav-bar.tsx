"use client"

import { Info } from "lucide-react"

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-10 backdrop-blur-md bg-[#0a0a0a]/60 border-b border-[#9c6bff]/10 px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#9c6bff] to-[#00ffff]/70 flex items-center justify-center">
            <div className="w-3 h-3 bg-[#0a0a0a] rounded-full"></div>
          </div>
          <span className="font-['Space_Grotesk'] text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9c6bff] to-[#00ffff]/70">
            LUMI
          </span>
        </div>

        <a
          href="https://ollama.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-white/5 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(156,107,255,0.3)]"
          title="About Ollama"
        >
          <Info className="w-5 h-5 text-[#9c6bff]" />
        </a>
      </div>
    </nav>
  )
}
