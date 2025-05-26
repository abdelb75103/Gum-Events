
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { MoveRight, Ticket } from "lucide-react";
import { events } from "@/lib/data";
import type { Event } from "@/lib/types";

export default function HeroSection() {
  const [showEventHero, setShowEventHero] = useState(true);
  const upcomingEvent: Event | null = events.length > 0 ? events[0] : null;

  useEffect(() => {
    if (upcomingEvent) {
      const timer = setTimeout(() => {
        setShowEventHero(false);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    } else {
      // If no upcoming event, immediately show the general hero
      setShowEventHero(false);
    }
  }, [upcomingEvent]);

  const generalHeroContent = {
    title: "Growing Up Muslim",
    description: "Events, insights, and community for young Muslims navigating faith and life. Join us as we grow together.",
    buttons: (
      <>
        <Button size="lg" asChild>
          <Link href="#events">
            View Upcoming Events
            <MoveRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="#community">Join Our Community</Link>
        </Button>
      </>
    ),
  };

  if (showEventHero && upcomingEvent) {
    return (
      <section id="hero" className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <Image
          src={upcomingEvent.image}
          alt="Blurred event background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 filter blur-xl scale-110"
          priority
          data-ai-hint={upcomingEvent.imageHint || "event background"}
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <div className="mb-6 w-full max-w-[280px] sm:max-w-xs md:max-w-sm">
            <Image
              src={upcomingEvent.image}
              alt={upcomingEvent.title}
              width={1080}
              height={1350}
              className="rounded-lg shadow-2xl w-full h-auto"
              priority
              data-ai-hint={upcomingEvent.imageHint || "event poster"}
            />
          </div>
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-[hsl(145,68%,65%)] to-[hsl(30,95%,70%)] text-primary-foreground hover:from-[hsl(145,68%,60%)] hover:to-[hsl(30,95%,65%)] shadow-xl font-bold text-lg"
          >
            <Link href={upcomingEvent.registrationLink || "#events"}>
              Buy Tickets
              <Ticket className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  // General Hero
  return (
    <section id="hero" className="bg-gradient-to-b from-background to-secondary py-24 sm:py-32 lg:py-40">
      <Container className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {generalHeroContent.title}
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground sm:text-xl">
          {generalHeroContent.description}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {generalHeroContent.buttons}
        </div>
      </Container>
    </section>
  );
}
