import React from 'react';
import { SearchBar } from './search/SearchBar';
import { CreatorsList } from './search/CreatorsList';
import { AuroraBackground } from './ui/aurora-background';
import { BorderBeam } from './ui/border-beam';
import { GlowingEffect } from './ui/glowing-effect';
import { Camera, Compass, Video, Laptop, Star, Shield, Clock } from 'lucide-react';
import { AnimatedGrid } from './ui/animated-grid';
import { cn } from '@/lib/utils';

// Create a component for displaying creator specialties with iconography
const CreatorSpecialties = () => {
  const specialties = [
    { icon: <Camera className="h-5 w-5" />, label: "Photography" },
    { icon: <Video className="h-5 w-5" />, label: "3D Tours" },
    { icon: <Video className="h-5 w-5" />, label: "Drone Footage" },
    { icon: <Video className="h-5 w-5" />, label: "Video Tours" },
    { icon: <Laptop className="h-5 w-5" />, label: "Virtual Staging" },
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

// New component for marketplace stats
const MarketplaceStats = () => {
  return (
    <div className="flex justify-center items-center gap-5 sm:gap-8 py-2 text-xs sm:text-sm text-gray-700">
      <div className="flex items-center gap-1.5">
        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
        <span className="font-semibold">4.8 avg. rating</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Shield className="h-4 w-4 text-green-500" />
        <span className="font-semibold">100% vetted creators</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Clock className="h-4 w-4 text-blue-500" />
        <span className="font-semibold">24hr response time</span>
      </div>
    </div>
  );
};

const PreviewSearch = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
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
              variant="default" 
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
          >
            <div className="flex flex-col w-full relative z-10">
              {/* Enhanced title and subtitle */}
              <div className="text-center pt-6 pb-2 px-4">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mb-2">
                  Early Access Available
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-3 text-gray-900">
                  Elite Property Creators, Instant Results
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-4 sm:mb-6 text-sm sm:text-base">
                  Book top-rated real estate photographers and videographers who help properties sell 30% faster
                </p>
                
                {/* Marketplace stats for social proof */}
                <MarketplaceStats />
              </div>
              
              {/* Creator specialties with iconography */}
              <div className="w-full pt-2 pb-2 px-4">
                <CreatorSpecialties />
              </div>
              
              {/* Search bar section */}
              <div className="w-full px-4 py-4 sm:px-6 sm:py-5">
                <SearchBar onLocationSelect={() => {}} />
              </div>
            
              {/* Enhanced creators list section */}
              <div className="w-full px-4 py-5 sm:px-6 sm:py-6 bg-gradient-to-b from-transparent to-purple-50/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Featured Creators</h3>
                  <span className="text-sm text-purple-600 font-medium">Early access: 35+ creators</span>
                </div>
                
                <CreatorsList 
                  creators={[{
                    name: "Emily Johnson",
                    services: ["Photography", "Virtual Staging"],
                    price: 150,
                    rating: 4.9,
                    reviews: 127,
                    location: "New York, NY",
                    image: "/newemilyprofile.jpg",
                    workExamples: ["/1-d2e3f802.jpg"],
                    badges: ["Top Pro", "24hr Response"],
                    available: "Available this week"
                  }, {
                    name: "Jane Cooper",
                    services: ["Video Tours", "Drone Footage"],
                    price: 200,
                    rating: 4.8,
                    reviews: 98,
                    location: "Los Angeles, CA",
                    image: "/janeprofile.png",
                    workExamples: ["/janesub.jpg", "/janesub2.png", "/janesub3.webp"],
                    badges: ["Verified", "Featured"],
                    available: "Available next week"
                  }, {
                    name: "Michael Brown",
                    services: ["3D Tours", "Floor Plans"],
                    price: 175,
                    rating: 4.7,
                    reviews: 82,
                    location: "Chicago, IL",
                    image: "/emily profile.jpeg",
                    workExamples: ["/1-d2e3f802.jpg"],
                    badges: ["Verified"],
                    available: "Available now"
                  }]} 
                  sortBy="rating" 
                  onSort={() => {}} 
                  onImageLoad={() => {}} 
                  loadedImages={new Set()} 
                  imageRef={() => {}} 
                />
                
                {/* Trust guarantee */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm
                      border border-green-100 text-sm text-gray-700 font-medium">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>100% Satisfaction Guarantee on All Bookings</span>
                  </div>
                </div>
              </div>
            </div>
          </AuroraBackground>
        </div>
      </div>
    </div>
  );
};

export default PreviewSearch;
