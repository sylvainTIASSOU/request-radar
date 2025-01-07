"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export function SecteurCharts({ analyticsData }: { analyticsData: any }) {
  // Vérifiez si les données sont disponibles
  if (!analyticsData) {
    return <p>Chargement des données...</p>;
  }

  // Calculer les taux de succès et d'erreur
  const successRate = 1 - analyticsData.error_rate; // Taux de succès
  const pieData = [
    { name: "Succès", value: successRate * 100, fill: "#4CAF50" }, // Vert pour le succès
    { name: "Erreur", value: analyticsData.error_rate * 100, fill: "#F44336" }, // Rouge pour l'erreur
  ];

  const chartConfig = {
    succes: {
      label: "Succès",
      color: "#4CAF50", // Vert
    },
    erreur: {
      label: "Erreur",
      color: "#F44336", // Rouge
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Taux de Succès / Erreur</CardTitle>
        <CardDescription>Dernières données reçues</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={100}
              label={({ name, value }) => `${name}: ${value.toFixed(2)}%`}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Données en temps réel des requêtes
        </div>
      </CardFooter>
    </Card>
  );
}
