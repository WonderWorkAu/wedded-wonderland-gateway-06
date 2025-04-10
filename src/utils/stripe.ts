
import { loadStripe } from '@stripe/stripe-js';

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

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      successUrl: `${window.location.origin}/success?plan=${planName}&type=${customerType}`,
      cancelUrl: `${window.location.origin}/pricing?canceled=true`,
    });

    if (error) {
      console.error('Error redirecting to checkout:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}
