
"use client";

import * as React from 'react';
import Container from "@/components/ui/container";
import { events as upcomingEventsData } from "@/lib/data";
import { CalendarFold, Ticket, MapPin, CalendarDays, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function EventsSection() {
  const upcomingEvent = upcomingEventsData.find(event => event.status === 'upcoming');

  return (
    <section id="events" className="pt-8 sm:pt-12 pb-16 sm:pb-24 bg-secondary dark:bg-background">
      <Container>
        <div className="mb-12 text-center">
          <CalendarFold className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Upcoming Events
          </h2>
          <div className="mt-2 mx-auto h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>
        </div>
        {upcomingEvent ? (
          <div className="max-w-md mx-auto">
             <Card className="flex h-full flex-col overflow-hidden rounded-2xl shadow-xl transition-shadow hover:shadow-2xl">
                <div className="relative aspect-[4/5] w-full">
                    <Image
                        src={upcomingEvent.image}
                        alt={upcomingEvent.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 90vw, 448px"
                        data-ai-hint={upcomingEvent.imageHint || "event poster"}
                        priority
                    />
                </div>
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground">{upcomingEvent.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                    <div className="flex items-center text-md text-muted-foreground">
                        <CalendarDays className="mr-2.5 h-5 w-5 text-primary" />
                        <span>{upcomingEvent.date}</span>
                    </div>
                    <div className="flex items-center text-md text-muted-foreground">
                        <MapPin className="mr-2.5 h-5 w-5 text-primary" />
                        <span>{upcomingEvent.location}</span>
                    </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold shadow-lg group-hover:shadow-xl text-base py-3 h-auto">
                      <Link href={upcomingEvent.registrationLink} target="_blank" rel="noopener noreferrer">
                          Buy Tickets <Ticket className="ml-2 h-5 w-5" />
                      </Link>
                  </Button>
                </CardFooter>
            </Card>
          </div>
        ) : (
          <div className="max-w-md mx-auto p-8 text-center rounded-xl shadow-lg bg-gradient-to-r from-primary to-accent text-primary-foreground">
            <p className="text-xl md:text-2xl font-bold">
              Something big is coming soon, insha'Allah.
            </p>
            <p className="text-md md:text-lg mt-2 opacity-90">
              You won't want to miss it! Keep an eye on our socials for the latest announcements.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
