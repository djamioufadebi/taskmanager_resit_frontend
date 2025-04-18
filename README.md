
# Projet de gestion de tâche

## Description 
Il s'agit d'une application web de gestion de tâche permettant aux utilisateurs connectés de gérer leurs tâches.

## Fonctionnalités
L'utilisateurs authentifié peut :
- créer, afficher, modifier et supprimer ses propres tâches.
- Filtrer ses tâches par statut.
- Modifier le statut d’une tâche.

### Prérequis
  Avant de commencer, assurez-vous que les éléments suivants sont installés sur votre machine :
- Node.js (Version >= 14.x) : Télécharger Node.js
- npm (Gestionnaire de paquets pour Node.js) : Il est normalement installé avec Node.js.
- Git : Télécharger Git




## Technologies utilisées

**Client :** Vue, Pinia, Vue Router, Bootstrap

**Server :** Laravel, 


## Installation

Installer ou clôner le projet avec npm
```bash
  npm install https://github.com/djamioufadebi/taskmanager_resit_frontend.git
  cd taskmanager_resit_frontend
```

## Installation des dépendance avec npm :

Installer le projet avec npm
```bash
  npm install
```

## Lancer l'application

 ### Lancer en mode développement avec un serveur local
```bash
  npm run dev
```
 ### Lancer en mode production
```bash
  npm run build
  npm run start
```


## Références API 

#### Recupérer toutes les tâches

```http
  GET /api/tasks
```
| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Votre Clé API |



#### Pour récupérer une tâche donnée
```http
  GET /api/tasks/${id}
```
| Paramètre | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id de la tâche |



#### Pour modifier une tâche donnée
```http
  PUT /api/tasks/${id}
```
| Paramètre | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id de la tâche |

