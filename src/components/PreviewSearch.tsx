import React from 'react';
import { SearchBar } from './search/SearchBar';
import { CreatorsList } from './search/CreatorsList';
import { AuroraBackground } from './ui/aurora-background';
import { Badge } from './ui/badge';
import { Shield, Star, Award, CheckCircle } from 'lucide-react';

const PreviewSearch = () => {
  return <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-transparent">
          <AuroraBackground className="min-h-0 w-full" showRadialGradient={false}>
            {/* Enhanced title and subtitle with stronger value proposition */}
            <div className="text-center pt-8 pb-6 sm:pt-10 sm:pb-8 w-full">
              <div className="flex items-center justify-center mb-4">
                <Badge variant="outline" className="px-3 py-1 bg-primary/10 border-primary/20 text-primary font-medium">
                  <Star className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                  Top-Rated Professionals
                </Badge>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3 sm:mb-4">Elite Property Media Experts</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Trusted by 1,000+ real estate agents to boost listings by 35%
              </p>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4 max-w-2xl mx-auto px-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-primary" />
                  <span>Verified Pros</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1 text-primary" />
                  <span>Quality Guaranteed</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-primary" />
                  <span>Secure Booking</span>
                </div>
              </div>
            </div>
            
            <div className="w-full px-4 py-4 sm:px-8 sm:py-6 border-b">
              <SearchBar onLocationSelect={() => {}} />
            </div>
          
            <div className="w-full px-4 py-6 sm:px-8 sm:py-8">
              {/* Sort controls with improved labeling */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground"><strong>307 verified professionals</strong> in your area</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Sort by:</span>
                  <select className="text-sm border rounded-md px-2 py-1">
                    <option value="rating">Top Rated</option>
                    <option value="price">Price: Low to High</option>
                    <option value="reviews">Most Reviews</option>
                  </select>
                </div>
              </div>
              
              <CreatorsList creators={[{
              name: "Emily Johnson",
              services: ["Photography", "Virtual Staging"],
              price: 150,
              rating: 4.9,
              reviews: 127,
              location: "New York, NY",
              image: "/newemilyprofile.jpg",
              workExamples: ["/1-d2e3f802.jpg"],
              badge: "Top Pro",
              fastResponse: true,
              yearsExperience: 6
            }, {
              name: "Jane Cooper",
              services: ["Video Tours", "Drone Footage"],
              price: 200,
              rating: 4.8,
              reviews: 98,
              location: "Los Angeles, CA",
              image: "/janeprofile.png",
              workExamples: ["/janesub.jpg", "/janesub2.png", "/janesub3.webp"],
              badge: "Featured",
              fastResponse: true,
              yearsExperience: 5
            }, {
              name: "Michael Brown",
              services: ["3D Tours", "Floor Plans"],
              price: 175,
              rating: 4.7,
              reviews: 82,
              location: "Chicago, IL",
              image: "/emily profile.jpeg",
              workExamples: ["/1-d2e3f802.jpg"],
              badge: "Rising Star",
              fastResponse: false,
              yearsExperience: 3
            }]} sortBy="rating" onSort={() => {}} onImageLoad={() => {}} loadedImages={new Set()} imageRef={() => {}} />
            </div>
            
            {/* Social proof footer */}
            <div className="w-full px-4 py-5 sm:px-8 border-t bg-gray-50/50">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <p className="font-medium">Trusted by leading brokerages:</p>
                <div className="flex flex-wrap justify-center gap-6">
                  <img src="/logo-placeholder1.svg" alt="Brokerage 1" className="h-6 opacity-70" />
                  <img src="/logo-placeholder2.svg" alt="Brokerage 2" className="h-6 opacity-70" />
                  <img src="/logo-placeholder3.svg" alt="Brokerage 3" className="h-6 opacity-70" />
                </div>
              </div>
            </div>
          </AuroraBackground>
        </div>
      </div>
    </div>;
};
export default PreviewSearch;
