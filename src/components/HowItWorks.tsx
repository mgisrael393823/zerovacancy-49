```jsx
import React, { useState, useEffect } from 'react';
import { Search, Users, FileCheck, Calendar, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// Enhanced step colors with more consistent and professional palette
const stepColors = [{
  iconBg: "bg-violet-100",
  iconText: "text-violet-600",
  numBg: "bg-violet-600",
  numText: "text-white",
  lineColor: "from-violet-600 to-blue-500",
  borderColor: "border-violet-200",
  glowColor: "shadow-violet-500/20",
  tintBg: "bg-violet-50"
}, {
  iconBg: "bg-blue-100",
  iconText: "text-blue-600",
  numBg: "bg-blue-600",
  numText: "text-white",
  lineColor: "from-blue-600 to-amber-500",
  borderColor: "border-blue-200",
  glowColor: "shadow-blue-500/20",
  tintBg: "bg-blue-50"
}, {
  iconBg: "bg-amber-100",
  iconText: "text-amber-600",
  numBg: "bg-amber-600",
  numText: "text-white",
  lineColor: "from-amber-600 to-emerald-600",
  borderColor: "border-amber-200",
  glowColor: "shadow-amber-500/20",
  tintBg: "bg-amber-50"
}, {
  iconBg: "bg-emerald-100",
  iconText: "text-emerald-600",
  numBg: "bg-emerald-600",
  numText: "text-white",
  lineColor: "from-emerald-600 to-emerald-300",
  borderColor: "border-emerald-200",
  glowColor: "shadow-emerald-500/20",
  tintBg: "bg-emerald-50"
}];

const HowItWorksSection = () => {
  const isMobile = useIsMobile();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<number>(-1);

  // Simulate step progression with hover/focus states
  useEffect(() => {
    const savedProgress = localStorage.getItem('howItWorksProgress');
    if (savedProgress) {
      setCompletedSteps(JSON.parse(savedProgress));
    }
  }, []);

  const handleStepInteraction = (index: number) => {
    setActiveStep(index);
    // In a real implementation, this would potentially track user engagement
  };

  const steps = [{
    icon: <Search className="w-6 h-6" />,
    title: "Discover Creators",
    description: "Find your ideal creator with powerful filters and tailored search options",
    number: "01"
  }, {
    icon: <Users className="w-6 h-6" />,
    title: "Compare Portfolios",
    description: "Browse verified work samples and client reviews to ensure perfect fit",
    number: "02"
  }, {
    icon: <Calendar className="w-6 h-6" />,
    title: "Book Securely",
    description: "Schedule and pay through our protected platform with satisfaction guarantee",
    number: "03"
  }, {
    icon: <FileCheck className="w-6 h-6" />,
    title: "Receive Quality Content",
    description: "Get professional deliverables through our streamlined approval system",
    number: "04"
  }];

  return (
    <section className="relative overflow-hidden py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-3 sm:mb-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
            Your Journey to Amazing Content
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Four simple steps to transform your ideas into professional results
          </p>
        </div>
        
        {/* Enhanced Mobile vertical layout */}
        <div className="md:hidden space-y-5 relative pb-16">
          {/* Connecting gradient line with animation */}
          <motion.div 
            className="absolute left-6 top-4 bottom-0 w-[3px] bg-gradient-to-b from-violet-500 via-blue-500 via-amber-500 to-emerald-500"
            initial={{ height: 0 }}
            whileInView={{ height: '95%' }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          ></motion.div>
          
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  damping: 20,
                  duration: 0.6,
                  delay: index * 0.15
                }
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.2 }
              }}
              viewport={{ once: true, margin: "-50px" }}
              onClick={() => handleStepInteraction(index)}
              className={cn(
                "relative bg-white",
                "w-full max-w-[340px]",
                "p-5",
                "rounded-lg",
                "shadow-lg shadow-gray-200/70",
                "border",
                stepColors[index].borderColor,
                completedSteps.includes(index) ? "border-l-[4px] border-l-green-500" : `border-l-[4px] ${stepColors[index].borderColor}`,
                "transition-all duration-300",
                "cursor-pointer",
                "mx-auto",
                activeStep === index ? "translate-x-1 -translate-y-1" : "",
              )}
            >
              <div className="flex items-start">
                {/* Left side: Enhanced number circle */}
                <div className="relative mr-4">
                  <div className={cn(
                    "w-10 h-10",
                    completedSteps.includes(index) ? "bg-green-500" : stepColors[index].numBg,
                    stepColors[index].numText,
                    "rounded-full",
                    "flex items-center justify-center",
                    "text-sm font-semibold",
                    "shadow-md",
                    "relative",
                    "mt-[2px]", // Align with first line of title
                    "transition-all duration-300"
                  )}>
                    {completedSteps.includes(index) ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                </div>
                
                {/* Content with enhanced typography */}
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="text-[17px] font-bold text-gray-900 tracking-tight">
                      {step.title}
                    </h4>
                    <div className={cn(
                      "ml-2.5",
                      stepColors[index].iconText
                    )}>
                      {step.icon}
                    </div>
                  </div>
                  
                  <p className="text-[15px] text-gray-600 leading-[1.5]">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Mobile CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 flex justify-center"
          >
            <button className="px-6 py-3.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full font-semibold shadow-md shadow-blue-500/20 flex items-center space-x-2 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </motion.div>
        </div>
        
        {/* Enhanced Desktop grid layout */}
        <div className="hidden md:block w-full mx-auto relative">
          {/* Horizontal progress line connecting all steps */}
          <div className="absolute top-[6.5rem] left-0 right-0 h-0.5 bg-gray-100 z-0"></div>
          
          {/* Animated progress line */}
          <motion.div 
            className="absolute top-[6.5rem] left-0 h-0.5 bg-gradient-to-r from-violet-500 via-blue-500 via-amber-500 to-emerald-500 z-1"
            initial={{ width: "0%" }}
            whileInView={{ width: activeStep >= 0 ? `${Math.min(100, (activeStep + 1) * 25)}%` : "100%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          ></motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    damping: 20,
                    duration: 0.8,
                    delay: index * 0.2
                  }
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => handleStepInteraction(index)}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true, margin: "-50px" }}
                className={cn(
                  "relative bg-white",
                  "min-h-[220px] md:min-h-[240px]",
                  "px-6 py-8",
                  "rounded-xl",
                  "shadow-xl shadow-gray-100/80",
                  "transition-all duration-300",
                  "group",
                  "border border-gray-100",
                  completedSteps.includes(index) ? "border-green-200 border-b-2 border-b-green-500" : "",
                  "hover:border-b-2",
                  `hover:border-b-${stepColors[index].numBg.replace('bg-', '')}`,
                  "cursor-pointer",
                  "hover:shadow-2xl hover:shadow-gray-200/70",
                  `${stepColors[index].glowColor}`
                )}
              >
                <div className="flex flex-col items-center justify-start h-full relative">
                  {/* Enhanced Step Number */}
                  <div className="absolute -top-11 w-full flex justify-center pointer-events-none" aria-hidden="true">
                    <motion.div 
                      className={cn(
                        "w-14 h-14",
                        stepColors[index].numBg, 
                        stepColors[index].numText,
                        "rounded-full",
                        "flex items-center justify-center",
                        "font-semibold text-lg",
                        "ring-4 ring-white shadow-lg",
                        "z-10"
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
                      {completedSteps.includes(index) ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        step.number
                      )}
                    </motion.div>
                  </div>
                  
                  {/* Enhanced icon with animation */}
                  <motion.div 
                    className={cn(
                      "mb-6 mt-5",
                      stepColors[index].iconBg,
                      stepColors[index].iconText,
                      "transition-all duration-300",
                      "rounded-2xl p-5",
                      "group-hover:shadow-md",
                      `group-hover:${stepColors[index].glowColor}`
                    )}
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {React.cloneElement(step.icon, { className: "w-8 h-8" })}
                  </motion.div>
                  
                  <h4 className="text-lg font-bold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h4>
                  
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Desktop CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full font-bold text-lg shadow-md shadow-blue-500/20 flex items-center space-x-2 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
              <span>Start Creating Today</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </motion.div>
        </div>
        
        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-sm text-gray-500 flex items-center justify-center">
            <Check className="w-4 h-4 text-green-500 mr-1.5" /> 
            <span>Trusted by 10,000+ creators and businesses</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
```
