import 'server-only';

import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

try {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  
  if (apiKey) {
    stripeInstance = new Stripe(apiKey, {
      apiVersion: '2023-10-16', // Specify a fixed API version
    });
    console.log('Stripe initialized successfully');
  } else {
    console.error('STRIPE_SECRET_KEY is not defined in environment variables');
  }
} catch (error) {
  console.error('Error initializing Stripe:', error);
}

// Export a function that returns either the Stripe instance or throws a clear error
export function getStripe(): Stripe {
  if (!stripeInstance) {
    throw new Error('Stripe not initialized. Check STRIPE_SECRET_KEY environment variable.');
  }
  return stripeInstance;
}

// For backwards compatibility
export const stripe = stripeInstance || new Stripe('dummy_key_for_build', {
  apiVersion: '2023-10-16',
});