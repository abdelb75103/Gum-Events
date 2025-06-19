
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// IMPORTANT: Ensure STRIPE_SECRET_KEY and NEXT_PUBLIC_APP_URL are set in your .env.local for development
// and in your Vercel (or other hosting environment) project settings for production.

let stripe: Stripe | null = null;
const secretKey = process.env.STRIPE_SECRET_KEY;

if (secretKey && (secretKey.startsWith('sk_live_') || secretKey.startsWith('sk_test_'))) {
  stripe = new Stripe(secretKey, {
    apiVersion: '2024-06-20', // Use the latest API version
    typescript: true,
  });
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Stripe API] Stripe initialized successfully with a valid secret key format.');
  }
} else {
  if (!secretKey) {
    console.error('[Stripe API] CRITICAL: STRIPE_SECRET_KEY environment variable is not set. Stripe functionality will fail.');
  } else {
    console.error(`[Stripe API] CRITICAL: STRIPE_SECRET_KEY environment variable appears to be invalid or is not a secret key. It should start with 'sk_live_' or 'sk_test_'. Received key starts with: '${secretKey.substring(0, 7)}...'. Stripe functionality will fail.`);
  }
}


export async function POST(request: Request) {
  if (!stripe) {
    // This detailed error will now be logged if the key was missing or malformed based on the check above.
    console.error('[Stripe API] Stripe is not initialized. STRIPE_SECRET_KEY might be missing, invalid, or not a secret key.');
    return NextResponse.json({ error: 'Payment processing is not configured correctly. Please contact support.', details: 'Stripe secret key misconfiguration.' }, { status: 500 });
  }

  const YOUR_DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

  if (process.env.NODE_ENV === 'production' && (!YOUR_DOMAIN || YOUR_DOMAIN.includes('localhost'))) {
    console.error('[Stripe API] CRITICAL: NEXT_PUBLIC_APP_URL is not set correctly for production. It should be your Vercel app URL.');
    // Log the actual value for easier debugging in Vercel logs, but only if it's not entirely undefined.
    if (YOUR_DOMAIN) {
        console.error(`[Stripe API] NEXT_PUBLIC_APP_URL in production is currently: ${YOUR_DOMAIN}`);
    } else {
        console.error(`[Stripe API] NEXT_PUBLIC_APP_URL in production is not set.`);
    }
    return NextResponse.json({ error: 'Application URL is not configured correctly for production. Please contact support.', details: 'NEXT_PUBLIC_APP_URL misconfiguration.' }, { status: 500 });
  }
  
  const finalDomain = YOUR_DOMAIN || 'http://localhost:3000'; // Fallback for non-production if still needed

  try {
    const { amount, currency, contributionType } = await request.json();

    if (!amount || !currency || !contributionType) {
      return NextResponse.json({ error: 'Missing required parameters: amount, currency, or contributionType.' }, { status: 400 });
    }
    if (amount <= 0) {
        return NextResponse.json({ error: 'Amount must be positive.' }, { status: 400 });
    }

    const success_url = `${finalDomain}/?contribution_success=true&session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url = `${finalDomain}/?contribution_canceled=true`;

    if (process.env.NODE_ENV !== 'production') {
      console.log('[Stripe API] Attempting to create session with:');
      console.log('[Stripe API] Amount (cents):', amount);
      console.log('[Stripe API] Currency:', currency);
      console.log('[Stripe API] Contribution Type:', contributionType);
      console.log('[Stripe API] Success URL:', success_url);
      console.log('[Stripe API] Cancel URL:', cancel_url);
      console.log('[Stripe API] finalDomain used:', finalDomain);
    }


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
    };

    const session = await stripe.checkout.sessions.create(sessionOptions);

    if (!session.id) {
        throw new Error('Stripe session ID not found after creation.');
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Stripe API] Session created successfully with ID:', session.id);
    }

    return NextResponse.json({ id: session.id });

  } catch (err: any) {
    // This is where the "You did not provide an API key" error from Stripe's library is caught.
    console.error(`[Stripe API] Error creating Stripe session: ${err.message}`);
    
    let errorMessage = 'An unexpected error occurred while processing your payment. Please try again.';
    if (err instanceof Stripe.errors.StripeError) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('[Stripe API] Stripe Error Type:', err.type);
            console.error('[Stripe API] Stripe Error Code:', err.code);
        }
        // Specific message for authentication errors
        if (err.type === 'StripeAuthenticationError') {
            errorMessage = 'Payment processing authentication failed. Please contact support. (Dev: Check Stripe Secret Key)';
        }
    }
    
    return NextResponse.json({ error: errorMessage, details: process.env.NODE_ENV !== 'production' ? err.message : undefined }, { status: 500 });
  }
}
