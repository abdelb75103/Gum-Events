"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Ticket, Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Container from "@/components/ui/container";

const DETAIL_ITEMS = [
    { label: "DATE", value: "December 31st, 2025", Icon: Calendar },
    { label: "TIME", value: "4:30 PM · Doors Open", Icon: Clock },
    { label: "VENUE", value: "RDS Concert Hall", Icon: MapPin },
];

export default function SBWEventPage() {
    const [isAboutVisible, setIsAboutVisible] = useState(false);
    const ticketWidgetRef = useRef<HTMLDivElement | null>(null);
    const ticketTailorUrl = "https://www.tickettailor.com/all-tickets/growingupmuslim/?ref=website_widget&show_search_filter=true&show_date_filter=true&show_sort=true";

    useEffect(() => {
        const widgetContainer = ticketWidgetRef.current;
        if (!widgetContainer) return;

        const existing = document.querySelector('script[data-tt-widget="true"]');
        if (existing) return;

        const script = document.createElement("script");
        script.src = "https://cdn.tickettailor.com/js/widgets/min/widget.js";
        script.async = true;
        script.dataset.url = ticketTailorUrl;
        script.dataset.type = "inline";
        script.dataset.inlineMinimal = "true";
        script.dataset.inlineShowLogo = "false";
        script.dataset.inlineBgFill = "false";
        script.dataset.inlineInheritRefFromUrlParam = "";
        script.dataset.inlineRef = "website_widget";
        script.dataset.ttWidget = "true";

        widgetContainer.appendChild(script);
    }, [ticketTailorUrl]);

    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-emerald-500/30 transition-colors duration-500">
            <Header />

            <main className="flex-grow">
                {/* Hero Section - Matching Reference Image */}
                <section className="relative bg-white dark:bg-zinc-900 pt-20 sm:pt-24 pb-12 sm:pb-16 transition-colors duration-500">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
                            {/* Left Content */}
                            <div className="lg:col-span-7 space-y-8">
                                {/* Date */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-[0.3em] text-sm transition-colors duration-500"
                                >
                                    31st December 2025
                                </motion.p>

                                {/* Main Heading */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-zinc-900 dark:text-white transition-colors duration-500">
                                        <span className="block">UNAPOLOGETIC</span>
                                        <span className="block">
                                            <span className="text-emerald-600 dark:text-emerald-500 transition-colors duration-500 mr-1">with</span>
                                            <span className="inline-block text-zinc-900 dark:text-white transition-colors duration-500">Sonny Bill Williams</span>
                                        </span>
                                    </h1>
                                </motion.div>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl transition-colors duration-500"
                                >
                                    Millions have connected with his story from a distance, but this is your chance to hear it directly from him, unfiltered and in person.
                                </motion.p>

                                {/* Countdown Timer with Event Details */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch"
                                >
                                    {/* Countdown Timer */}
                                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-4 w-full md:w-auto h-full">
                                        <p className="text-white text-xs font-bold uppercase tracking-widest mb-2 opacity-90">Event Starts In</p>
                                        <CompactCountdown targetDate={new Date("2025-12-31T16:30:00")} />
                                    </div>

                                    {/* Event Details - Single Compact Card */}
                                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 transition-colors duration-500 flex-1 h-full">
                                        <div className="flex flex-col md:flex-row h-full divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
                                            {DETAIL_ITEMS.map(({ label, value, Icon }) => (
                                                <div key={label} className="flex items-center gap-2 py-2 px-3 flex-1 min-w-0">
                                                    <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-500 shrink-0" />
                                                    <div className="min-w-0">
                                                        <p className="text-[10px] text-emerald-600 dark:text-emerald-500 uppercase tracking-wider font-bold">{label}</p>
                                                        <p className="text-sm font-bold text-zinc-900 dark:text-white leading-tight break-words">{value}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
                                >
                                    <Button
                                        size="lg"
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 sm:px-8 py-5 sm:py-6 rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                                        onClick={() => document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        <Ticket className="w-5 h-5 mr-2" />
                                        Buy Tickets Now
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold px-6 sm:px-8 py-5 sm:py-6 rounded-lg transition-all w-full sm:w-auto"
                                        onClick={() => {
                                            setIsAboutVisible(!isAboutVisible);
                                        }}
                                    >
                                        {isAboutVisible ? 'Show Less' : 'Learn More'}
                                        <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-300 ${isAboutVisible ? 'rotate-90' : ''}`} />
                                    </Button>
                                </motion.div>

                                {/* About Section - Conditionally Rendered */}
                                <motion.div
                                    id="event-description"
                                    initial={false}
                                    animate={{
                                        height: isAboutVisible ? "auto" : 0,
                                        opacity: isAboutVisible ? 1 : 0,
                                        marginTop: isAboutVisible ? 32 : 0
                                    }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-8 space-y-8">
                                        <div className="space-y-12">
                                            {/* Intro Block */}
                                            <div className="relative">
                                                <h3 className="text-4xl md:text-6xl font-black text-zinc-100 dark:text-zinc-800/50 absolute -top-6 -left-6 select-none z-0">
                                                    UNAPOLOGETIC
                                                </h3>
                                                <p className="relative z-10 text-xl md:text-2xl font-medium text-zinc-900 dark:text-white leading-relaxed">
                                                    An Afternoon with <span className="font-bold">Sonny Bill Williams</span> invites you to an afternoon of <span className="text-emerald-600 dark:text-emerald-500 font-bold italic">honesty, growth</span> and <span className="text-emerald-600 dark:text-emerald-500 font-bold italic">unapologetic truth</span>.
                                                </p>
                                            </div>

                                            {/* Main Story Block */}
                                            <div className="prose prose-lg dark:prose-invert text-zinc-600 dark:text-zinc-400">
                                                <p>
                                                    Join two-time Rugby World Cup Champion <strong className="text-zinc-900 dark:text-white">Sonny Bill Williams</strong> live in Dublin for an intimate and deeply personal conversation about the journey behind the headlines.
                                                </p>
                                                <p>
                                                    We'll explore the weight of fame, moments of doubt, the search for meaning, and the <span className="text-emerald-600 dark:text-emerald-500 font-medium">faith that ultimately grounded him</span>.
                                                </p>
                                            </div>



                                            {/* Closing Statement */}
                                            <div className="space-y-6 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                                                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                                                    <strong className="text-zinc-900 dark:text-white">UNAPOLOGETIC</strong> brings together meaningful reflection, uplifting reminders and powerful storytelling. A space to think deeply, feel inspired and walk away with a renewed sense of purpose.
                                                </p>
                                                <p className="text-xl md:text-2xl font-serif italic text-emerald-600 dark:text-emerald-500">
                                                    Live your truth boldly, sincerely and unapologetically.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Content - Poster & Tickets */}
                            <div className="lg:col-span-5 space-y-6">
                                {/* Event Poster */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-500/30 w-full max-w-md mx-auto lg:mx-0"
                                >
                                    <Image
                                        src="/images/SBW%20Event.JPG"
                                        alt="Unapologetic Event Poster"
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                        placeholder="blur"
                                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiM0YmE2NzgiLz48L3N2Zz4="
                                    />
                                </motion.div>

                                {/* Ticket Selection - Embedded Below Poster */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    id="tickets"
                                    className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 transition-colors duration-500"
                                >
                                    <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white flex items-center gap-2 transition-colors duration-500">
                                        <Ticket className=" w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                                        Select Your Tickets
                                    </h3>

                                    <div className="tt-widget" ref={ticketWidgetRef}>
                                        <div className="tt-widget-fallback">
                                            <p>
                                                <a href={ticketTailorUrl} target="_blank">
                                                    Click here to buy tickets
                                                </a>
                                                <br />
                                                <small>
                                                    <a href="https://www.tickettailor.com?rf=wdg_220073" className="tt-widget-powered">
                                                        Sell tickets online with Ticket Tailor
                                                    </a>
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </Container>
                </section>


            </main>

            <Footer />
        </div>
    );
}

// Compact Countdown Timer Component
function CompactCountdown({ targetDate }: { targetDate: Date }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(interval);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);
            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="flex gap-3">
            <div className="text-center">
                <div className="text-2xl font-black text-white font-mono">{timeLeft.days}</div>
                <div className="text-[10px] uppercase text-white/80">Days</div>
            </div>
            <div className="text-white/50 text-2xl font-bold">:</div>
            <div className="text-center">
                <div className="text-2xl font-black text-white font-mono">{timeLeft.hours}</div>
                <div className="text-[10px] uppercase text-white/80">Hrs</div>
            </div>
            <div className="text-white/50 text-2xl font-bold">:</div>
            <div className="text-center">
                <div className="text-2xl font-black text-white font-mono">{timeLeft.minutes}</div>
                <div className="text-[10px] uppercase text-white/80">Mins</div>
            </div>
            <div className="text-white/50 text-2xl font-bold">:</div>
            <div className="text-center">
                <div className="text-2xl font-black text-white font-mono">{timeLeft.seconds}</div>
                <div className="text-[10px] uppercase text-white/80">Secs</div>
            </div>
        </div>
    );
}
