# Jumelles Amar — Site de Haute Couture (MERN)

Site web premium pour **Jumelles Amar**, maison de haute couture. Développé avec la stack MERN.

## Stack Technique

| Couche | Technologie |
|--------|-------------|
| **Frontend** | React 18 (Vite) + Tailwind CSS 3 + Framer Motion |
| **Backend** | Node.js + Express.js |
| **Base de données** | MongoDB Atlas (clusters **dev** et **prod** séparés) |
| **Authentification** | JWT + bcrypt |
| **Upload d'images** | Multer + Cloudinary |
| **Notifications** | React Hot Toast |

## Architecture

```
Jumelles_Amar/
├── client/                  # React (port 3000)
│   └── src/
│       ├── components/      # Navbar, Footer, Cards, Loading, PageHeader
│       ├── pages/           # Pages publiques
│       │   └── admin/       # Tableau de bord admin (CRUD)
│       ├── context/         # AuthContext, CartContext
│       ├── utils/           # api, helpers, animations
├── server/                  # Express (port 5000)
│   ├── config/              # db, cloudinary, bootstrapAdmin
│   ├── models/              # User, Collection, News, Product, Order, Contact
│   ├── routes/              # API routes
│   ├── controllers/         # Business logic
│   ├── middleware/          # auth, upload, error handling
│   └── seeders/             # Données de démonstration
├── .env.dev                 # Variables d'environnement (DEV)
├── .env.prod                # Variables d'environnement (PROD)
└── package.json             # Workspaces racine
```

## Fonctionnalités

- **Accueil** — Hero animé, collections en vedette, news, CTA
- **Collections** — Galerie filtrable avec animations au scroll
- **Actualités** — Articles avec catégories, pagination, vue détaillée
- **À Propos** — Histoire, valeurs, timeline animée
- **Contact** — Formulaire élégant avec prise de rendez-vous
- **Comptes** — Inscription et connexion avec affichage/masquage du mot de passe
- **Admin Dashboard** — CRUD complet : collections, actualités et gestion des messages

## Modèles de Données

- **User** — nom, email, password (hashé), rôle (admin/client), téléphone, adresse
- **Collection** — titre, description, catégories, images, featured, année
- **News** — titre, contenu, image, catégorie, tags, published, featured
- **Contact** — messages, type (info/rdv/sur-mesure), statut

## Installation & Démarrage

### 1. Prérequis

- Node.js ≥ 18
- Compte **MongoDB Atlas** (2 clusters : `dev` et `prod`)
- (Optionnel) Compte **Cloudinary** pour l'upload d'images

### 2. Configuration des environnements

Depuis la racine, remplissez les fichiers `.env.dev` et `.env.prod` :

```bash
# .env.dev  (développement)
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@cluster-dev.xxxxx.mongodb.net/jumelles_amar_dev?retryWrites=true&w=majority
JWT_SECRET=ta_cle_secrete_dev
CORS_ORIGIN=http://localhost:3000

# Cloudinary (optionnel pour l'upload)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Compte admin auto-créé (si aucun admin n'existe)
ADMIN_EMAIL=admin@jumellesamar.com
ADMIN_PASSWORD=tonMotDePasseAdmin
```

Faites de même dans `.env.prod` en pointant vers votre cluster **prod**.

### 3. Installation des dépendances

```bash
npm install
```

### 4. (Optionnel) Remplir les données de démonstration

```bash
npm run seed        # seed environnement développement
```

### 5. Lancement

```bash
npm run dev         # lance le serveur (5000) ET le client (3000)
```

Ou séparément :
```bash
npm run dev:server  # API sur http://localhost:5000
npm run dev:client  # Frontend sur http://localhost:3000
```

### 6. Accès admin

Le compte administrateur est **créé automatiquement** au premier démarrage du serveur
avec les identifiants définis dans `ADMIN_EMAIL` / `ADMIN_PASSWORD` de votre `.env`.
Connectez-vous sur `/login`, puis accédez à `/admin`.

> **Identifiants par défaut du seeder :** `admin@jumellesamar.com` / `adminJumelles2024!`

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance client + serveur en mode développement |
| `npm run seed` | Insère les données de démonstration |
| `npm run build` | Compile le frontend pour la production |
| `npm run start` | Lance le serveur en production |

## API — Endpoints principaux

| Méthode & Route | Description |
|-----------------|-------------|
| `POST /api/auth/login` | Connexion |
| `POST /api/auth/register` | Inscription |
| `GET/POST /api/collections` | Lister / créer des collections |
| `GET/POST /api/news` | Lister / créer des articles |
| `POST /api/contact` | Envoyer un message |

## Sécurité

- Mots de passe hashés avec bcrypt
- Authentification JWT (jetons signés)
- Protection des routes admin (`protect` + `admin` middleware)
- Variables d'environnement séparées dev/prod
- `.env.*` ignorés par git (voir `.env.example`)

## Déploiement sur Render

Le fichier `render.yaml` décrit le service web (build, start, health check et variables d'environnement).

1. Sur Render : **New → Blueprint**, connecter le dépôt `mamadouthiam0020/jumellesamar`.
2. Renseigner les variables demandées : `MONGODB_URI`, `CORS_ORIGIN`, `CLOUDINARY_*` et `ADMIN_PASSWORD`. `JWT_SECRET` est généré automatiquement.
3. Déployer : le build exécute `npm ci --include=dev && npm run build`, puis `npm run start` démarre Express qui sert l'API et le client compilé.
4. `CORS_ORIGIN` doit correspondre à l'URL publique Render (ex. `https://jumelles-amar.onrender.com`).
5. Health check : `GET /api/health`.

Pour un service existant : Settings → Build & Deploy → Repository = `mamadouthiam0020/jumellesamar`, Build Command = `npm ci --include=dev && npm run build`, Start Command = `npm run start`, puis recréer les variables d'environnement (les fichiers `.env.*` ne sont pas versionnés).

> **Erreur `The uri parameter to openUri() must be a string, got "undefined"`** : `MONGODB_URI` n'est pas définie sur Render. Ajoutez-la dans **Environment** (valeur = chaîne complète `mongodb+srv://...`) puis relancez un déploiement.
