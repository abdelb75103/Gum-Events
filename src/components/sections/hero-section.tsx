import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="bg-gradient-to-b from-background to-secondary py-24 sm:py-32 lg:py-40">
      <Container className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Growing Up Muslim
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground sm:text-xl">
          Events, insights, and community for young Muslims navigating faith and life. Join us as we grow together.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" asChild>
            <Link href="#events">
              View Upcoming Events
              <MoveRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#community">Join Our Community</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
