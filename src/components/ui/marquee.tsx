
"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  className?: string
  text: string
  direction?: "left" | "right"
  speed?: "slow" | "normal" | "fast"
  pauseOnHover?: boolean
}

export function Marquee({
  className,
  text,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
}: MarqueeProps) {
  const speedClasses = {
    slow: "animate-[marquee_60s_linear_infinite]",
    normal: "animate-[marquee_40s_linear_infinite]",
    fast: "animate-[marquee_20s_linear_infinite]",
  }

  const directionClasses = {
    left: "",
    right: "flex-row-reverse",
  }

  const content = Array(10).fill(text).join(" • ")

  return (
    <div
      className={cn(
        "relative flex overflow-hidden border-y border-gray-200 bg-white",
        className
      )}
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-center gap-4 py-3",
          speedClasses[speed],
          directionClasses[direction],
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        <span className="text-lg font-medium uppercase tracking-widest">
          {content}
        </span>
      </div>
    </div>
  )
}
