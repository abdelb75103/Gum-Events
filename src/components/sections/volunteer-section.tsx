
"use client";

import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeartHandshake, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function VolunteerSection() {
  return (
    <section id="volunteer" className="py-16 sm:py-24 bg-secondary">
      <Container>
        <div className="mb-12 text-center">
          <HeartHandshake className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get Involved - Volunteer With Us
          </h2>
          <div className="mt-2 mx-auto h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>
          <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Make a difference in our community! We're looking for passionate individuals to help with our events and initiatives. Click the button below to access our volunteer sign-up form.
          </p>
        </div>
        
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground text-lg py-4 px-8 font-semibold shadow-lg"
          >
            <Link href="/volunteer">
              Sign Up to Volunteer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
