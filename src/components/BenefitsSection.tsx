
import React from 'react';
import { Globe, Users, MegaphoneIcon, PhoneCall, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefitsData = [
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Be Discovered in the Global Directory",
    description: "Get found by high-intent couples and trusted industry professionals through our curated international directory."
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Join a Premium, Vetted Community",
    description: "Become part of a global network spanning 54+ countries and 7 continents, built on excellence and trust."
  },
  {
    icon: <MegaphoneIcon className="h-10 w-10" />,
    title: "Amplify Your Brand Across Channels",
    description: "Gain visibility through strategic features through prioritised submissions on social media, in digital magazines, newsletters, and editorial showcases."
  },
  {
    icon: <PhoneCall className="h-10 w-10" />,
    title: "Receive Qualified Referrals Through Our Concierge",
    description: "Get matched with couples via our personalised vendor recommendation service, designed to drive real results."
  },
  {
    icon: <Award className="h-10 w-10" />,
    title: "Build Trust Through Brand Association",
    description: "Align your business with one of the world's most recognised and respected names in the wedding industry."
  }
];

const BenefitsSection = () => {
  return (
    <div className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="wedded-title text-4xl md:text-5xl mb-4">Why Join the Network?</h2>
          <div className="w-24 h-1 bg-wedding-gold mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-wedding-light-purple/20 p-5 rounded-full mb-6 text-wedding-deep-purple">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-wedding-deep-purple">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button className="cta-button text-lg uppercase tracking-wider">
            APPLY TO JOIN TODAY
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
