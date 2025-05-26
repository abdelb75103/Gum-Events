
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { MoveRight, CalendarCheck2, Ticket } from "lucide-react";
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

  const eventHeroContent = upcomingEvent
    ? {
        title: `Upcoming: ${upcomingEvent.title}`,
        description: `${upcomingEvent.description.substring(0,100)}... Mark your calendars for ${upcomingEvent.date} at ${upcomingEvent.time}.`,
        buttons: (
          <>
            <Button size="lg" asChild>
              <Link href={upcomingEvent.registrationLink || "#events"}>
                Register Now
                <Ticket className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#events">
                More Events
                <CalendarCheck2 className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </>
        ),
      }
    : generalHeroContent; // Fallback to general if no event (though useEffect handles this)

  const currentHero = showEventHero && upcomingEvent ? eventHeroContent : generalHeroContent;

  return (
    <section id="hero" className="bg-gradient-to-b from-background to-secondary py-24 sm:py-32 lg:py-40">
      <Container className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {currentHero.title}
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground sm:text-xl">
          {currentHero.description}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {currentHero.buttons}
        </div>
      </Container>
    </section>
  );
}
