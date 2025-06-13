
"use client";

import { useState, useEffect } from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Gift, Euro, CheckCircle2 } from "lucide-react";
import { loadStripe, type Stripe } from '@stripe/stripe-js';
import { cn } from "@/lib/utils";

// Use your Stripe TEST Publishable Key for development
const STRIPE_PUBLISHABLE_KEY = "pk_test_51RZYec09qz89DSAwDXCJdqiSaEipQoTUc0yf7XMjSENuHCmqMPP4vLgYSWVtwJckYKaioXfmxhs5EXlu7ZfKmy0a00NqaiVecw";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    if (STRIPE_PUBLISHABLE_KEY && (STRIPE_PUBLISHABLE_KEY.startsWith("pk_test_") || STRIPE_PUBLISHABLE_KEY.startsWith("pk_live_"))) {
      stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
    } else {
      console.warn("Stripe Publishable Key is a placeholder or invalid. Stripe.js will not be loaded. Please use your actual Stripe Publishable key.");
      stripePromise = Promise.resolve(null);
    }
  }
  return stripePromise;
};

interface ContributeSectionProps {
  displayContributionSuccess?: boolean;
}

export default function ContributeSection({ displayContributionSuccess = false }: ContributeSectionProps) {
  const [amount, setAmount] = useState<string>("");
  const [contributionType, setContributionType] = useState<'once-off' | 'monthly'>('once-off');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(displayContributionSuccess);

  useEffect(() => {
    setShowSuccessAlert(displayContributionSuccess);
    if (displayContributionSuccess) {
      // Clear the success query parameters from the URL
      const url = new URL(window.location.href);
      url.searchParams.delete('contribution_success');
      url.searchParams.delete('session_id'); // Also remove session_id if present
      window.history.replaceState({}, '', url.toString());
    }
  }, [displayContributionSuccess]);


  const handleContribution = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setShowSuccessAlert(false); // Hide previous success message if trying again

    if (!STRIPE_PUBLISHABLE_KEY || (!STRIPE_PUBLISHABLE_KEY.startsWith("pk_test_") && !STRIPE_PUBLISHABLE_KEY.startsWith("pk_live_"))) {
        setErrorMessage("Stripe is not configured correctly with a valid Publishable Key. Please check the key in the code.");
        setIsLoading(false);
        return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMessage("Please enter a valid amount.");
      setIsLoading(false);
      return;
    }

    console.log(`Initiating ${contributionType} contribution of EUR ${numericAmount.toFixed(2)}`);

    try {
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
          setErrorMessage("Stripe.js failed to load. Ensure your Publishable key is correct and Stripe is not being blocked.");
          setIsLoading(false);
          return;
        }
        try {
          const { error: stripeJsError } = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
          if (stripeJsError) {
            console.error("Stripe.js pre-redirection error:", stripeJsError.message);
            setErrorMessage(stripeJsError.message ?? "An error occurred preparing for Stripe redirection.");
          }
        } catch (domError: any) {
          console.error("Error during Stripe redirection attempt:", domError);
          let displayMessage = "An unexpected error occurred during Stripe redirection. Please try again later.";
          if (domError.name === 'SecurityError' || (domError.message && (domError.message.includes('permission to navigate') || domError.message.includes('sandboxed frame')))) {
            displayMessage = "Redirect to Stripe Checkout was blocked. This can happen in restricted environments (like some development previews or iframes). Please try in a new browser tab or ensure the environment allows cross-origin navigation.";
          } else if (domError.message) {
            displayMessage = domError.message;
          }
          setErrorMessage(displayMessage);
        }
      } else {
        console.error("Failed to create Stripe session:", session.error || "Unknown server error");
        setErrorMessage(session.error || "Could not initiate payment. Please ensure the backend is correctly set up to create a Stripe Checkout session and your Stripe Secret Key is configured.");
      }
    } catch (error: any) {
      console.error("Error during contribution process:", error);
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const displayAmount = parseFloat(amount || "0").toFixed(2);
  const isKeyPlaceholder = !STRIPE_PUBLISHABLE_KEY || (!STRIPE_PUBLISHABLE_KEY.startsWith("pk_test_") && !STRIPE_PUBLISHABLE_KEY.startsWith("pk_live_"));
  const isButtonDisabled = isLoading || !amount || parseFloat(amount) <= 0 || isKeyPlaceholder;


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

        {showSuccessAlert && (
          <Alert className="mt-8 max-w-lg mx-auto text-left border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/30 p-6 rounded-lg shadow-lg">
            <div className="flex">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <AlertTitle className="text-xl font-semibold text-green-700 dark:text-green-300">Contribution Successful!</AlertTitle>
                <AlertDescription className="mt-2 text-base text-green-600 dark:text-green-400 space-y-2">
                  <p>Thank you for your generous support! Your contribution helps us continue our mission. Barak Allahu feekum!</p>
                  <p className="text-sm">Please think about sharing with family and friends who may also want to support, and please keep us in your duas - GUM team</p>
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}

        <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground text-center">
          <strong>We need your help!</strong>
        </p>
        <p className="mt-2 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground text-left">
          As we continue to grow and serve the community, your support helps us continue to host life-changing events and also offer free and/or discounted tickets to those who may not have the financial means and new Muslims. Together, we can build a sustainable future.
        </p>
        <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground text-left">
          Your contribution, big or small, supports not just your Islamic journey but countless others.
        </p>

        <Card className="p-6 sm:p-8 shadow-xl mx-auto max-w-md text-left mt-10 bg-card">
          <CardContent className="p-0">
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
                loading={isLoading}
                disabled={isButtonDisabled}
              >
                {isLoading ? "Processing..." : (isKeyPlaceholder ? "Configure Stripe Key" : `Contribute €${displayAmount}`)}
              </Button>
            </div>
          </CardContent>
        </Card>

        {errorMessage && (
          <p className="mt-4 text-sm text-destructive">{errorMessage}</p>
        )}
        {isKeyPlaceholder && (
           <p className="mt-4 text-sm text-orange-600 dark:text-orange-400">
            Stripe Publishable Key is not correctly configured. Payment cannot be processed.
          </p>
        )}

        <p className="mt-8 text-sm text-muted-foreground">
          We use Stripe for secure and easy online contributions. Thank you for your support!
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Apple Pay and Google Pay may be available depending on your device and browser.
        </p>

        <div className="mt-12 max-w-2xl mx-auto text-left">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg hover:no-underline">
                What will my contribution be used for?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Your contributions will go towards:
                <ul className="list-disc space-y-1 pl-5 mt-2">
                  <li>Sponsoring free tickets for new Muslims.</li>
                  <li>Sponsoring free/discunted tickets for those who may not have the financial means.</li>
                  <li>Covering event costs: venues, flights, hotels, honorariums, photography/videography.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
