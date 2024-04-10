# Versant-Vertical
App  de réservation d'activité 



[![wakatime](https://wakatime.com/badge/user/dfdaf0d3-5ae8-4997-92c1-563d24f5d7d4/project/018eae1a-ca7e-42f6-9de6-9b2188831dcc.svg)](https://wakatime.com/badge/user/dfdaf0d3-5ae8-4997-92c1-563d24f5d7d4/project/018eae1a-ca7e-42f6-9de6-9b2188831dcc)




## Conventions de Codage pour le Projet de Gestion d'Activités de Plein Air

### Introduction

Ce document établit les conventions de codage pour le projet de gestion d'activités de plein air. Il couvre la structure du projet, les conventions de nommage, les pratiques de codage recommandées, et les procédures de versionnage avec Git. L'objectif est de maintenir la codebase lisible, maintenable, et cohérente pour tous les développeurs de l'équipe.

### Structure du Projet

Le projet suit une structure modulaire facilitant la scalabilité et la maintenabilité. Voici une vue d'ensemble de la structure du projet:

bashCopy code

/outdoor-activities-admin/
├── src/
│   ├── components/          # Composants UI réutilisables
│   ├── features/            # Fonctionnalités spécifiques, e.g., Canyoning, Escalade
│   │   ├── Canyoning/
│   │   ├── Escalade/
│   │   └── Speleo/
│   ├── hooks/               # Hooks personnalisés
│   ├── redux/               # Logique Redux (actions, reducers)
│   ├── routes/              # Configuration des routes avec React Router
│   ├── services/            # Services pour la logique métier, e.g., API calls
│   ├── styles/              # Styles globaux et variables Sass
│   ├── App.jsx              # Composant racine
│   └── main.jsx             # Point d'entrée de l'application
├── tests/                   # Tests unitaires et d'intégration
├── vite.config.js           # Configuration de Vite
├── index.html
└── package.json

### Conventions de Nomination

- **Composants (Fichiers/Dossiers)**: Utilisez le PascalCase, e.g., `ReservationForm.jsx`. Les dossiers de composants doivent correspondre au nom du composant principal qu'ils contiennent.
- **Hooks**: Préfixez les hooks personnalisés avec `use`, e.g., `useOutdoorActivities.js`.
- **Redux**: Pour actions, reducers, et types, utilisez le camelCase, e.g., `activitiesReducer.js`.
- **Fichiers de Styles**: Utilisez le kebab-case, e.g., `reservation-form.scss`.
- **Tests**: Suivez la convention `<nom-du-fichier>.test.js` pour les fichiers de tests, e.g., `ReservationForm.test.js`.

### Pratiques de Codage

- Utilisez les fonctions fléchées pour les composants fonctionnels et les hooks.
- Structurez les composants Redux en utilisant des dossiers séparés pour les actions, reducers, et les sélecteurs.
- Appliquez le Lazy loading pour les composants de route avec `React.lazy` et `Suspense` pour améliorer les performances.
- Adoptez l'architecture feature-first pour structurer les dossiers, regroupant le code par fonctionnalité plutôt que par nature (composants, services, etc.).

### Git Workflow

- **Branches Principales**:
  
  - `main`: La branche de déploiement automatique. Seuls les merges de `server-development` sont autorisés.
  - `server-development`: La branche pour le test en environnement de production. Toutes les pull requests doivent être fusionnées ici pour la revue.

- **Branches de Fonctionnalités/Corrections**:
  
  - Nommez les branches de fonctionnalités et corrections en fonction de l'issue, par exemple, `feature/escalade-module` ou `fix/reservation-form-error`.
  - Chaque issue doit avoir sa propre branche qui sera présentée en pull request à la branche `server-development` pour la revue.

### Processus de Revue de Code

- Toutes les pull requests doivent être revues par au moins deux développeurs avant la fusion.
- Les revues de code doivent se concentrer sur la qualité du code, la conformité aux conventions de projet, et la performance.
- Utilisez des hooks Git pour automatiser les tests et les vérifications de style de code avant les commits.

#### Tests

- Utilisez Vitest pour écrire des tests unitaires et d'intégration. Assurez-vous que les tests couvrent les cas d'usage critiques des composants et des fonctions.
- Intégrez les tests dans le processus CI/CD pour s'assurer qu'aucun code brisant les tests ne soit fusionné dans les branches principales.

#### CI/CD

- Configurez la CI pour exécuter des tests automatiquement sur chaque pull request vers `server-development` et `main`.
- La CD doit déployer automatiquement les changements fusionnés dans `main` vers l'environnement de production.

Ce guide est destiné à évoluer au fur et à mesure que de nouvelles pratiques sont adoptées et que le projet grandit. La flexibilité et l'ouverture aux changements sont essentielles pour adapter et affiner continuellement nos processus de développement.