"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video Background - Subtle overlay keeps center/right visible */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/intro.mp4" type="video/mp4" />
        </video>

        {/* Darker left-side gradient - preserves center video content */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to right,
              rgba(0, 0, 0, 0.85) 0%,
              rgba(0, 0, 0, 0.65) 25%,
              rgba(0, 0, 0, 0.3) 45%,
              rgba(0, 0, 0, 0.1) 65%,
              transparent 80%
            )`
          }}
        />

        {/* Deeper bottom gradient for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to top,
              rgba(0, 0, 0, 0.75) 0%,
              rgba(0, 0, 0, 0.4) 25%,
              rgba(0, 0, 0, 0.15) 45%,
              transparent 60%
            )`
          }}
        />

        {/* Overall subtle darkening for video brightness reduction */}
        <div className="absolute inset-0 bg-black/15" />
      </motion.div>

      {/* Content - Left aligned, vertically centered */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center"
        style={{ opacity, y }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 xl:px-28">
          <div className="max-w-2xl">

            {/* Main Typography - Large & Commanding */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Eyebrow */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="h-px w-12 bg-gradient-to-r from-primary to-primary/40" />
                <span className="text-sm sm:text-base uppercase tracking-[0.25em] text-white/60 font-medium">
                  Inspiring Conviction
                </span>
              </motion.div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95]">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Growing Up
                </motion.span>
                <motion.span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-primary/70"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.75 }}
                >
                  Muslim
                </motion.span>
              </h1>

              {/* Subheadline */}
              <motion.p
                className="text-lg sm:text-xl lg:text-2xl text-white/70 max-w-lg leading-relaxed font-light"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                Inspiring the next generation to choose Islam with conviction.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <Button
                  variant="ghost"
                  size="lg"
                  asChild
                  className="bg-white text-black hover:bg-white/90 hover:text-black border-0 text-base px-8 py-6 h-auto font-medium transition-all duration-300"
                >
                  <Link href="#contribute">
                    Support Our Mission
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  asChild
                  className="text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 text-base px-8 py-6 h-auto group"
                >
                  <Link href="#our-story" className="flex items-center gap-3">
                    <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                      <Play className="h-3 w-3 fill-current ml-0.5" />
                    </span>
                    Our Story
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
