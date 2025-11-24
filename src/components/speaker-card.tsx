import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { SpeakerCardProps } from "@/lib/types";

interface Props {
  speaker: SpeakerCardProps;
}

export default function SpeakerCard({ speaker }: Props) {
  return (
    <Card className="aspect-[3/4] relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl group border-0">
      <Image
        src={speaker.imageUrl}
        alt={speaker.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 639px) 45vw, 30vw"
        data-ai-hint={speaker.imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-bold text-white text-center drop-shadow-md">
            {speaker.name}
          </CardTitle>
          <div className="h-1 w-12 bg-primary mx-auto mt-2 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
        </CardHeader>
      </div>
    </Card>
  );
}
