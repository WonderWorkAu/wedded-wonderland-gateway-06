
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
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-wedding-black/40 z-10"></div>
        <video 
          className="object-cover w-full h-full"
          autoPlay
          muted
          loop
          playsInline
          src="https://weddednetwork.com/wp-content/uploads/2022/10/WW_HOMEPAGEVIDEO-1.mp4"
        >
          <source src="https://weddednetwork.com/wp-content/uploads/2022/10/WW_HOMEPAGEVIDEO-1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="animate-fade-in mb-6 inline-block py-1.5 px-3 md:px-4 rounded-none bg-wedding-white/10 backdrop-blur-sm border border-wedding-white/20">
            <div className="flex items-center">
              <Star className="h-3 w-3 md:h-4 md:w-4 text-wedding-white mr-1 md:mr-2" />
              <span className="text-xs md:text-sm font-medium text-wedding-white">For Elite Wedding Professionals Only</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-light text-wedding-white mb-6 md:mb-8 leading-tight tracking-tight">
            Your Craft Is <span className="font-semibold">World-Class.</span> {isMobile ? '' : <br />}
            Your <span className="font-semibold">Visibility</span> Should Be Too.
          </h1>
          
          <p className="text-lg md:text-2xl text-wedding-white/90 mb-8 max-w-3xl">
            Join the exclusive network reaching <span className="text-wedding-white font-semibold">10M+ monthly couples</span> across <span className="text-wedding-white font-semibold">54+ countries</span> who are actively searching for exceptional wedding professionals like you.
          </p>
          
          <div className="mb-10 md:mb-12 py-4 md:py-6 px-6 md:px-8 bg-wedding-white/10 backdrop-blur-sm rounded-none">
            <p className="text-lg md:text-2xl italic text-wedding-white font-light">
              "You've mastered your craft. Now it's time to <span className="text-wedding-white font-normal not-italic">master your market.</span>"
            </p>
          </div>
          
          <Button 
            className="bg-wedding-white text-wedding-black text-base md:text-lg px-8 md:px-10 py-6 md:py-7 rounded-none flex items-center gap-3 group hover:scale-105 transition-all duration-300 uppercase tracking-widest"
            onClick={handleScrollToPricing}
          >
            <span className="font-semibold">BECOME A WEDDED PARTNER</span>
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
          </Button>
          
          <p className="mt-6 text-xs md:text-sm text-wedding-white/80 italic">
            *Limited memberships available for 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
