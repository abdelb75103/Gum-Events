
import Container from "@/components/ui/container";
import { events } from "@/lib/data";
import { CalendarFold, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Don't miss out on our feature event.
          </p>
        </div>
        {upcomingEvent ? (
          <div className="mx-auto max-w-xs"> {/* Scaled down poster container further */}
            <div className="relative overflow-hidden rounded-lg shadow-xl group">
              <Image
                src={upcomingEvent.image}
                alt={upcomingEvent.title}
                width={1080}
                height={1350}
                className="w-full h-auto object-cover" // Ensure image covers and scales
                data-ai-hint={upcomingEvent.imageHint}
                priority // Good to add for LCP images
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="md:flex md:items-center md:justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white">{upcomingEvent.title}</h3>
                        <p className="text-xs text-gray-300 mt-1">
                            {upcomingEvent.date} at {upcomingEvent.time} - {upcomingEvent.location}
                        </p>
                    </div>
                    <Button asChild size="sm" className="mt-3 md:mt-0 w-full md:w-auto">
                        <Link href={upcomingEvent.registrationLink}>
                            Buy Tickets <Ticket className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No upcoming events at the moment. Check back soon!
          </p>
        )}
      </Container>
    </section>
  );
}

