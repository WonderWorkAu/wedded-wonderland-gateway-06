
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Diamond, Star } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const advantages = [
  {
    text: "Get discovered by high-intent luxury couples worldwide",
    highlight: "Visibility"
  },
  {
    text: "Join an exclusive network of industry leaders & tastemakers",
    highlight: "Connection"
  },
  {
    text: "Amplify your brand across multiple premium channels",
    highlight: "Growth"
  },
  {
    text: "Receive qualified leads that match your unique style",
    highlight: "Profit"
  }
];

const CtaSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/pricing');
    }
  };
  
  const handleExplorePackages = () => {
    if (location.pathname === '/') {
      handleScrollToPricing();
    } else {
      navigate('/pricing');
    }
  };
  
  return (
    <div className="relative py-28 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069')] bg-cover bg-center bg-fixed">
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 to-wedding-deep-purple/90"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-4 border border-white/20">
              <div className="flex items-center gap-2">
                <Diamond className="h-4 w-4 text-wedding-gold fill-wedding-gold" />
                <span>Limited Memberships Available for 2025</span>
                <Diamond className="h-4 w-4 text-wedding-gold fill-wedding-gold" />
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              <span className="gold-gradient">You've Waited Long Enough.</span><br />
              It's Time to Scale Your Wedding Brand.
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join Wedded Wonderland to connect with <span className="italic">precisely the right couples</span> and industry leaders who celebrate luxury, culture, and unforgettable celebrations across the globe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-center p-5 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="mr-4 bg-wedding-gold/20 rounded-full p-1.5 border border-wedding-gold/30">
                  <Star className="h-5 w-5 text-wedding-gold fill-wedding-gold" />
                </div>
                <div>
                  <p className="text-white text-lg">{advantage.text}</p>
                  <p className="text-sm text-wedding-gold mt-1 font-medium">{advantage.highlight}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mb-12">
            <p className="text-xl text-white italic mb-8">
              "You already know Wedded Wonderland. You already admire the brand.<br />
              <span className="text-wedding-gold font-medium not-italic">Now it's time to be part of it.</span>"
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button 
              className="gold-button text-lg px-10 py-7 rounded-md flex items-center gap-3 group hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.5)]"
              onClick={handleScrollToPricing}
            >
              <span className="font-semibold tracking-wider">BECOME A WEDDED PARTNER</span>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-7 rounded-md font-medium transition-all duration-300"
              onClick={handleExplorePackages}
            >
              EXPLORE PACKAGES
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
