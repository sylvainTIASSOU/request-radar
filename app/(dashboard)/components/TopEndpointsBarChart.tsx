"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export function TopEndpointsBarChart({ endpoints }: { endpoints: { endpoint: string; count: number }[] }) {
     const chartConfig = {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      } satisfies ChartConfig
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Endpoints</CardTitle>
        <CardDescription>Endpoints les plus utilisés</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} >
          <BarChart
            data={endpoints}
            width={500}
            height={300}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="endpoint" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-endpoint)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Fréquences d'accès pour les 5 endpoints les plus populaires
        </div>
      </CardFooter>
    </Card>
  );
}
