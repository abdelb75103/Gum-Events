
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
          <Link
            href={upcomingEvent.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group mx-auto block max-w-xs transition-transform duration-300 ease-out hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl sm:max-w-sm md:max-w-md lg:max-w-lg lg:origin-center lg:transform lg:scale-80 xl:max-w-xl"
            )}
            aria-label={`Register for ${upcomingEvent.title}`}
          >
            <Card className="aspect-[4/5] relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 ease-in-out group-hover:shadow-2xl">
              <Image
                src={upcomingEvent.image}
                alt={upcomingEvent.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={upcomingEvent.imageHint || "event poster"}
                priority
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent/5"
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-7 space-y-3 sm:space-y-4">
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
                {/* This button is part of the larger Link's content. Clicking it will navigate. */}
                <div
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold shadow-lg group-hover:shadow-xl text-sm sm:text-base py-2.5 sm:py-3 h-auto"
                  )}
                >
                  Buy Tickets <Ticket className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>
            </Card>
          </Link>
        ) : (
          <p className="text-center text-muted-foreground">
            No upcoming events at the moment. Check back soon!
          </p>
        )}
      </Container>
    </section>
  );
}
