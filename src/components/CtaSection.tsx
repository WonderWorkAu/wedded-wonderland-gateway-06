
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

const advantages = [
  "Get discovered by high-intent couples worldwide",
  "Join an exclusive network of industry leaders",
  "Amplify your brand across multiple channels",
  "Receive qualified leads and referrals"
];

const CtaSection = () => {
  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-wedding-deep-purple/95 to-wedding-deep-purple/85"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-4">
              Limited Memberships Available
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Wedding Business?</h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Join Wedded Wonderland to connect with couples and industry leaders who celebrate luxury, culture, and unforgettable celebrations all over the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-center">
                <div className="mr-3 bg-wedding-gold/20 rounded-full p-1">
                  <Check className="h-5 w-5 text-wedding-gold" />
                </div>
                <p className="text-white">{advantage}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="gold-button text-lg px-10 py-6 rounded-md flex items-center gap-2 group">
              Become a Partner
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
            </Button>
            <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-6 rounded-md">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
