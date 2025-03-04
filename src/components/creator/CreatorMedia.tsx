
import React, { useState } from 'react';

interface Creator {
  name: string;
  image: string;
}

interface CreatorMediaProps {
  creator: Creator;
  onImageLoad?: (imageSrc: string) => void;
  onVideoLoad?: () => void;
}

export const getMedia = (creator: Creator) => {
  if (creator.name === 'Emily Johnson') {
    return { type: 'image', src: '/newemilyprofile.jpg' };
  }
  if (creator.name === 'Jane Cooper') {
    return { type: 'image', src: '/janeprofile.png' };
  }
  if (creator.name === 'Michael Brown') {
    return { 
      type: 'video', 
      src: '/michaelprofile.mov',
      fallback: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952'
    };
  }
  return { type: 'image', src: creator.image };
};

export const CreatorMedia: React.FC<CreatorMediaProps> = ({ 
  creator, 
  onImageLoad,
  onVideoLoad
}) => {
  const [imageError, setImageError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  const media = getMedia(creator);
  
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (onImageLoad) {
      onImageLoad(creator.image);
    }
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    if (onVideoLoad) {
      onVideoLoad();
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div className="relative aspect-[4/3]">
      {((media.type === 'image') || (media.type === 'video' && imageError)) ? (
        <img 
          src={media.type === 'image' ? media.src : (media as any).fallback}
          alt={`${creator.name} profile`}
          className="w-full h-full object-cover object-center"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      ) : (
        <>
          {/* Video element with fallback in case it fails to load */}
          <video
            src={media.src}
            className="w-full h-full object-cover object-center"
            onError={() => setImageError(true)}
            onLoadedData={handleVideoLoad}
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Fallback image that shows while video is loading */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
        </>
      )}
      
      {/* Semi-transparent dark overlay to improve text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 pointer-events-none"></div>
    </div>
  );
};
