
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key from environment variables
// IMPORTANT: Ensure STRIPE_SECRET_KEY is set in your .env.local for development
// and in your hosting environment's settings for production.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', // Use the latest API version
  typescript: true,
});

export async function POST(request: Request) {
  try {
    const { amount, currency, contributionType } = await request.json();

    if (!amount || !currency || !contributionType) {
      return NextResponse.json({ error: 'Missing required parameters: amount, currency, or contributionType.' }, { status: 400 });
    }
    if (amount <= 0) {
        return NextResponse.json({ error: 'Amount must be positive.' }, { status: 400 });
    }


    const YOUR_DOMAIN = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    let sessionOptions: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'], // Stripe Checkout enables Apple/Google Pay if configured in dashboard
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: contributionType === 'monthly' ? 'Monthly Contribution to GUM Events' : 'One-off Contribution to GUM Events',
              // You can add more product details like description or images here
              // description: "Support Growing Up Muslim Events",
              // images: [`${YOUR_DOMAIN}/images/logo.png`], // Example image
            },
            unit_amount: amount, // Amount in cents, e.g., 1000 for €10.00
            ...(contributionType === 'monthly' && { recurring: { interval: 'month' } }),
          },
          quantity: 1,
        },
      ],
      mode: contributionType === 'monthly' ? 'subscription' : 'payment',
      success_url: `${YOUR_DOMAIN}/?contribution_success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/?contribution_canceled=true`,
      // To enable Apple Pay / Google Pay, ensure they are active in your Stripe dashboard settings
      // for Checkout. Stripe will automatically show them if the customer is eligible and has them set up.
      // You may also need to verify your domain with Stripe for Apple Pay.
      // Consider using automatic_payment_methods for broader payment method support if desired:
      // automatic_payment_methods: {enabled: true},
      // For strong customer authentication (SCA) compliance, Stripe handles this by default with Checkout.
    };

    // If you have predefined Stripe Price IDs for monthly subscriptions, you would use them here.
    // For example:
    // if (contributionType === 'monthly' && process.env.STRIPE_MONTHLY_PRICE_ID) {
    //   sessionOptions.line_items = [{ price: process.env.STRIPE_MONTHLY_PRICE_ID, quantity: 1 }];
    // } else if (contributionType === 'monthly' && !process.env.STRIPE_MONTHLY_PRICE_ID) {
    //   // Handle error: monthly contribution selected but no priceId provided/configured
    //   // Or, dynamically create a Price if that's your desired flow (more complex).
    //   console.warn("Monthly contribution selected, but no STRIPE_MONTHLY_PRICE_ID environment variable is set. Using price_data with recurring.");
    //   // The current price_data approach will create a new price each time for the subscription.
    //   // For better management, consider creating a fixed Product and Price in your Stripe Dashboard
    //   // or creating them via the API if they don't exist and then reusing them.
    // }

    const session = await stripe.checkout.sessions.create(sessionOptions);

    if (!session.id) {
        throw new Error('Stripe session ID not found after creation.');
    }

    return NextResponse.json({ id: session.id });

  } catch (err: any) {
    console.error('Error creating Stripe session:', err);
    // Don't expose detailed Stripe errors to the client in production
    let errorMessage = 'An unexpected error occurred while processing your payment. Please try again.';
    if (err instanceof Stripe.errors.StripeError) {
        // More specific error handling for Stripe errors can be done here if needed
        // For example, logging specific error types or codes
        console.error('Stripe Error Type:', err.type);
        console.error('Stripe Error Code:', err.code);
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

    