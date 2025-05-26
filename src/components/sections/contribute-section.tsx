
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Gift, Repeat, ExternalLink } from "lucide-react";

export default function ContributeSection() {
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
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
            <a href="https://stripe.com" target="_blank" rel="noopener noreferrer"> {/* Replace with actual Stripe one-time link */}
              <Gift className="mr-2 h-5 w-5" />
              One-Time Contribution
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
            <a href="https://stripe.com" target="_blank" rel="noopener noreferrer"> {/* Replace with actual Stripe monthly link */}
              <Repeat className="mr-2 h-5 w-5" />
              Monthly Support
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          We use Stripe for secure and easy online contributions. Thank you for your support!
        </p>
      </Container>
    </section>
  );
}
