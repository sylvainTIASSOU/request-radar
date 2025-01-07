"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

function generateResponseTimeBins(data: any, binSize = 30) {
    const bins: { [key: string]: number } = {};
    data.forEach((responseTime: any) => {
      const bin = Math.floor(responseTime / binSize) * binSize;
      const binLabel = `${bin}-${bin + binSize - 1}ms`;
      if (!bins[binLabel]) {
        bins[binLabel] = 0;
      }
      bins[binLabel] += 1;
    });
  
    return Object.keys(bins).map((bin) => ({
      range: bin,
      count: bins[bin],
    }));
  }
  
export function BarCharts({ responseTimes }: { responseTimes: number[] }) {
  // Transformer les données en bins pour l'histogramme
  const histogramData = generateResponseTimeBins(responseTimes, 30);
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#7DD3FC",
    },
  } satisfies ChartConfig
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribution des Temps de Réponse</CardTitle>
        <CardDescription>Données en temps réel</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}    >
          <BarChart
            accessibilityLayer
            data={histogramData}
            width={500}
            height={300}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="range" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Fréquences des temps de réponse
        </div>
      </CardFooter>
    </Card>
  );
}
