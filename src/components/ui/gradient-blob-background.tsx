
import React from 'react';
import { cn } from '@/lib/utils';

type GradientBlobBackgroundProps = {
  children: React.ReactNode;
  className?: string;
};

export const GradientBlobBackground = ({ 
  children, 
  className 
}: GradientBlobBackgroundProps) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-purple-300/20 to-blue-300/20 blur-3xl" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-blue-300/20 to-teal-300/20 blur-3xl" />
        <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-teal-300/20 to-purple-300/20 blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
