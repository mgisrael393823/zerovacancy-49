
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Camera, Image, Video, Instagram, UserCheck, Clock, CreditCard, Award } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Define a more consistent color palette for icons
const iconColors = {
  Camera: { bg: "bg-indigo-100", text: "text-indigo-600" },
  Image: { bg: "bg-indigo-100", text: "text-indigo-600" },
  Video: { bg: "bg-indigo-100", text: "text-indigo-600" },
  Instagram: { bg: "bg-indigo-100", text: "text-indigo-600" },
  UserCheck: { bg: "bg-indigo-100", text: "text-indigo-600" },
  Clock: { bg: "bg-indigo-100", text: "text-indigo-600" },
  CreditCard: { bg: "bg-indigo-100", text: "text-indigo-600" },
  Award: { bg: "bg-indigo-100", text: "text-indigo-600" },
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
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="section-title mb-3 sm:mb-4 font-space tracking-tight">
            Professional Content Creation Services
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Everything you need to showcase your properties with stunning visuals and engaging content
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              Icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureProps {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const Feature = ({ title, description, Icon }: FeatureProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  
  const handleClick = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };
  
  // Get the color scheme for this icon
  const iconName = Icon.name || Icon.displayName || "";
  const colorScheme = iconColors[iconName as keyof typeof iconColors] || { bg: "bg-indigo-100", text: "text-indigo-600" };
  
  return (
    <button
      className={cn(
        "relative w-full text-left group",
        "rounded-xl transition-all duration-200",
        "bg-white/90 hover:bg-white",
        "border border-gray-200/80 hover:border-gray-300",
        "p-4 sm:p-5",
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        !isMobile && "hover:shadow-md hover:-translate-y-0.5"
      )}
      onClick={handleClick}
      aria-expanded={isMobile ? isExpanded : undefined}
    >
      <div className="flex flex-col items-start gap-3">
        {/* Standardized icon container with consistent sizing and styling */}
        <div className={cn(
          "flex items-center justify-center",
          "w-12 h-12", // Increased size for better visibility on desktop
          "rounded-xl", // More pronounced rounded corners
          "transition-all duration-200",
          colorScheme.bg,
          "group-hover:shadow-sm",
          "border border-indigo-200/30" // Subtle border for more dimension
        )}>
          <Icon className={cn(
            "w-6 h-6", // Consistent icon size
            colorScheme.text,
            "transition-all duration-200",
            "group-hover:scale-110",
            isMobile && isExpanded && "transform rotate-90"
          )} />
        </div>
        
        <div className="text-left w-full">
          <h3 className={cn(
            "text-base font-semibold leading-6 font-space mb-1.5",
            "text-gray-900 group-hover:text-indigo-600", // Matching hover color to icon theme
            "transition-colors duration-200"
          )}>
            {title}
          </h3>
          <div className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-200",
            isMobile && !isExpanded ? "max-h-0 opacity-0" : "max-h-32 opacity-100"
          )}>
            <p className="text-sm text-gray-600 font-anek group-hover:text-gray-700">
              {description}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default FeaturesSectionWithHoverEffects;
