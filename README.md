# LettreAI — Prototype frontend

Prototype React + TypeScript de l'application LettreAI, basé sur le cahier des
charges (créer une lettre en ligne, assistée par IA, à partir d'un catalogue
de modèles).

## Stack

- **React 19** + **TypeScript**
- **React Router 7** — routage
- **Tailwind CSS v4** (`@tailwindcss/vite`) — styles
- **Vite** — build & serveur de dev
- **Bootstrap Icons** + **Plus Jakarta Sans** (fontsource) — icônes et police

## Démarrer le projet

```bash
npm install
npm run dev
```

Le site est servi sur http://localhost:5173.

Autres commandes :

```bash
npm run build     # build de production dans dist/
npm run preview   # sert le build de production localement
npm run typecheck # vérification TypeScript seule
```

## Ce que couvre ce prototype

C'est un **frontend seul**, sans backend Laravel : toutes les données
(utilisateur, lettres, favoris, paiements, notifications) sont simulées et
stockées dans le `localStorage` du navigateur via `src/services/storage.ts`.
La génération IA (`src/services/mockAI.ts`) simule un appel réseau et rédige
la lettre **uniquement à partir des champs remplis dans le formulaire**,
comme l'exige le cahier des charges (§5.4) — aucune donnée n'est inventée.

Pages incluses :

- **Public** : Accueil, Connexion, Inscription, Mot de passe oublié,
  Catégories, Catalogue de modèles (recherche + filtres), Détail d'un modèle,
  Tarifs (avec simulation de paiement), FAQ
- **Espace connecté (`/app`)** : Tableau de bord, Création de lettre
  (formulaire dynamique → génération IA → éditeur de résultat), Mes lettres
  (historique), vue d'une lettre, Favoris, Mon compte (Profil / Abonnement /
  Facturation / Sécurité), Paramètres

## Brancher le vrai backend Laravel

Tout le code est organisé pour que le passage au vrai backend ne touche que
la couche `services/` :

- `src/services/storage.ts` → à remplacer par des appels `fetch`/axios vers
  l'API REST Laravel (`/api/...`, voir cahier des charges §9)
- `src/services/mockAI.ts` → à remplacer par `POST /api/ai/generate`,
  `/api/ai/rewrite`, etc.
- `src/context/AuthContext.tsx` et `src/context/LetterContext.tsx` gardent la
  même interface (mêmes fonctions exposées) ; seule leur implémentation
  interne change
- `src/data/*.ts` (catégories, modèles, plans, FAQ) correspond aux tables
  `categories`, `templates`, `template_fields`, `plans` — à remplacer par des
  appels `GET /api/categories`, `GET /api/templates`, etc.
- `src/types/index.ts` reflète déjà les champs des tables MySQL du cahier des
  charges, pour limiter les changements de types côté frontend

Un fichier `.env.example` est fourni (`VITE_API_URL`, `VITE_USE_MOCK`) pour
préparer le branchement.

## Bibliothèques à installer

Aucune installation supplémentaire n'est nécessaire : `package.json` contient
déjà tout ce qu'il faut. Il suffit de lancer `npm install`.

Pour les prochaines étapes (backend Laravel, PDF, paiements réels), il faudra
prévoir côté frontend, le moment venu :

- un client HTTP (`axios` ou `fetch` natif suffit pour commencer)
- une librairie de rich text si l'éditeur doit devenir un vrai WYSIWYG
  (ex. `tiptap`) — l'éditeur actuel est un simple `<textarea>` stylé
