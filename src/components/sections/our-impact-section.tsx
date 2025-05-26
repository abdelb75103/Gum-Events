
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
  { year: "Start 2023", members: 0 },
  { year: "End 2023", members: 100 },
  { year: "End 2024", members: 5000 },
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
              className="flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow"
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
            Tracking our journey from the beginning.
          </p>
        </div>
        <Card className="shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <ChartContainer config={chartConfig} className="h-[250px] w-full sm:h-[300px]">
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 5,
                  right: 10, // Reduced right margin
                  left: -15, // Adjusted left margin to pull Y-axis labels closer
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
                  tickMargin={8}
                  fontSize={12}
                  tickFormatter={(value) => {
                    if (value >= 1000) return `${value / 1000}k`;
                    return value.toString();
                  }}
                  domain={[0, 'dataMax + 500']} // Add some padding to Y-axis
                />
                <Tooltip
                  cursor={true}
                  content={<ChartTooltipContent indicator="line" hideLabel />}
                />
                <Line
                  dataKey="members"
                  type="monotone"
                  stroke="var(--color-members)"
                  strokeWidth={3} // Slightly thicker line
                  dot={{
                    r: 4, // Smaller dots
                    fill: "var(--color-members)",
                    strokeWidth: 1,
                    stroke: "hsl(var(--background))", // Dot border matching background
                  }}
                  activeDot={{
                    r: 6, // Larger active dot
                    strokeWidth: 2,
                    stroke: "hsl(var(--background))",
                  }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
