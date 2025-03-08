
"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  className?: string
  text: string
  repeat?: number
  duration?: number
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  strokeWidth?: string
  direction?: "left" | "right"
  speed?: "slow" | "normal" | "fast"
  pauseOnHover?: boolean
}

const fontSizeClasses = {
  sm: "text-5xl sm:text-6xl md:text-7xl",
  md: "text-6xl sm:text-7xl md:text-8xl",
  lg: "text-7xl sm:text-8xl md:text-9xl",
  xl: "text-8xl sm:text-9xl md:text-[10rem]",
  "2xl": "text-9xl sm:text-[10rem] md:text-[11rem]",
  "3xl": "text-[10rem] sm:text-[11rem] md:text-[12rem]",
}

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  ({
    className,
    text,
    repeat = 4,
    duration = 20,
    fontSize = "lg",
    strokeWidth = "1px",
    direction = "left",
    speed = "normal",
    pauseOnHover = true,
  }, ref) => {
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
        ref={ref}
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
)

Marquee.displayName = "Marquee"
