
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveRight, Ticket, ChevronLeft, ChevronRight } from "lucide-react";
import { events } from "@/lib/data";
import type { Event } from "@/lib/types";

export default function HeroSection() {
  const upcomingEvent: Event | null = events.length > 0 ? events[0] : null;
  const [activeHeroType, setActiveHeroType] = useState<'event' | 'general'>(
    upcomingEvent ? 'event' : 'general'
  );
  const [initialAutoScrolled, setInitialAutoScrolled] = useState(false);

  const hasMultipleHeroes = !!upcomingEvent;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (
      activeHeroType === 'event' &&
      upcomingEvent &&
      hasMultipleHeroes &&
      !initialAutoScrolled
    ) {
      timer = setTimeout(() => {
        setActiveHeroType('general');
        setInitialAutoScrolled(true);
      }, 2000); // 2-second delay
    }
    return () => {
      clearTimeout(timer);
    };
  }, [activeHeroType, upcomingEvent, hasMultipleHeroes, initialAutoScrolled]);

  const navigateHero = (targetType: 'event' | 'general') => {
    if (hasMultipleHeroes) {
      setActiveHeroType(targetType);
    }
  };

  const generalHeroContent = {
    title: "Growing Up Muslim",
    description: "Events, insights, and community for young Muslims navigating faith and life. Join us as we grow together.",
    buttons: (
      <>
        <Button size="lg" asChild className="px-6 py-3 text-base sm:text-lg">
          <Link href="#events">
            View Upcoming Events
            <MoveRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild className="px-6 py-3 text-base sm:text-lg">
          <Link href="#community">Join Our Community</Link>
        </Button>
      </>
    ),
  };

  const renderEventHero = () => (
    // Aspect ratio container for 16:9
    <div className="relative w-full pt-[56.25%]"> 
      {upcomingEvent && (
        <Image
          src={upcomingEvent.image}
          alt="Blurred event background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 filter blur-xl scale-110"
          priority
          data-ai-hint={upcomingEvent.imageHint || "event background"}
        />
      )}
      {/* Content wrapper */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-8">
        {upcomingEvent && (
          <>
            <div className="mb-4 sm:mb-6 w-full max-w-[240px] xs:max-w-[280px] sm:max-w-xs md:max-w-sm">
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
              className="bg-gradient-to-r from-[hsl(145,68%,65%)] to-[hsl(30,95%,70%)] text-primary-foreground hover:from-[hsl(145,68%,60%)] hover:to-[hsl(30,95%,65%)] shadow-xl font-bold text-lg px-6 py-3"
            >
              <Link href={upcomingEvent.registrationLink || "#events"}>
                Buy Tickets
                <Ticket className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );

  const renderGeneralHero = () => (
    // Aspect ratio container for 16:9
    <div className="relative w-full pt-[56.25%] bg-gradient-to-b from-background to-secondary">
      {/* Content wrapper */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground xs:text-4xl sm:text-5xl lg:text-6xl">
          {generalHeroContent.title}
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-base leading-relaxed text-muted-foreground sm:text-lg sm:max-w-2xl md:text-xl md:max-w-3xl">
          {generalHeroContent.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-x-6">
          {generalHeroContent.buttons}
        </div>
      </div>
    </div>
  );

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      {activeHeroType === 'event' && upcomingEvent ? renderEventHero() : renderGeneralHero()}

      {hasMultipleHeroes && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/60 hover:bg-background/80 text-foreground border-border/70 hover:border-border h-10 w-10 sm:h-12 sm:w-12"
            onClick={() => navigateHero('event')}
            aria-label="Previous slide"
            disabled={activeHeroType === 'event'}
          >
            <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/60 hover:bg-background/80 text-foreground border-border/70 hover:border-border h-10 w-10 sm:h-12 sm:w-12"
            onClick={() => navigateHero('general')}
            aria-label="Next slide"
            disabled={activeHeroType === 'general'}
          >
            <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
          </Button>
        </>
      )}
    </section>
  );
}
