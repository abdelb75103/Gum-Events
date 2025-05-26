
"use client";

import { TrendingUp, UsersRound, Trophy, CalendarCheck } from "lucide-react";
import Container from "@/components/ui/container";
// Chart related imports are kept in case they are needed later, but the chart itself is removed.
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent } from "@/components/ui/card";


const achievements = [
  {
    icon: UsersRound,
    value: "1000s",
    description: "Lives Impacted Across Europe",
    ariaLabel: "Thousands of lives impacted across Europe",
  },
  {
    icon: Trophy,
    value: "Ireland's Largest",
    description: "Islamic Event",
    ariaLabel: "Ireland's Largest Islamic Event",
  },
  {
    icon: CalendarCheck,
    value: "20+",
    description: "Events in 2+ Years",
    ariaLabel: "Over twenty events in more than two years",
  },
];

// Chart data and config are kept commented out in case they are needed later
// const chartData = [
//   { year: "2023", members: 500 },
//   { year: "Early '24", members: 1200 },
//   { year: "Mid '24", members: 2500 },
//   { year: "Late '24", members: 4000 },
//   { year: "Mid '25", members: 5500 },
//   { year: "Late '25", members: 7000 },
// ];

// const chartConfig = {
//   members: {
//     label: "Community Members",
//     color: "hsl(var(--primary))",
//   },
// } satisfies ChartConfig;

export default function OurImpactSection() {
  return (
    <section id="our-impact" className="py-16 sm:py-24 bg-background">
      <Container>
        <div className="mb-12 text-center">
          <TrendingUp className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Impact
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Making a difference, together. Here's a glimpse of our journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16 sm:mb-24">
          {achievements.map((ach, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.03]"
              aria-label={ach.ariaLabel}
            >
              <ach.icon className="h-10 w-10 text-accent mb-3" />
              <p className="text-3xl font-bold text-foreground">{ach.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{ach.description}</p>
            </div>
          ))}
        </div>

        {/* Graph section has been removed */}
        
      </Container>
    </section>
  );
}
