import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { SpeakerCardProps } from "@/lib/types";

interface Props {
  speaker: SpeakerCardProps;
}

export default function SpeakerCard({ speaker }: Props) {
  return (
    <Card className="aspect-[3/4] relative overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl group">
      <Image
        src={speaker.imageUrl}
        alt={speaker.name}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 group-hover:scale-105"
        data-ai-hint={speaker.imageHint}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-3 transition-opacity duration-300">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-semibold text-primary-foreground text-center">
            {speaker.name}
          </CardTitle>
        </CardHeader>
      </div>
    </Card>
  );
}
