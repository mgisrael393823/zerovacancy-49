import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Camera, Image, Video, Instagram, UserCheck, Clock, CreditCard, Award } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion"; // Added for smoother animations

// Enhanced color palette with more visual interest
const iconColors = {
  Camera: { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-200" },
  Image: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200" },
  Video: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
  Instagram: { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-200" },
  UserCheck: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
  Clock: { bg: "bg-violet-100", text: "text-violet-700", border: "border-violet-200" },
  CreditCard: { bg: "bg-cyan-100", text: "text-cyan-700", border: "border-cyan-200" },
  Award: { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-200" },
};

const features = [{
  title: "Professional Photography",
  description: "High-quality, professionally edited real estate photography that showcases properties at their best.",
  icon: Camera
}, {
  title: "Drone Aerial Coverage",
  description: "FAA-certified drone operators capturing stunning aerial views and property surroundings.",
  icon: Image
}, {
  title: "Video Production",
  description: "Cinematic property tours and promotional videos that tell your property's unique story.",
  icon: Video
}, {
  title: "Social Media Content",
  description: "Engaging content optimized for all major social platforms and marketing channels.",
  icon: Instagram
}, {
  title: "Verified Creators",
  description: "Every creator is thoroughly vetted and verified for quality and professionalism.",
  icon: UserCheck
}, {
  title: "24/7 Availability",
  description: "Book creators any time, with flexible scheduling to meet your deadlines.",
  icon: Clock
}, {
  title: "Transparent Pricing",
  description: "Clear, upfront pricing with no hidden fees. Pay only for what you need.",
  icon: CreditCard
}, {
  title: "Quality Guaranteed",
  description: "100% satisfaction guarantee on all content. Your property deserves the best.",
  icon: Award
}];

export function FeaturesSectionWithHoverEffects() {
  // Track which feature is currently hovered for enhanced user experience
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          {/* More compelling heading with visual emphasis */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space mb-4 sm:mb-6 tracking-tight text-gray-900">
            <span className="text-indigo-600">Elevate</span> Your Property's Visual Story
          </h2>
          {/* Enhanced subheading with better value proposition */}
          <p className="text-lg sm:text-xl font-anek text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with top-tier visual content creators who transform ordinary properties into 
            must-see listings that <span className="text-indigo-600 font-medium">sell faster and at higher prices</span>.
          </p>
          
          {/* Trust badges above the feature grid */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-8 mb-4 text-gray-500 text-sm">
            <div className="flex items-center gap-1.5">
              <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span>4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>Vetted Professionals</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>100% Satisfaction Guaranteed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path>
              </svg>
              <span>3,500+ Bookings Completed</span>
            </div>
          </div>
        </div>
        
        {/* Improved grid with better spacing and responsive design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              Icon={feature.icon}
              index={index}
              isHovered={hoveredFeature === index}
              setHovered={setHoveredFeature}
            />
          ))}
        </div>
        
        {/* Conversion-focused CTA section */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
            </svg>
            Limited Time Offer: 15% off your first booking
          </div>
          <a 
            href="#book-now" 
            className="inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
          >
            Book Your Creator Today
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

interface FeatureProps {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  index: number;
  isHovered: boolean;
  setHovered: (index: number | null) => void;
}

const Feature = ({ title, description, Icon, index, isHovered, setHovered }: FeatureProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  
  const handleClick = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };
  
  const handleMouseEnter = () => {
    if (!isMobile) {
      setHovered(index);
    }
  };
  
  const handleMouseLeave = () => {
    if (!isMobile) {
      setHovered(null);
    }
  };
  
  // Get the color scheme for this icon
  const iconName = Icon.name || Icon.displayName || "";
  const colorScheme = iconColors[iconName as keyof typeof iconColors] || 
    { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-200" };
  
  return (
    <motion.button
      className={cn(
        "relative w-full text-left",
        "rounded-xl transition-all duration-300",
        "bg-white",
        "border hover:border-2", // Subtle border enhancement on hover
        isHovered ? `${colorScheme.border}` : "border-gray-200",
        "p-5 sm:p-6",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500/30",
        !isMobile && "hover:shadow-lg"
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-expanded={isMobile ? isExpanded : undefined}
      whileHover={{ 
        y: isMobile ? 0 : -8,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          delay: index * 0.05,
          duration: 0.4
        }
      }}
    >
      <div className="flex flex-col items-start gap-4">
        {/* Enhanced icon container with more visual presence */}
        <div className={cn(
          "flex items-center justify-center",
          "w-14 h-14", // Larger for better visibility
          "rounded-xl", 
          "transition-all duration-300",
          colorScheme.bg,
          isHovered ? "shadow-md" : "shadow-sm",
          "border", colorScheme.border
        )}>
          <Icon className={cn(
            "w-7 h-7", // Slightly larger icons
            colorScheme.text,
            "transition-all duration-300",
            isHovered ? "scale-110" : "",
            isMobile && isExpanded && "transform rotate-90"
          )} />
        </div>
        
        <div className="text-left w-full">
          <h3 className={cn(
            "text-lg font-semibold leading-6 font-space mb-2", // Larger text with better spacing
            isHovered ? colorScheme.text : "text-gray-900",
            "transition-colors duration-300"
          )}>
            {title}
          </h3>
          <AnimatePresence>
            {(!isMobile || isExpanded) && (
              <motion.div
                initial={isMobile ? { height: 0, opacity: 0 } : false}
                animate={isMobile ? { height: "auto", opacity: 1 } : false}
                exit={isMobile ? { height: 0, opacity: 0 } : false}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-gray-600 font-anek leading-relaxed">
                  {description}
                </p>
                
                {/* Added visual cue for action */}
                <div className={cn(
                  "mt-3 text-sm font-medium flex items-center",
                  isHovered ? colorScheme.text : "text-indigo-600",
                  "transition-all duration-300",
                  "opacity-0", // Hidden by default
                  isHovered ? "opacity-100" : "", // Show on hover
                  isMobile && isExpanded ? "opacity-100" : "" // Show on mobile when expanded
                )}>
                  Learn more
                  <svg className={cn(
                    "ml-1 w-4 h-4 transition-transform duration-300",
                    isHovered ? "translate-x-1" : ""
                  )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Status indicator for visual feedback */}
      {isHovered && !isMobile && (
        <motion.div 
          className={`absolute top-3 right-3 w-2 h-2 rounded-full ${colorScheme.text.replace('text', 'bg')}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
};

export default FeaturesSectionWithHoverEffects;
