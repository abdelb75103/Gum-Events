import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl">
      <div className="relative h-56 w-full">
        <Image
          src={event.image}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={event.imageHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4 text-primary" />
          <span>{event.date} at {event.time}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4 text-primary" />
          <span>{event.location}</span>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {event.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={event.registrationLink}>
            Register Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
