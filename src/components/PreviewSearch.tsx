
import React from 'react';
import { SearchBar } from './search/SearchBar';
import { CreatorsList } from './search/CreatorsList';
import { AuroraBackground } from './ui/aurora-background';
import { BorderBeam } from './ui/border-beam';
import { GlowingEffect } from './ui/glowing-effect';
import { AnimatedGrid } from './ui/animated-grid';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { CreatorSpecialties } from './search/CreatorSpecialties';

const PreviewSearch = () => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto relative group">
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-800/40 via-indigo-700/40 to-purple-900/40 opacity-75 blur-sm group-hover:opacity-100 transition duration-500"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }
          }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative rounded-xl overflow-hidden shadow-[0_10px_40px_-12px_rgba(120,80,200,0.25)] border border-zinc-200/60 bg-white"
        >
          {/* Background effects - reduced intensity on mobile */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
            <BorderBeam 
              colorFrom="#9370DB" 
              colorTo="#C19EF9" 
              duration={isMobile ? 25 : 20}
              borderWidth={isMobile ? 1 : 1.5}
            />
            <GlowingEffect 
              variant="default" 
              blur={isMobile ? 5 : 8} 
              glow={true} 
              inactiveZone={0.6}
              spread={isMobile ? 10 : 15}
              borderWidth={1}
              className={isMobile ? "opacity-15" : "opacity-20"}
            />
            <AnimatedGrid className={isMobile ? "opacity-3" : "opacity-5"} />
          </div>
          <AuroraBackground 
            className="min-h-0 w-full" 
            showRadialGradient={!isMobile}
          >
            <div className="flex flex-col w-full relative z-10">
              {/* Improved title and subtitle spacing */}
              <div className="text-center pt-5 sm:pt-6 pb-1 sm:pb-2 px-3 sm:px-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-1.5 sm:mb-2 md:mb-3 text-gray-900 leading-tight">
                  Find Your Perfect Creator
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base leading-relaxed">
                  Connect with skilled professionals who can showcase your property in its best light
                </p>
              </div>
              
              {/* Creator specialties - improved spacing */}
              <div className="w-full pt-1 pb-2 px-3 sm:px-4">
                <CreatorSpecialties />
              </div>
              
              {/* Search bar section - enhanced for touch */}
              <div className="w-full px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5">
                <SearchBar onLocationSelect={() => {}} />
              </div>
            
              {/* Creators list section - better mobile layout */}
              <div className="w-full px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 bg-gradient-to-b from-transparent to-purple-50/30">
                <CreatorsList 
                  creators={[{
                    name: "Emily Johnson",
                    services: ["Photography", "Virtual Staging"],
                    price: 150,
                    rating: 4.9,
                    reviews: 127,
                    location: "New York, NY",
                    image: "/newemilyprofile.jpg",
                    workExamples: ["/1-d2e3f802.jpg"]
                  }, {
                    name: "Jane Cooper",
                    services: ["Video Tours", "Drone Footage"],
                    price: 200,
                    rating: 4.8,
                    reviews: 98,
                    location: "Los Angeles, CA",
                    image: "/janeprofile.png",
                    workExamples: ["/janesub.jpg", "/janesub2.png", "/janesub3.webp"]
                  }, {
                    name: "Michael Brown",
                    services: ["3D Tours", "Floor Plans"],
                    price: 175,
                    rating: 4.7,
                    reviews: 82,
                    location: "Chicago, IL",
                    image: "/emily profile.jpeg",
                    workExamples: ["/1-d2e3f802.jpg"]
                  }]} 
                  sortBy="rating" 
                  onSort={() => {}} 
                  onImageLoad={() => {}} 
                  loadedImages={new Set()}
                  imageRef={() => {}}
                  isMobile={isMobile} // Pass isMobile to optimize creator card display
                />
              </div>
              
              {/* Mobile-friendly action footer */}
              {isMobile && (
                <div className="w-full sticky bottom-0 bg-white border-t border-gray-100 p-3 flex justify-center shadow-sm">
                  <button className="w-full max-w-xs py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg text-sm shadow-sm hover:shadow-md transition-all transform active:scale-[0.98]">
                    Find Creators Near Me
                  </button>
                </div>
              )}
            </div>
          </AuroraBackground>
        </motion.div>
      </div>
    </div>
  );
};

export default PreviewSearch;
