
"use client";

import Link from "next/link";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Award, BookOpenText, CheckCircle2, TrendingUp, Users, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const impactData = [
    {
      metric: "Record-Breaking Events",
      value: "Ireland's Largest",
      icon: Award,
    },
    {
      metric: "Community Growth",
      value: "Thousands Reached",
      icon: TrendingUp,
    },
    {
      metric: "Inspiring Speakers",
      value: "World-Renowned",
      icon: Users,
    },
  ];


export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-card">
        <Container>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="flex items-center text-primary">
                        <BookOpenText className="h-10 w-10 mr-3" />
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Who We Are
                        </h2>
                    </div>
                    <div className="mt-2 h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>
                    
                    <p className="text-lg leading-8 text-muted-foreground">
                    GUM Events was formed from one simple idea: our community deserves inspiring Islamic events, right here in Ireland. Our mission is to help young Muslims choose Islam again, not just by name, but with conviction.
                    </p>
                    <p className="text-lg leading-8 text-muted-foreground">
                    We host high-quality gatherings that speak to the heart, featuring some of the most renowned speakers in the world.
                    </p>

                    <Button asChild size="lg">
                        <Link href="/our-story">
                            Read Our Full Story <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {impactData.map((item) => (
                        <Card key={item.metric} className="bg-background shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {item.metric}
                                </CardTitle>
                                <item.icon className="h-5 w-5 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-foreground">{item.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Container>
    </section>
  );
}
