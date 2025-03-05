import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from '../components/Header';
import { Hero } from '../components/Hero';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import { BottomNav } from '../components/navigation/BottomNav';
import { Banner } from '@/components/ui/banner';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { GlowDialog } from '@/components/ui/glow-dialog';
import { Spotlight } from '@/components/ui/spotlight';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { Waves } from '@/components/ui/waves';

// Lazy load heavy components
const PreviewSearch = lazy(() => import('../components/PreviewSearch'));
const HowItWorksSection = lazy(() => import('../components/HowItWorksSection'));
const FeaturesSectionWithHoverEffects = lazy(() => import('@/components/Features'));
const Pricing = lazy(() => import('@/components/Pricing'));

// Loading fallback component with consistent sizing
const LoadingFallback = () => (
  <div className="flex items-center justify-center p-8 sm:p-12 min-h-[200px]">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const Index = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showGlowDialog, setShowGlowDialog] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisited');
    setShowGlowDialog(!hasVisited);

    // Only show banner after initial render to prevent layout shift
    setShowBanner(true);
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
    }

    // Mark as loaded after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  const handleTryNowClick = () => {
    setShowGlowDialog(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-hidden">
      <Header />
      
      {/* Banner with improved responsive styling */}
      {showBanner && (
        <div className="relative z-50">
          <Banner 
            variant="purple" 
            size="lg" 
            action={
              <Button 
                variant="secondary" 
                size="sm" 
                className="
                  flex items-center whitespace-nowrap
                  px-3 py-1.5 sm:px-5 sm:py-2.5
                  bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold
                  border border-amber-300 sm:border-2
                  transition-all duration-200
                  min-h-[1.75rem] sm:min-h-[2.5rem]
                  min-w-[6rem] sm:min-w-[9rem]
                  touch-manipulation
                  shadow-[0_2px_8px_rgba(0,0,0,0.1)]
                  text-xs sm:text-sm
                " 
                onClick={handleTryNowClick}
              >
                Get Early Access
              </Button>
            } 
            layout="complex" 
            isClosable 
            onClose={() => setShowBanner(false)} 
            className="animate-in fade-in slide-in-from-top duration-500 relative overflow-hidden min-h-[2.75rem] sm:min-h-[3.5rem]"
          >
            <div className="flex items-center justify-start gap-2 sm:gap-4 relative z-10">
              <Star className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-300 animate-pulse" />
              <AnimatedShinyText 
                className="
                  text-sm sm:text-base font-bold inline-block
                  text-white relative z-10 rounded
                  tracking-wide
                " 
                shimmerWidth={200}
              >
                Join the AI-powered revolution!
              </AnimatedShinyText>
            </div>
          </Banner>
        </div>
      )}

      <main className="flex-1 w-full overflow-hidden pb-16 sm:pb-0">
        {/* Hero Section with improved containment */}
        <section className="relative overflow-hidden">
          <Spotlight 
            className="from-purple-500/20 via-violet-500/20 to-blue-500/20" 
            size={400} 
          />
          <Hero />
        </section>

        {/* Consistent section spacing */}
        <div className="w-full">
          {/* How It Works Section */}
          <section 
            id="how-it-works" 
            className="relative bg-[#f8f9ff] py-12 sm:py-20 lg:py-24 overflow-hidden border-t border-b border-gray-100 w-full"
          >
            <Waves 
              lineColor="rgba(147, 112, 219, 0.2)" 
              backgroundColor="#f8f9ff" 
              waveSpeedX={0.01} 
              waveSpeedY={0.008} 
              waveAmpX={25} 
              waveAmpY={12} 
              xGap={15} 
              yGap={30} 
              className="opacity-70" 
            />
            <Spotlight 
              className="from-blue-500/20 via-cyan-500/20 to-teal-500/20" 
              size={350} 
            />
            <div className="relative z-10">
              <Suspense fallback={<LoadingFallback />}>
                <HowItWorksSection />
              </Suspense>
            </div>
          </section>
              
          {/* Featured Creators Section - Now with proper containment and spacing */}
          {isLoaded && (
            <section className="relative w-full bg-zinc-700 py-10 sm:py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Suspense fallback={<LoadingFallback />}>
                  <PreviewSearch />
                </Suspense>
              </div>
            </section>
          )}
          
          {/* Professional Content Creation Services with consistent spacing */}
          {isLoaded && (
            <section className="relative py-12 sm:py-20 lg:py-24 overflow-hidden bg-[#F1F0FB] border-t border-b border-gray-100 w-full">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
              <Spotlight 
                className="from-emerald-500/20 via-teal-500/20 to-cyan-500/20" 
                size={350} 
              />
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Suspense fallback={<LoadingFallback />}>
                  <FeaturesSectionWithHoverEffects />
                </Suspense>
              </div>
            </section>
          )}

          {/* Pricing Section with consistent spacing */}
          {isLoaded && (
            <section 
              id="pricing" 
              className="relative py-12 sm:py-20 lg:py-24 overflow-hidden bg-white border-b border-gray-100 w-full"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f3f3_1px,transparent_1px),linear-gradient(to_bottom,#f3f3f3_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
              <Spotlight 
                className="from-indigo-500/20 via-purple-500/20 to-pink-500/20" 
                size={350} 
              />
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Suspense fallback={<LoadingFallback />}>
                  <Pricing />
                </Suspense>
              </div>
            </section>
          )}

          {/* Final CTA Section with improved spacing */}
          <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden bg-gradient-to-b from-white to-[#F6F6F7] w-full">
            <Spotlight 
              className="from-purple-500/20 via-pink-500/20 to-red-500/20" 
              size={350} 
            />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CallToActionSection />
            </div>
          </section>
        </div>

        <Footer />
      </main>
      
      <BottomNav />
      <GlowDialog open={showGlowDialog} onOpenChange={setShowGlowDialog} />
    </div>
  );
};

export default Index;
