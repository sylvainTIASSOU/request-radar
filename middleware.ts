import { NextRequest, NextResponse } from "next/server";

// Middleware pour vérifier l'authentification
export function middleware(req: NextRequest) {
  // Utilisation des cookies côté serveur avec req.cookies
  const token = req.cookies.get("token"); // Récupère le cookie "token" depuis les cookies HTTP

  // Vérifiez si la route correspond à /dashboard/*
  const isDashboardRoute = req.url.startsWith(`${req.nextUrl.origin}/dashboard`);

  // Si l'utilisateur n'est pas connecté (pas de cookie "token") et tente d'accéder à /dashboard/*
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirection vers la page de login
  }

  // Si l'utilisateur est connecté ou n'est pas sur une route protégée, on permet la requête
  return NextResponse.next();
}

// Appliquer ce middleware uniquement aux routes /dashboard/*
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"], // Utilisation de la syntaxe avec :path* pour matcher les sous-pages de /dashboard
};
