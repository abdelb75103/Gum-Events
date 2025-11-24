"use client";

import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeartHandshake, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function VolunteerSection() {
  return (
    <section id="volunteer" className="py-16 sm:py-24 bg-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      />

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-background rounded-full shadow-sm mb-6">
              <HeartHandshake className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Get Involved - Volunteer With Us
            </h2>
            <div className="mt-4 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Make a difference in our community! We're looking for passionate individuals to help with our events and initiatives. Click the button below to access our volunteer sign-up form.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground text-lg py-6 px-10 font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-full"
            >
              <Link href="/volunteer">
                Sign Up to Volunteer
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
