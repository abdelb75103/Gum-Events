
"use client";

import { useState, useRef } from 'react';
import Container from "@/components/ui/container";
import { BookOpenText, CheckCircle2, Play } from "lucide-react"; 

export default function OurStorySection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoStateChange = () => {
    if (videoRef.current) {
      setIsPlaying(!videoRef.current.paused);
    }
  };

  return (
    <section id="our-story" className="pb-16 sm:pb-24 bg-card">
      <Container>
        <div className="grid grid-cols-1 gap-y-10"> 
          <div className="space-y-6"> 
            <div className="flex items-center text-primary">
              <BookOpenText className="h-10 w-10 mr-3" />
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Story
              </h2>
            </div>
            <div className="mt-2 h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>
            
            <p className="text-lg leading-8 text-muted-foreground">
              GUM Events was formed from one simple idea: our community deserves inspiring Islamic events, right here in Ireland. Our mission is simple:
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-lg leading-8 text-muted-foreground font-semibold">
              To help young Muslims choose Islam again, not just by name or heritage, but with conviction and certainty.
            </blockquote>
            <p className="text-lg leading-8 text-muted-foreground">
              We do this by putting together high-quality events that speak to your heart and challenge your mind. We've been lucky enough to host some of the most RENOWNED islamic speakers, like Dr. Omar Sulaiman, Sheikh Abu Bakr Zoud, Ustadh Nouman Ali Khan, and Sheikh Ali Hammuda. and impacted THOUSANDS of lives coming from across Europe!! We've also organised unforgettable tours and trips, including an Umrah pilgrimage with Riyad Muslim.
            </p>
            
            <div>
              <p className="text-lg leading-8 text-muted-foreground">
                But GUM is more than just events. It's about:
              </p>
              <div className="mt-3 space-y-2">
                <div className="flex items-start text-lg leading-8 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                  <span>Reviving faith through engaging content and inspiring gatherings.</span>
                </div>
                <div className="flex items-start text-lg leading-8 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                  <span>Building professional spaces for Muslim creatives, organizers, and businesses.</span>
                </div>
                <div className="flex items-start text-lg leading-8 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                  <span>Creating an initiative that starts with events but leads to genuine growth, unity, and long-term impact.</span>
                </div>
              </div>
            </div>

            <p className="text-lg leading-8 text-muted-foreground">
              Our journey is just getting started, and we're committed to building a sustainable future for our community.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl group">
              <video
                ref={videoRef}
                width="100%"
                controls={isPlaying}
                controlsList="nodownload"
                preload="metadata"
                poster="/images/ourstory-cover.jpg"
                data-ai-hint="community video"
                className="rounded-xl shadow-xl aspect-video w-full"
                aria-label="Our Story Video"
                onPlay={handleVideoStateChange}
                onPause={handleVideoStateChange}
              >
                <source src="/videos/ourstory.mp4" type="video/mp4" />
                Your browser does not support the video tag. Consider updating to a more modern browser.
              </video>
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer rounded-xl"
                  onClick={handlePlay}
                >
                  <Play className="h-16 w-16 text-white/80 transition-transform group-hover:scale-110 fill-white/80" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

