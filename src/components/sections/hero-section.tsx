"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

import { Button } from "@/components/ui/button";

const HERO_CONFIG = {
  backgroundImagePath: "/1080x566_SOCIAL AD_GUM.png",
  posterImagePath: "/1080x1350_SOCIAL AD_GUM (1).png",
  ticketsHref: "https://www.time-hoppers.com/movie/time-hoppers-the-silk-road-1/film-info",
  trailerHref: "https://www.youtube.com/watch?v=8LPkVYeaSxY",
} as const;

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden" aria-label="Homepage hero">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-[-3%] scale-[1.06]">
            <Image
              src={HERO_CONFIG.backgroundImagePath}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover blur-xl saturate-110"
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_45%)]" />
          <div className="absolute inset-0 bg-black/42" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,10,0.18),rgba(4,7,10,0.72))]" />
        </div>

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          <motion.div
            className="relative w-full max-w-[21rem] sm:max-w-[26rem] md:max-w-[29rem] lg:max-w-[32rem] xl:max-w-[35rem]"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="absolute inset-x-[9%] bottom-[-2rem] top-[90%] rounded-full bg-black/50 blur-3xl" />
            <Link
              href={HERO_CONFIG.ticketsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              aria-label="Open event tickets page"
            >
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/18 bg-white/6 shadow-[0_40px_140px_rgba(0,0,0,0.62)] backdrop-blur-[2px] transition-transform duration-500 group-hover:scale-[1.01]">
                <Image
                  src={HERO_CONFIG.posterImagePath}
                  alt="Growing Up Muslim event poster"
                  width={1080}
                  height={1350}
                  priority
                  sizes="(min-width: 1024px) 28rem, (min-width: 640px) 25rem, 88vw"
                  className="h-auto w-full object-contain"
                />
              </div>
            </Link>
          </motion.div>

          <motion.div
            className="mt-7 flex w-full justify-center sm:mt-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex w-full max-w-[28rem] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
              <Button
                asChild
                size="lg"
                className="relative h-auto w-full overflow-hidden rounded-full border border-[#ffd37a]/70 bg-[#f3a42a] px-7 py-5 text-base font-semibold text-[#18120a] shadow-[0_0_0_1px_rgba(255,211,122,0.24),0_16px_45px_rgba(0,0,0,0.28),0_0_34px_rgba(243,164,42,0.42)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#f0ad46] hover:text-[#18120a] hover:shadow-[0_0_0_1px_rgba(255,211,122,0.3),0_20px_55px_rgba(0,0,0,0.32),0_0_42px_rgba(243,164,42,0.5)] sm:w-auto sm:px-8"
              >
                <Link href={HERO_CONFIG.ticketsHref} target="_blank" rel="noopener noreferrer">
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.38),transparent_24%,transparent_68%,rgba(255,255,255,0.24))]" />
                  <span className="relative">Get Your Tickets Now</span>
                  <ArrowRight className="relative h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-auto w-full border-white/25 bg-white/8 px-7 py-5 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-white/40 hover:bg-white/14 hover:text-white sm:w-auto sm:px-8"
              >
                <Link href={HERO_CONFIG.trailerHref} target="_blank" rel="noopener noreferrer">
                  Watch the Trailer
                  <Play className="h-5 w-5 fill-current" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black/30 to-transparent" />
      </motion.div>
    </section>
  );
}
