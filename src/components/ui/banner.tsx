import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Star, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
const bannerVariants = cva("relative w-full flex items-center justify-between gap-2 overflow-hidden px-3 py-2.5 sm:px-6 sm:py-3", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      success: "bg-green-500 text-white",
      warning: "bg-yellow-500 text-white",
      error: "bg-red-500 text-white",
      purple: "bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 text-white"
    },
    size: {
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg"
    },
    layout: {
      simple: "justify-center text-center",
      complex: "justify-between items-center"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    layout: "simple"
  }
});
interface BannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode;
  action?: React.ReactNode;
  isClosable?: boolean;
  onClose?: () => void;
}
export function Banner({
  className,
  variant,
  size,
  layout,
  icon,
  action,
  isClosable,
  onClose,
  children,
  ...props
}: BannerProps) {
  return <div className={cn(bannerVariants({
    variant,
    size,
    layout
  }), "min-h-[3rem] sm:min-h-[3.5rem]", "shadow-[0_3px_10px_rgba(0,0,0,0.1)]", "relative z-40", "mt-0.5",
  // Add a small margin to create visual separation from header
  className)} {...props}>
      {/* Enhanced pattern overlay for visual interest */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px] z-0 px-[2px]"></div>
      
      <div className="
        flex items-center justify-between w-full
        flex-row sm:flex-nowrap
        px-2 sm:px-4
        py-1.5 sm:py-0
        relative z-10
      ">
        <div className="flex items-center justify-start text-left gap-1.5 sm:gap-3 max-w-[65%] sm:max-w-none">
          {icon && <span className="flex-shrink-0">
              {icon}
            </span>}
          <span className="font-medium text-xs sm:text-base px-0 sm:px-1 line-clamp-2 sm:line-clamp-none">{children}</span>
        </div>

        {action && <div className="flex-shrink-0 ml-auto">
            <div className="scale-100 transform hover:scale-105 transition-all duration-300">
              {action}
            </div>
          </div>}
      </div>
    </div>;
}

// Example usage:
export function MarketplaceBanner() {
  return <Banner variant="purple" icon={<Sparkle className="h-4 w-4" />} action={<Button variant="secondary" size="sm" className="text-sm font-medium px-3 py-1 h-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900">
          Get Early Access
        </Button>}>
      Get priority access to the creator marketplace!
    </Banner>;
}