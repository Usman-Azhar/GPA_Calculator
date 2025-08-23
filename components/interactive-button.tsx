"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface InteractiveButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  disabled?: boolean
  loading?: boolean
}

export function InteractiveButton({
  children,
  onClick,
  variant = "default",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
}: InteractiveButtonProps) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    if (disabled || loading) return

    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 200)

    if (onClick) onClick()
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        btn-magnetic hover-glow focus-ring gpu-accelerated
        ${isClicked ? "animate-bounce-subtle" : ""}
        ${loading ? "animate-shimmer" : ""}
        ${className}
      `}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span className="loading-dots">Loading</span>
        </div>
      ) : (
        children
      )}
    </Button>
  )
}
