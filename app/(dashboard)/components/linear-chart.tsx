"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  requests: {
    label: "Requêtes",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AreaCharts({ chartData }: { chartData: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Volume de Requêtes</CardTitle>
        <CardDescription>Requêtes par minute</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time" // Utilise les mêmes données que pour le LineChart
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="requests" // Affiche les volumes de requêtes
              type="natural"
              fill="var(--color-requests)"
              fillOpacity={0.4}
              stroke="var(--color-requests)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Dernières requêtes en temps réel
        </div>
        <div className="leading-none text-muted-foreground">
          Données collectées toutes les minutes
        </div>
      </CardFooter>
    </Card>
  );
}
