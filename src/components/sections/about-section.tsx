
"use client";

import Link from "next/link";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BookOpenText, ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-card">
      <Container>
        <div className="max-w-3xl mx-auto text-left">
          <div className="flex items-center text-primary">
            <BookOpenText className="h-10 w-10 mr-3" />
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Who We Are
            </h2>
          </div>
          <div className="mt-2 h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>

          <div className="mt-6 space-y-4">
            <p className="text-lg leading-8 text-muted-foreground">
              Growing Up Muslim Events was formed from one simple idea: our community deserves inspiring Islamic events, right here in Ireland. Our mission is to help young Muslims choose Islam again, not just by name, but with conviction.
            </p>
            <p className="text-lg leading-8 text-muted-foreground">
              We host high-quality gatherings that speak to the heart, featuring some of the most renowned speakers in the world.
            </p>
          </div>

          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/our-story">
                Read Our Full Story <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

