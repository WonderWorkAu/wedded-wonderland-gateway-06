
import React from 'react';
import { Check } from 'lucide-react';
import { useCMSStore } from '@/store/cmsStore';

const StatsBar = () => {
  const { statsContent } = useCMSStore();
  
  return (
    <div className="bg-wedding-black text-wedding-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h3 className="text-xl md:text-2xl font-medium text-wedding-white mb-2">
            {statsContent.heading}
          </h3>
          <div className="w-20 h-0.5 bg-wedding-white mx-auto mb-8"></div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
            {statsContent.brands?.map((brand, index) => (
              <div 
                key={index} 
                className="text-xl md:text-2xl font-serif italic font-bold opacity-90 hover:text-wedding-medium-gray transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-12">
          {statsContent.stats?.map((stat, index) => (
            <div key={index} className="flex flex-col items-center p-6 backdrop-blur-sm bg-white/5 rounded-none border border-white/20">
              <h3 className="text-4xl md:text-6xl font-bold bw-gradient mb-2">{stat.value}</h3>
              <p className="text-base md:text-lg font-medium mt-2 text-white/90">{stat.label}</p>
              <div className="mt-3 flex items-center text-sm text-white/70">
                <Check className="h-4 w-4 text-white mr-1" />
                <span>{stat.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
