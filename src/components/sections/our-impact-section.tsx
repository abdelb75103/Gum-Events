
"use client";

import { TrendingUp, UsersRound, Trophy, CalendarCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Container from "@/components/ui/container";
import {
  LineChart,
  Line,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

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

const chartData = [
  { year: "2023 Early", members: 20 },
  { year: "2023 Mid", members: 150 },
  { year: "2023 Late", members: 100 }, // Achieved initial target
  { year: "2024 Early", members: 1500 },
  { year: "2024 Mid", members: 4500 },
  { year: "2024 Late", members: 5000 }, // Achieved target
  { year: "2025 Early", members: 5800 },
  { year: "2025 Mid", members: 7200 }, // Surpassed target
  { year: "2025 Late", members: 6500 }, // Settled at target
];

const chartConfig = {
  members: {
    label: "Community Members",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

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
            Making a difference, together. Here's a glimpse of our journey and growth.
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

        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Community Growth</h3>
          <p className="mt-2 text-md leading-8 text-muted-foreground">
            Tracking our journey.
          </p>
        </div>
        <Card className="border bg-transparent shadow-none">
          <CardContent className="p-4 sm:p-6">
            <ChartContainer config={chartConfig} className="h-[250px] w-full sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 20, 
                    bottom: 20,
                  }}
                >
                  <defs>
                    <linearGradient id="fillMembers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-members)" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="var(--color-members)" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <Tooltip
                    cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1.5, strokeDasharray: "3 3" }}
                    content={
                      <ChartTooltipContent
                        hideLabel 
                        formatter={(value, name, itemProps) => {
                          return (
                            <div className="flex items-center gap-2 text-sm">
                              <span
                                className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                style={{ backgroundColor: itemProps.color }}
                              />
                              <span>{itemProps.payload.year}</span>
                            </div>
                          );
                        }}
                        indicator="line"
                      />
                    }
                  />
                  <Line
                    dataKey="members"
                    type="natural" // For a smoother, "squiggly" curve
                    stroke="var(--color-members)"
                    strokeWidth={3} 
                    dot={{
                      r: 5,
                      fill: "var(--color-members)",
                      strokeWidth: 2,
                      stroke: "hsl(var(--background))", 
                    }}
                    activeDot={{
                      r: 8, 
                      strokeWidth: 2,
                      stroke: "hsl(var(--background))",
                      fill: "var(--color-members)",
                    }}
                  />
                  <Area
                    type="natural" // Match the line type
                    dataKey="members"
                    stroke="none"
                    fill="url(#fillMembers)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
