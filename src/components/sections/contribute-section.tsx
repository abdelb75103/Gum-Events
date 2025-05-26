
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Gift, ExternalLink } from "lucide-react";

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
          and support the GUM community. Every donation, big or small, makes a difference.
        </p>
        <div className="mt-10">
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <a href="https://stripe.com" target="_blank" rel="noopener noreferrer"> {/* Replace with actual Stripe link */}
              Contribute Securely via Stripe 
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            We use Stripe for secure and easy online contributions.
          </p>
        </div>
      </Container>
    </section>
  );
}
