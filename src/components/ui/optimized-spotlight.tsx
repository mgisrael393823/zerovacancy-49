
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type OptimizedSpotlightProps = {
  className?: string;
  size?: number;
};

export const OptimizedSpotlight = ({
  className = '',
  size = 500
}: OptimizedSpotlightProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        setOpacity(0.6);
      }
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    const element = divRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [isMounted]);

  return (
    <div 
      ref={divRef}
      className={cn(
        "absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -inset-px opacity-0 transition duration-300",
          "bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50",
          className
        )}
        style={{
          opacity,
          left: position.x - size / 2,
          top: position.y - size / 2,
          width: size,
          height: size,
          borderRadius: '50%',
          filter: 'blur(80px)',
          transform: 'translate(0, 0)',
          zIndex: 0
        }}
      />
    </div>
  );
};
