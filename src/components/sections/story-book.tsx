"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight, ArrowLeft, BookOpenText, TrendingUp, Users, Award, CalendarDays } from "lucide-react";
import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    TooltipProps
} from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    type ChartConfig
} from '@/components/ui/chart';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

// --- Data & Config ---

const impactData = [
    {
        metric: "Lives Impacted",
        value: "THOUSANDS",
        description: "Reaching and enriching numerous lives throughout the globe.",
        icon: Users,
        valueColorClass: "text-primary",
    },
    {
        metric: "Largest Event",
        value: "Record Breaking",
        description: "Hosted the largest Islamic event of its kind in Ireland.",
        icon: Award,
        valueColorClass: "text-accent",
    },
    {
        metric: "Events Hosted",
        value: "20+ in 2 Years",
        description: "Consistently delivering engaging and meaningful events.",
        icon: CalendarDays,
        valueColorClass: "text-primary",
    },
];

const communityGrowthData = [
    { year: "2023", members: 100 },
    { year: "2024", members: 5000 },
    { year: "2025", members: 6570 },
];

const chartConfig = {
    members: {
        label: "Community Members",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

const CustomTooltipContent = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && label && payload && payload.length) {
        return (
            <div className="rounded-lg border bg-background p-2 px-3 text-sm shadow-sm">
                <p className="font-medium text-foreground">{`${label}`}</p>
            </div>
        );
    }
    return null;
};

const photos = [
    "/images/assets/_MG_0832.jpeg",
    "/images/assets/event1.jpg",
    "/images/assets/event2.jpg",
    "/images/assets/event3.jpg",
    "/images/assets/social2.jpg",
    "/images/assets/social3.jpg",
    "/images/assets/social4.jpg",
    "/images/assets/story-photo.jpg",
];

// --- Components ---

export default function StoryBook() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const toggleFlip = () => setIsFlipped(!isFlipped);

    // Slideshow logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
        }, 5000); // Slower interval for better pacing
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="our-story" className="py-24 bg-secondary/20 dark:bg-zinc-950 overflow-hidden transition-colors duration-500">
            <Container>
                <ScrollReveal>
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Story</span>
                        </h2>
                        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
                            Discover our journey and the impact we've made together.
                        </p>
                    </div>
                </ScrollReveal>
            </Container>

            <div className="relative w-full max-w-6xl px-4 md:px-8 h-[800px] md:h-[600px] mx-auto perspective-[2000px]" >

                {/* Mobile View (Single Flipping Card) */}
                <div className="md:hidden relative w-full h-full transition-transform duration-1000 transform-style-3d"
                    style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>

                    {/* Front (Mobile) */}
                    <div className="absolute inset-0 w-full h-full bg-[#fdfbf7] dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 flex flex-col justify-between backface-hidden overflow-hidden transition-colors duration-500"
                        style={{ zIndex: isFlipped ? 0 : 10 }}>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-50 dark:opacity-10 pointer-events-none mix-blend-multiply dark:mix-blend-overlay" />

                        <div className="space-y-6 relative z-10">
                            <StoryContent isBook />
                            <div className="relative w-full aspect-square max-w-[280px] mx-auto rotate-3 mt-4">
                                <PolaroidImage currentPhotoIndex={currentPhotoIndex} />
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-4 relative z-10">
                            <span className="text-muted-foreground text-xs italic">Page 1</span>
                            <Button
                                onClick={toggleFlip}
                                className="rounded-full"
                                variant="outline"
                                size="icon"
                            >
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Back (Mobile) */}
                    <div className="absolute inset-0 w-full h-full bg-[#fdfbf7] dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 flex flex-col justify-between backface-hidden overflow-hidden [transform:rotateY(180deg)] transition-colors duration-500"
                        style={{
                            zIndex: isFlipped ? 10 : 0,
                        }}>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-50 dark:opacity-10 pointer-events-none mix-blend-multiply dark:mix-blend-overlay" />

                        <div className="space-y-6 relative z-10">
                            <ImpactContent isBookLeft />
                            <div className="relative w-full aspect-square max-w-[240px] mx-auto rotate-[-2deg] mt-2">
                                <PolaroidImage currentPhotoIndex={currentPhotoIndex} />
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-4 relative z-10">
                            <Button
                                onClick={toggleFlip}
                                className="rounded-full"
                                variant="outline"
                                size="icon"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-muted-foreground text-xs italic">Page 2</span>
                        </div>
                    </div>
                </div>
                {/* Desktop 3D Book */}
                <div className={cn(
                    "hidden md:block relative w-full h-full transition-transform duration-1000 transform-style-3d",
                    isFlipped ? "rotate-y-180" : ""
                )}>

                    {/* Front Spread (Our Story + Photo) */}
                    <div
                        className="absolute inset-0 w-full h-full flex transform-style-3d backface-hidden"
                        style={{ zIndex: isFlipped ? 0 : 10 }}
                    >
                        {/* Left Page: Text */}
                        <div className="w-1/2 h-full bg-[#fdfbf7] dark:bg-zinc-900 rounded-l-2xl shadow-2xl p-12 flex flex-col justify-center border-r border-gray-200 dark:border-zinc-800 relative overflow-hidden transition-colors duration-500">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-50 dark:opacity-10 pointer-events-none mix-blend-multiply dark:mix-blend-overlay" />
                            <StoryContent isBook />
                            <div className="absolute bottom-8 right-8">
                                <span className="text-muted-foreground text-sm italic">Page 1</span>
                            </div>
                        </div>

                        {/* Right Page: Photo Slideshow */}
                        <div className="w-1/2 h-full bg-[#fdfbf7] dark:bg-zinc-900 rounded-r-2xl shadow-2xl p-12 flex items-center justify-center relative overflow-hidden transition-colors duration-500">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-50 dark:opacity-10 pointer-events-none mix-blend-multiply dark:mix-blend-overlay" />

                            <div className="relative w-[70%] aspect-[3/4] rotate-3">
                                <PolaroidImage currentPhotoIndex={currentPhotoIndex} />
                            </div>

                            <div className="absolute bottom-8 left-8">
                                <span className="text-muted-foreground text-sm italic">Page 2</span>
                            </div>

                            <Button
                                onClick={toggleFlip}
                                className="absolute bottom-8 right-8 z-20 rounded-full"
                                variant="ghost"
                            >
                                <ArrowRight className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>

                    {/* Back Spread (Impact + Graph) - Rotated 180deg */}
                    <div
                        className="absolute inset-0 w-full h-full flex transform-style-3d backface-hidden rotate-y-180"
                        style={{ zIndex: isFlipped ? 10 : 0 }}
                    >
                        {/* Left Page: Impact Stats */}
                        <div className="w-1/2 h-full bg-[#fdfbf7] dark:bg-zinc-900 rounded-l-2xl shadow-2xl p-12 flex flex-col justify-center border-r border-gray-200 dark:border-zinc-800 relative overflow-hidden transition-colors duration-500">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-50 dark:opacity-10 pointer-events-none mix-blend-multiply dark:mix-blend-overlay" />
                            <ImpactContent isBookLeft />

                            <div className="absolute bottom-8 right-8">
                                <span className="text-muted-foreground text-sm italic">Page 3</span>
                            </div>

                            <Button
                                onClick={toggleFlip}
                                className="absolute bottom-8 left-8 z-20 rounded-full"
                                variant="ghost"
                            >
                                <ArrowLeft className="h-6 w-6" />
                            </Button>
                        </div>

                        {/* Right Page: Photo Slideshow (Impact) */}
                        <div className="w-1/2 h-full bg-[#fdfbf7] dark:bg-zinc-900 rounded-r-2xl shadow-2xl p-12 flex items-center justify-center relative overflow-hidden transition-colors duration-500">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-50 dark:opacity-10 pointer-events-none mix-blend-multiply dark:mix-blend-overlay" />

                            <div className="relative w-[70%] aspect-[3/4] rotate-[-2deg]">
                                <PolaroidImage currentPhotoIndex={currentPhotoIndex} />
                            </div>

                            <div className="absolute bottom-8 right-8">
                                <span className="text-muted-foreground text-sm italic">Page 4</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
}

function PolaroidImage({ currentPhotoIndex }: { currentPhotoIndex: number }) {
    return (
        <div className="bg-white dark:bg-zinc-800 p-3 shadow-lg relative w-full h-full transition-colors duration-500">
            {/* Tape Effect - Top Left */}
            <div className="absolute -top-3 -left-3 w-24 h-8 bg-white/60 dark:bg-zinc-600/60 rotate-[-35deg] shadow-sm z-20 opacity-90 backdrop-blur-[1px]" style={{ clipPath: "polygon(2% 0, 100% 2%, 98% 100%, 0 98%)" }} />

            {/* Tape Effect - Top Right */}
            <div className="absolute -top-3 -right-3 w-24 h-8 bg-white/60 dark:bg-zinc-600/60 rotate-[35deg] shadow-sm z-20 opacity-90 backdrop-blur-[1px]" style={{ clipPath: "polygon(2% 0, 100% 2%, 98% 100%, 0 98%)" }} />

            <div className="relative w-full h-full overflow-hidden bg-gray-100 dark:bg-zinc-900">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentPhotoIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={photos[currentPhotoIndex]}
                            alt="Our Story Moment"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={true}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function StoryContent({ isBook = false }: { isBook?: boolean }) {
    return (
        <div className={cn("space-y-6", isBook ? "relative z-10" : "")}>
            <div className="flex items-center text-primary">
                <BookOpenText className="h-8 w-8 mr-3" />
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-serif">
                    Our Story
                </h2>
            </div>
            <div className="h-[2px] w-16 bg-primary/50" />

            <div className="space-y-4 text-muted-foreground font-serif leading-relaxed text-lg">
                <p>
                    Growing Up Muslim Events was formed from one simple idea: our community deserves inspiring Islamic events, right here in Ireland.
                </p>
                <p>
                    Our mission is to help young Muslims choose Islam again, not just by name, but with conviction. We host high-quality gatherings that speak to the heart, featuring some of the most renowned speakers in the world.
                </p>
            </div>
        </div>
    );
}

function ImpactContent({ isBookLeft = false }: { isBookLeft?: boolean }) {
    return (
        <div className={cn("space-y-8", isBookLeft ? "relative z-10" : "")}>
            <div className="flex items-center text-accent">
                <TrendingUp className="h-8 w-8 mr-3" />
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-serif">
                    Our Impact
                </h2>
            </div>
            <div className="h-[2px] w-16 bg-accent/50" />

            <div className="grid gap-6">
                {impactData.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.metric} className="flex items-start space-x-4">
                            <div className={cn("p-2 rounded-lg bg-primary/10", item.valueColorClass)}>
                                <Icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{item.metric}</p>
                                <p className="text-xl font-bold text-foreground">{item.value}</p>
                                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}


