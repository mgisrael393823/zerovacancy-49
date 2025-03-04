
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SortOption {
  label: string;
  value: string;
}

interface SortMenuProps {
  options: SortOption[];
  onSort: (value: string) => void;
  defaultValue: string;
}

export const SortMenu: React.FC<SortMenuProps> = ({ options, onSort, defaultValue }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Sort by:</span>
      <Select 
        defaultValue={defaultValue}
        onValueChange={(value) => onSort(value)}
      >
        <SelectTrigger className="min-w-[140px] h-9 text-sm">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className="text-sm">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
