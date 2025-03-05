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

// Create a standardized Section component for consistent spacing and styling
const Section = ({ 
  id, 
  children, 
  className = "", 
  withContainer = true,
  background = "bg-white",
  decorations = null,
  containerClassName = ""
}) => (
  <section 
    id={id} 
    className={`relative w-full py-10 md:py-16 lg:py-24 overflow-hidden ${background} ${className}`}
  >
    {decorations}
    <div className={`relative z-10 ${withContainer ? 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl' : ''} ${containerClassName}`}>
      {children}
    </div>
  </section>
);

// Standardized loading fallbacks with size variants
const LoadingFallback = ({ size = "default" }) => {
  const sizes = {
    small: "min-h-[150px]",
    default: "min-h-[300px]",
    large: "min-h-[450px]",
  };
  
  return (
    <div className={`flex items-center justify-center w-full p-4 ${sizes[size]}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

const Index = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showGlowDialog, setShowGlowDialog] = useState(false);
  
  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisited');
    
    // Delay banner display to prevent layout shift
    const bannerTimer = setTimeout(() => {
      setShowBanner(true);
    }, 300);
    
    setShowGlowDialog(!hasVisited);
    
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
    }
    
    return () => clearTimeout(bannerTimer);
  }, []);
  
  const handleTryNowClick = () => {
    setShowGlowDialog(true);
  };
  
  // Standardized button styling
  const primaryButtonClasses = "bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold border border-amber-300 shadow-sm transition-all duration-200";
  
  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-hidden">
      <Header />
      
      {/* Banner with streamlined styling */}
      {showBanner && (
        <div className="sticky top-0 z-50">
          <Banner 
            variant="purple" 
            size="lg" 
            action={
              <Button 
                variant="secondary" 
                size="sm" 
                className={`whitespace-nowrap px-3 py-1.5 sm:px-5 sm:py-2 ${primaryButtonClasses}`}
                onClick={handleTryNowClick}
              >
                Get Early Access
              </Button>
            } 
            layout="complex" 
            isClosable 
            onClose={() => setShowBanner(false)} 
            className="animate-in fade-in slide-in-from-top duration-300"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <Star className="h-4 w-4 text-yellow-300 animate-pulse" />
              <AnimatedShinyText className="text-sm sm:text-base font-bold text-white">
                Join the AI-powered revolution!
              </AnimatedShinyText>
            </div>
          </Banner>
        </div>
      )}

      <main className="flex-1 w-full overflow-hidden">
        {/* Hero Section */}
        <Section 
          withContainer={false} 
          className="pt-8 md:pt-12 pb-12 md:pb-20"
          background="bg-white"
          decorations={
            <Spotlight 
              className="from-purple-500/20 via-violet-500/20 to-blue-500/20" 
              size={400} 
            />
          }
        >
          <Hero />
        </Section>

        {/* How It Works Section */}
        <Section 
          id="how-it-works" 
          background="bg-[#f8f9ff] border-y border-gray-100"
          decorations={
            <>
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
            </>
          }
        >
          <Suspense fallback={<LoadingFallback size="large" />}>
            <HowItWorksSection />
          </Suspense>
        </Section>
            
        {/* Featured Creators Section */}
        <Section 
          background="bg-zinc-700" 
          className="py-8 md:py-14 lg:py-20"
        >
          <Suspense fallback={<LoadingFallback />}>
            <PreviewSearch />
          </Suspense>
        </Section>
        
        {/* Professional Content Creation Services */}
        <Section 
          background="bg-[#F1F0FB] border-y border-gray-100"
          decorations={
            <>
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
              <Spotlight 
                className="from-emerald-500/20 via-teal-500/20 to-cyan-500/20" 
                size={350} 
              />
            </>
          }
        >
          <Suspense fallback={<LoadingFallback size="large" />}>
            <FeaturesSectionWithHoverEffects />
          </Suspense>
        </Section>

        {/* Pricing Section */}
        <Section 
          id="pricing" 
          background="bg-white border-b border-gray-100"
          decorations={
            <>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f3f3_1px,transparent_1px),linear-gradient(to_bottom,#f3f3f3_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
              <Spotlight 
                className="from-indigo-500/20 via-purple-500/20 to-pink-500/20" 
                size={350} 
              />
            </>
          }
        >
          <Suspense fallback={<LoadingFallback />}>
            <Pricing />
          </Suspense>
        </Section>

        {/* Final CTA Section */}
        <Section 
          background="bg-gradient-to-b from-white to-[#F6F6F7]"
          className="py-14 md:py-20 lg:py-28"
          decorations={
            <Spotlight 
              className="from-purple-500/20 via-pink-500/20 to-red-500/20" 
              size={350} 
            />
          }
        >
          <CallToActionSection />
        </Section>

        <Footer />
      </main>
      
      {/* Bottom Nav only shown on mobile */}
      <div className="block sm:hidden">
        <BottomNav />
      </div>
      
      <GlowDialog open={showGlowDialog} onOpenChange={setShowGlowDialog} />
    </div>
  );
};

export default Index;
