"use client"

import { Info, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function NavBar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 liquid-glass-nav px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white rounded-full opacity-90"></div>
            </div>
            <span className="font-space-grotesk text-2xl font-bold gradient-text">
              LUMI
            </span>
          </div>
          <div className="w-10 h-10" />
        </div>
      </nav>
    )
  }

  return (
    <nav className="sticky top-0 z-50 liquid-glass-nav px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300">
            <div className="w-4 h-4 bg-white rounded-full opacity-90"></div>
          </div>
          <span className="font-space-grotesk text-2xl font-bold gradient-text">
            LUMI
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="liquid-glass-button rounded-xl h-10 w-10 hover:scale-110 transition-all duration-300 border-0 group"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <div className="relative">
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-primary group-hover:text-yellow-400 transition-colors duration-200" />
              ) : (
                <Moon className="w-5 h-5 text-primary group-hover:text-blue-400 transition-colors duration-200" />
              )}
              <div className="absolute inset-0 w-5 h-5 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            asChild
            className="liquid-glass-button rounded-xl h-10 w-10 hover:scale-110 transition-all duration-300 border-0 group"
            title="About AI Models"
          >
            <a
              href="https://openrouter.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Info className="w-5 h-5 text-primary group-hover:text-cyan-400 transition-colors duration-200" />
              <div className="absolute inset-0 w-5 h-5 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </Button>
        </div>
      </div>
    </nav>
  )
}
