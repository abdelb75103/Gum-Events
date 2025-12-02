"use client";

import * as React from 'react';
import { useState, useRef } from 'react';
import Container from "@/components/ui/container";
import { events as upcomingEventsData } from "@/lib/data";
import { MapPin, ArrowRight, CalendarDays, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion } from "framer-motion";

export default function EventsSection() {
  const upcomingEvents = upcomingEventsData.filter(event => event.status === 'upcoming');

  return (
    <section id="events" className="min-h-[100dvh] flex flex-col justify-center py-20 md:py-32 bg-gray-50 dark:bg-zinc-950 relative overflow-hidden transition-colors duration-500">
      {/* Ambient Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-20" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] pointer-events-none mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-20" />

      <Container>
        <ScrollReveal>
          <div className="mb-16 md:mb-24 text-center relative z-10">
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-foreground mb-2 md:mb-6">
              Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Events</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg hidden md:block">
              Join us for our next gathering. Experience the community, inspiration, and connection.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-20 md:space-y-32">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))
          ) : (
            <ScrollReveal>
              <div className="max-w-2xl mx-auto text-center py-20">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Something Special is Brewing
                </h3>
                <p className="text-muted-foreground text-lg">
                  We are currently planning our next gathering. Stay tuned for announcements.
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </Container>
    </section>
  );
}

function EventCard({ event, index }: { event: any, index: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const isSBWEvent = event.id?.toLowerCase().includes("sbw");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="max-w-6xl mx-auto relative group perspective-1000">
        {/* Glassmorphic Card */}
        <div
          ref={divRef}
          onMouseMove={handleMouseMove}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative overflow-hidden rounded-3xl border border-white/50 dark:border-white/10 bg-white/40 dark:bg-zinc-900/60 backdrop-blur-3xl shadow-xl dark:shadow-2xl transition-all duration-500"
        >
          {/* Spotlight Gradient Overlay */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
            style={{
              opacity,
              background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.4), transparent 40%)`,
            }}
          />
          {/* Dark Mode Spotlight Adjustment */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10 dark:block hidden"
            style={{
              opacity,
              background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.08), transparent 40%)`,
            }}
          />

          <div className={`relative grid md:grid-cols-12 gap-4 md:gap-8 p-4 md:p-10 z-20 ${index % 2 === 1 ? 'md:direction-rtl' : ''}`}>

            {/* Image Section */}
            <div className={`md:col-span-5 relative ${index % 2 === 1 ? 'md:order-last' : ''}`}>
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-lg border border-white/20 dark:border-white/5 group-hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                  priority={index === 0}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmMmYyZjIiLz48L3N2Zz4="
                />
                {/* Subtle inner shadow/highlight */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-2xl pointer-events-none" />
              </div>
            </div>

            {/* Content Section */}
            <div className={`md:col-span-7 flex flex-col justify-center space-y-4 md:space-y-8 ${index % 2 === 1 ? 'md:order-first md:text-right items-end' : ''}`}>
              <div>
                {/* Big Date Typography */}
                <div className={`flex items-baseline space-x-2 md:space-x-3 mb-1 md:mb-2 select-none ${index % 2 === 1 ? 'justify-end' : ''}`}>
                  <span className="text-5xl md:text-9xl font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/10 dark:from-white dark:to-white/10 opacity-80">
                    {event.date.split(' ')[0].replace(/\D/g, '')}
                  </span>
                  <div className="flex flex-col justify-end h-full pb-1 md:pb-4">
                    <span className="text-base md:text-2xl font-bold uppercase tracking-widest text-primary">
                      {event.date.split(' ')[1]}
                    </span>
                    <span className="text-xs md:text-base text-muted-foreground font-medium">
                      {event.date.split(' ').slice(2).join(' ')}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl md:text-5xl font-bold text-foreground mt-1 md:mt-2 leading-tight">
                  {isSBWEvent ? (
                    <>
                      <span className="block">UNAPOLOGETIC</span>
                      <span className="block">
                        <span className="text-primary inline-block mr-1">with</span>
                        <span className="inline-block">Sonny Bill Williams</span>
                      </span>
                    </>
                  ) : (
                    event.title
                  )}
                </h3>
              </div>

              <div className={`space-y-2 md:space-y-4 w-full ${index % 2 === 1 ? 'items-end flex flex-col' : ''}`}>
                <div className="flex items-center p-3 md:p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-sm transition-colors hover:bg-white/80 dark:hover:bg-white/10 w-fit">
                  <div className="p-1.5 md:p-2 rounded-lg bg-primary/10 mr-3 md:mr-4">
                    <MapPin className="h-4 w-4 md:h-6 md:w-6 text-primary" />
                  </div>
                  <span className="text-sm md:text-lg font-medium text-foreground">{event.location}</span>
                </div>

                <div className="flex items-center p-3 md:p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-sm transition-colors hover:bg-white/80 dark:hover:bg-white/10 w-fit">
                  <div className="p-1.5 md:p-2 rounded-lg bg-primary/10 mr-3 md:mr-4">
                    <CalendarDays className="h-4 w-4 md:h-6 md:w-6 text-primary" />
                  </div>
                  <span className="text-sm md:text-lg font-medium text-foreground">{event.date}</span>
                </div>
              </div>

              <div className="pt-2 md:pt-6">
                <Button asChild className="w-full md:w-auto bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-bold text-base md:text-lg px-8 md:px-10 py-5 md:py-7 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95">
                  <Link href={event.registrationLink} target={event.registrationLink.startsWith("http") ? "_blank" : "_self"} rel={event.registrationLink.startsWith("http") ? "noopener noreferrer" : undefined}>
                    Get Tickets <Ticket className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
