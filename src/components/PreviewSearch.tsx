import React from 'react';
import { SearchBar } from './search/SearchBar';
import { CreatorsList } from './search/CreatorsList';
import { AuroraBackground } from './ui/aurora-background';
import { Badge } from './ui/badge'; // Assuming you have a Badge component

const PreviewSearch = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-transparent transition-all duration-300 hover:shadow-2xl">
          <AuroraBackground className="min-h-0 w-full" showRadialGradient={false}>
            {/* Header section with improved spacing and visual hierarchy */}
            <div className="text-center pt-10 pb-8 sm:pt-12 sm:pb-10 w-full px-4 sm:px-8">
              <div className="inline-block mb-3">
                <Badge variant="outline" className="bg-white/10 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-sm font-medium">
                  Pre-Vetted Professionals
                </Badge>
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 sm:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
                Discover Elite Property Storytellers
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                Unlock premium visuals that sell properties faster — hand-selected experts with proven results
              </p>
            </div>
            
            {/* Search bar with improved visual prominence */}
            <div className="w-full px-5 py-5 sm:px-8 sm:py-6 border-b border-gray-200/30 backdrop-blur-sm bg-white/5">
              <div className="max-w-3xl mx-auto transform transition-transform duration-300 hover:scale-[1.01]">
                <SearchBar onLocationSelect={() => {}} />
              </div>
            </div>
          
            {/* Creators list with more breathing room */}
            <div className="w-full px-5 py-8 sm:px-8 sm:py-10 bg-gradient-to-b from-transparent to-white/5">
              <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Featured Professionals</h3>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <span className="hidden sm:inline">All creators are</span> 
                    <span className="font-medium text-primary flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified & Insured
                    </span>
                  </div>
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
                
                <div className="mt-10 text-center">
                  <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 group">
                    View All Creators
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </AuroraBackground>
        </div>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            All creators undergo thorough background checks and portfolio review
          </p>
        </div>
      </div>
    </section>
  );
};

export default PreviewSearch;
