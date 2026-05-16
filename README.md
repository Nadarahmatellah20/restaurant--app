# Restaurant App — React + Vite

Projet complet de site restaurant avec authentification admin/client.

## Lancer le projet

```bash
# 1. Installer les dépendances
npm install

# 2. Démarrer en développement
npm run dev
```

Le site sera disponible sur **http://localhost:5173**

## Comptes de démonstration

| Rôle  | Email                    | Mot de passe |
|-------|--------------------------|--------------|
| Admin | admin@restaurant.com     | admin123     |
| Client | Créer un compte via /register | — |

## Pages

| URL           | Description                        |
|---------------|------------------------------------|
| `/`           | Page d'accueil                     |
| `/categories` | Toutes les catégories              |
| `/foods`      | Menu complet avec filtres          |
| `/order/:id`  | Commander un plat                  |
| `/contact`    | Formulaire de contact              |
| `/login`      | Connexion                          |
| `/register`   | Créer un compte client             |
| `/dashboard`  | Tableau de bord client             |
| `/admin`      | Panel admin (commandes, menu, users)|

## Stack

- **React 18** + **TypeScript**
- **Vite** — serveur de développement rapide
- **Tailwind CSS** — styles utilitaires
- **Wouter** — routeur léger
- **localStorage** — persistance des données (pas besoin de backend)

## Commandes

```bash
npm run dev       # Développement
npm run build     # Build production
npm run preview   # Prévisualiser le build
```
