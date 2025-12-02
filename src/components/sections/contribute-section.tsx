"use client";

import { useState, useEffect, useRef } from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Euro, CheckCircle2, Play } from "lucide-react";
import { loadStripe, type Stripe } from '@stripe/stripe-js';
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

// Use your Stripe LIVE Publishable Key via env (must start with NEXT_PUBLIC_ to be available client-side)
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    <div className="relative w-full rounded-2xl shadow-2xl overflow-hidden group ring-1 ring-white/10">
      <video
        ref={videoRef}
        width="100%"
        controls={isMounted && isPlaying}
        controlsList="nodownload"
        preload="metadata"
        poster="/images/contribution-cover.jpg"
        data-ai-hint="contribution video cover"
        className="aspect-video w-full object-cover"
        aria-label="Contribution Information Video"
        onPlay={handleVideoStateChange}
        onPause={handleVideoStateChange}
        playsInline
      >
        <source src="/videos/contribution.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {isMounted && !isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-colors group-hover:bg-black/30"
          onClick={handlePlay}
        >
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-110">
            <Play className="h-10 w-10 text-white fill-white ml-1" />
          </div>
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
    <section id="contribute" className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Support Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Mission</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl leading-8 text-muted-foreground max-w-2xl mx-auto font-medium">
              Your contribution, big or small, supports not just your Islamic journey but countless others.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <ScrollReveal delay={0.2} className="w-full">
            <Card className="p-6 sm:p-8 shadow-2xl text-left bg-card/50 backdrop-blur-sm border-primary/10 w-full h-full">
              <CardContent className="p-0 h-full flex flex-col justify-between">
                <div className="space-y-8">
                  <div>
                    <Label htmlFor="contribution-amount-styled" className="text-lg font-semibold text-foreground mb-3 block">
                      Choose your contribution amount
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Euro className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                      </div>
                      <Input
                        type="number"
                        name="contribution-amount-styled"
                        id="contribution-amount-styled"
                        className="pl-12 h-14 text-lg bg-background/50 border-input focus:border-primary focus:ring-primary/20 transition-all"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        aria-label="Contribution Amount in Euros"
                        min="1"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-semibold text-foreground mb-3 block">
                      Select contribution type
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant={contributionType === 'once-off' ? "default" : "outline"}
                        onClick={() => setContributionType('once-off')}
                        className={cn(
                          "h-12 text-base transition-all duration-300",
                          contributionType === 'once-off'
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                            : "hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                        )}
                        disabled={isLoading}
                      >
                        Once-off
                      </Button>
                      <Button
                        variant={contributionType === 'monthly' ? "default" : "outline"}
                        onClick={() => setContributionType('monthly')}
                        className={cn(
                          "h-12 text-base transition-all duration-300",
                          contributionType === 'monthly'
                            ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20 scale-[1.02]"
                            : "hover:bg-accent/5 hover:text-accent hover:border-accent/30"
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
                      "w-full h-14 text-lg font-bold rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1",
                      contributionType === 'once-off'
                        ? "bg-gradient-to-r from-primary to-primary/80 hover:shadow-primary/30"
                        : "bg-gradient-to-r from-accent to-accent/80 hover:shadow-accent/30"
                    )}
                    onClick={handleContribution}
                    loading={isLoading}
                    disabled={isButtonDisabled}
                  >
                    {isLoading ? "Processing..." : `Contribute €${displayAmount}`}
                  </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-border/50">
                  <p className="text-sm text-muted-foreground text-center">
                    Secure payment via Stripe. Apple Pay & Google Pay supported.
                  </p>
                </div>
              </CardContent>
            </Card>
            {errorMessage && (
              <p className="mt-4 text-sm text-destructive text-center bg-destructive/10 p-3 rounded-md">{errorMessage}</p>
            )}
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="w-full space-y-8">
            {videoElement}

            <div className="bg-card/30 rounded-xl p-1">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="text-lg font-medium px-4 hover:no-underline hover:bg-muted/50 rounded-lg transition-colors">
                    What will my contribution be used for?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground space-y-4 px-4 pt-4 pb-2">
                    {contributionPoints.map((point) => (
                      <div key={point.id} className="flex items-start group">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0 transition-transform group-hover:scale-110" />
                        <span className="leading-relaxed">{point.text}</span>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
