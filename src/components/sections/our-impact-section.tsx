
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
    description: "Consistently delivering engaging and\nmeaningful events.", // Added \n for line break
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
    <section id="our-impact" className="py-16 sm:py-24 bg-secondary dark:bg-background"> 
      <Container> 
        <div className="text-center mb-12 md:mb-16">
          <TrendingUp className="h-12 w-12 md:h-16 md:w-16 text-primary mx-auto mb-4 md:mb-6" /> 
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground"> 
            Our Impact
          </h2>
          <div className="mt-2 mx-auto h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div> 
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Making a meaningful difference through our dedicated efforts and community engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 md:mb-16"> 
          {impactData.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card 
                key={item.metric} 
                className="text-card-foreground shadow-lg overflow-hidden"
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium text-card-foreground">
                    {item.metric}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative pt-0">
                  <div className="relative z-10">
                    <div className={cn("text-2xl font-bold", item.valueColorClass)}>{item.value}</div>
                    <div className="text-xs text-muted-foreground pt-1">
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
                      "absolute -right-5 -bottom-5 h-28 w-28 opacity-[0.18] z-0 pointer-events-none", 
                      item.watermarkColorClass
                    )}
                    aria-hidden="true"
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="text-card-foreground shadow-lg col-span-1 md:col-span-3">
          <CardHeader>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">Our Growing Community</CardTitle>
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="pb-8">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
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
                    <stop offset="5%" stopColor="var(--color-members)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--color-members)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
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
                  stroke="var(--color-members)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorMembers)"
                  dot={{
                    r: 5,
                    strokeWidth: 2,
                    fill: "var(--color-members)",
                    stroke: "hsl(var(--background))",
                  }}
                  activeDot={{
                    r: 7,
                    strokeWidth: 2,
                    fill: "var(--color-members)",
                    stroke: "hsl(var(--background))",
                  }}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
