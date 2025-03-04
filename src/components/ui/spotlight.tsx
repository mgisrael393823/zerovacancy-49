
'use client';
import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
};

export function Spotlight({
  className,
  size = 200,
  springOptions = { bounce: 0 },
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Only create springs if needed
  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  // Memoize transforms to prevent unnecessary calculations
  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        setParentElement(parent);
        
        // Use IntersectionObserver for visibility detection
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              setIsVisible(entry.isIntersecting);
            });
          },
          { threshold: 0.1, rootMargin: '100px' }
        );
        
        observer.observe(parent);
        return () => observer.disconnect();
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement || !isVisible || isReducedMotion) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement, isVisible, isReducedMotion]
  );

  useEffect(() => {
    if (!parentElement || !isVisible || isReducedMotion) return;

    // Throttle event listeners to improve performance
    let throttleTimeout: number | null = null;
    
    const throttledMouseMove = (event: MouseEvent) => {
      if (throttleTimeout) return;
      
      throttleTimeout = window.setTimeout(() => {
        handleMouseMove(event);
        throttleTimeout = null;
      }, 16); // ~60fps
    };

    // Only add listeners if the element is visible and motion is not reduced
    parentElement.addEventListener('mousemove', throttledMouseMove);
    parentElement.addEventListener('mouseenter', () => setIsHovered(true));
    parentElement.addEventListener('mouseleave', () => setIsHovered(false));

    return () => {
      if (throttleTimeout) clearTimeout(throttleTimeout);
      parentElement.removeEventListener('mousemove', throttledMouseMove);
      parentElement.removeEventListener('mouseenter', () => setIsHovered(true));
      parentElement.removeEventListener('mouseleave', () => setIsHovered(false));
    };
  }, [parentElement, handleMouseMove, isVisible, isReducedMotion]);

  // Don't render anything if not visible in viewport or if reduced motion is preferred
  if (!isVisible || isReducedMotion) return null;

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl transition-opacity duration-200 will-change-transform',
        'from-zinc-50 via-zinc-100 to-zinc-200',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
      }}
    />
  );
}
