
"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Gift, Repeat, ExternalLink, DollarSign } from "lucide-react";

export default function ContributeSection() {
  const [amount, setAmount] = useState<string>("10.00"); // Default amount

  // In a real application, these functions would likely create a Stripe Checkout Session
  // on the server with the specified amount and frequency, then redirect the user.
  const handleOneTimeContribution = () => {
    console.log(`Initiating one-time contribution of: ${amount}`);
    // Replace with actual Stripe integration
    // window.location.href = `https://stripe.com/one-time-payment-link?amount=${amount}`;
  };

  const handleMonthlySupport = () => {
    console.log(`Initiating monthly support of: ${amount}`);
    // Replace with actual Stripe integration
    // window.location.href = `https://stripe.com/monthly-subscription-link?amount=${amount}`;
  };

  return (
    <section id="contribute" className="py-16 sm:py-24 bg-background">
      <Container className="text-center">
        <Gift className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Support Our Mission
        </h2>
        <div className="mt-2 mx-auto h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>
        <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
          Your generous contributions help us continue our work, organize impactful events, 
          and support the GUM community. Choose how you'd like to make a difference.
        </p>

        <div className="mt-10 mx-auto max-w-md space-y-6">
          <div>
            <Label htmlFor="contribution-amount" className="sr-only">Contribution Amount</Label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <DollarSign className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              </div>
              <Input
                type="number"
                name="contribution-amount"
                id="contribution-amount"
                className="block w-full rounded-md border-gray-300 pl-10 pr-4 focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="10.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                aria-label="Contribution Amount"
                min="1" // Basic validation
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto"
              onClick={handleOneTimeContribution} // Placeholder click handler
              asChild // Keep asChild if you intend to wrap an <a> tag for actual navigation
            >
              {/* In a real scenario, this <a> tag might be removed if redirection is handled by JavaScript after server interaction */}
              <a href="https://stripe.com" target="_blank" rel="noopener noreferrer"> 
                <Gift className="mr-2 h-5 w-5" />
                One-Time Contribution
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
              onClick={handleMonthlySupport} // Placeholder click handler
              asChild
            >
              <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">
                <Repeat className="mr-2 h-5 w-5" />
                Monthly Support
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
        
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
