
// src/pages/Index.tsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero'; // Updated import path
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import OptimizedHowItWorks from '../components/how-it-works/OptimizedHowItWorks';
import { BottomNav } from '../components/navigation/BottomNav';
import { Banner } from '@/components/ui/banner';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { GlowDialog } from '@/components/ui/glow-dialog';
import { OptimizedSpotlight } from '@/components/ui/optimized-spotlight';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { FeaturesSectionWithHoverEffects } from '@/components/features/Features';
import Pricing from '@/components/Pricing';
import PreviewSearch from '@/components/PreviewSearch';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { GradientBlobBackground } from '@/components/ui/gradient-blob-background';

/**
 * Main landing page component with performance optimizations and improved spacing
 */
const Index = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [showGlowDialog, setShowGlowDialog] = useState(false);
  const isMobile = useIsMobile();

  // Initialize local storage and dialog state
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    setShowGlowDialog(!hasVisited);
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleTryNowClick = () => {
    setShowGlowDialog(true);
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
      <Header />
      
      {/* Enhanced Banner - Improved animation and spacing */}
      {showBanner && (
        <div className="relative z-20">
          <Banner 
            variant="purple" 
            size="lg" 
            action={
              <Button 
                variant="secondary" 
                size="sm" 
                className={cn(
                  "flex text-xs sm:text-sm items-center whitespace-nowrap", 
                  isMobile 
                    ? "px-2 py-1.5 min-w-[7rem] min-h-[2rem]" 
                    : "px-3 py-2 sm:px-5 sm:py-2.5 min-w-[8rem] sm:min-w-[9rem] min-h-[2.25rem] sm:min-h-[2.5rem]", 
                  "bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold", 
                  "border-2 border-amber-300", 
                  "transition-all duration-200", 
                  "touch-manipulation", 
                  "shadow-[0_2px_10px_rgba(0,0,0,0.15)]",
                  "active:scale-95"
                )} 
                onClick={handleTryNowClick}
              >
                {isMobile ? "Try Now" : "Get Early Access"}
              </Button>
            } 
            layout="complex" 
            isClosable 
            onClose={() => setShowBanner(false)} 
            className="animate-in fade-in slide-in-from-top duration-500 relative overflow-hidden min-h-[3.25rem] sm:min-h-[3.5rem] my-0 py-0"
          >
            <div className="flex items-center justify-left gap-3 sm:gap-4 relative z-10">
              <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300 animate-pulse" />
              <AnimatedShinyText 
                className={cn(
                  "text-sm sm:text-base font-bold inline-block", 
                  "text-white relative z-10 rounded", 
                  "px-1 tracking-wide"
                )} 
                shimmerWidth={200}
              >
                Join the AI-powered revolution in property management!
              </AnimatedShinyText>
            </div>
          </Banner>
        </div>
      )}

      <main className="flex-1 pb-16 sm:pb-0 w-full overflow-x-hidden bg-gradient-to-b from-white to-purple-50/10">
        {/* Hero Section - Enhanced with better responsive spacing */}
        <div className="relative overflow-hidden">
          <OptimizedSpotlight 
            className="from-purple-500/20 via-violet-500/20 to-blue-500/20" 
            size={isMobile ? 300 : 400} 
          />
          <div className="py-4 sm:py-6 md:py-8">
            <Hero />
          </div>
        </div>

        {/* Improved spacing between sections with consistent rhythm */}
        <div className="space-y-0 w-full">
          {/* How It Works Section - Refined borders and shadows */}
          <section 
            id="how-it-works" 
            className="relative overflow-hidden border-y border-gray-100/80 w-full my-8 sm:my-12"
          >
            <OptimizedSpotlight 
              className="from-blue-500/20 via-cyan-500/20 to-teal-500/20" 
              size={isMobile ? 250 : 350} 
            />
            <div className="relative z-10 py-2 sm:py-4">
              <OptimizedHowItWorks />
            </div>
          </section>
          
          {/* Search Section - Improved height constraints and background */}
          <section 
            id="find-creators" 
            className="relative overflow-hidden w-full border-y border-gray-100/80 my-8 sm:my-12"
          >
            <GradientBlobBackground 
              className={cn(
                "py-8 sm:py-12 md:py-16",
                isMobile ? "min-h-[550px]" : "min-h-[600px] md:min-h-[650px]"
              )}
            >
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 font-jakarta tracking-tight">
                    Find Your Perfect Creator
                  </h2>
                  <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 font-inter">
                    Connect with skilled professionals who can showcase your property in its best light
                  </p>
                </div>
                <PreviewSearch />
              </div>
            </GradientBlobBackground>
          </section>
          
          {/* Features Section - Better rhythm and background contrast */}
          <section 
            className="py-10 sm:py-14 lg:py-16 border-y border-gray-100/80 w-full bg-white/80 backdrop-blur-sm my-8 sm:my-12"
          >
            <FeaturesSectionWithHoverEffects />
          </section>

          {/* Pricing Section - Better integration with overall flow */}
          <div className="border-y border-gray-100/80 bg-white/50 my-8 sm:my-12">
            <Pricing />
          </div>

          {/* Final CTA Section - Enhanced visual prominence */}
          <div 
            className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-white to-[#F6F6F7] w-full mt-8 sm:mt-12 mb-0 border-t border-gray-100/80"
          >
            <OptimizedSpotlight 
              className="from-purple-500/20 via-pink-500/20 to-red-500/20" 
              size={isMobile ? 250 : 350} 
            />
            <div className="relative z-10 max-w-7xl mx-auto">
              <CallToActionSection />
            </div>
          </div>
        </div>

        <Footer />
      </main>
      
      {/* Mobile Navigation */}
      <BottomNav />
      
      {/* Dialog */}
      <GlowDialog open={showGlowDialog} onOpenChange={setShowGlowDialog} />
    </div>
  );
};

export default Index;
