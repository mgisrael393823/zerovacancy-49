
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import AuroraBackground from "@/components/ui/aurora-background";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const isMobile = useIsMobile();
  const titles = useMemo(() => ["optimizes", "automates", "maximizes", "transforms", "scales"], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles.length]);

  return (
    <div className="w-full relative">
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-50/90 via-white to-blue-50/90"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-purple-200/20 to-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />

      <AuroraBackground className="w-full">
        <div className="flex gap-3 sm:gap-6 lg:gap-8 items-center justify-center flex-col px-4 sm:px-6 py-4 sm:py-8 lg:py-12 min-h-[calc(100vh-4.5rem)] sm:min-h-0 relative z-10">
          <div className="flex gap-2 sm:gap-4 flex-col max-w-5xl mx-auto w-full">
            <h1 className="text-[2.25rem] sm:text-6xl md:text-7xl tracking-tight leading-[1.1] sm:leading-[1.1] text-center py-1 sm:py-4 my-1 sm:my-4 font-bold lg:text-8xl">
              <span className="text-primary inline whitespace-normal sm:whitespace-nowrap tracking-tight font-light bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-black">
                Find the perfect content creator
              </span>
              <span className="relative flex w-full justify-center h-[1.6em] sm:h-[1.8em] md:h-[1.6em] lg:h-[1.4em] overflow-hidden mt-0.5 sm:mt-2">
                {titles.map((title, index) => (
                  <motion.span 
                    key={index}
                    className={cn(
                      "absolute font-playfair tracking-tight bg-clip-text text-transparent",
                      "bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-700",
                      titleNumber === index && "text-[2.5rem] sm:text-7xl md:text-8xl lg:text-9xl"
                    )}
                    initial={{
                      opacity: 0,
                      y: isMobile ? 20 : 40,
                      scale: 0.95
                    }}
                    animate={titleNumber === index ? {
                      y: 0,
                      opacity: 1,
                      scale: 1
                    } : {
                      y: titleNumber > index ? (isMobile ? -20 : -40) : (isMobile ? 20 : 40),
                      opacity: 0,
                      scale: 0.95
                    }}
                    transition={{
                      type: "spring",
                      stiffness: isMobile ? 140 : 120,
                      damping: isMobile ? 20 : 17
                    }}
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl leading-relaxed tracking-wide text-gray-700 max-w-2xl text-center mx-auto px-2 sm:px-4 [word-spacing:0.12em] sm:[word-spacing:0.16em] relative z-10">
              Connect with expert content creators for your next project. Our AI-powered platform matches you with the perfect professional for your needs and budget.
            </p>
          </div>
          
          <div className="flex justify-center w-full px-4 sm:px-6 max-w-lg mx-auto mt-4 sm:mt-8">
            <ShimmerButton 
              onClick={() => {}}
            >
              <span>Get Early Access</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
            </ShimmerButton>
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
}

export default Hero;
