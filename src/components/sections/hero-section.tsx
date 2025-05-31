
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
    if (!hasMultipleHeroes) return;
    setActiveHeroType(currentType =>
      currentType === 'event' ? 'general' : 'event'
    );
  }, [hasMultipleHeroes]);

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

  const handleArrowClick = (direction: 'next' | 'prev') => {
    if (hasMultipleHeroes) {
      cycleHero();
      startAutoScroll(); // Restart interval on manual navigation
    }
  };

  const generalHeroContent = {
    title: "Growing Up Muslim",
    description: "Events, insights, and community for young Muslims navigating faith and life. Join us as we grow together.",
    // Buttons are rendered directly below
  };

  const heroWrapperBaseClasses = "absolute inset-0 transition-all duration-700 ease-in-out";

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      {/* Responsive Aspect ratio container - Made 1/3 smaller */}
      <div className="relative w-full pt-[42%] md:pt-[34%] lg:pt-[30%]">
        
        {/* Event Hero Content Wrapper */}
        {upcomingEvent && (
          <div
            className={cn(
              heroWrapperBaseClasses,
              "flex flex-col items-center justify-center text-center",
              "p-3 xs:p-4 sm:p-6 md:p-8", // Padding around content
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
            <div className="relative z-10 flex flex-col items-center justify-center">
              {/* Adjusted poster size for smaller hero */}
              <div className="mb-3 w-full max-w-[100px] xs:max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[220px]">
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
                className="bg-[hsl(40,80%,60%)] hover:bg-[hsl(40,80%,55%)] text-amber-900 shadow-xl text-xs px-3 py-1.5 sm:text-sm sm:px-4 sm:py-2"
              >
                <Link href={upcomingEvent.registrationLink || "#events"}>
                  Buy Tickets
                  <Ticket className="ml-2 h-3 w-3 xs:h-4 xs:w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* General Hero Content Wrapper */}
        <div
          className={cn(
            heroWrapperBaseClasses,
            "flex flex-col items-center justify-center text-center",
            "p-3 xs:p-4 sm:p-6 md:p-8", // Padding around content
            activeHeroType === 'general'
              ? 'opacity-100 transform translateX-0'
              : 'opacity-0 transform translateX-full pointer-events-none'
          )}
        >
          <Image
            src="/images/hero.png"
            alt="Growing Up Muslim Hero Image"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0"
            priority
          />
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Scaled down title */}
            <h1 className="font-bold tracking-tight text-primary-foreground text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl">
              {generalHeroContent.title}
            </h1>
            {/* Scaled down description */}
            <p className="mt-2 mx-auto leading-relaxed text-gray-200 text-[11px] xs:text-xs sm:text-sm md:text-base max-w-[18rem] xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              {generalHeroContent.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 xs:gap-3 sm:gap-x-4">
              {/* Scaled down buttons */}
              <Button size="default" asChild className="text-xs px-3 py-1.5 sm:text-sm sm:px-4 sm:py-2">
                <Link href="#events">
                  View Upcoming Events
                  <MoveRight className="ml-2 h-3 w-3 xs:h-4 xs:w-4" />
                </Link>
              </Button>
              <Button 
                size="default" 
                variant="outline" 
                asChild 
                className="text-xs px-3 py-1.5 sm:text-sm sm:px-4 sm:py-2 text-foreground border-foreground/60 hover:bg-foreground/10 hover:text-foreground hover:border-foreground/80"
              >
                <Link href="#community">Join Our Community</Link>
              </Button>
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
            onClick={() => handleArrowClick('prev')}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 sm:right-6 lg:right-8 top-1/2 z-20 -translate-y-1/2 rounded-full bg-transparent hover:bg-black/10 dark:hover:bg-white/10 text-foreground h-10 w-10 sm:h-12 sm:w-12"
            onClick={() => handleArrowClick('next')}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
          </Button>
        </>
      )}
    </section>
  );
}

