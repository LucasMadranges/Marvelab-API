# Marvelab - Google Docs Add-on

Ce projet est une preuve de concept (POC) pour Marvelab, une startup qui simplifie le travail des chercheurs. Il comprend :

1. Une API simplifiée qui fournit des données de recherche (notes, interprétations, ressources, etc.)
2. Un add-on Google Docs qui permet aux chercheurs d'accéder à ces données directement dans leurs documents

## Structure du projet

- `index.js` : Serveur API Express.js
- `public/` : Contient la documentation de l'API
- `google-docs-addon/` : Contient les fichiers de l'add-on Google Docs
  - `appsscript.json` : Manifeste de l'add-on
  - `Code.gs` : Code serveur de l'add-on
  - `Sidebar.html` : Interface utilisateur de l'add-on

## Installation et configuration

### API Marvelab

1. Clonez ce dépôt
2. Installez les dépendances :
   ```
   npm install
   ```
3. Démarrez le serveur :
   ```
   npm start
   ```
4. L'API sera accessible à l'adresse `http://localhost:3000/api`
5. La documentation de l'API est disponible à l'adresse `http://localhost:3000`

### Add-on Google Docs

1. Accédez à [Google Apps Script](https://script.google.com/)
2. Créez un nouveau projet
3. Supprimez tous les fichiers existants dans le projet
4. Créez les fichiers suivants et copiez-y le contenu des fichiers correspondants de ce dépôt :
   - `appsscript.json`
   - `Code.gs`
   - `Sidebar.html`
5. Dans `Code.gs`, remplacez `YOUR_GEMINI_API_KEY` par votre clé API Gemini
6. Enregistrez le projet
7. Déployez l'add-on en tant que déploiement web ou testez-le directement dans Google Docs

## Fonctionnalités

### API Marvelab

L'API fournit les endpoints suivants :

- `/api/notes` : Notes de recherche
- `/api/interpretations` : Interprétations des résultats
- `/api/resources` : Ressources visuelles (images)
- `/api/methodologies` : Méthodologies de recherche
- `/api/experiments` : Protocoles expérimentaux
- `/api/all` : Toutes les données

Chaque type de données est également accessible par ID, par exemple `/api/notes/1`.

### Add-on Google Docs

L'add-on offre les fonctionnalités suivantes :

1. **Affichage et insertion de données Marvelab**
   - Consultation des notes de recherche
   - Consultation des interprétations
   - Consultation et insertion d'images
   - Consultation des méthodologies et expérimentations

2. **Génération de texte avec IA**
   - Sélection des éléments à utiliser (notes, interprétations)
   - Saisie de prompts personnalisés
   - Suggestions de prompts prédéfinis
   - Génération et insertion du texte dans le document

## Cas d'usage

1. **Insertion d'interprétations**
   - Ouvrez l'add-on
   - Accédez à l'onglet "Interprétations"
   - Cliquez sur "Insérer" pour l'interprétation souhaitée

2. **Insertion d'images**
   - Ouvrez l'add-on
   - Accédez à l'onglet "Ressources"
   - Cliquez sur "Insérer" pour l'image souhaitée

3. **Génération de texte basée sur les données**
   - Ouvrez l'add-on
   - Accédez à l'onglet "Générer du texte"
   - Sélectionnez les notes et interprétations à utiliser
   - Entrez un prompt (ex: "En te basant sur la note 1 et 2 et l'interprétation 1, crée une conclusion.")
   - Cliquez sur "Générer"
   - Une fois le texte généré, cliquez sur "Insérer dans le document"

## Technologies utilisées

- **Backend API** : Node.js, Express.js
- **Add-on Google Docs** : Google Apps Script, HTML, CSS, JavaScript
- **IA Générative** : API Gemini

## Remarques

- Ce projet est une preuve de concept et n'est pas destiné à un usage en production sans modifications supplémentaires.
- Pour un déploiement en production, vous devriez :
  - Héberger l'API sur un serveur accessible publiquement
  - Mettre en place une authentification pour l'API
  - Configurer correctement les CORS pour la sécurité
  - Publier l'add-on sur le Google Workspace Marketplace

## Licence

Ce projet est fourni à titre d'exemple et peut être utilisé comme base pour développer votre propre solution.