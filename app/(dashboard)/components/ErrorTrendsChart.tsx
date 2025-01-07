"use client";

import { useEffect, useState } from "react";
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

// Configuration des couleurs pour le graphique
const chartConfig = {
  errors: {
    label: "Error Trends",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ErrorTrendsChart({ errorTrends }: { errorTrends: any }) {
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendances des erreurs</CardTitle>
        <CardDescription>
        Affichage des tendances d'erreur au cours des dernières minutes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={errorTrends} // Données dynamiques
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="errors"
              type="natural"
              fill="var(--color-errors)"
              fillOpacity={0.4}
              stroke="var(--color-errors)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
            Tendance à la hausse de X% ce mois-ci <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
            Tendances des erreurs en temps réel
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
