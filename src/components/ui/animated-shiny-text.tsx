
import { CSSProperties, FC, ReactNode, memo } from "react";
import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

// Use memo to prevent unnecessary re-renders
const AnimatedShinyText: FC<AnimatedShinyTextProps> = memo(({
  children,
  className,
  shimmerWidth = 100,
}) => {
  return (
    <p
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "mx-auto text-neutral-600/70 dark:text-neutral-400/70",
        // Shine effect - using will-change for better performance
        "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite] will-change-[background-position]",
        // Shine gradient
        "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80",
        className,
      )}
    >
      {children}
    </p>
  );
});

// Add display name for React DevTools
AnimatedShinyText.displayName = "AnimatedShinyText";

export { AnimatedShinyText };
