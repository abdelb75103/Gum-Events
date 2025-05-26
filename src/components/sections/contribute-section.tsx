
"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Gift, Euro } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';
import { cn } from "@/lib/utils";

// REPLACE WITH YOUR ACTUAL STRIPE PUBLISHABLE KEY
const STRIPE_PUBLISHABLE_KEY = "pk_test_YOUR_STRIPE_PUBLISHABLE_KEY";
let stripePromise: Promise<any>; 

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default function ContributeSection() {
  const [amount, setAmount] = useState<string>("10.00"); 
  const [contributionType, setContributionType] = useState<'once-off' | 'monthly'>('once-off');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleContribution = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMessage("Please enter a valid amount.");
      setIsLoading(false);
      return;
    }

    console.log(`Initiating ${contributionType} contribution of EUR ${numericAmount.toFixed(2)}`);

    // TODO: In a real application:
    // 1. Replace '/api/stripe/create-checkout-session' with your actual backend endpoint.
    // 2. Your backend should create a Stripe Checkout Session using your Stripe SECRET KEY
    //    and return its ID. It should handle the amount (in cents) and contributionType.
    try {
      // THIS IS A PLACEHOLDER ENDPOINT - YOU NEED TO IMPLEMENT THIS ON YOUR BACKEND
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: numericAmount * 100, // Stripe expects amount in cents
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
        setErrorMessage(session.error || "Could not create payment session. Please try again. (Ensure backend is set up)");
      }
    } catch (error: any) {
      console.error("Error during contribution process:", error);
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const displayAmount = parseFloat(amount || "0").toFixed(2);

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

        <div className="my-10 mx-auto max-w-xl">
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

        <Card className="p-6 sm:p-8 shadow-xl mx-auto max-w-md text-left">
          <div className="space-y-6">
            <div>
              <Label htmlFor="contribution-amount-styled" className="text-base font-medium text-foreground mb-2 block">
                Choose your contribution amount
              </Label>
              <div className="rounded-lg p-0.5 bg-gradient-to-r from-primary to-accent">
                <div className="relative flex items-center rounded-md bg-background">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Euro className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <Input
                    type="number"
                    name="contribution-amount-styled"
                    id="contribution-amount-styled"
                    className="w-full border-transparent bg-transparent pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 sm:text-sm"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    aria-label="Contribution Amount in Euros"
                    min="1"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium text-foreground mb-2 block">
                Select contribution type
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={contributionType === 'once-off' ? "default" : "outline"}
                  onClick={() => setContributionType('once-off')}
                  className={cn(
                    "py-3 text-base rounded-md",
                    contributionType === 'once-off'
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-card text-foreground border-border hover:bg-muted"
                  )}
                  disabled={isLoading}
                >
                  Once-off
                </Button>
                <Button
                  variant={contributionType === 'monthly' ? "default" : "outline"}
                  onClick={() => setContributionType('monthly')}
                  className={cn(
                    "py-3 text-base rounded-md",
                    contributionType === 'monthly'
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : "bg-card text-foreground border-border hover:bg-muted"
                  )}
                  disabled={isLoading}
                >
                  Monthly
                </Button>
              </div>
            </div>

            <Button
              size="lg"
              className={cn(
                "w-full text-lg py-3 rounded-md",
                contributionType === 'once-off' 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "bg-accent text-accent-foreground hover:bg-accent/90"
              )}
              onClick={handleContribution}
              disabled={isLoading || !amount || parseFloat(amount) <= 0}
            >
              {isLoading ? 'Processing...' : `Contribute €${displayAmount}`}
            </Button>
          </div>
        </Card>

        {errorMessage && (
          <p className="mt-4 text-sm text-destructive">{errorMessage}</p>
        )}

        <p className="mt-8 text-sm text-muted-foreground">
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
