
import { loadStripe } from '@stripe/stripe-js';
import { toast } from '@/components/ui/use-toast';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_live_6SIAPyVk7F1B8fDhK2cvmzG5');

// Get the current domain - works in development and production
const getDomain = () => {
  return window.location.origin;
};

interface CreateCheckoutSessionParams {
  priceId: string;
  customerType: 'vendor' | 'venue';
  billingCycle: 'annually' | 'quarterly';
  planName: string;
}

// Client-only checkout implementation
export async function createCheckoutSession({
  priceId,
  customerType,
  billingCycle,
  planName
}: CreateCheckoutSessionParams) {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');
    
    // Get current domain for success and cancel URLs
    const domain = getDomain();
    
    try {
      // Redirect to Stripe Checkout using priceId directly
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          { price: priceId, quantity: 1 }
        ],
        mode: 'subscription',
        successUrl: `${domain}/success?plan=${encodeURIComponent(planName)}&type=${customerType}`,
        cancelUrl: `${domain}/pricing?canceled=true`,
      });
      
      if (error) {
        console.error('Stripe checkout error:', error);
        throw error;
      }
    } catch (redirectError) {
      // If there's a domain configuration error, use the alternative checkout
      console.error('Redirect to checkout failed:', redirectError);
      
      // Check if it's a domain configuration error
      if (redirectError.message && redirectError.message.includes('domain')) {
        toast({
          title: "Development Environment Detected",
          description: "Using direct checkout link instead. In production, this would be a seamless redirect.",
          duration: 5000,
        });
        
        // For development environments, open Stripe checkout in a new tab
        // This uses Stripe's hosted checkout page which doesn't have domain restrictions
        const checkoutUrl = `https://checkout.stripe.com/pay/${priceId}`;
        window.open(checkoutUrl, '_blank');
        return;
      }
      
      throw redirectError; // Rethrow if it's not a domain error
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    toast({
      title: "Checkout Failed",
      description: "We couldn't process your request. Please try again later or contact support.",
      variant: "destructive",
    });
    
    // Use the fallback method when direct checkout fails
    await handleCheckoutFallback(planName);
    throw error;
  }
}

// Fallback implementation that directly opens a new tab to your contact page
export async function handleCheckoutFallback(planName: string) {
  try {
    // This is a fallback method that opens your contact page
    const domain = 'https://lp.weddedwonderland.com';
    const url = `${domain}/contact?plan=${encodeURIComponent(planName)}`;
    window.open(url, '_blank');
    
    toast({
      title: "Redirecting to contact form",
      description: "Our payment system is temporarily unavailable. Please reach out directly to complete your purchase.",
      variant: "default",
    });
  } catch (error) {
    console.error('Fallback checkout error:', error);
    toast({
      title: "Navigation Failed",
      description: "Please contact us directly to complete your purchase.",
      variant: "destructive",
    });
  }
}
