
"use client";

import Container from "@/components/ui/container";
import { BookOpenText, CheckCircle2 } from "lucide-react"; 

export default function OurStorySection() {
  return (
    <section id="our-story" className="py-16 sm:py-24 bg-card">
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
              Established in 2023, GUM Events was formed from one simple idea: our community deserves inspiring Islamic events, right here in Ireland. Our mission is simple:
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-lg leading-8 text-muted-foreground font-semibold">
              To help young Muslims choose Islam again, not just by name or heritage, but with conviction and certainty.
            </blockquote>
            <p className="text-lg leading-8 text-muted-foreground">
              We do this by putting together high-quality events that speak to your heart and challenge your mind. We've been lucky enough to host most RENOWNED islamic speakers, like Dr. Omar Sulaiman, Sheikh Abu Bakr Zoud, Ustadh Nouman Ali Khan, and Ustadh Ali Hammuda. and impacted THOUSANDS of lives coming from across Europe!! We've also organised unforgettable tours and trips, including an Umrah pilgrimage with Riyad Muslim.
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
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              <video
                width="100%"
                controls
                controlsList="nodownload"
                preload="metadata"
                poster="https://placehold.co/640x360.png"
                data-ai-hint="community video"
                className="rounded-xl shadow-xl aspect-video"
                aria-label="Our Story Video"
              >
                <source src="/videos/ourstory.mp4" type="video/mp4" />
                Your browser does not support the video tag. Consider updating to a more modern browser.
              </video>
              <p className="mt-3 text-sm text-center text-muted-foreground">
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

