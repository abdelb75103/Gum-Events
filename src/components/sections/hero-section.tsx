import Image from "next/image";
import Link from "next/link";

import { events } from "@/lib/data";

const retreat = events.find(
  (event) => event.id === "digital-sisterhood-retreat"
);

export default function HeroSection() {
  if (!retreat) {
    return null;
  }

  return (
    <section
      id="hero"
      className="relative h-[calc(100svh-5rem)] min-h-[34rem] max-h-[58rem] w-full overflow-hidden bg-neutral-900"
    >
      <Image
        src={retreat.image}
        alt=""
        fill
        aria-hidden="true"
        className="scale-110 object-cover blur-2xl brightness-[0.52] saturate-[0.85]"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-neutral-950/20" />

      <Link
        href={retreat.registrationLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Book tickets for ${retreat.title}`}
        className="relative z-10 flex h-full w-full items-center justify-center p-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white/90 sm:p-6"
      >
        <div className="relative h-[calc(100%-2rem)] max-h-[48rem] aspect-[3/4] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl shadow-[0_24px_80px_rgba(67,37,48,0.48)] transition-opacity duration-200 hover:opacity-95 active:opacity-90">
          <Image
            src={retreat.image}
            alt="Our Weekend Retreat registration announcement"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 640px) 88vw, 576px"
          />
        </div>
      </Link>
    </section>
  );
}
