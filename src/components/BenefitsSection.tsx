
import React from 'react';
import { Globe, Users, MegaphoneIcon, PhoneCall, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCMSStore } from '@/store/cmsStore';

const BenefitsSection = () => {
  const navigate = useNavigate();
  const { benefitsContent } = useCMSStore();

  // Function to render the appropriate icon based on the icon name string
  const renderIcon = (iconName: string) => {
    const props = { className: "h-10 w-10" };
    switch (iconName) {
      case 'Globe': return <Globe {...props} />;
      case 'Users': return <Users {...props} />;
      case 'MegaphoneIcon': return <MegaphoneIcon {...props} />;
      case 'PhoneCall': return <PhoneCall {...props} />;
      case 'Award': return <Award {...props} />;
      default: return <Globe {...props} />; // Default to Globe if icon not found
    }
  };

  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/pricing?scroll=true');
    }
  };

  return (
    <div className="section-padding bg-gradient-to-b from-white to-wedding-cream/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-wedding-light-purple/20 text-wedding-deep-purple text-sm font-medium mb-4">
            The Wedded Advantage
          </div>
          <h2 className="wedded-title text-4xl md:text-5xl mb-4">{benefitsContent.title}</h2>
          <div className="w-24 h-1 bg-wedding-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {benefitsContent.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsContent.benefits.map((benefit, index) => (
            <div key={index} className="benefit-card flex flex-col h-full">
              <div className="feature-icon-wrapper">
                {renderIcon(benefit.icon)}
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
        
        <div className="mt-16 text-center flex justify-center">
          <Button 
            className="gold-button text-lg py-6 px-10 uppercase tracking-wider flex items-center gap-2"
            onClick={handleScrollToPricing}
          >
            {benefitsContent.cta}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
