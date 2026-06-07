# Architecture de l'Application React (CodeToWin)

Ce document décrit la structure du projet React, organisée en **4 couches principales**, visant à maximiser la réutilisation des composants UI et à fournir une structure claire pour la couche de services API. Cette architecture facilite également l'intégration et la migration des fichiers statiques existants de l'ancien dossier `froentend/`.

---

## 📂 Structure des Dossiers (`src/`)

Pour respecter la séparation des préoccupations (Clean Architecture), le dossier `src` est structuré comme suit :

```text
src/
├── api/                  # COUCHE 4 : DONNÉES / INFRASTRUCTURE (Clients API, endpoints)
│   ├── client.js         # Configuration d'Axios/Fetch (baseUrl, intercepteurs de tokens)
│   ├── auth.js           # Endpoints d'authentification (login, signup)
│   ├── hackathons.js     # Endpoints de gestion des hackathons
│   └── user.js           # Endpoints de gestion des profils et participants
│
├── services/             # COUCHE 3 : APPLICATION / ORCHESTRATION (Logique applicative)
│   ├── validation.js     # Fonctions de validation (formulaires, inputs)
│   └── formatters.js     # Formateurs de dates, prix, statuts
│
├── context/              # COUCHE 2 : DOMAINE / ÉTAT GLOBAL (Partage d'état)
│   ├── AuthContext.jsx   # État global de l'utilisateur connecté
│   └── ProjectContext.jsx# État global du brouillon de projet (Wizard)
│
├── hooks/                # COUCHE 2 : DOMAINE / LOGIQUE MÉTIER (Hooks réutilisables)
│   ├── useAuth.js        # Accès facile à l'état d'authentification
│   └── useProject.js     # Gestion du wizard de soumission de projet (5 étapes)
│
├── components/           # COUCHE 1 : PRÉSENTATION (Composants UI réutilisables)
│   ├── common/           # Composants génériques (Atomiques & hautement réutilisables)
│   │   ├── Button/       # Bouton principal, secondaire, réseaux sociaux
│   │   ├── Card/         # Conteneur de carte générique
│   │   ├── Input/        # Champ texte, email, mot de passe
│   │   ├── Dropdown/     # Menu déroulant (ex: profil utilisateur)
│   │   └── Modal/        # Fenêtres modales génériques
│   │
│   └── features/         # Composants liés à des fonctionnalités spécifiques
│       ├── hackathon/    # HackathonCard, FilterChips, TeammatesList
│       └── profile/      # SkillTag, SocialLinks, StatBlock
│
├── layouts/              # COUCHE 1 : PRÉSENTATION (Squelettes structurels)
│   ├── MainLayout.jsx    # En-tête (Header) + Pied de page (Footer) avec navigation
│   └── AuthLayout.jsx    # Layout épuré pour les formulaires d'authentification
│
├── pages/                # COUCHE 1 : PRÉSENTATION (Vues complètes / Pages)
│   ├── Home/             # Page d'accueil (anciennement home.html)
│   ├── Login/            # Connexion (anciennement login.html)
│   ├── Signup/           # Inscription (anciennement signup.html)
│   ├── Hackathons/       # Explorateur (anciennement hackaton.html)
│   ├── HackathonDetail/  # Détail d'un hackathon (anciennement hackaton-detail.html)
│   ├── Profile/          # Formulaire d'édition de profil (anciennement profile.html)
│   └── Participant/      # Profil public (anciennement participant.html)
│
├── assets/               # Images, icônes, illustrations et logos
├── main.jsx              # Point d'entrée de l'application
└── index.css             # Styles CSS globaux & configuration Tailwind CSS
```

---

## 🧱 Les 4 Couches Principales

### 1. Couche de Présentation (UI)
Cette couche gère tout ce qui est visible par l'utilisateur et gère les interactions directes (clics, saisies).
- **Composants Communs (`src/components/common/`)** : Ce sont les éléments de base de notre système de design (boutons, inputs, modales). Ils doivent être **agnostiques du domaine métier** (ils ne doivent pas connaître l'existence d'un "hackathon" ou d'un "participant") et configurables via des *props* (ex: `color`, `size`, `onClick`).
- **Composants Fonctionnels (`src/components/features/`)** : Composants spécifiques à une fonctionnalité, assemblant des composants communs (ex: une carte de hackathon utilisant un bouton commun et une carte commune).
- **Pages (`src/pages/`)** : Représentent les différentes routes de l'application. Elles assemblent les composants pour construire l'écran.

### 2. Couche Domaine (Logique Métier & État)
Cette couche contient les règles métier et l'état de l'application. Elle est découplée de l'UI grâce aux hooks personnalisés.
- **Contextes (`src/context/`)** : Stockent les états partagés (ex: session utilisateur, état d'inscription).
- **Hooks personnalisés (`src/hooks/`)** : Encapsulent la logique métier. Par exemple, `useProject` gère la navigation entre les 5 étapes du wizard, la validation locale de chaque étape, et la sauvegarde temporaire en LocalStorage.

### 3. Couche Application (Services Applicatifs)
Cette couche sert d'orchestrateur. Elle ne contient ni état UI, ni logique de base de données, mais exécute des fonctions pures de traitement.
- **Validations (`src/services/validation.js`)** : Fonctions pures pour valider le format de l'email, la force du mot de passe ou la complétude du profil.
- **Formatteurs (`src/services/formatters.js`)** : Conversion de données brutes en texte lisible (ex: formater `$8000` en monnaie, calculer le nombre de jours restants avant une date, etc.).

### 4. Couche Données / Infrastructure (API Service)
C'est la couche la plus basse. Elle gère la communication avec le monde extérieur (le backend et le stockage du navigateur).
- **Client HTTP (`src/api/client.js`)** : Configure l'instance HTTP (Axios ou Fetch), gère les en-têtes d'authentification (`Bearer Token`) et intercepte les erreurs courantes (comme le renouvellement de token sur les erreurs 401).
- **Modules API (`src/api/*.js`)** : Fonctions asynchrones effectuant les requêtes vers les endpoints spécifiques.

---

## 🛠️ Structure de la Couche de Service API

Pour garantir la maintenabilité, chaque ressource possède son propre fichier API. Les requêtes renvoient des données formatées ou des promesses propres.

### Exemple de configuration du client (`src/api/client.js`) :
```javascript
// Utilisation de Fetch avec une configuration de base
const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.codetowin.com/v1';

export async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || 'Une erreur est survenue');
    error.status = response.status;
    throw error;
  }

  // Si pas de contenu (ex: 204 No Content), retourner vide
  if (response.status === 204) return null;

  return response.json();
}
```

### Exemple de module d'appel (`src/api/hackathons.js`) :
```javascript
import { request } from './client';

export const hackathonsApi = {
  // Récupérer la liste des hackathons avec filtres optionnels
  getAll: (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return request(`/hackathons?${queryParams}`, { method: 'GET' });
  },

  // Récupérer les détails d'un hackathon spécifique par son slug/ID
  getBySlug: (slug) => {
    return request(`/hackathons/${slug}`, { method: 'GET' });
  },

  // Soumettre un projet pour un hackathon
  submitProject: (hackathonId, projectData) => {
    return request(`/hackathons/${hackathonId}/submissions`, {
      method: 'POST',
      body: projectData
    });
  }
};
```

---

## 🚀 Plan d'Intégration des Fichiers Statiques `froentend/`

Pour migrer l'application existante vers cette structure React :

1. **Intégration du CSS global** :
   - Copier les configurations communes et variables de style dans `src/index.css`.
   - Si Tailwind CSS est utilisé, s'assurer que `tailwind.config.js` est configuré et que les directives `@tailwind` sont en haut de `src/index.css`.

2. **Création des composants communs (`common/`)** :
   - Analyser les formulaires et boutons répétés (comme dans `login.html`, `signup.html`, et `profile.html`) et créer les composants `<Button />`, `<Input />`, et `<Modal />` réutilisables.

3. **Création des pages** :
   - Transformer chaque fichier HTML en composant React fonctionnel dans `src/pages/` (ex: `c:\Users\admin\Documents\project\HACKafri\froentend\participants\hackaton.html` devient `src/pages/Hackathons/index.jsx`).
   - Remplacer les structures répétées par les composants créés à l'étape 2.

4. **Portage du JavaScript** :
   - Déplacer la logique d'état et d'événements des fichiers JS externes (ex: `hackaton-detail.js`) vers des hooks React (`src/hooks/`) ou directement dans les composants de page avec `useState` et `useEffect`.
   - Remplacer l'utilisation directe de `localStorage` par des appels de services centralisés et synchronisés via la couche Domaine.
