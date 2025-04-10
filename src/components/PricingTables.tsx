
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pricingTables = [
  {
    name: "Package 1",
    title: "Directory Listing",
    price: "$1,500",
    period: "annually",
    description: "Get discovered by engaged couples worldwide",
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
    ]
  },
  {
    name: "Package 2",
    title: "Listing + B2B Community",
    price: "$3,000",
    period: "annually",
    description: "Network with industry peers & gain referrals",
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
    featured: true
  },
  {
    name: "Package 3",
    title: "Complete Business Solution",
    price: "$5,750",
    period: "annually",
    description: "Complete visibility, education & network solution",
    features: [
      "Everything in Package 2",
      "Wedded Week Global Platform ($750 value)",
      "12 Exclusive Masterclasses ($2,000 value)",
      "Build Your Luxury Wedding Business Series",
      "Expert workshops & mentor access",
      "Featured in global digital wedding expo"
    ],
    missingFeatures: []
  }
];

const PricingTables = () => {
  return (
    <div className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="wedded-title text-4xl md:text-5xl mb-4">Pricing Plans</h2>
          <div className="w-24 h-1 bg-wedding-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Choose the perfect partnership level to amplify your wedding business and connect with high-intent couples worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pricingTables.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-lg overflow-hidden transition-all duration-300 ${
                plan.featured 
                  ? 'border-2 border-wedding-deep-purple shadow-xl scale-105 z-10' 
                  : 'border border-gray-200 shadow-lg hover:shadow-xl'
              }`}
            >
              {plan.featured && (
                <div className="bg-wedding-deep-purple text-white py-2 text-center font-semibold text-sm">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold mb-2 text-wedding-deep-purple">
                  {plan.name}
                </h3>
                <h4 className="text-2xl font-semibold mb-2">
                  {plan.title}
                </h4>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold text-wedding-deep-purple">{plan.price}</span>
                  <span className="text-gray-600 ml-1">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
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
                      ? 'gold-button shadow-md' 
                      : 'cta-button'
                  }`}
                >
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingTables;
