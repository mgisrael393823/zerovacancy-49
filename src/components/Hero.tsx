
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
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
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
  
  return (
    <div className="w-full relative">
      <AuroraBackground className="w-full py-0" showRadialGradient={false}>
        <motion.section 
          ref={sectionRef}
          className={cn(
            "flex items-center justify-center flex-col", 
            "px-4 sm:px-6", 
            "py-[24px] sm:py-[40px]", // Reduced padding
            "my-[16px] sm:my-[32px]", // Reduced margin
            "min-h-fit sm:min-h-[60vh]", // Reduced min-height
            "relative z-10", 
            "gap-3 sm:gap-4", // Reduced gap
            "touch-manipulation"
          )} 
          initial={{
            opacity: 0,
            y: 20
          }} 
          animate={isInView ? {
            opacity: 1,
            y: 0
          } : {}}
          transition={{
            duration: 0.3
          }}
        >
          <motion.div 
            initial={{
              opacity: 0,
              y: 20
            }} 
            animate={isInView ? {
              opacity: 1,
              y: 0
            } : {}}
            transition={{
              duration: 0.3,
              delay: 0.1
            }} 
            className="flex gap-4 sm:gap-5 flex-col max-w-10xl mx-auto w-full px-[3px]" // Reduced gap
          >
            <h1 className="tracking-tight leading-[1.1] text-center font-bold">
              <span 
                className={cn(
                  "text-primary inline font-light", 
                  "text-4xl sm:text-5xl lg:text-6xl", 
                  "tracking-[-0.02em]", 
                  "bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-black", 
                  "block sm:inline-block mb-1 sm:mb-0" // Reduced margin
                )}
              >
                Property Content that
              </span>
              <span 
                role="text" 
                aria-label={`Property Content that ${titles[titleNumber]}`} 
                className="relative flex w-full justify-center h-[1.5em] sm:h-[1.6em] md:h-[1.5em] lg:h-[1.3em] overflow-hidden mt-1 sm:mt-2" // Reduced height and margin
              >
                {titles.map((title, index) => (
                  <motion.span 
                    key={index} 
                    className={cn(
                      "absolute font-playfair tracking-[-0.02em] bg-clip-text text-transparent", 
                      "bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-700", 
                      titleNumber === index && "text-5xl sm:text-6xl lg:text-7xl"
                    )} 
                    initial={{
                      opacity: 0,
                      y: isMobile ? 15 : 40,
                      scale: 0.95
                    }} 
                    animate={titleNumber === index ? {
                      y: 0,
                      opacity: 1,
                      scale: 1
                    } : {
                      y: titleNumber > index ? isMobile ? -15 : -40 : isMobile ? 15 : 40,
                      opacity: 0,
                      scale: 0.95
                    }} 
                    transition={{
                      type: "spring",
                      stiffness: isMobile ? 160 : 120,
                      damping: isMobile ? 22 : 17,
                      mass: isMobile ? 0.8 : 1
                    }}
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <div 
              className={cn(
                "text-sm sm:text-lg lg:text-xl", 
                "leading-[1.5]", // Tighter leading
                "tracking-wide", 
                "text-gray-700", 
                "text-center", 
                "max-w-[650px]", 
                "mx-auto", 
                "px-4 sm:px-6", 
                "[word-spacing:0.12em] sm:[word-spacing:0.16em]", 
                "relative z-10", 
                "mt-1 mb-0" // Reduced margin
              )}
            >
              Connect with expert content creators for your next project. Our AI-powered platform matches you with the perfect professional for your needs and budget.
            </div>
          </motion.div>
          
          <motion.div 
            className={cn(
              "w-full", 
              "mt-4 sm:mt-6", // Reduced margin
              "px-4 sm:px-6"
            )} 
            initial={{
              opacity: 0,
              y: 20
            }} 
            animate={isInView ? {
              opacity: 1,
              y: 0
            } : {}}
            transition={{
              duration: 0.3,
              delay: 0.3
            }}
          >
            <WaitlistCTA className="mb-4" /> {/* Reduced margin */}
            
            {/* Move queue info closer to input for better visual connection */}
            <div className="text-center text-sm text-gray-500">
              <span className="flex items-center justify-center gap-1">
                <span className="inline-flex">
                  <span className="h-2 w-2 rounded-full bg-purple-500 opacity-75"></span>
                  <span className="h-2 w-2 rounded-full bg-blue-500 -ml-1 opacity-75"></span>
                  <span className="h-2 w-2 rounded-full bg-cyan-500 -ml-1 opacity-75"></span>
                </span>
                <span>2,165+ people joined • Queue: 2-3 weeks</span>
              </span>
            </div>
          </motion.div>
        </motion.section>
      </AuroraBackground>
    </div>
  );
}

export default Hero;
