
"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = useMemo(() => createNoise3D(), []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  
  // Memoize wave colors to prevent unnecessary re-renders
  const waveColors = useMemo(() => colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ], [colors]);

  const getSpeed = useCallback(() => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  }, [speed]);

  const drawWave = useCallback((ctx: CanvasRenderingContext2D, n: number, w: number, h: number, nt: number) => {
    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (let x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5);
      }
      ctx.stroke();
      ctx.closePath();
    }
  }, [noise, waveColors, waveWidth]);

  useEffect(() => {
    // Only run browser detection once
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;
    
    let canvas = canvasRef.current;
    let ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    let w = ctx.canvas.width = window.innerWidth;
    let h = ctx.canvas.height = window.innerHeight;
    let nt = 0;
    
    ctx.filter = `blur(${blur}px)`;
    
    const handleResize = () => {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Use RequestAnimationFrame for smooth animation
    let animationId: number;
    
    const render = () => {
      if (!ctx) return;
      
      ctx.fillStyle = backgroundFill || "black";
      ctx.globalAlpha = waveOpacity || 0.5;
      ctx.fillRect(0, 0, w, h);
      
      drawWave(ctx, 5, w, h, nt);
      
      nt += getSpeed();
      animationId = requestAnimationFrame(render);
    };
    
    render();
    
    // Use IntersectionObserver to detect visibility
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          cancelAnimationFrame(animationId);
        }
      },
      { threshold: 0.1 }
    );
    
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [isVisible, blur, backgroundFill, waveOpacity, getSpeed, drawWave]);

  return (
    <div
      className={cn(
        "h-full flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
