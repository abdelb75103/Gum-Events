
import Container from "@/components/ui/container";
import { BookOpenText } from "lucide-react";

export default function OurStorySection() {
  return (
    <section id="our-story" className="py-16 sm:py-24 bg-secondary">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 items-center">
          <div className="space-y-6 md:order-1">
            <div className="flex items-center text-primary">
              <BookOpenText className="h-10 w-10 mr-3" />
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Story
              </h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              Discover the journey and inspiration behind Growing Up Muslim. We are dedicated to fostering a vibrant community through engaging events, insightful discussions, and shared experiences that resonate with young Muslims navigating faith and contemporary life.
            </p>
            <p className="text-lg leading-8 text-muted-foreground">
              Our mission is to create spaces where individuals can connect, learn, and grow together, embracing their identity with confidence and contributing positively to the wider world. Join us as we build bridges and celebrate the rich tapestry of our heritage.
            </p>
          </div>
          <div className="md:order-2">
            <video
              width="100%"
              controls
              controlsList="nodownload"
              preload="metadata"
              className="rounded-xl shadow-xl aspect-video"
              aria-label="Our Story Video"
            >
              {/*
                IMPORTANT: Replace the empty src with the path to your MP4 video file.
                For example, if your video is in public/videos/our-story.mp4,
                the src should be "/videos/our-story.mp4"
              */}
              <source src="/videos/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag. Consider updating to a more modern browser.
            </video>
            <p className="mt-3 text-sm text-center text-muted-foreground">
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
