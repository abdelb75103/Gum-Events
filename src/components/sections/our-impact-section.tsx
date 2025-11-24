"use client";

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Award, CalendarDays, TrendingUp } from 'lucide-react';
import Container from '@/components/ui/container';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  TooltipProps
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig
} from '@/components/ui/chart';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const impactData = [
  {
    metric: "Lives Impacted Across the World",
    value: "THOUSANDS",
    description: "Reaching and enriching numerous lives throughout the globe.",
    icon: Users,
    valueColorClass: "text-primary",
    watermarkColorClass: "text-accent",
  },
  {
    metric: "Largest Islamic Event in Ireland",
    value: "Record Breaking",
    description: "Hosted the largest Islamic event of its kind in Ireland.",
    icon: Award,
    valueColorClass: "text-accent",
    watermarkColorClass: "text-primary",
  },
  {
    metric: "Events Hosted",
    value: "20+ in 2 Years",
    description: "Consistently delivering engaging and\nmeaningful events.",
    icon: CalendarDays,
    valueColorClass: "text-primary",
    watermarkColorClass: "text-accent",
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

// Custom Tooltip Content to show only the year
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

export default function OurImpactSection() {
  return (
    <section id="our-impact" className="py-16 sm:py-24 bg-secondary/30 dark:bg-background relative overflow-hidden">
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <TrendingUp className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Our Impact
            </h2>
            <div className="mt-4 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Making a meaningful difference through our dedicated efforts and community engagement.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 md:mb-16">
          {impactData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <ScrollReveal key={item.metric} delay={index * 0.1} className="h-full">
                <Card
                  className="text-card-foreground shadow-lg overflow-hidden h-full border-primary/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      {item.metric}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative pt-2">
                    <div className="relative z-10">
                      <div className={cn("text-3xl font-bold mb-2", item.valueColorClass)}>{item.value}</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        {item.description.split('\n').map((line, index, arr) => (
                          <React.Fragment key={index}>
                            {line}
                            {index < arr.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <IconComponent
                      className={cn(
                        "absolute -right-6 -bottom-6 h-32 w-32 opacity-[0.1] z-0 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12",
                        item.watermarkColorClass
                      )}
                      aria-hidden="true"
                    />
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <Card className="text-card-foreground shadow-xl col-span-1 md:col-span-3 border-primary/10 overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border/50">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-xl font-bold">Our Growing Community</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Tracking our member growth over the years</p>
                </div>
                <div className="p-2 bg-background rounded-full shadow-sm">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8 pb-8">
              <ChartContainer config={chartConfig} className="h-[350px] w-full">
                <AreaChart
                  accessibilityLayer
                  data={communityGrowthData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis
                    dataKey="year"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => String(value).slice(0, 4)}
                    interval={0}
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={false}
                    width={10}
                    domain={[0, 8000]}
                  />
                  <ChartTooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    content={<CustomTooltipContent />}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area
                    dataKey="members"
                    type="monotone"
                    stroke="var(--primary)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorMembers)"
                    dot={{
                      r: 6,
                      strokeWidth: 3,
                      fill: "var(--primary)",
                      stroke: "hsl(var(--background))",
                    }}
                    activeDot={{
                      r: 8,
                      strokeWidth: 3,
                      fill: "var(--primary)",
                      stroke: "hsl(var(--background))",
                    }}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </ScrollReveal>
      </Container>
    </section>
  );
}
