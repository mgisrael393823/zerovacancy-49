
import React from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Image, BadgeCheck } from 'lucide-react';

interface Creator {
  name: string;
  services: string[];
  location: string;
}

interface CreatorInfoProps {
  creator: Creator;
}

export const CreatorInfo: React.FC<CreatorInfoProps> = ({ creator }) => {
  return (
    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white select-text">
      {/* Add a semi-transparent background to ensure text is visible without the gradient overlay */}
      <div className="absolute inset-0 -m-2 bg-black/40 backdrop-blur-[2px] rounded-lg z-0"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <h3 className="font-semibold text-lg sm:text-xl">{creator.name}</h3>
          {/* Verification badge - white circle and checkmark */}
          <BadgeCheck 
            className={cn(
              "w-5 h-5 sm:w-5 sm:h-5 text-white",
              "transition-all duration-300",
              "group-hover:animate-[pulse_1.5s_ease-in-out_infinite]",
              "bg-white/30 rounded-full p-0.5"
            )}
            aria-label="Verified Creator"
          />
        </div>
        
        {/* Location display */}
        <div className="flex items-center gap-1.5 mt-1.5 sm:mt-2">
          <MapPin 
            className="w-4 h-4 text-white/95 flex-shrink-0" 
            aria-hidden="true"
          />
          <span className="text-xs sm:text-sm text-white/95">{creator.location}</span>
        </div>
        
        {/* Services display */}
        <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
          <Image
            className="w-3.5 h-3.5 text-white/90 flex-shrink-0"
            aria-hidden="true"
          />
          <p className="text-xs sm:text-sm text-white/90">
            {creator.services.join(" • ")}
          </p>
        </div>
      </div>
    </div>
  );
};
