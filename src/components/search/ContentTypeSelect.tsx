
import React from 'react';
import { Camera, ChevronDown, Video, Laptop, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const ContentTypeSelect = () => {
  const isMobile = useIsMobile();
  
  // Array of content types with their respective icons
  const contentTypes = [
    { value: "professional-photography", label: "Professional Photography", icon: Camera },
    { value: "virtual-tours", label: "Virtual Tours (360° POV)", icon: Video },
    { value: "drone-video", label: "Drone Video Tours", icon: Video },
    { value: "property-highlight", label: "Property Highlight Videos", icon: Video },
    { value: "floor-plans", label: "Floor Plans", icon: Compass },
    { value: "virtual-staging", label: "Virtual Staging", icon: Laptop },
  ];
  
  const [selectedType, setSelectedType] = React.useState("");
  const [selectedIcon, setSelectedIcon] = React.useState<React.ElementType>(Camera);
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedType(selected);
    
    // Update the icon based on the selected content type
    const content = contentTypes.find(type => type.value === selected);
    if (content) {
      setSelectedIcon(content.icon);
    } else {
      setSelectedIcon(Camera);
    }
  };
  
  // We need to render the icon component correctly using the React.ElementType
  const SelectedIcon = selectedIcon;
  
  return (
    <div className="w-full sm:w-[40%] relative group">
      <SelectedIcon className={cn(
        "w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2",
        "transition-all duration-200",
        "group-hover:text-indigo-500"
      )} />
      <ChevronDown className={cn(
        "w-3.5 h-3.5 text-gray-300 absolute right-4 top-1/2 -translate-y-1/2",
        "transition-all duration-200",
        "group-hover:text-gray-400"
      )} />
      <select
        value={selectedType}
        onChange={handleChange}
        className={cn(
          "w-full h-10 sm:h-12 pl-11 pr-10 appearance-none",
          "bg-white text-sm text-gray-700",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500/30",
          "group-hover:bg-gray-50/80",
          "font-medium",
          "border-0"
        )}
        aria-label="Select content type"
      >
        <option value="">Select content type</option>
        {contentTypes.map(type => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
};
