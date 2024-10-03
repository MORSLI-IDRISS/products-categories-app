# API Produits et Catégories

Ceci est une API RESTful construite avec NestJS et MongoDB pour gérer les produits et les catégories. Elle inclut l'enregistrement des utilisateurs, la connexion, l'authentification JWT et le contrôle d'accès basé sur les rôles.

## Fonctionnalités

- Enregistrement et connexion des utilisateurs
- Jetons d'accès JWT pour l'authentification
- Jetons de rafraîchissement pour maintenir les sessions
- Contrôle d'accès basé sur les rôles (ex. : admin)
- Opérations CRUD pour les produits et les catégories
- Fonctionnalité de recherche pour les produits par catégorie et par plage de prix

## Technologie

- Node.js
- NestJS
- MongoDB
- Mongoose
- JWT

## Démarrage

### Prérequis

- Node.js 
- MongoDB
- npm

### Installation

1. Clonez le dépôt : git clone https://github.com/MORSLI-IDRISS/products-categories-app.git

2. Installez les dépendances : npm install

3. Lancer l'application : npm run start

Points de terminaison de l'API

Enregistrement d'utilisateur

POST /auth/register
Corps : { "email": "exemple@exemple.com", "password": "votremotdepasse", "role": "" }


Connexion d'utilisateur

POST /auth/login
Corps : { "email": "exemple@exemple.com", "password": "votremotdepasse" }


Création de Produit

POST /products
Corps : { "name": "Nom du Produit", "description": "Description", "price": 100, "category": "ID de la Catégorie", "stockQuantity": 50 }

Création de Catégorie 

POST /categories
Corps : { "name": "Nom de la Catégorie", "description": "Description de la catégorie"}
