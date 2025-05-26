import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Speaker } from "@/lib/types";

interface SpeakerCardProps {
  speaker: Speaker;
}

export default function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Card className="overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl text-center">
      <div className="relative mx-auto mt-6 h-40 w-40 rounded-full overflow-hidden border-4 border-primary">
        <Image
          src={speaker.photo}
          alt={speaker.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint={speaker.photoHint}
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-foreground">{speaker.name}</CardTitle>
        <CardDescription className="text-sm text-accent">{speaker.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {speaker.bio}
        </p>
      </CardContent>
    </Card>
  );
}
