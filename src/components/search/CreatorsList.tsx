import React, { useCallback, useEffect, useState } from 'react';
import { CreatorCard } from '../creator/CreatorCard';
import { SortMenu } from '../sorting/SortMenu';
import { useIsMobile } from '@/hooks/use-mobile';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Creator {
  name: string;
  services: string[];
  price: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  workExamples: string[];
}

interface CreatorsListProps {
  creators: Creator[];
  sortBy: string;
  onSort: (value: string) => void;
  onImageLoad: (imageSrc: string) => void;
  loadedImages: Set<string>;
  imageRef: (node: HTMLImageElement | null) => void;
}

export const CreatorsList: React.FC<CreatorsListProps> = ({
  creators,
  sortBy,
  onSort,
  onImageLoad,
  loadedImages,
  imageRef,
}) => {
  const isMobile = useIsMobile();
  const [loadedImageUrls, setLoadedImageUrls] = useState<Set<string>>(new Set());
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: false,
    dragFree: false,
    skipSnaps: true,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = React.useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    // Force a reInit after mount
    const timer = setTimeout(() => {
      emblaApi.reInit();
    }, 100);
    
    return () => {
      clearTimeout(timer);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);
  
  const handleImageLoad = (imageSrc: string) => {
    setLoadedImageUrls(prev => {
      const updated = new Set(prev);
      updated.add(imageSrc);
      return updated;
    });
    if (onImageLoad) {
      onImageLoad(imageSrc);
    }
  };
  
  const sortOptions = [
    { label: 'Rating', value: 'rating' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Distance', value: 'distance' }
  ];

  return (
    <div className="w-full space-y-2 sm:space-y-6">
      {/* Sort menu div - completely removed for now */}
      {false && (
        <div className={cn(
          "w-full",
          isMobile ? "flex justify-start pl-4" : "flex justify-end"
        )}>
          <SortMenu 
            options={sortOptions}
            onSort={onSort}
            defaultValue={sortBy}
          />
        </div>
      )}

      {isMobile ? (
        <div className="w-full relative">
          <div className="w-full overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {creators.map((creator, index) => (
                <div 
                  key={creator.name} 
                  className="min-w-[90%] w-[90%] pl-2 pr-2"
                >
                  <CreatorCard
                    creator={creator}
                    onImageLoad={handleImageLoad}
                    loadedImages={loadedImageUrls}
                    imageRef={imageRef}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-black/30 text-white backdrop-blur-sm transition-opacity",
              !prevBtnEnabled && "opacity-0 pointer-events-none"
            )}
            aria-label="Previous creator"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-black/30 text-white backdrop-blur-sm transition-opacity",
              !nextBtnEnabled && "opacity-0 pointer-events-none"
            )}
            aria-label="Next creator"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {creators.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === selectedIndex ? "bg-primary" : "bg-gray-300"
                )}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to creator ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {creators.map((creator) => (
            <CreatorCard
              key={creator.name}
              creator={creator}
              onImageLoad={handleImageLoad}
              loadedImages={loadedImageUrls}
              imageRef={imageRef}
            />
          ))}
        </div>
      )}
    </div>
  );
};
