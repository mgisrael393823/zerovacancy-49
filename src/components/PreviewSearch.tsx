import React from 'react';
import { SearchBar } from './search/SearchBar';
import { CreatorsList } from './search/CreatorsList';
import { AuroraBackground } from './ui/aurora-background';
const PreviewSearch = () => {
  return <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-white my-[20px]">
          <AuroraBackground className="min-h-0 w-full" showRadialGradient={false}>
            <div className="flex flex-col w-full">
              {/* Title and subtitle */}
              <div className="text-center pt-8 pb-6 sm:pt-10 sm:pb-8 w-full">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3 sm:mb-4">Discover Featured Creators</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                  Find the perfect professional for your property content needs
                </p>
              </div>
              
              {/* Search bar section */}
              <div className="w-full px-4 py-4 sm:px-8 sm:py-6 border-b">
                <SearchBar onLocationSelect={() => {}} />
              </div>
            
              {/* Creators list section - now part of the same flex container */}
              <div className="w-full px-4 py-6 sm:px-8 sm:py-8">
                <CreatorsList creators={[{
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
              }]} sortBy="rating" onSort={() => {}} onImageLoad={() => {}} loadedImages={new Set()} imageRef={() => {}} />
              </div>
            </div>
          </AuroraBackground>
        </div>
      </div>
    </div>;
};
export default PreviewSearch;