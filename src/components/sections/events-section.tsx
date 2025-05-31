
import Container from "@/components/ui/container";
import { events } from "@/lib/data";
import { CalendarFold, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button"; // Import buttonVariants
import { cn } from "@/lib/utils"; // Import cn

// Export events data for HeroSection or other components
export const upcomingEvents = events;


export default function EventsSection() {
  const upcomingEvent = events.length > 0 ? events[0] : null;

  return (
    <section id="events" className="py-16 sm:py-24 bg-background">
      <Container>
        <div className="mb-12 text-center">
          <CalendarFold className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Upcoming Event
          </h2>
          <div className="mt-2 mx-auto h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Don't miss out on our feature event.
          </p>
        </div>
        {upcomingEvent ? (
          <Card className="mx-auto max-w-xs aspect-[4/5] relative overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl group">
            <Image
              src={upcomingEvent.image}
              alt={upcomingEvent.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={upcomingEvent.imageHint || "event poster"}
              priority // Good to add for LCP images
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-3 transition-opacity duration-300">
              <Link
                href={upcomingEvent.registrationLink}
                className={cn(
                  buttonVariants({ variant: "default" }), // Apply base button styles, size will be default (h-10, px-4, py-2)
                  // Override/add specific styles for this button:
                  "w-full bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary/90 hover:to-accent/90 text-accent-foreground shadow-xl text-base px-4 py-2 h-auto"
                )}
              >
                Buy Tickets <Ticket className="ml-2 h-4 w-4" />
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
