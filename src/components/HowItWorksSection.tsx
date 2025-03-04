import React, { useState, useEffect } from 'react';
import { Search, Users, FileCheck, Calendar, Check } from 'lucide-react';
import { motion } from 'framer-motion';
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
  tintBg: "bg-violet-50/10"
}, {
  iconBg: "bg-blue-100",
  iconText: "text-blue-500",
  numBg: "bg-blue-500",
  numText: "text-white",
  lineColor: "from-blue-500/70 to-amber-600/50",
  borderColor: "border-blue-500",
  glowColor: "shadow-blue-500/20",
  tintBg: "bg-blue-50/10"
}, {
  iconBg: "bg-amber-100",
  iconText: "text-amber-600",
  numBg: "bg-amber-600",
  numText: "text-white",
  lineColor: "from-amber-600/70 to-emerald-600/50",
  borderColor: "border-amber-600",
  glowColor: "shadow-amber-500/20",
  tintBg: "bg-amber-50/10"
}, {
  iconBg: "bg-emerald-100",
  iconText: "text-emerald-600",
  numBg: "bg-emerald-600",
  numText: "text-white",
  lineColor: "from-emerald-600/50 to-emerald-600/10",
  borderColor: "border-emerald-600",
  glowColor: "shadow-emerald-500/20",
  tintBg: "bg-emerald-50/10"
}];
const HowItWorksSection = () => {
  const isMobile = useIsMobile();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Simulate completed steps (in a real app, this would come from user progress data)
  useEffect(() => {
    const savedProgress = localStorage.getItem('howItWorksProgress');
    if (savedProgress) {
      setCompletedSteps(JSON.parse(savedProgress));
    }
  }, []);
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
  return <section className="relative overflow-hidden py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/5">
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
          
          {steps.map((step, index) => <motion.div key={index} initial={{
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
        // Reduced height
        "p-4",
        // Reduced to 16px padding
        "rounded-lg", "shadow-[0_2px_4px_rgba(0,0,0,0.05),0_2px_2px_rgba(0,0,0,0.05)]", "border border-gray-100", stepColors[index].borderColor, "border-l-[3px]",
        // 3px left border
        "touch-manipulation", "mx-auto", "transition-transform duration-200", "cursor-pointer")}>
              <div className="flex items-start">
                {/* Left side: Number circle with integrated icon */}
                <div className="relative mr-3">
                  <div className={cn("w-8 h-8",
              // Slightly smaller (32px)
              stepColors[index].numBg, stepColors[index].numText, "rounded-full", "flex items-center justify-center", "text-sm font-medium", "shadow-sm", "relative", "mt-[2px]" // Align with first line of title
              )}>
                    <span className="flex items-center justify-center w-full h-full">
                      {index + 1}
                    </span>
                    
                    {/* Removed the icon overlay inside number circle */}
                    
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
                // 8px spacing
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
            </motion.div>)}
        </div>
        
        {/* Desktop grid layout */}
        <div className="hidden md:grid w-full mx-auto grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 relative">
          {steps.map((step, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            duration: 0.8,
            delay: index * 0.2
          }
        }} whileHover={{
          scale: 1.02,
          transition: {
            duration: 0.2
          }
        }} whileTap={{
          scale: 0.98
        }} viewport={{
          once: true,
          margin: "-50px"
        }} className={cn("relative bg-white", "min-h-[180px] sm:min-h-[200px]", "px-6 py-8", "rounded-xl", "shadow-[0_4px_12px_rgba(0,0,0,0.08)]", "transition-all duration-200", "group", "border border-gray-100", "active:scale-[0.98]", "touch-manipulation", "hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]")}>
              <div className="flex flex-col items-center justify-start h-full relative">
                {/* Step Number with connecting line */}
                <div className="absolute -left-[3.25rem] top-0 h-full" aria-hidden="true">
                  <motion.span className={cn("absolute -top-2 left-0", "w-8 h-8", stepColors[index].numBg, stepColors[index].numText, "rounded-full", "flex items-center justify-center", "text-sm font-medium", "ring-4 ring-white", "z-10")} initial={{
                scale: 0.8,
                opacity: 0
              }} whileInView={{
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  delay: index * 0.2 + 0.3,
                  duration: 0.5
                }
              }} viewport={{
                once: true
              }}>
                    {step.number}
                  </motion.span>
                  
                  {/* Vertical connecting line for all steps with shorter length */}
                  <motion.div className={cn("absolute top-7 left-[0.875rem] w-[2px]", `h-[calc(50%)] ${stepColors[index].lineColor} bg-gradient-to-b opacity-70`)} initial={{
                scaleY: 0
              }} whileInView={{
                scaleY: 1,
                transition: {
                  delay: index * 0.2 + 0.4,
                  duration: 0.5
                }
              }} viewport={{
                once: true
              }} />
                </div>
                
                {/* Icon with enhanced colorful background */}
                <motion.div className={cn("mb-5", stepColors[index].iconBg, stepColors[index].iconText, "transition-all duration-300", "rounded-xl p-4", "group-hover:saturate-150")} whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }}>
                  {React.cloneElement(step.icon, {
                className: "w-7 h-7"
              })}
                </motion.div>
                
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 text-center line-clamp-1">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed text-center">
                  {step.description}
                </p>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;