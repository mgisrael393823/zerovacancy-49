
import React from 'react';
import { SearchBar } from './search/SearchBar';
import { CreatorsList } from './search/CreatorsList';
import { AuroraBackground } from './ui/aurora-background';
import { BorderBeam } from './ui/border-beam';
import { GlowingEffect } from './ui/glowing-effect';
import { Camera, Compass, Drone, Video3d, Video, DeviceLaptop } from 'lucide-react';
import { AnimatedGrid } from './ui/animated-grid';
import { cn } from '@/lib/utils';

// Create a component for displaying creator specialties with iconography
const CreatorSpecialties = () => {
  const specialties = [
    { icon: <Camera className="h-5 w-5" />, label: "Photography" },
    { icon: <Video3d className="h-5 w-5" />, label: "3D Tours" },
    { icon: <Drone className="h-5 w-5" />, label: "Drone Footage" },
    { icon: <Video className="h-5 w-5" />, label: "Video Tours" },
    { icon: <DeviceLaptop className="h-5 w-5" />, label: "Virtual Staging" },
    { icon: <Compass className="h-5 w-5" />, label: "Floor Plans" },
  ];
  
  return (
    <div className="w-full flex flex-wrap justify-center gap-3 sm:gap-4 py-2 sm:py-4 px-2">
      {specialties.map((specialty, index) => (
        <div 
          key={index}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm
                    border border-purple-100 text-xs sm:text-sm text-gray-700 font-medium
                    hover:bg-purple-50/90 hover:border-purple-200 transition-all duration-200"
        >
          <span className="text-purple-500">{specialty.icon}</span>
          <span>{specialty.label}</span>
        </div>
      ))}
    </div>
  );
};

const PreviewSearch = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-3 text-gray-900">
        Find Your Perfect Creator
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
        Connect with skilled professionals who can showcase your property in its best light
      </p>
      
      <div className="mx-auto relative group">
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-800/40 via-indigo-700/40 to-purple-900/40 opacity-75 blur-sm group-hover:opacity-100 transition duration-500"></div>
        <div className="relative rounded-xl overflow-hidden shadow-[0_10px_40px_-12px_rgba(120,80,200,0.25)] border border-zinc-200/60 bg-white">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
            <BorderBeam 
              colorFrom="#9370DB" 
              colorTo="#C19EF9" 
              duration={20}
              borderWidth={1.5}
            />
            <GlowingEffect 
              variant="purple" 
              blur={8} 
              glow={true} 
              inactiveZone={0.6}
              spread={15}
              borderWidth={1}
              className="opacity-20"
            />
            <AnimatedGrid className="opacity-5" />
          </div>
          <AuroraBackground 
            className="min-h-0 w-full" 
            showRadialGradient={false}
            colors={[
              'rgba(147, 112, 219, 0.15)',
              'rgba(138, 43, 226, 0.08)',
              'rgba(106, 90, 205, 0.07)',
            ]}
            blur={30}
            speed="slow"
          >
            <div className="flex flex-col w-full relative z-10">
              {/* Title and subtitle removed as they are now above the component */}
              
              {/* Creator specialties with iconography */}
              <div className="w-full pt-5 pb-2 px-4">
                <CreatorSpecialties />
              </div>
              
              {/* Search bar section */}
              <div className="w-full px-4 py-4 sm:px-6 sm:py-5">
                <SearchBar onLocationSelect={() => {}} />
              </div>
            
              {/* Creators list section */}
              <div className="w-full px-4 py-5 sm:px-6 sm:py-6 bg-gradient-to-b from-transparent to-purple-50/30">
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
                />
              </div>
            </div>
          </AuroraBackground>
        </div>
      </div>
    </div>
  );
};

export default PreviewSearch;
