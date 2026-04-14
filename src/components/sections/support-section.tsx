"use client";

import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const APPEAL_LINKS = {
  gaza: "https://fundraise.humanappeal.org.uk/ha-gaza-emergency-appeal-growing-up-muslim",
  sudan: "https://fundraise.humanappeal.org.uk/sudan-emergency-appeal-growing-up-muslim",
};

export default function SupportSection() {
  return (
    <section id="support" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              <Heart className="h-4 w-4" />
              Support
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              GUM Gaza and Sudan Appeal
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl">
              GUM are working with Human Appeal to raise money for the people of Gaza and the people of Sudan. Please donate generously whatever you can, or share with others who may be able to support.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <ScrollReveal delay={0.1} className="h-full">
            <Card className="group h-full overflow-hidden border-primary/10 bg-card/70 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <CardContent className="flex h-full flex-col p-8">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Heart className="h-7 w-7" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">Gaza</h3>
                <p className="mt-4 flex-grow text-base leading-7 text-muted-foreground">
                  Support emergency relief and essential aid for the people of Gaza through the GUM and Human Appeal fundraising effort.
                </p>
                <Button asChild size="lg" className="mt-8 w-full bg-gradient-to-r from-primary to-accent text-white">
                  <Link href={APPEAL_LINKS.gaza} target="_blank" rel="noreferrer">
                    Donate for Gaza <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="h-full">
            <Card className="group h-full overflow-hidden border-accent/10 bg-card/70 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <CardContent className="flex h-full flex-col p-8">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Heart className="h-7 w-7" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">Sudan</h3>
                <p className="mt-4 flex-grow text-base leading-7 text-muted-foreground">
                  Help fund urgent assistance for the people of Sudan through the same matching-funds campaign led by GUM and Human Appeal.
                </p>
                <Button asChild size="lg" className="mt-8 w-full bg-gradient-to-r from-accent to-primary text-white">
                  <Link href={APPEAL_LINKS.sudan} target="_blank" rel="noreferrer">
                    Donate for Sudan <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
