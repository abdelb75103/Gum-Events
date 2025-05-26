
"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Gift, Repeat, Euro } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';

// TODO: Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = "pk_test_YOUR_STRIPE_PUBLISHABLE_KEY"; 
let stripePromise: Promise<any>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default function ContributeSection() {
  const [amount, setAmount] = useState<string>("10.00"); // Default amount
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleContribution = async (contributionType: 'one-time' | 'recurring') => {
    setIsLoading(true);
    setErrorMessage(null);
    console.log(`Initiating ${contributionType} contribution of EUR ${amount}`);

    // TODO: In a real application:
    // 1. Validate the amount.
    // 2. Replace '/api/stripe/create-checkout-session' with your actual backend endpoint.
    // 3. Your backend should create a Stripe Checkout Session and return its ID.
    try {
      const response = await fetch('/api/stripe/create-checkout-session', { // PLACEHOLDER_API_ENDPOINT
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          amount: parseFloat(amount) * 100, // Stripe expects amount in cents
          currency: 'eur',
          contributionType: contributionType,
         }),
      });

      const session = await response.json();

      if (response.ok && session.id) {
        const stripe = await getStripe();
        if (!stripe) {
            setErrorMessage("Stripe.js failed to load.");
            setIsLoading(false);
            return;
        }
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (error) {
          console.error("Stripe redirection error:", error.message);
          setErrorMessage(error.message);
        }
      } else {
        console.error("Failed to create Stripe session:", session.error || "Unknown error");
        setErrorMessage(session.error || "Could not create payment session. Please try again.");
      }
    } catch (error: any) {
      console.error("Error during contribution process:", error);
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contribute" className="py-16 sm:py-24 bg-background">
      <Container className="text-center">
        <div className="inline-block">
          <Gift className="mx-auto h-12 w-12 text-primary mb-4" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Support Our Mission
        </h2>
        <div className="mt-2 mx-auto h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>
        <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
          Your generous contributions help us continue our work, organize impactful events, 
          and support the GUM community. Choose how you'd like to make a difference.
        </p>
        <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
          Watch the video below to see the impact your support can make.
        </p>

        <div className="my-10 mx-auto max-w-2xl">
            <video
              width="100%"
              controls
              controlsList="nodownload"
              preload="metadata"
              className="rounded-xl shadow-xl aspect-video"
              aria-label="Our Mission Video"
            >
              <source src="/videos/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag. Consider updating to a more modern browser.
            </video>
        </div>

        <div className="mx-auto max-w-md space-y-6">
          <div>
            <Label htmlFor="contribution-amount" className="sr-only">Contribution Amount (EUR)</Label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Euro className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              </div>
              <Input
                type="number"
                name="contribution-amount"
                id="contribution-amount"
                className="block w-full rounded-md border-input bg-background pl-10 pr-4 focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="10.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                aria-label="Contribution Amount in Euros"
                min="1" // Basic validation
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto"
              onClick={() => handleContribution('one-time')}
              disabled={isLoading}
            >
              <Gift className="mr-2 h-5 w-5" />
              {isLoading ? 'Processing...' : 'One-Time Contribution'}
            </Button>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
              onClick={() => handleContribution('recurring')}
              disabled={isLoading}
            >
              <Repeat className="mr-2 h-5 w-5" />
              {isLoading ? 'Processing...' : 'Monthly Support'}
            </Button>
          </div>
        </div>
        
        {errorMessage && (
            <p className="mt-4 text-sm text-destructive">{errorMessage}</p>
        )}

        <p className="mt-6 text-sm text-muted-foreground">
          We use Stripe for secure and easy online contributions. Thank you for your support!
        </p>

        <div className="mt-12 max-w-2xl mx-auto text-left">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg hover:no-underline">
                What will my contribution be used for?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Your contributions are vital to our mission. They help fund:
                <ul className="list-disc space-y-1 pl-5 mt-2">
                  <li>Organizing impactful community events and workshops.</li>
                  <li>Inviting knowledgeable speakers and scholars.</li>
                  <li>Developing educational resources and materials.</li>
                  <li>Maintaining our online platforms and community channels.</li>
                  <li>Covering operational costs to ensure GUM can continue its work effectively.</li>
                </ul>
                Every contribution, no matter the size, makes a real difference. Thank you for your generosity!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Container>
    </section>
  );
}

