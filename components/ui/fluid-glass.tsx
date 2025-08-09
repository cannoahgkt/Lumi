"use client"

import React, { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface FluidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'subtle' | 'enhanced' | 'vibrant'
  followMouse?: boolean
}

export function FluidGlass({ 
  children, 
  className, 
  variant = 'enhanced',
  followMouse = true,
  ...props 
}: FluidGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  useEffect(() => {
    if (!followMouse || !containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setMousePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
    }

    const element = containerRef.current
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', () => setMousePos({ x: 50, y: 50 }))
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', () => setMousePos({ x: 50, y: 50 }))
    }
  }, [followMouse])

  const getVariantStyles = () => {
    switch (variant) {
      case 'subtle':
        return "bg-white/[0.03] border-white/[0.08] backdrop-blur-xl"
      case 'vibrant':
        return "bg-white/[0.08] border-white/[0.15] backdrop-blur-2xl"
      default:
        return "bg-white/[0.05] border-white/[0.12] backdrop-blur-xl"
    }
  }

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden border rounded-2xl transition-all duration-300",
        "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)]",
        getVariantStyles(),
        className
      )}
      style={{
        background: followMouse ? 
          `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(156,107,255,0.1), transparent 40%)` : 
          undefined
      }}
      {...props}
    >
      {/* Top shine */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      {/* Subtle internal glow */}
      <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />
      
      {children}
    </div>
  )
}
