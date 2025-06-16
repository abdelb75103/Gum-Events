
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Ticket } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { upcomingEvents } from '@/components/sections/events-section';
import React from 'react';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const [api, setApi] = React.useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }
    setCurrentSlide(api.selectedScrollSnap())
    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap())
    })
  }, [api])

  const firstEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  const genericHeroImage = "/images/hero.png";
  const genericHeroImageHint = "community event";

  return (
    <section
      id="hero"
      className="relative w-full h-[calc(81vh-5rem)] min-h-[500px] md:h-[calc(76.5vh-5rem)] overflow-hidden"
    >
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        className="w-full h-full"
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full">
          {/* Slide 1: Upcoming Event */}
          {firstEvent && (
            <CarouselItem className="h-full relative">
              {/* Blurred Background Layer */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={firstEvent.image}
                  alt={`Blurred background for ${firstEvent.title}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="z-0 blur-lg scale-110 brightness-75"
                  priority
                  data-ai-hint={firstEvent.imageHint || "event promotion background"}
                />
              </div>

              {/* Container for Centered Poster and Button Below It */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
                <div className="relative w-full max-w-[300px] xs:max-w-[340px] sm:max-w-[360px] md:max-w-[380px] lg:max-w-[400px] aspect-[4/5] shadow-2xl rounded-lg overflow-hidden">
                  <Image
                    src={firstEvent.image}
                    alt={firstEvent.title}
                    fill
                    style={{ objectFit: 'contain' }}
                    data-ai-hint={firstEvent.imageHint || "event poster"}
                    className="rounded-lg"
                  />
                </div>
                <Button
                  size="lg"
                  asChild
                  className="mt-6 w-full max-w-[280px] text-accent-foreground px-6 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-primary/70 to-accent/70 hover:from-primary/90 hover:to-accent/90"
                >
                  <Link href={firstEvent.registrationLink} target="_blank" rel="noopener noreferrer">
                    Buy Tickets <Ticket className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CarouselItem>
          )}

          {/* Slide 2: Generic Hero */}
          <CarouselItem className="h-full relative">
            {/* Wrapper for the generic hero image to ensure it fills the space */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={genericHeroImage}
                alt="Community members engaging in an event"
                fill
                style={{ objectFit: 'cover' }}
                priority
                data-ai-hint={genericHeroImageHint}
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10" />
            {/* Content */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center h-full container mx-auto px-6 text-white">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 drop-shadow-lg">
                Growing Up Muslim
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-neutral-100 mb-10 max-w-3xl mx-auto drop-shadow-md">
                Discover inspiring events, connect with a vibrant community, and explore your faith together.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto"
                >
                  <Link href="#events">
                    Explore Events <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 z-30 text-white bg-black/30 hover:bg-black/50 border-none",
            {"hidden": upcomingEvents.length < 2 && !firstEvent}
          )}
        />
        <CarouselNext
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 z-30 text-white bg-black/30 hover:bg-black/50 border-none",
            {"hidden": upcomingEvents.length < 2 && !firstEvent}
            )}
        />
      </Carousel>
    </section>
  );
}
