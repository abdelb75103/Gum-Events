
import Container from "@/components/ui/container";
import SpeakerCard from "@/components/speaker-card";
import { speakers } from "@/lib/data";
import { Users } from "lucide-react";

export default function SpeakersSection() {
  return (
    <section id="speakers" className="py-16 sm:py-24 bg-secondary">
      <Container>
        <div className="mb-12 text-center">
          <Users className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Esteemed Speakers
          </h2>
          <div className="mt-2 mx-auto h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Learn from inspiring individuals shaping our community.
          </p>
        </div>
        {speakers.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
        ) : (
          <p className="text-center text-muted-foreground">
            Speaker lineup will be announced soon.
          </p>
        )}
      </Container>
    </section>
  );
}
