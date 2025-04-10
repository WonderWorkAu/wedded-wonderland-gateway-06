
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Welcome to the <span className="gold-gradient">Wedded Network</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
            Your gateway to the world's most exclusive wedding market
          </p>
          <Button className="gold-button text-lg px-10 py-6 rounded-md flex items-center gap-2 group">
            Become a Wedded Partner
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
