import Container from "@/components/ui/container";
import EventCard from "@/components/event-card";
import { events } from "@/lib/data";
import { CalendarFold } from "lucide-react";

export default function EventsSection() {
  return (
    <section id="events" className="py-16 sm:py-24 bg-background">
      <Container>
        <div className="mb-12 text-center">
          <CalendarFold className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Upcoming Events
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Discover our latest events and workshops designed for the community.
          </p>
        </div>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
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
