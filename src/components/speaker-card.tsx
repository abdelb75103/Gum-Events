import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card"; // Removed CardContent and CardDescription
import type { SpeakerCardProps } from "@/lib/types";

interface Props { // Renamed interface to avoid conflict if SpeakerCardProps was used directly
  speaker: SpeakerCardProps;
}

export default function SpeakerCard({ speaker }: Props) {
  return (
    <Card className="overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl text-center">
      <div className="relative mx-auto mt-6 h-40 w-40 rounded-full overflow-hidden border-4 border-primary">
        <Image
          src={speaker.imageUrl}
          alt={speaker.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint={speaker.imageHint}
        />
      </div>
      <CardHeader className="pb-4 pt-4"> {/* Adjusted padding slightly */}
        <CardTitle className="text-xl font-semibold text-foreground">{speaker.name}</CardTitle>
      </CardHeader>
    </Card>
  );
}
