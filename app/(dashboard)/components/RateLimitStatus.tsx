"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Assurez-vous d'avoir une barre de progression disponible

export function RateLimitStatus({rateLimitUsage}: {rateLimitUsage: number}) {


  return (
    <Card>
      <CardHeader>
        <CardTitle>Statut de la limitation du taux</CardTitle>
        <CardDescription>Utilisation actuelle du taux de limitation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-lg font-semibold">
            Utilisation actuelle : {rateLimitUsage.toFixed(2)}%
          </div>
          <Progress value={rateLimitUsage} max={100} />
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Mise à jour dynamique en temps réel
        </div>
      </CardFooter>
    </Card>
  );
}
