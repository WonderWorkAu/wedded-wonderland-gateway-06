
import React from 'react';
import { Check, X, ArrowRight, Star, Diamond, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const pricingTables = [
  {
    name: "Directory",
    title: "Get Discovered",
    price: "$1,500",
    period: "annually",
    description: "Your essential gateway to the global luxury wedding market",
    features: [
      "Premium Directory Listing ($1,500 value)",
      "Get discovered by engaged couples and industry peers",
      "Multi-channel brand visibility across all platforms",
      "Curated global network association",
      "Wedded Partner Badge for your website & marketing",
      "Professional profile with portfolio showcase"
    ],
    missingFeatures: [
      "B2B Private Community Access",
      "Wedded Week Global Platform",
      "Exclusive Masterclasses",
      "Priority Feature Opportunities",
      "Direct Referral Program"
    ],
    primaryBenefit: "Visibility & Credibility",
    roi: "Avg. 3x return in new client bookings",
    color: "from-wedding-gold/40 to-wedding-gold/20"
  },
  {
    name: "Network",
    title: "Get Connected",
    price: "$3,000",
    period: "annually",
    description: "The complete solution for serious wedding professionals",
    features: [
      "Everything in Directory package",
      "B2B Private Community Access ($1,500 value)",
      "Industry referrals and direct connections",
      "Monthly engagement opportunities",
      "Industry updates and insider insights",
      "Collaboration & partnership opportunities",
      "Early access to Wedded initiatives",
      "Cross-promotional opportunities"
    ],
    missingFeatures: [
      "Wedded Week Global Platform",
      "Exclusive Masterclasses",
      "Priority Feature Opportunities"
    ],
    featured: true,
    primaryBenefit: "Community & Collaboration",
    roi: "Avg. 5x return in referrals & bookings",
    color: "from-wedding-deep-purple/40 to-wedding-deep-purple/20"
  },
  {
    name: "Elite",
    title: "Get Elevated",
    price: "$5,750",
    period: "annually",
    description: "The ultimate growth platform for industry leaders",
    features: [
      "Everything in Network package",
      "Wedded Week Global Platform ($750 value)",
      "12 Exclusive Masterclasses ($2,000 value)",
      "Priority Feature Opportunities",
      "Build Your Luxury Wedding Business Series",
      "Expert workshops & mentor access",
      "Featured in global digital wedding expo",
      "VIP concierge client referral service",
      "Exclusive industry events & summits",
      "Direct access to Wedded leadership team"
    ],
    missingFeatures: [],
    primaryBenefit: "Transformation & Growth",
    roi: "Avg. 8x return in business growth",
    color: "from-wedding-light-purple/40 to-wedding-deep-purple/30"
  }
];

const PricingTables = () => {
  return (
    <div className="section-padding bg-gradient-to-b from-white to-wedding-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-3 py-1 bg-wedding-deep-purple/10 text-wedding-deep-purple border-wedding-deep-purple/30 backdrop-blur-sm">
            Your Investment in Excellence
          </Badge>
          <h2 className="wedded-title text-4xl md:text-5xl mb-6">Choose Your Path to Extraordinary Growth</h2>
          <div className="w-24 h-1 bg-wedding-gold mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Select the perfect partnership level that aligns with your vision and transforms your wedding business on the global stage.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pricingTables.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.featured 
                  ? 'border-2 border-wedding-deep-purple shadow-2xl scale-105 z-10' 
                  : 'border border-gray-200 shadow-xl hover:shadow-2xl hover:scale-102 hover:z-10'
              }`}
            >
              {plan.featured && (
                <div className="bg-wedding-deep-purple text-white py-2 text-center font-semibold tracking-wider flex items-center justify-center gap-2">
                  <Diamond className="h-4 w-4 fill-wedding-gold text-wedding-gold" />
                  MOST POPULAR CHOICE
                  <Diamond className="h-4 w-4 fill-wedding-gold text-wedding-gold" />
                </div>
              )}
              
              <div className="p-8 bg-white">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-2xl font-bold text-wedding-deep-purple">
                      {plan.name}
                    </h3>
                    <div className={`bg-gradient-to-r ${plan.color} p-1.5 rounded-full`}>
                      <Star className="h-5 w-5 fill-wedding-gold text-wedding-gold" />
                    </div>
                  </div>
                  <h4 className="text-xl font-medium mb-3 text-gray-700">
                    {plan.title}
                  </h4>
                </div>
                
                <div className="flex flex-col mb-4">
                  <div className={`bg-gradient-to-br ${plan.color} p-6 rounded-lg mb-5`}>
                    <div className="flex items-end mb-3">
                      <span className="text-5xl font-bold text-wedding-deep-purple">{plan.price}</span>
                      <span className="text-gray-600 ml-1 mb-1">/{plan.period}</span>
                    </div>
                    <p className="text-gray-700 font-medium">{plan.description}</p>
                  </div>
                  
                  <div className="mb-5 flex items-center text-wedding-gold">
                    <Diamond className="h-5 w-5 mr-2 fill-wedding-gold text-wedding-gold" />
                    <p className="font-semibold">{plan.primaryBenefit}</p>
                  </div>
                  
                  <div className="bg-wedding-light-purple/10 p-4 rounded-lg text-center mb-5 border border-wedding-light-purple/20">
                    <p className="text-sm font-medium text-wedding-deep-purple">{plan.roi}</p>
                  </div>
                </div>
                
                <div className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.missingFeatures.map((feature, i) => (
                    <div key={i} className="flex items-start text-gray-400">
                      <Lock className="h-5 w-5 text-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full font-semibold tracking-wider ${
                    plan.featured 
                      ? 'gold-button shadow-xl flex items-center justify-center gap-2 py-7'
                      : 'bg-wedding-deep-purple text-white hover:bg-wedding-purple flex items-center justify-center gap-2 py-7'
                  }`}
                >
                  {plan.featured ? 'APPLY NOW — RECOMMENDED' : 'APPLY NOW'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-wedding-deep-purple/80 max-w-xl mx-auto">
            All packages include a risk-free 30-day satisfaction guarantee. 
            Join the thousands of wedding professionals who have transformed their business through the Wedded Network.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingTables;
