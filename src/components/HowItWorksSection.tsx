import React, { useState, useEffect } from 'react';
import { Search, Users, FileCheck, Calendar, Check, ArrowRight } from 'lucide-react';
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
  borderColor: "border-violet-600",
  glowColor: "shadow-violet-500/20",
  tintBg: "bg-violet-50/10",
  gradient: "bg-gradient-to-br from-violet-50 to-violet-100"
}, {
  iconBg: "bg-blue-100",
  iconText: "text-blue-500",
  numBg: "bg-blue-500",
  numText: "text-white",
  lineColor: "from-blue-500/70 to-amber-600/50",
  borderColor: "border-blue-500",
  glowColor: "shadow-blue-500/20",
  tintBg: "bg-blue-50/10",
  gradient: "bg-gradient-to-br from-blue-50 to-blue-100"
}, {
  iconBg: "bg-amber-100",
  iconText: "text-amber-600",
  numBg: "bg-amber-600",
  numText: "text-white",
  lineColor: "from-amber-600/70 to-emerald-600/50",
  borderColor: "border-amber-600",
  glowColor: "shadow-amber-500/20",
  tintBg: "bg-amber-50/10",
  gradient: "bg-gradient-to-br from-amber-50 to-amber-100"
}, {
  iconBg: "bg-emerald-100",
  iconText: "text-emerald-600",
  numBg: "bg-emerald-600",
  numText: "text-white",
  lineColor: "from-emerald-600/50 to-emerald-600/10",
  borderColor: "border-emerald-600",
  glowColor: "shadow-emerald-500/20",
  tintBg: "bg-emerald-50/10",
  gradient: "bg-gradient-to-br from-emerald-50 to-emerald-100"
}];

// New component for desktop connecting lines between steps
const ConnectingLines = () => {
  return (
    <div className="absolute top-16 left-0 w-full z-0 hidden lg:block pointer-events-none">
      {/* First connector line - violet to blue */}
      <motion.div 
        className="absolute top-8 left-[23%] w-[18%] h-0.5 bg-gradient-to-r from-violet-500 to-blue-500"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        whileInView={{ 
          scaleX: 1,
          transition: { 
            duration: 0.8, 
            delay: 0.3,
            ease: "easeOut"
          }
        }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="absolute -right-3 -top-[7px] text-blue-500"
          initial={{ opacity: 0 }}
          whileInView={{ 
            opacity: 1, 
            transition: { delay: 1.1 }
          }}
          viewport={{ once: true }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </motion.div>
      
      {/* Second connector line - blue to amber */}
      <motion.div 
        className="absolute top-8 left-[48%] w-[18%] h-0.5 bg-gradient-to-r from-blue-500 to-amber-500"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        whileInView={{ 
          scaleX: 1,
          transition: { 
            duration: 0.8, 
            delay: 0.6,
            ease: "easeOut"
          }
        }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="absolute -right-3 -top-[7px] text-amber-500"
          initial={{ opacity: 0 }}
          whileInView={{ 
            opacity: 1, 
            transition: { delay: 1.4 }
          }}
          viewport={{ once: true }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </motion.div>
      
      {/* Third connector line - amber to emerald */}
      <motion.div 
        className="absolute top-8 left-[73%] w-[18%] h-0.5 bg-gradient-to-r from-amber-500 to-emerald-500"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        whileInView={{ 
          scaleX: 1,
          transition: { 
            duration: 0.8, 
            delay: 0.9,
            ease: "easeOut"
          }
        }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="absolute -right-3 -top-[7px] text-emerald-500"
          initial={{ opacity: 0 }}
          whileInView={{ 
            opacity: 1, 
            transition: { delay: 1.7 }
          }}
          viewport={{ once: true }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </div>
  );
};

const HowItWorksSection = () => {
  const isMobile = useIsMobile();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const controls = useAnimation();

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
  }, [controls]);

  const steps = [{
    icon: <Search className="w-5 h-5" />,
    title: "Search & Filter",
    description: "Find your perfect creator match based on your specific needs and requirements",
    number: "01"
  }, {
    icon: <Users className="w-5 h-5" />,
    title: "Review & Compare",
    description: "Browse portfolios and reviews to find the perfect match for your project",
    number: "02"
  }, {
    icon: <Calendar className="w-5 h-5" />,
    title: "Book & Pay",
    description: "Schedule securely through our platform with protected payments",
    number: "03"
  }, {
    icon: <FileCheck className="w-5 h-5" />,
    title: "Get Content",
    description: "Receive and approve your deliverables through our streamlined process",
    number: "04"
  }];

  return (
    <section className="relative overflow-hidden py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/5">
      <div className="max-w-7xl mx-auto py-0 px-px">
        <div className="text-center mb-6 sm:mb-14">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-3 sm:mb-4">
            How It Works
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Your journey to amazing content in four simple steps
          </p>
        </div>
        
        {/* Mobile vertical layout */}
        <div className="md:hidden space-y-[14px] relative">
          {/* Connecting gradient line */}
          <div className="absolute left-[8px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-violet-500 via-blue-500 via-amber-500 to-emerald-500 opacity-60"></div>
          
          {steps.map((step, index) => (
            <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                duration: 0.6,
                delay: index * 0.15
              }
            }} whileTap={{
              scale: 1.02,
              transition: {
                duration: 0.2
              }
            }} viewport={{
              once: true,
              margin: "-30px"
            }} className={cn("relative bg-white", "w-full max-w-[327px] min-h-[100px]",
            "p-4",
            "rounded-lg", "shadow-[0_2px_4px_rgba(0,0,0,0.05),0_2px_2px_rgba(0,0,0,0.05)]", "border border-gray-100", stepColors[index].borderColor, "border-l-[3px]",
            "touch-manipulation", "mx-auto", "transition-transform duration-200", "cursor-pointer")}>
              <div className="flex items-start">
                {/* Left side: Number circle with integrated icon */}
                <div className="relative mr-3">
                  <div className={cn("w-8 h-8",
                  stepColors[index].numBg, stepColors[index].numText, "rounded-full", "flex items-center justify-center", "text-sm font-medium", "shadow-sm", "relative", "mt-[2px]" // Align with first line of title
                  )}>
                    <span className="flex items-center justify-center w-full h-full">
                      {index + 1}
                    </span>
                    
                    {/* Completed checkmark */}
                    {completedSteps.includes(index) && <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm">
                        <Check className="w-3 h-3 text-green-500" />
                      </div>}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  {/* Title with icon next to it */}
                  <div className="flex items-center">
                    <h4 className="text-[16px] font-semibold text-gray-900">
                      {step.title}
                    </h4>
                    <div className={cn("ml-2",
                    stepColors[index].iconText)}>
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Description with reduced spacing */}
                  <p className="text-[14px] text-gray-600 leading-[1.4] mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Desktop grid layout with enhanced connecting lines */}
        <div className="hidden md:block w-full mx-auto relative">
          {/* Connecting lines between steps */}
          <ConnectingLines />
          
          {/* Grid container */}
          <div className="grid w-full grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 relative">
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
                  "min-h-[220px]", // Standardized card height
                  "px-6 py-8",
                  "rounded-xl",
                  "transition-all duration-300",
                  "group cursor-pointer",
                  "border border-gray-100",
                  "active:scale-[0.98]",
                  "touch-manipulation",
                  "shadow-md hover:shadow-xl",
                  "flex flex-col items-center justify-start"
                )}
                aria-label={`Step ${index + 1}: ${step.title}`}
              >
                {/* Step Number badge */}
                <div 
                  className={cn(
                    "absolute -top-3 left-6",
                    "z-10"
                  )}
                >
                  <motion.span 
                    className={cn(
                      "inline-flex items-center justify-center",
                      "w-8 h-8",
                      stepColors[index].numBg, 
                      stepColors[index].numText,
                      "rounded-full",
                      "text-sm font-medium",
                      "ring-4 ring-white",
                      "shadow-sm"
                    )}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{
                      scale: 1,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        delay: index * 0.2 + 0.3,
                        duration: 0.5
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    {step.number}
                    
                    {/* Completed checkmark */}
                    {completedSteps.includes(index) && (
                      <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm">
                        <Check className="w-3 h-3 text-green-500" />
                      </div>
                    )}
                  </motion.span>
                </div>
                
                {/* Icon with enhanced colorful background and animations */}
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
                  initial={{ rotateY: 0 }}
                  whileHover={{
                    rotateY: 180,
                    transition: { duration: 0.6 }
                  }}
                >
                  {React.cloneElement(step.icon, {
                    className: "w-7 h-7"
                  })}
                </motion.div>
                
                {/* Title with motion */}
                <motion.h4 
                  className="text-base sm:text-lg font-semibold text-gray-900 mb-3 text-center line-clamp-1"
                  initial={{ opacity: 0.8 }}
                  whileInView={{ 
                    opacity: 1,
                    transition: { delay: index * 0.1 + 0.5 }
                  }}
                  viewport={{ once: true }}
                >
                  {step.title}
                </motion.h4>
                
                {/* Description with staggered animation */}
                <motion.p 
                  className="text-sm text-gray-600 leading-relaxed text-center"
                  initial={{ opacity: 0.6 }}
                  whileInView={{ 
                    opacity: 1,
                    transition: { delay: index * 0.1 + 0.7 }
                  }}
                  viewport={{ once: true }}
                >
                  {step.description}
                </motion.p>
                
                {/* Subtle visual indicator of clickability */}
                <div className={cn(
                  "absolute bottom-3 right-3 w-6 h-6",
                  "flex items-center justify-center",
                  "rounded-full",
                  "opacity-0 group-hover:opacity-70",
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
