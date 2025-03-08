"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { WaitlistCTA } from "./ui/waitlist-cta";
export function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2
  });
  const titles = useMemo(() => ["Converts", "Engages", "Drives Leads"], []);
  useEffect(() => {
    if (!isInView) return;
    const timeout = isMobile ? 2500 : 2000;
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, timeout);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles.length, isMobile, isInView]);
  return <div className="w-full relative">
      <AuroraBackground showRadialGradient={false} className="w-full py-[2px]">
        <motion.section ref={sectionRef} className={cn("flex items-center justify-center flex-col", "px-4 sm:px-6",
      // Reduced padding and margins
      "py-[24px] sm:py-[40px]", "my-[16px] sm:my-[24px]",
      // Reduced height on desktop
      "min-h-fit sm:min-h-[50vh]", "relative z-10",
      // Reduced gap between elements
      "gap-3 sm:gap-4", "touch-manipulation")} initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.3
      }}>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.3,
          delay: 0.1
        }}
        // Reduced max width and gap
        className="flex gap-4 sm:gap-5 flex-col max-w-6xl mx-auto w-full px-[3px]">
            <h1 className="tracking-tight leading-[1.1] text-center font-bold">
              <span className={cn("text-primary inline font-light",
            // Slightly reduced text size
            "text-3xl sm:text-4xl lg:text-5xl", "tracking-[-0.02em]", "bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-black", "block sm:inline-block mb-1 sm:mb-0")}>
                Property Content that
              </span>
              <span role="text" aria-label={`Property Content that ${titles[titleNumber]}`}
            // Reduced height of the animated text container
            className="relative flex w-full justify-center h-[1.4em] sm:h-[1.5em] md:h-[1.4em] lg:h-[1.2em] overflow-hidden mt-1 sm:mt-2">
                {titles.map((title, index) => <motion.span key={index} className={cn("absolute font-playfair tracking-[-0.02em] bg-clip-text text-transparent", "bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-700",
              // Reduced font size
              titleNumber === index && "text-4xl sm:text-5xl lg:text-6xl")} initial={{
                opacity: 0,
                y: isMobile ? 15 : 40,
                scale: 0.95
              }} animate={titleNumber === index ? {
                y: 0,
                opacity: 1,
                scale: 1
              } : {
                y: titleNumber > index ? isMobile ? -15 : -40 : isMobile ? 15 : 40,
                opacity: 0,
                scale: 0.95
              }} transition={{
                type: "spring",
                stiffness: isMobile ? 160 : 120,
                damping: isMobile ? 22 : 17,
                mass: isMobile ? 0.8 : 1
              }}>
                    {title}
                  </motion.span>)}
              </span>
            </h1>

            <div className={cn("text-sm sm:text-base lg:text-lg", "leading-[1.5]", "tracking-wide", "text-gray-700", "text-center", "max-w-[550px]", "mx-auto", "px-2 sm:px-4", "[word-spacing:0.12em] sm:[word-spacing:0.16em]", "relative z-10",
          // Reduced margin
          "mt-1 mb-0")}>
              Connect with expert content creators for your next project. Our AI-powered platform matches you with the perfect professional for your needs and budget.
            </div>
          </motion.div>
          
          <motion.div className={cn("w-full",
        // Reduced top margin
        "mt-5 sm:mt-6", "px-3 sm:px-4")} initial={{
          opacity: 0,
          y: 20
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.3,
          delay: 0.2
        }}>
            {/* Reduced bottom margin */}
            <WaitlistCTA className="mb-4" />
          </motion.div>
        </motion.section>
      </AuroraBackground>
    </div>;
}
export default Hero;