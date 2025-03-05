```jsx
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from '../components/Header';
import { Hero } from '../components/Hero';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import { BottomNav } from '../components/navigation/BottomNav';
import { Banner } from '@/components/ui/banner';
import { Button } from '@/components/ui/button';
import { Star, ChevronDown } from 'lucide-react';
import { GlowDialog } from '@/components/ui/glow-dialog';
import { Spotlight } from '@/components/ui/spotlight';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { Waves } from '@/components/ui/waves';
import { ErrorBoundary } from '@/components/ui/error-boundary';

// Lazy load heavy components with proper chunking
const PreviewSearch = lazy(() => import(/* webpackChunkName: "preview-search" */ '../components/PreviewSearch'));
const HowItWorksSection = lazy(() => import(/* webpackChunkName: "how-it-works" */ '../components/HowItWorksSection'));
const FeaturesSectionWithHoverEffects = lazy(() => import(/* webpackChunkName: "features" */ '@/components/Features'));
const Pricing = lazy(() => import(/* webpackChunkName: "pricing" */ '@/components/Pricing'));

// Create a standardized Section component for consistent spacing and styling
const Section = ({ 
  id, 
  children, 
  className = "", 
  withContainer = true,
  background = "bg-white",
  decorations = null,
  containerClassName = "",
  ariaLabel = ""
}) => (
  <section 
    id={id} 
    className={`relative w-full py-8 md:py-14 lg:py-20 overflow-hidden ${background} ${className}`}
    aria-label={ariaLabel || id}
  >
    {decorations}
    <div className={`relative z-10 ${withContainer ? 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl' : ''} ${containerClassName}`}>
      {children}
    </div>
  </section>
);

// Enhanced loading fallbacks with accessibility improvements
const LoadingFallback = ({ size = "default", message = "Loading..." }) => {
  const sizes = {
    small: "min-h-[150px]",
    default: "min-h-[300px]",
    large: "min-h-[450px]",
  };
  
  return (
    <div 
      className={`flex items-center justify-center w-full p-4 ${sizes[size]}`}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" role="progressbar"></div>
        <p className="text-sm text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

// Scroll indicator component to improve section navigation
const ScrollIndicator = ({ targetId }) => (
  <button 
    onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })}
    className="group absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce transition-opacity hover:opacity-80 z-20"
    aria-label={`Scroll to ${targetId} section`}
  >
    <span className="text-xs text-gray-500 mb-1 group-hover:text-gray-700">Explore</span>
    <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
  </button>
);

// Error fallback component for lazy-loaded sections
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="flex flex-col items-center justify-center p-6 min-h-[200px] text-center bg-red-50 rounded-lg border border-red-100">
    <p className="text-red-600 mb-4">Something went wrong loading this section</p>
    <Button 
      onClick={resetErrorBoundary}
      variant="outline"
      size="sm"
      className="text-red-600 border-red-200 hover:bg-red-50"
    >
      Try again
    </Button>
  </div>
);

const Index = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showGlowDialog, setShowGlowDialog] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisited');
    
    // Show banner with improved timing to prevent layout shift
    const bannerTimer = setTimeout(() => {
      // Only show banner after critical content has loaded
      if (document.readyState === 'complete') {
        setShowBanner(true);
      } else {
        window.addEventListener('load', () => setShowBanner(true), { once: true });
      }
    }, 1000);
    
    // Show dialog only for new visitors or returning visitors who haven't converted
    const hasConverted = localStorage.getItem('hasConverted');
    setShowGlowDialog(!hasVisited && !hasConverted);
    
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
    }
    
    // Track scrolling for improved UX elements
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 100) {
        setHasScrolled(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(bannerTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]);
  
  const handleTryNowClick = (source) => {
    // Track conversion attempt source for analytics
    console.log(`Conversion attempt from: ${source}`);
    setShowGlowDialog(true);
  };
  
  const handleConversionSuccess = () => {
    localStorage.setItem('hasConverted', 'true');
    // This would be called from the GlowDialog component on successful sign-up
  };
  
  // Standardized button styling with improved contrast and feedback
  const primaryButtonClasses = "bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-gray-900 font-bold border border-amber-400 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-amber-200 focus:ring-offset-2";
  
  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
      <Header />
      
      {/* Banner with improved animation and accessibility */}
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
                onClick={() => handleTryNowClick('top_banner')}
                aria-label="Get early access to the platform"
              >
                Get Early Access
              </Button>
            } 
            layout="complex" 
            isClosable 
            onClose={() => setShowBanner(false)} 
            className="animate-in fade-in slide-in-from-top duration-500"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <Star className="h-4 w-4 text-yellow-300 animate-pulse" />
              <AnimatedShinyText className="text-sm sm:text-base font-bold text-white">
                <span className="hidden sm:inline">Limited Time:</span> Join our marketplace beta for exclusive perks!
              </AnimatedShinyText>
            </div>
          </Banner>
        </div>
      )}

      <main className="flex-1 w-full overflow-hidden">
        {/* Hero Section with improved CTA and social proof */}
        <Section 
          withContainer={false} 
          className="pt-10 md:pt-14 pb-16 md:pb-24 relative"
          background="bg-white"
          decorations={
            <Spotlight 
              className="from-purple-500/20 via-violet-500/20 to-blue-500/20" 
              size={400} 
            />
          }
          id="hero"
          ariaLabel="Welcome to our marketplace platform"
        >
          <Hero />
          {!hasScrolled && <ScrollIndicator targetId="how-it-works" />}
        </Section>

        {/* How It Works Section with error boundary */}
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
          ariaLabel="How our platform works"
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingFallback size="large" message="Loading platform features..." />}>
              <HowItWorksSection />
            </Suspense>
          </ErrorBoundary>
        </Section>
            
        {/* Featured Creators Section with optimized contrast */}
        <Section 
          id="featured-creators"
          background="bg-zinc-800" 
          className="py-8 md:py-14 lg:py-20"
          ariaLabel="Featured creators on our platform"
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingFallback message="Loading creator examples..." />}>
              <PreviewSearch />
            </Suspense>
          </ErrorBoundary>
        </Section>
        
        {/* Professional Content Creation Services with improved visuals */}
        <Section 
          id="features"
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
          ariaLabel="Our professional content creation services"
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingFallback size="large" message="Loading our services..." />}>
              <FeaturesSectionWithHoverEffects />
            </Suspense>
          </ErrorBoundary>
        </Section>

        {/* Pricing Section with trust indicators */}
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
          ariaLabel="Pricing plans and options"
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingFallback message="Loading pricing options..." />}>
              <Pricing />
              
              {/* Trust badges for pricing section */}
              <div className="mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-center">
                <div className="flex items-center px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-xs font-medium">Secure Payment</span>
                </div>
                <div className="flex items-center px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                  <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs font-medium">14-Day Money Back</span>
                </div>
                <div className="flex items-center px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                  <svg className="h-4 w-4 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-xs font-medium">Privacy Protected</span>
                </div>
              </div>
            </Suspense>
          </ErrorBoundary>
        </Section>

        {/* Final CTA Section with urgency element */}
        <Section 
          id="get-started"
          background="bg-gradient-to-b from-white to-[#F6F6F7]"
          className="py-14 md:py-20 lg:py-28"
          decorations={
            <Spotlight 
              className="from-purple-500/20 via-pink-500/20 to-red-500/20" 
              size={350} 
            />
          }
          ariaLabel="Join our platform today"
        >
          {/* Enhanced CTA with social proof counter */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-3 py-1 mb-4 bg-amber-100 rounded-full text-amber-800 text-sm font-medium">
              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Limited spots available for beta access</span>
            </div>
          </div>
          
          <CallToActionSection />
          
          {/* Social proof counter */}
          <div className="mt-8 text-center animate-pulse">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">247</span> people signed up in the last 24 hours
            </p>
          </div>
        </Section>

        <Footer />
      </main>
      
      {/* Bottom Nav optimized for mobile with better contrast */}
      <div className="block sm:hidden">
        <BottomNav />
      </div>
      
      {/* Enhanced dialog with conversion tracking */}
      <GlowDialog 
        open={showGlowDialog} 
        onOpenChange={setShowGlowDialog} 
        onConversionSuccess={handleConversionSuccess}
      />
    </div>
  );
};

export default Index;
```
