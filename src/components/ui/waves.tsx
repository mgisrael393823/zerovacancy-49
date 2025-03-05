
'use client';

import React, { useRef, useEffect, useState, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';

type WavesProps = {
  className?: string;
  lineColor?: string;
  backgroundColor?: string;
  xGap?: number;
  yGap?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  waveSpeedX?: number;
  waveSpeedY?: number;
};

// Use memo to prevent unnecessary re-renders
export const Waves = memo(({
  className,
  lineColor = 'rgba(0, 0, 0, 0.1)',
  backgroundColor = '#ffffff',
  xGap = 20,
  yGap = 30,
  waveAmpX = 20,
  waveAmpY = 15,
  waveSpeedX = 0.012,
  waveSpeedY = 0.01,
}: WavesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Memoize the drawing function to prevent recreating it on each render
  const drawWave = useCallback((
    ctx: CanvasRenderingContext2D, 
    w: number, 
    h: number, 
    time: number
  ) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, w, h);
    
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;
    
    // Draw horizontal waves with optimized loop
    for (let y = yGap; y < h; y += yGap) {
      ctx.beginPath();
      
      // Optimize by skipping pixels based on width
      const step = Math.max(1, Math.floor(w / 300));
      
      for (let x = 0; x < w; x += step) {
        const angle = (x * waveSpeedX) + time;
        const yOffset = Math.sin(angle) * waveAmpY;
        
        if (x === 0) {
          ctx.moveTo(x, y + yOffset);
        } else {
          ctx.lineTo(x, y + yOffset);
        }
      }
      ctx.stroke();
    }
    
    // Draw vertical waves with optimized loop
    for (let x = xGap; x < w; x += xGap) {
      ctx.beginPath();
      
      // Optimize by skipping pixels based on height
      const step = Math.max(1, Math.floor(h / 200));
      
      for (let y = 0; y < h; y += step) {
        const angle = (y * waveSpeedY) + time;
        const xOffset = Math.sin(angle) * waveAmpX;
        
        if (y === 0) {
          ctx.moveTo(x + xOffset, y);
        } else {
          ctx.lineTo(x + xOffset, y);
        }
      }
      ctx.stroke();
    }
  }, [backgroundColor, lineColor, xGap, yGap, waveAmpX, waveAmpY, waveSpeedX, waveSpeedY]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Use IntersectionObserver for visibility detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    // If reduced motion is preferred, don't animate
    if (isReducedMotion) {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = canvas.parentElement?.offsetWidth || 300;
          canvas.height = canvas.parentElement?.offsetHeight || 150;
          
          // Draw static waves
          drawWave(ctx, canvas.width, canvas.height, 0);
        }
      }
      return;
    }
    
    if (!canvasRef.current || !isVisible) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let time = 0;
    
    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    
    resizeCanvas();
    
    // Throttle resize events for better performance
    let resizeTimeout: number;
    const throttledResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 100);
    };
    
    window.addEventListener('resize', throttledResize);
    
    const render = () => {
      drawWave(ctx, canvas.width, canvas.height, time);
      time += 0.01;
      
      if (isVisible && !isReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', throttledResize);
      cancelAnimationFrame(animationFrameId);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [isVisible, drawWave, isReducedMotion]);
  
  return (
    <div ref={containerRef} className={cn('absolute inset-0 overflow-hidden', className)}>
      {(isVisible || isReducedMotion) && (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />
      )}
    </div>
  );
});

Waves.displayName = "Waves";
