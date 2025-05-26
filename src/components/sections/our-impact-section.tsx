
"use client";

import { TrendingUp, UsersRound, Trophy, CalendarCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
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
  { year: "2023", members: 100 },
  { year: "2024", members: 5000 },
  { year: "2025", members: 6500 },
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
        <Card className="shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <ChartContainer config={chartConfig} className="h-[250px] w-full sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: -15, 
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient id="fillMembers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-members)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-members)" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.5} />
                  <XAxis
                    dataKey="year"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={12}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={false} 
                  />
                  <Tooltip
                    cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1, strokeDasharray: "3 3" }}
                    content={<ChartTooltipContent indicator="line" hideLabel />}
                  />
                  <Line
                    dataKey="members"
                    type="monotone"
                    stroke="var(--color-members)"
                    strokeWidth={2.5} 
                    dot={{
                      r: 4,
                      fill: "var(--color-members)",
                      strokeWidth: 2,
                      stroke: "hsl(var(--background))", 
                    }}
                    activeDot={{
                      r: 7, 
                      strokeWidth: 2,
                      stroke: "hsl(var(--background))",
                      fill: "var(--color-members)",
                    }}
                  />
                  <Area
                    type="monotone"
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
