
import React from 'react';
import { Camera, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const ContentTypeSelect = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full sm:w-[40%] relative group">
      <Camera className={cn(
        "w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2",
        "transition-all duration-200",
        "group-hover:text-indigo-500"
      )} />
      <ChevronDown className={cn(
        "w-3.5 h-3.5 text-gray-300 absolute right-4 top-1/2 -translate-y-1/2",
        "transition-all duration-200",
        "group-hover:text-gray-400"
      )} />
      <select
        className={cn(
          "w-full h-10 sm:h-12 pl-11 pr-10 appearance-none",
          "bg-white text-sm text-gray-700",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500/30",
          "group-hover:bg-gray-50/80",
          "font-medium",
          "border-0"
        )}
      >
        <option value="">Select content type</option>
        <option value="professional-photography">Professional Photography</option>
        <option value="virtual-tours">Virtual Tours (360° POV)</option>
        <option value="drone-video">Drone Video Tours</option>
        <option value="property-highlight">Property Highlight Videos</option>
        <option value="social-media">Social Media Content Package</option>
      </select>
    </div>
  );
};
