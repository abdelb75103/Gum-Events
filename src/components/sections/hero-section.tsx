"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Ticket } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import Image from "next/image";
import { useRef } from "react";
import { events } from "@/lib/data";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const featuredEvent = events[0];

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">

          {/* Text Content */}
          <motion.div
            style={{ y, opacity }}
            className="text-left space-y-8 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-2xl">
                Growing Up <span className="text-primary inline-block">Muslim</span>
              </h1>
              <p className="mt-4 text-xl text-gray-200 max-w-2xl leading-relaxed drop-shadow-md">
                Inspiring the next generation to choose Islam with conviction. Join us for transformative events that speak to the heart.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex flex-wrap gap-4"
            >
              <Magnetic>
                <Button size="lg" variant="gradient" asChild className="text-lg px-8 py-6 h-auto shadow-xl hover:shadow-primary/25">
                  <Link href={featuredEvent.registrationLink} target="_blank" rel="noopener noreferrer">
                    Buy Tickets <Ticket className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 h-auto bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white hover:border-white/40 shadow-lg">
                  <Link href="#contribute">
                    Support Our Work
                  </Link>
                </Button>
              </Magnetic>
            </motion.div>


          </motion.div>

          {/* Poster Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", type: "spring" }}
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }} // Parallax for poster
            className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
          >
            <Link href={featuredEvent.registrationLink} target="_blank" rel="noopener noreferrer">
              <div className="relative w-[300px] sm:w-[350px] md:w-[400px] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20 transition-transform duration-500 cursor-pointer group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none mix-blend-overlay" />
                <Image
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Hover CTA on Poster */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/40 backdrop-blur-[2px]">
                  <span className="bg-primary text-white px-6 py-2 rounded-full font-bold transform scale-90 group-hover:scale-100 transition-transform">
                    Buy Tickets
                  </span>
                </div>
              </div>
            </Link>
            {/* Decorative Elements behind poster */}
            <div className="absolute -z-10 top-10 right-10 w-full h-full bg-primary/20 blur-[100px] rounded-full" />
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-white mb-1"
          />
        </div>
      </motion.div>
    </section>
  );
}
