"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

import { Button } from "@/components/ui/button";

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
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <video autoPlay loop muted playsInline className="h-full w-full object-cover">
          <source src="/videos/intro.mp4" type="video/mp4" />
        </video>

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
            )`,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to top,
              rgba(0, 0, 0, 0.75) 0%,
              rgba(0, 0, 0, 0.4) 25%,
              rgba(0, 0, 0, 0.15) 45%,
              transparent 60%
            )`,
          }}
        />

        <div className="absolute inset-0 bg-black/15" />
      </motion.div>

      <motion.div className="absolute inset-0 z-10 flex items-center" style={{ opacity, y }}>
        <div className="w-full px-6 sm:px-12 lg:px-20 xl:px-28">
          <div className="max-w-2xl">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="h-px w-12 bg-gradient-to-r from-primary to-primary/40" />
                <span className="text-sm font-medium uppercase tracking-[0.25em] text-white/60 sm:text-base">
                  Inspiring Conviction
                </span>
              </motion.div>

              <h1 className="text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Growing Up
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.75 }}
                >
                  Muslim
                </motion.span>
              </h1>

              <motion.p
                className="max-w-lg text-lg font-light leading-relaxed text-white/70 sm:text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                Inspiring the next generation to choose Islam with conviction.
              </motion.p>

              <motion.div
                className="flex flex-col gap-4 pt-4 sm:flex-row"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <Button
                  variant="ghost"
                  size="lg"
                  asChild
                  className="h-auto border-0 bg-white px-8 py-6 text-base font-medium text-black transition-all duration-300 hover:bg-white/90 hover:text-black"
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
                  className="group h-auto border border-white/20 px-8 py-6 text-base text-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white"
                >
                  <Link href="#our-story" className="flex items-center gap-3">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                      <Play className="ml-0.5 h-3 w-3 fill-current" />
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
