
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { ArrowRight } from 'lucide-react';
import { Dialog } from "../ui/dialog";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { CreatorRating } from './CreatorRating';
import { GlowDialog } from '../ui/glow-dialog';
import { ShimmerButton } from '../ui/shimmer-button';
import { BorderBeam } from '../ui/border-beam';
import { CreatorInfo } from './CreatorInfo';
import { CreatorMedia } from './CreatorMedia';
import { CreatorTags, getDefaultTags } from './CreatorTags';
import type { CreatorCardProps } from './types';

export const CreatorCard: React.FC<CreatorCardProps> = ({ 
  creator, 
  onImageLoad, 
  loadedImages, 
  imageRef 
}) => {
  const isMobile = useIsMobile();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const tags = creator.tags || getDefaultTags(creator.name, creator.services);
  
  return (
    <article className="group select-text">
      <Card className={cn(
        "overflow-hidden h-full",
        "will-change-transform transition-all duration-300",
        "hover:translate-y-[-2px] hover:scale-[1.01]",
        "bg-white border border-gray-200/80",
        "shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
        "hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)]",
        "rounded-xl relative"
      )}>
        {/* Animated border around the entire card */}
        <BorderBeam 
          colorFrom="#9c40ff" 
          colorTo="#3182CE" 
          duration={20} 
          borderWidth={1.2} 
          size={500}
          className="rounded-xl"
        />
        
        <div className="relative">
          {/* Price tag */}
          <div className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 z-10">
            <span className={cn(
              "px-2.5 sm:px-3 py-1.5",
              "text-xs sm:text-sm font-medium",
              "bg-white shadow-sm border border-white/40",
              "text-gray-900 rounded-full",
              "transition-all duration-200",
              "group-hover:scale-105"
            )}>
              From ${creator.price}
            </span>
          </div>

          <CreatorMedia 
            creator={creator}
            onImageLoad={onImageLoad}
            onVideoLoad={() => onImageLoad?.(creator.image)}
          />
          
          <CreatorInfo creator={creator} />
          
          <div className="p-3.5 sm:p-4.5 flex flex-col h-[180px]">
            <div className="flex flex-col h-full">
              {/* Tags section */}
              <div className="mb-3.5">
                <CreatorTags tags={tags} />
              </div>
              
              {/* Rating section with separator */}
              <div className="mb-auto border-b border-gray-100 pb-3">
                <CreatorRating rating={creator.rating} reviews={creator.reviews} name={creator.name} />
              </div>
              
              {/* CTA button section */}
              <div className="flex justify-center mt-4">
                <ShimmerButton 
                  onClick={() => setShowEmailDialog(true)}
                  aria-label={`Join waitlist to work with ${creator.name}`}
                  className="w-[80%] h-10 sm:h-11 text-xs sm:text-sm px-3 sm:px-4 hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
                >
                  <span>Join Waitlist</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
                </ShimmerButton>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <GlowDialog open={showEmailDialog} onOpenChange={setShowEmailDialog} />
    </article>
  );
};
