# Utiliser une image Node.js officielle
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer Ember CLI globalement et toutes les dépendances (dev incluses pour le build)
RUN npm install -g ember-cli@latest
RUN npm ci

# Copier tout le code source
COPY . .

# Construire l'application EmberJS pour la production
RUN npm run build

# Étape de production avec nginx
FROM nginx:alpine

# Copier les fichiers buildés depuis l'étape builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]