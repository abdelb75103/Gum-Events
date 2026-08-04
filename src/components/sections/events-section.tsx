"use client";

import Container from "@/components/ui/container";
import { events as upcomingEventsData } from "@/lib/data";
import { CalendarFold, Ticket, MapPin, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// The card is built as a ticket: details stub on one side, poster art on the
// other, joined by a perforated seam. The seam runs vertically between the two
// columns on desktop and horizontally under the poster on mobile.

export default function EventsSection() {
  const upcomingEvent = upcomingEventsData.find(event => event.status === 'upcoming');

  return (
    <section id="events" className="pt-16 sm:pt-24 pb-20 sm:pb-28 bg-secondary dark:bg-background">
      <Container>
        <div className="mb-12 text-center">
          <CalendarFold className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Upcoming Events
          </h2>
          <div className="mt-2 mx-auto h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>
        </div>
        {upcomingEvent ? (
          <div className="mx-auto max-w-md md:max-w-3xl">
            <div className="group grid rounded-2xl bg-card shadow-[0_18px_50px_-20px_hsl(220_15%_25%/0.35)] transition-shadow duration-300 hover:shadow-[0_26px_70px_-24px_hsl(220_15%_25%/0.45)] dark:shadow-none dark:ring-1 dark:ring-border md:grid-cols-2">
              {/* Poster: exact 3:4 panel matching the artwork, so nothing is cropped */}
              <Link
                href={upcomingEvent.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="relative order-1 aspect-[3/4] w-full overflow-hidden rounded-t-2xl md:order-2 md:rounded-l-none md:rounded-r-2xl"
              >
                <Image
                  src={upcomingEvent.image}
                  alt={upcomingEvent.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                  sizes="(max-width: 767px) 90vw, 24rem"
                  data-ai-hint={upcomingEvent.imageHint || "event poster"}
                  priority
                />
              </Link>

              {/* Details stub. Perforated edge: top on mobile, right on desktop. */}
              <div className="relative order-2 flex flex-col justify-center rounded-b-2xl border-t-2 border-dashed border-foreground/15 p-7 sm:p-9 md:order-1 md:rounded-b-none md:rounded-l-2xl md:border-r-2 md:border-t-0 md:p-10">
                <h3 className="font-times text-3xl leading-[1.1] tracking-tight text-foreground md:text-[2.6rem]">
                  {upcomingEvent.title}
                </h3>

                <dl className="mt-6 space-y-3 font-inter text-base text-muted-foreground">
                  <div className="flex items-center gap-2.5">
                    <dt className="sr-only">Dates</dt>
                    <CalendarDays aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />
                    <dd>{upcomingEvent.date}</dd>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <dt className="sr-only">Location</dt>
                    <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />
                    <dd>{upcomingEvent.location}</dd>
                  </div>
                </dl>

                <Button
                  asChild
                  className="mt-8 h-auto w-full bg-gradient-to-r from-primary to-accent py-3 font-inter text-base font-semibold text-primary-foreground transition-transform duration-150 hover:from-primary/90 hover:to-accent/90 active:scale-[0.99] md:w-auto md:self-start md:px-8"
                >
                  <Link href={upcomingEvent.registrationLink} target="_blank" rel="noopener noreferrer">
                    Book your place <Ticket aria-hidden="true" className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl bg-card p-9 text-center shadow-[0_18px_50px_-20px_hsl(220_15%_25%/0.35)] dark:shadow-none dark:ring-1 dark:ring-border">
            <p className="font-times text-2xl leading-tight text-foreground md:text-3xl">
              Something big is coming soon, insha'Allah.
            </p>
            <p className="mt-3 font-inter text-base text-muted-foreground">
              You won't want to miss it. Keep an eye on our socials for the latest announcements.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
