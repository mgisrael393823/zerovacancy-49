import React, { memo, useState, useEffect } from 'react';
import { Search, Users, CreditCard, FileCheck } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion'; // Assuming framer-motion is installed

// Enhanced step content with more compelling descriptions
const steps = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Discover Creators",
    description: "Easily find your perfect match using advanced filters for style, expertise, and budget"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Review Portfolios",
    description: "Explore verified portfolios, client reviews, and case studies to make confident decisions"
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Book & Pay Securely",
    description: "Schedule your project and pay with confidence through our encrypted payment system"
  },
  {
    icon: <FileCheck className="w-6 h-6" />,
    title: "Receive Quality Content",
    description: "Get your deliverables with our satisfaction guarantee and dedicated support"
  }
];

const HowItWorksComponent = () => {
  // Track which step is active for animated focus on mobile/smaller screens
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check viewport width to adapt the experience
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Auto-cycle through steps on mobile for better engagement
    let interval;
    if (isMobile) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3000);
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
    };
  }, [isMobile]);

  return (
    <section className="section-padding bg-secondary/30 py-16 overflow-hidden" aria-label="How our platform works">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Enhanced headline and subheading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Your Content Journey Simplified
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-base md:text-lg">
          Connect with elite creators in four easy steps — from discovery to delivery
        </p>

        {/* Progress indicator for desktop */}
        <div className="hidden lg:flex justify-center mb-8">
          <div className="relative w-3/4 h-1 bg-secondary/50 rounded-full">
            <div className="absolute h-1 bg-primary rounded-full" style={{ width: '100%' }}></div>
            {steps.map((_, index) => (
              <div
                key={`step-indicator-${index}`}
                className="absolute w-5 h-5 rounded-full bg-primary -mt-2"
                style={{ left: `${(index / (steps.length - 1)) * 100}%` }}
              >
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-medium">
                  Step {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps grid with enhanced visual flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={`step-${index}`}
              className={`relative p-6 rounded-lg bg-background hover:shadow-xl transition-all duration-300 border border-transparent ${
                activeStep === index && isMobile ? 'border-primary shadow-md' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveStep(index)}
            >
              {/* Visual connector between steps (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-secondary/70 z-10">
                  <div className="absolute right-0 w-2 h-2 rotate-45 border-t-0 border-l-0 border-r border-b border-secondary/70 -mt-0.5"></div>
                </div>
              )}
              
              <div className="flex flex-col items-center text-center space-y-4 relative">
                {/* Step number badge */}
                <span className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                  {index + 1}
                </span>

                {/* Icon with enhanced animation */}
                <motion.div 
                  className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {step.icon}
                </motion.div>
                
                {/* Title with stronger visual hierarchy */}
                <h3 className="font-bold text-lg">{step.title}</h3>
                
                {/* More detailed description */}
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA with enhanced button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="px-8 py-6 text-base font-semibold hover:scale-105 transition-transform duration-300"
          >
            Start Creating Now
          </Button>
          
          {/* Trust indicator */}
          <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Secure platform • No upfront fees • 100% satisfaction guarantee
          </p>
        </div>
      </div>
    </section>
  );
};

// Use React.memo to prevent unnecessary re-renders
const HowItWorks = memo(HowItWorksComponent);

export default HowItWorks;
