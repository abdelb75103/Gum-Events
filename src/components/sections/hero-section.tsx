"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Ticket, ChevronLeft, ChevronRight } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback, type TouchEvent } from "react";
import { events } from "@/lib/data";

const AUTO_ROTATE_DELAY = 10000;

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const upcomingEvents = events.filter(e => e.status === "upcoming");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXSpring = useSpring(tiltX, { stiffness: 120, damping: 14 });
  const tiltYSpring = useSpring(tiltY, { stiffness: 120, damping: 14 });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const goToNext = useCallback(() => {
    if (upcomingEvents.length <= 1) return;
    setCurrentIndex(prev => (prev + 1) % upcomingEvents.length);
  }, [upcomingEvents.length]);

  const goToPrev = useCallback(() => {
    if (upcomingEvents.length <= 1) return;
    setCurrentIndex(prev => (prev - 1 + upcomingEvents.length) % upcomingEvents.length);
  }, [upcomingEvents.length]);

  const scheduleNextRotation = useCallback(() => {
    timerRef.current = setTimeout(() => {
      goToNext();
      scheduleNextRotation();
    }, AUTO_ROTATE_DELAY);
  }, [goToNext]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (reduceMotion || upcomingEvents.length <= 1) {
      timerRef.current = null;
      return;
    }

    scheduleNextRotation();
  }, [scheduleNextRotation, upcomingEvents.length, reduceMotion]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resetTimer]);

  const featuredEvent = upcomingEvents[currentIndex];
  const totalEvents = upcomingEvents.length;

  // Fallback hero section when no upcoming events
  if (!featuredEvent) {
    return (
      <section
        ref={ref}
        className="relative min-h-[90dvh] sm:h-screen w-full overflow-hidden pt-16 pb-10 sm:pt-0 sm:pb-0"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/videos/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background z-10" />
        </div>

        {/* Content */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
              <span className="block">Growing Up</span>
              <span className="block text-primary">Muslim in Ireland</span>
            </h1>
            <p className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Inspiring the next generation to choose Islam with conviction. Join us for transformative events that speak to the heart.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4">
              <Magnetic>
                <Button size="lg" variant="gradient" asChild className="text-base sm:text-lg px-6 sm:px-8 py-5 h-auto shadow-xl hover:shadow-primary/25 w-full sm:w-auto">
                  <Link href="#events">
                    Browse Events <Ticket className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button size="lg" variant="outline" asChild className="text-base sm:text-lg px-6 sm:px-8 py-5 h-auto bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white hover:border-white/40 shadow-lg w-full sm:w-auto">
                  <Link href="#contribute">
                    Support Our Work
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const handleNextClick = () => {
    goToNext();
    resetTimer();
  };

  const handlePrevClick = () => {
    goToPrev();
    resetTimer();
  };

  const handleSelectIndex = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLElement>) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handlePrevClick();
      } else {
        handleNextClick();
      }
    }
    setTouchStartX(null);
  };

  const handlePosterMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = (0.5 - y / rect.height) * 10;
    tiltX.set(rotateX);
    tiltY.set(rotateY);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handlePosterMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[90dvh] sm:h-screen w-full overflow-hidden pt-16 pb-10 sm:pt-0 sm:pb-0"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center w-full max-w-7xl mx-auto">

          {/* Text Content */}
          <div className="text-left space-y-8 order-2 lg:order-1 min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredEvent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6 drop-shadow-2xl">
                    {featuredEvent.id?.toLowerCase().includes("sbw") ? (
                      <>
                        <span className="block">UNAPOLOGETIC</span>
                        <span className="block">
                          <span className="text-primary inline-block mr-1">with</span>
                          <span className="inline-block">Sonny Bill Williams</span>
                        </span>
                      </>
                    ) : (
                      featuredEvent.title
                    )}
                  </h1>
                  <p className="mt-3 text-base sm:text-xl text-gray-200 max-w-2xl leading-relaxed drop-shadow-md">
                    {featuredEvent.description || "Inspiring the next generation to choose Islam with conviction. Join us for transformative events that speak to the heart."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4">
                  <Magnetic>
                    <Button size="lg" variant="gradient" asChild className="text-base sm:text-lg px-6 sm:px-8 py-5 h-auto shadow-xl hover:shadow-primary/25 w-full sm:w-auto">
                      <Link href={featuredEvent.registrationLink} target={featuredEvent.registrationLink.startsWith("http") ? "_blank" : "_self"} rel={featuredEvent.registrationLink.startsWith("http") ? "noopener noreferrer" : undefined}>
                        Buy Tickets <Ticket className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </Magnetic>
                  <Magnetic>
                    <Button size="lg" variant="outline" asChild className="text-base sm:text-lg px-6 sm:px-8 py-5 h-auto bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white hover:border-white/40 shadow-lg w-full sm:w-auto">
                      <Link href="#contribute">
                        Support Our Work
                      </Link>
                    </Button>
                  </Magnetic>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Poster Overlay */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredEvent.id}
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                transition={{ duration: 0.5 }}
                style={{
                  y: parallaxY,
                  rotateX: tiltXSpring,
                  rotateY: tiltYSpring,
                  transformPerspective: "1200px",
                }}
                onMouseMove={handlePosterMouseMove}
                onMouseLeave={handlePosterMouseLeave}
                className="relative group"
              >
                <Link href={featuredEvent.registrationLink} target={featuredEvent.registrationLink.startsWith("http") ? "_blank" : "_self"} rel={featuredEvent.registrationLink.startsWith("http") ? "noopener noreferrer" : undefined}>
                  <div className="relative w-[260px] sm:w-[330px] md:w-[400px] aspect-[3/4] rounded-[18px] overflow-hidden shadow-2xl ring-1 ring-white/15 transition-transform duration-500 cursor-pointer group hover:scale-[1.01]">
                    <Image
                      src={featuredEvent.image}
                      alt={featuredEvent.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiM0YmE2NzgiLz48L3N2Zz4="
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `radial-gradient(260px at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.16), transparent 55%)`,
                        transition: "background 120ms linear",
                      }}
                    />
                    <div className="absolute inset-x-4 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-2 rounded-full bg-black/60 text-white px-4 py-1.5 text-sm font-semibold shadow-lg backdrop-blur">
                        Buy Tickets
                        <Ticket className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
                {/* Decorative Elements behind poster */}
                <div className="absolute -z-10 top-10 right-10 w-full h-full bg-primary/20 blur-[100px] rounded-full" />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {totalEvents > 1 && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {upcomingEvents.map((event, index) => (
            <button
              key={event.id}
              type="button"
              onClick={() => handleSelectIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-10 bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.15)]" : "w-4 bg-white/40 hover:bg-white/70"}`}
              aria-label={`View ${event.title}`}
            />
          ))}
        </div>
      )}

      {totalEvents > 1 && (
        <button
          type="button"
          onClick={handleNextClick}
          className="hidden md:flex absolute bottom-6 right-6 h-11 w-11 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20 transition shadow-lg shadow-black/25 items-center justify-center z-20"
          aria-label="View next event"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

    </section>
  );
}
