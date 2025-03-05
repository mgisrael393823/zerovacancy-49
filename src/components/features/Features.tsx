
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { CheckCircle2, ShieldCheck, Zap, Clock, Globe, HeartHandshake } from 'lucide-react';

export const FeaturesSectionWithHoverEffects = () => {
  const isMobile = useIsMobile();
  
  const features = [
    {
      title: 'Quality Verified Creators',
      description: 'Every creator on our platform is vetted for quality and professionalism',
      icon: CheckCircle2,
      color: 'bg-green-500/10',
      textColor: 'text-green-600',
      iconColor: 'text-green-500'
    },
    {
      title: 'Secure Transactions',
      description: 'Your payments are protected with industry-leading security measures',
      icon: ShieldCheck,
      color: 'bg-blue-500/10',
      textColor: 'text-blue-600',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Fast Turnaround',
      description: 'Get your property content created quickly with our efficient creator network',
      icon: Zap,
      color: 'bg-amber-500/10',
      textColor: 'text-amber-600',
      iconColor: 'text-amber-500'
    },
    {
      title: '24/7 Support',
      description: 'Our customer service team is available round the clock to assist you',
      icon: Clock,
      color: 'bg-purple-500/10',
      textColor: 'text-purple-600',
      iconColor: 'text-purple-500'
    },
    {
      title: 'Global Network',
      description: 'Access talented creators from around the world for your property marketing',
      icon: Globe,
      color: 'bg-cyan-500/10',
      textColor: 'text-cyan-600',
      iconColor: 'text-cyan-500'
    },
    {
      title: 'Client Satisfaction',
      description: 'We pride ourselves on our high customer satisfaction and retention rates',
      icon: HeartHandshake,
      color: 'bg-rose-500/10',
      textColor: 'text-rose-600',
      iconColor: 'text-rose-500'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Why Choose Our Platform
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600">
          We connect property managers with skilled content creators through our secure, efficient platform
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={cn(
              "relative rounded-xl overflow-hidden p-6 border border-gray-100",
              "bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out",
              "flex flex-col h-full"
            )}
            initial={isMobile ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.1 * index,
              ease: "easeInOut"
            }}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center mb-4",
              feature.color
            )}>
              <feature.icon className={cn("w-6 h-6", feature.iconColor)} />
            </div>
            <h3 className={cn(
              "text-lg font-semibold mb-2",
              feature.textColor
            )}>
              {feature.title}
            </h3>
            <p className="text-gray-600 flex-grow">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
