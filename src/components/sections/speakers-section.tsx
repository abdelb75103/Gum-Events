
import SpeakerCard from '@/components/speaker-card';
import type { SpeakerCardProps } from '@/lib/types';
import { Users } from 'lucide-react';
import Container from "@/components/ui/container";

const featuredSpeakers: SpeakerCardProps[] = [
  { name: "Dr. Omar Suleiman", imageUrl: "/images/speakers/omar.JPG", imageHint: "male speaker" },
  { name: "Sh. Ali Hammuda", imageUrl: "/images/speakers/alih.jpg", imageHint: "male speaker" },
  { name: "Sh. Abu Bakr Zoud", imageUrl: "/images/speakers/zoud.jpg", imageHint: "male speaker" },
  { name: "Sh. Jamal Abinasir", imageUrl: "/images/speakers/jamal.jpg", imageHint: "male speaker" },
  { name: "Ustadh Nouman Ali Khan", imageUrl: "/images/speakers/nak.jpg", imageHint: "male speaker" },
  { name: "Dr. Sohaib Saeed", imageUrl: "/images/speakers/tafsirdoc.jpg", imageHint: "male speaker" },
  { name: "Akhi Ayman", imageUrl: "/images/speakers/ayman.jpg", imageHint: "male speaker" },
  { name: "The Sunnah Guy", imageUrl: "/images/speakers/sunnahg.jpg", imageHint: "male speaker" },
  { name: "Sh. Ammar Alshukry", imageUrl: "/images/speakers/ammar.jpg", imageHint: "male speaker" },
  { name: "Rhyad Muslim", imageUrl: "/images/speakers/rhyad.jpg", imageHint: "male speaker" },
  { name: "Muslim Belal", imageUrl: "/images/speakers/mb.jpg", imageHint: "male speaker" },
  { name: "Faisal Latif", imageUrl: "/images/speakers/fl.jpg", imageHint: "male speaker" },
  { name: "Ibby", imageUrl: "https://placehold.co/400x300.png", imageHint: "male speaker" },
  { name: "The Digital Sisterhood", imageUrl: "https://placehold.co/400x300.png", imageHint: "group people" },
];

export default function SpeakersSection() {
  return (
    <section id="speakers" className="py-16 sm:py-24 bg-secondary">
      <Container>
        <div className="mb-12 text-center">
          <Users className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Featured Speakers
          </h2>
          <div className="mt-2 mx-auto h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>
          <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Voices that inspire, educate, and uplift our community.
          </p>
        </div>
        {featuredSpeakers.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {featuredSpeakers.map((speaker) => (
              <SpeakerCard key={speaker.name} speaker={speaker} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">
            Speaker information is currently being updated. Please check back soon!
          </p>
        )}
      </Container>
    </section>
  );
}

