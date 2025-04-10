
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PricingTables from '@/components/PricingTables';
import { toast } from '@/components/ui/use-toast';

const Pricing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const canceled = searchParams.get('canceled');

  useEffect(() => {
    if (canceled === 'true') {
      toast({
        title: "Checkout Canceled",
        description: "Your checkout process was canceled. Feel free to try again when you're ready.",
        variant: "default",
      });
    }
  }, [canceled]);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Scroll to pricing tables if we're arriving from another page
    const fromOtherPage = searchParams.get('scroll') === 'true';
    if (fromOtherPage) {
      setTimeout(scrollToPricing, 100);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-wedding-deep-purple mb-2">
            Join the Wedded Network
          </h1>
          <p className="text-gray-700">
            Select the perfect plan for your wedding business
          </p>
        </div>
        
        <PricingTables />
        
        <div className="mt-12 text-center">
          <Button 
            variant="link" 
            onClick={() => navigate(-1)}
            className="text-wedding-deep-purple"
          >
            Return to previous page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
