 import axios, { AxiosError } from "axios";


export class Api {
    static baseUrl = "http://localhost:8001";
    
    //"https://request-radar-api.vercel.app";
    //
    //

    /**
     * Gestion des erreurs pour renvoyer toutes les informations pertinentes.
     * @param error - L'erreur capturée.
     * @returns Un objet détaillant le message d'erreur et les détails supplémentaires.
     */
    private static handleError(error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            return {
                message: axiosError.message,
                status: axiosError.response?.status || null,
                data: axiosError.response?.data || null,
                headers: axiosError.response?.headers || null,
            };
        }

        // Erreur générique non liée à Axios
        return {
            message: "An unexpected error occurred",
            status: null,
            data: null,
            headers: null,
        };
    }

    /**
     * Crée les en-têtes avec un token optionnel.
     * @param token - Le token JWT ou autre, optionnel.
     * @returns Les en-têtes HTTP configurés.
     */
    private static createHeaders(token?: string) {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*", // Ajouté pour les requêtes CORS
             
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        return headers;
    }

    static async createFormMulti(resourceUrl: string, data: any, token?: string) {
        try {
            let requestData;
            let contentType;
    
            // Vérifiez si un fichier est présent dans les données
            const hasFile = Object.values(data).some(value => value instanceof File);
    
            if (hasFile) {
                // Si un fichier est détecté, utilisez FormData
                requestData = new FormData();
                for (const key in data) {
                    requestData.append(key, data[key]);
                }
                contentType = "multipart/form-data"; // Axios gère ce header automatiquement
                
            } else {
                // Sinon, utilisez x-www-form-urlencoded
                const urlEncodedData = new URLSearchParams();
                for (const key in data) {
                    urlEncodedData.append(key, data[key]);
                }
                requestData = urlEncodedData;
                contentType = "application/x-www-form-urlencoded";
                
            }
    
            // Envoyer la requête avec les en-têtes appropriés
            const response = await axios.post(`${Api.baseUrl}/${resourceUrl}`, requestData, {
                headers: {
                    ...Api.createHeaders(token),
                    "Content-Type": contentType,
                    // "Access-Control-Allow-Origin": "*",
                    
                },
            });
    
            return { success: true, data: response.data };
        } catch (error: any) {
            if (error.response) {
                return {
                    success: false,
                    error: {
                        message: error.message,
                        status: error.response.status,
                        data: error.response.data,
                        headers: error.response.headers,
                    },
                };
            } else if (error.request) {
                return {
                    success: false,
                    error: {
                        message: "No response received from server",
                        request: error.request,
                    },
                };
            } else {
                return {
                    success: false,
                    error: {
                        message: error.message,
                    },
                };
            }
        }
    }
    

    static async createFormEncoded(resourceUrl: string, data: any, token?: string) {
        try {
            // Convertir les données en x-www-form-urlencoded
            const urlEncodedData = new URLSearchParams();
            for (const key in data) {
                urlEncodedData.append(key, data[key]);
            }

            // Envoyer la requête avec les en-têtes appropriés
            const response = await axios.post(`${Api.baseUrl}/${resourceUrl}`, urlEncodedData, {
                headers: {
                    ...Api.createHeaders(token),
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            return {success: false, data: response.data};
        } catch (error: any) {
            if (error.response) {
                return {
                    success: false,
                    error: {
                        message: error.message,
                        status: error.response.status,
                        data: error.response.data,
                        headers: error.response.headers,
                    },
                };
            } else if (error.request) {
                return {
                    success: false,
                    error: {
                        message: "No response received from server",
                        request: error.request,
                    },
                };
            } else {
                return {
                    success: false,
                    error: {
                        message: error.message,
                    },
                };
            }
        }
    }

    static async create(resourceUrl: string, data: unknown, token?: string) {
        try {
            const response = await axios.post(`${Api.baseUrl}/${resourceUrl}`, data, {
                headers: Api.createHeaders(token),
            });

            return { success: true, data: response.data };
        } catch (error) {
            const detailedError = Api.handleError(error);
            console.error("Error creating resource:", detailedError);
            return { success: false, error: detailedError };
        }
    }

    static async  getAll(endPoint: string): Promise<[]> {
        const url = `${Api.baseUrl}${endPoint}`;
        try {
            const res = await fetch(url, {
                mode: 'no-cors', // no-cors, *cors, same-origin
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                    // 'Access-Control-Allow-Origin': "*", // Ajouté pour les requêtes CORS
                }
            });
            if(!res.ok) {
                throw new Error("la reponse du réseau n'est pas OK");
            }

            //const data = await res.json();
            return await res.json();
        } catch(errors) {
            console.error(`erreur de recuperation de donné ${errors}`);
            throw errors;
        }
    }

    static async read2(resourceUrl: string) {
        try {
            const response = await axios.get(`${Api.baseUrl}/${resourceUrl}`, 
            {
                headers: {
                     'Content-Type': "application/json",
                    // 'Access-Control-Allow-Origin': "*", // Ajouté pour les requêtes CORS
                }
            }
            );
            return response.data;
        } catch (error) {
            console.error('Error reading resource:', error);
            throw new Error('Unable to read resource');
        }
    }

    static async read(resourceUrl: string, token?: string) {
        try {
            // Encode l'URL pour gérer les caractères spéciaux
            // const encodedUrl = encodeURIComponent(resourceUrl);
            const response = await axios.get(`${Api.baseUrl}/${resourceUrl}`, {
                headers: Api.createHeaders(token),
            });
    
            return { success: true, data: response.data };
        } catch (error) {
            const detailedError = Api.handleError(error);
            console.error("Error reading resource:", detailedError);
            return { success: false, error: detailedError };
        }
    }
    


    static async update(resourceUrl: string, data: unknown, token?: string) {
        try {
            const response = await axios.put(`${Api.baseUrl}/${resourceUrl}`, data, {
                headers: Api.createHeaders(token),
            });

            return { success: true, data: response.data };
        } catch (error) {
            const detailedError = Api.handleError(error);
            console.error("Error updating resource:", detailedError);
            return { success: false, error: detailedError };
        }
    }

    static async delete(resourceUrl: string, token?: string) {
        try {
            const response = await axios.delete(`${Api.baseUrl}/${resourceUrl}`, {
                headers: Api.createHeaders(token),
            });

            return { success: true, data: response.data };
        } catch (error) {
            const detailedError = Api.handleError(error);
            console.error("Error deleting resource:", detailedError);
            return { success: false, error: detailedError };
        }
    }
}
