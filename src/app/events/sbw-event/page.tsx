"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Ticket, Calendar, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Container from "@/components/ui/container";

export default function SBWEventPage() {
    const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-emerald-500/30 transition-colors duration-500">
            <Header />

            <main className="flex-grow">
                {/* Hero Section - Matching Reference Image */}
                <section className="relative bg-white dark:bg-zinc-900 pt-24 pb-16 transition-colors duration-500">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            {/* Left Content */}
                            <div className="lg:col-span-7 space-y-8">
                                {/* Date */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-[0.3em] text-sm transition-colors duration-500"
                                >
                                    26 December 2025
                                </motion.p>

                                {/* Main Heading */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-zinc-900 dark:text-white transition-colors duration-500">
                                        Embrace your<br />
                                        <span className="text-emerald-600 dark:text-emerald-500 transition-colors duration-500">identity.</span><br />
                                        Stand firm.
                                    </h1>
                                </motion.div>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl transition-colors duration-500"
                                >
                                    A night of inspiration and connection. This isn't just an event—it's a movement.
                                </motion.p>

                                {/* Compact Countdown Timer */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-4 inline-block"
                                >
                                    <p className="text-white text-xs font-bold uppercase tracking-widest mb-2 opacity-90">Event Starts In</p>
                                    <CompactCountdown targetDate={new Date("2025-12-26T16:30:00")} />
                                </motion.div>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex flex-wrap gap-4 pt-4"
                                >
                                    <Button
                                        size="lg"
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                                        onClick={() => document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        <Ticket className="w-5 h-5 mr-2" />
                                        Buy Tickets Now
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-2 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold px-8 py-6 rounded-lg transition-all"
                                    >
                                        Learn More
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </motion.div>
                            </div>

                            {/* Right Content - Poster & Tickets */}
                            <div className="lg:col-span-5 space-y-6">
                                {/* Event Poster */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-500/30"
                                >
                                    <Image
                                        src="/images/SBW%20Event.JPG"
                                        alt="Unapologetic Event Poster"
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 40vw"
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

                                    <div className="space-y-3">
                                        {/* General Admission Ticket */}
                                        <button
                                            onClick={() => setSelectedTicket('general')}
                                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedTicket === 'general'
                                                ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30'
                                                : 'border-zinc-200 dark:border-zinc-700 hover:border-emerald-300 dark:hover:border-emerald-700'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-bold text-zinc-900 dark:text-white">General Admission</h4>
                                                        {selectedTicket === 'general' && (
                                                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Access to all sessions</p>
                                                </div>
                                                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-500">€15</p>
                                            </div>
                                        </button>

                                        {/* VIP Ticket */}
                                        <button
                                            onClick={() => setSelectedTicket('vip')}
                                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedTicket === 'vip'
                                                ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30'
                                                : 'border-zinc-200 dark:border-zinc-700 hover:border-emerald-300 dark:hover:border-emerald-700'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-bold text-zinc-900 dark:text-white">VIP Access</h4>
                                                        {selectedTicket === 'vip' && (
                                                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Premium seating + Meet & Greet</p>
                                                </div>
                                                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-500">€25</p>
                                            </div>
                                        </button>
                                    </div>

                                    <Button
                                        className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 rounded-lg disabled:opacity-50"
                                        disabled={!selectedTicket}
                                        onClick={() => {
                                            window.open('https://www.tickettailor.com/all-tickets/growingupmuslim/', '_blank');
                                        }}
                                    >
                                        Proceed to Checkout
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Event Details - Horizontal Cards Matching Reference */}
                <section className="py-12 bg-zinc-100 dark:bg-zinc-900/50 transition-colors duration-500">
                    <Container>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 transition-colors duration-500"
                            >
                                <Calendar className="w-10 h-10 text-emerald-600 dark:text-emerald-500 mb-3 transition-colors duration-500" />
                                <p className="text-xs text-emerald-600 dark:text-emerald-500 uppercase tracking-wider font-bold mb-1 transition-colors duration-500">DATE</p>
                                <p className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-500">December 26th</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 transition-colors duration-500">2025</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 transition-colors duration-500"
                            >
                                <Clock className="w-10 h-10 text-emerald-600 dark:text-emerald-500 mb-3 transition-colors duration-500" />
                                <p className="text-xs text-emerald-600 dark:text-emerald-500 uppercase tracking-wider font-bold mb-1 transition-colors duration-500">TIME</p>
                                <p className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-500">4:30 PM</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 transition-colors duration-500">Doors Open</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 transition-colors duration-500"
                            >
                                <MapPin className="w-10 h-10 text-emerald-600 dark:text-emerald-500 mb-3 transition-colors duration-500" />
                                <p className="text-xs text-emerald-600 dark:text-emerald-500 uppercase tracking-wider font-bold mb-1 transition-colors duration-500">VENUE</p>
                                <p className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-500">UCD Astra Hall</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 transition-colors duration-500">University College Dublin</p>
                            </motion.div>
                        </div>
                    </Container>
                </section>

                {/* About Section */}
                <section className="py-20 bg-white dark:bg-zinc-900 transition-colors duration-500">
                    <Container>
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center space-y-8"
                            >
                                <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white transition-colors duration-500">
                                    About The <span className="text-emerald-600 dark:text-emerald-500 transition-colors duration-500">Event</span>
                                </h2>

                                <div className="prose prose-lg dark:prose-invert mx-auto text-zinc-600 dark:text-zinc-400 space-y-6 transition-colors duration-500">
                                    <p className="text-xl leading-relaxed">
                                        Expect powerful talks, engaging discussions, and a community atmosphere that feels like home. We're bringing together voices that inspire and challenge, creating a space for growth and connection.
                                    </p>

                                    <div className="my-12 p-8 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border-l-4 border-emerald-600 dark:border-emerald-500 transition-colors duration-500">
                                        <p className="text-2xl font-bold text-zinc-900 dark:text-white italic transition-colors duration-500">
                                            "Come as you are, leave inspired."
                                        </p>
                                    </div>

                                    <p>
                                        Whether you're looking for answers, inspiration, or just good company, Unapologetic is the place to be.
                                    </p>
                                </div>

                                {/* Another CTA */}
                                <Button
                                    size="lg"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                                    onClick={() => document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    <Ticket className="w-5 h-5 mr-2" />
                                    Get Your Tickets
                                </Button>
                            </motion.div>
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

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
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
