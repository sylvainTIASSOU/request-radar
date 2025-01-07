//  TODO Graphique de volume de requêtes : Un graphique en courbes montrant les requêtes par minute.
// TODO  Visualisation des taux de succès/erreur : Diagramme circulaire ou histogramme.
// TODO Distribution des temps de réponse : Histogramme.
// TODO Top 5 des endpoints : Classement ou graphique en barres.
// TODO Statut de la limitation du taux : Jauge ou barre de progression.
// TODO Tendances des erreurs : Graphique en courbes.
// TODO Visualisation des erreurs : Diagramme circulaire ou histogramme.

'use client';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BarCharts } from "../components/bar-chart";
import { AreaCharts } from "../components/linear-chart";
import { SecteurCharts } from "../components/secteur-chart";
import { TopEndpointsBarChart } from "../components/TopEndpointsBarChart";
import { ErrorTrendsChart } from "../components/ErrorTrendsChart";
import { RateLimitStatus } from "../components/RateLimitStatus";
import LoadingComp from "@/components/LoadingComp";
import { useToast } from "@/hooks/use-toast";

function transformTopEndpoints(data: any) {
    return data.map(([endpoint, count]: any) => ({
        endpoint,
        count,
    }));
}


export default function Dashboard() {
    const [analyticsData, setAnalyticsData] = useState<any>(null);
    const [connectionStatus, setConnectionStatus] = useState("Connecting...");
    const token = Cookies.get('token');
    const [chartData, setChartData] = useState<any[]>([]);
    const [responseTimes, setResponseTimes] = useState<number[]>([]);
    const [topEndpoints, setTopEndpoints] = useState<{ endpoint: string; count: number }[]>([]);
    const [errorTrends, setErrorTrends] = useState<any[]>([]);
    const [rateLimitUsage, setRateLimitUsage] = useState<number>(0);
    // const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast()

    useEffect(() => {
        // URL de votre WebSocket (assurez-vous qu'elle correspond à celle de votre serveur)
        const ws = new WebSocket(`ws://localhost:8001/analytics/ws`);

        // Gérer l'ouverture de la connexion
        ws.onopen = () => {
            // ws.send(JSON.stringify({ type: 'authorize', token: token })); // Envoie du token
            setConnectionStatus("Connected");
            console.log("WebSocket connected");
        };

        // Gérer les messages reçus
        ws.onmessage = (event) => {

            const data = JSON.parse(event.data);
            // Ajouter une nouvelle entrée au tableau des données du graphique
            setChartData((prevData) => {
                const now = new Date();
                const newEntry = {
                    time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`, // Format de l'heure
                    requests: data.total_requests, // Volume total des requêtes
                };

                // Garder les 40 eme dernières entrées (ou ajustez selon vos besoins)
                const updatedData = [...prevData, newEntry].slice(-40);
                return updatedData;
            });
            setAnalyticsData(data); // Met à jour l'état avec les données reçues
            console.log("Message received:", data);

            if (data.average_response_time) {
                setResponseTimes((prev) => [...prev, data.average_response_time]);
            }

            // Extraire et transformer les top_endpoints
            if (data.top_endpoints) {
                const transformedEndpoints = transformTopEndpoints(data.top_endpoints);
                setTopEndpoints(transformedEndpoints.slice(0, 5)); // Prendre les 5 premiers
            }


            // Transformer les données des tendances d'erreurs
            if (data.error_trends) {
                // Transformer les données des tendances d'erreurs
                setErrorTrends((prevData) => {
                    const now = new Date();
                    const newEntry = {
                        time: `${now.getHours()}:${now.getMinutes()}`, // Heure actuelle
                        errors: data.error_trends, // Nombre d'erreurs reçu
                    };

                    // Garder les 40 dernières entrées
                    const updatedData = [...prevData, newEntry].slice(-40);
                    return updatedData;
                });

            }
            // Calculez le taux d'utilisation de la limitation (hypothèse : total_requests représente une capacité max de 2000)
            if (data.error_rate) {
                // La valeur de `error_rate` peut représenter un pourcentage de l'utilisation
                // Ici, on suppose que `error_rate` est une valeur entre 0 et 1, donc on le multiplie par 100 pour avoir un pourcentage
                const usagePercentage = Math.min(data.error_rate * 100, 100);
                setRateLimitUsage(usagePercentage);
            }
        };

        // Gérer la fermeture de la connexion
        ws.onclose = () => {
            setConnectionStatus("Disconnected");
            console.log("WebSocket disconnected");
        };

        // Gérer les erreurs
        ws.onerror = (error) => {
            setConnectionStatus("Error");
            console.error("WebSocket error:", error);
        };

        // Fermer la connexion lorsque le composant est démonté
        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {
        if (analyticsData?.error_rate > 0.1) {
            toast({
                title: "Taux d'erreur critique détecté ! Attention immédiate requise.",
                variant: "destructive",
                className: "text-white fixed top-2 right-2 w-[420px] ",
        
              })
          
        } else if (analyticsData?.error_rate > 0.05) {
            toast({
                title: "Avertissement de taux d'erreur : surveillez attentivement le système.",
                variant: "destructive",
                className: "text-white fixed top-2 right-2 w-[420px] ",
        
              })
         
        }
      }, [analyticsData?.error_rate, toast]);

    return (
        <div className="flex flex-col gap-5">
            {chartData.length == 0 && (
                <LoadingComp />
            )}

            <h1 className="text-4xl font-bold text-colorSecondary">Dashboard</h1>

            {analyticsData?.error_rate && (
                <div className={`p-4 ${analyticsData.error_rate > 0.1 ? 'bg-red-200' : analyticsData.error_rate > 0.05 ? 'bg-yellow-200' : 'bg-green-200'}`}>
                    <p>
                    Taux d'erreur: {analyticsData.error_rate.toFixed(2)}%
                        {analyticsData.error_rate > 0.1 ? ' (Critical)' : analyticsData.error_rate > 0.05 ? ' (Warning)' : ' (Good)'}
                    </p>
                </div>
            )}
            {/* <p>Status: {connectionStatus}</p>

            {analyticsData ? (
                <div>
                    <h2>Analytics Data</h2>
                    <p>Total Requests: {analyticsData.total_requests}</p>
                    <p>Error Rate: {analyticsData.error_rate.toFixed(2)}</p>
                    <p>Average Response Time: {analyticsData.average_response_time.toFixed(2)} ms</p>
                    <p>Error Trends (last minute): {analyticsData.error_trends}</p>
                    <h3>Top 5 Endpoints</h3>
                    <ul>
                        {analyticsData.top_endpoints.map(([endpoint, count]: any, index: number) => (
                            <li key={index}>
                                {endpoint}: {count} requests
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading analytics data...</p>
            )}

             */}
            <RateLimitStatus rateLimitUsage={rateLimitUsage} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AreaCharts chartData={chartData} />
                <TopEndpointsBarChart endpoints={topEndpoints} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SecteurCharts analyticsData={analyticsData} />
                {analyticsData && (
                    <div>
                        <BarCharts responseTimes={responseTimes} />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            </div>




            <ErrorTrendsChart errorTrends={errorTrends} />

        </div>
    );
}
