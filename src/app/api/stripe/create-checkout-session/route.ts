
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

    const success_url = `${YOUR_DOMAIN}/?contribution_success=true&session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url = `${YOUR_DOMAIN}/?contribution_canceled=true`;

    console.log('[Stripe API] Attempting to create session with:');
    console.log('[Stripe API] Amount (cents):', amount);
    console.log('[Stripe API] Currency:', currency);
    console.log('[Stripe API] Contribution Type:', contributionType);
    console.log('[Stripe API] Success URL:', success_url);
    console.log('[Stripe API] Cancel URL:', cancel_url);
    console.log('[Stripe API] YOUR_DOMAIN used:', YOUR_DOMAIN);


    let sessionOptions: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: contributionType === 'monthly' ? 'Monthly Contribution to GUM Events' : 'One-off Contribution to GUM Events',
            },
            unit_amount: amount, // Amount in cents
            ...(contributionType === 'monthly' && { recurring: { interval: 'month' } }),
          },
          quantity: 1,
        },
      ],
      mode: contributionType === 'monthly' ? 'subscription' : 'payment',
      success_url: success_url,
      cancel_url: cancel_url,
      // automatic_payment_methods: {enabled: true}, // Consider enabling for more payment methods
    };

    const session = await stripe.checkout.sessions.create(sessionOptions);

    if (!session.id) {
        throw new Error('Stripe session ID not found after creation.');
    }
    console.log('[Stripe API] Session created successfully with ID:', session.id);

    return NextResponse.json({ id: session.id });

  } catch (err: any) {
    console.error('[Stripe API] Error creating Stripe session:', err.message);
    // Log the full error for server-side debugging, but don't expose it all to client
    // console.error(err); 
    
    let errorMessage = 'An unexpected error occurred while processing your payment. Please try again.';
    if (err instanceof Stripe.errors.StripeError) {
        console.error('[Stripe API] Stripe Error Type:', err.type);
        console.error('[Stripe API] Stripe Error Code:', err.code);
        // Potentially customize message based on err.code or err.type
        // For instance, if it's a card error, Stripe.js often handles it on the client.
        // If it reaches here, it might be a configuration or more general API issue.
    }
    return NextResponse.json({ error: errorMessage, details: err.message }, { status: 500 });
  }
}
