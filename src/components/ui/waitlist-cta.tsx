
import React from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface WaitlistCTAProps {
  className?: string;
}

export const WaitlistCTA: React.FC<WaitlistCTAProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-6", className)}>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-6 h-auto flex items-center justify-center gap-2"
          onClick={() => window.open('/join-waitlist', '_blank')}
        >
          Join Our Waitlist
          <ArrowRight className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="border-gray-300 text-gray-700 font-medium px-6 py-6 h-auto"
          onClick={() => window.open('/search', '_self')}
        >
          Browse Creators
        </Button>
      </div>
      
      <p className="text-xs text-gray-500 text-center max-w-xs">
        Join over 500+ property owners already using our platform to find top content creators
      </p>
    </div>
  );
};
