
import React from 'react';
import { Check, X, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const pricingTables = [
  {
    name: "Package 1",
    title: "Directory Listing",
    price: "$1,500",
    period: "annually",
    description: "The essential visibility package to get discovered",
    features: [
      "Directory Listing ($1,500 value)",
      "Get discovered by engaged couples and industry peers",
      "Multi-channel brand visibility",
      "Curated global network access",
      "Wedded Partner Badge"
    ],
    missingFeatures: [
      "B2B Private Community",
      "Wedded Week Global Platform",
      "Exclusive Masterclasses"
    ],
    primaryBenefit: "Get Discovered",
    roi: "Avg. 3x investment in client bookings"
  },
  {
    name: "Package 2",
    title: "Listing + B2B Community",
    price: "$3,000",
    period: "annually",
    description: "Our most popular option for serious professionals",
    features: [
      "Everything in Package 1",
      "B2B Private Community Access ($1,500 value)",
      "Industry referrals and connections",
      "Monthly engagement opportunities",
      "Industry updates and insights"
    ],
    missingFeatures: [
      "Wedded Week Global Platform",
      "Exclusive Masterclasses"
    ],
    featured: true,
    primaryBenefit: "Get Connected",
    roi: "Avg. 5x investment in referrals & bookings"
  },
  {
    name: "Package 3",
    title: "Complete Business Solution",
    price: "$5,750",
    period: "annually",
    description: "The ultimate growth platform for industry leaders",
    features: [
      "Everything in Package 2",
      "Wedded Week Global Platform ($750 value)",
      "12 Exclusive Masterclasses ($2,000 value)",
      "Build Your Luxury Wedding Business Series",
      "Expert workshops & mentor access",
      "Featured in global digital wedding expo"
    ],
    missingFeatures: [],
    primaryBenefit: "Get Elevated",
    roi: "Avg. 8x investment in total business growth"
  }
];

const PricingTables = () => {
  return (
    <div className="section-padding bg-gradient-to-b from-white to-wedding-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-3 py-1 bg-wedding-deep-purple/10 text-wedding-deep-purple border-wedding-deep-purple/30 backdrop-blur-sm">
            Exclusive Membership Options
          </Badge>
          <h2 className="wedded-title text-4xl md:text-5xl mb-4">Choose Your Path to Excellence</h2>
          <div className="w-24 h-1 bg-wedding-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Select the perfect partnership level to amplify your wedding business on the global stage.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pricingTables.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.featured 
                  ? 'border-2 border-wedding-deep-purple shadow-2xl scale-105 z-10' 
                  : 'border border-gray-200 shadow-xl hover:shadow-2xl'
              }`}
            >
              {plan.featured && (
                <div className="bg-wedding-deep-purple text-white py-2 text-center font-semibold">
                  MOST POPULAR CHOICE
                </div>
              )}
              
              <div className="p-8 bg-white">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1 text-wedding-deep-purple">
                    {plan.name}
                  </h3>
                  <h4 className="text-xl font-medium mb-3 text-gray-700">
                    {plan.title}
                  </h4>
                </div>
                
                <div className="flex flex-col mb-4">
                  <div className="bg-wedding-cream/30 p-4 rounded-lg mb-5">
                    <div className="flex items-end mb-2">
                      <span className="text-4xl font-bold text-wedding-deep-purple">{plan.price}</span>
                      <span className="text-gray-600 ml-1">/{plan.period}</span>
                    </div>
                    <p className="text-gray-700">{plan.description}</p>
                  </div>
                  
                  <div className="mb-5 flex items-center text-wedding-gold">
                    <Star className="h-5 w-5 mr-2 fill-wedding-gold text-wedding-gold" />
                    <p className="font-semibold">{plan.primaryBenefit}</p>
                  </div>
                  
                  <div className="bg-wedding-light-purple/10 p-3 rounded-lg text-center mb-5">
                    <p className="text-sm font-medium text-wedding-deep-purple">{plan.roi}</p>
                  </div>
                </div>
                
                <div className="mb-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.missingFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center text-gray-400">
                      <X className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full ${
                    plan.featured 
                      ? 'gold-button shadow-md flex items-center justify-center gap-2'
                      : 'cta-button flex items-center justify-center gap-2'
                  }`}
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-wedding-deep-purple/80 max-w-xl mx-auto">
            All plans include a risk-free 30-day satisfaction guarantee. 
            Join the thousands of wedding professionals who have elevated their business through the Wedded Network.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingTables;
