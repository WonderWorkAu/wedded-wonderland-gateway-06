
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CtaSection = () => {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069')] bg-cover bg-center">
        <div className="absolute inset-0 bg-wedding-deep-purple/90"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Amplify Your Wedding Business?</h2>
        <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
          Join Wedded Wonderland to connect with couples and industry leaders who celebrate luxury, culture, and unforgettable celebrations all over the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="gold-button text-lg px-10 py-6 rounded-md flex items-center gap-2 group">
            Become a Partner
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
          </Button>
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-10 py-6 rounded-md">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
