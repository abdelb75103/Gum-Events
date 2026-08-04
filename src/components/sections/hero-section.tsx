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
      className="relative w-full overflow-hidden bg-neutral-900"
    >
      <Image
        src={retreat.image}
        alt=""
        fill
        aria-hidden="true"
        className="scale-[1.6] object-cover blur-2xl brightness-[0.5] saturate-[1.05]"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-neutral-950/30" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-5 py-10 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-8 lg:py-20">
        <div className="order-2 w-full text-center lg:order-1 lg:flex-1 lg:text-left">
          <p className="font-inter text-[0.7rem] uppercase tracking-[0.28em] text-white/70 sm:text-xs">
            Upcoming retreat
          </p>
          <h1 className="mt-3 font-times text-3xl leading-[1.08] text-white sm:text-4xl lg:mt-4 lg:text-6xl">
            {retreat.title}
          </h1>
          <p className="mt-3 font-inter text-sm text-white/80 lg:mt-5 lg:text-base">
            {retreat.date}
            {retreat.location ? ` · ${retreat.location}` : ""}
          </p>
          <Link
            href={retreat.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 font-inter text-sm font-medium text-neutral-900 transition-colors duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 lg:mt-8"
          >
            Book your place
          </Link>
        </div>

        <Link
          href={retreat.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Book tickets for ${retreat.title}`}
          className="order-1 w-full max-w-[15rem] shrink-0 rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/90 xs:max-w-[17rem] sm:max-w-xs lg:order-2 lg:max-w-[26rem]"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_24px_80px_rgba(67,37,48,0.5)] transition-opacity duration-200 hover:opacity-95 active:opacity-90">
            <Image
              src={retreat.image}
              alt={`${retreat.title} registration announcement`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 68vw, (max-width: 1024px) 20rem, 26rem"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
