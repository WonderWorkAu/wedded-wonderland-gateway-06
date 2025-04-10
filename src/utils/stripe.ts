
import { loadStripe } from '@stripe/stripe-js';
import { toast } from '@/components/ui/use-toast';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_live_6SIAPyVk7F1B8fDhK2cvmzG5');

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
    
    // Redirect to Stripe Checkout using priceId directly
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        { price: priceId, quantity: 1 }
      ],
      mode: 'subscription',
      successUrl: `${window.location.origin}/success?plan=${planName}&type=${customerType}`,
      cancelUrl: `${window.location.origin}/pricing?canceled=true`,
    });
    
    if (error) {
      console.error('Stripe checkout error:', error);
      throw error;
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
    // This is a fallback method that simply opens your contact page
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
