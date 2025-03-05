import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet'; // Added for SEO
import Header from '../components/Header';
import { Hero } from '../components/Hero';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import { BottomNav } from '../components/navigation/BottomNav';
import { Banner } from '@/components/ui/banner';
import { Button } from '@/components/ui/button';
import { Star, Clock, Users, ShieldCheck } from 'lucide-react';
import { GlowDialog } from '@/components/ui/glow-dialog';
import { Spotlight } from '@/components/ui/spotlight';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { Waves } from '@/components/ui/waves';
import { SocialProof } from '@/components/ui/social-proof'; // New component for logo carousel
import { Testimonial } from '@/components/ui/testimonial'; // New component for testimonials
import { ErrorBoundary } from '@/components/ui/error-boundary'; // New component for error handling
import { CountdownTimer } from '@/components/ui/countdown-timer'; // New component for urgency

// Lazy load heavy components with specific fallbacks
const PreviewSearch = lazy(() => import('../components/PreviewSearch'));
const HowItWorksSection = lazy(() => import('../components/HowItWorksSection'));
const FeaturesSection = lazy(() => import('@/components/Features')); // Renamed for clarity
const Pricing = lazy(() => import('@/components/Pricing'));

// Content-aware skeleton loaders for each section
const HeroSkeleton = () => (
  <div className="w-full max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="w-full md:w-1/2 space-y-4">
        <div className="h-12 bg-gray-200 rounded-md animate-pulse w-3/4"></div>
        <div className="h-8 bg-gray-200 rounded-md animate-pulse w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4"></div>
        <div className="h-12 bg-gray-200 rounded-md animate-pulse w-1/3 mt-6"></div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="aspect-video bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    </div>
  </div>
);

const HowItWorksSkeleton = () => (
  <div className="w-full max-w-6xl mx-auto">
    <div className="h-10 bg-gray-200 rounded-md animate-pulse w-1/3 mx-auto mb-12"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col space-y-4">
          <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded-md animate-pulse w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-4/5 mx-auto"></div>
        </div>
      ))}
    </div>
  </div>
);

const FeaturesSkeleton = () => (
  <div className="w-full max-w-6xl mx-auto">
    <div className="h-10 bg-gray-200 rounded-md animate-pulse w-1/3 mx-auto mb-12"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex space-x-4 p-4 rounded-lg bg-white/50 animate-pulse">
          <div className="h-12 w-12 bg-gray-200 rounded-md"></div>
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PricingSkeleton = () => (
  <div className="w-full max-w-6xl mx-auto">
    <div className="h-10 bg-gray-200 rounded-md animate-pulse w-1/3 mx-auto mb-12"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow-md animate-pulse">
          <div className="h-8 bg-gray-200 rounded-md w-1/2 mb-4"></div>
          <div className="h-12 bg-gray-200 rounded-md w-3/4 mb-6"></div>
          {[1, 2, 3, 4].map((j) => (
            <div key={j} className="flex space-x-2 mb-3">
              <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
              <div className="h-5 bg-gray-200 rounded-md w-5/6"></div>
            </div>
          ))}
          <div className="h-12 bg-gray-200 rounded-md w-full mt-6"></div>
        </div>
      ))}
    </div>
  </div>
);

// Create a standardized Section component with improved structure and accessibility
const Section = ({ 
  id, 
  children, 
  className = "", 
  withContainer = true,
  background = "bg-white",
  decorations = null,
  containerClassName = "",
  ariaLabel = "",
  hasBottomCta = false,
  bottomCtaText = "Get Started",
  onBottomCtaClick = () => {}
}) => (
  <section 
    id={id} 
    className={`relative w-full py-10 md:py-16 lg:py-24 overflow-hidden ${background} ${className}`}
    aria-label={ariaLabel}
  >
    {decorations && <div className="absolute inset-0 pointer-events-none">{decorations}</div>}
    <div className={`relative z-10 ${withContainer ? 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl' : ''} ${containerClassName}`}>
      {children}
      
      {hasBottomCta && (
        <div className="mt-12 text-center">
          <Button 
            onClick={onBottomCtaClick}
            size="lg" 
            className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold border border-amber-300 shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            {bottomCtaText}
          </Button>
        </div>
      )}
    </div>
  </section>
);

const Index = () => {
  // Enhanced state management
  const [showBanner, setShowBanner] = useState(false);
  const [showGlowDialog, setShowGlowDialog] = useState(false);
  const [isExitIntentShown, setIsExitIntentShown] = useState(false);
  const [remainingSpots, setRemainingSpots] = useState(27); // Create scarcity
  
  // Track section visibility for analytics
  const [visibleSections, setVisibleSections] = useState({});
  
  useEffect(() => {
    // Improved banner display strategy
    const hasClosedBanner = localStorage.getItem('hasClosedBanner');
    if (!hasClosedBanner) {
      // Show banner with slight delay to prevent layout shift during critical rendering
      const bannerTimer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(bannerTimer);
    }
    
    // Exit intent detection
    const handleMouseLeave = (e) => {
      if (
        e.clientY <= 0 && 
        !localStorage.getItem('hasShownExitIntent') && 
        !isExitIntentShown
      ) {
        setIsExitIntentShown(true);
        setShowGlowDialog(true);
        localStorage.setItem('hasShownExitIntent', 'true');
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [isExitIntentShown]);
  
  // Use Intersection Observer for section visibility tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.3 }
    );
    
    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, []);
  
  const handleCloseBanner = () => {
    setShowBanner(false);
    localStorage.setItem('hasClosedBanner', 'true');
  };
  
  const handleTryNowClick = () => {
    setShowGlowDialog(true);
    // Analytics tracking
    if (window.gtag) {
      window.gtag('event', 'click', {
        'event_category': 'conversion',
        'event_label': 'try_now_button'
      });
    }
  };
  
  // Standardized button styling with variants
  const buttonVariants = {
    primary: "bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold border border-amber-300 shadow-sm transition-all duration-200 hover:scale-105",
    secondary: "bg-white hover:bg-gray-50 text-gray-900 font-medium border border-gray-200 shadow-sm transition-all duration-200",
    tertiary: "bg-transparent hover:bg-gray-100 text-gray-700 font-medium transition-all duration-200"
  };
  
  return (
    <>
      <Helmet>
        <title>The AI-Powered Creator Marketplace | Find & Hire Top Talent</title>
        <meta name="description" content="Connect with AI-enhanced creative professionals. Our marketplace helps you find and hire the perfect talent for your project with smart matching technology." />
        <meta property="og:title" content="The AI-Powered Creator Marketplace" />
        <meta property="og:description" content="Find and hire the perfect creative professionals with our AI-powered marketplace." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://yourmarketplace.com" />
        
        {/* Structured data for rich search results */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AI Creator Marketplace",
              "url": "https://yourmarketplace.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://yourmarketplace.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
      </Helmet>

      <div className="flex flex-col min-h-screen w-full max-w-full overflow-hidden">
        <Header />
        
        {/* Enhanced Banner with more compelling CTA */}
        {showBanner && (
          <div className="sticky top-0 z-50">
            <Banner 
              variant="purple" 
              size="lg" 
              action={
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex items-center text-amber-300 text-xs font-semibold">
                    <Clock className="h-3 w-3 mr-1" />
                    Limited time offer
                  </span>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className={`whitespace-nowrap px-3 py-1.5 sm:px-5 sm:py-2 ${buttonVariants.primary}`}
                    onClick={handleTryNowClick}
                  >
                    Get 50% Off Early Access
                  </Button>
                </div>
              } 
              layout="complex" 
              isClosable 
              onClose={handleCloseBanner}
              className="animate-in fade-in slide-in-from-top duration-300"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Star className="h-4 w-4 text-yellow-300 animate-pulse" />
                <AnimatedShinyText className="text-sm sm:text-base font-bold text-white">
                  Only <span className="text-amber-300">{remainingSpots} spots left</span> for our founder's membership!
                </AnimatedShinyText>
              </div>
            </Banner>
          </div>
        )}

        <main className="flex-1 w-full overflow-hidden">
          {/* Hero Section - Enhanced with social proof */}
          <Section 
            id="hero"
            withContainer={true}
            className="pt-8 md:pt-12 pb-8 md:pb-16"
            background="bg-gradient-to-b from-white to-gray-50"
            ariaLabel="Marketplace Overview"
            decorations={
              <Spotlight 
                className="from-purple-500/10 via-violet-500/10 to-blue-500/10" 
                size={400} 
              />
            }
          >
            <ErrorBoundary fallback={<HeroSkeleton />}>
              <Hero />
              
              {/* Added social proof */}
              <div className="mt-8 md:mt-12">
                <p className="text-sm text-gray-500 text-center mb-4">Trusted by innovative teams at:</p>
                <SocialProof 
                  logos={['google', 'microsoft', 'airbnb', 'spotify', 'slack']}
                  grayscale={true}
                  className="max-w-4xl mx-auto"
                />
              </div>
            </ErrorBoundary>
          </Section>

          {/* How It Works Section - Enhanced with step indicators */}
          <Section 
            id="how-it-works" 
            background="bg-[#f8f9ff] border-y border-gray-100"
            ariaLabel="How the marketplace works"
            hasBottomCta={true}
            bottomCtaText="Start Creating Now"
            onBottomCtaClick={handleTryNowClick}
            decorations={
              <>
                <Waves 
                  lineColor="rgba(147, 112, 219, 0.1)" 
                  backgroundColor="#f8f9ff" 
                  waveSpeedX={0.01} 
                  waveSpeedY={0.008} 
                  waveAmpX={20} 
                  waveAmpY={10} 
                  xGap={20} 
                  yGap={35} 
                  className="opacity-50" 
                />
              </>
            }
          >
            <Suspense fallback={<HowItWorksSkeleton />}>
              <HowItWorksSection />
            </Suspense>
          </Section>
              
          {/* Featured Creators Section - Enhanced with testimonials */}
          <Section 
            id="creators"
            background="bg-zinc-800" 
            className="py-12 md:py-16 lg:py-24"
            ariaLabel="Featured creators and talent"
          >
            <Suspense fallback={
              <div className="text-white text-center">
                <div className="h-10 bg-zinc-700 rounded-md w-1/3 mx-auto mb-8 animate-pulse"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  {Array(8).fill(0).map((_, i) => (
                    <div key={i} className="aspect-square bg-zinc-700 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            }>
              <PreviewSearch />
              
              {/* Added testimonial slider */}
              <div className="mt-16 max-w-4xl mx-auto">
                <h3 className="text-white text-xl md:text-2xl font-semibold text-center mb-8">What our clients say</h3>
                <Testimonial 
                  quotes={[
                    {
                      text: "We found a perfect designer within hours, not weeks. The AI matching is truly revolutionary.",
                      author: "Sarah Johnson",
                      role: "Marketing Director, TechCorp",
                      avatar: "/testimonials/sarah.jpg",
                      rating: 5
                    },
                    {
                      text: "As a creator, this platform has connected me with ideal clients who value my specific skills.",
                      author: "Michael Chen",
                      role: "UX Designer & Illustrator",
                      avatar: "/testimonials/michael.jpg",
                      rating: 5
                    },
                    {
                      text: "The quality of talent and the speed of matching is unparalleled. This has become our go-to resource.",
                      author: "David Wilson",
                      role: "Product Lead, StartupLabs",
                      avatar: "/testimonials/david.jpg",
                      rating: 5
                    }
                  ]}
                  theme="dark"
                  autoplay={true}
                  interval={5000}
                />
              </div>
            </Suspense>
          </Section>
          
          {/* Professional Content Creation Services - Enhanced with trust signals */}
          <Section 
            id="features"
            background="bg-[#F6F7FF] border-y border-gray-100"
            ariaLabel="Platform features and benefits"
            hasBottomCta={true}
            bottomCtaText="Explore All Features"
            onBottomCtaClick={handleTryNowClick}
            decorations={
              <div className="absolute inset-0 bg-[radial-gradient(#e0e1ff_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
            }
          >
            <Suspense fallback={<FeaturesSkeleton />}>
              <FeaturesSection />
              
              {/* Added trust indicators */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  {
                    icon: <ShieldCheck className="h-8 w-8 text-green-500" />,
                    title: "100% Secure Payments",
                    description: "All transactions are encrypted and processed securely through our platform."
                  },
                  {
                    icon: <Star className="h-8 w-8 text-amber-500" />,
                    title: "Verified Professionals",
                    description: "Every creator is vetted and verified for quality and professionalism."
                  },
                  {
                    icon: <Users className="h-8 w-8 text-blue-500" />,
                    title: "24/7 Support",
                    description: "Our support team is available around the clock to assist with any questions."
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition-shadow">
                    <div className="mx-auto flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </Suspense>
          </Section>

          {/* Pricing Section - Enhanced with urgency indicators */}
          <Section 
            id="pricing" 
            background="bg-white border-b border-gray-100"
            ariaLabel="Pricing plans and options"
            decorations={
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f3f3_1px,transparent_1px),linear-gradient(to_bottom,#f3f3f3_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
            }
          >
            <Suspense fallback={<PricingSkeleton />}>
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Perfect Plan</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Start with our free tier or upgrade for advanced features. All plans come with our AI-powered matching.
                </p>
                
                {/* Urgency indicator */}
                <div className="mt-6 inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Early bird pricing ends in:</span>
                  <CountdownTimer 
                    endDate={new Date(Date.now() + 1000 * 60 * 60 * 24 * 3)} // 3 days from now
                    className="ml-2 font-bold"
                  />
                </div>
              </div>
              
              <Pricing />
              
              {/* Added payment trust signals */}
              <div className="mt-12 text-center">
                <div className="flex flex-wrap justify-center items-center gap-3 max-w-md mx-auto">
                  <img src="/payment/visa.svg" alt="Visa" className="h-6" />
                  <img src="/payment/mastercard.svg" alt="Mastercard" className="h-6" />
                  <img src="/payment/amex.svg" alt="American Express" className="h-6" />
                  <img src="/payment/paypal.svg" alt="PayPal" className="h-6" />
                  <img src="/payment/stripe.svg" alt="Stripe" className="h-6" />
                </div>
                <p className="text-xs text-gray-500 mt-4 flex items-center justify-center">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Secure payments provided by Stripe. 30-day money-back guarantee.
                </p>
              </div>
            </Suspense>
          </Section>

          {/* Final CTA Section - Enhanced with scarcity */}
          <Section 
            id="cta"
            background="bg-gradient-to-b from-[#f6f9ff] to-[#e9f0ff]"
            className="py-16 md:py-24 lg:py-32"
            ariaLabel="Sign up call to action"
            decorations={
              <Spotlight 
                className="from-blue-400/20 via-indigo-400/20 to-purple-400/20" 
                size={350} 
              />
            }
          >
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full mb-4">
                Limited Time Offer
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Join the Revolution in Creative Collaboration
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Be among the first to experience our AI-powered marketplace. Early adopters receive lifetime discounts and premium features.
              </p>
              
              {/* Added scarcity element */}
              <div className="mb-8 p-4 bg-white/70 backdrop-blur-sm rounded-lg inline-block">
                <p className="text-sm font-medium text-gray-800 mb-2">Founder's membership filling up fast</p>
                <div className="w-72 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" style={{width: '73%'}}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Only {remainingSpots} spots remaining at this price</p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  className={`${buttonVariants.primary} text-lg px-8 py-6 w-full sm:w-auto`}
                  onClick={handleTryNowClick}
                >
                  Secure Your Spot Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className={`${buttonVariants.secondary} text-lg px-8 py-6 w-full sm:w-auto`}
                >
                  Schedule a Demo
                </Button>
              </div>
              
              {/* Added final social proof */}
              <p className="mt-8 text-sm text-gray-500 flex items-center justify-center">
                <Star className="h-4 w-4 text-amber-400 mr-1" />
                Trusted by 10,000+ creators and businesses worldwide
              </p>
            </div>
          </Section>

          <Footer />
        </main>
        
        {/* Enhanced Bottom Nav with primary CTA */}
        <div className="block sm:hidden">
          <BottomNav 
            primaryAction={{
              label: "Get Started",
              onClick: handleTryNowClick,
              className: buttonVariants.primary
            }}
          />
        </div>
        
        {/* Enhanced Dialog with email capture and countdown */}
        <GlowDialog 
          open={showGlowDialog} 
          onOpenChange={setShowGlowDialog}
          title="Exclusive Early Access"
          description="Join our limited founder's program and get 50% off forever."
          showEmailCapture={true}
          showCountdown={true}
          countdownEndDate={new Date(Date.now() + 1000 * 60 * 60 * 24 * 3)} // 3 days from now
          countdownLabel="Early bird offer ends in:"
          buttonText="Claim Your Discount"
          benefitsList={[
            "50% lifetime discount on all plans",
            "Priority access to new features",
            "Dedicated account manager",
            "Free strategy session"
          ]}
        />
      </div>
    </>
  );
};

export default Index;
