"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export function WaitlistCTA({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      inputRef.current?.focus();
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmail("");
      toast.success("Thanks for joining our waitlist!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(
      "w-full max-w-xl mx-auto px-5 sm:px-0",
      className
    )}>
      <form onSubmit={handleSubmit} className={cn(
        "flex w-full",
        isMobile ? "flex-col space-y-4" : "flex-row items-center justify-center gap-2"
      )}>
        <div className={cn(
          "relative",
          isMobile ? "w-full" : "w-[300px]"
        )}>
          <Input
            ref={inputRef}
            type="email"
            placeholder="Enter your email"
            className={cn(
              "border",
              isMobile ? [
                "h-[56px]", 
                "bg-white", 
                "border-gray-100",
                "px-4 py-4",
                "text-base",
                "placeholder:text-gray-400",
                "rounded-lg",
                "w-full",
                "shadow-none"
              ] : [
                "h-12 border-gray-200 bg-[#F5F5F8]",
                "focus:ring-2 focus:ring-primary/50 focus:border-transparent",
                "px-4 py-3",
                "text-base placeholder:text-gray-400",
                "rounded-lg"
              ]
            )}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
            required
            disabled={isLoading}
          />
        </div>
        
        <Button 
          type="submit" 
          className={cn(
            "flex items-center justify-center",
            "whitespace-nowrap",
            isMobile ? [
              "w-full", 
              "rounded-lg", 
              "h-[56px]",
              "bg-gradient-to-r from-purple-600 to-cyan-500",
              "text-white",
              "font-medium",
              "px-6"
            ] : [
              "h-12",
              "rounded-lg w-[180px] px-5",
              "bg-[#7339E5] hover:bg-[#6432cc]", 
              "text-white font-medium shadow-sm"
            ]
          )}
          style={{ gap: '6px' }}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <span className={cn(
                "flex-shrink-0",
                "leading-none",
                isMobile ? "text-base" : "text-sm"
              )}>
                Get Early Access
              </span>
              <ArrowRight className="h-4 w-4 flex-shrink-0 inline-block" />
            </>
          )}
        </Button>
      </form>
      
      <div className="flex items-center justify-center mt-4">
        <div className="flex -space-x-1.5 mr-2 items-center">
          <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center text-[6px] text-white font-bold border border-[#7339E5]">JT</div>
          <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center text-[6px] text-white font-bold border border-[#7339E5]">MI</div>
          {!isMobile && (
            <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center text-[6px] text-white font-bold border border-[#7339E5]">AS</div>
          )}
        </div>
        
        <div className="text-xs text-gray-500 flex items-center whitespace-nowrap">
          <span>2,165+ people joined</span>
          <span className="mx-1.5">•</span>
          <span>Queue: {isMobile ? "1-2 days" : "2-3 weeks"}</span>
        </div>
      </div>
    </div>
  );
}
