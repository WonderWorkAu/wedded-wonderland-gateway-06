
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/pricing');
    }
  };
  
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with luxury overlay */}
      <div className="absolute inset-0 bg-wedding-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070')] bg-cover bg-center bg-fixed opacity-20"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="animate-fade-in mb-6 inline-block py-1.5 px-3 md:px-4 rounded-full bg-wedding-light-gray/30 backdrop-blur-sm border border-wedding-medium-gray/20">
            <div className="flex items-center">
              <Star className="h-3 w-3 md:h-4 md:w-4 text-wedding-black mr-1 md:mr-2 fill-wedding-gold" />
              <span className="text-xs md:text-sm font-medium text-wedding-black">For Elite Wedding Professionals Only</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-wedding-black mb-6 md:mb-8 leading-tight">
            Your Craft Is <span className="gold-gradient">World-Class.</span> {isMobile ? '' : <br />}
            Your <span className="gold-gradient">Visibility</span> Should Be Too.
          </h1>
          
          <p className="text-lg md:text-2xl text-wedding-charcoal mb-8 max-w-3xl">
            Join the exclusive network reaching <span className="text-wedding-black font-semibold">10M+ monthly couples</span> across <span className="text-wedding-black font-semibold">54+ countries</span> who are actively searching for exceptional wedding professionals like you.
          </p>
          
          <div className="mb-10 md:mb-12 py-4 md:py-6 px-6 md:px-8 bg-wedding-black/90 backdrop-blur-md rounded-xl">
            <p className="text-lg md:text-2xl italic text-white font-light">
              "You've mastered your craft. Now it's time to <span className="text-wedding-gold font-normal not-italic">master your market.</span>"
            </p>
          </div>
          
          <Button 
            className="gold-button text-base md:text-lg px-8 md:px-10 py-6 md:py-7 rounded-md flex items-center gap-3 group hover:scale-105 transition-all duration-300 border border-wedding-black"
            onClick={handleScrollToPricing}
          >
            <span className="font-semibold">BECOME A WEDDED PARTNER</span>
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
          </Button>
          
          <p className="mt-6 text-xs md:text-sm text-wedding-dark-gray italic">
            *Limited memberships available for 2025
          </p>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-wedding-light-gray/20 to-transparent"></div>
    </div>
  );
};

export default HeroSection;
