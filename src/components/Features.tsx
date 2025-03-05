import { useState } from "react";
import { cn } from "@/lib/utils";
import { Camera, Image, Video, Instagram, UserCheck, Clock, CreditCard, Award } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Enhanced color palette with more varied but harmonious colors
const iconColors = {
  Camera: { bg: "bg-indigo-100", text: "text-indigo-700", shadow: "shadow-indigo-200" },
  Image: { bg: "bg-blue-100", text: "text-blue-700", shadow: "shadow-blue-200" },
  Video: { bg: "bg-purple-100", text: "text-purple-700", shadow: "shadow-purple-200" },
  Instagram: { bg: "bg-pink-100", text: "text-pink-700", shadow: "shadow-pink-200" },
  UserCheck: { bg: "bg-emerald-100", text: "text-emerald-700", shadow: "shadow-emerald-200" },
  Clock: { bg: "bg-amber-100", text: "text-amber-700", shadow: "shadow-amber-200" },
  CreditCard: { bg: "bg-sky-100", text: "text-sky-700", shadow: "shadow-sky-200" },
  Award: { bg: "bg-rose-100", text: "text-rose-700", shadow: "shadow-rose-200" },
};

const features = [{
  title: "Professional Photography",
  description: "High-quality, professionally edited real estate photography that showcases properties at their best.",
  icon: Camera,
  priority: "high"
}, {
  title: "Drone Aerial Coverage",
  description: "FAA-certified drone operators capturing stunning aerial views and property surroundings.",
  icon: Image,
  priority: "medium"
}, {
  title: "Video Production",
  description: "Cinematic property tours and promotional videos that tell your property's unique story.",
  icon: Video,
  priority: "high"
}, {
  title: "Social Media Content",
  description: "Engaging content optimized for all major social platforms and marketing channels.",
  icon: Instagram,
  priority: "medium"
}, {
  title: "Verified Creators",
  description: "Every creator is thoroughly vetted and verified for quality and professionalism.",
  icon: UserCheck,
  priority: "high"
}, {
  title: "24/7 Availability",
  description: "Book creators any time, with flexible scheduling to meet your deadlines.",
  icon: Clock,
  priority: "medium"
}, {
  title: "Transparent Pricing",
  description: "Clear, upfront pricing with no hidden fees. Pay only for what you need.",
  icon: CreditCard,
  priority: "medium"
}, {
  title: "Quality Guaranteed",
  description: "100% satisfaction guarantee on all content. Your property deserves the best.",
  icon: Award,
  priority: "high"
}];

export function FeaturesSectionWithHoverEffects() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-5 font-space tracking-tight text-gray-900">
            Transform Your Properties With Expert Visuals
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-anek">
            Connect with top-tier visual creators who help properties sell faster and for higher prices
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              Icon={feature.icon}
              priority={feature.priority}
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
  priority?: "high" | "medium";
}

const Feature = ({ title, description, Icon, priority = "medium" }: FeatureProps) => {
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
    <div className={cn(
      "relative h-full", 
      priority === "high" ? "order-first sm:order-none" : ""
    )}>
      <button
        className={cn(
          "relative w-full h-full text-left group",
          "rounded-xl transition-all duration-300",
          "bg-white hover:bg-white",
          "border border-gray-200 hover:border-gray-300",
          "p-5 sm:p-6",
          "focus:outline-none focus:ring-2 focus:ring-primary/20",
          !isMobile && "hover:shadow-lg hover:-translate-y-1",
          priority === "high" ? "shadow-sm" : ""
        )}
        onClick={handleClick}
        aria-expanded={isMobile ? isExpanded : undefined}
      >
        <div className="flex flex-col items-start gap-4">
          {/* Enhanced icon container */}
          <div className={cn(
            "flex items-center justify-center",
            "w-14 h-14",
            "rounded-full",
            "transition-all duration-300",
            colorScheme.bg,
            "group-hover:shadow-md",
            "border border-white/70",
            priority === "high" ? `${colorScheme.shadow} shadow-sm` : ""
          )}>
            <Icon className={cn(
              "w-7 h-7",
              colorScheme.text,
              "transition-all duration-300",
              "group-hover:scale-110",
              isMobile && isExpanded && "transform rotate-90"
            )} />
          </div>
          
          <div className="text-left w-full">
            <div className="flex items-center">
              <h3 className={cn(
                "text-lg font-bold leading-tight font-space",
                "text-gray-900 group-hover:text-indigo-700",
                "transition-colors duration-300",
                priority === "high" ? "text-indigo-900" : ""
              )}>
                {title}
              </h3>
              {priority === "high" && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                  Popular
                </span>
              )}
            </div>
            <div className={cn(
              "mt-2 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
              isMobile && !isExpanded ? "max-h-0 opacity-0" : "max-h-48 opacity-100"
            )}>
              <p className="text-sm text-gray-600 font-anek group-hover:text-gray-800 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Visual indicator for mobile expansion */}
          {isMobile && (
            <div className={cn(
              "absolute bottom-3 right-3 w-6 h-6 flex items-center justify-center rounded-full",
              "text-gray-400 group-hover:text-indigo-600 transition-all duration-200",
              isExpanded ? "rotate-180" : ""
            )}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          )}
        </div>
        
        {/* Subtle hover pulse effect for desktop */}
        {!isMobile && (
          <div className={cn(
            "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none",
            "transition-opacity duration-1000",
            "bg-gradient-to-r from-transparent via-indigo-50/30 to-transparent",
            "bg-[size:200%_100%]",
            "animate-pulse-slow"
          )} />
        )}
      </button>
    </div>
  );
};

// Add this to your global CSS or styles
// @keyframes pulse-slow {
//   0%, 100% { background-position: 200% 0; }
//   50% { background-position: 0% 0; }
// }
// .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }

export default FeaturesSectionWithHoverEffects;
</optimized_code>
