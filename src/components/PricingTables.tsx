import React, { useState } from 'react';
import { Check, X, ArrowRight, Star, Diamond, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { createCheckoutSession, handleCheckoutFallback } from '@/utils/stripe';
import { toast } from '@/components/ui/use-toast';

type CustomerType = 'vendor' | 'venue';
type BillingCycle = 'annually' | 'quarterly';

// Pricing details with Stripe integration
const PRICING_CONFIG = {
  vendor: {
    Directory: {
      quarterly: {
        price: "$500",
        stripePriceId: "price_placeholder_directory_quarterly"
      },
      annually: {
        price: "$1,500",
        stripePriceId: "price_placeholder_directory_annually"
      }
    },
    Network: {
      quarterly: {
        price: "$1,000",
        stripePriceId: "price_placeholder_network_quarterly"
      },
      annually: {
        price: "$3,000",
        stripePriceId: "price_placeholder_network_annually"
      }
    },
    Elite: {
      quarterly: {
        price: "$1,950",
        stripePriceId: "price_1RCCTaIA2rpN54RVHKxj96fo"  // Elite quarterly
      },
      annually: {
        price: "$5,750",
        stripePriceId: "price_1RCCTaIA2rpN54RVvwtb9uLR"  // Elite annual
      }
    }
  },
  venue: {
    "Venue Listing": {
      quarterly: {
        price: "$850",
        stripePriceId: "price_placeholder_venue_listing_quarterly"
      },
      annually: {
        price: "$2,500",
        stripePriceId: "price_placeholder_venue_listing_annually"
      }
    },
    "Venue Elite": {
      quarterly: {
        price: "$1,650",
        stripePriceId: "price_placeholder_venue_elite_quarterly"
      },
      annually: {
        price: "$4,750",
        stripePriceId: "price_placeholder_venue_elite_annually"
      }
    }
  }
};

const PricingTables = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annually');
  const [customerType, setCustomerType] = useState<CustomerType>('vendor');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const vendorPricingTables = [
    {
      name: "Directory",
      title: "Get Discovered",
      quarterlyPrice: "$500",
      annualPrice: "$1,500",
      period: billingCycle,
      description: "Your essential gateway to the global luxury wedding market",
      features: [
        "Premium Directory Listing ($1,500 value)",
        "Get discovered by engaged couples and industry peers",
        "Multi-channel brand visibility across all platforms",
        "Curated global network association",
        "Wedded Network Badge for your website & marketing",
        "Professional profile with portfolio showcase"
      ],
      missingFeatures: [
        "B2B Private Community Access",
        "Wedded Week Global placement",
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
      quarterlyPrice: "$1,000",
      annualPrice: "$3,000",
      period: billingCycle,
      description: "The complete solution for serious wedding professionals",
      features: [
        "Everything in Directory package",
        "B2B Private Community Access ($1,500 value)",
        "Industry referrals and direct connections",
        "Monthly engagement opportunities",
        "Industry updates and insider insights",
        "Collaboration & partnership opportunities",
        "Early access to Wedded initiatives"
      ],
      missingFeatures: [
        "Wedded Week Global placement",
        "Exclusive Masterclasses",
        "Priority Feature Opportunities"
      ],
      primaryBenefit: "Community & Collaboration",
      roi: "Avg. 5x return in referrals & bookings",
      color: "from-wedding-deep-purple/40 to-wedding-deep-purple/20"
    },
    {
      name: "Elite",
      title: "Get Elevated",
      quarterlyPrice: "$1,950",
      annualPrice: "$5,750",
      period: billingCycle,
      description: "The ultimate growth platform for industry leaders",
      features: [
        "Everything in Network package",
        "Wedded Week Global placement",
        "12 Exclusive Masterclasses ($2,000 value)",
        "Priority Feature Opportunities",
        "Expert workshops & mentor access",
        "Exclusive industry events & summits",
        "VIP concierge client referral service"
      ],
      missingFeatures: [],
      featured: true,
      primaryBenefit: "Transformation & Growth",
      roi: "Avg. 8x return in business growth",
      color: "from-wedding-light-purple/40 to-wedding-deep-purple/30"
    }
  ];
  
  const venuePricingTables = [
    {
      name: "Venue Listing",
      title: "Showcase Your Space",
      quarterlyPrice: "$850",
      annualPrice: "$2,500",
      period: billingCycle,
      description: "Premium visibility for your unique venue",
      features: [
        "Vendor Directory Listing",
        "PR & Social Media Assets",
        "Member Badge",
        "Editorial Mention",
        "Professional venue profile with gallery",
        "Venue-specific search filters",
        "Targeted exposure to planners & couples"
      ],
      missingFeatures: [
        "Advanced booking management tools",
        "Premium placement in search results",
        "Dedicated venue promotion campaigns"
      ],
      primaryBenefit: "Venue Visibility",
      roi: "Avg. 4x return in venue bookings",
      color: "from-wedding-gold/40 to-wedding-gold/20"
    },
    {
      name: "Venue Elite",
      title: "Premium Venue Partner",
      quarterlyPrice: "$1,650",
      annualPrice: "$4,750",
      period: billingCycle,
      description: "Complete promotion & booking solution for distinctive venues",
      features: [
        "Everything in Venue Listing package",
        "Premium placement in venue search",
        "Featured venue campaigns",
        "Virtual tour integration",
        "Direct planner connections",
        "Venue booking optimization",
        "Industry event hosting opportunities"
      ],
      missingFeatures: [],
      featured: true,
      primaryBenefit: "Premium Promotion & Bookings",
      roi: "Avg. 6x return in venue business",
      color: "from-wedding-light-purple/40 to-wedding-deep-purple/30"
    }
  ];
  
  const pricingTables = customerType === 'vendor' ? vendorPricingTables : venuePricingTables;

  // Handle checkout
  const handleCheckout = async (plan: string) => {
    try {
      setIsProcessing(plan);
      
      // Get the appropriate price ID from our config
      const priceId = PRICING_CONFIG[customerType]?.[plan]?.[billingCycle]?.stripePriceId;
      
      if (!priceId) {
        throw new Error('Price ID not found');
      }
      
      // Use the client-only checkout method with enhanced error handling
      await createCheckoutSession({
        priceId,
        customerType,
        billingCycle,
        planName: plan
      });
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Process",
        description: "You'll be contacted by our team to complete your subscription.",
        variant: "default"
      });
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="section-padding bg-gradient-to-b from-white to-wedding-cream/30 px-4 md:px-0">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="mb-4 px-3 py-1 bg-wedding-deep-purple/10 text-wedding-deep-purple border-wedding-deep-purple/30 backdrop-blur-sm">
            Your Investment in Excellence
          </Badge>
          <h2 className="wedded-title text-3xl md:text-5xl mb-6">Choose Your Path to Extraordinary Growth</h2>
          <div className="w-24 h-1 bg-wedding-gold mx-auto mb-6 md:mb-8"></div>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Select the perfect partnership level that aligns with your vision and transforms your wedding business on the global stage.
          </p>
          
          {/* Customer Type Selector */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex items-center gap-3 mb-4 bg-white p-3 rounded-full shadow-sm border border-gray-200 max-w-xs mx-auto">
              <div className="flex items-center space-x-2 w-full justify-between">
                <Label htmlFor="customer-toggle" className={`text-sm font-medium cursor-pointer ${customerType === 'vendor' ? 'text-wedding-deep-purple' : 'text-gray-500'}`}>
                  I am a Vendor
                </Label>
                <Switch
                  id="customer-toggle"
                  checked={customerType === 'venue'}
                  onCheckedChange={(checked) => setCustomerType(checked ? 'venue' : 'vendor')}
                  className="data-[state=checked]:bg-wedding-deep-purple"
                />
                <Label htmlFor="customer-toggle" className={`text-sm font-medium cursor-pointer ${customerType === 'venue' ? 'text-wedding-deep-purple' : 'text-gray-500'}`}>
                  I am a Venue
                </Label>
              </div>
            </div>
          </div>
          
          {/* Billing Cycle Toggle */}
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="flex items-center space-x-2 bg-white p-1 rounded-full border border-gray-200 shadow-sm">
              <ToggleGroup 
                type="single" 
                defaultValue="annually"
                value={billingCycle} 
                onValueChange={(value) => value && setBillingCycle(value as 'annually' | 'quarterly')}
                className="bg-white rounded-full px-1"
              >
                <ToggleGroupItem 
                  value="quarterly" 
                  aria-label="Toggle quarterly billing"
                  className={`rounded-full px-5 py-2 text-sm transition-all ${billingCycle === 'quarterly' ? 'bg-wedding-deep-purple text-white' : 'bg-transparent text-gray-600'}`}
                >
                  Quarterly
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="annually" 
                  aria-label="Toggle annual billing"
                  className={`rounded-full px-5 py-2 text-sm transition-all ${billingCycle === 'annually' ? 'bg-wedding-deep-purple text-white' : 'bg-transparent text-gray-600'}`}
                >
                  Annually <span className="ml-1 text-xs bg-wedding-gold/20 text-wedding-deep-purple px-2 py-0.5 rounded-full">Save 25%</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
        
        {isMobile ? (
          <div className="space-y-6">
            {pricingTables.map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  plan.featured 
                    ? 'border-2 border-wedding-deep-purple shadow-lg relative' 
                    : 'border border-gray-200 shadow-md'
                }`}
              >
                {plan.featured && (
                  <div className="bg-wedding-deep-purple text-white py-2 text-center font-semibold tracking-wider flex items-center justify-center gap-2">
                    <Diamond className="h-4 w-4 fill-wedding-gold text-wedding-gold" />
                    MOST POPULAR
                    <Diamond className="h-4 w-4 fill-wedding-gold text-wedding-gold" />
                  </div>
                )}
                
                <div className="p-6 bg-white">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-wedding-deep-purple">
                        {plan.name}
                      </h3>
                      <div className={`bg-gradient-to-r ${plan.color} p-1.5 rounded-full`}>
                        <Star className="h-5 w-5 fill-wedding-gold text-wedding-gold" />
                      </div>
                    </div>
                    <h4 className="text-lg font-medium text-gray-700">
                      {plan.title}
                    </h4>
                  </div>
                  
                  <div className={`bg-gradient-to-br ${plan.color} p-4 rounded-lg mb-4`}>
                    <div className="flex flex-col mb-2">
                      <div className="flex items-end">
                        <span className="text-3xl font-bold text-wedding-deep-purple">
                          {billingCycle === 'annually' ? plan.annualPrice : plan.quarterlyPrice}
                        </span>
                        <span className="text-gray-600 ml-1 mb-1">/{billingCycle === 'annually' ? 'year' : 'quarter'}</span>
                      </div>
                      {billingCycle === 'quarterly' && (
                        <div className="text-xs text-gray-600 mt-1">Annual: {plan.annualPrice}</div>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">{plan.description}</p>
                  </div>
                  
                  <div className="mb-3 flex items-center text-wedding-gold">
                    <Diamond className="h-4 w-4 mr-2 fill-wedding-gold text-wedding-gold" />
                    <p className="font-semibold text-sm">{plan.primaryBenefit}</p>
                  </div>
                  
                  <div className="bg-wedding-light-purple/10 p-3 rounded-lg text-center mb-4 border border-wedding-light-purple/20">
                    <p className="text-xs font-medium text-wedding-deep-purple">{plan.roi}</p>
                  </div>
                  
                  <details className="mb-4">
                    <summary className="cursor-pointer text-sm font-medium text-wedding-deep-purple flex items-center">
                      View All Features <ArrowRight className="ml-1 h-3 w-3" />
                    </summary>
                    <div className="mt-3 space-y-2 pl-1 border-l-2 border-wedding-light-purple/30">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-xs">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.missingFeatures.map((feature, i) => (
                        <div key={i} className="flex items-start text-gray-400">
                          <Lock className="h-4 w-4 text-gray-300 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                  
                  <Button 
                    className={`w-full font-semibold py-4 ${
                      plan.featured 
                        ? 'gold-button shadow-md'
                        : 'bg-wedding-deep-purple text-white hover:bg-wedding-purple'
                    }`}
                    disabled={isProcessing !== null}
                    onClick={() => handleCheckout(plan.name)}
                  >
                    {isProcessing === plan.name ? (
                      <span className="flex items-center gap-2">Processing...</span>
                    ) : (
                      <span className="flex items-center gap-1">
                        {plan.featured ? 'APPLY NOW — BEST VALUE' : 'APPLY NOW'}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {customerType === 'vendor' ? (
              pricingTables.map((plan, index) => (
                <div 
                  key={index} 
                  className={`rounded-2xl overflow-hidden relative transition-all duration-300 ${
                    plan.featured 
                      ? 'border-2 border-wedding-deep-purple shadow-2xl md:scale-105 md:z-10' 
                      : 'border border-gray-200 shadow-xl hover:shadow-2xl hover:scale-102 hover:z-10'
                  }`}
                >
                  {plan.featured && (
                    <div className="bg-wedding-deep-purple text-white py-2 text-center font-semibold tracking-wider flex items-center justify-center gap-2 overflow-visible">
                      <Diamond className="h-4 w-4 fill-wedding-gold text-wedding-gold" />
                      MOST POPULAR CHOICE
                      <Diamond className="h-4 w-4 fill-wedding-gold text-wedding-gold" />
                    </div>
                  )}
                  
                  <div className="p-6 md:p-8 bg-white h-full flex flex-col">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl md:text-2xl font-bold text-wedding-deep-purple">
                          {plan.name}
                        </h3>
                        <div className={`bg-gradient-to-r ${plan.color} p-1.5 rounded-full`}>
                          <Star className="h-5 w-5 fill-wedding-gold text-wedding-gold" />
                        </div>
                      </div>
                      <h4 className="text-lg md:text-xl font-medium mb-3 text-gray-700">
                        {plan.title}
                      </h4>
                    </div>
                    
                    <div className="flex flex-col mb-4">
                      <div className={`bg-gradient-to-br ${plan.color} p-4 md:p-6 rounded-lg mb-5`}>
                        <div className="flex flex-col mb-2">
                          <div className="flex items-end">
                            <span className="text-3xl md:text-4xl font-bold text-wedding-deep-purple">
                              {billingCycle === 'annually' ? plan.annualPrice : plan.quarterlyPrice}
                            </span>
                            <span className="text-gray-600 ml-1 mb-1">/{billingCycle === 'annually' ? 'year' : 'quarter'}</span>
                          </div>
                          {billingCycle === 'quarterly' && (
                            <div className="text-sm text-gray-600 mt-1">Annual: {plan.annualPrice}</div>
                          )}
                        </div>
                        <p className="text-sm md:text-base text-gray-700 font-medium">{plan.description}</p>
                      </div>
                      
                      <div className="mb-5 flex items-center text-wedding-gold">
                        <Diamond className="h-5 w-5 mr-2 fill-wedding-gold text-wedding-gold" />
                        <p className="font-semibold text-sm md:text-base">{plan.primaryBenefit}</p>
                      </div>
                      
                      <div className="bg-wedding-light-purple/10 p-3 md:p-4 rounded-lg text-center mb-5 border border-wedding-light-purple/20">
                        <p className="text-xs md:text-sm font-medium text-wedding-deep-purple">{plan.roi}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6 md:mb-8 space-y-3 flex-grow">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <Check className="h-4 md:h-5 w-4 md:w-5 text-green-500 mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-xs md:text-sm">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.missingFeatures.map((feature, i) => (
                        <div key={i} className="flex items-start text-gray-400">
                          <Lock className="h-4 md:h-5 w-4 md:w-5 text-gray-300 mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-xs md:text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={`w-full font-semibold text-sm tracking-wider mt-auto ${
                        plan.featured 
                          ? 'gold-button shadow-md py-5'
                          : 'bg-wedding-deep-purple text-white hover:bg-wedding-purple py-5'
                      }`}
                      disabled={isProcessing !== null}
                      onClick={() => handleCheckout(plan.name)}
                    >
                      {isProcessing === plan.name ? (
                        <span className="flex items-center gap-2">Processing...</span>
                      ) : (
                        <span className="flex items-center gap-2 whitespace-nowrap">
                          {plan.featured ? 'APPLY NOW — BEST VALUE' : 'APPLY NOW'}
                          <ArrowRight className="h-4 w-4 flex-shrink-0" />
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              venuePricingTables.map((plan, index) => (
                <div 
                  key={index} 
                  className={`rounded-2xl overflow-hidden relative transition-all duration-300 ${
                    plan.featured 
                      ? 'border-2 border-wedding-deep-purple shadow-2xl md:scale-105 md:z-10 col-span-1 md:col-span-2' 
                      : 'border border-gray-200 shadow-xl hover:shadow-2xl hover:scale-102 hover:z-10'
                  }`}
                >
                  {plan.featured && (
                    <div className="bg-wedding-deep-purple text-white py-2 text-center font-semibold tracking-wider flex items-center justify-center gap-2 overflow-visible">
                      <Diamond className="h-4 w-4 fill-wedding-gold text-wedding-gold" />
                      PREMIUM VENUE SOLUTION
                      <Diamond className="h-4 w-4 fill-wedding-gold text-wedding-gold" />
                    </div>
                  )}
                  
                  <div className="p-6 md:p-8 bg-white h-full flex flex-col">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl md:text-2xl font-bold text-wedding-deep-purple">
                          {plan.name}
                        </h3>
                        <div className={`bg-gradient-to-r ${plan.color} p-1.5 rounded-full`}>
                          <Star className="h-5 w-5 fill-wedding-gold text-wedding-gold" />
                        </div>
                      </div>
                      <h4 className="text-lg md:text-xl font-medium mb-3 text-gray-700">
                        {plan.title}
                      </h4>
                    </div>
                    
                    <div className="flex flex-col mb-4">
                      <div className={`bg-gradient-to-br ${plan.color} p-4 md:p-6 rounded-lg mb-5`}>
                        <div className="flex flex-col mb-2">
                          <div className="flex items-end">
                            <span className="text-3xl md:text-4xl font-bold text-wedding-deep-purple">
                              {billingCycle === 'annually' ? plan.annualPrice : plan.quarterlyPrice}
                            </span>
                            <span className="text-gray-600 ml-1 mb-1">/{billingCycle === 'annually' ? 'year' : 'quarter'}</span>
                          </div>
                          {billingCycle === 'quarterly' && (
                            <div className="text-sm text-gray-600 mt-1">Annual: {plan.annualPrice}</div>
                          )}
                        </div>
                        <p className="text-sm md:text-base text-gray-700 font-medium">{plan.description}</p>
                      </div>
                      
                      <div className="mb-5 flex items-center text-wedding-gold">
                        <Diamond className="h-5 w-5 mr-2 fill-wedding-gold text-wedding-gold" />
                        <p className="font-semibold text-sm md:text-base">{plan.primaryBenefit}</p>
                      </div>
                      
                      <div className="bg-wedding-light-purple/10 p-3 md:p-4 rounded-lg text-center mb-5 border border-wedding-light-purple/20">
                        <p className="text-xs md:text-sm font-medium text-wedding-deep-purple">{plan.roi}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6 md:mb-8 space-y-3 flex-grow">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <Check className="h-4 md:h-5 w-4 md:w-5 text-green-500 mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-xs md:text-sm">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.missingFeatures.map((feature, i) => (
                        <div key={i} className="flex items-start text-gray-400">
                          <Lock className="h-4 md:h-5 w-4 md:w-5 text-gray-300 mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-xs md:text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={`w-full font-semibold text-sm tracking-wider mt-auto ${
                        plan.featured 
                          ? 'gold-button shadow-md py-5'
                          : 'bg-wedding-deep-purple text-white hover:bg-wedding-purple py-5'
                      }`}
                      disabled={isProcessing !== null}
                      onClick={() => handleCheckout(plan.name)}
                    >
                      {isProcessing === plan.name ? (
                        <span className="flex items-center gap-2">Processing...</span>
                      ) : (
                        <span className="flex items-center gap-2 whitespace-nowrap">
                          {plan.featured ? 'APPLY NOW — PREMIUM CHOICE' : 'APPLY NOW'}
                          <ArrowRight className="h-4 w-4 flex-shrink-0" />
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        
        <div className="mt-10 md:mt-12 text-center">
          <p className="text-xs md:text-sm text-wedding-deep-purple/80 max-w-xl mx-auto">
            All packages include a risk-free 30-day satisfaction guarantee. 
            Join the thousands of wedding professionals who have transformed their business through the Wedded Network.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingTables;
