
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveRight, Ticket, ChevronLeft, ChevronRight } from "lucide-react";
import { events } from "@/lib/data";
import type { Event } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const upcomingEvent: Event | null = events.length > 0 ? events[0] : null;
  const [activeHeroType, setActiveHeroType] = useState<'event' | 'general'>(
    upcomingEvent ? 'event' : 'general'
  );

  const hasMultipleHeroes = !!upcomingEvent;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const cycleHero = useCallback(() => {
    setActiveHeroType(currentType =>
      currentType === 'event' ? 'general' : 'event'
    );
  }, []);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!hasMultipleHeroes) return;

    intervalRef.current = setInterval(() => {
      cycleHero();
    }, 3500); // 3.5-second interval
  }, [hasMultipleHeroes, cycleHero]);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoScroll]);

  const handleArrowClick = () => {
    if (hasMultipleHeroes) {
      cycleHero();
      startAutoScroll(); // Restart interval on manual navigation
    }
  };

  const generalHeroContent = {
    title: "Growing Up Muslim",
    description: "Events, insights, and community for young Muslims navigating faith and life. Join us as we grow together.",
    buttons: (
      <>
        <Button size="default" asChild className="px-4 py-2 text-sm sm:text-base">
          <Link href="#events">
            View Upcoming Events
            <MoveRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button size="default" variant="outline" asChild className="px-4 py-2 text-sm sm:text-base">
          <Link href="#community">Join Our Community</Link>
        </Button>
      </>
    ),
  };

  const heroWrapperBaseClasses = "absolute inset-0 transition-all duration-700 ease-in-out";

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      {/* Aspect ratio container */}
      <div className="relative w-full pt-[37.5%]"> {/* 8:3 aspect ratio (height is 2/3 of 16:9) */}
        
        {/* Event Hero Content Wrapper */}
        {upcomingEvent && (
          <div
            className={cn(
              heroWrapperBaseClasses,
              activeHeroType === 'event'
                ? 'opacity-100 transform translateX-0'
                : 'opacity-0 transform -translateX-full pointer-events-none'
            )}
          >
            <Image
              src={upcomingEvent.image}
              alt="Blurred event background"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 z-0 filter blur-xl scale-110"
              priority
              data-ai-hint={upcomingEvent.imageHint || "event background"}
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-8">
              <div className="mb-4 w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px]">
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
                asChild
                className="bg-[hsl(40,80%,60%)] hover:bg-[hsl(40,80%,55%)] text-amber-900 shadow-xl text-sm px-4 py-2"
              >
                <Link href={upcomingEvent.registrationLink || "#events"}>
                  Buy Tickets
                  <Ticket className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* General Hero Content Wrapper */}
        <div
          className={cn(
            heroWrapperBaseClasses,
            activeHeroType === 'general'
              ? 'opacity-100 transform translateX-0'
              : 'opacity-0 transform translateX-full pointer-events-none'
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary"></div>
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground xs:text-3xl sm:text-4xl lg:text-5xl">
              {generalHeroContent.title}
            </h1>
            <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed text-muted-foreground sm:text-base sm:max-w-2xl md:text-lg md:max-w-3xl">
              {generalHeroContent.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-x-4">
              {generalHeroContent.buttons}
            </div>
          </div>
        </div>
      </div>

      {hasMultipleHeroes && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 sm:left-6 lg:left-8 top-1/2 z-20 -translate-y-1/2 rounded-full bg-transparent hover:bg-black/10 dark:hover:bg-white/10 text-foreground h-10 w-10 sm:h-12 sm:w-12"
            onClick={handleArrowClick}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 sm:right-6 lg:right-8 top-1/2 z-20 -translate-y-1/2 rounded-full bg-transparent hover:bg-black/10 dark:hover:bg-white/10 text-foreground h-10 w-10 sm:h-12 sm:w-12"
            onClick={handleArrowClick}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
          </Button>
        </>
      )}
    </section>
  );
}
