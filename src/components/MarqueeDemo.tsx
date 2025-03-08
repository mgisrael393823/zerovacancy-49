
"use client"

import { Marquee } from "@/components/ui/marquee"

export function MarqueeDemo() {
  return (
    <div className="w-full">
      <Marquee 
        text="Visionaries > Vendors" 
        speed="normal" 
        className="py-2 text-gray-900 border-gray-100/60 bg-white/95"
      />
    </div>
  )
}
