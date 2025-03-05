import React, { useState, useEffect, useRef } from 'react';
import { Search, Users, FileCheck, Calendar, Check, ArrowRight, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// Define colorful backgrounds for each step with enhanced styling options
const stepColors = [{
  iconBg: "bg-violet-100",
  iconText: "text-violet-600",
  numBg: "bg-violet-600",
  numText: "text-white",
  lineColor: "from-violet-600/70 to-blue-500/50",
  borderColor: "border-violet-200",
  glowColor: "shadow-violet-500/20",
  tintBg: "bg-violet-50/10",
  gradient: "bg-gradient-to-br from-violet-50 to-violet-100",
  lightText: "text-violet-700"
}, {
  iconBg: "bg-blue-100",
  iconText: "text-blue-600",
  numBg: "bg-blue-600",
  numText: "text-white",
  lineColor: "from-blue-500/70 to-amber-600/50",
  borderColor: "border-blue-200",
  glowColor: "shadow-blue-500/20",
  tintBg: "bg-blue-50/10",
  gradient: "bg-gradient-to-br from-blue-50 to-blue-100",
  lightText: "text-blue-700"
}, {
  iconBg: "bg-amber-100",
  iconText: "text-amber-600",
  numBg: "bg-amber-600",
  numText: "text-white",
  lineColor: "from-amber-600/70 to-emerald-600/50",
  borderColor: "border-amber-200",
  glowColor: "shadow-amber-500/20",
  tintBg: "bg-amber-50/10",
  gradient: "bg-gradient-to-br from-amber-50 to-amber-100",
  lightText: "text-amber-700"
}, {
  iconBg: "bg-emerald-100",
  iconText: "text-emerald-600",
  numBg: "bg-emerald-600",
  numText: "text-white",
  lineColor: "from-emerald-600/50 to-emerald-600/10",
  borderColor: "border-emerald-200",
  glowColor: "shadow-emerald-500/20",
  tintBg: "bg-emerald-50/10",
  gradient: "bg-gradient-to-br from-emerald-50 to-emerald-100",
  lightText: "text-emerald-700"
}];

// Component for desktop connecting lines between steps - visual flow indicators
const ConnectingLines = () => {
  return <div className="absolute top-16 left-0 w-full z-0 hidden lg:block pointer-events-none">
      {/* First connector line - violet to blue */}
      <motion.div className="absolute top-8 left-[23%] w-[18%] h-1 bg-gradient-to-r from-violet-500 to-blue-500" initial={{
      scaleX: 0,
      transformOrigin: "left"
    }} whileInView={{
      scaleX: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }} viewport={{
      once: true,
      margin: "-100px"
    }}>
        <motion.div className="absolute -right-3 -top-[7px] text-blue-500" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1,
        transition: {
          delay: 1.1
        }
      }} viewport={{
        once: true
      }}>
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </motion.div>
      
      {/* Second connector line - blue to amber */}
      <motion.div className="absolute top-8 left-[48%] w-[18%] h-1 bg-gradient-to-r from-blue-500 to-amber-500" initial={{
      scaleX: 0,
      transformOrigin: "left"
    }} whileInView={{
      scaleX: 1,
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: "easeOut"
      }
    }} viewport={{
      once: true,
      margin: "-100px"
    }}>
        <motion.div className="absolute -right-3 -top-[7px] text-amber-500" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1,
        transition: {
          delay: 1.4
        }
      }} viewport={{
        once: true
      }}>
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </motion.div>
      
      {/* Third connector line - amber to emerald */}
      <motion.div className="absolute top-8 left-[73%] w-[18%] h-1 bg-gradient-to-r from-amber-500 to-emerald-500" initial={{
      scaleX: 0,
      transformOrigin: "left"
    }} whileInView={{
      scaleX: 1,
      transition: {
        duration: 0.8,
        delay: 0.9,
        ease: "easeOut"
      }
    }} viewport={{
      once: true,
      margin: "-100px"
    }}>
        <motion.div className="absolute -right-3 -top-[7px] text-emerald-500" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1,
        transition: {
          delay: 1.7
        }
      }} viewport={{
        once: true
      }}>
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </div>;
};

// Pro tip component for adding trustworthy guidance to each step
const ProTip = ({ tip, colorClass }) => {
  return (
    <motion.div 
      className={cn(
        "flex items-center mt-2 text-xs", 
        "px-2 py-1 rounded-md", 
        "bg-white/60 backdrop-blur-sm",
        colorClass
      )}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { delay: 0.3, duration: 0.4 }
      }}
      viewport={{ once: true }}
    >
      <Lightbulb className="w-3 h-3 mr-1 flex-shrink-0" />
      <span className="leading-tight">{tip}</span>
    </motion.div>
  );
};

const HowItWorksSection = () => {
  const isMobile = useIsMobile();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const controls = useAnimation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  // Simulate completed steps (in a real app, this would come from user progress data)
  useEffect(() => {
    const savedProgress = localStorage.getItem('howItWorksProgress');
    if (savedProgress) {
      setCompletedSteps(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    // Animate elements when they come into view
    controls.start("visible");
    
    // Calculate max scroll width for horizontal scroll
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const clientWidth = scrollContainerRef.current.clientWidth;
      setMaxScroll(scrollWidth - clientWidth);
    }
  }, [controls]);

  // Scroll handlers for mobile horizontal scroll - improved touch experience
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      const newPosition = Math.max(0, scrollPosition - 220);
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const newPosition = Math.min(maxScroll, scrollPosition + 220);
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  // Updated steps with more compelling, outcome-focused descriptions
  const steps = [{
    icon: <Search className="w-5 h-5" />,
    title: "Discover Creators",
    description: "Filter and find your perfect match based on style, budget, and delivery time",
    proTip: "Use specific keywords for better matches",
    number: "01"
  }, {
    icon: <Users className="w-5 h-5" />,
    title: "Compare Options",
    description: "Browse portfolios and verified reviews to select your ideal creative partner",
    proTip: "Check recent projects similar to yours",
    number: "02"
  }, {
    icon: <Calendar className="w-5 h-5" />,
    title: "Secure Booking",
    description: "Schedule with confidence using our protected payment system",
    proTip: "Payment is only released when you're satisfied",
    number: "03"
  }, {
    icon: <FileCheck className="w-5 h-5" />,
    title: "Receive Results",
    description: "Get high-quality deliverables and request revisions through our streamlined process",
    proTip: "All work comes with revision options",
    number: "04"
  }];

  return (
    <section className="relative overflow-hidden py-8 sm:py-14 px-4 sm:px-6 lg:px-[28px] bg-gradient-to-b from-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto py-0 px-px">
        <div className="text-center mb-6 sm:mb-14">
          <motion.h3 
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-3 sm:mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            viewport={{ once: true }}
          >
            Create Amazing Content in 4 Simple Steps
          </motion.h3>
          <motion.p 
            className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
            viewport={{ once: true }}
          >
            From finding the perfect creator to receiving your content — we make it easy
          </motion.p>
        </div>
        
        {/* Mobile horizontal scroll layout - enhanced for better touch interaction */}
        <div className="md:hidden w-full relative mb-3">
          {/* Scroll navigation buttons - enlarged for better touch targets */}
          <div className="flex justify-between absolute -left-1 -right-1 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
            <button 
              onClick={handleScrollLeft} 
              className={cn(
                "w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center pointer-events-auto",
                scrollPosition <= 10 ? "opacity-40" : "opacity-90"
              )}
              disabled={scrollPosition <= 10}
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              onClick={handleScrollRight} 
              className={cn(
                "w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center pointer-events-auto",
                scrollPosition >= maxScroll - 10 ? "opacity-40" : "opacity-90"
              )}
              disabled={scrollPosition >= maxScroll - 10}
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          
          {/* Horizontal scroll container - optimized for mobile experience */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 px-1"
            onScroll={handleScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                initial={{
                  opacity: 0,
                  y: 10
                }} 
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    duration: 0.5,
                    delay: index * 0.1
                  }
                }}
                whileTap={{
                  scale: 0.98,
                }}
                viewport={{
                  once: true,
                  margin: "-10px"
                }} 
                className={cn(
                  "relative",
                  "flex-shrink-0 w-[260px] min-h-[150px]", 
                  "p-4",
                  "rounded-xl",
                  "shadow-md", 
                  "border",
                  stepColors[index].borderColor,
                  "mr-3 last:mr-1",
                  "snap-center",
                  "touch-manipulation",
                  "transition-transform duration-200",
                  "cursor-pointer",
                  stepColors[index].gradient
                )}
              >
                {/* Step Number with improved visual prominence */}
                <div className="flex items-center mb-3">
                  <div className={cn(
                    "w-7 h-7",
                    stepColors[index].numBg, 
                    stepColors[index].numText,
                    "rounded-full", 
                    "flex items-center justify-center", 
                    "text-sm font-medium", 
                    "shadow-sm",
                    "mr-2"
                  )}>
                    {index + 1}
                    
                    {/* Completed checkmark */}
                    {completedSteps.includes(index) && (
                      <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm">
                        <Check className="w-3 h-3 text-green-500" />
                      </div>
                    )}
                  </div>
                  
                  {/* Title with better readability */}
                  <h4 className="text-sm font-semibold text-gray-900 flex-1">
                    {step.title}
                  </h4>
                  
                  {/* Icon with enhanced visibility */}
                  <div className={cn(
                    "ml-1",
                    stepColors[index].iconText,
                    stepColors[index].iconBg,
                    "rounded-full p-1.5"
                  )}>
                    {step.icon}
                  </div>
                </div>
                
                {/* Description - more compelling and outcome-focused */}
                <p className="text-xs text-gray-700 leading-relaxed">
                  {step.description}
                </p>

                {/* Pro tip for added trust and guidance */}
                <ProTip 
                  tip={step.proTip} 
                  colorClass={stepColors[index].lightText} 
                />
              </motion.div>
            ))}
          </div>

          {/* Scroll indicators - enhanced visual feedback */}
          <div className="flex justify-center mt-3 space-x-1.5">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === Math.floor(scrollPosition / (maxScroll / steps.length)) 
                    ? `w-8 ${stepColors[index].numBg}` 
                    : "w-2 bg-gray-300"
                )}
              />
            ))}
          </div>
        </div>
        
        {/* Desktop grid layout with enhanced connecting lines and consistent visual rhythm */}
        <div className="hidden md:block w-full mx-auto relative">
          {/* Connecting lines between steps */}
          <ConnectingLines />
          
          {/* Grid container */}
          <div className="grid w-full grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                initial={{
                  opacity: 0,
                  y: 30
                }} 
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    duration: 1.0,
                    delay: index * 0.2,
                    stiffness: 50
                  }
                }} 
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
                  transition: {
                    duration: 0.3
                  }
                }} 
                whileTap={{
                  scale: 0.98
                }} 
                viewport={{
                  once: true,
                  margin: "-50px"
                }} 
                className={cn(
                  "relative h-full", 
                  stepColors[index].gradient, 
                  "min-h-[250px]",
                  "px-6 py-8", 
                  "rounded-xl", 
                  "transition-all duration-300", 
                  "group cursor-pointer", 
                  "border",
                  stepColors[index].borderColor, 
                  "active:scale-[0.98]", 
                  "touch-manipulation", 
                  "shadow-md hover:shadow-xl", 
                  "flex flex-col items-center justify-start"
                )} 
                aria-label={`Step ${index + 1}: ${step.title}`}
              >
                {/* Step Number badge with clearer visuals */}
                <div className={cn("absolute -top-3.5 left-6", "z-10")}>
                  <motion.span 
                    className={cn(
                      "inline-flex items-center justify-center", 
                      "w-9 h-9", 
                      stepColors[index].numBg, 
                      stepColors[index].numText, 
                      "rounded-full", 
                      "text-base font-medium", 
                      "ring-4 ring-white", 
                      "shadow-md"
                    )} 
                    initial={{
                      scale: 0.8,
                      opacity: 0
                    }} 
                    whileInView={{
                      scale: 1,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        delay: index * 0.2 + 0.3,
                        duration: 0.5
                      }
                    }} 
                    viewport={{
                      once: true
                    }}
                  >
                    {step.number}
                    
                    {/* Completed checkmark - clearer completion indicator */}
                    {completedSteps.includes(index) && (
                      <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm">
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      </div>
                    )}
                  </motion.span>
                </div>
                
                {/* Icon with enhanced visual appeal and animations */}
                <motion.div 
                  className={cn(
                    "mb-5", 
                    stepColors[index].iconBg, 
                    stepColors[index].iconText, 
                    "transition-all duration-300", 
                    "rounded-xl p-4", 
                    "group-hover:saturate-150", 
                    "group-hover:scale-110", 
                    "shadow-sm group-hover:shadow-md"
                  )} 
                  initial={{
                    rotateY: 0
                  }} 
                  whileHover={{
                    rotateY: 180,
                    transition: {
                      duration: 0.6
                    }
                  }}
                >
                  {React.cloneElement(step.icon, {
                    className: "w-8 h-8"
                  })}
                </motion.div>
                
                {/* Title with improved typography and animation */}
                <motion.h4 
                  className="text-base sm:text-lg font-semibold text-gray-900 mb-3 text-center" 
                  initial={{
                    opacity: 0.8
                  }} 
                  whileInView={{
                    opacity: 1,
                    transition: {
                      delay: index * 0.1 + 0.5
                    }
                  }} 
                  viewport={{
                    once: true
                  }}
                >
                  {step.title}
                </motion.h4>
                
                {/* Description with more compelling, outcome-focused language */}
                <motion.p 
                  className="text-sm text-gray-700 leading-relaxed text-center" 
                  initial={{
                    opacity: 0.6
                  }} 
                  whileInView={{
                    opacity: 1,
                    transition: {
                      delay: index * 0.1 + 0.7
                    }
                  }} 
                  viewport={{
                    once: true
                  }}
                >
                  {step.description}
                </motion.p>
                
                {/* Pro tip for added trust and guidance */}
                <div className="mt-auto pt-3">
                  <ProTip 
                    tip={step.proTip} 
                    colorClass={stepColors[index].lightText} 
                  />
                </div>
                
                {/* Subtle visual indicator of clickability */}
                <div className={cn(
                  "absolute bottom-3 right-3 w-6 h-6", 
                  "flex items-center justify-center", 
                  "rounded-full", 
                  "opacity-0 group-hover:opacity-80", 
                  "transition-opacity duration-300", 
                  stepColors[index].numBg
                )}>
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
