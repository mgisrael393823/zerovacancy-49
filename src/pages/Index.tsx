import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import Header from '../components/Header';
import { Hero } from '../components/Hero';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import { BottomNav } from '../components/navigation/BottomNav';
import { Banner } from '@/components/ui/banner';
import { Button } from '@/components/ui/button';
import { Star, CheckCircle, ShieldCheck } from 'lucide-react';
import { GlowDialog } from '@/components/ui/glow-dialog';
import { Spotlight } from '@/components/ui/spotlight';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { Waves } from '@/components/ui/waves';

// Lazy load heavy components with better code splitting
const PreviewSearch = lazy(() => import('../components/PreviewSearch'));
const HowItWorksSection = lazy(() => import('../components/HowItWorksSection'));
const FeaturesSectionWithHoverEffects = lazy(() => 
  import('@/components/Features').then(module => ({
    default: module.default
  }))
);
const Pricing = lazy(() => import('@/components/Pricing'));

// Create a more advanced Section component with intersection observer for animations
const Section = ({ 
  id, 
  children, 
  className = "", 
  withContainer = true,
  background = "bg-white",
  decorations = null,
  containerClassName = "",
  animationDirection = "up", // new prop for animation direction
  priority = "low", // priority for loading sequence
}) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation class mappings
  const animationClasses = {
    up: "animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards",
    down: "animate-in fade-in slide-in-from-top-4 duration-700 fill-mode-forwards",
    left: "animate-in fade-in slide-in-from-right-4 duration-700 fill-mode-forwards",
    right: "animate-in fade-in slide-in-from-left-4 duration-700 fill-mode-forwards",
    fade: "animate-in fade-in duration-700 fill-mode-forwards",
  };
  
  // Using intersection observer to trigger animations
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15, // Trigger when 15% of the section is visible
      }
    );
    
    observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);
  
  return (
    <section 
      id={id} 
      ref={sectionRef}
      className={`relative w-full py-10 md:py-16 lg:py-24 overflow-hidden ${background} ${className} ${isVisible ? animationClasses[animationDirection] : 'opacity-0'}`}
      aria-labelledby={id ? `${id}-heading` : undefined}
      data-priority={priority}
    >
      {decorations}
      <div className={`relative z-10 ${withContainer ? 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl' : ''} ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

// Create content-aware skeleton loaders for each section type
const SkeletonLoader = ({ type = "default" }) => {
  const skeletons = {
    // Hero section skeleton
    hero: (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="h-10 w-3/4 max-w-2xl bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-6 w-1/2 max-w-xl bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-12 w-48 bg-amber-200 rounded-md animate-pulse mt-4"></div>
          <div className="h-64 w-full max-w-4xl bg-gray-200 rounded-lg animate-pulse mt-8"></div>
        </div>
      </div>
    ),
    
    // How it works skeleton
    howItWorks: (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="h-10 w-64 mx-auto bg-gray-200 rounded-md animate-pulse mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col items-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-20 w-full bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    ),
    
    // Featured creators skeleton
    preview: (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="h-10 w-64 mx-auto bg-gray-500 rounded-md animate-pulse mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-64 bg-gray-600 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    ),
    
    // Features skeleton
    features: (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="h-10 w-64 mx-auto bg-gray-200 rounded-md animate-pulse mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className="h-10 w-10 rounded-md bg-gray-200 animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-6 w-1/2 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    
    // Pricing skeleton
    pricing: (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="h-10 w-64 mx-auto bg-gray-200 rounded-md animate-pulse mb-12"></div>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {[1, 2].map(i => (
            <div key={i} className="flex-1 max-w-md border border-gray-200 rounded-xl p-6 space-y-4">
              <div className="h-8 w-32 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-12 w-40 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="pt-4">
                {[1, 2, 3, 4].map(j => (
                  <div key={j} className="flex items-center space-x-2 py-2">
                    <div className="h-5 w-5 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="h-4 w-2/3 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                ))}
              </div>
              <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    ),
    
    // Default skeleton
    default: (
      <div className="flex items-center justify-center w-full min-h-[300px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    )
  };
  
  return skeletons[type] || skeletons.default;
};

// Enhanced trust badge component
const TrustBadge = ({ text, icon, className = "" }) => (
  <div className={`inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm border border-gray-100 ${className}`}>
    {icon}
    <span>{text}</span>
  </div>
);

// User activity tracker hook for personalized experiences
const useUserActivity = () => {
  const [userActivity, setUserActivity] = useState({
    scrollDepth: 0,
    timeOnPage: 0,
    sectionViews: {},
    hasInteracted: false,
  });
  
  useEffect(() => {
    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      setUserActivity(prev => ({
        ...prev,
        scrollDepth: Math.round(scrollPercentage),
        hasInteracted: true,
      }));
    };
    
    // Track time on page
    const timeInterval = setInterval(() => {
      setUserActivity(prev => ({
        ...prev,
        timeOnPage: prev.timeOnPage + 1,
      }));
    }, 1000);
    
    // Track user interactions
    const handleInteraction = () => {
      setUserActivity(prev => ({
        ...prev,
        hasInteracted: true,
      }));
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      clearInterval(timeInterval);
    };
  }, []);
  
  return userActivity;
};

const Index = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showGlowDialog, setShowGlowDialog] = useState(false);
  const [hasInteractedWithCTA, setHasInteractedWithCTA] = useState(false);
  const userActivity = useUserActivity();
  
  // Determine if user is on a mobile device
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check for mobile device on client side
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    // Show banner after a short delay to avoid layout shift during critical rendering
    const bannerTimer = setTimeout(() => {
      setShowBanner(true);
    }, 300);
    
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisited');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date().getTime();
    
    // Only show dialog if user hasn't visited or it's been more than 7 days
    const showDialog = !hasVisited || (lastVisit && (now - parseInt(lastVisit)) > 7 * 24 * 60 * 60 * 1000);
    
    if (showDialog) {
      // Delay dialog to allow user to see the page first
      const dialogTimer = setTimeout(() => {
        setShowGlowDialog(true);
      }, 5000); // 5 seconds delay
      
      return () => clearTimeout(dialogTimer);
    }
    
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
    }
    localStorage.setItem('lastVisit', now.toString());
    
    return () => clearTimeout(bannerTimer);
  }, []);
  
  // Smart dialog trigger based on user activity
  useEffect(() => {
    // If user has scrolled more than 70% without interacting with CTA, show dialog
    if (
      userActivity.scrollDepth > 70 && 
      userActivity.timeOnPage > 30 && // 30 seconds on page
      !hasInteractedWithCTA &&
      !showGlowDialog
    ) {
      setShowGlowDialog(true);
    }
  }, [userActivity, hasInteractedWithCTA, showGlowDialog]);
  
  const handleTryNowClick = () => {
    setShowGlowDialog(true);
    setHasInteractedWithCTA(true);
    
    // Track conversion intent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion_intent', {
        'event_category': 'engagement',
        'event_label': 'try_now_click'
      });
    }
  };
  
  // Enhanced styling for consistent buttons
  const buttonStyles = {
    primary: "bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold border border-amber-300 shadow-sm transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-amber-300 focus:ring-offset-2",
    secondary: "bg-white hover:bg-gray-50 text-gray-800 font-medium border border-gray-200 shadow-sm transition-all duration-200 hover:shadow focus:ring-2 focus:ring-gray-200 focus:ring-offset-2",
    tertiary: "bg-transparent hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200 hover:text-gray-900 focus:ring-2 focus:ring-gray-200 focus:ring-offset-2",
    cta: "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-gray-900 font-bold shadow-sm transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5 focus:ring-2 focus:ring-amber-300 focus:ring-offset-2",
  };
  
  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-hidden">
      <Header />
      
      {/* Enhanced Banner with Countdown Timer */}
      {showBanner && (
        <div className="sticky top-0 z-50">
          <Banner 
            variant="purple" 
            size="lg" 
            action={
              <Button 
                variant="secondary" 
                size="sm" 
                className={`whitespace-nowrap px-3 py-1.5 sm:px-5 sm:py-2 ${buttonStyles.primary}`}
                onClick={handleTryNowClick}
                aria-label="Get Early Access"
              >
                <span className="flex items-center gap-2">
                  <span className="hidden sm:inline-block">Get Early Access</span>
                  <span className="sm:hidden">Join Now</span>
                  <span className="text-xs font-normal bg-amber-200/50 px-1.5 py-0.5 rounded-full">Limited</span>
                </span>
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
              <div className="hidden sm:flex items-center gap-1 text-xs bg-purple-800/60 px-2 py-1 rounded-full text-purple-100">
                <span>Early Access:</span>
                <span className="font-mono font-bold">48:00:00</span>
              </div>
            </div>
          </Banner>
        </div>
      )}

      <main className="flex-1 w-full overflow-hidden bg-gradient-to-b from-white via-white to-gray-50">
        {/* Hero Section - Optimized with social proof */}
        <Section 
          withContainer={false} 
          className="pt-8 md:pt-12 pb-12 md:pb-20"
          background="bg-white"
          animationDirection="fade"
          priority="high"
          decorations={
            <Spotlight 
              className="from-purple-500/20 via-violet-500/20 to-blue-500/20" 
              size={400} 
            />
          }
        >
          <div className="container mx-auto">
            <Hero />
            
            {/* Added Trust Badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              <TrustBadge 
                text="100% Secure" 
                icon={<ShieldCheck className="h-3.5 w-3.5 text-green-500" />} 
              />
              <TrustBadge 
                text="Early Access Pricing" 
                icon={<Star className="h-3.5 w-3.5 text-amber-500" />} 
              />
              <TrustBadge 
                text="24/7 Support" 
                icon={<CheckCircle className="h-3.5 w-3.5 text-blue-500" />} 
              />
            </div>
          </div>
        </Section>

        {/* How It Works Section - Enhanced with progress indicators */}
        <Section 
          id="how-it-works" 
          background="bg-[#f8f9ff] border-y border-gray-100"
          animationDirection="up"
          priority="medium"
          decorations={
            <>
              {!isMobile && (
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
              )}
              <Spotlight 
                className="from-blue-500/20 via-cyan-500/20 to-teal-500/20" 
                size={350} 
              />
            </>
          }
        >
          <Suspense fallback={<SkeletonLoader type="howItWorks" />}>
            <HowItWorksSection />
          </Suspense>
          
          {/* Added Social Proof */}
          <div className="mt-12 flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-4">Trusted by companies worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 grayscale opacity-60 hover:opacity-100 transition-opacity duration-300">
              {/* Company logos would go here - using placeholders */}
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-8 w-20 bg-gray-200 rounded-md" />
              ))}
            </div>
          </div>
        </Section>
            
        {/* Featured Creators Section - Enhanced with context */}
        <Section 
          background="bg-zinc-800" 
          className="py-8 md:py-14 lg:py-20"
          animationDirection="left"
        >
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" id="featured-creators-heading">
              Discover Trending Creators
            </h2>
            <p className="text-zinc-300 max-w-2xl mx-auto">
              Connect with top performers in your industry and see how they're using our platform to accelerate growth
            </p>
          </div>
          
          <Suspense fallback={<SkeletonLoader type="preview" />}>
            <PreviewSearch />
          </Suspense>
          
          {/* Testimonial addition */}
          <div className="mt-12 max-w-lg mx-auto bg-zinc-700/50 rounded-lg p-6 border border-zinc-600">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-amber-400 flex items-center justify-center text-lg font-bold text-zinc-900">
                JD
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-white">Jessica Doyle</h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-zinc-300 text-sm italic">
                  "This platform has transformed how I connect with my audience. My engagement has increased 3x since joining."
                </p>
              </div>
            </div>
          </div>
        </Section>
        
        {/* Professional Content Creation Services - Optimized with benefits */}
        <Section 
          background="bg-[#F1F0FB] border-y border-gray-100"
          animationDirection="right"
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
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900" id="features-heading">
              Create Content That Converts
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered tools help you create professional content that engages your audience and drives results
            </p>
          </div>
          
          <Suspense fallback={<SkeletonLoader type="features" />}>
            <FeaturesSectionWithHoverEffects />
          </Suspense>
          
          {/* Added "As featured in" section */}
          <div className="mt-16 text-center">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">As featured in</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {/* Media logos would go here - using placeholders */}
              {[1, 2, 3].map(i => (
                <div key={i} className="h-8 w-24 bg-gray-200 rounded-md" />
              ))}
            </div>
          </div>
        </Section>

        {/* Pricing Section - Enhanced with trust elements */}
        <Section 
          id="pricing" 
          background="bg-white border-b border-gray-100"
          animationDirection="up"
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full bg-indigo-50 border border-indigo-100">
              <span className="text-sm font-medium text-indigo-700">Early Access Pricing</span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-indigo-100 text-xs font-bold text-indigo-800">
                Save 50%
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900" id="pricing-heading">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade as you grow. No hidden fees or commitments.
            </p>
          </div>
          
          <Suspense fallback={<SkeletonLoader type="pricing" />}>
            <Pricing />
          </Suspense>
          
          {/* Added Trust Elements */}
          <div className="mt-12 max-w-3xl mx-auto bg-gray-50 rounded-lg p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                <span>No credit card required to start</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Final CTA Section - Enhanced with urgency */}
        <Section 
          background="bg-gradient-to-b from-white to-[#F6F6F7]"
          className="py-14 md:py-20 lg:py-28"
          animationDirection="fade"
          decorations={
            <Spotlight 
              className="from-purple-500/20 via-pink-500/20 to-red-500/20" 
              size={350} 
            />
          }
        >
          {/* Custom CTA with countdown and limited spots indicator */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full bg-pink-50 border border-pink-100">
              <span className="text-sm font-medium text-pink-700">Limited Time Offer</span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-pink-100 text-xs font-bold text-pink-800">
                First 100 Users
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight">
              Ready to Transform Your <br className="hidden sm:block" />
              <span className="text-amber-500">Content Creation</span> Experience?
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join our early access program today and get exclusive benefits available only to founding members.
            </p>
            
            {/* Enhanced CTA with countdown */}
            <div className="flex flex-col items-center">
              <div className="mb-8 max-w-xs w-full">
                <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
                  <p className="mb-2 text-sm font-medium text-gray-700">Early Access Closes In:</p>
                  <div className="grid grid-cols-4 gap-1">
                    {['48', '23', '59', '41'].map((num, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="bg-gray-100 rounded-md p-2 w-full text-center">
                          <span className="text-lg font-mono font-bold text-gray-900">{num}</span>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          {['Days', 'Hours', 'Mins', 'Secs'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className={`px-8 py-6 text-lg ${buttonStyles.cta}`}
                  onClick={handleTryNowClick}
                >
                  Get Early Access Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className={`px-8 py-6 text-lg ${buttonStyles.secondary}`}
                >
                  Schedule Demo
                </Button>
              </div>
              
              <p className="mt-6 text-sm text-gray-500">
                Only <span className="font-bold text-amber-600">17 spots</span> left at this price!
              </p>
            </div>
          </div>
        </Section>

        <Footer />
      </main>
      
      {/* Enhanced Bottom Nav for mobile */}
      <div className="block sm:hidden">
        <BottomNav />
      </div>
      
      {/* Enhanced Glow Dialog with better conversion elements */}
      <GlowDialog 
        open={showGlowDialog} 
        onOpenChange={setShowGlowDialog} 
        // Additional props would be passed to GlowDialog to enhance conversion
      />
    </div>
  );
};

export default Index;
