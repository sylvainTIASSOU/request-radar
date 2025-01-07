# Étape 1 : Construction de l'application
FROM node:23.1.0-alpine3.19 AS builder

# Installer des outils supplémentaires nécessaires
RUN apk add --no-cache libc6-compat bash

# Définir le répertoire de travail
WORKDIR /app

# Installer la version spécifique de npm
RUN npm install -g npm@10.9.1

# Copier uniquement les fichiers nécessaires pour l'installation initiale des dépendances
COPY package.json package-lock.json ./

# Installer les dépendances (en utilisant le cache de Docker si elles n'ont pas changé)
RUN npm ci --legacy-peer-deps --omit=optional  || npm ci --force --omit=optional

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application Next.js
RUN npm run build

# Étape 2 : Préparation pour le runtime
FROM node:23-alpine3.19 AS runtime

# Installer uniquement les dépendances nécessaires pour exécuter l'application
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production --omit=optional --legacy-peer-deps || npm ci --production --force --omit=optional

# Copier les fichiers générés par la phase de build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Ajouter des optimisations pour les erreurs runtime et les logs
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Exposer le port utilisé par Next.js
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]
