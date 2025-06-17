
"use client";

import * as React from 'react';
import Container from "@/components/ui/container";
import { events as upcomingEventsData } from "@/lib/data";
import type { Event } from "@/lib/types";
import { CalendarFold, Ticket, MapPin, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function EventsSection() {
  const upcomingEvent = upcomingEventsData.find(event => event.status === 'upcoming');

  return (
    <section id="events" className="py-16 sm:py-24 bg-background">
      <Container>
        <div className="mb-12 text-center">
          <CalendarFold className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Upcoming Events
          </h2>
          <div className="mt-2 mx-auto h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Don't miss out on our feature event.
          </p>
        </div>
        {upcomingEvent ? (
          <Card className="mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl aspect-[4/5] relative overflow-hidden rounded-2xl shadow-xl group transition-all duration-300 ease-in-out hover:shadow-2xl">
            <Image
              src={upcomingEvent.image}
              alt={upcomingEvent.title} // Alt text still includes title for accessibility
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={upcomingEvent.imageHint || "event poster"}
              priority
            />
            {/* Gradient overlay for text readability - reduced intensity */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent/5"
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-7 space-y-3 sm:space-y-4">
              {/* Title removed as it's on the poster */}

              <div className="bg-background/80 dark:bg-neutral-900/80 backdrop-blur-sm text-foreground rounded-lg px-3 py-2 text-xs sm:text-sm shadow-md flex flex-col xs:flex-row xs:items-center xs:space-x-3 space-y-1 xs:space-y-0">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1.5 text-primary shrink-0" />
                  <span>{upcomingEvent.date} at {upcomingEvent.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1.5 text-primary shrink-0" />
                  <span>{upcomingEvent.location}</span>
                </div>
              </div>

              <Link
                href={upcomingEvent.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl text-sm sm:text-base py-2.5 sm:py-3 h-auto"
                )}
              >
                Buy Tickets <Ticket className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </Card>
        ) : (
          <p className="text-center text-muted-foreground">
            No upcoming events at the moment. Check back soon!
          </p>
        )}
      </Container>
    </section>
  );
}
