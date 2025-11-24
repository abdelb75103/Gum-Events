"use client";

import { useState } from 'react';
import { Users } from 'lucide-react';
import Container from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Speaker {
  name: string;
  imageUrl: string;
  role?: string;
}

const featuredSpeakers: Speaker[] = [
  { name: "Dr. Omar Suleiman", imageUrl: "/images/speakers/omar.JPG", role: "Scholar & Founder" },
  { name: "Sh. Ali Hammuda", imageUrl: "/images/speakers/alih.jpg", role: "Imam & Author" },
  { name: "Sh. Abu Bakr Zoud", imageUrl: "/images/speakers/zoud.jpg", role: "International Speaker" },
  { name: "Sh. Jamal Abinasir", imageUrl: "/images/speakers/jamal.jpg", role: "Community Leader" },
  { name: "Ustadh Nouman Ali Khan", imageUrl: "/images/speakers/nak.jpg", role: "Quranic Scholar" },
  { name: "Dr. Sohaib Saeed", imageUrl: "/images/speakers/tafsirdoc.jpg", role: "Quran Specialist" },
  { name: "Ustadh Abu Taymiyyah", imageUrl: "/images/speakers/abut.jpg", role: "Student of Knowledge" },
  { name: "Akhi Ayman", imageUrl: "/images/speakers/ayman.jpg", role: "Youth Mentor" },
  { name: "The Sunnah Guy", imageUrl: "/images/speakers/sunnahg.jpg", role: "Content Creator" },
  { name: "Sh. Ammar Alshukry", imageUrl: "/images/speakers/ammar.jpg", role: "Poet & Speaker" },
  { name: "Rhyad Muslim", imageUrl: "/images/speakers/rhyad.jpg", role: "Community Activist" },
  { name: "Muslim Belal", imageUrl: "/images/speakers/mb.jpg", role: "Spoken Word Artist" },
  { name: "Faisal Latif", imageUrl: "/images/speakers/fl.jpg", role: "Nasheed Artist" },
  { name: "Ibby", imageUrl: "/images/speakers/ibby.jpg", role: "Youth Speaker" },
  { name: "The Digital Sisterhood", imageUrl: "/images/speakers/tds.jpg", role: "Podcast Hosts" },
];

export default function SpeakersSection() {
  return (
    <section id="speakers" className="py-20 md:py-32 bg-[#F5F5F0] dark:bg-zinc-900 relative overflow-hidden transition-colors duration-500">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.4] mix-blend-multiply pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mb-12 md:mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Speakers</span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
              Snapshots of the voices that inspire us.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-4 md:gap-10 max-w-7xl mx-auto pb-12 px-2 md:px-4">
          {featuredSpeakers.map((speaker, index) => (
            <ScrollReveal key={speaker.name} delay={index * 0.05} duration={0.5}>
              <PolaroidCard speaker={speaker} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PolaroidCard({ speaker, index }: { speaker: Speaker; index: number }) {
  // Deterministic rotation based on index to avoid hydration mismatch
  // Less rotation on mobile for cleaner grid
  const rotation = index % 2 === 0 ? 'md:rotate-2' : 'md:-rotate-2';

  return (
    <div
      className={cn(
        "group relative bg-white p-2 md:p-3 pb-8 md:pb-12 shadow-lg transition-all duration-300 ease-out hover:z-20 hover:scale-105 hover:shadow-2xl cursor-pointer",
        "w-full md:w-64 flex-shrink-0 transform",
        rotation,
        "hover:rotate-0"
      )}
    >{/* Tape Effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/30 backdrop-blur-sm border border-white/20 shadow-sm transform -rotate-1 z-10 opacity-80"></div>

      {/* Image Area */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 mb-4 filter sepia-[0.2] group-hover:sepia-0 transition-all duration-500">
        <Image
          src={speaker.imageUrl}
          alt={speaker.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 256px, 256px"
        />
        {/* Vintage Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-blue-500/10 mix-blend-overlay opacity-50 pointer-events-none"></div>
      </div>

      {/* Handwritten Caption */}
      <div className="absolute bottom-2 md:bottom-3 left-0 right-0 text-center px-1 md:px-2">
        <h3 className="font-handwriting text-sm md:text-xl text-zinc-800 font-bold leading-tight transform -rotate-1 group-hover:rotate-0 transition-transform">
          {speaker.name}
        </h3>
      </div>
    </div>
  );
}
