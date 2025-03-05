
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ContentTypeSelect } from './ContentTypeSelect';
import { LocationInput } from './LocationInput';
import { SearchButton } from './SearchButton';
import { SearchFilters } from './SearchFilters';
import { useIsMobile } from '@/hooks/use-mobile';

interface SearchBarProps {
  value?: string;
  onLocationSelect: (location: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value = '', onLocationSelect }) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-col gap-3">
        <div className={cn(
          "relative flex flex-col sm:flex-row w-full rounded-lg sm:rounded-xl overflow-hidden",
          "sm:shadow-[0_3px_16px_rgba(0,0,0,0.08)]",
          "border border-gray-300 sm:border-gray-200",
          "bg-white divide-y sm:divide-y-0 sm:divide-x divide-gray-200",
          "transition-all duration-300",
          "hover:shadow-[0_5px_20px_rgba(0,0,0,0.1)]"
        )}>
          <ContentTypeSelect />
          <LocationInput value={value} onLocationSelect={onLocationSelect} />
          <SearchButton />
        </div>

        {/* Mobile Search Button */}
        <div className="sm:hidden">
          <Button 
            className={cn(
              "w-full h-11",
              "bg-primary hover:bg-primary/90 text-white",
              "shadow-sm hover:shadow-md transition-all duration-200",
              "text-sm rounded-lg",
              "flex items-center justify-center"
            )}
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>

        <SearchFilters
          showMoreFilters={showMoreFilters}
          onToggleFilters={() => setShowMoreFilters(!showMoreFilters)}
        />
      </div>
    </div>
  );
};
