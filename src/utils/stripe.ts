
import { loadStripe } from '@stripe/stripe-js';
import { toast } from '@/components/ui/use-toast';

// Initialize Stripe with your publishable key
// Using a key that matches the format expected by Stripe
const stripePromise = loadStripe('pk_live_6SIAPyVk7F1B8fDhK2cvmzG5');

interface CreateCheckoutSessionParams {
  priceId: string;
  customerType: 'vendor' | 'venue';
  billingCycle: 'annually' | 'quarterly';
  planName: string;
}

export async function createCheckoutSession({
  priceId,
  customerType,
  billingCycle,
  planName
}: CreateCheckoutSessionParams) {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');
    
    // Create a checkout session server-side using fetch
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        customerType,
        billingCycle,
        planName,
        successUrl: `${window.location.origin}/success?plan=${planName}&type=${customerType}`,
        cancelUrl: `${window.location.origin}/pricing?canceled=true`,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create checkout session');
    }
    
    const { sessionId } = await response.json();
    
    // Redirect to checkout
    const result = await stripe.redirectToCheckout({
      sessionId,
    });
    
    if (result.error) {
      throw result.error;
    }
    
  } catch (error) {
    console.error('Error creating checkout session:', error);
    toast({
      title: "Checkout Failed",
      description: "We couldn't process your request. Please try again later or contact support.",
      variant: "destructive",
    });
    throw error;
  }
}

// Fallback implementation that directly opens a new tab to your product page
export async function handleCheckoutFallback(planName: string) {
  try {
    // This is a fallback method that simply opens your contact page
    // or a direct link to your product in Stripe's hosted checkout
    const url = `https://yourcompany.com/contact?plan=${planName}`;
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
