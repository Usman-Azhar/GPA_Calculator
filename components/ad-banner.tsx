"use client"

import { useEffect, useRef } from "react"

interface AdBannerProps {
  slot: string
  format?: "auto" | "rectangle" | "vertical" | "horizontal"
  responsive?: boolean
  className?: string
}

export function AdBanner({ slot, format = "auto", responsive = true, className = "" }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initializeAd = () => {
      if (adRef.current && adRef.current.offsetWidth > 0) {
        try {
          // @ts-ignore
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (err) {
          console.error("AdSense error:", err)
        }
      } else {
        // Retry after a short delay if container isn't ready
        setTimeout(initializeAd, 100)
      }
    }

    // Wait for DOM to be fully rendered
    const timer = setTimeout(initializeAd, 200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      ref={adRef}
      className={`ad-container min-h-[250px] w-full flex items-center justify-center ${className}`}
      style={{ minWidth: "300px" }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          minHeight: "250px",
        }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}
