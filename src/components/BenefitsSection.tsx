
import React from 'react';
import { Globe, Users, MegaphoneIcon, PhoneCall, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefitsData = [
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Global Directory Discovery",
    description: "Get found by high-intent couples and trusted industry professionals through our curated international directory.",
    highlight: "10M+ monthly audience"
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Elite Network Access",
    description: "Become part of a global network spanning 54+ countries and 7 continents, built on excellence and trust.",
    highlight: "Premium, vetted community"
  },
  {
    icon: <MegaphoneIcon className="h-10 w-10" />,
    title: "Multi-Channel Brand Amplification",
    description: "Gain visibility through strategic features across social media, digital magazines, newsletters, and editorial showcases.",
    highlight: "3M+ social followers"
  },
  {
    icon: <PhoneCall className="h-10 w-10" />,
    title: "Qualified Referral Concierge",
    description: "Get matched with couples via our personalised vendor recommendation service, designed to drive real results.",
    highlight: "Direct booking opportunities"
  },
  {
    icon: <Award className="h-10 w-10" />,
    title: "Prestige By Association",
    description: "Align your business with one of the world's most recognised and respected names in the wedding industry.",
    highlight: "Instant credibility boost"
  }
];

const BenefitsSection = () => {
  return (
    <div className="section-padding bg-gradient-to-b from-white to-wedding-cream/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-wedding-light-purple/20 text-wedding-deep-purple text-sm font-medium mb-4">
            The Wedded Advantage
          </div>
          <h2 className="wedded-title text-4xl md:text-5xl mb-4">Why Top Professionals Join Our Network</h2>
          <div className="w-24 h-1 bg-wedding-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Unlock unparalleled opportunities to grow your luxury wedding business on a global scale
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="benefit-card flex flex-col h-full">
              <div className="feature-icon-wrapper">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-wedding-deep-purple">{benefit.title}</h3>
              <p className="text-gray-600 mb-4">{benefit.description}</p>
              <div className="mt-auto">
                <div className="inline-block py-1 px-2 bg-wedding-gold/10 rounded text-sm font-medium text-wedding-deep-purple">
                  {benefit.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-wedding-deep-purple font-medium mb-6">
            Ready to elevate your business to the next level?
          </p>
          <Button className="gold-button text-lg py-6 px-10 uppercase tracking-wider flex items-center gap-2">
            APPLY TO JOIN TODAY
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
