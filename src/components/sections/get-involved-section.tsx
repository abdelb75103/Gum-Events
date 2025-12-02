"use client";

import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeartHandshake, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";

export default function GetInvolvedSection() {
    return (
        <section id="get-involved" className="relative py-10 sm:py-16 md:py-28 overflow-hidden px-2 sm:px-0">
            {/* Parallax Background */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/images/_MG_0832.jpeg"
                    alt="Volunteers at Gum Events"
                    fill
                    sizes="100vw"
                    className="object-cover object-[center_30%]"
                    priority={false}
                />
                {/* Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
            </div>

            <Container className="relative z-10">
                <div className="grid md:grid-cols-2 gap-3 sm:gap-5 md:gap-8 max-w-5xl mx-auto">
                    {/* Volunteer Card */}
                    <ScrollReveal delay={0.1} className="h-full">
                        <div className="h-full w-full max-w-xl mx-auto md:mx-0 group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 sm:p-6 md:p-10 transition-all duration-500 hover:bg-white/20 md:hover:scale-[1.01] hover:shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col items-center text-center h-full">
                                <div className="inline-flex items-center justify-center p-2.5 sm:p-3.5 md:p-4 bg-white/10 rounded-full mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <HeartHandshake className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-primary" />
                                </div>

                                <h3 className="text-base sm:text-xl md:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4">Get Involved - Volunteer With Us</h3>
                                <p className="text-zinc-200 mb-4 sm:mb-6 md:mb-8 flex-grow text-sm sm:text-base md:text-lg leading-relaxed">
                                    Make a difference in our community! We're looking for passionate individuals to help with our events and initiatives. Click the button below to access our volunteer sign-up form.
                                </p>

                                <Button
                                    asChild
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold text-sm sm:text-lg py-3.5 sm:py-4 md:py-6 rounded-xl shadow-lg transition-all hover:shadow-xl"
                                >
                                    <Link href="/volunteer">
                                        Sign Up to Volunteer <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Contact Card */}
                    <ScrollReveal delay={0.2} className="h-full">
                        <div className="h-full w-full max-w-xl mx-auto md:mx-0 group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 sm:p-6 md:p-10 transition-all duration-500 hover:bg-white/20 md:hover:scale-[1.01] hover:shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col items-center text-center h-full">
                                <div className="inline-flex items-center justify-center p-2.5 sm:p-3.5 md:p-4 bg-white/10 rounded-full mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-accent" />
                                </div>

                                <h3 className="text-base sm:text-xl md:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4">Get In Touch</h3>
                                <p className="text-zinc-200 mb-4 sm:mb-6 md:mb-8 flex-grow text-sm sm:text-base md:text-lg leading-relaxed">
                                    Have questions or want to learn more? We'd love to hear from you. Reach out to us directly via email.
                                </p>

                                <Button
                                    asChild
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold text-sm sm:text-lg py-3.5 sm:py-4 md:py-6 rounded-xl shadow-lg transition-all hover:shadow-xl"
                                >
                                    <a href="mailto:info@growingupmuslimevents.com">
                                        info@growingupmuslimevents.com <Mail className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </Container>
        </section>
    );
}
