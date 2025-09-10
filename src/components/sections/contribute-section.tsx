
"use client";

import { useState, useEffect, useRef } from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Euro, CheckCircle2, PlayCircle } from "lucide-react";
import { loadStripe, type Stripe } from '@stripe/stripe-js';
import { cn } from "@/lib/utils";

// Use your Stripe LIVE Publishable Key
const STRIPE_PUBLISHABLE_KEY = "pk_live_51RZYeU03fmxR0FPJMt0o4IRKOQ67JpOPSxVBmA6any2JknMMJpvbjBYVXTy0VmITqqofPaA4e7u5zhKbgj05bdoV00YBfDfUm9";

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

export default function ContributeSection() {
  const [amount, setAmount] = useState<string>("");
  const [contributionType, setContributionType] = useState<'once-off' | 'monthly'>('once-off');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoStateChange = () => {
    if (videoRef.current) {
      setIsPlaying(!videoRef.current.paused);
    }
  };

  const handleContribution = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMessage("Please enter a valid amount.");
      setIsLoading(false);
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`Initiating ${contributionType} contribution of EUR ${numericAmount.toFixed(2)}`);
    }

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: numericAmount * 100,
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
            displayMessage = "Redirect to Stripe Checkout was blocked by the browser. This can happen in restricted environments (like some development previews or iframes). Please try completing the contribution in a new browser tab if the issue persists, or ensure the environment allows cross-origin navigation.";
          } else if (domError.message) {
            displayMessage = domError.message;
          }
          setErrorMessage(displayMessage);
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
            console.error("Failed to create Stripe session:", session.error || "Unknown server error");
        }
        setErrorMessage(session.error || "Could not initiate payment. Please ensure the backend is correctly set up to create a Stripe Checkout session and your Stripe Secret Key is configured.");
      }
    } catch (error: any) {
      if (process.env.NODE_ENV !== 'production') {
        console.error("Error during contribution process:", error);
      }
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const displayAmount = parseFloat(amount || "0").toFixed(2);
  const isButtonDisabled = isLoading || !amount || parseFloat(amount) <= 0;

  const videoElement = (
    <div className="relative w-full rounded-xl shadow-xl overflow-hidden group">
      <video
        ref={videoRef}
        width="100%"
        controls={isPlaying}
        controlsList="nodownload"
        preload="metadata"
        poster="/images/contribution-cover.jpg"
        data-ai-hint="contribution video cover"
        className="aspect-video w-full"
        aria-label="Contribution Information Video"
        onPlay={handleVideoStateChange}
        onPause={handleVideoStateChange}
      >
        <source src="/videos/contribution.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          onClick={handlePlay}
        >
          <PlayCircle className="h-16 w-16 text-white/80 transition-transform group-hover:scale-110" />
        </div>
      )}
    </div>
  );

  const contributionPoints = [
    {
      id: "empowering",
      text: "Empowering New Muslims: We are committed to fostering an inclusive environment by sponsoring free tickets for new Muslims, ensuring they can access and benefit from our events without financial barriers."
    },
    {
      id: "accessibility",
      text: "Ensuring Accessibility for All: Your support enables us to offer free or significantly discounted tickets to individuals who may not have the financial means, making our transformative events accessible to a wider audience."
    },
    {
      id: "high-quality",
      text: "Delivering High-Quality Events: Contributions directly cover essential event costs, including securing suitable venues, managing travel and accommodation for speakers (flights, hotels), paying honorariums, and investing in photography and videography to capture and share these invaluable experiences."
    },
    {
      id: "operations",
      text: "Sustaining GUM Operations: Your support also contributes to the vital overheads and ongoing operational costs necessary to run GUM effectively, including marketing and outreach efforts, website subscriptions, administrative expenses, and other essential resources that enable us to consistently plan and execute these events."
    }
  ];


  return (
    <section id="contribute" className="py-16 sm:py-24 bg-background">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Support Our Mission
          </h2>
          <div className="mt-2 mx-auto h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>
        </div>

        <div className="mt-6 mb-10 text-left">
            <p className="text-lg leading-8 text-muted-foreground text-center">
              <strong>We need your help!</strong>
            </p>
            <p className="mt-4 text-lg leading-8 text-muted-foreground text-center">
              Your contribution, big or small, supports not just your Islamic journey but countless others.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
          <Card className="p-6 sm:p-8 shadow-xl text-left bg-card w-full">
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
                  {isLoading ? "Processing..." : `Contribute €${displayAmount}`}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="w-full flex items-center justify-center md:justify-center">
            {videoElement}
          </div>
        </div>

        {errorMessage && (
          <p className="mt-4 text-sm text-destructive text-center">{errorMessage}</p>
        )}

        <p className="mt-8 text-sm text-muted-foreground text-center">
          We use Stripe for secure and easy online contributions. Thank you for your support!
        </p>
        <p className="mt-2 text-xs text-muted-foreground text-center">
          Apple Pay and Google Pay may be available depending on your device and browser.
        </p>

        <div className="mt-12 max-w-2xl mx-auto text-left">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg hover:no-underline">
                What will my contribution be used for?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground space-y-3">
                {contributionPoints.map((point) => (
                  <div key={point.id} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" />
                    <span>{point.text}</span>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
